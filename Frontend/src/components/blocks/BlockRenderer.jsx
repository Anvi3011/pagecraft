import AboutBlock from './AboutBlock.jsx';
import ContactBlock from './ContactBlock.jsx';
import ExperienceBlock from './ExperienceBlock.jsx';
import HeaderBlock from './HeaderBlock.jsx';
import ProjectsBlock from './ProjectsBlock.jsx';
import SkillsBlock from './SkillsBlock.jsx';

const blockComponents = {
  header: HeaderBlock,
  about: AboutBlock,
  skills: SkillsBlock,
  projects: ProjectsBlock,
  experience: ExperienceBlock,
  contact: ContactBlock,
};

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export default function BlockRenderer({ block }) {
  const safeBlock = isRecord(block) ? block : {};
  const BlockComponent = typeof safeBlock.type === 'string' && Object.hasOwn(blockComponents, safeBlock.type)
    ? blockComponents[safeBlock.type]
    : undefined;

  if (!BlockComponent) {
    return <div className="unknown-block" role="note" data-block-id={typeof safeBlock.id === 'string' ? safeBlock.id : undefined}>
      Unsupported portfolio block{typeof safeBlock.type === 'string' ? `: ${safeBlock.type}` : ''}.
    </div>;
  }

  const data = isRecord(safeBlock.data) ? safeBlock.data : {};
  return <div className="portfolio-block" data-block-id={typeof safeBlock.id === 'string' ? safeBlock.id : undefined} data-block-type={safeBlock.type}>
    <BlockComponent data={data} />
  </div>;
}
