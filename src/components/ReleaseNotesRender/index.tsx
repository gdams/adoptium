import React, { useRef, MutableRefObject } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search, {decode: false}).version;

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const releaseNotes = fetchReleaseNotesForVersion(isVisible, version);

  return (
	    <div ref={ref} className='text-center container'>
        <h2>{version}</h2>
      {releaseNotes ? (
        <table className='table' style={{borderSpacing: '0 10px', borderCollapse: 'separate'}}>
          <thead className='table-dark'>
            <tr className='table-head'>
              <th>Issue</th>
              <th>Component</th>
              <th>Priority</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
          {releaseNotes && (
              releaseNotes.release_notes.map(
                (issue, i): string | JSX.Element =>
                  issue && (
                    <tr key={issue.id}>
                      <td nowrap='nowrap'>
                        <a target='_blank' rel='noopener noreferrer' href={issue.link.toString()}>{issue.id}</a>
                      </td>
                      <td>{issue.subcomponent}</td>
                      <td>{issue.priority}</td>
                      <td>{issue.title}</td>
                    </tr>

                  )
                )
            )}
          </tbody>
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
