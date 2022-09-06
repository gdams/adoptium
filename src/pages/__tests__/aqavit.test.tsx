import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import AQAvit from '../aqavit';

describe('AQAvit page', () => {
  it('renders correctly', () => {
    const { container } = render(<AQAvit />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AQAvit />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
