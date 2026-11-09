import { useState } from 'react';
import { ChevronDown, ChevronRight, Code2, Database, FileText, Image, LayoutTemplate, Layers, Plus, Search, Sparkles, Type, Square, AlignLeft } from 'lucide-react';

const navGroups = [
  { id: 'pages', label: 'Pages', icon: FileText, children: ['Home', 'About', 'Contact'] },
  { id: 'sections', label: 'Sections', icon: LayoutTemplate, children: ['All sections', 'Navigation', 'Headers', 'About', 'Skills', 'Projects', 'Experience', 'Contact', 'Footers'] },
  { id: 'navigation', label: 'Navigation', icon: Layers, children: ['Main navigation', 'Footer links'] },
  { id: 'collections', label: 'Collection Lists', icon: Database, children: ['Projects', 'Testimonials'] },
  { id: 'fields', label: 'Content Fields', icon: AlignLeft, children: ['Text fields', 'Images', 'Links'] },
];
const sectionCategories = ['All sections', 'Navigation', 'Headers', 'About', 'Skills', 'Projects', 'Experience', 'Contact', 'Footers'];

export default function InsertSidebar({ search, onSearch, activeCategory, onCategoryChange, open }) {
  const [expanded, setExpanded] = useState({ sections: true });
  return (
    <aside className={`insert-sidebar ${open ? 'mobile-open' : ''}`} aria-label="Insert and navigation panel">
      <label className="search-wrap"><Search size={14} /><input aria-label="Search section templates" placeholder="Search sections..." value={search} onChange={(event) => onSearch(event.target.value)} /></label>
      <div className="sidebar-scroll">
        <div className="side-label">Start</div>
        <div className="promo-row">
          <div className="promo-tile soon" title="AI section generation is coming soon"><span className="promo-icon"><Sparkles size={13} /></span><span className="promo-title">AI sections <span className="soon-tag">SOON</span></span></div>
          <div className="promo-tile soon" title="Custom HTML sections are coming soon"><span className="promo-icon"><Code2 size={13} /></span><span className="promo-title">HTML Paste <span className="soon-tag">SOON</span></span></div>
        </div>
        <div className="side-label">Basics</div>
        <div className="nav-section">
          {navGroups.slice(0, 3).map((group) => {
            const Icon = group.icon;
            const isExpanded = !!expanded[group.id];
            const isActive = group.id === 'sections' ? sectionCategories.includes(activeCategory) : activeCategory === group.id;
            return <div key={group.id}>
              <button className={`sidebar-nav-button ${isActive ? 'is-active' : ''}`} onClick={() => { setExpanded((current) => ({ ...current, [group.id]: !current[group.id] })); if (group.id === 'sections') onCategoryChange('All sections'); }} aria-expanded={isExpanded}>
                <span className="nav-icon"><Icon size={14} /></span><span>{group.label}</span>{isExpanded ? <ChevronDown className="nav-chevron" size={13} /> : <ChevronRight className="nav-chevron" size={13} />}
              </button>
              {isExpanded && <div className="nav-sublist">{group.children.map((child) => group.id === 'sections'
                ? <button key={child} className={activeCategory === child ? 'selected' : ''} onClick={() => onCategoryChange(child)}>{child}</button>
                : <span key={child} className={`nav-static-item ${group.id === 'pages' && child === 'Home' ? 'selected' : ''}`}>{child}{group.id === 'pages' && child === 'Home' && <small>Current</small>}</span>)}</div>}
            </div>;
          })}
        </div>
        <div className="side-label">CMS</div>
        <div className="nav-section">
          {navGroups.slice(3).map((group) => {
            const Icon = group.icon;
            const isExpanded = !!expanded[group.id];
            return <div key={group.id}>
              <button className="sidebar-nav-button" onClick={() => setExpanded((current) => ({ ...current, [group.id]: !current[group.id] }))} aria-expanded={isExpanded}><span className="nav-icon"><Icon size={14} /></span><span>{group.label}</span>{isExpanded ? <ChevronDown className="nav-chevron" size={13} /> : <ChevronRight className="nav-chevron" size={13} />}</button>
              {isExpanded && <div className="nav-sublist">{group.children.map((child) => <span key={child} className="nav-static-item">{child}</span>)}</div>}
            </div>;
          })}
        </div>
        <div className="side-label">Elements</div>
        <div className="element-grid"><div className="element-chip"><Type size={12} /> Text</div><div className="element-chip"><Image size={12} /> Image</div><div className="element-chip"><Plus size={12} /> Button</div><div className="element-chip"><Square size={12} /> Container</div></div>
      </div>
    </aside>
  );
}
