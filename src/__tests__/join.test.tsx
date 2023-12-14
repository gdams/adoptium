import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import Join, { Head } from '../pages/join';

describe('Join page', () => {
  it('renders correctly', () => {
    const { container } = render(<Join />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Join | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Join />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
