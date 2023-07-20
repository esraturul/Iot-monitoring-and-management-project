import  React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import SideBard from '../../components/tenant/SidebarMusteri';
import { Button } from '@mui/material';
import { useTenant } from '../../Context/TenantContext';
import { deleteMusteri } from '../../api';

function createData( id,zaman, isim, email,ulke,sehir) {
  return {id, zaman, isim, email,ulke,sehir };
}

export default function BasicTable(props) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [veriler,setVeriler]=useState([]);
    const [rows,setRows]=useState([]);
    

    const {musteriler,setPost}=useTenant();

    const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
    };

    const handleDelete = async (rowId) => {

      await deleteMusteri(rowId);
      setPost("musteri");
    };

    useEffect(()=>{
      setRows([]);
      musteriler.map((musteri)=>{
        const sehir_ulke= musteri.sehir_ulke.split("/");
        const row=createData(musteri.id,musteri.updated_at,musteri.isim_soyisim,musteri.username,sehir_ulke[1],sehir_ulke[0]);
        setRows((current)=>[...current,row]);
      })

    },[musteriler])

    useEffect(() => {
      if(props.parametre===undefined || props.parametre===""){
        setVeriler(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.isim === props.parametre;
        });
        setVeriler(filtered);
      }
      
    }, [props.parametre,rows]);



  return (
    

    <TableContainer component={Paper} sx={{ maxWidth: 1200 ,marginLeft:"100px",marginTop:"60px",backgroundColor:'#f2f2f2'}} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Zaman</TableCell>
            
            <TableCell align="left">Müsteri İsmi</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">Ülke</TableCell>
            <TableCell align="left">Şehir</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {veriler.map((row,index) => (
            <TableRow
              key={index}
              onMouseEnter={() => handleRowHover(index)}
              onMouseLeave={() => handleRowHover(null)}
              
              sx={{ '&:last-child td , &:last-child th': { border: 0 } ,
              backgroundColor: hoveredRow === index ? '#b3d1ff' : '#f2f2f2',
           
            }}
            >
              <TableCell component="th" scope="row">
                {row.zaman}
              </TableCell>
              <TableCell align="left">{row.isim}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.ulke}</TableCell>
              <TableCell align="left">{row.sehir}</TableCell>
              <TableCell align='right' sx={{width:'20px'}}> <SideBard id={row.id}/> </TableCell>
                 
              <TableCell align='right' sx={{width:'20px'}}>
                <Button onClick={()=> handleDelete(row.id)} > 
                <DeleteIcon htmlColor='#24478f'/> 
              </Button></TableCell>
        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
