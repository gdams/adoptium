import React from 'react';
import { render } from '@testing-library/react';
import RandomContributor from '..';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { describe, expect, it, vi } from 'vitest'
import { useAdoptiumContributorsApi } from '../../../hooks/useAdoptiumContributorsApi';
import { createRandomContributorViewData, createRandomContributorViewData1Contribution } from '../../../__fixtures__/hooks';

vi.mock('../../../hooks/useOnScreen');
vi.mock('../../../hooks/useAdoptiumContributorsApi');

describe('RandomContributor component', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useAdoptiumContributorsApi.mockReturnValue(createRandomContributorViewData());

    const { container } = render(<RandomContributor />);
    expect(container).toMatchSnapshot();
  });

  it('1 contribution should render as contribution (not contributions)', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useAdoptiumContributorsApi.mockReturnValue(createRandomContributorViewData1Contribution());

    const { container } = render(<RandomContributor />);
    expect(container).toMatchSnapshot();
  });

  it('should render loading animation until data will be fetched', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useAdoptiumContributorsApi.mockReturnValue(false);

    const { container } = render(<RandomContributor />);
    expect(container).toMatchSnapshot();
  });
});