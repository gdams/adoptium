import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AuthorBio from '../index';

describe('AuthorBio component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <AuthorBio
                author={{
                    name:'Test Author',
                    twitter:'adoptium',
                    github:'adoptium',
                    linkedin:'adoptium',
                }}
                identifier='pmc'
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly - Summary', () => {
        const { container } = render(
            <AuthorBio
                author={{
                    name:'Test Author',
                    summary: 'Test Summary'
                }}
                identifier='pmc'
            />
        );
    });

    it('should render correctly - no GitHub', () => {
        const { container } = render(
            <AuthorBio
                author={{
                    name:'Test Author',
                    twitter:'adoptium',
                    linkedin:'adoptium',
                }}
                identifier='pmc'
            />
        );
    });

    it('should render correctly - no Linked', () => {
        const { container } = render(
            <AuthorBio
                author={{
                    name:'Test Author',
                    twitter:'adoptium',
                }}
                identifier='pmc'
            />
        );
    });

    it('should render correctly - no Twitter', () => {
        const { container } = render(
            <AuthorBio
                author={{
                    name:'Test Author'
                }}
                identifier='pmc'
            />
        );
    });
});