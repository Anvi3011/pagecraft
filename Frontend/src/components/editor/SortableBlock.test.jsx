import { fireEvent, render, screen } from '@testing-library/react';
import { DragDropProvider } from '@dnd-kit/react';
import { describe, expect, it, vi } from 'vitest';
import SortableBlock from './SortableBlock.jsx';

const validBlock = { id: 'about-1', type: 'about', data: { title: 'About' } };

function renderSortableBlock(props = {}) {
  const onSelect = vi.fn();
  const result = render(<div onPointerDown={props.onCanvasPointerDown}><DragDropProvider onDragStart={props.onDragStart}><SortableBlock block={validBlock} index={0} onSelect={onSelect} {...props}><button type="button" onClick={props.onContentClick}>Open block content</button></SortableBlock></DragDropProvider></div>);
  return { ...result, onSelect };
}

describe('SortableBlock', () => {
  it('renders block content with an accessible dedicated drag handle', () => {
    renderSortableBlock();

    expect(screen.getByRole('button', { name: 'Open block content' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reorder about block' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open block content' })).not.toHaveAttribute('data-sortable-handle');
  });

  it('displays selected state and selects the stable block ID', () => {
    const { container, onSelect } = renderSortableBlock({ selected: true });

    fireEvent.click(container.querySelector('.sortable-block'));
    expect(container.querySelector('.sortable-block')).toHaveClass('is-selected');
    expect(onSelect).toHaveBeenCalledWith('about-1');
  });

  it('disables drag activation without disabling content interaction', () => {
    const onContentClick = vi.fn();
    const { container } = renderSortableBlock({ disabled: true, onContentClick });
    const handle = screen.getByRole('button', { name: 'Reorder about block' });

    fireEvent.click(screen.getByRole('button', { name: 'Open block content' }));
    expect(onContentClick).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.sortable-block-content')).not.toHaveAttribute('data-sortable-handle');
    expect(handle).toBeDisabled();
    expect(container.querySelector('.sortable-block')).toHaveClass('is-disabled');
  });

  it('keeps content interactions separate from the drag handle', () => {
    const onDragStart = vi.fn();
    renderSortableBlock({ onDragStart });

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Open block content' }));
    expect(onDragStart).not.toHaveBeenCalled();
  });

  it('keeps malformed and unknown blocks safely non-sortable', () => {
    const { rerender } = renderSortableBlock({ block: null });

    expect(screen.getByRole('button', { name: 'Reordering unavailable for this block' })).toBeDisabled();
    rerender(<DragDropProvider><SortableBlock block={{ id: 'future-1', type: 'future-widget', data: {} }} index={1}>Unsupported block</SortableBlock></DragDropProvider>);
    expect(screen.getByRole('button', { name: 'Reordering unavailable for this block' })).toBeDisabled();
  });
});
