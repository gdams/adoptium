import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import VendorSelector from '../index';
import vendors from '../../../json/marketplace.json';

describe('VendorSelector', () => {
  const mockSetSelectedVendors = vi.fn();
  const mockSelectedVendors = vendors.map(v => v.identifier);

  beforeEach(() => {
    render(<VendorSelector selectedVendors={mockSelectedVendors} setSelectedVendors={mockSetSelectedVendors} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component correctly', () => {
    expect(screen.getByRole('list')).toHaveClass('vendor-list');
  });

  test('renders the correct number of vendor list items', () => {
    expect(screen.getAllByRole('listitem').length).toBe(vendors.length);
  });

  vendors.forEach((vendor, i) => {
    test(`renders the input checkbox with correct attributes for vendor ${i}`, () => {
      const checkbox = screen.getByTestId(`checkbox-${vendor.identifier}`);
      expect(checkbox).toHaveAttribute('id', `vendor-${vendor.identifier}`);
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveProperty('readOnly', true);
      expect(checkbox).toHaveProperty('checked', true);
    });

    test(`renders the label element with correct attributes for vendor ${i}`, () => {
      const label = screen.getByTitle(vendor.name);
      expect(label).toHaveAttribute('for', `vendor-${vendor.identifier}`);
    });

    test(`renders the img element with correct attributes for vendor ${i}`, () => {
      const img = screen.getByAltText(`${vendor.name} icon`);
      expect(img).toHaveAttribute('src', `/images/vendors/${vendor.icon}`);
      expect(img.style.padding).toBe(vendor.iconPadding || '');
    });
  });

  test('calls handleChange function when a checkbox is toggled', () => {
    const li = screen.getByTestId(`li-${mockSelectedVendors[0]}`);
    fireEvent.click(li);
    expect(mockSetSelectedVendors).toHaveBeenCalledTimes(2 /* 1 by the useEffec() and 1 by the onclick() */);
  });
});
