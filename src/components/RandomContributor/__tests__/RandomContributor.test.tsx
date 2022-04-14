import React from 'react';
import { render } from '@testing-library/react';
import RandomContributor from '..';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { useAdoptiumContributorsApi } from '../../../hooks/useAdoptiumContributorsApi';
import { createRandomContributorViewData } from '../../../../test/__fixtures__/hooks';

jest.mock('../../../hooks/useOnScreen');
jest.mock('../../../hooks/useAdoptiumContributorsApi');

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