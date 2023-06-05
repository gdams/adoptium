import { arches, defaultArchitecture, defaultPackageType, oses, packageTypes } from "../defaults";
import { describe, expect, it } from 'vitest'

describe("defaults", () => {
    it("check types", () => {
        expect(oses).toBeInstanceOf(Object);
        expect(arches).toBeInstanceOf(Object);
        expect(packageTypes).toBeInstanceOf(Object);
        expect(typeof defaultPackageType).toBe("string");
        expect(typeof defaultArchitecture).toBe("string");
    });
});
