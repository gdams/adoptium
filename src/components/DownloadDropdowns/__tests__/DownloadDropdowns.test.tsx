import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act } from 'react-test-renderer';
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import DownloadDropdowns from '..';

const Table = () => {
  return (
    <div>table</div>
  );
};

// Mock the VendorSelector component as this is tested separately
vi.mock('../../VendorSelector', () => {
  return {
    default: () => <div>vendor-selector</div>,
  };
})

vi.mock('../../../util/defaults', () => {
  return {
    oses: ['mock_os'],
    arches: ['mock_arch'],
    versions: [1],
    defaultVersion: 1,
    versionsLTS: [1],
    defaultPackageType: 'jdk',
    defaultArchitecture: 'mock_arch',
    packageTypes: ['jdk'],
  }
});

afterEach(() => {
  vi.clearAllMocks();
});

const updater = vi.fn().mockImplementation(() => {
  return {
    releases: [
      createRandomTemurinReleases(false),
      createRandomTemurinReleases(true),
    ],
  };
});

vi.mock('use-query-params', () => ({
  NumberParam: vi.fn(),
  StringParam: vi.fn(),
  useQueryParam: (arg) => {
    switch (arg) {
      case 'version':
        return [8, () => {}];
      case 'variant':
        return ['openjdk8', () => {}];
    }
  }
}));

describe('DownloadDropdowns component', () => {
  it('renders correctly', () => {
    act(() => {
      const { container } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      );
      waitFor(() => {
        expect(updater).toHaveBeenCalledTimes(1);
      }).then(() => {
        expect(container).toMatchSnapshot();
      });
    });
  });

  it('renders correctly - marketplace', () => {
    act(() => {
      const { container } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={true}
          Table={Table}
        />
      );
      waitFor(() => {
        expect(updater).toHaveBeenCalledTimes(1);
      }).then(() => {
        expect(container).toMatchSnapshot();
      });
    });
  });
});