import * as React from 'react';
import { vi } from 'vitest';
import { act, render, fireEvent, screen, within } from '@testing-library/react';
import { useFlexSearch } from 'react-use-flexsearch';
import DocumentationHeader from '../index';

// Mock data for testing
const mockData = {
  localSearchDocs: {
    index: 'mockIndex',
    store: {},
  },
};

// Mock window.location.href
// @ts-ignore
delete window.location;
// @ts-ignore
window.location = { href: '' };

// Sample search results
const mockResults = [
    {
      id: "1",
      title: "Test Result 1",
      path: "/test-result-1",
    },
    {
      id: "2",
      title: "Test Result 2",
      path: "/test-result-2",
    },
  ];

const useFlexSearchMock = (mockResults) => () => mockResults;
// Mock useFlexSearch hook
vi.mock('react-use-flexsearch');
// @ts-ignore
useFlexSearch.mockImplementation(useFlexSearchMock(mockResults));

describe('DocumentationHeader', () => {
  beforeEach(() => {
    render(<DocumentationHeader data={mockData} />);
  });

  test('renders component correctly', () => {
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  test('renders Autocomplete component', () => {
    expect(screen.getByTestId('autocomplete')).toBeInTheDocument();
  });

  test('renders TextField component', () => {
    expect(screen.getByLabelText('Start typing to search the docs...')).toBeInTheDocument();
  });

  test("filters search results based on search query", () => {
    const autocomplete = screen.getByTestId('autocomplete');
    const input: HTMLInputElement = within(autocomplete).getByLabelText(
        "Start typing to search the docs..."
      ) as HTMLInputElement;

    autocomplete.focus();
    const searchPhrase = 'Test Result 1';
  
    // Type a search query that matches the first mock result
    act(() => {
        fireEvent.change(input, { target: { value: searchPhrase} });
    });

    // navigate to the first item in the autocomplete box
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    // select the first item
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    // check the new value of the input field
    expect(input.value).toEqual(searchPhrase);
  });

  test("redirects the user to the selected option's link on Autocomplete onChange event", () => {
    const autocomplete = screen.getByTestId('autocomplete');
    const input: HTMLInputElement = within(autocomplete).getByLabelText(
        "Start typing to search the docs..."
      ) as HTMLInputElement;

    autocomplete.focus();
    const mockOption = { link: '/test-result-1' };

    act(() => {
        fireEvent.change(input, { target: { value: mockOption } });
    });

    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    expect(window.location.href).toEqual(mockOption.link);
  });
});
