import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import EditLink from '..';

describe('EditLink component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <EditLink
        relativePath="/fake/path.adoc"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('does not render without a path', () => {
    const { container } = render(<EditLink
      relativePath=""
    />);
    expect(container).toMatchSnapshot();
  });
});