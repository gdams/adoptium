import * as React from "react"
import moment from 'moment';
import { capitalize } from '../util/capitalize';

const TemurinNightlyTable = ({results}) => {
    let os: string
    let arch: string
    return (
        <div id="nightly-list">
            <table id='nightly-table' className='table table-hover text-start table-striped'>
                <thead className="table-dark">
                    <tr>
                        <td className="fw-bold">Platform</td>
                        <td className="fw-bold">Type</td>
                        <td className="fw-bold">Date</td>
                        <td className="fw-bold">Binary</td>
                        <td className="fw-bold">Installer</td>
                        <td className="fw-bold">SHA256</td>
                    </tr>
                </thead>
                <tbody className="table-light">
                    {results ? (
                        results.map(
                            (release, i): string | JSX.Element =>
                                release && (
                                    <>
                                    {Object.keys(release.platforms).map(function(key) {
                                        return (
                                            release.platforms[key].assets.map(
                                                (asset, i): string | JSX.Element =>
                                                    asset && (
                                                        <tr key={asset.checksum} className="nightly-row">
                                                            <td>{capitalize(key.split("-")[0])} {key.split("-")[1]}</td>
                                                            <td>{asset.type}</td>
                                                            <td>{moment(release.timestamp).format('D MMMM YYYY')}</td>
                                                            <td><a href={`/download?link=${asset.link}`}>{`${asset.extension} (${asset.size} MB)`}</a></td>
                                                            {asset.installer_link ? (
                                                                <td><a href={`/download?link=${asset.installer_link}`}>{asset.installer_extension}</a></td>
                                                            ) :
                                                                <td>Not Available</td>
                                                            }
                                                            <td><a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}>Checksum</a></td>
                                                        </tr>
                                                    )
                                            )
                                        )
                                    })}
                                    </>
                                )
                        )
                    ) :
                        <tr></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TemurinNightlyTable;