import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadLatestAssets } from '../fetchTemurinReleases';
import { createMockTemurinReleaseAPI  } from '../../__fixtures__/hooks';

let mockResponse = [createMockTemurinReleaseAPI(false, 'jdk')];

global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse)
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('loadLatestAssets', () => {
  it('returns valid JSON', async() => {
    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  })

  it('source image is processed correctly', async() => {
    mockResponse = [
      createMockTemurinReleaseAPI(false, 'sources'),
      createMockTemurinReleaseAPI(false, 'jdk')
    ];
    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'any').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON + installer', async() => {
    mockResponse = [
      createMockTemurinReleaseAPI(true, 'jdk'),
      createMockTemurinReleaseAPI(true, 'jre')
    ]
    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jre').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });
});
