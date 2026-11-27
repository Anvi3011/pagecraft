import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./EditorCanvas.jsx', () => ({
  default: ({ portfolio, selectedBlockId }) => <output data-testid="editor-state">{JSON.stringify({ portfolio, selectedBlockId })}</output>,
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
});
