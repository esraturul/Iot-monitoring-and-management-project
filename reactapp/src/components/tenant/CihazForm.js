import React ,{useState}from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTenant } from '../../Context/TenantContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postCihaz } from '../../api';

const MyForm = (props) => {
  const [sonuc, setSonuc] = React.useState('');
  const [kullanici,setKullanici]=React.useState([]);
  const [isim,setIsim]=useState();
  const [tip,setTip]=useState();
  const [enlem,setEnlem]=useState();
  const [boylam,setBoylam]=useState();
  const [altSinir,setAltSinir]=useState();
  const [ustSinir,setUstSinir]=useState();

  const {musteriler,setPost}=useTenant();
  const handleChange = (event) => {
    setSonuc(event.target.value);
 
  };

  React.useEffect(()=>{
    setKullanici([]);
    musteriler.map((musteri)=>{
      setKullanici((current)=>[...current,musteri.isim_soyisim]);

    })
  
  },[]);
  
  const handleSubmit =async ()=>{
    const musteri_id=parseInt(sonuc,10);
    const data={
      "musteri_id":musteri_id,
      "isim":isim,
      "tip":tip,
      "enlem":enlem,
      "boylam":boylam,
      "alarm_alt_sinir":altSinir,
      "alarm_ust_sinir":ustSinir
    }
    await postCihaz(data);
    setPost("cihaz");
    props.close();

  }

  return (
    <form className='form'>
      <TextField
        label="Cihaz İsmi"
        variant="outlined"
        sx={{marginBottom: 2}}
        onChange={(e)=>setIsim(e.target.value)}
      />
      <TextField
        label="Cihaz Tipi"
        variant="outlined"
        sx={{marginBottom: 2}}
        onChange={(e)=>setTip(e.target.value)}
      />
      <div style={{marginBottom:8}}>
      <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">Kullanıcı</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc}
        label="Kullanıcı"
        onChange={handleChange}
      >
       {kullanici.map((val, index) => (
          <MenuItem key={index} value={index+1}>
            {val}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
      </div>

      <TextField
        label="Enlem"
        sx={{marginBottom: 2}}
        variant="outlined"
        onChange={(e)=>setEnlem(e.target.value)}
      />
      <TextField
        label="Boylam"
        sx={{marginBottom: 2}}
        variant="outlined"
        onChange={(e)=>setBoylam(e.target.value)}
      />
      <TextField
        label="Alarm alt sınır"
        sx={{marginBottom: 2}}
        variant="outlined"
        onChange={(e)=>setAltSinir(e.target.value)}
      />
      <TextField
        label="Alarm üst sınır"
        sx={{marginBottom: 2}}
        variant="outlined"
        onChange={(e)=>setUstSinir(e.target.value)}
      />

      <Button onClick={handleSubmit} variant="contained" sx={{backgroundColor: '#2196f3',color: '#fff','&:hover': { backgroundColor: '#1976d2', },}}>
         Ekle
      </Button>
    </form>
  );
};

export default MyForm;