import React from 'react';
import { act, render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import queryString from 'query-string';
import { afterEach, vi } from 'vitest';
import VersionSelector from '../index';
import { defaultVersion } from '../../../util/defaults';

describe('VersionSelector', () => {
  const updater = vi.fn();
  const releaseType = 'ga';
  const Table = () => <div>Table</div>;

  vi.mock('query-string');

  vi.mock('@mui/x-date-pickers/DatePicker', () => {
    return vi.importActual('@mui/x-date-pickers/DesktopDatePicker')
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with default values', async () => {
    queryString.parse = vi.fn().mockReturnValue({});
    await act(async () => {
      render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue(defaultVersion.toString());
    expect(screen.queryByLabelText('View')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('nightly builds prior to:')).not.toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('renders the component with releaseType "ea"', async () => {
    queryString.parse = vi.fn().mockReturnValue({});
    await act(async () => {
      render(<VersionSelector updater={updater} releaseType='ea' Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue(defaultVersion.toString());
    expect(screen.getByTestId('build-num-filter')).toHaveValue('5');
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('updates the version when the select input changes', async () => {
    queryString.parse = vi.fn().mockReturnValue({});
    render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    await act(async () => {
      fireEvent.change(screen.getByTestId('version-filter'), { target: { value: '8' } });
    });
    expect(updater).toHaveBeenCalledWith('8', releaseType, 5, expect.any(Date), 0);
  });
  
  it('updates the number of builds and build date when the inputs change', async () => {
    queryString.parse = vi.fn().mockReturnValue({});
    let container;
    await act(async () => {
      const result = render(<VersionSelector updater={updater} releaseType='ea' Table={Table} />);
      container = result.container;
    });
  
    fireEvent.change(screen.getByTestId('build-num-filter'), { target: { value: 10 } });
  
    await act(async () => {
      const datepicker = screen.getByLabelText('Build Date')
      fireEvent.change(datepicker, { target: { value: '01/01/2022' } })
      expect(datepicker.getAttribute('value')).toBe('01/01/2022');
    });
  
    expect(updater).lastCalledWith('17', 'ea', '10', expect.any(Date), 0);
  
    // Add the snapshot test for the final rendered output
    expect(prettyDOM(container)).toMatchSnapshot();
  });

  it('renders the component with version query param', async () => {
    queryString.parse = vi.fn().mockReturnValue({ version: 11 });

    await act(async () => {
      render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue('11');
    expect(screen.queryByLabelText('View')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('nightly builds prior to:')).not.toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('renders the component with variant query param', async () => {
    queryString.parse = vi.fn().mockReturnValue({ variant: 'openjdk8' });

    await act(async () => {
      render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue('8');
    expect(screen.queryByLabelText('View')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('nightly builds prior to:')).not.toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });
});