import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest';
import { useAdoptiumContributorsApi } from '../useAdoptiumContributorsApi';
import { createMockAdoptiumContributorsApi } from '../../__fixtures__/hooks';

const mockResponse = [createMockAdoptiumContributorsApi()];

afterEach(() => {
  vi.clearAllMocks();
});

describe('useAdoptiumContributorsApi hook', () => {
  // Mock the localStorage
  let localStorageMock;
  beforeEach(() => {
    localStorageMock = (function() {
      let store = {};
      return {
        getItem: function(key) {
          return store[key] || null;
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        },
        removeItem: function(key) {
          delete store[key];
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('fetches data when isVisible is true', async () => {
    // @ts-ignore
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      headers: {
        get: (header: string) => {
          if (header === 'Link') {
            return '<https://api.github.com/repositories/1/contributors?per_page=1&page=2>; rel="next", <https://api.github.com/repositories/1/contributors?per_page=1&page=50>; rel="last"';
          }
          return null;
        }
      }
    }));
    const { result } = renderHook(() => useAdoptiumContributorsApi(true));

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });

    expect(result.current).toEqual({
      avatarUri: 'https://github.com/images/error/octocat_happy.gif',
      profileUri: 'https://github.com/images/error/octocat_happy.gif',
      login: 'test-user',
      contributionsCount: 10,
      commitsListUri: expect.stringMatching(/^https:\/\/github\.com\/adoptium\/\S+\/commits\?author=test-user$/),
      repo: expect.stringMatching(/\S+/)
    });
  });

  it('does not fetch data when isVisible is false', () => {
    const { result } = renderHook(() => useAdoptiumContributorsApi(false));
    expect(result.current).toBeNull();
  });

  it('returns null if error is caught in fetch', async () => {
    global.fetch = vi.fn(() => Promise.reject('error'));
    
    const { result } = renderHook(() => useAdoptiumContributorsApi(true));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(result.current).toBeNull();
  });
});
