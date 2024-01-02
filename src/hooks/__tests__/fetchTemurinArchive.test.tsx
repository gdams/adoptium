import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAssetsForVersion } from '../fetchTemurinArchive';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';
import AxiosInstance from 'axios'

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];

afterEach(() => {
  vi.clearAllMocks();
  mockResponse = [createMockTemurinFeatureReleaseAPI(false)];
});

describe('getAssetsForVersion', () => {
  it('returns valid JSON', async() => {
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - ea', async() => {
    // set type as debugimage
    mockResponse[0].binaries[0].image_type = 'debugimage';

    const newBinary = {
      image_type: 'foobar',
      os: 'mac',
      architecture: 'x64',
      package: {
        name: 'rogue_package',
        link: new URL('https://package_mock/'),
        size: 180,
        checksum: 'package_mock_checksum',
      },
    };

    // add a second binary same as the first but with invalid image_type
    mockResponse[0].binaries.push(newBinary);
    
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ea', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      });
    });
  });

  it('returns valid JSON - with source', async() => {
    mockResponse[0].source = {
      name: 'source_mock',
      size: 100,
      link: new URL('https://source_mock/')
    }
    
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

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

    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - invalid image_type', async() => {
    mockResponse[0].binaries[0].image_type = 'foobar';

    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data?.releases[0].platforms).toStrictEqual({})
      })
    });
  });

  it('returns valid JSON - with installers', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];

    AxiosInstance.get.mockResolvedValue({
      data: mockResponse,
      headers: { 'pagecount': '3' },
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('ReturnedReleases to be empty on error', async() => {
    AxiosInstance.get.mockImplementation((url: String) => {
      return Promise.reject('error')
    });

    renderHook(async() => {
      await getAssetsForVersion(8, 'ga', 5, new Date(Date.UTC(2020, 0, 1)), 0).then((data) => {
        expect(data?.releases).toStrictEqual([])
        expect(data?.pagecount).toBe(0)
      })
    });
  })
});