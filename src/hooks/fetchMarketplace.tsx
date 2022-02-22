const baseUrl = 'http://staging-marketplace-api.adoptium.net';
    
export async function getAllPkgsForVersion(version, os, architecture, package_type, checkboxRef) {
    let microsoftSelected = checkboxRef.current.vendorMicrosoft.checked;
    let temurinSelected = checkboxRef.current.vendorAdoptium.checked;
    let zuluSelected = checkboxRef.current.vendorAzul.checked;
    let ibmSelected = checkboxRef.current.vendorIBM.checked;

    let params = '?'
    params += 'feature_version=' + version;

    if (os !== 'any' ) {
        params += ('&os=' + os)
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

    if (microsoftSelected) {
        params += ('&vendor=microsoft')
    }

    // if (zuluSelected) {
    //     params += ('&vendor=azul')
    // }

    if (ibmSelected) {
        params += ('&vendor=ibm')
    }

    let url = baseUrl + '/v3/assets/latestForVendors' + params;
    let json = await getPkgs(url);
    const data = JSON.parse(json);
    return data
}

async function getPkgs(url) {
    let response = await makeRequest("GET", url);
    return response;
}

async function makeRequest(method, url): Promise<apiData> {
    const response = await fetch(url);
    const apiResult = await response.text();
    return apiResult
};

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