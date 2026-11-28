import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@dnd-kit/react/sortable', () => ({
  useSortable: () => ({ ref: vi.fn(), handleRef: vi.fn(), isDragging: false, isDropTarget: false }),
}));

import SortableBlock from './SortableBlock.jsx';

describe('SortableBlock pan-mode behavior', () => {
  it('allows a disabled handle pointer event to reach the canvas', () => {
    const onCanvasPointerDown = vi.fn();
    render(<div onPointerDown={onCanvasPointerDown}>
      <SortableBlock block={{ id: 'about-1', type: 'about', data: {} }} index={0} disabled>About content</SortableBlock>
    </div>);

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Reorder about block' }));
    expect(onCanvasPointerDown).toHaveBeenCalledTimes(1);
  });
});
