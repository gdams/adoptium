import React from 'react';
import { render } from '@testing-library/react';
import AllAsciidocPages, { Head } from '../asciidocTemplate';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createAsciidocData } from '../../__fixtures__/page';

let mockData = createAsciidocData();
const pageContext = {
  locale: 'en',
  defaultGitSHA: '1234567890',
}


describe('Asciidoc pages', () => {
  it('renders correctly', () => {
    const { container } = render(<AllAsciidocPages data={mockData} pageContext />);
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
    const { container } = render(<AllAsciidocPages data={mockData} pageContext />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AllAsciidocPages data={mockData} pageContext />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders correctly - no warning translation is up-to-date', () => {
    let noWarningMockData = createAsciidocData();
    noWarningMockData.asciidoc.pageAttributes.based_on = '1234567890';

    let noWarningPageContext = {
      locale: 'fr',
      defaultGitSHA: '1234567890',
    }

    const { container } = render(<AllAsciidocPages data={noWarningMockData} pageContext={noWarningPageContext} />);

    expect(container.getElementsByClassName('alert-warning').length).toBe(0);
  });

  it('renders correctly - display warning translation is outdated', () => {
    let warningMockData = createAsciidocData();
    warningMockData.asciidoc.pageAttributes.based_on = '0987654321';

    let warningPageContext = {
      locale: 'fr',
      defaultGitSHA: '1234567890',
    }

    const { container } = render(<AllAsciidocPages data={warningMockData} pageContext={warningPageContext} />);

    expect(container.getElementsByClassName('alert-warning').length).toBe(1);
  });
});