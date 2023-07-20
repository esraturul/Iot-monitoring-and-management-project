import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useData } from '../../Context/context';


export default function OutlinedCard() {

  const {name,id}=useData();

  return (
    <Card sx={{ maxWidth: 300,display:'absolute', boxShadow:'none', textAlign:'left' }}>
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Cihaz
        </Typography>
        <Typography variant="h5" component="div" sx={{opacity:0.9, mb:1}}>
          {name}
        </Typography>
        <Typography component="div">
          <Typography component="span" variant='body2' color='#009933'>
            Cihaz Kimliği:
          </Typography>
        <Typography component="span" sx={{mb:1.5}} color="text.secondary">
          {id}
        </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}