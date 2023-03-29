import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import BrandCarousel from '../index';

describe('BrandCarousel component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <BrandCarousel />
        );

        expect(container).toMatchSnapshot();
    });
});
