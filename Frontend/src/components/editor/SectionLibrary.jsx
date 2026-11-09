import { useMemo } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import TemplateThumbnail from './TemplateThumbnail.jsx';
import { libraryCategories, sectionTemplates } from './editorSampleData.js';

export default function SectionLibrary({ search, activeCategory, selectedTemplate, onSelect, open, onClose }) {
  const visibleTemplates = useMemo(() => sectionTemplates.filter((template) => {
    const categoryMatches = activeCategory === 'All sections' || !libraryCategories.includes(activeCategory) || template.category === activeCategory;
    const query = search.trim().toLowerCase();
    const searchMatches = !query || `${template.name} ${template.description} ${template.category} ${template.type}`.toLowerCase().includes(query);
    return categoryMatches && searchMatches;
  }), [activeCategory, search]);

  const categories = [...new Set(visibleTemplates.map((template) => template.category))];
  return <aside className={`library-panel ${open ? 'mobile-open' : ''}`} aria-label="Section template library">
    <div className="panel-heading"><div><h2>Section library</h2><small>Preview templates</small></div><button className="icon-button" onClick={onClose} aria-label="Close section library"><X size={14} /></button></div>
    <div className="library-scroll">
      {visibleTemplates.length === 0 && <p className="property-note">No templates match this search. Try another section name.</p>}
      {categories.map((category) => <section key={category} aria-label={category}>
        <h3 className="library-category">{category}</h3>
        {visibleTemplates.filter((template) => template.category === category).map((template) => <button className={`template-card ${selectedTemplate === template.id ? 'is-selected' : ''}`} key={template.id} onClick={() => onSelect(template.id)} aria-pressed={selectedTemplate === template.id}>
          <span className="template-thumb"><TemplateThumbnail kind={template.preview} /></span>
          <span className="template-card-name">{template.name}<MoreHorizontal className="template-count" size={14} /></span>
          <span className="template-description">{template.description}</span>
        </button>)}
      </section>)}
    </div>
  </aside>;
}
