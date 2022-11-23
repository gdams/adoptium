import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Tags from '../index';

describe('Tags component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <Tags
                tags={['foo', 'bar']}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render correctly - no tags', () => {
        const { container } = render(
            <Tags />
        );

        expect(container).toMatchSnapshot();
    });
});