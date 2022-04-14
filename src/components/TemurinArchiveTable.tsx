import * as React from "react"
import { Link } from 'gatsby-plugin-react-i18next';
import moment from 'moment';
import { FaDownload } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import { capitalize } from '../util/capitalize';

const TemurinArchiveTable = ({results}) => {
    let os: string
    let arch: string
    return (
        <div id="archive-list">
            <div id="pagination-container">
                <table id='archive-table' className='table table-borderless table-condensed archive-container' style={{ borderSpacing: '0 20px', borderCollapse: 'separate'}}>
                    <tbody className="table-light">
                        {results ? (
                            results.map(
                                (release, i): string | JSX.Element =>
                                    release && (
                                        <tr key={release.release_name} className="release-row">
                                            <td className="text-white" style={{backgroundColor: "#333"}}>
                                                <div>
                                                    <a href={release.release_link} className="link-light">
                                                        <h2 className = "pt-5" style={{fontSize: "1.5rem"}}>{release.release_name} <MdVerifiedUser data-toggle="tooltip" data-placement="bottom" title="This build is JCK certified" size={30} style={{ color: '#537FB9' }}/></h2>
                                                    </a>
                                                    <h4 className="pt-3 pb-3" style={{fontSize: ".8rem"}}>{moment(release.timestamp).format('D MMMM YYYY')}</h4>
                                                    {release.source_url &&
                                                        <span><a href={release.source_url} className="link-light"><FaDownload /> Source Code Archive</a></span>
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
                                                                                    /* Returns an "OS Arch" */
                                                                                    `${capitalize(key.split("-")[0])} ${key.split("-")[1]}`
                                                                                }
                                                                                </td>
                                                                                <td>
                                                                                    {asset.installer_link ? (
                                                                                        <Link to="/download" state={{ link: asset.installer_link }} className="btn btn-primary" style={{width: "9em"}}>
                                                                                            {asset.type}
                                                                                        </Link>
                                                                                    ) :
                                                                                        <a className="btn" style={{width: "9em", backgroundColor: "#D7DEE9"}}>
                                                                                            Not Available
                                                                                        </a>
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <Link to="/download" state={{ link: asset.link }} className="btn btn-secondary" style={{width: "9em"}}>
                                                                                        {asset.type} {asset.size} MB
                                                                                    </Link>
                                                                                </td>
                                                                                <td>
                                                                                    <a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}>Checksum</a>
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
            </div>
        </div>
    );
};

export default TemurinArchiveTable;
