import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  const MediaQueryRenderer = (): JSX.Element => {
    const mediaQueryResult = useMediaQuery('media-query-mock');

    if (typeof mediaQueryResult === 'undefined') {
      return <>undefined</>;
    }

    return mediaQueryResult ? <>true</> : <>false</>;
  };

  it('should check for matchMedia support', () => {
    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should return true for matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should return false for not-matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { container } = render(<MediaQueryRenderer />);
    expect(container).toMatchSnapshot();
  });

  it('should subscribe for media changes', () => {
    const listenerMock = vi.fn().mockImplementation((event, handler) => {
      handler();
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: listenerMock,
        removeEventListener: vi.fn(),
      })),
    });

    render(<MediaQueryRenderer />);
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });

  it("should support MediaQueryList's old event listeners", () => {
    const listenerMock = vi.fn().mockImplementation(handler => {
      handler();
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addListener: listenerMock,
        removeListener: vi.fn(),
      })),
    });

    render(<MediaQueryRenderer />);
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });
});
