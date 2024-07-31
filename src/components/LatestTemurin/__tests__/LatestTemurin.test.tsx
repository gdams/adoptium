import React from 'react';
import { render } from '@testing-library/react';
import LatestTemurin from '..';
import { useOnScreen } from '../../../hooks/useOnScreen';
import * as detectOSModule from '../../../util/detectOS';
import { UserOS } from '../../../util/detectOS';
import { describe, expect, it, vi } from 'vitest'
import { fetchLatestForOS } from '../../../hooks/fetchLatestTemurin';
import { createRandomLatestForOSData } from '../../../__fixtures__/hooks';

vi.mock('../../../hooks/useOnScreen');
vi.mock('../../../hooks/fetchLatestTemurin');

describe('RandomContributor component', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());

    const { container } = render(<LatestTemurin />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly - Linux', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.LINUX);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());

    const { container } = render(<LatestTemurin />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly - Windows', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.WIN);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());

    const { container } = render(<LatestTemurin />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly - MAC', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.MAC);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLatestForOS.mockReturnValue(createRandomLatestForOSData());

    const { container } = render(<LatestTemurin />);
    expect(container).toMatchSnapshot();
  });
});