import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { createRandomTemurinReleases } from '../../../__fixtures__/hooks';
import TemurinNightlyTable from '..';

const releases = [
  createRandomTemurinReleases(false, '1'),
  createRandomTemurinReleases(true, '2'),
];

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
        results={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});