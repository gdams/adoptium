import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { FaDownload } from 'react-icons/fa';
import { TiWarning } from 'react-icons/ti';
import { capitalize } from '../../util/capitalize';
import { getImageForDistribution } from '../../hooks'
import { fetchExtension } from '../../util/fetchExtension';
import { localeDate } from '../../util/localeDate';

const DownloadTable = ({results}) => {
    const { language } = useI18next();

    return (
        <table id="download-table" className="table table-bordered releases-table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <thead className="table-dark">
                <tr className="table-head">
                    <td className="table-head"><Trans>Build Version</Trans></td>
                    <td className="table-head"><Trans>Distribution</Trans></td>
                    <td className="table-head"><Trans>Vendor</Trans></td>
                    <td className="table-head"><Trans>Operating System</Trans></td>
                    <td className="table-head"><Trans>Architecture</Trans></td>
                    <td className="table-head"><Trans>Download</Trans></td>
                </tr>
            </thead>
            <tbody className="table-light">
                {results ? (
                    results.map(
                        (pkg, i): string | JSX.Element =>
                            <tr key={i}>
                                <td className="table-secondary py-4 text-white align-middle w-20">
                                    <span>{pkg.release_name}</span>
                                    <br></br>
                                    <span>{pkg.binary.image_type == 'jdk' ? 'JDK' : 'JRE'}</span>
                                    <br></br>
                                    <span className="text-white">{localeDate(pkg.binary.timestamp, language)}</span>
                                    <span>
                                        {(Math.floor((Date.now() - new Date(pkg.binary.timestamp).getTime()) / (1000 * 60 * 60 * 24)) > 180) &&
                                            <span className="text-warning">
                                                <br></br>
                                                <TiWarning data-toggle="tooltip" data-placement="bottom" title="This build is over 180 days old." size={25} style={{ color: '##B33B3B' }}/>
                                                Out of Date
                                            </span>}
                                    </span>
                                </td>
                                <td className="fw-bold align-middle">
                                    {capitalize(pkg.binary.distribution)}
                                </td>
                                <td className="align-middle">
                                    <img width="100px" alt={`${pkg.binary.distribution} logo`} src={getImageForDistribution(pkg.binary.distribution)}/>
                                </td>
                                <td className="align-middle">
                                    {capitalize(pkg.binary.os)}
                                </td>
                                <td className="align-middle">
                                    {pkg.binary.architecture}
                                </td>
                                <td className="align-middle">
                                    <table className="table parent mb-0 w-auto">
                                        <tbody className="table-light">
                                            {pkg.binary.installer && (
                                                <BinaryTable
                                                    checksum={pkg.binary.installer[0].sha265sum}
                                                    filename={pkg.binary.installer[0].name}
                                                    link={pkg.binary.installer[0].link}
                                                    os={pkg.binary.os}
                                                    arch={pkg.binary.architecture}
                                                    pkgType={pkg.binary.image_type}
                                                    javaVersion={pkg.release_name}
                                                    vendor={capitalize(pkg.vendor)}
                                                />
                                            )}
                                            <BinaryTable
                                                checksum={pkg.binary.package.sha265sum}
                                                filename={pkg.binary.package.name}
                                                link={pkg.binary.package.link}
                                                os={pkg.binary.os}
                                                arch={pkg.binary.architecture}
                                                pkgType={pkg.binary.image_type}
                                                javaVersion={pkg.release_name}
                                                vendor={capitalize(pkg.vendor)}
                                            />
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                    )
                ) :
                    <tr></tr>
                }
            </tbody>
        </table>
    );
};

export default DownloadTable;

interface DownloadProps {
    checksum: string,
    link: URL;
    filename: string;
    os: string;
    arch: string;
    pkgType: string;
    javaVersion: string;
    vendor: string;
}

const BinaryTable = ({ checksum, link, filename, os, arch, pkgType, javaVersion, vendor }: DownloadProps): null | JSX.Element => {
    return (
        <tr key={checksum}>
            <td className="align-middle text-center">
                <table><tbody>
                <tr>
                    <td>
                        {checksum 
                            ? <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={checksum}><Trans>Checksum</Trans> (SHA256)</a>
                            : <></>
                        }
                    </td>
                </tr>
                </tbody></table>
            </td>
            <td className="align-middle">
                <Link to="/download" state={{ link: link, checksum: checksum, os: os, arch: arch, pkg_type: pkgType, java_version: javaVersion, vendor: vendor }} className="btn btn-primary" style={{width: "6em"}}>
                    <FaDownload /> {fetchExtension(filename)}
                </Link>
            </td>
        </tr>
    )
}
