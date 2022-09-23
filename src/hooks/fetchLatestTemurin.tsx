import { useEffect, useState } from 'react';
import { VersionMetaData } from ".";

const baseUrl = 'https://api.adoptium.net/v3';

export function fetchLatestForOS(
    isVisible: boolean,
    version: number,
    os: string,
    arch: string
): Binary | null {
    if (!os) {
        return null
    }
    const [binary, setBinary] = useState<Binary | null>(null);
    useEffect(() => {
        if (isVisible) {
        (async () => {
            setBinary(await fetchLatestForOSRequest(version, os, arch));
        })();
        }
    }, [isVisible]);

    return binary;
}

async function fetchLatestForOSRequest(version: number, os: string, arch: string) {
    const url = `${baseUrl}/assets/feature_releases/${version}/ga?os=${os}&architecture=${arch}&image_type=jdk&jvm_impl=hotspot&page_size=1&vendor=eclipse`;
    const response = await fetch(url);
    const json: LatestTemurin = (await response.json())[0];
    let binary_link = json.binaries[0].package.link
    if (json.binaries[0].installer) {
        binary_link = json.binaries[0].installer.link
    }
    return {
        release_name: json.release_name,
        link: binary_link
    };
}

export interface Binary {
  release_name: string;
  link: URL;
}

export interface LatestTemurin {
    download_count: number;
    id: string;
    release_link: URL;
    release_name: string;
    release_type: string;
    source?: {
        link: URL;
        name: string;
        size: number;
    }
    timestamp: Date;
    updated_at: Date;
    vendor: string;
    version_data: VersionMetaData
    binaries: [
        {
            architecture: string;
            download_count: number;
            heap_size: string;
            image_type: string;
            jvm_impl: string;
            os: string;
            package: {
                checksum: string;
                checksum_link: URL;
                download_count: number;
                link: URL;
                metadata_link: URL;
                name: string;
                signature_link: URL;
                size: number;
            }
            installer?: {
                checksum: string;
                checksum_link: URL;
                download_count: number;
                link: URL;
                metadata_link: URL;
                name: string;
                signature_link: URL;
                size: number;
            }
        }
    ]
}