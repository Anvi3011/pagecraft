const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const items = (value) => Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item.trim()) : [];

export default function SkillsBlock({ data = {} }) {
  const skills = items(data.items);
  return <section className="sample-section" aria-label="Skills">
    <div className="sample-section-heading"><h2>{text(data.title, 'Skills')}</h2><p>Curiosity is part of the process</p></div>
    {skills.length > 0 ? <div className="skill-list">{skills.map((skill, index) => <span className="skill-pill" key={`${skill}-${index}`}>{skill}</span>)}</div> : <p className="about-copy">Add skills to show what you bring to the work.</p>}
  </section>;
}
