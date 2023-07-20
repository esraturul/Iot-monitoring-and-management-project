import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useData } from '../Context/context';
import { updateAlarm,fetchDevice } from '../api';
import { useAuth } from '../Context/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 12,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [bigValue, setBigValue] = React.useState('');
  const [smallValue, setSmallValue] = React.useState('');
  const {setCihazlar,cihazlar}=useData();
  const {user}=useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(()=>{

  },[smallValue,bigValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data={'alarm_ust_sinir':bigValue,'alarm_alt_sinir':smallValue};
    updateAlarm(props.id,data).then((data)=>{
      fetchDevice(user.id).then(devices=>{
        setCihazlar(devices);
      });
    });
    setOpen(false);
  };
  
  
  const handleBigInputChange = (event) => {
    setBigValue(event.target.value);
  };
  const handleSmallInputChange = (event) => {
    setSmallValue(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{fontSize:13,fontWeight:600,color:"#0077b3"}}>Düzenle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:3}}>
            Alarm Yapılandır
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'6px'}}>
            <input 
              type="text" 
              placeholder="Deger Giriniz" 

              style={{borderRadius:5 , outline:'none' ,border:'1px solid #ccc'}}
              onChange={handleBigInputChange} 
            />
            <span style={{marginLeft:6}} >{'>'}</span>
            </div>
            <div style={{marginBottom:'10px'}}>
            <input 
              type="text" 
              placeholder="Deger Giriniz" 

              style={{borderRadius:5 , outline:'none',border:'1px solid #ccc'}}
              onChange={handleSmallInputChange} 
            />
            <span style={{marginLeft:6}} >{'<'}</span>
            </div>
            <Button style={{color:"#595959"}} type="submit">Alarm Oluştur</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}