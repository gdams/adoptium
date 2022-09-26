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
      expect(result.current?.release_name).toBe('release_name_mock')
    }, { interval: 1 });
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://api.adoptium.net/v3/assets/feature_releases/11/ga?os=linux&architecture=x64&image_type=jdk&jvm_impl=hotspot&page_size=1&vendor=eclipse"
    );
    expect(result.current).toMatchSnapshot()
  })

  it('installer is returned if available', async () => {
    mockResponse = [mockLatestTemurin(true)];
    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(result.current?.release_name).toBe('release_name_mock')
    }, { interval: 1 });
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(result.current).toMatchSnapshot()
  })
});