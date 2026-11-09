import { ChevronRight, CircleHelp, Palette, Square } from 'lucide-react';

function PropertyRow({ label, value, select = false }) {
  return <div className="property-line"><span>{label}</span><span className={`property-value disabled ${select ? 'select' : ''}`}>{value}{select && <ChevronRight size={12} />}</span></div>;
}

function PropertyGroup({ title, children, open = false }) {
  return <details className="inspector-group" open={open}><summary>{title}<ChevronRight size={13} /></summary><div className="inspector-content">{children}</div></details>;
}

export default function PropertiesInspector({ open, onClose }) {
  return <aside className={`properties-panel ${open ? 'mobile-open' : ''}`} aria-label="Properties inspector">
    <div className="properties-title"><h2>Properties</h2><div><button className="icon-button" title="Inspector help" aria-label="Inspector help"><CircleHelp size={13} /></button><button className="icon-button" onClick={onClose} aria-label="Close properties panel"><ChevronRight size={14} /></button></div></div>
    <div className="inspector-scroll">
      <div className="inspector-selection"><span className="selection-symbol"><Square size={14} /></span><span className="selection-text"><strong>Portfolio page</strong><span>Sample preview</span></span></div>
      <PropertyGroup title="Overlays"><PropertyRow label="Background" value="None" select /><PropertyRow label="Opacity" value="100%" /></PropertyGroup>
      <PropertyGroup title="Link"><PropertyRow label="URL" value="Not set" /><PropertyRow label="Target" value="Same tab" select /></PropertyGroup>
      <PropertyGroup title="Position" open><PropertyRow label="Type" value="Relative" select /><PropertyRow label="Position" value="Auto" /></PropertyGroup>
      <PropertyGroup title="Size" open><PropertyRow label="Width" value="100%" select /><PropertyRow label="Height" value="Auto" select /><PropertyRow label="Min / max" value="Add…" /></PropertyGroup>
      <PropertyGroup title="Layout" open><PropertyRow label="Type" value="Stack" select /><PropertyRow label="Direction" value="Horizontal" select /><PropertyRow label="Distribute" value="Space between" select /><PropertyRow label="Align" value="Center" select /><PropertyRow label="Gap" value="24 px" /></PropertyGroup>
      <PropertyGroup title="Typography"><PropertyRow label="Font family" value="Inter" select /><PropertyRow label="Size" value="16 px" /><PropertyRow label="Weight" value="Regular" select /><PropertyRow label="Alignment" value="Left" select /></PropertyGroup>
      <PropertyGroup title="Appearance"><PropertyRow label="Background" value="#FFFFFF" /><PropertyRow label="Text" value="#202633" /><PropertyRow label="Border radius" value="0 px" /><PropertyRow label="Shadow" value="None" select /></PropertyGroup>
      <PropertyGroup title="Spacing"><PropertyRow label="Margin" value="0 px" /><PropertyRow label="Padding" value="48 px" /><PropertyRow label="Section gap" value="32 px" /></PropertyGroup>
      <div className="inspector-notice"><Palette size={13} /><span>These are sample properties. Editing controls connect when the portfolio schema and renderer are integrated.</span></div>
    </div>
  </aside>;
}
