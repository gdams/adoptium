import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import Releases, { Head } from '../releases';
import AxiosInstance from 'axios'

describe('Releases page', () => {
  it('renders correctly', () => {
    AxiosInstance.get.mockResolvedValue({
      data: {}
    });

    const { container } = render(<Releases />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    AxiosInstance.get.mockResolvedValue({
      data: {}
    });

    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Latest Releases | Adoptium');
  });

  it('has no accessibility violations', async () => {
    AxiosInstance.get.mockResolvedValue({
      data: {}
    });

    const { container } = render(<Releases />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
