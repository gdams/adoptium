import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import LeavingSiteDisclaimerModal from '..';

describe('LeavingSiteDisclaimerModal component', () => {
  it('LeavingSiteDisclaimerModal renders correctly', () => {
    const { container } = render(
      <LeavingSiteDisclaimerModal />
    );
    expect(container).toMatchSnapshot();
  });

  it('LeavingSiteDisclaimerModal continue correctly', async () => {
    const { container } = render(
      <LeavingSiteDisclaimerModal />
    );

    const cancelButton = container.querySelector('button[class="btn btn-primary"]');

    await userEvent.click(cancelButton).then(async() => {
      expect(container).toMatchSnapshot();
    });
  });
});
