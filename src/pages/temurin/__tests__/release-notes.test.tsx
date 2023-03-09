import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { useOnScreen } from '../../../hooks/useOnScreen';
import { fetchReleaseNotesForVersion } from '../../../hooks/fetchReleaseNotes';
import { createMockReleaseNotesAPI } from '../../../__fixtures__/hooks';
import { axe } from 'vitest-axe';
import ReleaseNotesPage, { Head } from '../release-notes';

vi.mock('../../../hooks/useOnScreen');
vi.mock('../../../hooks/fetchReleaseNotes');
// mock query string version
vi.mock('query-string', () => ({
  default: {
    parse: () => ({
      version: 'version',
    }),
  }
}));

describe('Temurin Release Notes page', () => {
  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchReleaseNotesForVersion.mockReturnValue(createMockReleaseNotesAPI(1));
    const { container } = render(<ReleaseNotesPage />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title).toHaveTextContent('Release Notes | Adoptium');

  });

  it('has no accessibility violations', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchReleaseNotesForVersion.mockReturnValue(createMockReleaseNotesAPI(1));
    await act(async () => {
      const { container } = render(<ReleaseNotesPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
