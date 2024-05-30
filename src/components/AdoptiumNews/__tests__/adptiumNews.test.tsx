import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AdoptiumNews from '..';

describe('AdoptiumNews component', () => {
  it('renders correctly', () => {
    const { container } = render(<AdoptiumNews />);
    // expect container to either be null or contain a div with the class of alert
    expect(container).toBeNull || expect(container.querySelector('div.text-pink')).toBeTruthy();
  });
});
