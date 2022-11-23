import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import Comments from '../index';

describe('Comments component', () => {
    it('should render correctly', () => {
        const { container } = render(<Comments />);

        expect(container).toMatchSnapshot();
    });
});