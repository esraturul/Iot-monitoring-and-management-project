import React,{useState} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { fetchMusteriler, postMusteri, postTenant } from '../../api';
import { useAuth } from '../../Context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTenant } from '../../Context/TenantContext';
import { useAdmin } from '../../Context/AdminContext';


function FormMusteri(props) {
    const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [maxCihaz, setMaxCihaz] = useState();
  const [maxMuster, setMaxMusteri] = useState();
  const {user}=useAuth();

  const {setPost}=useAdmin();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const pass=parseInt(password);
    const cihaz=parseInt(maxCihaz);
    const musteri=parseInt(maxMuster);
    const data={
        "admin_id":user.id,
        "email":email,
        "password":pass,
        "max_musteri_sayisi":musteri,
        "max_cihaz_sayisi":cihaz
    }
    await postTenant(data);
    setPost("tenant");
    props.close();

   } 
    
  return (
    <div>
        <form>
        <TextField
            label="Tenant E-mail"
            name='e-mail'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setEmail(e.target.value)}
        />
 
        
        <FormControl sx={{ width: '25ch',marginBottom:3 }} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <TextField
            label="Maksimum Müşteri Sayısı"
            name='max-musteri'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setMaxMusteri(e.target.value)}
        />
         <TextField
            label="Maksimum Cihaz Sayısı"
            name='max-cihaz'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setMaxCihaz(e.target.value)}
        />
     
        
        <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor: '#2196f3',color: '#fff','&:hover': { backgroundColor: '#1976d2', }, display:'block',marginTop:5}}>
         Ekle
      </Button>
        </form>
      
    </div>
  )
}

export default FormMusteri