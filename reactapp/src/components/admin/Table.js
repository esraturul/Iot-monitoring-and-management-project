import  React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBard from '../../components/admin/SideBar';
import { Button } from '@mui/material';
import { useAdmin } from '../../Context/AdminContext';
import { deleteTenant } from '../../api';

function createData( id,zaman,isim, email) {
  return {id, zaman,isim, email };
}

export default function BasicTable(props) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [veriler,setVeriler]=useState([]);
    const [rows,setRows]=useState([]);
    
    const {tenants,setPost}=useAdmin();

    const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
    };

    const handleDelete = async (rowId) => {
        await deleteTenant(rowId);
        setPost("tenant");


    };

    useEffect(()=>{
      setRows([]);

      tenants.map((tenant)=>{
        const isim=tenant.email.split("@");
        const row=createData(tenant.id,tenant.updated_at,isim[0], tenant.email);
        setRows((current)=>[...current,row]);
      })

    },[tenants])

    useEffect(() => {
      if(props.parametre===undefined || props.parametre===""){
        setVeriler(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.email === props.parametre;
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
            <TableCell align="left">İsim</TableCell>
            <TableCell align="left">E-mail</TableCell>


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
              <TableCell align='right' sx={{width:'20px'}}> <SideBard id={row.id}/></TableCell>
                 
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