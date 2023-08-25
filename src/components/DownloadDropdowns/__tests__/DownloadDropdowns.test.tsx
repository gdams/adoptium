import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import DownloadDropdowns from '..';
import queryString from 'query-string';

const Table = () => {
  return (
    <div>table</div>
  );
};

vi.mock('../../VendorSelector', () => {
  return {
    default: () => <div>vendor-selector</div>,
  };
})

vi.mock('../../../util/defaults', () => {
  return {
    oses: ['mock_os'],
    arches: ['mock_arch'],
    packageTypes: ['mock_pkg'],
    defaultPackageType: 'mock_pkg',
    defaultArchitecture: 'mock_arch',
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
      os: 'linux',
      arch: 'x64',
      package: 'jdk',
      version: 'latest',
      variant: 'openjdk11',
    }),
  }
}));

describe('DownloadDropdowns component', () => {
  it('renders correctly', async () => {
    const { container, getByTestId } = render(
      <DownloadDropdowns
        updaterAction={updater}
        marketplace={false}
        Table={Table}
      />
    );

    await waitFor(() => {
      expect(updater).toHaveBeenCalledTimes(1);
    });

    let select;

    // Simulate a user using dropdowns
    select = getByTestId('os-filter');
    await act(async () => {
      fireEvent.change(select, { target: { value: 'mock_os' } });
    });

    expect(updater).toHaveBeenCalledTimes(2);

    select = getByTestId('arch-filter');
    await act(async () => {
      fireEvent.change(select, { target: { value: 'mock_arch' } });
    });

    expect(updater).toHaveBeenCalledTimes(3);

    select = getByTestId('package-type-filter');
    await act(async () => {
      fireEvent.change(select, { target: { value: 'mock_pkg' } });
    });

    expect(updater).toHaveBeenCalledTimes(4);

    select = getByTestId('version-filter');
    await act(async () => {
      fireEvent.change(select, { target: { value: 2 } });
    });

    expect(updater).toHaveBeenCalledTimes(5);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - use URL param os=mock_os', async () => {
    queryString.parse = vi.fn().mockReturnValue({'os': "mock_os"});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: 'Mock_os' }).selected).toBeTruthy()
  });

  it('renders correctly - use URL param arch=mock_arch', async () => {
    queryString.parse = vi.fn().mockReturnValue({'arch': "mock_arch"});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: 'mock_arch' }).selected).toBeTruthy()
  });

  it('renders correctly - use URL param package=mock_pkg', async () => {
    queryString.parse = vi.fn().mockReturnValue({'package': "mock_pkg"});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: 'mock_pkg' }).selected).toBeTruthy()
  });

  it('renders correctly - use URL param version=2', async () => {
    queryString.parse = vi.fn().mockReturnValue({'version': "2"});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: '2' }).selected).toBeTruthy()
  });

  it('renders correctly - use URL param version=latest', async () => {
    queryString.parse = vi.fn().mockReturnValue({'version': 'latest'});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: '2' }).selected).toBeTruthy()
  });

  it('renders correctly - use URL paramvariant=openjdk2', async () => {
    queryString.parse = vi.fn().mockReturnValue({'variant': "openjdk2"});

    let getByRole;
    await act(async () => {
      ({ getByRole } = render(
        <DownloadDropdowns
          updaterAction={updater}
          marketplace={false}
          Table={Table}
        />
      ));
    });

    expect(getByRole('option', { name: '2' }).selected).toBeTruthy()
  });

  it('renders correctly - marketplace', async () => {
    const { container } = render(
      <DownloadDropdowns
        updaterAction={updater}
        marketplace={true}
        Table={Table}
      />
    );
    await waitFor(() => {
      expect(updater).toHaveBeenCalledTimes(1);
    });

    expect(container).toMatchSnapshot();
  });
});
