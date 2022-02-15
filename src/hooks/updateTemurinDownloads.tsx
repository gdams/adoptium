import moment from 'moment';
import { capitalize } from '../util/capitalize';

const baseUrl = 'https://api.adoptopenjdk.net/v3';

let pkgs = [];
let source: any;

export function loadLatestAssets(handler, version, os, architecture) {
    pkgs = []
    version ? version : version = document.getElementById('version-filter').value;
    os ? os : os = document.getElementById('os-filter').value;
    architecture ? architecture : architecture = document.getElementById('arch-filter').value;

    let promises = [];
    promises.push(getLatestAssetsForVersion(version)
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

async function getLatestAssetsForVersion(version) {
    let   url       = `${baseUrl}/assets/latest/${version}/hotspot`;
    let   json      = await makeRequest('GET', url);
    const response  = JSON.parse(json);
    const data      = response;
    let   pkgsFound = []
    for (let i = 0 ; i < data.length ; i++) {
        pkgsFound.push(data[i]);
    }
    return pkgsFound;
}

async function makeRequest(method, url): Promise<apiData> {
    const response = await fetch(url);
    const apiResult = await response.text();
    return apiResult
};

function updateDownloadTable() {
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
            source = releaseAsset;
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
                early_access: detectEA(releaseAsset.version),
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
    if (typeof document !== `undefined`) {
        updateTable(releases)
    }
}

function detectEA(version) {
  if ((version.pre) && (version.pre == 'ea')) {
    return true;
  } else { 
    return false;
  }
};

function updateTable(releases) {
    let downloadTableBody = document.getElementById('download-table').getElementsByTagName('tbody')[0];
    
    while (downloadTableBody.firstChild) {
        downloadTableBody.removeChild(downloadTableBody.lastChild);
    }
    
    releases.forEach((pkg) => {
        var row = downloadTableBody.insertRow();
        
        // Version and Distribution
        var cellName       = row.insertCell();
        cellName.className = 'table-secondary py-4 align-middle w-25';
        var versionText = document.createTextNode(pkg.release_name);
        var spanVersion = document.createElement('span');
        spanVersion.appendChild(versionText);
        spanVersion.className='text-white'
        var vendorText = document.createTextNode('Temurin');
        var spanPackageType = document.createElement('span');
        spanPackageType.className='text-white d-block';
        spanPackageType.appendChild(vendorText);
        cellName.appendChild(spanVersion);
        cellName.appendChild(spanPackageType);
        
        // Operating System
        let os = capitalize(pkg.os);
        var cellOperatingSystem       = row.insertCell();
        cellOperatingSystem.className = 'align-middle w-20';
        var operatingSystemText = document.createTextNode(os);
        var spanOperatingSystem = document.createElement('span');
        spanOperatingSystem.appendChild(operatingSystemText);
        cellOperatingSystem.appendChild(spanOperatingSystem);
        
        
        // Architecture
        var cellArchitecture       = row.insertCell();
        cellArchitecture.className = 'align-middle w-20';
        var architectureText = document.createTextNode(pkg.architecture);
        var spanArchitecture = document.createElement('span');
        spanArchitecture.appendChild(architectureText);
        cellArchitecture.appendChild(spanArchitecture);

        // Downloads
        var cellDownload = row.insertCell();
        cellDownload.className = 'align-middle';
        var downloadTable = document.createElement('table');
        downloadTable.className = 'table parent mb-0 w-auto'
        var downloadTableBodyArchive = document.createElement('tbody');
        downloadTableBodyArchive.className = 'table-light'
        downloadTable.appendChild(downloadTableBodyArchive)
        cellDownload.appendChild(downloadTable)

        pkg.binaries.forEach((binary) => {
            if (binary.installer_link) {
                // Archive Type
                var downloadRow = downloadTableBodyArchive.insertRow();
                var cellArchiveType       = downloadRow.insertCell();
                cellArchiveType.className = 'align-middle text-center';

                var individualDownloadTable = document.createElement('table');
                individualDownloadTable.className = 'table w-auto'
                var downloadTableBodyArchiveBody = document.createElement('tbody');
                downloadTableBodyArchiveBody.className = 'table-light'
                individualDownloadTable.appendChild(downloadTableBodyArchiveBody)
                var individualDownloadRow = downloadTableBodyArchiveBody.insertRow();
                var individualDownloadCell = individualDownloadRow.insertCell();
                var checksumElement = document.createElement('span');
                var checksumA = document.createElement('a');
                checksumA.href = "";
                checksumA.setAttribute('data-bs-toggle', 'modal')
                checksumA.setAttribute('data-bs-target', '#checksumModal')
                checksumA.setAttribute('data-bs-checksum', binary.installer_checksum)
                var checksumText = document.createTextNode('Checksum (SHA256)');
                checksumA.appendChild(checksumText)
                checksumElement.appendChild(checksumA)
                individualDownloadCell.appendChild(checksumElement)
                cellArchiveType.appendChild(individualDownloadRow)

                var individualTypeRow = downloadTableBodyArchiveBody.insertRow();
                var cellType       = individualTypeRow.insertCell();
                var checksumElement = document.createElement('span');
                var checksumText = document.createTextNode(`${binary.type} - ${binary.installer_size} MB`);
                checksumElement.appendChild(checksumText)
                cellType.appendChild(checksumElement)
                cellArchiveType.appendChild(individualTypeRow)

                var downloadLinkCell = downloadRow.insertCell();
                downloadLinkCell.className = 'align-middle'
                var archiveTypeIcon = document.createElement('i');
                archiveTypeIcon.className = 'fa fa-download';
                archiveTypeIcon.ariaHidden = true;
                var archiveTypeText = document.createTextNode('\u00A0' + binary.installer_extension);
                var aArchiveType = document.createElement('a');
                aArchiveType.href = `/download?link=${binary.installer_link}`
                aArchiveType.className = 'btn btn-primary';
                aArchiveType.style.width = '6em';
                aArchiveType.appendChild(archiveTypeIcon);
                aArchiveType.appendChild(archiveTypeText);
                downloadLinkCell.appendChild(aArchiveType);
            }
            // Archive Type
            var downloadRow = downloadTableBodyArchive.insertRow();
            var cellArchiveType       = downloadRow.insertCell();
            cellArchiveType.className = 'align-middle text-center';

            var individualDownloadTable = document.createElement('table');
            individualDownloadTable.className = 'table w-auto'
            var downloadTableBodyArchiveBody = document.createElement('tbody');
            downloadTableBodyArchiveBody.className = 'table-light'
            individualDownloadTable.appendChild(downloadTableBodyArchiveBody)
            var individualDownloadRow = downloadTableBodyArchiveBody.insertRow();
            var individualDownloadCell = individualDownloadRow.insertCell();
            var checksumElement = document.createElement('span');
            var checksumA = document.createElement('a');
            checksumA.href = ""
            checksumA.setAttribute('data-bs-toggle', 'modal')
            checksumA.setAttribute('data-bs-target', '#checksumModal')
            checksumA.setAttribute('data-bs-checksum', binary.checksum)
            var checksumText = document.createTextNode('Checksum (SHA256)');
            checksumA.appendChild(checksumText)
            checksumElement.appendChild(checksumA)
            individualDownloadCell.appendChild(checksumElement)
            cellArchiveType.appendChild(individualDownloadRow)

            var individualTypeRow = downloadTableBodyArchiveBody.insertRow();
            var cellType       = individualTypeRow.insertCell();
            var checksumElement = document.createElement('span');
            var checksumText = document.createTextNode(`${binary.type} - ${binary.size} MB`);
            checksumElement.appendChild(checksumText)
            cellType.appendChild(checksumElement)
            cellArchiveType.appendChild(individualTypeRow)

            var downloadLinkCell = downloadRow.insertCell();
            downloadLinkCell.className = 'align-middle'
            var archiveTypeText = document.createTextNode('\u00A0' + binary.extension);
            var aArchiveType = document.createElement('a');
            var archiveTypeIcon = document.createElement('i');
            archiveTypeIcon.className = 'fa fa-download';
            archiveTypeIcon.ariaHidden = true;
            aArchiveType.href = `/download?link=${binary.link}`
            aArchiveType.className = 'btn btn-primary';
            aArchiveType.style.width = '6em';
            aArchiveType.appendChild(archiveTypeIcon);
            aArchiveType.appendChild(archiveTypeText);
            downloadLinkCell.appendChild(aArchiveType);
        });
    });
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