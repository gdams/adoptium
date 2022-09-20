import moment from "moment";
import { fetchExtension } from '../util/fetchExtension';

const baseUrl = 'https://api.adoptium.net/v3';

let releases: TemurinReleases[] = []

export async function getAssetsForVersion(
  version: number,
  releaseType: any,
  numBuilds: number,
  buildDate: Date
): Promise<TemurinReleases[] | null> {
  let url = new URL(`${baseUrl}/assets/feature_releases/${version}/${releaseType}?vendor=eclipse`);
  if (numBuilds) {
    url.searchParams.append('page_size', numBuilds.toString());
  }
  if (buildDate) {
    url.searchParams.append('before', moment(buildDate).format('Y-MM-DD'));
  }
  releases = []
  const response = await getPkgs(url)
  const packages = JSON.parse(response)
  let pkgsFound: TemurinReleases[] = []
  for (let pkg of packages) {
      pkgsFound.push(pkg);
  }
  return renderReleases(pkgsFound);
}

async function getPkgs(url: URL) {
  let response = await fetch(url)
  return response.text();
}

function renderReleases(pkgs) {
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
  
        // Skip this asset if its platform could not be matched (see the website's 'config.json')
        if (!platform) {
          return;
        }
  
        // Skip this asset if it's not a binary type we're interested in displaying
        const binary_type = aReleaseAsset.image_type.toUpperCase();
        if (binary_type == 'SOURCES') {
          release.source_url = new URL(aReleaseAsset.package.link);
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
          extension: fetchExtension(aReleaseAsset.package.link.toString())
        };
  
        if (aReleaseAsset.installer) {
          binary_constructor.installer_link = aReleaseAsset.installer.link;
          binary_constructor.installer_checksum = aReleaseAsset.installer.checksum;
          binary_constructor.installer_size =  Math.floor(aReleaseAsset.installer.size / 1000 / 1000);
          binary_constructor.installer_extension = fetchExtension(aReleaseAsset.installer.link.toString())
        }
  
        // Add the new binary to the release asset
        release.platforms[platform].assets.push(binary_constructor);
    });
    releases.push(release);
  })
  return releases
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
    link: URL;
    checksum: string;
    size: number;
  };
  installer?: {
    link: URL;
    checksum: string;
    size: number;
  };
}