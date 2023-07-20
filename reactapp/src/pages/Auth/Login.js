import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';
import { replace, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import GoogleIcon from '@mui/icons-material/Google';
//import LinkedInIcon from '@mui/icons-material/LinkedIn';
//import GitHubIcon from '@mui/icons-material/GitHub';
//import { Link } from '@mui/material';
import { fetchLogin } from '../../api';
import {useNavigate,Navigate} from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';


export default function Login(){
  const {setUser,user}=useAuth();
  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(()=>{
    if(user){
      navigate("/" ,{
        replace:true,
      });
    }


  },[])
const validationSchema = yup.object({
  email: yup
    .string('Email giriniz')
    .email('Geçerli e-mail giriniz.')
    .required('Email gerekli'),
  password: yup
    .string('Şifrenizi giriniz')
    .min(6, 'Şifre en az 6 karakter içermeli')
    .required('Şifre gerekli'),
});

const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: async (values) =>  {
    await fetchLogin(values.email,values.password);
    setUser(JSON.parse(localStorage.getItem("user-info")));
    
    if(localStorage.getItem("user-info")!=="\"error\""){
      console.log(".")
      navigate("/",{
        replace:true
      });

    }

    

  }

});


return (
  <div>
    <div>
      
    <form onSubmit={formik.handleSubmit}
     style={{position:'relative',left:'400px',top:'120px',width:'600px',height:'500px',padding:'40px',border:"1px solid #ccc",background:"#338099",borderRadius:15}}>
      <div className='login'>IOTMON</div>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="E-mail"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        style={{marginTop:'20px',marginBottom:'25px'}}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Şifre"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        style={{marginBottom:'35px'}}
      />
      <Button variant="contained" width="50px" type="submit" style={{position:"relative",marginLeft:"250px",marginBottom:'30px',background:"#0088cc"}}>
        Giriş Yap
      </Button>

     

    </form>
    </div>
  </div>
);
}