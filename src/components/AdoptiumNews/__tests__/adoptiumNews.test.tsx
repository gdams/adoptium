import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AdoptiumNews from '..';

const mockedItems = [
  {
      title: "Mocked News 1", 
      body: "Be a part of the Adoptium", 
      date: new Date('2024-09-10'),
      startDisplayAt: new Date('2024-01-01'),
      stopDisplayAfter: new Date('2050-12-31'),
  },
  {
      title: "Mocked News 2", 
      body: "I love Adoptium.<br/><callToActionLink>Go here</callToActionLink>", 
      callToActionLink: 'https://adoptium.net/', 
      date: new Date('2024-09-10'),
      startDisplayAt: new Date('2024-01-01'),
      stopDisplayAfter: new Date('2050-12-31'),
  }
]

describe('AdoptiumNews component', () => {
  it('renders correctly', () => {
    const { container } = render(<AdoptiumNews />);
    // expect container to either be null or contain a div with the class of alert
    expect(container).toBeNull || expect(container.querySelector('div.text-pink')).toBeTruthy();
  });

  it('renders correctly with provided news', () => {
    const { container } = render(<AdoptiumNews adoptiumNewsList={mockedItems} />);

    expect(container).toMatchSnapshot();
  });
});
