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
        expect(fetchTitle('1')).toBe('P1 - Blocks development and/or testing work, production could not run.');
        expect(fetchTitle('2')).toBe('P2 - Crashes, loss of data, severe memory leak.');
        expect(fetchTitle('3')).toBe('P3 - Major loss of function.');
        expect(fetchTitle('4')).toBe('P4 - Minor loss of function, or other problem where easy workaround is present.');
        expect(fetchTitle('5')).toBe('P5 - Cosmetic problem like misspelt words or misaligned text.');
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
});