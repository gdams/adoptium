import React from 'react';
import { act, render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import queryString from 'query-string';
import { afterEach, vi } from 'vitest';
import { useI18next } from 'gatsby-plugin-react-i18next'
import VersionSelector from '../index';
import locales from '../../../../locales/i18n';

const defaultVersion = 1;

describe('VersionSelector', () => {
  const updater = vi.fn();
  const releaseType = 'ga';
  const Table = () => <div>Table</div>;

  vi.mock('query-string');

  vi.mock('gatsby-plugin-react-i18next');

  // @ts-ignore
  useI18next.mockReturnValue({
    language: 'en',
    languages: locales
  });

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
      fireEvent.change(screen.getByTestId('version-filter'), { target: { value: '2' } });
    });
    expect(updater).toHaveBeenCalledWith('2', releaseType, 5, expect.any(Date), 0);
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

    expect(updater).lastCalledWith('1', 'ea', '10', expect.any(Date), 0);

    // Add the snapshot test for the final rendered output
    expect(prettyDOM(container)).toMatchSnapshot();
  });

  it('renders the component with version query param', async () => {
    queryString.parse = vi.fn().mockReturnValue({ version: 2 });

    await act(async () => {
      render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue('2');
    expect(screen.queryByLabelText('View')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('nightly builds prior to:')).not.toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('renders the component with variant query param', async () => {
    queryString.parse = vi.fn().mockReturnValue({ variant: 'openjdk2' });

    await act(async () => {
      render(<VersionSelector updater={updater} releaseType={releaseType} Table={Table} />);
    });
    expect(screen.getByTestId('version-filter')).toHaveValue('2');
    expect(screen.queryByLabelText('View')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('nightly builds prior to:')).not.toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  // loop through locales
  Object.keys(locales).forEach((locale) => {
    it(`renders when the locale is set to ${locale}`, async () => {
      queryString.parse = vi.fn().mockReturnValue({});

      // @ts-ignore
      useI18next.mockReturnValue({
        language: locale,
        languages: locales,
      });

      await act(async () => {
        render(<VersionSelector updater={updater} releaseType='ea' Table={Table} />);
      });
      const datepicker = screen.getByLabelText('Build Date')
      expect(datepicker).toBeInTheDocument();
    });
  });
});