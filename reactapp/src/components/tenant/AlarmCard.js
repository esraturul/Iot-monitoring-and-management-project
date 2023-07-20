import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTenant } from '../../Context/TenantContext';




const card = (alarmSayisi)=>(
  <React.Fragment>
    <CardContent>
        <Box component="div" sx={{display:'flex'}}>
      <Typography sx={{ fontSize: 20 , marginTop:3 ,marginLeft:5,marginRight:15}} align='left' color="text.secondary" gutterBottom>
        Alarm Sayısı
      </Typography>
      <CrisisAlertIcon sx={{color:"red",fontSize:50,marginTop:2}} />
      </Box>
      <Box component="div" sx={{display:'flex'}}>
      <Typography sx={{fontSize:55,fontWeight:600,color:'#595959',marginTop:1,marginLeft:5}}>
        {alarmSayisi}
      </Typography>
      <ArrowDownwardIcon sx={{color:'green',marginTop:6,marginLeft:2}}/>
      <Typography sx={{marginTop:6,marginLeft:1,opacity:0.6}}>
        20% Önceki güne kıyasla
      </Typography>
      </Box>
      <Typography sx={{ mb: 2,mt:3 ,ml:4}} align='left' color="text.secondary">
        Müşterilerin toplam alarm sayısı
      </Typography>
     
    </CardContent>
  </React.Fragment>

);
  


export default function OutlinedCard() {
  const {alarmSayisi}=useTenant();
  return (
    <Box sx={{ minWidth: 400 }}>
      <Card variant="outlined"  sx={{backgroundColor:'#f2f2f2',borderRadius:7, boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)'}}>{card(alarmSayisi)}</Card>
    </Box>
  );
}