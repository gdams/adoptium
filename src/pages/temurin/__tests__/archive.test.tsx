import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Archive, { Head } from '../archive';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(AxiosInstance);

afterEach(() => {
  vi.clearAllMocks();
});

describe('Temurin Archive page', () => {
  it('renders correctly', () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Archive />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title).toHaveTextContent('Archive | Adoptium');
  });

  it('has no accessibility violations', async () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Archive />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
