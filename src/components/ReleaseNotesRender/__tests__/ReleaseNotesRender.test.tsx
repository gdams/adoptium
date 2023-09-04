import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import ReleaseNotesRender, { fetchTitle, sortReleaseNotesBy } from '../index';
import { fetchReleaseNotesForVersion, ReleaseNoteAPIResponse } from '../../../hooks/fetchReleaseNotes';
import { createMockReleaseNotesAPI  } from '../../../__fixtures__/hooks';
import { DataGridProps } from "@mui/x-data-grid"
import queryString from 'query-string';

vi.mock('query-string');
vi.mock('../../../hooks/fetchReleaseNotes');

// Disable Virtualization so vitest can render all the columns
// https://github.com/mui/mui-x/issues/1151#issuecomment-1108349639
vi.mock('@mui/x-data-grid', async () => {
    const datagrid: any = await vi.importActual('@mui/x-data-grid')
    const { DataGrid } = datagrid
    return {
        ...datagrid,
        DataGrid: (props: DataGridProps) => {
            return <DataGrid {...props} disableVirtualization />
        },
    }
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('ReleaseNotesRender component', () => {
    it('should render correctly', () => {
        queryString.parse = vi.fn().mockReturnValue({'version': 'jdk-17.0.1+12'});

        // @ts-ignore
        fetchReleaseNotesForVersion.mockReturnValue(createMockReleaseNotesAPI(2));

        const { container } = render(
            <ReleaseNotesRender />
        );

        expect(fetchReleaseNotesForVersion).toHaveBeenCalledTimes(1);
        
        // check if 2 rows are rendered
        expect(container.querySelectorAll('.MuiDataGrid-row')).toHaveLength(2);

        expect(container).toMatchSnapshot();
    });

    
    it('should render correctly - version not defined', () => {
        queryString.parse = vi.fn().mockReturnValue({});

        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(container).toMatchSnapshot();
    });

    it('fetchTitle should return correct title', () => {
        expect(fetchTitle('1')).toContain('P1');
        expect(fetchTitle('2')).toContain('P2');
        expect(fetchTitle('3')).toContain('P3');
        expect(fetchTitle('4')).toContain('P4');
        expect(fetchTitle('5')).toContain('P5');
        expect(fetchTitle('6')).toContain('not publicly visible');
        expect(fetchTitle(null)).toBeUndefined();
        expect(fetchTitle('123')).toBeUndefined();
    });

    // Set type to 'Enhancement' by default if version matches jdk-xx+xx
    it('should render correctly - type set to Enhancement', async () => {
        queryString.parse = vi.fn().mockReturnValue({'version': 'jdk-20+36'});

        function mockReleaseNotes(num: number) {
            let mockReleaseNotesAPI = createMockReleaseNotesAPI(num);
            mockReleaseNotesAPI.release_notes[0].type = 'Enhancement';
            return mockReleaseNotesAPI;
        }

        // @ts-ignore
        fetchReleaseNotesForVersion.mockReturnValue(mockReleaseNotes(2));
        const { container } = render(
            <ReleaseNotesRender />
        );

        // check if 1 row is rendered and 1 is filtered out
        expect(container.querySelectorAll('.MuiDataGrid-row')).toHaveLength(1);
    });

    // sets priority as p? when priority is not defined
    it('should render correctly - priority not defined', () => {
        queryString.parse = vi.fn().mockReturnValue({'version': 'version'});
        function mockReleaseNotes() {
            let mockReleaseNotesAPI = createMockReleaseNotesAPI(1);
            mockReleaseNotesAPI.release_notes[0].priority = undefined;
            return mockReleaseNotesAPI;
        }

        // @ts-ignore
        fetchReleaseNotesForVersion.mockReturnValue(mockReleaseNotes());
        const { container } = render(
            <ReleaseNotesRender />
        );

        const priorityColumn = container.querySelectorAll('.MuiDataGrid-cell')[0];
        expect(priorityColumn.textContent).toContain('P?');
    });

    it('should render correctly - no release notes', () => {
        queryString.parse = vi.fn().mockReturnValue({'version': 'version'});

        // @ts-ignore
        fetchReleaseNotesForVersion.mockReturnValue({ release_notes: null});
        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(fetchReleaseNotesForVersion).toHaveBeenCalledTimes(1);
        expect(container).toMatchSnapshot();
    });

    it('properly sort release notes', () => {
        let unsortedReleaseNotes = {
            "release_name": "jdk-19.0.2+7",
            "release_notes": [
                {
                "id": "100",
                "priority": "2",
                "component": "component_b",
                },
                {
                "id": "200",
                "component": "component_a",
                "priority": "2",
                },
                {
                "id": "300",
                "component": "component_a",
                "priority": "1",
                }
            ]
        };

        let result = sortReleaseNotesBy(unsortedReleaseNotes);

        expect(result.release_notes[0].id).toBe("300")
        expect(result.release_notes[1].id).toBe("200")
        expect(result.release_notes[2].id).toBe("100")
    });
});