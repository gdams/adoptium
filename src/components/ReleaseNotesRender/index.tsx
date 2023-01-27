import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { fetchReleaseNotesForVersion } from '../../hooks';

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search).version;
  const [releaseNotes, setReleaseNotes] = useState(null);

  useEffect(() => {
    if (version) {
      fetchReleaseNotesForVersion(version).then((data) => {
        setReleaseNotes(data);
      });
    }
  }, [version]);

  return (
	    <div className="text-center container">
        <h2>{version}</h2>
      {releaseNotes ? (
        <table className="table" style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
          <thead className='table-dark'>
            <tr className="table-head">
              <th>Issue</th>
              <th>Component</th>
              <th>Priority</th>
              <th>Title</th>
            </tr>
          </thead>
          {releaseNotes && (
              releaseNotes.release_notes.map(
                (issue, i): string | JSX.Element =>
                  issue && (
                    <>
                    <tr>
                      <td nowrap="nowrap"><a href={issue.link}>{issue.id}</a></td>
                      <td>{issue.subcomponent}</td>
                      <td>{issue.priority}</td>
                      <td>{issue.title}</td>
                    </tr>

                    </>
                  )
                )
            )}
        </table>
      ) : (
        <>
        <h2>Oops... We couldn't find those release notes</h2>
        <span>Please ensure that you have a specified a version using the version URL parameter: <code>?version=x.x.x</code></span>
        </>
      )}

</div>
  );
 };

export default ReleaseNotesRender;
