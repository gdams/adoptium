import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event';
import ReleaseNotesRender from '../index';
import { fetchReleaseNotesForVersion } from '../../../hooks/fetchReleaseNotes';
import { createMockReleaseNotesAPI  } from '../../../__fixtures__/hooks';

vi.mock('../../../hooks/fetchReleaseNotes');

afterEach(() => {
    vi.clearAllMocks();
});

describe('ReleaseNotesRender component', () => {
    it('should render correctly - version not defined', () => {
        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(container).toMatchSnapshot();
    });
    
    it('should render correctly', () => {
        // mock query string version
        vi.mock('query-string', () => ({
            default: {
              parse: () => ({
                version: 'version',
              }),
            }
        }));
        fetchReleaseNotesForVersion.mockReturnValue(createMockReleaseNotesAPI(1));
        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(fetchReleaseNotesForVersion).toHaveBeenCalledTimes(1);
        expect(container).toMatchSnapshot();
    });

    it('pagination should work correctly', async () => {
        // mock query string version
        vi.mock('query-string', () => ({
            default: {
              parse: () => ({
                version: 'version',
              }),
            }
        }));
        fetchReleaseNotesForVersion.mockReturnValue(createMockReleaseNotesAPI(121));
        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–20 of 121');
        const nextButton = screen.getByLabelText('next page');
        await userEvent.click(nextButton).then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('21–40 of 121');
        });
        const previousButton = screen.getByLabelText('previous page');
        await userEvent.click(previousButton).then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–20 of 121');
        });
        const LastButton = screen.getByLabelText('last page');
        await userEvent.click(LastButton).then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('121–121 of 121');
        });
        const FirstButton = screen.getByLabelText('first page');
        await userEvent.click(FirstButton).then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–20 of 121');
        });
        const ChangeRowsPerPage = screen.getByLabelText('rows per page');
        await userEvent.selectOptions(ChangeRowsPerPage, '50').then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–50 of 121');
        });
        // Simulate returning all rows
        await userEvent.selectOptions(ChangeRowsPerPage, '-1').then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–121 of 121');
        });
        await userEvent.selectOptions(ChangeRowsPerPage, '20').then(async() => {
            expect(container.getElementsByClassName('MuiTablePagination-displayedRows')[0].textContent).toBe('1–20 of 121');
        });
    });
});