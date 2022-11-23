import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import ArticlePreview from '../index';

describe('ArticlePreview component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ArticlePreview
                author='Adoptium PMC'
                date='2021-01-01'
                postPath='/test-post'
                title='Test Title'
                description='Test Description'
                identifier='pmc'
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly no match', () => {
        const { container } = render(
            <ArticlePreview
                author='Test Author'
                date='2021-01-01'
                postPath='/test-post'
                title='Test Title'
                excerpt='Test Excerpt'
                identifier='foo'
            />
        );

        expect(container).toMatchSnapshot();
    });
});