import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import ChecksumModal from '..';

Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
});

const navigatorClipboardSpy = vi.spyOn(navigator.clipboard, 'writeText');

describe('ChecksumModal component', () => {
  it('ChecksumModal renders correctly', () => {
    const { container } = render(
      <ChecksumModal />
    );
    expect(container).toMatchSnapshot();
  });

  it('ChecksumModal copies correctly', async () => {
    const { container } = render(
      <ChecksumModal />
    );
    navigatorClipboardSpy.mockImplementationOnce(() => Promise.resolve());
    userEvent.click(screen.getByText('Copy'));
    await screen.findByText('Copied');
    expect(container).toMatchSnapshot();
    expect(navigatorClipboardSpy).toHaveBeenCalledTimes(1);
  });
});
