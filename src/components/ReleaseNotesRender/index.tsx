import React, { useRef, MutableRefObject } from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, gridClasses } from '@mui/x-data-grid';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';
import './ReleaseNotesRender.scss';

export const fetchTitle = (priority) => {
  let title
  switch (priority) {
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
    case '6':
      title = 'This issue is not publicly visible.'
  }
  return title;
};

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: 'priority',
    type: 'singleSelect',
    valueOptions: ['1', '2', '3', '4', '5'],
    headerName: 'Priority',
    width: 100,
    renderCell: (params) => {
      const title = fetchTitle(params.value);
      return (
        // check if params.value is defined, if not, return an empty string
        <span title={title} className={`badge bg-secondary priority-${params.value}`}>{params.value && params.value !== '6' ? `P${params.value}` : 'P?'}</span>
      )
    },
  },
  {
    field: 'type',
    type: 'singleSelect',
    // TODO: This needs automatically setting
    valueOptions: ['Backport', 'Bug', 'Enhancement'],
    headerName: 'Type',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <span>{params.value ? params.value : 'Hidden'}</span>
    )
  },
  {
    field: 'component',
    headerName: 'Component',
    width: 150,
    sortable: false
  },
  {
    field: 'id',
    headerName: 'Issue',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <a target='_blank' rel='noopener noreferrer' href={params.row.link}>{params.value}</a>
    ),
  },
  { field: 'title', headerName: 'Title', width: 800, sortable: false },
];

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search, {decode: false}).version;

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const releaseNotes = fetchReleaseNotesForVersion(isVisible, version);

  // Set all priorities set as undefined to '?' to avoid errors
  releaseNotes?.release_notes?.forEach((note) => {
    if (note.priority === undefined) {
      note.priority = '6';
    }
  });

  interface FilterItem {
    field: string;
    operator: string;
    value: string;
  }

  // Set type to 'Enhancement' by default if version matches jdk-xx+xx
  const regex = /^jdk-(2\d|\d{3,})\+\d+$/;
  let filterItems: FilterItem[] = [];
  if (version?.toString && regex.test(version?.toString())) {
    filterItems.push(
      {
        field: 'type',
        operator: 'is',
        value: 'Enhancement'
      }
    )
  }

  const totalP1 = releaseNotes?.release_notes?.filter((note) => note.priority === '1').length;

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
            <>
              <p>This section organizes the changes in the selected update release by the main component under which each issue is filed.</p>
              <p><strong>{`The total number of fixes marked as P1 is: ${totalP1}`}</strong></p>
              <DataGrid
                aria-label='Release Notes'
                autoHeight
                rows={releaseNotes && releaseNotes.release_notes? releaseNotes.release_notes : []}
                loading={releaseNotes === null}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20
                    }
                  },
                  filter: {
                    filterModel: {
                      items: filterItems
                    }
                  },
                  sorting: {
                    sortModel: [{ field: 'priority', sort: 'asc' }],
                  },
                }}
                pageSizeOptions={[20, 50, 75]}
                pagination
                isRowSelectable={() => false}
                components={{
                  Toolbar: CustomToolbar,
                }}
                getRowHeight={() => 'auto'}
                sx={{
                  [`& .${gridClasses.cell}`]: {
                    py: 1,
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
 };

export default ReleaseNotesRender;
