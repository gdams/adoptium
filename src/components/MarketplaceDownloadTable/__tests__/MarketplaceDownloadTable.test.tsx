import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { createRandomMarketplaceRelease } from '../../../__fixtures__/hooks';
import MarketplaceDownloadTable from '..';

const releases = [
  createRandomMarketplaceRelease(false),
  createRandomMarketplaceRelease(true),
];

describe('MarketplaceDownloadTable component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MarketplaceDownloadTable
        results={releases}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - no data', () => {
    const { container } = render(
      <MarketplaceDownloadTable
        results={undefined}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - out of date', () => {
    let releases = [
      createRandomMarketplaceRelease(false),
    ];
    const { queryByText } = render(
      <MarketplaceDownloadTable
        results={releases}
      />
    );
    expect(queryByText('Out of Date')).toBeInTheDocument();
  });

  it('renders correctly - in date', () => {
    let releases = [
      createRandomMarketplaceRelease(false),
    ];
    // Inject todays date
    releases[0].binary.timestamp = new Date();
    const { queryByText } = render(
      <MarketplaceDownloadTable
        results={releases}
      />
    );
    expect(queryByText('Out of Date')).not.toBeInTheDocument();
  });
});