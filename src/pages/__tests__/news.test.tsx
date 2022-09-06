import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import News from '../news';

describe('News page', () => {
  it('renders correctly', () => {
    const { container } = render(<News />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<News />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
