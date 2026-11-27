import { Layers, PenTool, Sparkles } from 'lucide-react';

const artIcons = [Layers, Sparkles, PenTool];
const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const items = (value) => Array.isArray(value) ? value.filter((item) => item && typeof item === 'object' && !Array.isArray(item)) : [];

export default function ProjectsBlock({ data = {} }) {
  const projects = items(data.items);
  return <section className="sample-section" aria-label="Projects">
    <div className="sample-section-heading"><h2>{text(data.title, 'Selected work')}</h2><p>A few things I have helped bring to life</p></div>
    {projects.length > 0 ? <div className="project-grid">{projects.map((project, index) => {
      const Icon = artIcons[index % artIcons.length];
      return <article className="project-card" key={text(project.id, `${text(project.name, 'project')}-${index}`)}>
        <div className={`project-art art-${(index % artIcons.length) + 1}`}><Icon size={23} /></div>
        <div className="project-card-copy"><strong>{text(project.name, 'Untitled project')}</strong><p>{text(project.description, 'Add a short description of this project.')}</p></div>
      </article>;
    })}</div> : <p className="about-copy">Add projects to showcase your work.</p>}
  </section>;
}
