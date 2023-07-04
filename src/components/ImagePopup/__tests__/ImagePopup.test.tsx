import React from 'react';
import { act, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import ImagePopup from '../index';

describe('ImagePopup component', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ImagePopup
                alt='test'
                src='test'
            />
        );

        // expect modal to have display: none
        const modal = container.querySelector('.modal');
        expect(modal).toHaveStyle('display: none');

        expect(container).toMatchSnapshot();
    });

    it('should expand image when clicked', () => {
        const { container } = render(
            <ImagePopup
                alt='test'
                src='test'
            />
        );

        // expect modal to have display: none
        const modal = container.querySelector('.modal');
        expect(modal).toHaveStyle('display: none');

        const image = container.querySelector('img');

        // open modal
        if (image) {
            act(() => {
                image.click();
            });
        }
        expect(modal).toHaveStyle('display: block');

        // locate modal image
        const modalImage = container.querySelector('.modal-content img');

        // close modal
        if (modalImage) {
            act(() => {
                // @ts-ignore
                modalImage.click();
            });
        }
        expect(modal).toHaveStyle('display: none');
    });
});