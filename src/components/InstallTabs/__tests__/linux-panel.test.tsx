import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { PureLinuxPanel as LinuxPanel } from '../LinuxPanel';

describe('Tests for LinuxPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<LinuxPanel />);
    expect(container).toMatchSnapshot();
  });
});