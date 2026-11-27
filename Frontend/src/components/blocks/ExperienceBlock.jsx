const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const items = (value) => Array.isArray(value) ? value.filter((item) => item && typeof item === 'object' && !Array.isArray(item)) : [];

export default function ExperienceBlock({ data = {} }) {
  const roles = items(data.items);
  return <section className="sample-section" aria-label="Experience">
    <div className="sample-section-heading"><h2>{text(data.title, 'Experience')}</h2><p>Good work comes from good teams</p></div>
    {roles.length > 0 ? roles.map((item, index) => <div className="experience-row" key={text(item.id, `${text(item.company, 'role')}-${index}`)}>
      <div className="experience-date">{text(item.startDate, '—')} — {text(item.endDate, 'Present')}</div>
      <div><div className="experience-title">{text(item.role, 'Role')}</div><div className="experience-subtitle">{text(item.company, 'Company')}</div></div>
    </div>) : <p className="about-copy">Add roles and dates to outline your experience.</p>}
  </section>;
}
