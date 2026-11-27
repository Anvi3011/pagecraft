const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;

export default function AboutBlock({ data = {} }) {
  return <section className="sample-section" aria-label="About">
    <div className="sample-section-heading"><h2>{text(data.title, 'About')}</h2><p>A little context goes a long way</p></div>
    <p className="about-copy">{text(data.description, 'Add a short introduction to share your background and approach.')}</p>
  </section>;
}
