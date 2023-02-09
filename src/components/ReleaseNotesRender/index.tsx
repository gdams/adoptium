import React, { useRef, MutableRefObject } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

/* axelinter:disable:aria-required-children */

import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';
import './ReleaseNotesRender.scss';

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
  { field: 'priority', headerName: 'Priority', width: 100 },
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
      {releaseNotes ? (
        <div className='pt-3' style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              aria-label='Release Notes'
              autoHeight
              rows={releaseNotes.release_notes}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[20, 50, 75]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              isRowSelectable={() => false}
            />
          </div>
        </div>
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
