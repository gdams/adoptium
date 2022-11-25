import React from 'react';
import { render } from '@testing-library/react';
import AuthorPage, { Head } from '../../templates/authorPage';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createMDXData } from '../../__fixtures__/page';

let mockData = createMDXData();
const pageContext = {
  author: 'pmc'
};

describe('AuthorPage pages', () => {
  it('renders correctly', () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={pageContext} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head pageContext={pageContext} />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Adoptium PMC | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={pageContext} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});