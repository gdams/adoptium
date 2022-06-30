import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { FaDownload } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import { capitalize } from '../util/capitalize';
import { localeDate } from "../util/localeDate";

const TemurinDownloadTable = ({results}) => {
    const { language } = useI18next();

    let source = false
    if (results && results.source) {
        source = results.source
    }
    return (
        <>
        {source ? (
             <span><a href={source.binary.package.link}>{source.release_name} <Trans>Source Code Archive</Trans></a></span>
        ):
            <></>
        }
        <table id="download-table" className="table table-bordered releases-table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <tbody className="table-light">
            {results ? (
                results.map(
                    (pkg, i): string | JSX.Element =>
                        pkg && (
                            <tr key={pkg.platform_name}>
                                <td className="table-secondary py-4 align-middle w-25">
                                    <a href={pkg.release_link} className="link-light">
                                        <span className="text-white">{pkg.release_name}</span>
                                    </a>
                                    <span className="text-white d-block m-2">
                                        Temurin <MdVerifiedUser data-toggle="tooltip" data-placement="bottom" title="This build is JCK certified" size={25} style={{ color: '#537FB9' }}/>
                                        <Link to='/aqavit'>
                                            <img
                                                src='/images/aqavit-icon.png'
                                                width={25}
                                                alt='AQAvit logo'
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="This build is AQAvit Verified"
                                                className='img-fluid'
                                            />
                                        </Link>
                                    </span>
                                    <span className="text-white text-muted">{localeDate(pkg.release_date, language)}</span>
                                </td>
                                <td className="align-middle w-20">{capitalize(pkg.os)}</td>
                                <td className="align-middle w-20">{pkg.architecture}</td>
                                <td className="align-middle">
                                    <table className="table parent mb-0 w-auto">
                                        <tbody className="table-light">
                                        {pkg.binaries.map(
                                            (binary, i): string | JSX.Element =>
                                                binary && (
                                                    <>
                                                    {binary.installer_link && (
                                                        <BinaryTable
                                                            checksum={binary.installer_checksum}
                                                            link={binary.installer_link}
                                                            extension={binary.installer_extension}
                                                            type={binary.type}
                                                            size={binary.installer_size}
                                                            os={capitalize(pkg.os)}
                                                            arch={pkg.architecture}
                                                            version={pkg.release_name}
                                                        />
                                                    )}
                                                    <BinaryTable
                                                        checksum={binary.checksum}
                                                        link={binary.link}
                                                        extension={binary.extension}
                                                        type={binary.type}
                                                        size={binary.size}
                                                        os={capitalize(pkg.os)}
                                                        arch={pkg.architecture}
                                                        version={pkg.release_name}
                                                    />
                                                </>
                                            )
                                        )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )
                )
            ) :
                <tr></tr>
            }
            </tbody>
        </table>
        </>
    );
};

export default TemurinDownloadTable;

const BinaryTable = ({ checksum, link, extension, type, size, os, arch, version }) => {
    return (
        <tr key={checksum}>
            <td className="align-middle text-center">
                <table><tbody>
                <tr>
                    <td>
                        {`${type} - ${size} MB`}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="fw-light">
                            <a href=""
                                data-bs-toggle="modal"
                                data-bs-target="#checksumModal"
                                data-bs-checksum={checksum}>
                                <small><Trans>Checksum</Trans></small>
                            </a>
                        </span>
                    </td>
                </tr>

                </tbody></table>
            </td>
            <td className="align-middle">
                <Link to="/download" state={{ link: link, os: os, arch: arch, pkg_type: type, java_version: version }} className="btn btn-primary" style={{width: "6em"}}>
                    <FaDownload /> {extension}
                </Link>
            </td>
        </tr>
    )
}
