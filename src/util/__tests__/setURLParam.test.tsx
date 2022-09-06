import { setURLParam } from '../setURLParam';
import { describe, expect, it, vi } from 'vitest'

describe('setURLParam', () => {
    it('verify that setURLParam modifies window.history', () => {
        window.history.replaceState = vi.fn();
        expect(window.history.replaceState).not.toHaveBeenCalled();
        setURLParam('version', '8');
        expect(window.history.replaceState).toHaveBeenCalled();
    });
});