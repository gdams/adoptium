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
});