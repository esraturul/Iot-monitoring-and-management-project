import React, { useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '../tenant/Select';
import CloseIcon from '@mui/icons-material/Close';
import Gosterge from '../../components/tenant/GostergeSec';
import Tab from '../../components/tenant/CihazTabs';
import { useTenant } from '../../Context/TenantContext';
import { updateMusteri } from '../../api';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useAuth } from '../../Context/AuthContext';

let id=0;
let tenant={"1":"","2":""};
const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {setWidget}=useAuth();
  const [state, setState] = React.useState({
    tenant1: true,
    tenant2: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { tenant1, tenant2 } = state;
  const error = [tenant1, tenant2].filter((v) => v).length !== 2;

  console.log(state);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(state.tenant1 && state.tenant2){
        const temp=tenant[1].split(",");
        const temp2=tenant[2].split(",");
        let sayac=0;
        for(let i=0;i<temp.length;i++){
            if(parseInt(temp[i])===props.id){
                sayac++;
            }
        }
        if(sayac===0){
            tenant[1] +=""+props.id+",";
        }
        let sayac2=0
        for(let i=0;i<temp2.length;i++){
            if(parseInt(temp2[i])===props.id){
                sayac2++;
            }
        }
        if(sayac2===0){
            tenant[2] +=""+props.id+",";
        }
    }
    else if(state.tenant1){
        const temp2=tenant[1].split(",");
        let sayac=0;
        for(let i=0;i<temp2.length;i++){
            if(parseInt(temp2[i])===props.id){
                sayac++;

            }
        }
        if(sayac===0){
            tenant[1]+=""+props.id+","
        }
        
        const temp=tenant[2].split(",");
        console.log(temp);
       let newData="";
        for(let i=0;i<temp.length;i++){
            if(temp[i]===""){
                continue;
            }
            if(parseInt(temp[i])!==props.id){
                newData+=""+parseInt(temp[i])+",";
                console.log(newData);
            }
        }
        tenant[2]=newData;
        
    }
    else if(state.tenant2){
        const temp2=tenant[2].split(",");
        let sayac=0;
        for(let i=0;i<temp2.length;i++){
            if(parseInt(temp2[i])===props.id){
                sayac++;

            }
        }
        if(sayac===0){
            tenant[2]+=""+props.id+","
        }
        
        const temp=tenant[1].split(",");
       let newData="";
        for(let i=0;i<temp.length;i++){
            if(temp[i]===""){
                continue;
            }
            if(parseInt(temp[i])!==props.id){
                newData+=""+parseInt(temp[i])+",";
                console.log(newData);
            }
        }
        tenant[1]=newData;
        
        
    }
    setWidget(tenant);
    toggleDrawer();


  };

  return (
    <div>
      <Button onClick={toggleDrawer} >
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>{props.title}</div>
        <Button sx={{width:'50px',height:'50px',marginLeft:23,marginTop:-2}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Grafik Detayları</div>
         <Button onClick={handleSubmit} variant="contained" color="primary" sx={{width:'100px',height:'30px',position:'absolute',top:140,right:10}}>Kaydet</Button>
        </div>
        <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 ,marginTop:5}} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{marginBottom:3 }}>Kullanabilecek tenantları seç</FormLabel>
        <FormGroup sx={{marginLeft:3}}>
          <FormControlLabel
            control={
              <Checkbox checked={tenant1} onChange={handleChange} name="tenant1" />
            }
            label="Tenant 1"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tenant2} onChange={handleChange} name="tenant2" />
            }
            label="Tenant 2"
          />
        </FormGroup>
      </FormControl>
      </Box>
        
        

      </Drawer>
    </div>
  );
};

export default App;