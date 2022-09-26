import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadLatestAssets } from '../fetchTemurinReleases';
import { createMockTemurinReleaseAPI  } from '../../__fixtures__/hooks';

let mockResponse = [createMockTemurinReleaseAPI(false)];

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
      createMockTemurinReleaseAPI(false),
      createMockTemurinReleaseAPI(false)
    ];
    mockResponse[0].binary.image_type = 'sources';
    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON + installer', async() => {
    mockResponse = [createMockTemurinReleaseAPI(true)]
    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });
});