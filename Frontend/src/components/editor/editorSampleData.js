// Presentation-only fixture for the Phase 1 editor shell. It is not loaded from or saved to an API.
// The section records mirror the agreed block envelope so later phases can connect a real portfolio.
export const sampleSections = [
  { id: 'sample-header', type: 'header', data: { name: 'Alex Morgan', headline: 'Product designer & creative developer', location: 'Brooklyn, NY' } },
  { id: 'sample-about', type: 'about', data: { title: 'A little about me', description: 'I turn complex ideas into clear, thoughtful digital experiences. Over the past 7 years, I have partnered with early-stage teams and global brands to shape products people love using.' } },
  { id: 'sample-skills', type: 'skills', data: { title: 'What I bring', items: ['Product design', 'Design systems', 'Prototyping', 'React', 'Creative direction'] } },
  { id: 'sample-projects', type: 'projects', data: { title: 'Selected work', items: [{ id: 'project-one', name: 'Northstar Finance', description: 'A calmer way to plan for what is next.' }, { id: 'project-two', name: 'Fieldnotes', description: 'A new home for curious minds.' }, { id: 'project-three', name: 'Studio Current', description: 'Identity for a more thoughtful future.' }] } },
  { id: 'sample-experience', type: 'experience', data: { title: 'Where I have been', items: [{ id: 'experience-one', company: 'Morrow Studio', role: 'Senior Product Designer', startDate: '2022', endDate: 'Now' }, { id: 'experience-two', company: 'Fable & Co.', role: 'Product Designer', startDate: '2019', endDate: '2022' }] } },
  { id: 'sample-contact', type: 'contact', data: { title: 'Have a good one in mind?', email: 'hello@alexmorgan.design' } },
];

export const sectionTemplates = [
  { id: 'nav-dark', type: 'header', category: 'Navigation', name: 'Studio navigation', description: 'A crisp dark navigation bar', preview: 'nav-dark' },
  { id: 'nav-light', type: 'header', category: 'Navigation', name: 'Minimal navigation', description: 'Quiet links with a clear CTA', preview: 'nav-light' },
  { id: 'hero-split', type: 'header', category: 'Headers', name: 'Portrait introduction', description: 'Personal intro with portrait', preview: 'hero-light' },
  { id: 'hero-dark', type: 'header', category: 'Headers', name: 'Editorial headline', description: 'High contrast, generous type', preview: 'hero-dark' },
  { id: 'about-story', type: 'about', category: 'About', name: 'Short biography', description: 'A compact personal story', preview: 'hero-light' },
  { id: 'skills-grid', type: 'skills', category: 'Skills', name: 'Capability list', description: 'A quick scan of strengths', preview: 'cards-light' },
  { id: 'projects-grid', type: 'projects', category: 'Projects', name: 'Project gallery', description: 'Three projects in a row', preview: 'cards-light' },
  { id: 'experience-list', type: 'experience', category: 'Experience', name: 'Career timeline', description: 'Roles with dates and details', preview: 'cards-dark' },
  { id: 'contact-simple', type: 'contact', category: 'Contact', name: 'Simple contact', description: 'A clear closing invitation', preview: 'footer-light' },
  { id: 'footer-dark', type: 'contact', category: 'Footers', name: 'Dark footer', description: 'Compact links and details', preview: 'footer-dark' },
];

export const libraryCategories = ['Navigation', 'Headers', 'About', 'Skills', 'Projects', 'Experience', 'Contact', 'Footers'];
