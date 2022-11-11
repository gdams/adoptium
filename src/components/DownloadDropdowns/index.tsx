import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { Trans } from 'gatsby-plugin-react-i18next';
import VendorSelector from '../VendorSelector'
import { detectOS, UserOS } from '../../util/detectOS';
import { setURLParam } from '../../util/setURLParam';
import { capitalize } from '../../util/capitalize';
import { oses, arches, packageTypes, versions, versionsLTS, defaultVersion, defaultArchitecture, defaultPackageType} from '../../util/defaults';

let defaultOS = 'any'
let defaultArch = 'any'

const DownloadDropdowns = ({updaterAction, marketplace, Table}) => {
    let versionList = versions;
    let selectedVersion = defaultVersion;
    const versionParam = queryString.parse(useLocation().search).version;
    if (versionParam) {
        selectedVersion = Number(versionParam);
    }
    const variantParam = queryString.parse(useLocation().search).variant;
    if (variantParam) {
        // convert openjdk11 to 11
        const parsedVersion = variantParam.toString().replace(/\D/g, '')
        setURLParam('version', parsedVersion)
        selectedVersion = parseInt(parsedVersion);
    }

    if (marketplace) {
        versionList = versionsLTS;
        defaultArch = defaultArchitecture;
        const userOS = detectOS();
        switch (userOS) {
            case UserOS.MAC:
                defaultOS = 'mac'
                if (typeof document !== 'undefined') {
                    let w = document.createElement("canvas").getContext("webgl");
                    let d = w.getExtension('WEBGL_debug_renderer_info');
                    let g = d && w.getParameter(d.UNMASKED_RENDERER_WEBGL) || "";
                    if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
                        defaultArch = 'aarch64'
                    }
                }
                break;
            case UserOS.LINUX:
            case UserOS.UNIX:
                defaultOS = 'linux'
            break;
        default:
            defaultOS = 'windows'
            break;
        }
    }

    const [os, updateOS] = useState(defaultOS);
    const [arch, updateArch] = useState(defaultArch);
    const [packageType, updatePackageType] = useState(defaultPackageType);
    const [version, udateVersion] = useState(selectedVersion);
    
    // Marketplace vendor selector only
    const checkboxRef = useRef({});
    const [checkbox, updateCheckbox] = useState({checkboxRef});

    const [releases, setReleases] = useState(null);

    useEffect(() => {
        (async () => {
          setReleases(await updaterAction(version, os, arch, packageType, checkboxRef));
        })();
    }, [version, os, arch, packageType, checkbox]);

    const setOS = useCallback((os) => {
        updateOS(os);
    }, []);

    const setArch = useCallback((arch) => {
        updateArch(arch);
    }, []);

    const setPackageType = useCallback((packageType) => {
        updatePackageType(packageType);
    }, []);
    
    const setVersion = useCallback((version) => {
        setURLParam('version', version);
        udateVersion(version);
    }, []);

    const setCheckbox= useCallback(() => {
        updateCheckbox({checkboxRef});
    }, []);

    return (
        <>
            {marketplace && <VendorSelector checkboxRef={checkboxRef} setCheckbox={setCheckbox} />}
            <div className="input-group mb-5 row g-2">
                <div className="input-group-prepend flex-colunm col-12 col-md-3">
                    <label className="px-2 fw-bold" htmlFor="os"><Trans>Operating System</Trans></label>
                    <select id="os-filter" aria-label="OS Filter" data-testid="os-filter" onChange={(e) => setOS(e.target.value)} value={os} className="form-select form-select-sm">
                        <option key="any" value="any">Any</option>
                        {oses.map(
                            (os, i): string | JSX.Element => os && (
                                <option key={os.toLowerCase()} value={os.toLowerCase()}>{capitalize(os)}</option>
                            )
                        )}
                    </select>
                </div>
                <div className="input-group-prepend flex-colunm col-12 col-md-3">
                    <label className="px-2 fw-bold" htmlFor="arch"><Trans>Architecture</Trans></label>
                    <select id="arch-filter" aria-label="Architecture Filter" data-testid="arch-filter" onChange={(e) => setArch(e.target.value)} value={arch} className="form-select form-select-sm">
                        <option key="any" value="any">Any</option>
                        {arches.map(
                            (arch, i): string | JSX.Element => arch && (
                                <option key={arch.toLowerCase()} value={arch.toLowerCase()}>{arch}</option>
                            )
                        )}
                    </select>
                </div>
                <div className="input-group-prepend flex-colunm col-12 col-md-3">
                    <label className="px-2 fw-bold" htmlFor="package-type"><Trans>Package Type</Trans></label>
                    <select id="package-type-filter" aria-label="Package Type Filter" data-testid="package-type-filter" onChange={(e) => setPackageType(e.target.value)} value={packageType} className="form-select form-select-sm">
                        <option key="any" value="any">Any</option>
                        {packageTypes.map(
                            (packageType, i): string | JSX.Element => packageType && (
                                <option key={packageType.toLowerCase()} value={packageType.toLowerCase()}>{packageType}</option>
                            )
                        )}
                    </select>
                </div>
                <div className="input-group-prepend flex-colunm col-12 col-md-3">
                    <label className="px-2 fw-bold" htmlFor="version"><Trans>Version</Trans></label>
                    <select id="version-filter" aria-label="Version Filter" data-testid="version-filter" onChange={(e) => setVersion(e.target.value)} value={version} className="form-select form-select-sm">
                        {versionList.map(
                            (version, i): number | JSX.Element => version && (
                                <option key={version} value={version}>{version}</option>
                            )
                        )}
                    </select>
                </div>
            </div>
            <Table results={releases}/>
        </>
    );
};

export default DownloadDropdowns;
