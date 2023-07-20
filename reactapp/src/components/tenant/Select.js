import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTenant } from '../../Context/TenantContext';

export default function SelectSmall(props) {
  const [sonuc, setSonuc] = React.useState('');
  const [kullanici,setKullanici]=React.useState([]);
  const [cihaz,setCihaz]=React.useState([]);
  const {musteriler,cihazlar}=useTenant();
  let value = [];
  const handleChange = (event) => {
    setSonuc(event.target.value);
 
  };

  React.useEffect(()=>{
    setKullanici([]);
    musteriler.map((musteri)=>{
      setKullanici((current)=>[...current,musteri.isim_soyisim]);

    })
  
  },[]);

  React.useEffect( ()=>{
    if(props.value==="kullanici"){
      setCihaz([]);
      const id=parseInt(sonuc,10);
      cihazlar.map((c)=>{
        if(c.musteri_id===id){
          setCihaz((current)=>[...current,c.id,c.isim]);
        }
      })
    }
  },[sonuc]);

  return (
    
    <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">{props.value}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc}
        label={props.value}
        onChange={handleChange}
      >
       {props.value==="kullanici"  ? value=musteriler :  value=cihaz }
       {value.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {props.value==="kullanici" ? val.isim_soyisim : val.isim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
  );
}