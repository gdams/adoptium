import React from 'react';
import { render } from '@testing-library/react';
import TagPage, { Head } from '../../templates/tagPage';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createMDXData } from '../../__fixtures__/page';

let mockData = createMDXData();
const pageContext = {
  tag: 'test'
};

describe('TagPage pages', () => {
  it('renders correctly', () => {
    const { container } = render(<TagPage data={mockData} pageContext={pageContext} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head pageContext={pageContext} />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('test | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TagPage data={mockData} pageContext={pageContext} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});