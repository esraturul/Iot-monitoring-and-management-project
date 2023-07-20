import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import CircularBar from '../dash/circularProgressBar';
import { useAuth } from '../../Context/AuthContext';
import { useTenant } from '../../Context/TenantContext';


const card = (props,user,musteriSayisi,cihazSayisi)=>(
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 20 , marginTop:3 ,marginLeft:5,marginRight:15}} align='left'color="text.secondary" gutterBottom>
        {props.icerik} Sayısı
      </Typography>
      <Box component="div"  sx={{display:'flex', marginTop:5,marginLeft:5,marginBottom:3}}>
     {/*<CircularBar value={props.icerik==="Müşteri" ? musteriSayisi*(100/user.max_musteri_sayisi) : cihazSayisi*(100/user.max_cihaz_sayisi)}/>*/}
       <Box component="div" sx={{marginLeft:7, marginTop:3}}>
      <Typography sx={{ mb: 1.5}} color="text.secondary" variant='body2'>
      {props.icerik}  Sınırı: {props.icerik==="Müşteri" ? user.max_musteri_sayisi : user.max_cihaz_sayisi} 
      </Typography>
      <Typography sx={{ mb: 3 }} color="text.secondary" variant='body2'>
      {props.icerik}  Sayısı: {props.icerik==="Müşteri" ? musteriSayisi : cihazSayisi}
      </Typography> 
      </Box>
    </Box>
    </CardContent>
      </React.Fragment>
);

export default function OutlinedCard(props) {
  const {user}=useAuth();
  const {musteriSayisi,cihazSayisi}=useTenant();
  return (
    <Box sx={{ minWidth: 400,marginRight:10}} >
      <Card variant="outlined" sx={{backgroundColor:'#f2f2f2',borderRadius:7, boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)'}}  > 
      {card(props,user,musteriSayisi,cihazSayisi)} </Card>
    </Box>
  );
}
