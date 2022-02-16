import moment from 'moment';

const baseUrl = 'https://api.adoptopenjdk.net/v3';

let source: any;

export async function loadLatestAssets(version, os, architecture) {
    let   url       = `${baseUrl}/assets/latest/${version}/hotspot`;
    let   json      = await makeRequest('GET', url);
    const response  = JSON.parse(json);
    const data      = response;
    let   pkgsFound = []
    for (let i = 0 ; i < data.length ; i++) {
        pkgsFound.push(data[i]);
    }
    return renderReleases(pkgsFound);
}

async function makeRequest(method, url): Promise<apiData> {
    const response = await fetch(url);
    const apiResult = await response.text();
    return apiResult
};

function renderReleases(pkgs) {
    let releases = []
    pkgs.forEach((releaseAsset) => {
        const platform = `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`

        // Skip this asset if its platform could not be matched (see the website's 'config.json')
        if (!platform) {
            return;
        }

        // Skip this asset if it's not a binary type we're interested in displaying
        const binary_type = releaseAsset.binary.image_type.toUpperCase();
        if (binary_type == 'SOURCES') {
            releases['source'] = releaseAsset;
        }
        if (!['INSTALLER', 'JDK', 'JRE'].includes(binary_type)) {
            return;
        }
        // Get the existing release asset (passed to the template) or define a new one
        let release = releases.find((release) => release.platform_name === platform);
        if (!release) {
            release = {
                platform_name: `${releaseAsset.binary.os}-${releaseAsset.binary.architecture}`,
                os: releaseAsset.binary.os,
                architecture: releaseAsset.binary.architecture,
                release_name: releaseAsset.release_name,
                release_link: releaseAsset.release_link,
                release_datetime: moment(releaseAsset.timestamp).format('YYYY-MM-DD hh:mm:ss'),
                binaries: []
            };
        }

        let binary_constructor = {
            type: binary_type,
            link: releaseAsset.binary.package.link,
            checksum: releaseAsset.binary.package.checksum,
            size: Math.floor(releaseAsset.binary.package.size / 1000 / 1000),
            extension: fetchExtension(releaseAsset.binary.package.link)
        };

        if (releaseAsset.binary.installer) {
            binary_constructor.installer_link = releaseAsset.binary.installer.link;
            binary_constructor.installer_checksum = releaseAsset.binary.installer.checksum;
            binary_constructor.installer_size =  Math.floor(releaseAsset.binary.installer.size / 1000 / 1000);
            binary_constructor.installer_extension = fetchExtension(releaseAsset.binary.installer.link);
        }

        // Add the new binary to the release asset
        release.binaries.push(binary_constructor);

        // We have the first binary, so add the release asset.
        if (release.binaries.length === 1) {
            releases.push(release);
        }

        releases = orderPlatforms(releases, 'platform_ordinal');
        releases.forEach((release) => {
            release.binaries.sort((binaryA, binaryB) => binaryA.type > binaryB.type ? 1 : binaryA.type < binaryB.type ? -1 : 0);
        });
    })
    return releases
}

function fetchExtension (filename) {
    let extension = `.${filename.split('.').pop()}`;
    // Workaround to prevent extension returning as .gz
    if (extension == '.gz') {
      extension = 'tar.gz';
    }
    return extension;
}

function orderPlatforms (input, attr = 'thisPlatformOrder') {
  return sortByProperty(input, attr);
};

function sortByProperty (input, property, descending) {
  const invert = descending ? -1 : 1;
  const sorter = (a, b) => {
    return invert * (a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0);
  };

  if (Array.isArray(input)) {
    return input.sort(sorter);
  } else {
    // Preserve the source object key as '_key'
    return Object.keys(input)
      .map(_key => Object.assign(input[_key], {_key}))
      .sort(sorter);
  }
};