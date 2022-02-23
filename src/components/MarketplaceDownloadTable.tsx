import * as React from "react"
import { FaDownload } from 'react-icons/fa';
import { capitalize } from '../util/capitalize';
import { normalizeJavaVersion, getImageForVendor, getVendorForDistribution, getDownloadLink } from '../hooks'

const DownloadTable = ({results}) => {

    async function fetchDownloadLink(id, directly_downloadable) {  
        let pkgUri           
        let promise = getDownloadLink(id, directly_downloadable);
        promise.then(function(uri) {
            pkgUri = `/download?link=${uri}`;
            window.location.href = pkgUri
        }, function() { 
            pkgUri = null;
        });
    }

    return (
        <table id="download-table" className="table table-bordered releases-table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
            <thead className="table-dark">
                <tr className="table-head">
                    <td className="table-head">Build Version</td>
                    <td className="table-head">Distribution</td>
                    <td className="table-head">Vendor</td>
                    <td className="table-head">Operating System</td>
                    <td className="table-head">Architecture</td>
                    <td className="table-head">Download</td>
                </tr>
            </thead>
            <tbody className="table-light">
                {results ? (
                    results.map(
                        (pkg, i): string | JSX.Element =>
                            <tr key={pkg.id}>
                                <td className="table-secondary py-4 text-white">
                                    <span>{normalizeJavaVersion(pkg.java_version)}</span>
                                    <br></br>
                                    <span>{pkg.package_type == 'jdk' ? 'JDK' : 'JRE'}</span>
                                </td>
                                <td className="fw-bold align-middle">
                                    {pkg.distribution == 'semeru_certified' ? 'Semuru CE' : capitalize(pkg.distribution)}
                                </td>
                                <td className="align-middle">
                                    <img width="100px" src={getImageForVendor(getVendorForDistribution(pkg.distribution))}/>
                                </td>
                                <td className="align-middle">
                                    {pkg.lib_c_type == 'musl' ? 'Alpine Linux' : pkg.operating_system == 'macos' ? 'MacOS' : capitalize(pkg.operating_system)}
                                </td>
                                <td className="align-middle">
                                    {pkg.architecture}
                                </td>
                                <td className="align-middle text-center">
                                    <a className="btn btn-primary" 
                                        style={{width: "6em"}}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fetchDownloadLink(pkg.id, pkg.directly_downloadable)
                                        }}
                                    >
                                        <FaDownload /> {pkg.archive_type}
                                    </a>
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