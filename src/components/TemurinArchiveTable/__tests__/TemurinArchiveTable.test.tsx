import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import TemurinArchiveTable from '..';

const releases =  {
  pagecount: 2,
  releases: [
    createRandomTemurinReleases(false),
    createRandomTemurinReleases(true),
  ]
}

const updatePage = vi.fn();

describe('TemurinArchiveTable component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TemurinArchiveTable
        results={releases}
        updatePage={updatePage}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('next page triggers event', () => {
    const { container, getByLabelText } = render(
      <TemurinArchiveTable
        results={releases}
        updatePage={updatePage}
      />
    );
    expect(updatePage).toHaveBeenCalledTimes(0);
    let next = getByLabelText('Go to last page');
    fireEvent.click(next);
    expect(updatePage).toHaveBeenCalledTimes(1);
  });

  it('renders correctly - no data', () => {
    const { container } = render(
      <TemurinArchiveTable
        results={undefined}
        updatePage={updatePage}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - Without checksum', () => {
    let data = {
      pagecount: 1,
      releases : [
        createRandomTemurinReleases(true),
      ]
    };

    // erase checksum
    data.releases[0].platforms.platform_mock.assets[0].checksum = undefined;

    const { container } = render(
      <TemurinArchiveTable
        results={data}
        updatePage={updatePage}
      />
    );
    expect(container).toMatchSnapshot();
  });
});