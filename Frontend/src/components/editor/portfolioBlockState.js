export const supportedBlockTypes = ['header', 'about', 'skills', 'projects', 'experience', 'contact'];

const defaultBlockData = {
  header: {
    name: 'Your name',
    headline: 'A thoughtful introduction to your work.',
    location: 'Based anywhere',
  },
  about: {
    title: 'About me',
    description: 'Share a short introduction about your background, approach, and the work you care about.',
  },
  skills: {
    title: 'Skills',
    items: ['Strategy', 'Design', 'Development'],
  },
  projects: {
    title: 'Selected work',
    items: [
      { id: 'project-1', name: 'Project name', description: 'A concise summary of this project.' },
    ],
  },
  experience: {
    title: 'Experience',
    items: [
      { id: 'experience-1', company: 'Company name', role: 'Your role', startDate: '2024', endDate: 'Present' },
    ],
  },
  contact: {
    title: 'Let’s work together',
    email: 'hello@example.com',
  },
};

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isValidId = (id) => typeof id === 'string' && id.trim().length > 0;
const clone = (value) => structuredClone(value);

function idsFrom(blocks) {
  if (!Array.isArray(blocks)) return new Set();
  return new Set(blocks.filter(isRecord).map((block) => block.id).filter(isValidId));
}

function hasDuplicateIds(blocks) {
  const ids = blocks.filter(isRecord).map((block) => block.id).filter(isValidId);
  return new Set(ids).size !== ids.length;
}

function generatedId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return `block-${globalThis.crypto.randomUUID()}`;
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createDefaultBlockData(type) {
  if (!supportedBlockTypes.includes(type)) return null;
  return clone(defaultBlockData[type]);
}

export function createPortfolioBlock(type, { id, existingBlocks = [], createId = generatedId } = {}) {
  const data = createDefaultBlockData(type);
  if (!data) return null;

  const usedIds = idsFrom(existingBlocks);
  if (id !== undefined) {
    if (!isValidId(id) || usedIds.has(id)) return null;
    return { id, type, data };
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = createId();
    if (isValidId(candidate) && !usedIds.has(candidate)) return { id: candidate, type, data };
  }

  return null;
}

export function clonePortfolio(portfolio) {
  if (!isRecord(portfolio)) return { blocks: [] };
  return {
    ...clone(portfolio),
    blocks: Array.isArray(portfolio.blocks) ? clone(portfolio.blocks) : [],
  };
}

export function addBlock(portfolio, type, options) {
  if (!isRecord(portfolio)) return portfolio;
  const blocks = Array.isArray(portfolio.blocks) ? portfolio.blocks : [];
  if (hasDuplicateIds(blocks)) return portfolio;

  const block = createPortfolioBlock(type, { ...options, existingBlocks: blocks });
  if (!block) return portfolio;
  return { ...portfolio, blocks: [...blocks, block] };
}

export function deleteBlockById(portfolio, id) {
  if (!isRecord(portfolio) || !isValidId(id) || !Array.isArray(portfolio.blocks)) return portfolio;
  if (hasDuplicateIds(portfolio.blocks) || !portfolio.blocks.some((block) => isRecord(block) && block.id === id)) return portfolio;
  return { ...portfolio, blocks: portfolio.blocks.filter((block) => !isRecord(block) || block.id !== id) };
}

export function reorderBlocks(portfolio, sourceId, destinationId) {
  if (!isRecord(portfolio) || !isValidId(sourceId) || !isValidId(destinationId) || sourceId === destinationId || !Array.isArray(portfolio.blocks)) return portfolio;
  const blocks = portfolio.blocks;
  if (hasDuplicateIds(blocks)) return portfolio;

  const sourceIndex = blocks.findIndex((block) => isRecord(block) && block.id === sourceId);
  const destinationIndex = blocks.findIndex((block) => isRecord(block) && block.id === destinationId);
  if (sourceIndex < 0 || destinationIndex < 0) return portfolio;

  const reordered = [...blocks];
  const [sourceBlock] = reordered.splice(sourceIndex, 1);
  reordered.splice(destinationIndex, 0, sourceBlock);
  return { ...portfolio, blocks: reordered };
}

// Short aliases make the helpers convenient for future editor controls.
export const createBlock = createPortfolioBlock;
export const deleteBlock = deleteBlockById;
