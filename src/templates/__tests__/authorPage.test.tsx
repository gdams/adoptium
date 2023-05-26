import React from 'react';
import { render } from '@testing-library/react';
import AuthorPage, { Head } from '../authorPage';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createMDXData } from '../../__fixtures__/page';

let mockData = createMDXData();
const pageContext = {
  author: 'pmc',
  currentPageNumber: 1,
};

describe('AuthorPage pages', () => {
  it('renders correctly', () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={pageContext} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - with next pagination', () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={{ ...pageContext, nextPageNumber: 2 }} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - with previous pagination', () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={{ ...pageContext, previousPageNumber: 1 }} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');
    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - with next and previous pagination', () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={{ ...pageContext, nextPageNumber: 2, previousPageNumber: 1 }} />);
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

  it('head renders correctly - with pagination', () => {
    const { container } = render(<Head pageContext={{ ...pageContext, currentPageNumber: 2 }} />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Adoptium PMC - Page 2 | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AuthorPage data={mockData} pageContext={{ ...pageContext, nextPageNumber: 2, previousPageNumber: 1 }} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});