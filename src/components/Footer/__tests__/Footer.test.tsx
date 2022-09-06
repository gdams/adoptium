import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import Footer from '..';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Footer />
    );
    expect(container).toMatchSnapshot();
  });
});