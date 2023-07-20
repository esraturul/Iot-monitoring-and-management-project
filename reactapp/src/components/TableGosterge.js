import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import { useData } from '../Context/context';
import { Box } from '@mui/material';
import { Link, Navigate ,useNavigate} from 'react-router-dom';
import { fetchDashs } from '../api';



function createData(cihazId,cihazIsmi, göstergeIsmi) {
  return { cihazId,cihazIsmi, göstergeIsmi};
}


export default function TableGösterge(props) {
    const {name,gostergeler,cihazlar,setKural} =useData();
    const [filteredRows, setFilteredRows] = useState([]);
    const [rows,setRows]=useState([]);

    const [hoveredRow, setHoveredRow] = useState(null);


    const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
    };

   
    
    useEffect(() => {
      if (Array.isArray(gostergeler) && Array.isArray(cihazlar)) {
        for (let i =0; i < gostergeler.length; i++) {
          gostergeler[i].map((gosterge) => {
            cihazlar.map((cihaz) => {
              if (cihaz.id === gosterge.cihaz_id) {
                const row = createData(cihaz.id, cihaz.isim, gosterge.isim);
                setRows((current) => [...current, row]);
              }
            });
          });
        }
      }
    }, [gostergeler, cihazlar]);

      
     useEffect(() => {

      if(props.parametre===undefined || props.parametre===""){
        setFilteredRows(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.cihazIsmi === props.parametre;
        });
        setFilteredRows(filtered);
      }
      
    }, [props.parametre,rows]);
  return (
    <TableContainer component={Paper} sx={{ minWidth: 1000 ,marginLeft:"200px",marginTop:"20px"}} elevation={0} >
      <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cihaz İsmi</TableCell>
            <TableCell align="left">Gösterge</TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            
            
            <TableRow
              key={row.cihazId}
              onMouseEnter={() => handleRowHover(row.cihazId)}
            onMouseLeave={() => handleRowHover(null)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                borderBottom: '1px solid #ccc',
                marginTop: 5,
                cursor: 'pointer', // add cursor style to indicate clickable
                textDecoration:'none',
                backgroundColor: hoveredRow === row.cihazId ? '#ecf2f9' : 'white',
              }}
              
              component={Link} // wrap TableRow in Link component
              to={`${row.cihazIsmi}`} // set the target link URL
              
            >
              <TableCell component="th" scope="row">
                {row.cihazIsmi}
              </TableCell>
              <TableCell align="left">{row.göstergeIsmi}</TableCell>
              
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}