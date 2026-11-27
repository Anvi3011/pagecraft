import { MoveUpRight } from 'lucide-react';

const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;

export default function ContactBlock({ data = {} }) {
  return <section className="sample-contact" aria-label="Contact">
    <div><h2>{text(data.title, 'Let’s work together')}</h2><p>{text(data.email, 'Add your contact email')}</p></div>
    <span className="contact-button">Say hello <MoveUpRight size={11} /></span>
  </section>;
}
