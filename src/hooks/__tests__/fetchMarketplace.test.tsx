import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAllPkgsForVersion, getImageForDistribution } from '../fetchMarketplace';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';
import vendors from '../../json/marketplace.json';
import getVendorIdentifier from '../../util/vendors';
import AxiosInstance from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(AxiosInstance);
let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];
let selectedVendorIdentifiers = vendors.map(v => getVendorIdentifier(v));

afterEach(() => {
  vi.clearAllMocks();
});

describe('getAllPkgsForVersion', () => {
  it('returns valid JSON', async() => {
    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', selectedVendorIdentifiers).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - Alpine Linux', async() => {
    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'alpine-linux', 'x64', 'any', selectedVendorIdentifiers).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - installer', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];

    mock.onGet().reply(200, mockResponse);

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', selectedVendorIdentifiers).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('getImageForDistribution tests', () => {
    expect(getImageForDistribution('microsoft')).toBe('/images/microsoft-logo.png');
    expect(getImageForDistribution('temurin')).toBe('/images/adoptium-logo.png');
    expect(getImageForDistribution('redhat')).toBe('/images/redhat.svg');
    expect(getImageForDistribution('bisheng')).toBe('/images/huawei.svg');
    expect(getImageForDistribution('zulu')).toBe('/images/azul-logo.png');
    expect(getImageForDistribution('semeru')).toBe('/images/ibm-logo.png');
  });

  it('MarketplaceReleases to be null on error', async() => {
    mock.onGet().reply(500);

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', selectedVendorIdentifiers).then((data) => {
        expect(data).toBeNull
      })
    });
  })
});