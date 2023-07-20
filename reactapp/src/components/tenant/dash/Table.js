import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTenant } from '../../../Context/TenantContext';

const columns = [
  {
    id: 'zaman',
    label: 'Zaman',
    minWidth: 50,
    format: (value) => value.toLocaleString('utf-8'),
  },

  {
    id: 'cihazIsmi',
    label: 'Cihaz ismi',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('utf-8'),
  },
  {
    id: 'tip',
    label: 'Alarm Tipi',
    minWidth: 50,
    align: 'right',
    style: { fontSize: '15px', color: 'red' },
    format: (value) => value.toLocaleString('utf-8'),
  },
  {
    id: 'deger',
    label: 'Değer',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
    const {alarm} =useTenant();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(alarm);
  return (
    <Paper sx={{  width: '600px', overflow: 'hidden',marginLeft:'130px' }} elevation={1}>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ border: 'none' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,fontSize:'15px',color:'#4d4d4d'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {alarm
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.zaman}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={ column.id==='tip' ? {fontSize:'15px',color:'#ff3300'} : {fontSize:'15px',color:'#4d4d4d'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        count={alarm.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
