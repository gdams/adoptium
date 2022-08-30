import { arches, defaultArchitecture, defaultPackageType, defaultVersion, marketplaceDistributions, oses, packageTypes, versions, versionsLTS } from "../defaults";

describe("defaults", () => {
    it("check types", () => {
        expect(oses).toBeInstanceOf(Object);
        expect(arches).toBeInstanceOf(Object);
        expect(packageTypes).toBeInstanceOf(Object);
        expect(versions).toBeInstanceOf(Object);
        expect(versionsLTS).toBeInstanceOf(Object);
        expect(marketplaceDistributions).toBeInstanceOf(Object);
        expect(typeof defaultVersion).toBe("number");
        expect(typeof defaultPackageType).toBe("string");
        expect(typeof defaultArchitecture).toBe("string");
    });
});
