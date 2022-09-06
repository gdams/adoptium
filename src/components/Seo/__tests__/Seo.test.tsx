import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Seo from '..';

describe('SEO component', () => {
  it('SEO metadata renders correctly', () => {
    const { container } = render(
      <Seo
        title="Page Title"
      />
    );
    expect(container).toMatchSnapshot();
  });
});