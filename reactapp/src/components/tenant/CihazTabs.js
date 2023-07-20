import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTenant } from '../../Context/TenantContext';
import { putCihaz } from '../../api';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form işlemleri burada yapılabilir
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const {musteriler,setPost}=useTenant();
  const [kullanici,setKullanici]=React.useState([]);
  const [sonuc,setSonuc]=React.useState(props.cihaz.musteri_id);

  const [isim,setIsim]=React.useState(props.cihaz.isim);
  const [tip,setTip]=React.useState(props.cihaz.tip);
  const [enlem,setEnlem]=React.useState(props.cihaz.enlem);
  const [boylam,setBoylam]=React.useState(props.cihaz.boylam);
  const [altSinir,setAltSinir]=React.useState(props.cihaz.alarm_alt_sinir);
  const [ustSinir,setUstSinir]=React.useState(props.cihaz.alarm_ust_sinir);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChanges = (event) => {
    setSonuc(event.target.value);
 
  };

const handleSubmit= async ()=>{
  let id=parseInt(sonuc,10);
  const data={
    "isim":isim,
    "tip":tip,
    "enlem":enlem,
    "boylam":boylam,
    "alarm_alt_sinir":altSinir,
    "alarm_ust_sinir":ustSinir,
    "musteri_id":id
  }
  await putCihaz(data,props.cihaz.id);
  setPost("cihaz");
  props.close();
  
  
}


  return (
    <Box sx={{ width: '100%' }} component="div">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Detaylar" {...a11yProps(0)} />
          <Tab label="Alarm Kuralları" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Button onClick={handleSubmit}  variant="contained" color="primary" sx={{width:'100px',height:'30px',position:'absolute',top:140,right:10}}>Kaydet</Button>
   
      <TabPanel value={value} index={0}>
        <div>
        <form style={{display:'flex',flexDirection: 'column',padding: 2,'& .MuiTextFieldRoot': {marginBottom: 2,},marginTop:20}}>
          <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Cihaz ismi:</div>
        <TextField  variant="standard" color='primary'  
         defaultValue={props.cihaz.isim} 
         sx={{width:'500px',marginLeft:'10px'}} 
         htmlcolor='#333'
         onChange={(e)=>setIsim(e.target.value)}
         />
        
        <div  style={{display:'relative',marginTop:30 ,marginBottom:20}} >
        <span style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Kullanıcı:</span>
        <FormControl sx={{ m: 1, minWidth: 230,}} size="small">
      <InputLabel id="demo-select-small-label">Kullanıcı</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sonuc}
        label="Kullanıcı"
        onChange={handleChanges}
      >
       {musteriler.map((val, index) => (
          <MenuItem key={index} value={val.id}>
            {val.isim_soyisim}
          </MenuItem>
        ))}
        
       
      </Select>
    </FormControl>
        </div>

        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Cihaz Tipi:</div>
        <TextField  variant="standard" color='primary'  
         defaultValue={props.cihaz.tip} 
         sx={{width:'500px',marginLeft:'10px'}}
          htmlcolor='#333'
          onChange={(e)=>setTip(e.target.value)}
          />
        <div style={{display:'flex',marginTop:40}}>
        <span style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Enlem:</span>
        <TextField  variant="standard" color='primary'  
         defaultValue={props.cihaz.enlem}
          sx={{width:'200px',marginRight:'10px'}} 
          htmlcolor='#333'
          onChange={(e)=>setEnlem(e.target.value)}
          />

        <span style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Boylam:</span>
        <TextField  variant="standard" color='primary'  
         defaultValue={props.cihaz.boylam} 
         sx={{width:'200px'}} 
         htmlcolor='#333'
         onChange={(e)=>setBoylam(e.target.value)}
         />
        </div>
        </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
        <form style={{display:'flex',flexDirection: 'column',padding: 2,'& .MuiTextFieldRoot': {marginBottom: 2,},marginTop:20}}>
        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Alarm Alt Sınır:</div>
        <TextField  variant="standard" color='primary'  
         defaultValue={props.cihaz.alarm_alt_sinir} 
         sx={{width:'500px',marginLeft:'10px',marginBottom:5}}
          htmlcolor='#333'
          onChange={(e)=>setAltSinir(e.target.value)}
          />
        
        <div style={{fontSize:18,marginRight:10,color:'#666',marginLeft:10,marginBottom:8,fontFamily: "Times New Roman, Times, serif"}}>Alarm Üst Sınır:</div>
        <TextField  variant="standard" color='primary'   
        defaultValue={props.cihaz.alarm_ust_sinir} 
        sx={{width:'500px',marginLeft:'10px'}} 
        htmlcolor='#333'
        onChange={(e)=>setUstSinir(e.target.value)}
        />
        

        </form>
        </div>
      </TabPanel>
    </Box>
  );
}
