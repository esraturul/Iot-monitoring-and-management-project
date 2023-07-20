import React, { useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useAdmin } from '../../Context/AdminContext';
import { putTenant } from '../../api';

let tenant={};
const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {tenants,setPost}=useAdmin();
  const [maxMusteri,setMaxMusteri]=useState();
  const [maxCihaz,setMaxCihaz]=useState();

  

  const toggleDrawer = () => {
    setIsOpen(!isOpen);

    tenants.map((t)=>{
        if(t.id===props.id){
            tenant=t;
            setMaxMusteri(t.max_musteri_sayisi);
            setMaxCihaz(t.max_cihaz_sayisi);
        }
    })
    console.log(tenant);

    

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cihaz=parseInt(maxCihaz);
    const musteri=parseInt(maxMusteri);
    const data={
        "max_cihaz_sayisi":cihaz,
        "max_musteri_sayisi":musteri
    }
    putTenant(props.id,data);
    setPost("tenant");
    toggleDrawer();

   

  };


  return (
    <div>
      <Button onClick={toggleDrawer} >
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>{tenant.email}</div>
        <Button sx={{width:'50px',height:'50px',marginLeft:23,marginTop:-2}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Tenant Detayları</div>
         <Button onClick={handleSubmit} variant="contained" color="primary" sx={{width:'100px',height:'30px',position:'absolute',top:140,right:10}}>Kaydet</Button>
        </div>

        <form style={{display:'flex',flexDirection: 'column',padding: 2,'& .MuiTextFieldRoot': {marginBottom: 2,},marginTop:40}} onSubmit={handleSubmit}>
        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:30,marginBottom:12,fontFamily: "Times New Roman, Times, serif"}}>Maksimum Müşteri Sayısı:</div>
        <TextField  variant="standard" color='primary'  
             defaultValue={tenant.max_musteri_sayisi} 
             sx={{width:'500px',marginLeft:'30px'}} 
             htmlcolor='#333'
             onChange={(e)=>setMaxMusteri(e.target.value)}
             />
        
        <div  style={{display:'relative',marginTop:30 ,marginBottom:20}} >
        <span style={{fontSize:18,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Maksimum Cihaz Sayısı:</span>
        <TextField  variant="standard" color='primary'  
         defaultValue={tenant.max_cihaz_sayisi} 
         sx={{width:'500px',marginLeft:'10px'}} 
         htmlcolor='#333'
         onChange={(e)=>setMaxCihaz(e.target.value)}
         />
        </div>


        </form>
        

      </Drawer>
    </div>
  );
};

export default App;
