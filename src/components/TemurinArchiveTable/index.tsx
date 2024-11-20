import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { FaDownload } from 'react-icons/fa';
import { MdNotes } from 'react-icons/md';
import { Pagination } from '@mui/material';
import { MdVerifiedUser } from 'react-icons/md';
import { capitalize } from '../../util/capitalize';
import { localeDate } from '../../util/localeDate';

const TemurinArchiveTable = ({results, updatePage}) => {
    const { language } = useI18next();

    const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
        updatePage(page - 1);
    };

    return (
        <div id="archive-list">
            <table id='archive-table' className='table table-borderless table-condensed archive-container' style={{ borderSpacing: '0 20px', borderCollapse: 'separate'}}>
                <tbody className="table-light">
                    {results && results.releases ? (
                        results.releases.map(
                            (release, i): string | JSX.Element =>
                                release && (
                                    <tr key={`release-${i}`} className="release-row">
                                        <td className="text-white" style={{backgroundColor: "#333"}}>
                                            <div>
                                                <a href={release.release_link} className="link-light">
                                                    <h2 className = "pt-5" style={{fontSize: "1.5rem"}}>{release.release_name}</h2>
                                                </a>
                                                <MdVerifiedUser data-toggle="tooltip" data-placement="bottom" title="This build is JCK certified" size={30} style={{ color: '#537FB9' }}/>
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
                                                <h4 className="pt-3 pb-3" style={{fontSize: ".8rem"}}>{localeDate(release.timestamp, language)}</h4>
                                                {release.source_url &&
                                                    <p><a href={release.source_url} className="link-light"><FaDownload /> <Trans>Source Code Archive</Trans></a></p>
                                                }
                                                {release.release_notes && 
                                                    <p><Link to={`/temurin/release-notes?version=${release.release_notes_name}`} className="link-light"><MdNotes /> <Trans>Release Notes</Trans></Link></p>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <table className="archive-platforms">
                                                <tbody>
                                                    <tr>
                                                        <td className="fw-bold">OS / Architecture</td>
                                                        <td className="fw-bold" style={{borderLeft: "1px solid rgb(221, 221, 221)"}}>Installer</td>
                                                        <td className="fw-bold">SHA256</td>
                                                        <td className="fw-bold" style={{borderLeft: "1px solid rgb(221, 221, 221)"}}>Binary</td>
                                                        <td className="fw-bold">SHA256</td>
                                                    </tr>
                                                    {Object.keys(release.platforms).map(function(key) {
                                                        return (
                                                            release.platforms[key].assets.map(
                                                                (asset, i): string | JSX.Element =>
                                                                    asset && (
                                                                        <tr key={`asset-${i}`}>
                                                                            <td>
                                                                            {i === 0 &&
                                                                                `${capitalize(asset.os)} ${asset.architecture === 'x32' ? 'x86' : asset.architecture}`
                                                                            }
                                                                            </td>
                                                                            <td style={{borderLeft: "1px solid rgb(221, 221, 221)", paddingLeft: "20px"}}>
                                                                                {asset.installer_link ? (
                                                                                    <DownloadButton
                                                                                        link={asset.installer_link}
                                                                                        checksum={asset.installer_checksum}
                                                                                        platform={key}
                                                                                        type={asset.type}
                                                                                        version={release.release_name}
                                                                                        size={asset.size}
                                                                                        installer={true}
                                                                                    />
                                                                                ) :
                                                                                    <a className="btn" style={{width: "9em", backgroundColor: "#D7DEE9"}}>
                                                                                        <Trans i18nKey='download.not.available' defaults='Not Available' />
                                                                                    </a>
                                                                                }
                                                                            </td>
                                                                            <td style={{paddingRight: "20px"}}>
                                                                            {asset.installer_link && asset.installer_checksum 
                                                                                ? <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.installer_checksum}><Trans>Checksum</Trans></a>
                                                                                : <></>
                                                                            }
                                                                            </td>
                                                                            <td style={{borderLeft: "1px solid rgb(221, 221, 221)", paddingLeft: "20px"}}>
                                                                                <DownloadButton
                                                                                    link={asset.link}
                                                                                    checksum={asset.checksum}
                                                                                    platform={key}
                                                                                    type={asset.type}
                                                                                    version={release.release_name}
                                                                                    size={asset.size}
                                                                                    installer={false}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                {asset.checksum
                                                                                    ? <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}><Trans>Checksum</Trans></a>
                                                                                    : <></>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                            )
                                                        )
                                                    })}
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
            {results && results.pagecount && (
                <Pagination
                    className='pt-3 d-flex justify-content-center'
                    count={results.pagecount}
                    onChange={handlePageClick}
                    showFirstButton
                    showLastButton
                />
            )}
        </div>
    );
};

export default TemurinArchiveTable;

interface DownloadProps {
    link: URL;
    checksum: string,
    type: string;
    size: number;
    platform: string;
    version: string;
    installer: boolean;
}

const DownloadButton = ({ link, checksum, type, size, platform, version, installer }: DownloadProps): null | JSX.Element => {
    let os: string = capitalize(platform.split("-")[0])
    let arch: string = platform.split("-")[1]
    return (
        <Link to="/download" state={{ link: link, checksum: checksum, os: os, arch: arch, pkg_type: type, java_version: version }} className="btn btn-primary" style={{width: "9em"}}>
            {type} {!installer ? (size + " MB") : ""}
        </Link>
    )
}
