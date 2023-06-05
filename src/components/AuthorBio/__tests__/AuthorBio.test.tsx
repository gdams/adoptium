import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import AuthorBio from '../index';

describe('AuthorBio component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <AuthorBio
                sliceContext={{
                    author: {
                        name: 'Test Author',
                        twitter: 'adoptium',
                        github: 'adoptium',
                        linkedin: 'adoptium',
                    },
                    identifier: 'pmc'
                }}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly - Summary', () => {
        render(
            <AuthorBio
                sliceContext={{
                    author: {
                        name: 'Test Author',
                        summary: 'Test Summary'
                    },
                    identifier: 'pmc'
                }}
            />
        );
    });

    it('should render correctly - no GitHub', () => {
        render(
            <AuthorBio
                sliceContext={{
                    author: {
                        name: 'Test Author',
                        twitter: 'adoptium',
                        linkedin: 'adoptium',
                    },
                    identifier: 'pmc'
                }}
            />
        );
    });

    it('should render correctly - no Linked', () => {
        render(
            <AuthorBio
                sliceContext={{
                    author: {
                        name: 'Test Author',
                        twitter: 'adoptium',
                    },
                    identifier: 'pmc'
                }}
            />
        );
    });

    it('should render correctly - no Twitter', () => {
        render(
            <AuthorBio
                sliceContext={{
                    author: {
                        name: 'Test Author'
                    },
                    identifier: 'pmc'
                }}
            />
        );
    });
});