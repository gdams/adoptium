import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import TemurinArchiveTable from '..';

const releases = [
  createRandomTemurinReleases(false, '1'),
  createRandomTemurinReleases(true, '2'),
];

describe('TemurinArchiveTable component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TemurinArchiveTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - no data', () => {
    const { container } = render(
      <TemurinArchiveTable
        results={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});