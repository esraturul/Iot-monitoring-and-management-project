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
import SideBard from '../../components/tenant/SidebarCihaz';
import { Button } from '@mui/material';
import { useTenant } from '../../Context/TenantContext';
import { deleteCihaz } from '../../api';

function createData(id, zaman, isim, kullanici) {
  return {id, zaman, isim, kullanici };
}
/*
let rows = [
  createData('04.06.2023', 'SN-001', 'elifakbas'),
  createData( '04.06.2023', 'SN-002', 'esraturul'),

];*/

export default function BasicTable(props) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [veriler,setVeriler]=useState([]);
    const [rows,setRows]=useState([]);
    
  const {cihazlar,musteriler,setPost}=useTenant();
  

    const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
    };

    const handleDelete = async (rowId) => {
      await deleteCihaz(rowId);
      setPost("cihaz");
    };

    useEffect(()=>{
      setRows([]);
      cihazlar.map((cihaz)=>{
        let musteri={};
        musteriler.map((m)=>{
          if(m.id===cihaz.musteri_id){
            musteri=m;
          }
        })

        const row=createData(cihaz.id,cihaz.updated_at,cihaz.isim,musteri.isim_soyisim);

        setRows((current)=>[...current,row]);
      })
      


    },[cihazlar])

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
            <TableCell align='left'>Zaman</TableCell>
            
            <TableCell align="left">Cihaz İsmi</TableCell>
            <TableCell align="left">Müşteri ismi</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {veriler.map((row,index) => (
            <TableRow
              key={row.id}
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
              <TableCell align="left">{row.kullanici}</TableCell>
              <TableCell align='right' sx={{width:'20px'}}> <SideBard id={row.id}/> </TableCell>
              <TableCell align="right" sx={{width:'20px'}} elevation={0} >{<Link to={`/tenant/gostergeler/${row.isim}` } ><DashboardIcon htmlColor='#24478f'/></Link>}</TableCell> 
             
              
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
