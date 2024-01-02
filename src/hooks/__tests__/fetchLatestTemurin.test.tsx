import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchLatestForOS } from '../fetchLatestTemurin';
import { mockLatestTemurin  } from '../../__fixtures__/hooks';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

afterEach(() => {
  vi.clearAllMocks();
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('fetchLatestForOS', () => {
  it('binary URL is set correctly', async () => {
    const mockResponse = [mockLatestTemurin(false)];

    mock.onGet().reply(200, mockResponse);
    let spy = vi.spyOn(axios, "get");

    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(result.current?.release_name).toBe('release_name_mock')
    }, { interval: 1 });
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      "https://api.adoptium.net/v3/assets/feature_releases/11/ga?os=linux&architecture=x64&image_type=jdk&jvm_impl=hotspot&page_size=1&vendor=eclipse"
    );
    expect(result.current).toMatchSnapshot()
  })

  it('installer is returned if available', async () => {
    const mockResponse = [mockLatestTemurin(true)];

    mock.onGet().reply(200, mockResponse);
    let spy = vi.spyOn(axios, "get");

    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(result.current?.release_name).toBe('release_name_mock')
    }, { interval: 1 });
    expect(spy).toHaveBeenCalledTimes(1)
    expect(result.current).toMatchSnapshot()
  })

  it('binary to be null on error', async() => {
    mock.onGet().reply(500);
    let spy = vi.spyOn(axios, "get");

    const { result } = renderHook(() => fetchLatestForOS(true, 11, 'linux', 'x64'));
    await waitFor(() => {
      expect(result).toBeNull
    }, { interval: 1 });
    expect(spy).toHaveBeenCalledTimes(1)
  })
});