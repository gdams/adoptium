import React, { useRef, MutableRefObject } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';
import './ReleaseNotesRender.scss';
import { render } from 'react-dom';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Issue',
    width: 150,
    renderCell: (params) => (
      <a target='_blank' rel='noopener noreferrer' href={params.row.link}>{params.value}</a>
    ),
  },
  { field: 'component', headerName: 'Component', width: 150 },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 100,
    renderCell: (params) => {
      // set title text using switch case
      // if params.value is 1 then title = P4 - Minor loss of function, or other problem where easy workaround is present.
      let title = 'Unknown Priority';
      switch (params.value) {
        case '1':
          title = 'P1 - Blocks development and/or testing work, production could not run.';
          break;
        case '2':
          title = 'P2 - Crashes, loss of data, severe memory leak.';
          break;
        case '3':
          title = 'P3 - Major loss of function.';
          break;
        case '4':
          title = 'P4 - Minor loss of function, or other problem where easy workaround is present.';
          break;
        case '5':
          title = 'P5 - Cosmetic problem like misspelt words or misaligned text.';
          break;
      }

      return (
        // check if params.value is defined, if not, return an empty string
        <span title={title} className={`badge bg-primary priority-${params.value}`}>{params.value ? `P${params.value}` : ''}</span>
      )
    },
  },
  { field: 'title', headerName: 'Title', width: 800 },
];

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search, {decode: false}).version;

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const releaseNotes = fetchReleaseNotesForVersion(isVisible, version);
  const [pageSize, setPageSize] = React.useState<number>(20);

  return (
	  <div ref={ref} className='text-center'>
    <h2>{version}</h2>
      <div className='pt-3' style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {releaseNotes?.release_notes === null ? (
            <>
            <h2>Oops... We couldn't find those release notes</h2>
            <span>Please ensure that you have a specified a version using the version URL parameter: <code>?version=x.x.x</code></span>
            </>
          ) : (
          <DataGrid
            aria-label='Release Notes'
            autoHeight
            rows={releaseNotes && releaseNotes.release_notes? releaseNotes.release_notes : []}
            loading={releaseNotes === null}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[20, 50, 75]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            isRowSelectable={() => false}
          />
          )}
        </div>
      </div>
    </div>
  );
 };

export default ReleaseNotesRender;
