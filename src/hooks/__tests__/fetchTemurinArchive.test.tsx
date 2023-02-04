import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAssetsForVersion } from '../fetchTemurinArchive';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];

global.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockResponse),
  headers: {
    get: () => '3'
  }
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('getAssetsForVersion', () => {
  it('returns valid JSON', async() => {
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - with source', async() => {
    mockResponse[0].source = {
      name: 'source_mock',
      size: 100,
      link: new URL('https://source_mock/')
    }
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - with release notes', async() => {
    mockResponse[0].release_notes = {
      name: 'release_notes_mock',
      size: 100,
      link: new URL('https://release_notes_mock/')
    }
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - invalid image_type', async() => {
    mockResponse[0].binaries[0].image_type = 'foobar';
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data?.releases[0].platforms).toStrictEqual({})
      })
    });
  });

  it('returns valid JSON - with installers', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];
    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });
});