import React from 'react';

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest'

import ShellBox from '../index';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

const navigatorClipboardSpy = vi.spyOn(navigator.clipboard, 'writeText');

afterEach(() => {
  vi.clearAllMocks();
});

describe('ShellBox component', (): void => {
  it('renders correctly', (): void => {
    const textToCopy = 'text to be copy';
    const { container } = render(
      <ShellBox textToCopy={textToCopy}>mock-children-code</ShellBox>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    const textToCopy = 'text to be copy';
    const { getByText, findByText } = render(
      <ShellBox textToCopy={textToCopy}>mock-children-code</ShellBox>
    );

    navigatorClipboardSpy.mockImplementationOnce(() => Promise.resolve());
  });
});