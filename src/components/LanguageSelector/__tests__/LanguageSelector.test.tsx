import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from 'vitest'
import LanguageSelector from '..';

describe('Language Selector component', () => {

  it('renders correctly', () => {
    const { container } = render(
      <LanguageSelector />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly - expanded', async() => {
    const { container } = render(
      <LanguageSelector />
    );
    const dropdownButton = screen.getByRole("button");
    await userEvent.click(dropdownButton).then(async() => {
      expect(container).toMatchSnapshot();
      // Simulate changing the language using the dropdown
      const dropDownElement = screen.getByTestId("en-GB");
      fireEvent.click(dropDownElement);
    });
  });
});