import React, { useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '../tenant/Select';
import CloseIcon from '@mui/icons-material/Close';
import Gosterge from '../../components/tenant/GostergeSec';
import { useTenant } from '../../Context/TenantContext';
import { putGosterge } from '../../api';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {gostergeId,selectedChart}=useTenant();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const chart=parseInt(selectedChart)
    const data={
      "widget_no":chart
    }
    putGosterge(data,gostergeId);
    toggleDrawer();
  };


  return (
    <div>
      <Button onClick={toggleDrawer}  sx={{border:'1.5px solid #5c85d6'}}>
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>GÖSTERGE SEÇ</div>
        <Button sx={{width:'50px',height:'50px'}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Ölçü Grafikleri</div>
        </div>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{width:'200px',marginLeft:40,marginTop:3}}>Kaydet</Button>
        <Gosterge />
      </Drawer>
    </div>
  );
};

export default App;


