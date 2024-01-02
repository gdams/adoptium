import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getAllPkgsForVersion, getImageForDistribution } from '../fetchMarketplace';
import { createMockTemurinFeatureReleaseAPI  } from '../../__fixtures__/hooks';
import vendors from '../../json/marketplace.json';
import getVendorIdentifier from '../../util/vendors';
import AxiosInstance from 'axios'

let mockResponse = [createMockTemurinFeatureReleaseAPI(false)];
let selectedVendorIdentifiers = vendors.map(v => getVendorIdentifier(v));

afterEach(() => {
  vi.clearAllMocks();
});

describe('getAllPkgsForVersion', () => {
  it('returns valid JSON', async() => {
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse
    });

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', selectedVendorIdentifiers).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - Alpine Linux', async() => {
    AxiosInstance.get.mockResolvedValue({
      data: mockResponse
    });

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'alpine-linux', 'x64', 'any', selectedVendorIdentifiers).then((data) => {
        expect(data).toMatchSnapshot()
      })
    });
  });

  it('returns valid JSON - installer', async() => {
    mockResponse = [createMockTemurinFeatureReleaseAPI(true)];

    AxiosInstance.get.mockResolvedValue({
      data: mockResponse
    });

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
    AxiosInstance.get.mockImplementation((url: String) => {
      return Promise.reject('error')
    });

    renderHook(async() => {
      await getAllPkgsForVersion(8, 'linux', 'x64', 'jdk', selectedVendorIdentifiers).then((data) => {
        expect(data).toBeNull
      })
    });
  })
});