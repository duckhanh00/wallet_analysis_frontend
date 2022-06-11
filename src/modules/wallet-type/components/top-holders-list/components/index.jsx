// import React, { Fragment, useEffect, useState } from "react";
import React, { Fragment } from "react";
import { connect } from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import "./style.scss";

const columns = [
  { id: 'rank', label: '', minWidth: 2 },
  { id: 'address', label: 'ADDRESS', minWidth: 100 },
  {
    id: 'tokenPercent',
    label: 'TOKEN PERCENT',
    // minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'totalBalance',
    label: 'TOTAL BALANCE (USD)',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'walletType',
    label: 'WALLET TYPE',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(rank, address, tokenPercent, totalBalance, walletType) {
  return { rank, address, tokenPercent, totalBalance, walletType };
}

const rows = [
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet'),
  createData('#1', '0X123412341234...1234', '13.34%', '100,000,000,000.00', 'Special wallet')
];

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

function TopHoldersList(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Fragment>
      <div className="search__form search-wallet">
        <input
          type="text"
          placeholder="Search"
          value={''}
          onChange={''} className="search__input" required />
        <button onClick={''} className="search__btn-submit"></button>
      </div>

      <Paper>
      <TableContainer className='table-container'>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Fragment>
  );
}

function mapState(state) {
  const { WalletType } = state;
  return { WalletType };
}
const actions = {};

export default connect(mapState, actions)(TopHoldersList);
