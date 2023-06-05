import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import VendorSelector from '../index';
import vendors from '../../../json/marketplace.json';

describe('VendorSelector', () => {
  const mockSetCheckbox = vi.fn();
  const checkboxRef = { current: {} };

  beforeEach(() => {
    render(<VendorSelector checkboxRef={checkboxRef} setCheckbox={mockSetCheckbox} />);
  });

  test('renders component correctly', () => {
    expect(screen.getByRole('list')).toHaveClass('vendor-list');
  });

  test('renders the correct number of vendor list items', () => {
    expect(screen.getAllByRole('listitem').length).toBe(vendors.length);
  });

  vendors.forEach((vendor, i) => {
    test(`renders the input checkbox with correct attributes for vendor ${i}`, () => {
      const checkbox = screen.getByTestId(vendor.name);
      expect(checkbox).toHaveAttribute('id', `vendor${vendor.name}`);
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveProperty('defaultChecked', true);
    });

    test(`renders the label element with correct attributes for vendor ${i}`, () => {
      const label = screen.getByTitle(vendor.name);
      expect(label).toHaveAttribute('for', `vendor${vendor.name}`);
    });

    test(`renders the img element with correct attributes for vendor ${i}`, () => {
      const img = screen.getByAltText(`${vendor.name} icon`);
      expect(img).toHaveAttribute('src', `/images/vendors/${vendor.icon}`);
      expect(img.style.padding).toBe(vendor.iconPadding || '');
    });
  });

  test('calls handleChange function when a checkbox is toggled', () => {
    const checkbox = screen.getByTitle(vendors[0].name);
    fireEvent.click(checkbox);
    expect(mockSetCheckbox).toHaveBeenCalledTimes(1);
  });
});
