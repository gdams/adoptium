import { defaultArchitecture, defaultPackageType, packageTypes } from "../defaults";
import { describe, expect, it } from 'vitest'

describe("defaults", () => {
    it("check types", () => {
        expect(packageTypes).toBeInstanceOf(Object);
        expect(typeof defaultPackageType).toBe("string");
        expect(typeof defaultArchitecture).toBe("string");
    });
});
