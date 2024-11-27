import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { FaDownload } from 'react-icons/fa';
import { MdNotes } from 'react-icons/md';
import { MdVerifiedUser } from 'react-icons/md';
import { capitalize } from '../../util/capitalize';
import { localeDate } from '../../util/localeDate';
import { IoMdHelpBuoy } from 'react-icons/io';
import { PiFiles } from 'react-icons/pi';
import LinkText from '../LinkText'

const TemurinDownloadTable = ({results}) => {
    const { language } = useI18next();

    let source
    if (results && results.source) {
        source = results.source
    }

    return (
    <>
        {source &&
            <p className='release-notes'>
                <Link to={`/temurin/release-notes?version=${source.release_name}`}><MdNotes /><Trans>Release Notes</Trans></Link> 
                <Link to="/installation/"><IoMdHelpBuoy /><Trans>Installation Guide</Trans></Link> 
                <LinkText href={source.binary.package.link}><PiFiles /><Trans>Source Code</Trans></LinkText>
            </p>
        }
        <table id="download-table" className="table table-bordered releases-table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <tbody className="table-light">
            {results ? (
                results.map(
                    (pkg, i): string | JSX.Element =>
                        pkg && (
                            <tr key={i}>
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
                                    <span className="text-white">{localeDate(pkg.release_date, language)}</span>
                                </td>
                                <td className="align-middle w-20">{capitalize(pkg.os)}</td>
                                <td className="align-middle w-20">{pkg.architecture === 'x32' ? 'x86' : pkg.architecture}</td>
                                <td className="align-middle">
                                    <table className="table parent mb-0 w-100">
                                        {pkg.binaries.map(
                                            (binary, i): string | JSX.Element =>
                                                binary && (
                                                <tbody key={i} className="table-light">
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
                                                </tbody>
                                            )
                                        )}
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
        <tr>
            <td className="align-middle text-center w-50">
                <table><tbody>
                <tr>
                    <td>
                        {`${type} - ${size} MB`}
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className="fw-light">
                            {checksum
                                ? <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={checksum}><small><Trans>Checksum</Trans></small></a>
                                : <Trans>Not available</Trans>
                            }
                        </span>
                    </td>
                </tr>

                </tbody></table>
            </td>
            <td className="align-middle w-50">
                <Link to="/download" state={{ link: link, checksum: checksum, os: os, arch: arch, pkg_type: type, java_version: version }} className="btn btn-primary" style={{width: "6em"}}>
                    <FaDownload /> {extension}
                </Link>
            </td>
        </tr>
    )
}
