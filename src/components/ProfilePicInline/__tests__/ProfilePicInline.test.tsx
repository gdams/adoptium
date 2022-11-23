import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import ProfilePicInline from '../index';

describe('ProfilePicInline component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ProfilePicInline
                identifier='pmc'
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly - no profile pic found', () => {
        const { container } = render(
            <ProfilePicInline
                identifier='foo'
            />
        );

        expect(container).toMatchSnapshot();
    });
});