import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SectionLibrary, { filterSectionTemplates } from './SectionLibrary.jsx';
import { sectionTemplates } from './editorSampleData.js';

const renderLibrary = (props = {}) => {
  const onSelect = vi.fn();
  const onAdd = vi.fn();
  render(<SectionLibrary search="" activeCategory="All sections" selectedTemplate={null} onSelect={onSelect} onAdd={onAdd} open onClose={vi.fn()} {...props} />);
  return { onSelect, onAdd };
};

describe('SectionLibrary', () => {
  it('forwards a click for each supported type to selection and block creation', () => {
    const { onSelect, onAdd } = renderLibrary();
    const supportedTypes = ['header', 'about', 'skills', 'projects', 'experience', 'contact'];
    const templates = supportedTypes.map((type) => sectionTemplates.find((template) => template.type === type));

    templates.forEach((template) => fireEvent.click(screen.getByRole('button', { name: new RegExp(template.name, 'i') })));

    expect(onSelect.mock.calls.map(([templateId]) => templateId)).toEqual(templates.map((template) => template.id));
    expect(onAdd.mock.calls.map(([template]) => template.type)).toEqual(supportedTypes);
  });

  it('preserves search and category filtering', () => {
    expect(filterSectionTemplates('career', 'All sections').map((template) => template.id)).toEqual(['experience-list']);
    expect(filterSectionTemplates('', 'Projects').map((template) => template.id)).toEqual(['projects-grid']);

    renderLibrary({ search: 'career' });
    expect(screen.getByText('Career timeline')).toBeInTheDocument();
    expect(screen.queryByText('Project gallery')).not.toBeInTheDocument();
  });
});
