import { useEffect, useState } from 'react';
import { VersionMetaData } from ".";
import axios from 'axios';

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
            const url = `${baseUrl}/assets/feature_releases/${version}/ga?os=${os}&architecture=${arch}&image_type=jdk&jvm_impl=hotspot&page_size=1&vendor=eclipse`;

            axios.get(url)
                .then(function (response) {
                    const json: LatestTemurin = response.data[0];

                    let binary_link = json.binaries[0].package.link
                    let binary_checksum = json.binaries[0].package.checksum

                    if (json.binaries[0].installer) {
                        binary_link = json.binaries[0].installer.link,
                        binary_checksum = json.binaries[0].installer.checksum
                    }

                    const binary = {
                        release_name: json.release_name,
                        link: binary_link,
                        checksum: binary_checksum,
                    };
                    setBinary(binary);
                })
                .catch(function (error) {
                    console.error(error);
                    setBinary(null);
                });
        })();
        }
    }, [isVisible, version, os, arch]);

    return binary;
}

export interface Binary {
  release_name: string;
  link: URL;
  checksum: string;
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