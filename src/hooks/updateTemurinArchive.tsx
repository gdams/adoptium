import moment from 'moment';
import { capitalize } from '../util/capitalize';

const baseUrl = 'https://api.adoptopenjdk.net/v3';

let pkgs = [];

export function loadArchiveAssets(version: number) {
    pkgs = []
    let promises = [];
    promises.push(getAssetsForVersion(version)
        .then((pkgsFound) =>
            pkgsFound.forEach((pkg) => { 
                pkgs.push(pkg); 
            })
        )
    );
    Promise.all(promises).then( res => 
        updateDownloadTable()
    );
}

async function getAssetsForVersion(version: any) {
    let   url       = `${baseUrl}/assets/feature_releases/${version}/ga?vendor=eclipse`;
    let   json      = await makeRequest('GET', url);
    const response  = JSON.parse(json);
    const data      = response;
    let   pkgsFound = []
    for (let i = 0 ; i < data.length ; i++) {
        pkgsFound.push(data[i]);
    }
    return pkgsFound;
}

async function makeRequest(method: string, url: RequestInfo): Promise<apiData> {
    const response = await fetch(url);
    const apiResult = await response.text();
    return apiResult
};

function updateDownloadTable() {
    let releases = []
    pkgs.forEach((aRelease) => {
        const publishedAt = moment(aRelease.timestamp);
        const release = {
            release_name: aRelease.release_name,
            release_link: aRelease.release_link,
            release_day: publishedAt.format('D'),
            release_month: publishedAt.format('MMMM'),
            release_year: publishedAt.format('YYYY'),
            early_access: detectEA(aRelease.version_data),
            platforms: {},
        };

        aRelease.binaries.forEach((aReleaseAsset: { os: any; architecture: any; image_type: string; package: { link: any; checksum: any; size: number; }; installer: { link: any; checksum: any; size: number; }; }) => {
            const platform = `${aReleaseAsset.os}-${aReleaseAsset.architecture}`
      
            // Skip this asset if its platform could not be matched (see the website's 'config.json')
            if (!platform) {
              return;
            }
      
            // Skip this asset if it's not a binary type we're interested in displaying
            const binary_type = aReleaseAsset.image_type.toUpperCase();
            if (binary_type == 'SOURCES') {
              release.source_url = aReleaseAsset.package.link;
            }
            if (!['INSTALLER', 'JDK', 'JRE'].includes(binary_type)) {
              return;
            }
      
            if (!release.platforms[platform]) {
              release.platforms[platform] = {
                // official_name: getOfficialName(platform),
                // ordinal: getPlatformOrder(platform),
                assets: [],
              };
            }
      
            let binary_constructor = {
              type: binary_type,
              link: aReleaseAsset.package.link,
              checksum: aReleaseAsset.package.checksum,
              size: Math.floor(aReleaseAsset.package.size / 1000 / 1000),
            };
      
            if (aReleaseAsset.installer) {
              binary_constructor.installer_link = aReleaseAsset.installer.link;
              binary_constructor.installer_checksum = aReleaseAsset.installer.checksum;
              binary_constructor.installer_size =  Math.floor(aReleaseAsset.installer.size / 1000 / 1000);
            }
      
            // Add the new binary to the release asset
            release.platforms[platform].assets.push(binary_constructor);
        });
        releases.push(release);
    })
    if (typeof document !== `undefined`) {
        updateTable(releases)
    }
}

function detectEA(version: { pre: string; }) {
  if ((version.pre) && (version.pre == 'ea')) {
    return true;
  } else { 
    return false;
  }
};

function updateTable(releases: any[]) {
    let downloadTableBody = document.getElementById('archive-table').getElementsByTagName('tbody')[0];
    
    while (downloadTableBody.hasChildNodes()) {
        downloadTableBody.removeChild(downloadTableBody.firstChild);
    }
    
    releases.forEach((pkg: { release_name: string; release_link: string; release_day: any; release_month: any; release_year: any; source_url: string; platforms: { [x: string]: any; }; }) => {
        var row = downloadTableBody.insertRow();
        row.className = "release-row"
        
        // Release info
        var cellName = row.insertCell();
        cellName.style.backgroundColor = "#14003c";
        cellName.className = "text-white"
        var div = document.createElement('div')
        var versionText = document.createTextNode(pkg.release_name);
        var h2Version = document.createElement('h2');
        h2Version.style.fontSize = "1.5rem"
        h2Version.className = "pt-5"
        var link = document.createElement('a')
        link.href = pkg.release_link
        link.className = 'link-light'
        link.appendChild(versionText)
        h2Version.appendChild(link);
        var dateText = document.createTextNode(`${pkg.release_day} ${pkg.release_month} ${pkg.release_year}`);
        var h4 = document.createElement('h4');
        h4.style.fontSize = ".8rem"
        h4.className = "pt-3 pb-3"
        h4.appendChild(dateText);
        div.appendChild(h2Version);
        div.appendChild(h4);
        if (pkg.source_url) {
            var archiveTypeIcon = document.createElement('i');
            archiveTypeIcon.className = 'fa fa-download';
            archiveTypeIcon.ariaHidden = 'true';
            var span = document.createElement('span')
            var link = document.createElement('a')
            link.className = 'link-light'
            var linkText = document.createTextNode('\u00A0Source Code Archive');
            link.href = pkg.source_url
            link.appendChild(archiveTypeIcon)
            link.appendChild(linkText)
            span.appendChild(link)
            div.appendChild(span);
        }
        cellName.appendChild(div)
        
        // Archive platforms
        var cellPlatforms = row.insertCell();
        var platformTable = document.createElement('table')
        platformTable.className = "table"
        var platformRow = platformTable.insertRow();
        var platformCell = row.insertCell();
        var installerCell = row.insertCell();
        var span = document.createElement('span')
        span.className = "fw-bold"
        var text = document.createTextNode('Installer');
        span.appendChild(text)
        installerCell.appendChild(span)
        var binaryCell = row.insertCell();
        var span = document.createElement('span')
        span.className = "fw-bold"
        var text = document.createTextNode('Binary');
        span.appendChild(text)
        binaryCell.appendChild(span)
        var checksumCell = row.insertCell();
        var span = document.createElement('span')
        span.className = "fw-bold"
        var text = document.createTextNode('SHA256');
        span.appendChild(text)
        checksumCell.appendChild(span)
        platformRow.appendChild(platformCell)
        platformRow.appendChild(installerCell)
        platformRow.appendChild(binaryCell)
        platformRow.appendChild(checksumCell)

        cellPlatforms.appendChild(platformTable)

        let os: string
        let arch: string
 
        Object.keys(pkg.platforms).forEach(function (key){
            let platform = pkg.platforms[key];
            for (let asset of platform.assets) {
                var row = platformTable.insertRow();
                var cellAssets = row.insertCell();
                cellAssets.className = "align-middle"
                let platform = key.split("-")
                if (os === capitalize(platform[0]) && arch === platform[1]) {
                    // Platform already exists
                } else {
                    os = capitalize(platform[0])
                    arch = platform[1]
                    var platformName = document.createTextNode(`${os} ${arch}`);
                    cellAssets.appendChild(platformName)
                }
                row.appendChild(cellAssets)
                
                var installerAssets = row.insertCell();
                if (asset.installer_link) {
                    var link = document.createElement('a')
                    link.href = `/download?link=${asset.installer_link}`
                    link.className = "btn btn-primary"
                    link.style.width = "9em"
                    var installerType = document.createTextNode(asset.type);
                    link.appendChild(installerType)
                    installerAssets.appendChild(link)
                } else {
                    var link = document.createElement('a')
                    link.className = "btn"
                    link.style.backgroundColor = "#D7DEE9"
                    link.style.width = "9em"
                    link.setAttribute('disabled', 'true')
                    var installerNotAvailable = document.createTextNode('Not available');
                    link.appendChild(installerNotAvailable)
                    installerAssets.appendChild(link)
                }
                row.appendChild(installerAssets)

                var binaryAssets = row.insertCell();
                var link = document.createElement('a')
                link.className = "btn btn-secondary"
                link.style.width = "9em"
                link.href = `/download?link=${asset.link}`
                var binaryName = document.createTextNode(`${asset.type} (${asset.size} MB)`);
                link.appendChild(binaryName)
                binaryAssets.appendChild(link)

                var checksumAssets = row.insertCell()
                checksumAssets.className = "align-middle"
                var checksum = document.createElement('a');
                checksum.href = ""
                checksum.setAttribute('data-bs-toggle', 'modal')
                checksum.setAttribute('data-bs-target', '#checksumModal')
                checksum.setAttribute('data-bs-checksum', asset.checksum)
                var checksumText = document.createTextNode('Checksum');
                checksum.appendChild(checksumText)
                checksumAssets.appendChild(checksum)
                
            }
        });
    });
}

function fetchExtension (filename: string) {
    let extension = `.${filename.split('.').pop()}`;
    // Workaround to prevent extension returning as .gz
    if (extension == '.gz') {
      extension = 'tar.gz';
    }
    return extension;
}

function orderPlatforms (input: any, attr = 'thisPlatformOrder') {
  return sortByProperty(input, attr);
};

function sortByProperty (input: any[], property: string, descending: undefined) {
  const invert = descending ? -1 : 1;
  const sorter = (a: { [x: string]: number; }, b: { [x: string]: number; }) => {
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
