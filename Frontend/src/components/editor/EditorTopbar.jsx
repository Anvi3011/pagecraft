import { ChevronDown, Cloud, FileText, Layers, Menu, PanelLeft, Plus, Save, Settings2, Sparkles, Type, UserRound } from 'lucide-react';

export default function EditorTopbar({ onToggleInsert, onOpenLibrary, onToggleInspector, onPreview, previewMode }) {
  return <header className="topbar">
    <div className="topbar-left">
      <a className="brand" href="#editor" aria-label="Pagecraft editor"><span className="brand-mark"><Layers size={17} strokeWidth={2.5} /></span><span className="brand-name">pagecraft</span></a>
      <span className="top-divider" />
      <div className="top-actions" aria-label="Editor panels">
        <button className="icon-button" aria-label="Toggle insert panel" title="Insert panel" onClick={onToggleInsert}><PanelLeft size={15} /></button>
        <button className="icon-button" aria-label="Open section library" title="Section library" onClick={onOpenLibrary}><Plus size={16} /></button>
        <button className="icon-button" aria-label="Pages panel" title="Pages are shown in the insert panel" onClick={onToggleInsert}><FileText size={14} /></button>
        <button className="icon-button" aria-label="Design properties" title="Design properties" onClick={onToggleInspector}><Type size={15} /></button>
      </div>
    </div>
    <div className="topbar-center">
      <div className="document-name"><span>Alex Morgan — Portfolio</span><span className="plan-chip">FREE</span><span className="save-indicator"><Cloud size={12} /> Sample · not saved</span></div>
    </div>
    <div className="topbar-right">
      <span className="avatar" aria-label="Alex Morgan profile">AM</span>
      <button className="icon-button" aria-label="Properties panel" title="Properties panel" onClick={onToggleInspector}><Settings2 size={15} /></button>
      <button className={`text-button ${previewMode ? 'is-active' : ''}`} onClick={onPreview} title={previewMode ? 'Return to editor' : 'Preview portfolio'}>{previewMode ? <><Menu size={14} /> Edit</> : <><Sparkles size={13} /> Preview</>}</button>
      <button className="text-button" disabled title="Inviting collaborators will be available with team workspaces"><UserRound size={13} /> Invite</button>
      <button className="text-button" disabled title="Saving will be available after portfolio persistence is implemented"><Save size={13} /> Save</button>
      <button className="publish-button" disabled title="Publishing will be available after portfolio persistence is implemented">Publish <ChevronDown size={12} /></button>
    </div>
  </header>;
}
