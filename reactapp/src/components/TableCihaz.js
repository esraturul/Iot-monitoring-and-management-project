import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useData } from '../Context/context';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { fetchDashs, fetchDevice } from '../api';
import { useAuth } from '../Context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, isim, tip, alarm_alt_sinir, alarm_ust_sinir) {
  return { id, isim, tip, alarm_alt_sinir, alarm_ust_sinir };
}

export default function TableCihaz(props) {
  const { name, cihazlar } = useData();
  const { user } = useAuth();
  const [filteredRows, setFilteredRows] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (rows.length === cihazlar.length) {
      setRows([]);
    }
    cihazlar.forEach((cihaz) => {
      const row = createData(
        cihaz.id,
        cihaz.isim,
        cihaz.tip,
        cihaz.alarm_alt_sinir,
        cihaz.alarm_ust_sinir
      );
      setRows((current) => [...current, row]);
    });
  }, [cihazlar]);

  useEffect(() => {
    if (props.parametre === undefined || props.parametre === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) => {
        return row.isim === props.parametre;
      });
      setFilteredRows(filtered);
    }
  }, [props.parametre, rows]);

  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 1000, marginLeft: "200px", marginTop: "20px" }}
      elevation={0}
    >
      <Table sx={{ maxWidth: 1000 }} size="small" aria-label="a dense table">
        <TableHead> 
          <TableRow>
            <TableCell colSpan={7} sx={{ fontWeight: 'bold', fontSize: '1.4rem', paddingBottom: '1rem',color:"grey" }}>Tenantlar</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zaman</TableCell>
            <TableCell align="left">Başlık</TableCell>
            <TableCell>Tenant Profili</TableCell>
            <TableCell>E-posta</TableCell>
            <TableCell>Ülke</TableCell>
            <TableCell>Şehir</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.isim}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                marginTop: "5px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <TableCell component="th" scope="row">
                {row.isim}
              </TableCell>
              <TableCell align="left">{row.tip}</TableCell>
              <TableCell align="left">{`${row.alarm_ust_sinir} > veya ${row.alarm_alt_sinir} <`}</TableCell>
              <TableCell align="right" sx={{ width: "30px" }} elevation={0}>
                <Link href={`gostergeler/${row.isim}`} color="#595959">
                  <DashboardIcon />
                </Link>
              </TableCell>
              <TableCell align="right" sx={{ width: "30px" }} elevation={0}>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
