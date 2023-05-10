import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AuthorsList from '..';

describe('AuthorsList component', () => {
  it('renders correctly', () => {
    const authors = ['test-author', 'another-test-author'];
    const { container } = render(<AuthorsList authors={authors} />);
    expect(container).toMatchSnapshot();
  });

  it('returns null when no authors are passed', () => {
    const { container } = render(<AuthorsList authors={[]} />);
    expect(container).toBeNull;
  });
});
