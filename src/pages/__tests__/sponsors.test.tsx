import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe';
import Sponsors, { Head } from '../sponsors';

vi.mock('../../util/shuffle', () => {
  return {
    shuffle: (array) => {
      array = [
        {
          name: 'mock_sponsor',
          logo: 'mock_logo.png',
          url: 'https://mock.com',
          tier: 'mock_tier',
        }
      ]
      return array
    }
  };
});

describe('Sponsors page', () => {
  it('renders correctly', () => {
    const { container } = render(<Sponsors />);

    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Adoptium Project Sponsors | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Sponsors />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
