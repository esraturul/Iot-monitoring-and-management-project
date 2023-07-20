import React, { useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Select from '../tenant/Select';
import CloseIcon from '@mui/icons-material/Close';
import Gosterge from '../../components/tenant/GostergeSec';
import Tab from '../../components/tenant/CihazTabs';
import { useTenant } from '../../Context/TenantContext';
import { updateMusteri } from '../../api';

let id=0;
let musteri={};
const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isim,setIsim] = useState();
  const [adres,setAdres]= useState();
 // const [musteri,setMusteri]=useState({});

  const {musteriler,setPost}=useTenant();
  

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    id=parseInt(props.id,10);
    musteriler.map((m)=>{
      if(m.id===id){
        musteri=m;
      }
    })
    setIsim(musteri.isim_soyisim);
    setAdres(musteri.sehir_ulke);

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form işlemleri burada yapılabilir
    const data={"isim_soyisim":isim,"sehir_ulke":adres};
    const id=parseInt(props.id,10);
    await updateMusteri(id,data);
    setPost("musteri");
    toggleDrawer();

  };


  return (
    <div>
      <Button onClick={toggleDrawer} >
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>{musteri.isim_soyisim}</div>
        <Button sx={{width:'50px',height:'50px',marginLeft:23,marginTop:-2}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Kullanıcı Detayları</div>
         <Button onClick={handleSubmit} variant="contained" color="primary" sx={{width:'100px',height:'30px',position:'absolute',top:140,right:10}}>Kaydet</Button>
        </div>

        <form style={{display:'flex',flexDirection: 'column',padding: 2,'& .MuiTextFieldRoot': {marginBottom: 2,},marginTop:40}} onSubmit={handleSubmit}>
        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Kullanıcı ismi:</div>
        <TextField  variant="standard" color='primary'  
             defaultValue={musteri.isim_soyisim} 
             sx={{width:'500px',marginLeft:'30px'}} 
             htmlcolor='#333'
             onChange={(e)=>setIsim(e.target.value)}
             />
        
        <div  style={{display:'relative',marginTop:30 ,marginBottom:20}} >
        <span style={{fontSize:18,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Şehir/Ülke:</span>
        <TextField  variant="standard" color='primary'  
         defaultValue={musteri.sehir_ulke} 
         sx={{width:'500px',marginLeft:'10px'}} 
         htmlcolor='#333'
         onChange={(e)=>setAdres(e.target.value)}
         />
        </div>

        <div  style={{display:'relative',marginTop:30 ,marginBottom:30}} >
        <span style={{fontSize:18,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>İletişim:</span>
        <TextField  variant="standard" color='primary'   defaultValue='0000 000 000 00' sx={{width:'500px',marginLeft:'10px'}} htmlcolor='#333'/>
        </div>

        </form>
        

      </Drawer>
    </div>
  );
};

export default App;


