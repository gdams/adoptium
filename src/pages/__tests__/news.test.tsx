import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useOnScreen } from '../../hooks/useOnScreen';
import { describe, expect, it, vi } from 'vitest'
import { fetchNewsItems } from '../../hooks/fetchNews';
import { createRandomNewsAndEventsData } from '../../__fixtures__/hooks';
import { axe } from 'vitest-axe';
import News, { Head } from '../news';

vi.mock('../../hooks/useOnScreen');
vi.mock('../../hooks/fetchNews');

describe('News page', () => {
  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchNewsItems.mockReturnValue(createRandomNewsAndEventsData());

    const { container } = render(<News />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');

    waitFor(() => {
      expect(title).toHaveTextContent('News & Events | Adoptium');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<News />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
