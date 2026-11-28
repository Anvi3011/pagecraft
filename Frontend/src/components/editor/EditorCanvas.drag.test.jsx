import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const dragProvider = vi.hoisted(() => ({}));

vi.mock('@dnd-kit/react', () => ({
  PointerSensor: class PointerSensor {},
  KeyboardSensor: class KeyboardSensor {},
  DragDropProvider: ({ children, onDragStart, onDragEnd, sensors }) => {
    dragProvider.onDragStart = onDragStart;
    dragProvider.onDragEnd = onDragEnd;
    dragProvider.sensors = sensors;
    return <div data-testid="drag-drop-provider">{children}</div>;
  },
}));

vi.mock('./SortableBlock.jsx', () => ({
  default: ({ block, selected, disabled, onSelect, children }) => <section data-testid={`sortable-${block.id}`} data-selected={selected}>
    <button type="button" aria-label={`Reorder ${block.type} block`} disabled={disabled} onClick={() => onSelect(block.id)}>Handle</button>
    {children}
  </section>,
}));

import EditorCanvas from './EditorCanvas.jsx';

const portfolio = {
  title: 'Drag test portfolio',
  theme: { colors: { accent: '#3377aa', background: '#ffffff', text: '#1f2937' } },
  blocks: [
    { id: 'about-1', type: 'about', data: { title: 'About', description: 'About content' } },
    { id: 'skills-1', type: 'skills', data: { title: 'Skills', items: ['React'] } },
    { id: 'unknown-1', type: 'future-widget', data: {} },
  ],
};

function renderCanvas(props = {}) {
  const callbacks = {
    onBlockSelect: vi.fn(),
    onReorderBlocks: vi.fn(),
    onViewportChange: vi.fn(),
    onZoomChange: vi.fn(),
    onPanModeChange: vi.fn(),
    onPreview: vi.fn(),
    onFit: vi.fn(),
  };
  const result = render(<EditorCanvas portfolio={portfolio} selectedBlockId={null} viewport="desktop" zoom={1} panMode={false} previewMode={false} {...callbacks} {...props} />);
  return { ...callbacks, ...result };
}

const operation = (sourceId, targetId) => ({ operation: { source: { id: sourceId }, target: targetId ? { id: targetId } : undefined } });

describe('EditorCanvas drag lifecycle', () => {
  it('uses the current event API to select the source and request a valid reorder', () => {
    const { onBlockSelect, onReorderBlocks } = renderCanvas();

    act(() => dragProvider.onDragStart(operation('skills-1')));
    act(() => dragProvider.onDragEnd(operation('skills-1', 'about-1')));

    expect(onBlockSelect).toHaveBeenCalledWith('skills-1');
    expect(onReorderBlocks).toHaveBeenCalledWith('skills-1', 'about-1');
    expect(screen.getByTestId('sortable-about-1')).toBeInTheDocument();
    expect(screen.queryByTestId('sortable-unknown-1')).not.toBeInTheDocument();
    expect(dragProvider.sensors.map((sensor) => sensor.name)).toEqual(['PointerSensor', 'KeyboardSensor']);
  });

  it('ignores cancelled, outside, identical, and malformed drops', () => {
    const { onReorderBlocks } = renderCanvas();

    act(() => dragProvider.onDragEnd({ ...operation('skills-1', 'about-1'), canceled: true }));
    act(() => dragProvider.onDragEnd(operation('skills-1')));
    act(() => dragProvider.onDragEnd(operation('skills-1', 'skills-1')));
    act(() => dragProvider.onDragEnd(operation(null, 'about-1')));
    act(() => dragProvider.onDragEnd(operation('unknown-1', 'about-1')));

    expect(onReorderBlocks).not.toHaveBeenCalled();
  });

  it('keeps duplicate IDs rendered but outside the sortable interaction', () => {
    const duplicatePortfolio = {
      ...portfolio,
      blocks: [
        { id: 'duplicate-id', type: 'about', data: { title: 'First duplicate', description: 'First duplicate content' } },
        { id: 'duplicate-id', type: 'skills', data: { title: 'Second duplicate', items: ['React'] } },
      ],
    };
    const { onBlockSelect, onReorderBlocks } = renderCanvas({ portfolio: duplicatePortfolio });

    expect(screen.queryByTestId('sortable-duplicate-id')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'First duplicate' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Second duplicate' })).toBeInTheDocument();
    act(() => dragProvider.onDragStart(operation('duplicate-id')));
    act(() => dragProvider.onDragEnd(operation('duplicate-id', 'duplicate-id')));
    expect(onBlockSelect).not.toHaveBeenCalled();
    expect(onReorderBlocks).not.toHaveBeenCalled();
  });

  it('disables sortable handles and callbacks in pan or preview mode', () => {
    const { onBlockSelect, onReorderBlocks, unmount } = renderCanvas({ panMode: true });

    expect(screen.getByRole('button', { name: 'Reorder about block' })).toBeDisabled();
    act(() => dragProvider.onDragStart(operation('about-1')));
    act(() => dragProvider.onDragEnd(operation('about-1', 'skills-1')));
    expect(onBlockSelect).not.toHaveBeenCalled();
    expect(onReorderBlocks).not.toHaveBeenCalled();

    unmount();
    // Preview removes editor-only sortable chrome entirely.
    renderCanvas({ previewMode: true });
    expect(screen.queryByRole('button', { name: 'Reorder about block' })).not.toBeInTheDocument();
  });
});
