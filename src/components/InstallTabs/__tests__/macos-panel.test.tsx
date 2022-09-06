import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { PureMacOSPanel as MacOSPanel } from '../MacOSPanel';

describe('Tests for MacOSPanel component', () => {
  it('renders correctly', () => {
    const { container } = render(<MacOSPanel />);
    expect(container).toMatchSnapshot();
  });
});