import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import ProfilePic from '../index';

describe('ProfilePic component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ProfilePic
                identifier='pmc'
                name='sample name'
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly - no profile pic found', () => {
        const { container } = render(
            <ProfilePic
                identifier='foo'
            />
        );

        expect(container).toMatchSnapshot();
    });
});