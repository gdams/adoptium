import { describe, expect, it, vi } from 'vitest'
import { VersionMetaData, getVersionAsString } from '..';


describe('getVersionAsString', () => {
    it('getVersionAsString works correctly', async () => {
        const vmd: VersionMetaData = {
            major: 21,
            minor: 0,
            security: 4,
            pre: 'beta',
            patch: 1,
            build: 5,
            optional: "ea",
            adopt_build_number: 9,
            openjdk_version: "mock-openjdk_version",
            semver: "mock-semver",
        };

        const result = getVersionAsString(vmd, true);

        expect(result).toBe("21.0.4.1-beta+5.9-ea");
    })

    it('getVersionAsString with allowShortNotation works correctly', async () => {
        const vmd: VersionMetaData = {
            major: 21,
            minor: 0,
            security: 0,
            pre: undefined,
            patch: 0,
            build: 0,
            optional: undefined,
            adopt_build_number: 0,
            openjdk_version: "mock-openjdk_version",
            semver: "mock-semver",
        };

        const result = getVersionAsString(vmd, true);

        expect(result).toBe("21");
    })
});
