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
    patch: number;
    build: number;
    optional?: string;
    openjdk_version: string;
}