import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import LanguageSelector from '..';

describe('Language Selector component', () => {

  it('renders correctly', () => {
    const { container } = render(
      <LanguageSelector />
    );
    expect(container).toMatchSnapshot();
  });
});