import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import queryString from 'query-string';
import { Trans } from 'gatsby-plugin-react-i18next';
import VendorSelector from '../VendorSelector'
import { detectOS, UserOS } from '../../util/detectOS';
import { setURLParam } from '../../util/setURLParam';
import { capitalize } from '../../util/capitalize';
import { oses, arches, packageTypes, defaultArchitecture, defaultPackageType} from '../../util/defaults';

const DownloadDropdowns = ({updaterAction, marketplace, Table}) => {

    const data = useStaticQuery(graphql`
      query VersionsQuery {
        allVersions(sort: {version: DESC}) {
          edges {
            node {
              version
              label
              lts
            }
          }
        }
        mostRecentLts {
          version
        }
        mostRecentFeatureVersion {
          version
        }
      }
    `)

    // init the default selected Operation System, if any from the param 'os'
    let defaultSelectedOS = 'any';
    const osParam = queryString.parse(useLocation().search).os;
    if (osParam) {
        defaultSelectedOS = osParam.toString();
    }

    // init the default selected Architecture, if any from the param 'arch'
    let defaultSelectedArch = 'any';
    const archParam = queryString.parse(useLocation().search).arch;
    if (archParam) {
        defaultSelectedArch = archParam.toString();
    }

    // init the default selected Package Type, if any from the param 'package'
    let defaultSelectedPackageType = 'any';
    const packageParam = queryString.parse(useLocation().search).package;
    if (packageParam) {
        defaultSelectedPackageType = packageParam.toString();
    }

    // init the default selected Version, if any from the param 'version' or from 'variant'
    let defaultSelectedVersion = data.mostRecentLts.version;
    const versionParam = queryString.parse(useLocation().search).version;
    if (versionParam) {
        defaultSelectedVersion = Number(versionParam).toString();
    }
    const variantParam = queryString.parse(useLocation().search).variant;
    if (variantParam) {
        // convert openjdk11 to 11
        const parsedVersion = variantParam.toString().replace(/\D/g, '')
        defaultSelectedVersion = parsedVersion;
    }

    // prepare versions list
    const versions = data.allVersions.edges;
    let versionList = versions;

    if (marketplace) {
        // filter non LTS versions
        versionList = versions.filter((version) => {
            return version.node.lts === true;
        });
        defaultSelectedArch = defaultArchitecture;
        defaultSelectedPackageType = defaultPackageType;
        const userOS = detectOS();
        switch (userOS) {
            case UserOS.MAC:
                defaultSelectedOS = 'mac'
                if (typeof document !== 'undefined') {
                    let w = document.createElement("canvas").getContext("webgl");
                    // @ts-ignore
                    let d = w.getExtension('WEBGL_debug_renderer_info');
                    // @ts-ignore
                    let g = d && w.getParameter(d.UNMASKED_RENDERER_WEBGL) || "";
                    if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
                        defaultSelectedArch = 'aarch64'
                    }
                }
                break;
            case UserOS.LINUX:
            case UserOS.UNIX:
                defaultSelectedOS = 'linux'
            break;
        default:
            defaultSelectedOS = 'windows'
            break;
        }
    }

    const [os, updateOS] = useState(defaultSelectedOS);
    const [arch, updateArch] = useState(defaultSelectedArch);
    const [packageType, updatePackageType] = useState(defaultSelectedPackageType);
    const [version, udateVersion] = useState(defaultSelectedVersion);

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
        setURLParam('os', os)
        updateOS(os);
    }, []);

    const setArch = useCallback((arch) => {
        setURLParam('arch', arch)
        updateArch(arch);
    }, []);

    const setPackageType = useCallback((packageType) => {
        setURLParam('package', packageType)
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
                        {oses.sort((os1, os2) => os1.localeCompare(os2)).map(
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
                        {arches.sort((arch1, arch2) => arch1.localeCompare(arch2)).map(
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
                                <option key={version.node.id} value={version.node.version}>{version.node.label}</option>
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
