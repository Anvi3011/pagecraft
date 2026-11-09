import { useCallback, useEffect, useRef, useState } from 'react';
import EditorCanvas from './EditorCanvas.jsx';
import EditorTopbar from './EditorTopbar.jsx';
import InsertSidebar from './InsertSidebar.jsx';
import PropertiesInspector from './PropertiesInspector.jsx';
import SectionLibrary from './SectionLibrary.jsx';

export default function EditorShell() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All sections');
  const [selectedTemplate, setSelectedTemplate] = useState('hero-split');
  const [viewport, setViewport] = useState('desktop');
  const [zoom, setZoom] = useState(.7);
  const [panMode, setPanMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showInsert, setShowInsert] = useState(true);
  const [showLibrary, setShowLibrary] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [mobilePanel, setMobilePanel] = useState(null);
  const [isCompact, setIsCompact] = useState(() => window.matchMedia('(max-width: 1080px)').matches);
  const canvasRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1080px)');
    const update = () => setIsCompact(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const closeOverlay = (event) => {
      if (event.key === 'Escape') {
        setPreviewMode(false);
        setMobilePanel(null);
      }
    };
    window.addEventListener('keydown', closeOverlay);
    return () => window.removeEventListener('keydown', closeOverlay);
  }, []);

  const togglePanel = useCallback((name) => {
    if (isCompact) {
      setMobilePanel((current) => current === name ? null : name);
      return;
    }
    if (name === 'insert') setShowInsert((visible) => !visible);
    if (name === 'library') setShowLibrary((visible) => !visible);
    if (name === 'inspector') setShowInspector((visible) => !visible);
  }, [isCompact]);

  const openSectionLibrary = () => {
    setActiveCategory('All sections');
    if (isCompact) setMobilePanel('library');
    else setShowLibrary(true);
  };

  const columns = [showInsert ? '184px' : null, showLibrary ? '205px' : null, 'minmax(320px, 1fr)', showInspector ? '238px' : null].filter(Boolean).join(' ');

  const fitCanvas = () => {
    const canvasWidth = canvasRef.current?.clientWidth ?? 900;
    const previewWidth = viewport === 'desktop' ? 1120 : viewport === 'tablet' ? 768 : 390;
    setZoom(Math.max(.35, Math.min(1, Math.floor(((canvasWidth - 80) / previewWidth) * 100) / 100)));
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    if (isCompact) setMobilePanel('library');
  };

  return <div className="editor-app" id="editor">
    <EditorTopbar
      onToggleInsert={() => togglePanel('insert')}
      onOpenLibrary={openSectionLibrary}
      onToggleInspector={() => togglePanel('inspector')}
      onPreview={() => { setPreviewMode((current) => !current); setMobilePanel(null); }}
      previewMode={previewMode}
    />
    <div className={`editor-workspace ${previewMode ? 'preview-mode' : ''}`} style={{ '--editor-columns': columns }}>
      {!previewMode && (isCompact ? mobilePanel === 'insert' : showInsert) && <InsertSidebar search={search} onSearch={setSearch} activeCategory={activeCategory} onCategoryChange={selectCategory} open={mobilePanel === 'insert'} />}
      {!previewMode && (isCompact ? mobilePanel === 'library' : showLibrary) && <SectionLibrary search={search} activeCategory={activeCategory} selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} open={mobilePanel === 'library'} onClose={() => { setShowLibrary(false); setMobilePanel(null); }} />}
      <div ref={canvasRef} className="canvas-slot">
        <EditorCanvas viewport={viewport} onViewportChange={setViewport} zoom={zoom} onZoomChange={setZoom} panMode={panMode} onPanModeChange={setPanMode} previewMode={previewMode} onPreview={() => setPreviewMode(true)} onFit={fitCanvas} />
      </div>
      {!previewMode && (isCompact ? mobilePanel === 'inspector' : showInspector) && <PropertiesInspector open={mobilePanel === 'inspector'} onClose={() => { setShowInspector(false); setMobilePanel(null); }} />}
    </div>
  </div>;
}
