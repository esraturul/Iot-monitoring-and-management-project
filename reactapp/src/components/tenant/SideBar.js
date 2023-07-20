import React, { useEffect, useState } from 'react';
import { Drawer,Button,TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import { useTenant } from '../../Context/TenantContext';
import { putGosterge } from '../../api';

const kullanici=['elifakbas','esraturul'];
const cihazlar=['SN-001','SN-002'];

let id=0;
const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {musteriler,gostergeler,cihazlar,setPost}=useTenant();
  const [gosterge,setGosterge]=useState("");
  const [sonuc1,setSonuc]=useState(" ");
  const [sonuc2,setSonuc2]=useState(" ");
  const [aktifCihaz,setAktifCihaz]=useState([]);
  const [isim,setIsim]=useState();


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    

    id=parseInt(props.id,10);
    gostergeler.map((gosterge)=>{
      if(gosterge.id===id){
        setGosterge(gosterge);
      }
    })

    
  };
  
  const handleChange =(e)=>{
    setSonuc(e.target.value);
    

  }
  const handleChanged =(e)=>{
    setSonuc2(e.target.value);
    

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const musteri_id=parseInt(sonuc1,10);
    const cihaz_id=parseInt(sonuc2,10);
    const data={
      "isim":isim,
      "musteri_id":musteri_id,
      "cihaz_id":cihaz_id
    }
    await putGosterge(data,gosterge.id);
    setPost("gosterge");
    toggleDrawer();
  };

  useEffect(()=>{
    setIsim(gosterge.isim);
    setSonuc(gosterge.musteri_id);
    setSonuc2(gosterge.cihaz_id);

  },[gosterge])

  useEffect(()=>{
    const id=parseInt(sonuc1,10);
    setAktifCihaz([]);
    cihazlar.map((cihaz)=>{

      if(cihaz.musteri_id===id){
        const row={"id":cihaz.id,"isim":cihaz.isim};
        setAktifCihaz((current)=>[...current,row]);

      }

    })

  },[sonuc1]);

  return (
    <div style={{marginLeft:"50px"}}>
      <Button onClick={toggleDrawer} >
      <EditIcon htmlColor='#24478f'/>
      </Button>
      <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer}  >
        <div style={{display:'flex',background:'#c2d1f0',paddingBottom:40,borderRadius:5}}>
        <div style={{fontSize:22,marginTop:105 ,marginRight:240,marginLeft:30,color:'#4775d1',fontWeight:600,fontFamily:'Arial, Helvetica, sans-serif'}}>GÖSTERGE ÖZELLEŞTİR</div>
        <Button sx={{width:'50px',height:'50px'}} onClick={toggleDrawer}>
         <div style={{marginTop:210,marginRight:30}}><CloseIcon/> </div> 
         </Button> 
         <div style={{fontSize:16,fontFamily:'Arial, Helvetica, sans-serif',color:'#e6e6e6',position:'absolute',top:135,left:30}}>Gösterge Detayları</div>
        </div>
        <form style={{display:'flex',flexDirection: 'column',padding: 2,'& MuiTextFieldRoot': {marginBottom: 2,},marginTop:40}} onSubmit={handleSubmit}>
        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Gösterge ismi:</div>
        <TextField  variant="standard" color='primary'  
         defaultValue={gosterge.isim}
          sx={{width:'500px',marginLeft:'30px'}}
           htmlcolor='#333'
           onChange={(e)=>setIsim(e.target.value)}
           />
        
        <div  style={{display:'relative',marginTop:30 ,marginBottom:20}} >
        <span style={{fontSize:18,marginRight:10,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Kullanıcı:</span>
        <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">Kullanıcılar</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc1}
        label="kullanıcılar"
        onChange={handleChange}
        required
      >
       {musteriler.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {val.isim_soyisim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
        </div>

        <div  style={{display:'relative',marginTop:30 ,marginBottom:30}} >
        <span style={{fontSize:18,marginRight:10,color:'#666',marginLeft:30,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Cihaz:</span>
        <FormControl sx={{ m: 1, minWidth: 230,}} size="small" required>
      <InputLabel id="demo-select-small-label">Cihazlar</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc2}
        label="Cihazlar"
        onChange={handleChanged}
        required
      >
      
       {aktifCihaz.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {val.isim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
        </div>
          <Button onClick={handleSubmit} type="submit" variant="contained" sx={{width:'300px',marginLeft:23,fontFamily:'Arial, Helvetica, sans-serif'}} color="primary">
            Kaydet
          </Button>
        </form>
      </Drawer>
    </div>
  );
};

export default App;


