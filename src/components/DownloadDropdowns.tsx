import React, { useRef, useState, useCallback, useEffect } from 'react';

import VendorSelector from './VendorSelector'

import { detectOS, UserOS } from '../util/detectOS';
import { oses, arches, packageTypes, versions, defaultVersion, defaultArchitecture, defaultPackageType} from '../util/defaults'

let defaultOS = ''

const DownloadDropdowns = ({updaterAction, marketplace, Table}) => {

    const userOS = detectOS();
    switch (userOS) {
      case UserOS.MAC:
        defaultOS = 'macos'
        break;
      case UserOS.LINUX:
      case UserOS.UNIX:
        defaultOS = 'linux'
        break;
      default:
        defaultOS = 'windows'
        break;
    }

    const [os, updateOS] = useState({os: defaultOS});
    const [arch, updateArch] = useState({arch: defaultArchitecture});
    const [packageType, updatePackageType] = useState({packageType: defaultPackageType});
    const [version, udateVersion] = useState({version: defaultVersion});
    
    // Marketplace vendor selector only
    const checkboxRef = useRef({});
    const [checkbox, updateCheckbox] = useState({checkboxRef});
  
    const [releases, setReleases] = useState(null);

    useEffect(() => {
        (async () => {
          setReleases(await updaterAction(version.version, os.os, arch.arch, packageType.packageType, checkboxRef));
        })();
    }, [version.version, os.os, arch.arch, packageType.packageType, checkbox]);

    const setOS = useCallback((os) => {
        updateOS({os: os});
    }, []);

    const setArch = useCallback((arch) => {
        updateArch({arch: arch});
    }, []);

    const setPackageType = useCallback((packageType) => {
        updatePackageType({packageType: packageType});
    }, []);
    
    const setVersion = useCallback((version) => {
        udateVersion({version: version});
    }, []);

    const setCheckbox= useCallback(() => {
        updateCheckbox({checkboxRef});
    }, []);

    return (
        <>
            {marketplace && <VendorSelector checkboxRef={checkboxRef} setCheckbox={setCheckbox} />}
            <div className="input-group mb-5">
                <label className="px-2 fw-bold" htmlFor="os">Operating System</label>
                <select id="os-filter" onChange={(e) => setOS(e.target.value)} defaultValue={defaultOS} className="form-select form-select-sm">
                    <option key="any" value="any">Any</option>
                    {oses.map(
                        (os, i): string | JSX.Element => os && (
                            <option key={os.toLowerCase()} value={os.toLowerCase()}>{os}</option>
                        )
                    )}
                </select>
                <label className="px-2 fw-bold" htmlFor="arch">Architecture</label>
                <select id="arch-filter" onChange={(e) => setArch(e.target.value)} defaultValue={defaultArchitecture} className="form-select form-select-sm">
                    <option key="any" value="any">Any</option>
                    {arches.map(
                        (arch, i): string | JSX.Element => arch && (
                            <option key={arch.toLowerCase()} value={arch.toLowerCase()}>{arch}</option>
                        )
                    )}
                </select>
                <label className="px-2 fw-bold" htmlFor="package-type">Package Type</label>
                <select id="package-type-filter" onChange={(e) => setPackageType(e.target.value)} defaultValue={defaultPackageType} className="form-select form-select-sm">
                    <option key="any" value="any">Any</option>
                    {packageTypes.map(
                        (packageType, i): string | JSX.Element => packageType && (
                            <option key={packageType.toLowerCase()} value={packageType.toLowerCase()}>{packageType}</option>
                        )
                    )}
                </select>
                <label className="px-2 fw-bold" htmlFor="version">Version</label>
                <select id="version-filter" onChange={(e) => setVersion(e.target.value)} defaultValue={defaultVersion} className="form-select form-select-sm">
                    {versions.map(
                        (version, i): string | JSX.Element => version && (
                            <option key={version} value={version}>{version}</option>
                        )
                    )}
                </select>
            </div>
            <Table results={releases}/>
        </>
    );
};

export default DownloadDropdowns;