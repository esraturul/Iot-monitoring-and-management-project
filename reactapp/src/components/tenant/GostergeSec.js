import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, Grid, Button } from '@mui/material';
import Barometer from '../tenant/dash/Barometer';
import Dial from '../dash/dial';
import Temp from '../dash/temp';
import { useData } from '../../Context/context';
import { useTenant } from '../../Context/TenantContext';
import { useAuth } from '../../Context/AuthContext';

const MyComponent = (props) => {
    const {setSelectedChart}=useTenant();
    const [value,setValue]=useState(null);



  const handleChartChange = (event) => {
    setValue(event.target.value);
    setSelectedChart(parseInt(event.target.value));
  };
  

  return (
    <>

            <Grid container spacing={2} sx={{marginBottom:5,marginTop:4,marginLeft:2}}>
            <Grid item xs={2} sm={3} md={4}>
              <RadioGroup value={value} onChange={handleChartChange}  name="chart">
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Hız Göstergesi"
                />
              </RadioGroup>
            </Grid>
              <Grid item xs={2} sm={4} md={4}>
             
                    <Dial value={0} title={"sıcaklık"}/>
              </Grid>
          </Grid>

   
    <Grid container spacing={2} sx={{marginBottom:5,marginTop:4,marginLeft:2}} >
    <Grid item xs={2} sm={3} md={4}>
      <RadioGroup value={value} onChange={handleChartChange} name="chart">
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Sıcaklık termometresi"
        />
      </RadioGroup>
    </Grid>
    <Grid item xs={2} sm={4} md={4}>

            <Temp/>
 
    </Grid>
  </Grid>

  <Grid container spacing={2} sx={{marginBottom:5,marginTop:4,marginLeft:2}} >
    <Grid item xs={2} sm={3} md={4}>
      <RadioGroup value={value} onChange={handleChartChange} name="chart">
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Sıcaklık Barometresi"
        />
      </RadioGroup>
    </Grid>
    <Grid item xs={2} sm={4} md={4}>

            <Barometer value={0} title="Sıcaklık"/>

    </Grid>
  </Grid>
  </>
  
    
  );
};

export default MyComponent;
