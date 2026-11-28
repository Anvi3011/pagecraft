import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./EditorCanvas.jsx', () => ({
  default: ({ portfolio, selectedBlockId, onBlockSelect, onReorderBlocks }) => <>
    <output data-testid="editor-state">{JSON.stringify({ portfolio, selectedBlockId })}</output>
    <button type="button" onClick={() => onBlockSelect('sample-header')}>Select header block</button>
    <button type="button" onClick={() => onReorderBlocks('sample-header', 'sample-skills')}>Move header below skills</button>
    <button type="button" onClick={() => onReorderBlocks('missing-source', 'sample-skills')}>Attempt invalid move</button>
  </>,
}));

import EditorShell from './EditorShell.jsx';

describe('EditorShell section additions', () => {
  it('keeps consecutive additions, ordering, theme, and the newest selection', () => {
    render(<EditorShell />);
    const initialState = JSON.parse(screen.getByTestId('editor-state').textContent);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Short biography/i }));
      fireEvent.click(screen.getByRole('button', { name: /Capability list/i }));
    });

    const nextState = JSON.parse(screen.getByTestId('editor-state').textContent);
    const { blocks } = nextState.portfolio;
    const addedBlocks = blocks.slice(-2);

    expect(blocks.slice(0, initialState.portfolio.blocks.length)).toEqual(initialState.portfolio.blocks);
    expect(addedBlocks.map((block) => block.type)).toEqual(['about', 'skills']);
    expect(new Set(blocks.map((block) => block.id)).size).toBe(blocks.length);
    expect(nextState.selectedBlockId).toBe(addedBlocks[1].id);
    expect(nextState.portfolio.theme).toEqual(initialState.portfolio.theme);
  });

  it('reorders the editor-owned portfolio immutably while preserving selection and theme', () => {
    render(<EditorShell />);
    const initialState = JSON.parse(screen.getByTestId('editor-state').textContent);

    fireEvent.click(screen.getByRole('button', { name: 'Select header block' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move header below skills' }));

    const reorderedState = JSON.parse(screen.getByTestId('editor-state').textContent);
    expect(reorderedState.portfolio.blocks.map((block) => block.id).slice(0, 3)).toEqual(['sample-about', 'sample-skills', 'sample-header']);
    expect(reorderedState.selectedBlockId).toBe('sample-header');
    expect(reorderedState.portfolio.blocks.find((block) => block.id === 'sample-header')).toEqual(initialState.portfolio.blocks[0]);
    expect(reorderedState.portfolio.theme).toEqual(initialState.portfolio.theme);

    fireEvent.click(screen.getByRole('button', { name: 'Attempt invalid move' }));
    expect(JSON.parse(screen.getByTestId('editor-state').textContent)).toEqual(reorderedState);
  });
});
