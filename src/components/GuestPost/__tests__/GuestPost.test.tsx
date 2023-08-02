import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import GuestPost from '../index';

describe('GuestPost component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <GuestPost
                children={[]}
            />
        );

        expect(container).toMatchSnapshot();
    });
});