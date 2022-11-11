import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import AQAvit, { Head } from '../aqavit';

describe('AQAvit page', () => {
  it('renders correctly', () => {
    const { container } = render(<AQAvit />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');

    waitFor(() => {
      expect(title).toHaveTextContent('Eclipse AQAvit | Adoptium');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AQAvit />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
