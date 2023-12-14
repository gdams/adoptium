import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import Index, { Head } from '../pages/index';

const mockLatestLTS = {
  mostRecentLts: {
    version: 1
  }
};

describe('Index page', () => {
  it('renders correctly', () => {
    const { container } = render(<Index data={mockLatestLTS} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Home | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Index data={mockLatestLTS} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
