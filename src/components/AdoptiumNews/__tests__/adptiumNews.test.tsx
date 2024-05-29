import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AdoptiumNews from '..';

describe('AdoptiumNews component', () => {
  it('renders correctly', () => {
    const { container } = render(<AdoptiumNews />);
    expect(container).toMatchSnapshot();
  });
});
