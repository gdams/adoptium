import { oses, arches, versions, marketplaceDistributions } from '../util/defaults'

const baseUrl = 'https://api.foojay.io';
let selectedPkgs = [];

export function filterResults(pkgsFound, selectedOperatingSystem, selectedPackageType, checkboxRef) {
    let microsoftSelected = checkboxRef.current.vendorMicrosoft.checked;
    let temurinSelected = checkboxRef.current.vendorAdoptium.checked;
    let zuluSelected = checkboxRef.current.vendorAzul.checked;
    let ibmSelected = checkboxRef.current.vendorIBM.checked;

    let libc;
    switch(selectedOperatingSystem) {
        case 'windows': libc = 'c_std_lib'; break;
        case 'linux'  : libc = 'glibc'; break;
        case 'macos'  : libc = 'libc'; break;
        case 'aix'    : libc = 'libc'; break;
        case 'solaris': libc = 'libc'; break;
        case 'alpine' : libc = 'musl'; selectedOperatingSystem = 'linux'; break;
        default       : libc = ''; break;
    }

    selectedPkgs = pkgsFound.filter(pkg => {
        let os;
        let lc;
        if (selectedOperatingSystem === 'any') {
            os = true;
            lc = true
        } else {
            os = pkg.operating_system == selectedOperatingSystem;
            lc = pkg.lib_c_type == libc;
        }

        let pt;
        if (selectedPackageType === 'any') {
            pt = true;
        } else {
            pt = pkg.package_type == selectedPackageType;
        }
        
        let temurin   = temurinSelected   ? pkg.distribution == 'temurin'   : false;
        let microsoft = microsoftSelected ? pkg.distribution == 'microsoft' : false;
        let zulu      = zuluSelected      ? pkg.distribution == 'zulu'      : false;
        let ibm       = ibmSelected       ? pkg.distribution == 'semeru_certified' : false;

        return os && lc && pt && (temurin || microsoft || zulu || ibm);
    });
}
    
export async function getAllPkgsForVersion(version, os, architecture, package_type, checkboxRef) {
    let params = '?'
    if (version == 'any' ) {
        versions.forEach((version) => {
            params += '&version=' + version;
        })
    } else {
        params += 'version=' + version;
    }
    if (os == 'any' ) {
        oses.forEach((os) => {
            params += '&operating_system=' + os.toLowerCase();
        })
    } else {
        params += ('&operating_system=' + os)
    }
    if (architecture == 'any' ) {
        arches.forEach((architecture) => {
            params += '&architecture=' + architecture.toLowerCase();
        })
    } else {
        params += ('&architecture=' + architecture)
    }
    marketplaceDistributions.forEach((distro) => {
        params += ('&distro=' + distro);
    });
    params += '&release_status=ga&latest=available&javafx_bundled=false&libc_type=libc&libc_type=c_std_lib&libc_type=glibc&libc_type=musl';
    let   url       = baseUrl + '/disco/v2.0/packages' + params;
    let   json      = await getPkgs(url);
    const response  = JSON.parse(json);
    const data      = response.result;
    let   pkgsFound = []
    for (let i = 0 ; i < data.length ; i++) {
        pkgsFound.push(data[i]);
    }
    await filterResults(pkgsFound, os, package_type, checkboxRef)
    return selectedPkgs
}

async function getPkgs(url) {
    let response = await makeRequest("GET", url);
    return response;
}

export async function getDownloadLink(id, directly_downloadable) {
    // Get current ephemeralId
    const packagesUrl = baseUrl + '/disco/v2.0/packages/' + id;
    const packageJson  = await makeRequest("GET", packagesUrl);
    let   responseData = JSON.parse(packageJson);
    const pkg          = responseData.result[0];
    const ephemeralId  = pkg.ephemeral_id;

    // Get download link using the current ephemeralId
    const ephemeralIdsUrl = baseUrl + '/disco/v2.0/ephemeral_ids/' + ephemeralId;
    const packageInfoJson = await makeRequest("GET", ephemeralIdsUrl);
    responseData = JSON.parse(packageInfoJson);
    const packageInfo = responseData.result[0];
    return directly_downloadable ? packageInfo.direct_download_uri : packageInfo.download_site_uri;
}

async function makeRequest(method, url): Promise<apiData> {
    const response = await fetch(url);
    const apiResult = await response.text();
    return apiResult
};

// Utility methods
export function normalizeJavaVersion(javaVersion) {
    let version = javaVersion
    if (version.indexOf('+') > -1) {
    version = version.substring(0, version.indexOf('+'));
    if (version.indexOf('-ea') > -1) {
        version = version.substring(0, version.indexOf('-ea'));
    }
    } else if (version.indexOf('-ea') > -1) {
    version = version.substring(0, version.indexOf('-ea'));
    }      
    return version;
}

export function getVendorForDistribution(distribution) {
    switch(distribution) {
    case 'microsoft': return 'Microsoft';
    case 'temurin'  : return 'Eclipse Foundation';
    case 'zulu'     : return 'Azul';
    case 'semeru_certified' : return 'IBM';
    default         : return '';
    }
}

export function getImageForVendor(vendor) {
    switch(vendor) {
    case 'Microsoft': return '/images/microsoft-logo.png';
    case 'Eclipse Foundation': return '/images/adoptium-logo.png';
    case 'Azul'              : return '/images/azul-logo.png';
    case 'IBM'              : return '/images/ibm-logo.png';
    default                  : return '';
    }
}