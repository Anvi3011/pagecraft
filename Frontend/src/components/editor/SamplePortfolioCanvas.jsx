import { ArrowUpRight, BriefcaseBusiness, Layers, MoveUpRight, PenTool, Sparkles } from 'lucide-react';

function PreviewHeader({ data }) {
  return <section className="sample-hero" aria-label="Portfolio introduction">
    <div><div className="sample-kicker">Independent designer · Brooklyn, NY</div><h1>Designing digital <span>things</span> with purpose.</h1><p>{data.headline}. I partner with ambitious teams to build thoughtful products and memorable brands.</p><div className="sample-hero-actions"><span className="sample-primary">Explore my work <ArrowUpRight size={11} /></span><span className="sample-secondary">About me</span></div></div>
    <div className="sample-portrait-wrap" aria-hidden="true"><div className="sample-portrait"><div className="portrait-hair" /><div className="portrait-head" /><div className="portrait-body" /></div></div>
  </section>;
}

function PreviewAbout({ data }) {
  return <section className="sample-section"><div className="sample-section-heading"><h2>{data.title}</h2><p>A little context goes a long way</p></div><p className="about-copy">{data.description}</p></section>;
}

function PreviewSkills({ data }) {
  return <section className="sample-section"><div className="sample-section-heading"><h2>{data.title}</h2><p>Curiosity is part of the process</p></div><div className="skill-list">{data.items.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></section>;
}

function PreviewProjects({ data }) {
  const artIcons = [<Layers size={23} key="layers" />, <Sparkles size={23} key="sparkles" />, <PenTool size={23} key="pen" />];
  return <section className="sample-section"><div className="sample-section-heading"><h2>{data.title}</h2><p>A few things I have helped bring to life</p></div><div className="project-grid">{data.items.map((project, index) => <article className="project-card" key={project.id}><div className={`project-art art-${index + 1}`}>{artIcons[index]}</div><div className="project-card-copy"><strong>{project.name}</strong><p>{project.description}</p></div></article>)}</div></section>;
}

function PreviewExperience({ data }) {
  return <section className="sample-section"><div className="sample-section-heading"><h2>{data.title}</h2><p>Good work comes from good teams</p></div>{data.items.map((item) => <div className="experience-row" key={item.id}><div className="experience-date">{item.startDate} — {item.endDate}</div><div><div className="experience-title">{item.role}</div><div className="experience-subtitle">{item.company}</div></div></div>)}</section>;
}

function PreviewContact({ data }) {
  return <section className="sample-contact"><div><h2>{data.title}</h2><p>{data.email}</p></div><span className="contact-button">Say hello <MoveUpRight size={11} /></span></section>;
}

const sampleRenderers = { header: PreviewHeader, about: PreviewAbout, skills: PreviewSkills, projects: PreviewProjects, experience: PreviewExperience, contact: PreviewContact };

export default function SamplePortfolioCanvas({ sections, width, zoom }) {
  return <div className="canvas-stage" style={{ width: `${width * zoom}px`, height: `${1230 * zoom}px` }}>
    <div className="portfolio-page" style={{ width, '--page-zoom': zoom }}>
      <nav className="preview-banner" aria-label="Sample portfolio navigation"><div className="preview-brand"><span className="preview-mark"><Layers size={10} /></span>{sections[0]?.data.name ?? 'Alex Morgan'}</div><div className="preview-nav"><span>Work</span><span>About</span><span>Contact</span><span className="preview-contact">Let’s talk</span></div></nav>
      {sections.map((section) => { const SampleRenderer = sampleRenderers[section.type]; return SampleRenderer ? <SampleRenderer key={section.id} data={section.data} /> : null; })}
      <footer className="sample-page-footer"><span>© 2026 Alex Morgan</span><span>Made with care in Brooklyn</span><BriefcaseBusiness size={12} /></footer>
    </div>
  </div>;
}
