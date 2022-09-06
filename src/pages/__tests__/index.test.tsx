import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Index from '../index';

describe('Index page', () => {
  it('renders correctly', () => {
    const { container } = render(<Index />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Index />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
