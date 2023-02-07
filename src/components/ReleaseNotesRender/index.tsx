import React, { useRef, MutableRefObject } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';

const { SearchBar } = Search;

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search, {decode: false}).version;

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const releaseNotes = fetchReleaseNotesForVersion(isVisible, version);

  const columns = [{
    dataField: 'link',
    text: 'Issue',
    formatter: (cell, row) => (
      <a target='_blank' rel='noopener noreferrer' href={row.link}>{row.id}</a>
    ),
    sort: true
  }, {
    dataField: 'subcomponent',
    text: 'Component',
    sort: true
  }, {
    dataField: 'priority',
    text: 'Priority',
    sort: true
  }, {
    dataField: 'title',
    text: 'Title'
  }];

  return (
	  <div ref={ref}>
      <h2 className='text-center'>{version}</h2>
      {releaseNotes ? (
        <ToolkitProvider
          keyField='id'
          data={ releaseNotes.release_notes }
          columns={ columns }
          search
        >
          {
            props => (
              <>
                <div className='p-5'>
                  <SearchBar className='' { ...props.searchProps } />
                  <BootstrapTable striped hover bodyClasses='text-nowrap'
                    pagination={
                      paginationFactory({sizePerPage: 20, showTotal: true}) 
                    } { ...props.baseProps }
                  />
                </div>
              </>
            )
          }
        </ToolkitProvider>
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
