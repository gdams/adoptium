import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import Layout from '..';

describe('Layout component', () => {
  it('renders correctly with data', () => {
    const { container } = render(
      <Layout>
        mock-children
      </Layout>
    );
    expect(container).toMatchSnapshot();
  });
});