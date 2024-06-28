import * as React from "react"
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { capitalize } from '../../util/capitalize';
import { localeDate } from '../../util/localeDate';

const getFileName = (link: URL) => {
    return link.toString().split('/').slice(-1);
}

const TemurinNightlyTable = ({results}) => {
    const { language } = useI18next();

    return (
        <div id="nightly-list">
            <table id='nightly-table' className='table table-hover text-start table-striped'>
                <thead className="table-dark">
                    <tr>
                        <td className="fw-bold">Platform</td>
                        <td className="fw-bold">Type</td>
                        <td className="fw-bold">Build/Tag</td>
                        <td className="fw-bold">Date</td>
                        <td className="fw-bold">Binary</td>
                        <td className="fw-bold">Installer</td>
                        <td className="fw-bold">SHA256</td>
                    </tr>
                </thead>
                <tbody className="table-light">
                    {results && results.releases ? (
                        results.releases.map(
                            (release, i): string | JSX.Element =>
                                release && (
                                    Object.keys(release.platforms).map(function(key) {
                                        return (
                                            release.platforms[key].assets.map(
                                                (asset, i): string | JSX.Element =>
                                                    asset && (
                                                        <tr key={`${key}-${asset.type}`} className="nightly-row">
                                                            <td>{capitalize(asset.os)} {asset.architecture === 'x32' ? 'x86' : asset.architecture}</td>
                                                            <td>{asset.type}</td>
                                                            <td>{release.release_name}</td>
                                                            <td>{localeDate(release.timestamp, language)}</td>
                                                            <td><Link 
                                                            title={getFileName(asset.link)}
                                                            to="/download" state={{ link: asset.link, checksum: asset.checksum, os: capitalize(key.split("-")[0]), arch: key.split("-")[1], pkg_type: asset.type, java_version: 'nightly' }}>{`${asset.extension} (${asset.size} MB)`}</Link></td>
                                                            {asset.installer_link ? (
                                                                <td><Link title={getFileName(asset.installer_link)} to="/download" state={{ link: asset.installer_link, checksum: asset.installer_checksum }}>{asset.installer_extension}</Link></td>
                                                            ) :
                                                                <td><Trans i18nKey='download.not.available' defaults='Not Available' /></td>
                                                            }
                                                            <td><a href="" data-bs-toggle="modal" data-bs-target="#checksumModal" data-bs-checksum={asset.checksum}><Trans>Checksum</Trans></a></td>
                                                        </tr>
                                                    )
                                            )
                                        )
                                    })
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
