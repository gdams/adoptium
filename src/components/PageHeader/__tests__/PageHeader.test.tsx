import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import PageHeader from '..';;

describe('PageHeader component', () => {
  const title = 'test-title';
  const subtitle = 'test-subtitle';
  it('should render correctly', () => {
    const { container } = render(<PageHeader title={title} subtitle={subtitle}/>);
    expect(container).toMatchSnapshot();
  });

  it('does not render without a subtitle', () => {
    const { container } = render(<PageHeader title={title} subtitle=''/>);
    expect(container).toMatchSnapshot();
  });

  it('does not render without a title', () => {
    const { container } = render(<PageHeader title='' subtitle={subtitle}/>);
    expect(container).toMatchSnapshot();
  });
});