import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Join from '../join';

describe('Join page', () => {
  it('renders correctly', () => {
    const { container } = render(<Join />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Join />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
