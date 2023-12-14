import React from 'react';
import { render } from '@testing-library/react';
import { useFlexSearch } from 'react-use-flexsearch';
import Docs, { Head } from '../pages/docs';
import { vi, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';

// Mock data for testing
const mockData = {
  localSearchDocs: {
    index: 'mockIndex',
    store: {},
  },
};

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

describe('Docs page', () => {
  it('renders correctly', () => {
    const { container } = render(<Docs data={mockData} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('Documentation | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Docs data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});