import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadLatestAssets } from '../fetchTemurinReleases';
import { createMockTemurinReleaseAPI  } from '../../__fixtures__/hooks';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';
import {getVersionAsString} from '../index'

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

  it('verify update the version if this asset is newer', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.version.major = 17;
    r1.version.minor = 0;
    r1.version.security = 9;
    r1.version.build = 9;
    r1.version.adopt_build_number = 1;
    const r2 = createMockTemurinReleaseAPI(true, 'jdk');
    r2.version.major = 17;
    r2.version.minor = 0;
    r2.version.security = 9;
    r2.version.build = 9;
    r2.version.adopt_build_number = 2;

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

  it('Test that getVersionAsString() works correclty', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.version.major = 17;
    r1.version.minor = 0;
    r1.version.security = 9;
    r1.version.build = 9;
    r1.version.adopt_build_number = 1;
    expect(getVersionAsString(r1.version)).equals('17.0.9+9.1');
  })

  it('Test that getVersionAsString() works correclty with short not allowed', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.version.major = 20;
    r1.version.minor = 0;
    r1.version.security = 0;
    r1.version.build = 36;
    r1.version.patch = 0;
    expect(getVersionAsString(r1.version)).equals('20.0.0+36');
  })

  it('Test that getVersionAsString() works correclty with short allowed', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.version.major = 20;
    r1.version.minor = 0;
    r1.version.security = 0;
    r1.version.build = 36;
    r1.version.patch = 0;
    expect(getVersionAsString(r1.version, true)).equals('20+36');
  })

  it('Test that getVersionAsString() works correclty with patch', async() => {
    const r1 = createMockTemurinReleaseAPI(true, 'jdk');
    r1.version.major = 18;
    r1.version.minor = 0;
    r1.version.security = 2;
    r1.version.build = 1;
    r1.version.patch = 1;
    expect(getVersionAsString(r1.version)).equals('18.0.2.1+1');
  })
});
