import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { useOnScreen } from '../../../hooks/useOnScreen';
import { fetchLatestForOS } from '../../../hooks/fetchLatestTemurin';
import { createRandomLatestForOSData } from '../../../__fixtures__/hooks';
import { axe } from 'vitest-axe';
import Index from '../index';

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
