import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { useOnScreen } from '../../../hooks/useOnScreen';
import { fetchLatestForOS } from '../../../hooks/fetchLatestTemurin';
import { createRandomLatestForOSData } from '../../../__fixtures__/hooks';
import { axe } from 'vitest-axe';
import Index, { Head } from '../index';

vi.mock('../../../hooks/useOnScreen');
vi.mock('../../../hooks/fetchLatestTemurin');

describe('Temurin Index page', () => {
  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());
    const { container } = render(<Index />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');

    waitFor(() => {
      expect(title).toHaveTextContent('Temurin | Adoptium');
    });
  });

  it('has no accessibility violations', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());
    const { container } = render(<Index />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
