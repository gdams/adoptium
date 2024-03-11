import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import LeavingSiteDisclaimerModal from '..';

describe('LeavingSiteDisclaimerModal component', () => {
  it('LeavingSiteDisclaimerModal renders correctly', () => {
    const { container } = render(
      <LeavingSiteDisclaimerModal />
    );
    expect(container).toMatchSnapshot();
  });
});
