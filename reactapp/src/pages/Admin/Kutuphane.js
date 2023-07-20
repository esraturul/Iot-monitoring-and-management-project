import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import BarChart from '../../components/admin/charts/BarChart';
import PieChart from '../../components/admin/charts/PieChart';
import Barometer from '../../components/admin/charts/Barometer';
import CizgiGrafik from '../../components/admin/charts/CizgiGrafik';
import Dial from "../../components/admin/charts/Dial";
import Temp from '../../components/admin/charts/Temp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//import ProgressBar from '../../components/dash/circularProgressBar';
import Sidebar from '../../components/admin/SidebarKutuphane'
import { useAuth } from '../../Context/AuthContext';


export default function About() {
  const {widget}=useAuth();
  console.log(widget);
  return (
    <>
    <div className='home'>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={2} direction="row">
        <Card sx={{ minWidth: 49+ "%", height:300 }} >
      
      <CardContent>
        <div className='icon'>
        <Sidebar id={1} title={"Hız Göstergesi"}/>
        </div>
        
        
        <Dial value={80} title="sıcaklık"/>
        <Typography gutterBottom variant="h5" component="div">
          
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ minWidth: 49+ "%", height:300 }} >
      <CardContent>
      <div className='icon'>
      <Sidebar id={2} title={"Termometre"}/>
        </div>
        <Temp/>
        <Typography gutterBottom variant="h5" component="div">
         
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 49+ "%", height:300 }} >
      <CardContent>
      
      <div className='icon'>
      <Sidebar id={3} title={"Barometre"}/>
        </div>
      <Barometer/>
        <Typography gutterBottom variant="h5" component="div">
         
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      
      </CardContent>
    </Card>
    </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} >
         <Card sx={{ maxWidth: 345 }}>
         </Card>
          </Stack>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={2} direction="row">
        <Card sx={{ minWidth: 49+ "%", height:300 }} >
      <CardContent>
      
      <div style={{display: "flex",position: "relative",right: 0,top: 3}}>
      <Sidebar id={4} title={"Bar Grafiği"}/>
        </div>
        <BarChart/>
        <Typography gutterBottom variant="h5" component="div">
          
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ minWidth: 49+ "%", height:300 }} >
      <CardContent>
      
      <div  className='icon2'>
      <Sidebar id={5} title={"Progress Bar"}/>
        </div>
        {/*<ProgressBar value={78}/>*/}
        <Typography gutterBottom variant="h5" component="div">
         
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 49+ "%", height:300 }} >
      <CardContent>
      <div style={{display: "flex",position: "relative",right: 0,top: 3}}>
      <Sidebar id={6} title={"Çizgi Grafiği"}/>
        </div>
      <CizgiGrafik/>
        <Typography gutterBottom variant="h5" component="div">
         
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
         
        </Typography>
      
      </CardContent>
    </Card>
    </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} >
         <Card sx={{ maxWidth: 345 }}>
         </Card>
          </Stack>
        </Grid>
      </Grid>
      <Box height={20}/>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
       
      </Grid>
      
      </Box>

    </div>
    
    </>
    
  );
}