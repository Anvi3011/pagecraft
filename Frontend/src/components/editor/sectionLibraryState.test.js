import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { sectionTemplates } from './editorSampleData.js';
import { addTemplateBlock } from './sectionLibraryState.js';

const supportedTypes = ['header', 'about', 'skills', 'projects', 'experience', 'contact'];

describe('addTemplateBlock', () => {
  it('adds every supported template type in click order with a unique selected block', () => {
    const templates = supportedTypes.map((type) => sectionTemplates.find((template) => template.type === type));
    const original = { id: 'test', theme: { colors: { accent: '#1688e8' } }, blocks: [] };
    let current = original;

    templates.forEach((template, index) => {
      const result = addTemplateBlock(current, template, { createId: () => `new-${index}` });
      assert.equal(result.addedBlock.type, template.type);
      assert.equal(result.addedBlock.id, `new-${index}`);
      assert.equal(result.selectedBlockId, `new-${index}`);
      assert.strictEqual(result.addedBlock, result.portfolio.blocks.at(-1));
      current = result.portfolio;
    });

    assert.deepEqual(current.blocks.map((block) => block.type), supportedTypes);
    assert.equal(new Set(current.blocks.map((block) => block.id)).size, supportedTypes.length);
    assert.strictEqual(current.theme, original.theme);
    assert.deepEqual(original.blocks, []);
  });

  it('rejects templates with unsupported types without changing the portfolio', () => {
    const portfolio = { blocks: [] };
    const result = addTemplateBlock(portfolio, { id: 'future', type: 'future-widget' });

    assert.strictEqual(result.portfolio, portfolio);
    assert.equal(result.addedBlock, null);
    assert.equal(result.selectedBlockId, null);
  });
});
