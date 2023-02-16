import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import ReleaseNotesRender, { fetchTitle } from '../index';
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

    it('should render correctly - no release notes', () => {
        // mock query string version
        vi.mock('query-string', () => ({
            default: {
              parse: () => ({
                version: 'version',
              }),
            }
        }));
        fetchReleaseNotesForVersion.mockReturnValue({ release_notes: null});
        const { container } = render(
            <ReleaseNotesRender />
        );
        expect(fetchReleaseNotesForVersion).toHaveBeenCalledTimes(1);
        expect(container).toMatchSnapshot();
    });
});