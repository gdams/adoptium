const baseUrl = 'https://marketplace-api.adoptium.net';
import { VersionMetaData } from ".";
    
export async function getAllPkgsForVersion(
    version: number,
    os: string,
    architecture: string,
    package_type: string,
    checkboxRef: any,
): Promise<MarketplaceRelease[] | null> {
    let microsoftSelected = checkboxRef.current.vendorMicrosoft.checked;
    let temurinSelected = checkboxRef.current.vendorAdoptium.checked;
    let redhatSelected = checkboxRef.current.vendorRedHat.checked;
    let huaweiSelected = checkboxRef.current.vendorHuawei.checked;
    let zuluSelected = checkboxRef.current.vendorAzul.checked;
    let ibmSelected = checkboxRef.current.vendorIBM.checked;
    let alibabaSelected = checkboxRef.current.vendorAlibaba.checked;

    let params = '?'
    params += 'feature_version=' + version;

    if (os !== 'any' ) {
        if (os === 'alpine-linux') {
            params += '&os=alpine_linux'
        } else {
            params += ('&os=' + os)
        }
    }

    if (architecture !== 'any' ) {
        params += ('&architecture=' + architecture)
    }

    if (package_type === 'any') {
        params += '&image_type=jdk&image_type=jre'
    } else {
        params += ('&image_type=' + package_type)
    }

    if (temurinSelected) {
        params += '&vendor=adoptium'
    }

    if (redhatSelected) {
        params += '&vendor=redhat'
    }

    if (huaweiSelected) {
        params += '&vendor=huawei'
    }

    if (microsoftSelected) {
        params += ('&vendor=microsoft')
    }

    if (zuluSelected) {
        params += ('&vendor=azul')
    }

    if (ibmSelected) {
        params += ('&vendor=ibm')
    }

    if (alibabaSelected) {
        params += ('&vendor=alibaba')
    }

    const url = new URL(baseUrl + '/v1/assets/latestForVendors' + params);
    const data = await getPkgs(url);
    return data
}

async function getPkgs(url: URL) {
    const response = await fetch(url)
    return response.json();
}

export function getImageForDistribution(distribution: string) {
    switch(distribution) {
        case 'temurin': return '/images/adoptium-logo.png';
        case 'redhat': return '/images/redhat.svg';
        case 'bisheng': return '/images/huawei.svg';
        case 'zulu': return '/images/azul-logo.png';
        case 'semeru': return '/images/ibm-logo.png';
        default: return `/images/${distribution}-logo.png`;
    }
}

export interface MarketplaceRelease {
    release_name: string;
    vendor: string;
    binary: {
        os: string;
        architecture: string;
        image_type: string;
        jvm_impl: string;
        package: {
            name: string;
            link: URL;
            sha265sum: string;
            sha256sum_link: URL;
            signature_link: URL;
        }
        installer?: [{
            name: string;
            link: URL;
            sha265sum: string;
            sha256sum_link: URL;
            signature_link: URL;
        }]
        timestamp: Date;
        scm_ref: string;
        openjdk_scm_ref: string;
        distribution: string;
        aqavit_results_link: URL;
        tck_affidavit_link: URL;
    }
    version: VersionMetaData;
}
