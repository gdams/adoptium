import { shuffle } from "../shuffle";
import { describe, expect, it } from 'vitest'

describe("shuffle", () => {
    let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    it("should shuffle a test array", () => {
        expect(shuffle(testArray)).toBeInstanceOf(Object);
        expect(shuffle(testArray)).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(shuffle(testArray)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
        expect(shuffle(testArray).length).toBe(10);
    });
});
