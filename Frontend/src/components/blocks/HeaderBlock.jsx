import { ArrowUpRight, Layers } from 'lucide-react';

const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;

export default function HeaderBlock({ data = {} }) {
  const name = text(data.name, 'Portfolio');
  const headline = text(data.headline, 'Thoughtful design for a changing world.');
  const location = text(data.location, 'Independent creative');

  return <>
    <nav className="preview-banner" aria-label="Portfolio navigation">
      <div className="preview-brand"><span className="preview-mark"><Layers size={10} /></span>{name}</div>
      <div className="preview-nav"><span>Work</span><span>About</span><span>Contact</span><span className="preview-contact">Let’s talk</span></div>
    </nav>
    <section className="sample-hero" aria-label="Portfolio introduction">
      <div>
        <div className="sample-kicker">{location}</div>
        <h1>{headline}</h1>
        <p>I partner with ambitious teams to build thoughtful products and memorable brands.</p>
        <div className="sample-hero-actions"><span className="sample-primary">Explore my work <ArrowUpRight size={11} /></span><span className="sample-secondary">About me</span></div>
      </div>
      <div className="sample-portrait-wrap" aria-hidden="true"><div className="sample-portrait"><div className="portrait-hair" /><div className="portrait-head" /><div className="portrait-body" /></div></div>
    </section>
  </>;
}
