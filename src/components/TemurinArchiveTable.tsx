import * as React from "react"

const TemurinArchiveTable = () => {

    return (
        <div id="archive-list" className="hide">
            <div id="pagination-container">
                <table id='archive-table' className='table table-borderless table-condensed archive-container' style={{ borderSpacing: '0 20px', borderCollapse: 'separate'}}>
                    <tbody className="table-light">
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TemurinArchiveTable;