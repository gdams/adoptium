import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { createRandomTemurinRelease } from '../../../__fixtures__/hooks';
import TemurinDownloadTable from '..';

let releases = [
  createRandomTemurinRelease(false),
  createRandomTemurinRelease(true),
];

describe('TemurinDownloadTable component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TemurinDownloadTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - with source', () => {
    releases.source = {
        release_name: 'mock-release-name',
        binary: {
          package: {
              link: 'https://mock-link',
          }
        }
    };
    const { container } = render(
      <TemurinDownloadTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - no data', () => {
    const { container } = render(
      <TemurinDownloadTable
        results={undefined}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - Without checksum', () => {
    let releases = [
      createRandomTemurinRelease(true),
    ];

    // erase checksum
    releases[0].binaries[0].checksum = undefined;

    const { container } = render(
      <TemurinDownloadTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });
});