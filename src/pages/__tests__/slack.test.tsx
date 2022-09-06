import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import Slack from '../slack';

describe('Slack page', () => {
  it('renders correctly', () => {
    const { container } = render(<Slack />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Slack />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
