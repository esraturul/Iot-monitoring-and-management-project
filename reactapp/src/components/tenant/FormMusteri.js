import React,{useState} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { fetchMusteriler, postMusteri } from '../../api';
import { useAuth } from '../../Context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTenant } from '../../Context/TenantContext';


function FormMusteri(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isim, setIsim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ulkeSehir, setUlkeSehir] = useState('');
  const {user}=useAuth();
  const {setPost}=useTenant();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const id=parseInt(user.id,10);
    const response= await postMusteri(id,email,password,isim,ulkeSehir);
   if(response.id){
    setPost("musteri");
    }
    props.close();

   } 
    
  return (
    <div>
        <form>
        <TextField
            label="Müşteri İsmi"
            name='isim'
            variant="outlined"
            sx={{marginBottom: 2}}
            onChange={(e) => setIsim(e.target.value)}
        />
            <TextField
            required
            label="Müşteri email"
            name='email'
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
            label="Ülke/Şehir"
            variant="outlined"
            name='ulke_sehir'
            onChange={(e) => setUlkeSehir(e.target.value)}
            sx={{marginBottom: 2}}
        />
        
        <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor: '#2196f3',color: '#fff','&:hover': { backgroundColor: '#1976d2', }, display:'block',marginTop:5}}>
         Ekle
      </Button>
        </form>
      
    </div>
  )
}

export default FormMusteri
