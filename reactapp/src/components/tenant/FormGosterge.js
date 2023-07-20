import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTenant } from '../../Context/TenantContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postGosterge } from '../../api';


const MyForm = (props) => {

  const {musteriler,cihazlar,setPost}=useTenant();
  const [sonuc1,setSonuc]=useState(" ");
  const [sonuc2,setSonuc2]=useState(" ");
  const [aktifCihaz,setAktifCihaz]=useState([]);
  const [isim,setIsim]=useState();


  const handleChange =(e)=>{
    setSonuc(e.target.value);
    

  }
  const handleChanged =(e)=>{
    setSonuc2(e.target.value);
    

  }

  const handleSubmit =async ()=>{
    const musteri_id=parseInt(sonuc1,10);
    const cihaz_id=parseInt(sonuc2,10);
    const data={
      "isim":isim,
      "cihaz_id":cihaz_id,
      "musteri_id":musteri_id,
      "widget_no":3

    }
    await postGosterge(data);
    setPost("gosterge");
    props.close();
    


  }

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
    <form className='form'>
      <TextField
        label="Gösterge İsmi"
        variant="outlined"
        sx={{marginBottom: 2}}
        onChange={(e)=>setIsim(e.target.value)}
      />
      <div style={{marginBottom:8}}>
      <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">Kullanıcılar</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc1}
        label="kullanıcılar"
        onChange={handleChange}
      >
       {musteriler.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {val.isim_soyisim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
      </div>

      <div style={{marginBottom:8}}>
      <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">Cihazlar</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc2}
        label="Cihazlar"
        onChange={handleChanged}
      >
      
       {aktifCihaz.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {val.isim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
      </div>

      <Button onClick={handleSubmit} variant="contained" sx={{backgroundColor: '#2196f3',color: '#fff','&:hover': { backgroundColor: '#1976d2', },}}>
         Ekle
      </Button>
    </form>
  );
};

export default MyForm;