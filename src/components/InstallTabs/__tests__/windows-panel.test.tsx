import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { PureWindowsPanel as WindowsPanel } from '../WindowsPanel';

describe('Tests for WindowsPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<WindowsPanel />);
    expect(container).toMatchSnapshot();
  });
});