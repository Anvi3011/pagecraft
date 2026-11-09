import { useRef } from 'react';
import { Eye, Hand, Maximize2, Monitor, MousePointer2, Plus, Smartphone, Tablet, ZoomIn, ZoomOut } from 'lucide-react';
import SamplePortfolioCanvas from './SamplePortfolioCanvas.jsx';
import { sampleSections } from './editorSampleData.js';

const viewports = [
  { id: 'desktop', label: 'Desktop', width: 1120, Icon: Monitor },
  { id: 'tablet', label: 'Tablet', width: 768, Icon: Tablet },
  { id: 'mobile', label: 'Mobile', width: 390, Icon: Smartphone },
];

export default function EditorCanvas({ viewport, onViewportChange, zoom, onZoomChange, panMode, onPanModeChange, previewMode, onPreview, onFit }) {
  const viewportRef = useRef(null);
  const panOrigin = useRef(null);
  const selectedViewport = viewports.find((item) => item.id === viewport) ?? viewports[0];
  const changeZoom = (delta) => onZoomChange((current) => Math.min(1.1, Math.max(.35, Math.round((current + delta) * 100) / 100)));

  const startPan = (event) => {
    if (!panMode || event.button !== 0) return;
    const scroller = viewportRef.current;
    panOrigin.current = { x: event.clientX, y: event.clientY, left: scroller.scrollLeft, top: scroller.scrollTop };
    scroller.setPointerCapture(event.pointerId);
    event.preventDefault();
  };
  const movePan = (event) => {
    if (!panOrigin.current) return;
    const scroller = viewportRef.current;
    scroller.scrollLeft = panOrigin.current.left - (event.clientX - panOrigin.current.x);
    scroller.scrollTop = panOrigin.current.top - (event.clientY - panOrigin.current.y);
  };

  return <main className="canvas-workspace" aria-label="Portfolio editing canvas">
    <div className="canvas-topline">
      <div className="viewport-switcher" role="group" aria-label="Preview viewport">
        {viewports.map(({ id, label, Icon }) => <button key={id} className={`view-button ${viewport === id ? 'is-active' : ''}`} onClick={() => onViewportChange(id)} aria-pressed={viewport === id} title={`${label} preview`}><Icon size={13} /><span>{label}</span></button>)}
      </div>
      <span className="canvas-width-label"><span>{selectedViewport.label}</span>{selectedViewport.width}<span>px</span></span>
      <span className="breakpoint-label" title="Responsive breakpoints change the preview viewport only">Breakpoint <Plus size={12} /></span>
    </div>
    <div className={`canvas-scroller ${panMode ? 'is-pan' : ''}`} ref={viewportRef} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={() => { panOrigin.current = null; }} onPointerCancel={() => { panOrigin.current = null; }}>
      <SamplePortfolioCanvas sections={sampleSections} width={selectedViewport.width} zoom={zoom} />
    </div>
    {!previewMode && <div className="canvas-status" role="toolbar" aria-label="Canvas tools">
      <div className="bottom-toolbar">
        <button className={`mini-tool ${!panMode ? 'is-active' : ''}`} onClick={() => onPanModeChange(false)} title="Select tool" aria-label="Select tool" aria-pressed={!panMode}><MousePointer2 size={15} /></button>
        <button className={`mini-tool ${panMode ? 'is-active' : ''}`} onClick={() => onPanModeChange(true)} title="Pan tool" aria-label="Pan tool" aria-pressed={panMode}><Hand size={15} /></button>
        <span className="toolbar-separator" />
        <button className="mini-tool" onClick={onPreview} title="Preview portfolio" aria-label="Toggle preview mode"><Eye size={15} /></button>
        <span className="toolbar-separator" />
        <div className="zoom-control">
          <button className="zoom-button" onClick={() => changeZoom(-.1)} title="Zoom out" aria-label="Zoom out"><ZoomOut size={14} /></button>
          <span className="zoom-value" aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button className="zoom-button" onClick={() => changeZoom(.1)} title="Zoom in" aria-label="Zoom in"><ZoomIn size={14} /></button>
          <button className="zoom-button" onClick={onFit} title="Fit canvas to screen" aria-label="Fit canvas to screen"><Maximize2 size={13} /></button>
        </div>
      </div>
    </div>}
  </main>;
}
