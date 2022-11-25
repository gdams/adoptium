import React from 'react';
import { render } from '@testing-library/react';
import AllAsciidocPages, { Head } from '../../templates/asciidocTemplate';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createAsciidocData } from '../../__fixtures__/page';

let mockData = createAsciidocData();

describe('Asciidoc pages', () => {
  it('renders correctly', () => {
    const { container } = render(<AllAsciidocPages data={mockData} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head data={mockData} />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Asciidoc Page title | Adoptium');
  });

  it('renders correctly - installation slug', () => {
    mockData.asciidoc.fields.slug = '/installation/';
    const { container } = render(<AllAsciidocPages data={mockData} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AllAsciidocPages data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});