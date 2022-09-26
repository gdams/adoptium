import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchLatestForOS } from '../fetchLatestTemurin';
import { mockLatestTemurin  } from '../../__fixtures__/hooks';

let mockResponse = [mockLatestTemurin(false)];

global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse)
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchLatestForOS', () => {
  it('binary URL is set correctly', async () => {
    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(result.current?.release_name).toBe('release_name_mock')
      expect(result.current?.link).toEqual(new URL('https://link_mock/'))
    }, { interval: 1 });
  })

  it('installer is returned if available', async () => {
    mockResponse = [mockLatestTemurin(true)];
    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(result.current?.link).toEqual(new URL('https://installer_link_mock'))
    }, { interval: 1 });
  })
});