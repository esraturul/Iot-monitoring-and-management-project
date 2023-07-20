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
import SideBard from '../../components/tenant/SideBar';
import { Button } from '@mui/material';
import { useTenant } from '../../Context/TenantContext';
import { deleteGosterge } from '../../api';


function createData(id, zaman, gosterge,cihaz, kullanici) {
  return { id, zaman, gosterge,cihaz, kullanici };
}



export default function BasicTable(props) {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [veriler,setVeriler]=useState([]);
    const [rows,setRows]=useState([]);

    const {gostergeler,cihazlar,musteriler,setPost}=useTenant();
    

    const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
    };

    const handleDelete = async (rowId) => {
      await deleteGosterge(rowId);
      setPost("gosterge");
    };

    useEffect(()=>{
      setRows([]);
      gostergeler.map((gosterge)=>{
        let musteri={};
        let cihaz={};
        musteriler.map((m)=>{
          if(m.id===gosterge.musteri_id){
            musteri=m;
          }
        })
        cihazlar.map((c)=>{
          if(c.id===gosterge.cihaz_id){
            cihaz=c;
          }
        })
        const row=createData(gosterge.id,gosterge.updated_at,gosterge.isim,cihaz.isim,musteri.isim_soyisim);

        setRows((current)=>[...current,row]);
      })

    },[gostergeler]);

    useEffect(() => {
      if(props.parametre===undefined || props.parametre===""){
        setVeriler(rows);
      }
      else{
        const filtered = rows.filter((row) => {
          return row.gosterge === props.parametre;
        });
        setVeriler(filtered);
      }
      
    }, [props.parametre,rows]);



  return (
    

    <TableContainer component={Paper} sx={{ maxWidth: 1200, marginLeft:10, marginTop:"60px",backgroundColor:'#f2f2f2'}} elevation={0}>
      <Table sx={{ minWidth: 800 }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell align="left">Zaman</TableCell>
            
            <TableCell align="left">Gösterge İsmi</TableCell>
            <TableCell align="left">Müşteri ismi</TableCell>
            <TableCell align="left">Cihaz ismi</TableCell>

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
                {row.id}
              </TableCell>
              <TableCell align="left">{row.zaman}</TableCell>
              <TableCell align="left">{row.gosterge}</TableCell>
              <TableCell align="left">{row.kullanici}</TableCell>
              <TableCell align="left">{row.cihaz}</TableCell>
              <TableCell align='right' sx={{width:'20px'}}> <SideBard id={row.id}/> </TableCell>
              <TableCell align="right" sx={{width:'20px'}} elevation={0} >{<Link to={`${row.cihaz}` } ><DashboardIcon htmlColor='#24478f'/></Link>}</TableCell> 
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
