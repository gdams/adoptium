import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Download from '../download';

const location = {
  state: {
    link: 'https://fake-download.tar.gz',
    os: 'linux',
    arch: 'x64',
    type: 'jdk',
    version: '11.0.11'
  }
}

describe('Download page', () => {
  it('renders correctly', () => {
    const { container } = render(<Download location={location} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - vendor', () => {
    const location = {
      state: {
        link: 'https://fake-download.tar.gz',
        os: 'linux',
        arch: 'x64',
        type: 'jdk',
        version: '11.0.11',
        vendor: 'azul'
      }
    }
    const { container } = render(<Download location={location} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - no link', () => {
    const location = {
      state: {}
    }
    const { container } = render(<Download location={location} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Download location={location} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
