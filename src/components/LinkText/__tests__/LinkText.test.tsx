import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import LinkText from '..';

describe('LinkText component', () => {

  it('internal link renders correctly', () => {
    const { container } = render(
      <LinkText
        href="/page1"
        children={'Page 1'}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('external URL renders correctly', () => {
    const { container } = render(
      <LinkText
        href="https://external-link.com"
        children={'External Link'}
      />
    );
    expect(container).toMatchSnapshot();
  });

});