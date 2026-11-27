import BlockRenderer from './BlockRenderer.jsx';

const defaultTheme = {
  colors: {
    accent: '#1688e8',
    background: '#ffffff',
    text: '#202a35',
  },
};

const cssColor = (value, fallback) => typeof value === 'string' && /^#[\da-f]{3,8}$/i.test(value) ? value : fallback;

export default function PortfolioRenderer({ portfolio, width = 1120, zoom = 1 }) {
  const safePortfolio = portfolio && typeof portfolio === 'object' && !Array.isArray(portfolio) ? portfolio : {};
  const blocks = Array.isArray(safePortfolio.blocks) ? safePortfolio.blocks : [];
  const theme = safePortfolio.theme && typeof safePortfolio.theme === 'object' ? safePortfolio.theme : defaultTheme;
  const colors = theme.colors && typeof theme.colors === 'object' ? theme.colors : {};
  const accent = cssColor(colors.accent, defaultTheme.colors.accent);
  const background = cssColor(colors.background, defaultTheme.colors.background);
  const text = cssColor(colors.text, defaultTheme.colors.text);
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 1120;
  const safeZoom = Number.isFinite(zoom) && zoom > 0 ? zoom : 1;

  return <div className="canvas-stage" style={{ width: `${safeWidth * safeZoom}px`, minHeight: `${1500 * safeZoom}px` }}>
    <main className="portfolio-page" aria-label={typeof safePortfolio.title === 'string' ? safePortfolio.title : 'Portfolio preview'} style={{ width: safeWidth, '--page-zoom': safeZoom, '--portfolio-accent': accent, '--portfolio-background': background, '--portfolio-text': text }}>
      {blocks.length > 0
        ? blocks.map((block, index) => <BlockRenderer key={block && typeof block.id === 'string' ? block.id : `malformed-block-${index}`} block={block} />)
        : <p className="portfolio-empty" role="status">This portfolio has no sections yet.</p>}
    </main>
  </div>;
}
