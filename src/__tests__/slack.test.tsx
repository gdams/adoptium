import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import Slack, { Head } from '../pages/slack';

describe('Slack page', () => {
  it('renders correctly', () => {
    const { container } = render(<Slack />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Slack Signup | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slack />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
