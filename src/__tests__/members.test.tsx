import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Members, { Head } from '../pages/members';

vi.mock('../util/shuffle', () => {
  return {
    shuffle: (array) => {
      array = [
        {
          name: 'mock_member',
          logo: 'mock_logo.png',
          url: 'https://mock.com',
          tier: 'mock_tier',
        }
      ]
      return array
    }
  };
});

describe('Members page', () => {
  it('renders correctly', () => {
    const { container } = render(<Members />);

    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Adoptium Working Group Members | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Members />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
