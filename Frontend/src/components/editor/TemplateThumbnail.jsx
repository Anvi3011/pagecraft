import { Layers } from 'lucide-react';

function Lines({ title = true }) {
  return <div className="thumb-hero-copy">{title && <div className="thumb-line title" />}<div className="thumb-line" /><div className="thumb-line short" /></div>;
}

export default function TemplateThumbnail({ kind }) {
  if (kind.startsWith('nav-')) {
    return <div className={`thumb-nav ${kind === 'nav-light' ? 'light' : ''}`}><span className="thumb-logo"><Layers size={8} /> AM</span><span className="thumb-links">Work&nbsp;&nbsp; About</span><span className="thumb-cta">Contact</span></div>;
  }
  if (kind.startsWith('hero-')) {
    return <div className={`thumb-hero ${kind === 'hero-dark' ? 'dark' : ''}`}><Lines /><div className="thumb-photo" /></div>;
  }
  if (kind.startsWith('cards-')) {
    return <div className="thumb-cards">{[0, 1, 2].map((item) => <div className={`thumb-card ${kind === 'cards-dark' ? 'dark' : ''}`} key={item}><div className="thumb-line title" /><div className="thumb-line" /><div className="thumb-line short" /></div>)}</div>;
  }
  return <div className={`thumb-footer ${kind === 'footer-light' ? 'light' : ''}`}>{[0, 1, 2].map((item) => <div className="thumb-footer-col" key={item}><div className="thumb-line title" /><div className="thumb-line" /><div className="thumb-line" /></div>)}</div>;
}
