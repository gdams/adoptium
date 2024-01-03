import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadLatestAssets } from '../fetchTemurinReleases';
import { createMockTemurinReleaseAPI  } from '../../__fixtures__/hooks';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(AxiosInstance);
let mockResponse = [createMockTemurinReleaseAPI(false, 'jdk')];

afterEach(() => {
  vi.clearAllMocks();
});

describe('loadLatestAssets', () => {
  it('returns valid JSON', async() => {
    mock.onGet().reply(200, mockResponse);

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

    mock.onGet().reply(200, mockResponse);

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

    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jre').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('verify update the release date if this asset is newer', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    const r2 = createMockTemurinReleaseAPI(true, 'jdk');
    r2.binary.updated_at.setDate(r2.binary.updated_at.getDate() + 1);

    mockResponse = [r1, r2]

    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('verify that releases are well sorted', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.binary.architecture = 'x32';
    const r2 = createMockTemurinReleaseAPI(true, 'jdk');
    r2.binary.architecture = 'x64';
    const r3 = createMockTemurinReleaseAPI(true, 'jdk');
    r3.binary.architecture = 'aarch64';
    const r4 = createMockTemurinReleaseAPI(true, 'jdk');
    r4.binary.architecture = 'ppc64le';

    mockResponse = [r1, r2, r3, r4]

    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('pkgsFound to be empty on error', async() => {
    mock.onGet().reply(500);

    renderHook(async() => {
      await loadLatestAssets(8, 'linux', 'x64', 'jdk').then((data) => {
        expect(data).toStrictEqual([])
      })
    });
  })
});
