import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  addBlock,
  clonePortfolio,
  createDefaultBlockData,
  createPortfolioBlock,
  deleteBlockById,
  reorderBlocks,
  supportedBlockTypes,
} from './portfolioBlockState.js';

const portfolio = {
  id: 'portfolio-1',
  theme: { colors: { accent: '#1688e8' } },
  blocks: [
    { id: 'header-1', type: 'header', data: { name: 'Alex' } },
    { id: 'about-1', type: 'about', data: { title: 'About' } },
    { id: 'contact-1', type: 'contact', data: { email: 'alex@example.com' } },
  ],
};

describe('portfolioBlockState', () => {
  it('creates independent default data for all supported block types', () => {
    for (const type of supportedBlockTypes) {
      const first = createDefaultBlockData(type);
      const second = createDefaultBlockData(type);
      assert.ok(first);
      assert.notStrictEqual(first, second);
      assert.deepEqual(createPortfolioBlock(type, { id: `${type}-1` }), { id: `${type}-1`, type, data: first });
    }
    assert.equal(createDefaultBlockData('unsupported'), null);
  });

  it('creates valid unique blocks and rejects invalid or duplicate IDs', () => {
    const created = createPortfolioBlock('skills', { existingBlocks: portfolio.blocks, createId: () => 'skills-1' });
    assert.deepEqual(created, { id: 'skills-1', type: 'skills', data: { title: 'Skills', items: ['Strategy', 'Design', 'Development'] } });
    assert.equal(createPortfolioBlock('unknown'), null);
    assert.equal(createPortfolioBlock('skills', { id: 'header-1', existingBlocks: portfolio.blocks }), null);
    assert.equal(createPortfolioBlock('skills', { id: '' }), null);
  });

  it('does not share nested default data between blocks of the same type', () => {
    const nestedTypes = [
      { type: 'skills', mutate: (block) => { block.data.items[0] = 'Changed skill'; }, read: (block) => block.data.items[0], expected: 'Strategy' },
      { type: 'projects', mutate: (block) => { block.data.items[0].name = 'Changed project'; }, read: (block) => block.data.items[0].name, expected: 'Project name' },
      { type: 'experience', mutate: (block) => { block.data.items[0].role = 'Changed role'; }, read: (block) => block.data.items[0].role, expected: 'Your role' },
    ];

    for (const { type, mutate, read, expected } of nestedTypes) {
      const first = createPortfolioBlock(type, { id: `${type}-one` });
      const second = createPortfolioBlock(type, { id: `${type}-two` });

      assert.notStrictEqual(first.data.items, second.data.items);
      if (typeof first.data.items[0] === 'object') assert.notStrictEqual(first.data.items[0], second.data.items[0]);
      mutate(first);
      assert.equal(read(second), expected);
    }
  });

  it('retries generated IDs after a collision without changing existing blocks', () => {
    const original = clonePortfolio(portfolio);
    const generatedIds = ['header-1', 'about-2'];
    const block = createPortfolioBlock('about', {
      existingBlocks: portfolio.blocks,
      createId: () => generatedIds.shift(),
    });

    assert.deepEqual(block, {
      id: 'about-2',
      type: 'about',
      data: createDefaultBlockData('about'),
    });
    assert.equal(generatedIds.length, 0);
    assert.deepEqual(portfolio, original);
  });

  it('adds a block without changing the source portfolio or its theme', () => {
    const original = clonePortfolio(portfolio);
    const next = addBlock(portfolio, 'projects', { id: 'projects-1' });

    assert.equal(next.blocks.at(-1).type, 'projects');
    assert.equal(next.blocks.at(-1).id, 'projects-1');
    assert.deepEqual(portfolio, original);
    assert.equal(next.theme, portfolio.theme);
    assert.notStrictEqual(next.blocks, portfolio.blocks);
  });

  it('leaves the input unchanged for invalid adds and duplicate source IDs', () => {
    assert.strictEqual(addBlock(portfolio, 'unknown'), portfolio);
    const duplicateIds = { blocks: [{ id: 'same', type: 'header', data: {} }, { id: 'same', type: 'about', data: {} }, { id: 'other', type: 'skills', data: {} }] };
    assert.strictEqual(addBlock(duplicateIds, 'skills', { id: 'skills-1' }), duplicateIds);
    assert.strictEqual(deleteBlockById(duplicateIds, 'same'), duplicateIds);
    assert.strictEqual(reorderBlocks(duplicateIds, 'same', 'other'), duplicateIds);
  });

  it('deletes one block immutably and safely ignores invalid IDs', () => {
    const original = clonePortfolio(portfolio);
    const next = deleteBlockById(portfolio, 'about-1');

    assert.deepEqual(next.blocks.map((block) => block.id), ['header-1', 'contact-1']);
    assert.deepEqual(portfolio, original);
    assert.strictEqual(deleteBlockById(portfolio, 'missing'), portfolio);
    assert.strictEqual(deleteBlockById(portfolio, ''), portfolio);
  });

  it('reorders only by known unique IDs and preserves block objects', () => {
    const original = clonePortfolio(portfolio);
    const next = reorderBlocks(portfolio, 'contact-1', 'header-1');

    assert.deepEqual(next.blocks.map((block) => block.id), ['contact-1', 'header-1', 'about-1']);
    assert.strictEqual(next.blocks[0], portfolio.blocks[2]);
    assert.deepEqual(portfolio, original);
    assert.strictEqual(reorderBlocks(portfolio, 'missing', 'header-1'), portfolio);
    assert.strictEqual(reorderBlocks(portfolio, 'header-1', 'header-1'), portfolio);
  });

  it('deeply clones nested themes and block data', () => {
    const original = {
      id: 'nested',
      theme: { colors: { accent: '#1688e8', background: '#ffffff' } },
      blocks: [{ id: 'project-1', type: 'projects', data: { items: [{ id: 'item-1', name: 'Original project', details: { featured: true } }] } }],
    };
    const cloned = clonePortfolio(original);

    assert.notStrictEqual(cloned.theme, original.theme);
    assert.notStrictEqual(cloned.theme.colors, original.theme.colors);
    assert.notStrictEqual(cloned.blocks, original.blocks);
    assert.notStrictEqual(cloned.blocks[0], original.blocks[0]);
    assert.notStrictEqual(cloned.blocks[0].data, original.blocks[0].data);
    assert.notStrictEqual(cloned.blocks[0].data.items, original.blocks[0].data.items);
    assert.notStrictEqual(cloned.blocks[0].data.items[0], original.blocks[0].data.items[0]);
    assert.notStrictEqual(cloned.blocks[0].data.items[0].details, original.blocks[0].data.items[0].details);

    cloned.theme.colors.accent = '#000000';
    cloned.blocks[0].data.items[0].name = 'Changed project';
    cloned.blocks[0].data.items[0].details.featured = false;
    assert.equal(original.theme.colors.accent, '#1688e8');
    assert.equal(original.blocks[0].data.items[0].name, 'Original project');
    assert.equal(original.blocks[0].data.items[0].details.featured, true);
  });

  it('handles empty portfolios and keeps themes separate from blocks', () => {
    const empty = { id: 'empty', theme: { colors: { background: '#ffffff' } }, blocks: [] };
    const cloned = clonePortfolio(empty);

    assert.deepEqual(cloned, empty);
    assert.notStrictEqual(cloned, empty);
    assert.notStrictEqual(cloned.theme, empty.theme);
    assert.notStrictEqual(cloned.blocks, empty.blocks);
    const withFirstBlock = addBlock(empty, 'header', { id: 'header-1' });
    assert.deepEqual(withFirstBlock.blocks.map((block) => block.id), ['header-1']);
    assert.strictEqual(deleteBlockById(empty, 'header-1'), empty);
    assert.strictEqual(reorderBlocks(empty, 'header-1', 'header-2'), empty);
    assert.deepEqual(clonePortfolio(null), { blocks: [] });
  });
});
