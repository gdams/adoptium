import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Releases, { Head } from '../releases';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { mockOsesAPI, mockArchesAPI } from '../../../__fixtures__/hooks';

const mock = new MockAdapter(AxiosInstance);

vi.mock('../../../hooks/fetchConstants', () => {
  return {
    fetchOses: () => {
      return mockOsesAPI();
    },
    fetchArches: () => {
      return mockArchesAPI();
    }
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Releases page', () => {
  it('renders correctly', () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Releases />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Latest Releases | Adoptium');
  });

  it('has no accessibility violations', async () => {
    mock.onGet().reply(200, [], {'pagecount': 0});

    const { container } = render(<Releases />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
