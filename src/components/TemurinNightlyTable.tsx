import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { capitalize } from '../util/capitalize';
import { localeDate } from "../util/localeDate";

const TemurinNightlyTable = ({results}) => {
    const { language } = useI18next();

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
                                                            <td>{capitalize(asset.os)} {asset.architecture}</td>
                                                            <td>{asset.type}</td>
                                                            <td>{localeDate(release.timestamp, language)}</td>
                                                            <td><Link to="/download" state={{ link: asset.link, os: capitalize(key.split("-")[0]), arch: key.split("-")[1], pkg_type: asset.type, java_version: 'nightly' }}>{`${asset.extension} (${asset.size} MB)`}</Link></td>
                                                            {asset.installer_link ? (
                                                                <td><Link to="/download" state={{ link: asset.installer_link }}>{asset.installer_extension}</Link></td>
                                                            ) :
                                                                <td>Not Available</td>
                                                            }
                                                            <td><a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}><Trans>Checksum</Trans></a></td>
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