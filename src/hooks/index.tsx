export * from './useOnScreen';
export * from './useAdoptiumContributorsApi';
export * from './fetchMarketplace';
export * from './fetchTemurinReleases';
export * from './fetchTemurinArchive';
export * from './fetchLatestTemurin';
export * from './fetchNews';
export * from './fetchReleaseNotes';

export interface VersionMetaData {
    major: number;
    minor: number;
    security: number;
    pre?: string;
    patch?: number;
    build: number;
    optional?: string;
    adopt_build_number?: number;
    openjdk_version: string;
    semver: string;
};

/**
 * This method compares two versions and returns:
 * ->  0 if versions are equals
 * -> -1 if versionA is lower than versionB
 * ->  1 if versionA is highter than versionB
 * 
 * @param versionA 
 * @param versionB 
 * @returns 
 */
export function compareVersions(versionA: VersionMetaData, versionB: VersionMetaData) : number {
    let comparison = versionA.major - versionB.major;
    if (comparison === 0) {
        comparison = versionA.minor - versionB.minor;
        if (comparison === 0) {
            comparison = versionA.security - versionB.security;
            if (comparison === 0) {
                comparison = versionA.build - versionB.build;
                if (comparison === 0) {
                    comparison = (versionA.adopt_build_number ? versionA.adopt_build_number : 0) - (versionB.adopt_build_number? versionB.adopt_build_number : 0);
                }
            }
        }
    }
    return comparison;
}

export function getVersionAsString(version: VersionMetaData) : string {
    let result = `${version.major}.${version.minor}.${version.security}`;
    if(version.build) {
        result += `+${version.build}`;
        if(version.adopt_build_number) result += `.${version.adopt_build_number}`;
    }
    return result;
}
