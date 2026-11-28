import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EditorCanvas from './EditorCanvas.jsx';

const editorPortfolio = {
  id: 'editor-owned',
  title: 'Editor-owned portfolio',
  theme: { colors: { accent: '#9b59b6', background: '#f8f2ff', text: '#26113a' } },
  blocks: [
    { id: 'about-editor', type: 'about', data: { title: 'Canvas owned content', description: 'Rendered from editor state.' } },
    { id: 'skills-editor', type: 'skills', data: { title: 'Canvas skills', items: ['State', 'Rendering'] } },
  ],
};

function renderCanvas(props = {}) {
  const callbacks = {
    onViewportChange: vi.fn(),
    onZoomChange: vi.fn(),
    onPanModeChange: vi.fn(),
    onPreview: vi.fn(),
    onFit: vi.fn(),
  };
  const result = render(<EditorCanvas portfolio={editorPortfolio} selectedBlockId="about-editor" viewport="desktop" zoom={.7} panMode={false} previewMode={false} {...callbacks} {...props} />);
  return { ...result, ...callbacks };
}

describe('EditorCanvas', () => {
  it('renders the editor-owned portfolio, data, theme, and canonical block order', () => {
    const { container } = renderCanvas();
    const renderedIds = [...container.querySelectorAll('[data-block-id]')].map((element) => element.dataset.blockId);

    expect(screen.getByRole('heading', { name: 'Canvas owned content' })).toBeInTheDocument();
    expect(screen.getByText('Rendered from editor state.')).toBeInTheDocument();
    expect(screen.queryByText('Alex Morgan')).not.toBeInTheDocument();
    expect(renderedIds).toEqual(['about-editor', 'skills-editor']);
    expect(container.querySelector('.portfolio-page')).toHaveStyle('--portfolio-accent: #9b59b6');
  });

  it('updates rendered output when portfolio blocks change and handles empty or malformed input', () => {
    const { container, rerender } = renderCanvas();
    const reordered = { ...editorPortfolio, blocks: [editorPortfolio.blocks[1], editorPortfolio.blocks[0]] };

    rerender(<EditorCanvas portfolio={reordered} selectedBlockId="skills-editor" viewport="desktop" zoom={.7} panMode={false} previewMode={false} onViewportChange={vi.fn()} onZoomChange={vi.fn()} onPanModeChange={vi.fn()} onPreview={vi.fn()} onFit={vi.fn()} />);
    expect([...container.querySelectorAll('[data-block-id]')].map((element) => element.dataset.blockId)).toEqual(['skills-editor', 'about-editor']);

    rerender(<EditorCanvas portfolio={{ blocks: [] }} viewport="desktop" zoom={.7} panMode={false} previewMode={false} onViewportChange={vi.fn()} onZoomChange={vi.fn()} onPanModeChange={vi.fn()} onPreview={vi.fn()} onFit={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveTextContent('This portfolio has no sections yet.');

    rerender(<EditorCanvas portfolio={{ blocks: 'invalid' }} viewport="desktop" zoom={.7} panMode={false} previewMode={false} onViewportChange={vi.fn()} onZoomChange={vi.fn()} onPanModeChange={vi.fn()} onPreview={vi.fn()} onFit={vi.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('preserves viewport, zoom, pan, and preview controls', () => {
    const { container, rerender, onViewportChange, onZoomChange, onPanModeChange, onPreview } = renderCanvas({ panMode: true });

    fireEvent.click(screen.getByRole('button', { name: 'Tablet' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Select tool' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle preview mode' }));

    expect(onViewportChange).toHaveBeenCalledWith('tablet');
    expect(onZoomChange.mock.calls[0][0](.7)).toBe(.8);
    expect(onPanModeChange).toHaveBeenCalledWith(false);
    expect(onPreview).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.canvas-scroller')).toHaveClass('is-pan');

    rerender(<EditorCanvas portfolio={editorPortfolio} selectedBlockId="about-editor" viewport="desktop" zoom={.7} panMode={false} previewMode onViewportChange={vi.fn()} onZoomChange={vi.fn()} onPanModeChange={vi.fn()} onPreview={vi.fn()} onFit={vi.fn()} />);
    expect(screen.queryByRole('toolbar', { name: 'Canvas tools' })).not.toBeInTheDocument();
  });
});
