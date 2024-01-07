import { VersionMetaData, compareVersions, getVersionAsString } from '.';
import { fetchExtension } from '../util/fetchExtension';
import axios from 'axios';

const baseUrl = 'https://api.adoptium.net/v3';

export async function loadLatestAssets(
    version: number,
    os: string,
    architecture: string,
    packageType: string
): Promise<ReleaseAsset[]> {
    let url = new URL(`${baseUrl}/assets/latest/${version}/hotspot?`);

    if (os !== 'any') {
        url.searchParams.append('os', os);
    }
    if (architecture !== 'any') {
        url.searchParams.append('architecture', architecture);
    }

    // NOTE: Do not filter the query by 'image_type' because we need to have 'sources
    // to display the Release Notes and source download (cf src/components/TemurinDownloadTable/index.tsx)

    let pkgsFound: TemurinRelease[] = await axios.get(url.toString())
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return []
        });

    // Filter JDK/JRE if necessary
    if (packageType === 'jdk') {
        pkgsFound = pkgsFound.filter((pkg: TemurinRelease) => pkg.binary.image_type !== 'jre');
    } else if (packageType === 'jre') {
        pkgsFound = pkgsFound.filter((pkg: TemurinRelease) => pkg.binary.image_type !== 'jdk');
    }

    return renderReleases(pkgsFound);
}

function renderReleases(pkgs: Array<TemurinRelease>): ReleaseAsset[] {
    let releases: ReleaseAsset[] = []

    pkgs.forEach((releaseAsset: TemurinRelease) => {
        const platform = `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`

        // Skip this asset if it's not a binary type we're interested in displaying
        const binary_type = releaseAsset.binary.image_type.toUpperCase();
        if (binary_type === 'SOURCES') {
            releases['source'] = releaseAsset;
        }
        if (!['INSTALLER', 'JDK', 'JRE'].includes(binary_type)) {
            return;
        }
        // Get the existing release asset (passed to the template) or define a new one
        let release: ReleaseAsset | undefined = releases.find((release: ReleaseAsset) => release.platform_name === platform);
        if (!release) {
            release = {
                platform_name: `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`,
                os: releaseAsset.binary.os,
                architecture: releaseAsset.binary.architecture,
                release_name: getVersionAsString(releaseAsset.version),
                release_link: new URL(releaseAsset.release_link),
                release_date: new Date(releaseAsset.binary.updated_at),
                version: releaseAsset.version,
                binaries: [],
            };
        } else {
            // update the release date if this asset is newer
            const rabua = new Date(releaseAsset.binary.updated_at);
            if (release.release_date < rabua) {
                release.release_date = rabua;
            }
            // update the version if this asset is newer
            if(compareVersions(releaseAsset.version, release.version) === 1) {
                release.version = releaseAsset.version;
                release.release_name = getVersionAsString(releaseAsset.version);
            }
        }

        let binary_constructor: Binary = {
            type: binary_type,
            link: releaseAsset.binary.package.link,
            checksum: releaseAsset.binary.package.checksum,
            size: Math.floor(releaseAsset.binary.package.size / 1000 / 1000),
            extension: fetchExtension(releaseAsset.binary.package.name)
        };

        if (releaseAsset.binary.installer) {
            binary_constructor.installer_link = releaseAsset.binary.installer.link;
            binary_constructor.installer_checksum = releaseAsset.binary.installer.checksum;
            binary_constructor.installer_size =  Math.floor(releaseAsset.binary.installer.size / 1000 / 1000);
            binary_constructor.installer_extension = fetchExtension(releaseAsset.binary.installer.name);
        }

        // Add the new binary to the release asset
        release.binaries.push(binary_constructor);

        // We have the first binary, so add the release asset.
        if (release.binaries.length === 1) {
            releases.push(release);
        }
    })

    // well sort releases
    releases.sort((pkg1: ReleaseAsset, pkg2: ReleaseAsset) => {
        // order by version DESC
        let comparison = compareVersions(pkg2.version, pkg1.version);
        // let comparison = 0;

        if (comparison === 0) {
            // order by date DESC
            // const releaseDateUTCInMillis1 = Date.UTC(pkg1.release_date.getUTCFullYear(), pkg1.release_date.getUTCMonth(), pkg1.release_date.getUTCDate(), 0, 0, 0, 0);
            // const releaseDateUTCInMillis2 = Date.UTC(pkg2.release_date.getUTCFullYear(), pkg2.release_date.getUTCMonth(), pkg2.release_date.getUTCDate(), 0, 0, 0, 0);
            // comparison = releaseDateUTCInMillis2 - releaseDateUTCInMillis1;
            // NOTE: le tri par date de livraison DESC n'est pas intuitif

            if (comparison === 0) {
                // for the same date, sort by OS ASC
                comparison = pkg1.os.localeCompare(pkg2.os);

                if (comparison === 0) {
                    // for the same OS, sort by architecture ASC
                    const arch1 = pkg1.architecture === 'x32' ? 'x86' : pkg1.architecture;
                    const arch2 = pkg2.architecture === 'x32' ? 'x86' : pkg2.architecture;
                    comparison = arch1.localeCompare(arch2);
                }
            }
        }
        return comparison;
    });

    // sort binaries inside releases
    releases.forEach((release) => {
        release.binaries.sort((binaryA, binaryB) => binaryA.type > binaryB.type ? 1 : binaryA.type < binaryB.type ? -1 : 0);
    });

    return releases
}

export interface ReleaseAsset {
    platform_name: string;
    os: string;
    architecture: string;
    release_name: string;
    release_link: URL;
    release_date: Date;
    version: VersionMetaData;
    binaries: Array<Binary>;
}

interface TemurinRelease {
    release_link: URL;
    os: string;
    architecture: string;
    platform_name: string;
    release_name: string;
    release_date: Date;
    version: VersionMetaData;
    binary: {
        updated_at: Date;
        os: string;
        architecture: string;
        image_type: string;
        jvm_impl: string;
        package: {
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
        installer?: {
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
    };
}

interface Binary {
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

export interface MockTemurinReleaseAPI {
    release_link: URL;
    release_name: string;
    vendor: string;
    version: VersionMetaData
    binary: {
        project: string;
        scm_ref: string;
        updated_at: Date;
        os: string;
        architecture: string;
        download_count: number;
        heap_size: string;
        image_type: string;
        jvm_impl: string;
        package: {
            download_count: number;
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
        installer?: {
            download_count: number;
            name: string;
            link: URL;
            checksum: string;
            checksum_link: URL;
            signature_link: URL;
            metadata_link: URL;
            size: number;
        }
    }
}
