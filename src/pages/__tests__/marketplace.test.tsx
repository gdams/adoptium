import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Marketplace, { Head } from '../marketplace';
import AxiosInstance from 'axios'
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];

vi.mock('../../util/shuffle', () => {
  return {
    shuffle: (array) => {
      array = [
        {
          name: "Adoptium",
          icon: "vendor-adoptium.png",
          postDownload: null
        }
      ]
      return array
    }
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Marketplace page', () => {
  it('renders correctly', () => {
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse
    });

    const { container } = render(<Marketplace />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');
    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse
    });

    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Marketplace | Adoptium');
  });

  it('has no accessibility violations', async () => {
    AxiosInstance.get.mockResolvedValue({
      data: []
    });

    const { container } = render(<Marketplace />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
