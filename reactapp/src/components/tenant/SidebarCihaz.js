import React, { useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '../tenant/Select';
import CloseIcon from '@mui/icons-material/Close';
import Gosterge from '../../components/tenant/GostergeSec';
import Tab from '../../components/tenant/CihazTabs';
import { useTenant } from '../../Context/TenantContext';

let id=0;
const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {cihazlar}=useTenant();
  const [cihaz,setCihaz]=useState({});

  const toggleDrawer = () => {
    id=parseInt(props.id,10);
    setIsOpen(!isOpen);
    cihazlar.map((c)=>{
      if(c.id===id){
        setCihaz(c);
      }
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form işlemleri burada yapılabilir
  };


  return (
    <div>
      <Button onClick={toggleDrawer} >
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>
        {cihaz.isim}
        </div>
        <Button sx={{width:'50px',height:'50px',marginLeft:23,marginTop:-2}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Cihaz Detayları</div>
        </div>
        <Tab cihaz={cihaz} close={toggleDrawer}/>
        

      </Drawer>
    </div>
  );
};

export default App;


