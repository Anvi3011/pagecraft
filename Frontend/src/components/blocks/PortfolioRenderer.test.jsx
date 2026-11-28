import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PortfolioRenderer from './PortfolioRenderer.jsx';

const portfolio = {
  id: 'test-portfolio',
  title: 'Test portfolio',
  theme: { colors: { accent: '#2255aa', background: '#fff', text: '#222222' } },
  blocks: [
    { id: 'header', type: 'header', data: { name: 'Jordan Lee', headline: 'Design with intention', location: 'Toronto, Canada' } },
    { id: 'about', type: 'about', data: { title: 'About Jordan', description: 'I make useful digital products.' } },
    { id: 'skills', type: 'skills', data: { title: 'Capabilities', items: ['Research', 'Prototyping'] } },
    { id: 'projects', type: 'projects', data: { title: 'Selected projects', items: [{ id: 'one', name: 'Northstar', description: 'Planning made simple.' }] } },
    { id: 'experience', type: 'experience', data: { title: 'Experience', items: [{ id: 'role-one', company: 'Studio North', role: 'Lead Designer', startDate: '2023', endDate: 'Present' }] } },
    { id: 'contact', type: 'contact', data: { title: 'Let’s talk', email: 'jordan@example.com' } },
  ],
};

describe('PortfolioRenderer', () => {
  it('renders all six reusable block types', () => {
    const { container } = render(<PortfolioRenderer portfolio={portfolio} />);

    expect(screen.getByRole('navigation', { name: 'Portfolio navigation' })).toBeInTheDocument();
    for (const name of ['About', 'Skills', 'Projects', 'Experience', 'Contact']) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
    expect(container.querySelectorAll('[data-block-type]')).toHaveLength(6);
  });

  it('renders the content belonging to each block', () => {
    render(<PortfolioRenderer portfolio={portfolio} />);

    expect(screen.getByText('Jordan Lee')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Design with intention' })).toBeInTheDocument();
    expect(screen.getByText('I make useful digital products.')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Northstar')).toBeInTheDocument();
    expect(screen.getByText('Lead Designer')).toBeInTheDocument();
    expect(screen.getByText('jordan@example.com')).toBeInTheDocument();
  });

  it('uses portfolio.blocks order as the rendered order', () => {
    const reordered = { ...portfolio, blocks: [portfolio.blocks[3], portfolio.blocks[0], portfolio.blocks[5]] };
    const { container } = render(<PortfolioRenderer portfolio={reordered} />);
    const renderedIds = [...container.querySelectorAll('[data-block-id]')].map((element) => element.dataset.blockId);

    expect(renderedIds).toEqual(['projects', 'header', 'contact']);
  });

  it('renders duplicate-ID blocks without duplicate React keys or data loss', () => {
    const duplicateIdPortfolio = {
      ...portfolio,
      blocks: [
        { id: 'duplicate', type: 'about', data: { title: 'First duplicate', description: 'First block remains visible.' } },
        { id: 'duplicate', type: 'about', data: { title: 'Second duplicate', description: 'Second block remains visible.' } },
      ],
    };
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<PortfolioRenderer portfolio={duplicateIdPortfolio} />);

    expect(screen.getByRole('heading', { name: 'First duplicate' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Second duplicate' })).toBeInTheDocument();
    expect(container.querySelectorAll('[data-block-id="duplicate"]')).toHaveLength(2);
    expect(consoleError.mock.calls.flat().join(' ')).not.toContain('same key');
    consoleError.mockRestore();
  });

  it('shows a safe fallback for unknown block types', () => {
    render(<PortfolioRenderer portfolio={{ blocks: [{ id: 'future', type: 'future-widget', data: {} }] }} />);

    expect(screen.getByRole('note')).toHaveTextContent('Unsupported portfolio block: future-widget.');
  });

  it('shows an empty state when blocks is an empty array', () => {
    render(<PortfolioRenderer portfolio={{ blocks: [] }} />);

    expect(screen.getByRole('status')).toHaveTextContent('This portfolio has no sections yet.');
  });

  it('handles missing or malformed portfolio and block data without crashing', () => {
    const malformed = {
      blocks: [
        { id: 'header-no-data', type: 'header' },
        { id: 'skills-bad-items', type: 'skills', data: { title: 'Skills with bad items', items: 'not-a-list' } },
        { id: 'about-bad-data', type: 'about', data: 'not-an-object' },
        null,
      ],
    };
    const { container, rerender } = render(<PortfolioRenderer portfolio={malformed} />);

    expect(screen.getByRole('heading', { name: 'Thoughtful design for a changing world.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Skills with bad items' })).toBeInTheDocument();
    expect(screen.getByText('Add a short introduction to share your background and approach.')).toBeInTheDocument();
    expect(screen.getAllByRole('note')).toHaveLength(1);

    rerender(<PortfolioRenderer portfolio={{ blocks: 'not-an-array' }} />);
    expect(within(container).getByRole('status')).toBeInTheDocument();
  });
});
