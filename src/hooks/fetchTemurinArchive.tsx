import moment from 'moment';
import { VersionMetaData } from '.';
import { fetchExtension } from '../util/fetchExtension';

const baseUrl = 'https://api.adoptium.net/v3';

let releases: TemurinReleases[] = []

export async function getAssetsForVersion(
  version: number,
  releaseType: any,
  numBuilds: number,
  buildDate: Date,
  page: number
): Promise<ReturnedReleases | null> {
  let url = new URL(`${baseUrl}/assets/feature_releases/${version}/${releaseType}?vendor=eclipse`);
  url.searchParams.append('page', page.toString());
  if (numBuilds) {
    url.searchParams.append('page_size', numBuilds.toString());
  }
  if (buildDate) {
    url.searchParams.append('before', moment(buildDate).format('Y-MM-DD'));
  }
  // Expose total page count in header for pagination
  if (releaseType == 'ga') {
    url.searchParams.append('show_page_count', 'true');
  }
  releases = []
  const response = await getPkgs(url)
  const packages = await response.json()
  const pagecount = Number(response.headers.get('pagecount'))
  let pkgsFound: TemurinReleases[] = []
  for (let pkg of packages) {
      pkgsFound.push(pkg);
  }
  return renderReleases(pkgsFound, pagecount);
}

async function getPkgs(url: URL) {
  let response = await fetch(url)
  return response;
}

function renderReleases(pkgs, pagecount) {
  pkgs.forEach((aRelease) => {
    const release: TemurinReleases = {
        release_name: aRelease.release_name,
        release_link: aRelease.release_link,
        timestamp: aRelease.timestamp,
        platforms: {},
    };

    aRelease.binaries.forEach((
      aReleaseAsset: APIResponse) => {
        const platform = `${aReleaseAsset.os}-${aReleaseAsset.architecture}`
  
        // Skip this asset if it's not a binary type we're interested in displaying
        const binary_type = aReleaseAsset.image_type.toUpperCase();
        if (aRelease.source) {
          release.source_url = new URL(aRelease.source.link);
        }
        if (aRelease.release_notes) {
          release.release_notes = true;
        }
        if (!['INSTALLER', 'JDK', 'JRE'].includes(binary_type)) {
          return;
        }
  
        if (!release.platforms[platform]) {
          release.platforms[platform] = {
            assets: [],
          };
        }
  
        let binary_constructor: ReleaseAsset = {
          os: aReleaseAsset.os,
          architecture: aReleaseAsset.architecture,
          type: binary_type,
          link: aReleaseAsset.package.link,
          checksum: aReleaseAsset.package.checksum,
          size: Math.floor(aReleaseAsset.package.size / 1000 / 1000),
          extension: fetchExtension(aReleaseAsset.package.name)
        };
  
        if (aReleaseAsset.installer) {
          binary_constructor.installer_link = aReleaseAsset.installer.link;
          binary_constructor.installer_checksum = aReleaseAsset.installer.checksum;
          binary_constructor.installer_size =  Math.floor(aReleaseAsset.installer.size / 1000 / 1000);
          binary_constructor.installer_extension = fetchExtension(aReleaseAsset.installer.name)
        }
  
        // Add the new binary to the release asset
        release.platforms[platform].assets.push(binary_constructor);
    });
    releases.push(release);
  })
  return {releases, pagecount}
}

export interface ReturnedReleases {
  releases: TemurinReleases[];
  pagecount: number;
}

export interface TemurinReleases {
  release_name: string;
  release_link: URL;
  source_url?: URL;
  timestamp: Date;
  platforms: {
    [key: string]: {
      assets: ReleaseAsset[];
    };
  };
  release_notes?: boolean;
}

interface ReleaseAsset {
  os: string;
  architecture: string;
  type: string;
  link: URL;
  checksum: string;
  size: number;
  extension: string;
  installer_link?: URL;
  installer_checksum?: string;
  installer_size?: number;
  installer_extension?: string;
}

interface APIResponse {
  os: string;
  architecture: string;
  image_type: string;
  package: {
    name: string;
    link: URL;
    checksum: string;
    size: number;
  };
  installer?: {
    link: URL;
    name: string;
    checksum: string;
    size: number;
  };
}

export interface MockTemurinFeatureReleaseAPI {
  id: string;
  download_count: number;
  release_name: string;
  release_type: string;
  release_link: URL;
  source?: {
    link: URL;
    name: string;
    size: number;
  };
  binaries: APIResponse[];
  release_notes?: {
    link: URL;
    name: string;
    size: number;
  };
  timestamp: Date;
  updated_at: Date;
  vendor: string;
  version_data: VersionMetaData;
}