import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import MembersGrid from '..';

describe('MembersGrid component', () => {

  const members = [
    {
        name: 'Member 1',
        logo: 'member1.png',
        url: 'https://member1.com'
    },
    {
        name: 'Member 2',
        logo: 'member2.png',
        url: 'https://member2.com'
    }
  ]

  it('Members grid renders correctly', () => {
    const { container } = render(
      <MembersGrid members={members}/>
    );
    expect(container).toMatchSnapshot();
  });

});