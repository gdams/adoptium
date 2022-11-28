import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import BlogAuthor from '../index';

describe('BlogAuthor component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <BlogAuthor
                author='Adoptium PMC'
                date='2021-07-01'
                identifier='pmc'
            />
        );

        expect(container).toMatchSnapshot();
    });
});