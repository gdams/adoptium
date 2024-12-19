import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import TemurinNightlyTable from '..';

const releases =  {
  pagecount: null,
  releases: [
    createRandomTemurinReleases(false),
    createRandomTemurinReleases(true),
  ]
}

describe('TemurinNightlyTable component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TemurinNightlyTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - no data', () => {
    const { container } = render(
      <TemurinNightlyTable
        results={undefined}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - Without checksum', () => {
    const data =  {
      pagecount: null,
      releases: [
        createRandomTemurinReleases(true),
      ]
    }
    
    // erase checksum
    data.releases[0].platforms.platform_mock.assets[0].checksum = undefined;

    const { container } = render(
      <TemurinNightlyTable
        results={data}
      />
    );
    expect(container).toMatchSnapshot();
  });
});