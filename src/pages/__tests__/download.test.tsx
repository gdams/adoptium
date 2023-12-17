import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Download, { Head } from '../download';

const location = {
  state: {
    link: 'https://fake-download.tar.gz',
    checksum: 'sha265sum_mock',
    os: 'linux',
    arch: 'x64',
    type: 'jdk',
    java_version: '1.0.0',
    pkg_type: 'jdk'
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.gtag = vi.fn();

describe('Download page', () => {
  it('renders correctly', () => {
    const { container } = render(<Download location={location} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(window.gtag).toBeCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(window.gtag).toBeCalledWith('event', 'download', {
      event_category: 'download',
      java_version: '1.0.0',
      event_label: 'linux-x64-jdk',
      link: 'https://fake-download.tar.gz',
      vendor: 'Adoptium'
    });
    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - vendor', () => {
    const location = {
      state: {
        link: 'https://fake-download.tar.gz',
        checksum: 'sha265sum_mock',
        os: 'linux',
        arch: 'x64',
        java_version: '1.0.0',
        vendor: 'Azul',
        pkg_type: 'jre'
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

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title).toHaveTextContent('Thank You | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Download location={location} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
