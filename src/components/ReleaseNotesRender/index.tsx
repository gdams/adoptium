import React, { useRef, MutableRefObject } from 'react';
import { useTheme } from '@mui/material/styles';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { BiLastPage, BiFirstPage, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { fetchReleaseNotesForVersion, useOnScreen } from '../../hooks';
import './ReleaseNotesRender.scss';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <BiLastPage /> : <BiFirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <BiChevronRight /> : <BiChevronLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <BiChevronLeft /> : <BiChevronRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <BiFirstPage /> : <BiLastPage />}
      </IconButton>
    </Box>
  );
}

const ReleaseNotesRender = (): null | JSX.Element => {
  const version = queryString.parse(useLocation().search, {decode: false}).version;

  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const releaseNotes = fetchReleaseNotesForVersion(isVisible, version);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
	  <div ref={ref} className='text-center'>
    <h2>{version}</h2>
      {releaseNotes ? (
        <TableContainer className='py-3'>
          <Table className='table table-striped' sx={{ minWidth: 650 }} aria-label='Release Notes Table'>
            <TableHead className='table-dark'>
              <TableRow className='table-head'>
                <TableCell align="left" className='fw-bold text-light'>Issue</TableCell>
                <TableCell align="left" className='fw-bold text-light'>Component</TableCell>
                <TableCell align="left" className='fw-bold text-light'>Priority</TableCell>
                <TableCell align="left" className='fw-bold text-light'>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? releaseNotes.release_notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : releaseNotes.release_notes
              ).map((issue) => (
                <TableRow
                  key={issue.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='text-nowrap' component='th' scope='row'>
                    <a target='_blank' rel='noopener noreferrer' href={issue.link.toString()}>{issue.id}</a>
                  </TableCell>
                  <TableCell>{issue.subcomponent}</TableCell>
                  <TableCell>{issue.priority}</TableCell>
                  <TableCell sx={{maxWidth: '500px'}}>
                    {issue.title}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[20, 50, 75, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={releaseNotes.release_notes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    className: 'm-0',
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
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
