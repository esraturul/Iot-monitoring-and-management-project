import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useTenant } from '../../../Context/TenantContext';


export default function BasicCard(props) {

  const {name,tip }= useTenant();


  return (
    <Card sx={{ minWidth: 300,minHeight:200 ,textAlign:'left',marginLeft:6,backgroundColor:'#f1f1f1', display:'absolute',boxShadow:'none'}} >
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Cihaz
        </Typography>
        <Typography variant="h5" component="div" sx={{opacity:0.9,mb:1}}>
          {name}
        </Typography>
        <Typography component="div" >
          <Typography component="span" variant='body2' color='#009933'>
            Sensor Tipi:
          </Typography>
          <Typography component="span" sx={{ mb: 1.5 }} color="text.secondary">
            {tip}
          </Typography>
        </Typography>  
      </CardContent>
    </Card>
  );
  }
