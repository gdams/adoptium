import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
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

vi.mock('query-string', () => ({
  default: {
    parse: () => ({
      version: 8,
      variant: 'openjdk8',
    }),
  }
}));

describe('DownloadDropdowns component', () => {
  it('renders correctly', () => {
    act(() => {
      const { container, getByTestId } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      );
      waitFor(() => {
        expect(updater).toHaveBeenCalledTimes(1);
      }).then(() => {
        // Simulate a user using dropdowns
        let select = getByTestId("os-filter");
        fireEvent.change(select, { target: { value: "mock_os" } });
        expect(updater).toHaveBeenCalledTimes(2);
        select = getByTestId("arch-filter");
        fireEvent.change(select, { target: { value: "mock_arch" } });
        expect(updater).toHaveBeenCalledTimes(3);
        select = getByTestId("package-type-filter");
        fireEvent.change(select, { target: { value: "any" } });
        expect(updater).toHaveBeenCalledTimes(4);
        select = getByTestId("version-filter");
        fireEvent.change(select, { target: { value: 1 } });
        expect(updater).toHaveBeenCalledTimes(5);
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