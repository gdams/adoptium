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
                                    <tr key={i} className="release-row">
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
                                                    <p><Link to={`/temurin/release-notes?version=${release.release_name}`} className="link-light"><MdNotes /> <Trans>Release Notes</Trans></Link></p>
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <table className="archive-platforms">
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td className="fw-bold">Installer</td>
                                                        <td className="fw-bold">Binary</td>
                                                        <td className="fw-bold">SHA256</td>
                                                    </tr>
                                                    {Object.keys(release.platforms).map(function(key) {
                                                        return (
                                                            release.platforms[key].assets.map(
                                                                (asset, i): string | JSX.Element =>
                                                                    asset && (
                                                                        <tr key={asset.checksum}>
                                                                            <td>
                                                                            {i === 0 &&
                                                                                `${capitalize(asset.os)} ${asset.architecture}`
                                                                            }
                                                                            </td>
                                                                            <td>
                                                                                {asset.installer_link ? (
                                                                                    <DownloadButton
                                                                                        link={asset.installer_link}
                                                                                        platform={key}
                                                                                        type={asset.type}
                                                                                        version={release.release_name}
                                                                                        size={asset.size}
                                                                                        installer={true}
                                                                                    />
                                                                                ) :
                                                                                    <a className="btn" style={{width: "9em", backgroundColor: "#D7DEE9"}}>
                                                                                        Not Available
                                                                                    </a>
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                <DownloadButton
                                                                                    link={asset.link}
                                                                                    platform={key}
                                                                                    type={asset.type}
                                                                                    version={release.release_name}
                                                                                    size={asset.size}
                                                                                    installer={false}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}><Trans>Checksum</Trans></a>
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
    type: string;
    size: number;
    platform: string;
    version: string;
    installer: boolean;
}

const DownloadButton = ({ link, type, size, platform, version, installer }: DownloadProps): null | JSX.Element => {
    let os: string = capitalize(platform.split("-")[0])
    let arch: string = platform.split("-")[1]
    return (
        <Link to="/download" state={{ link: link, os: os, arch: arch, pkg_type: type, java_version: version }} className={installer ? `btn btn-primary` : `btn btn-secondary`} style={{width: "9em"}}>
            {type} {!installer ? (size + " MB") : ""}
        </Link>
    )
}
