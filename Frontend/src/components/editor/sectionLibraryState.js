import { addBlock, createPortfolioBlock } from './portfolioBlockState.js';

export function addTemplateBlock(portfolio, template, options) {
  if (!portfolio || typeof portfolio !== 'object' || !template || typeof template !== 'object') {
    return { portfolio, addedBlock: null, selectedBlockId: null };
  }

  const block = createPortfolioBlock(template.type, {
    ...options,
    existingBlocks: portfolio.blocks,
  });
  if (!block) return { portfolio, addedBlock: null, selectedBlockId: null };

  const nextPortfolio = addBlock(portfolio, template.type, { id: block.id });
  if (nextPortfolio === portfolio) return { portfolio, addedBlock: null, selectedBlockId: null };

  const addedBlock = nextPortfolio.blocks.at(-1);
  return { portfolio: nextPortfolio, addedBlock, selectedBlockId: addedBlock.id };
}
