import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import InstallTabs from '../index';
import * as detectOSModule from '../../../util/detectOS';
import { UserOS } from '../../../util/detectOS';

vi.mock('../../../util/detectOS');

describe('Tests for InstallTabs component', () => {
  it('renders correctly', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.UNKNOWN);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for macOS', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.MAC);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for Linux', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.LINUX);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for Unix', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.UNIX);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for other', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.WIN);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly for mobile', () => {
    vi.spyOn(detectOSModule, 'detectOS').mockReturnValue(UserOS.MOBILE);
    const { container } = render(<InstallTabs />);
    expect(container).toMatchSnapshot();
  });
});