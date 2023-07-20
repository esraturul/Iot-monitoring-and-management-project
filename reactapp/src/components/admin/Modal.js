import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Form from './Forms';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{display:'inline-block'}}>
      <Button onClick={handleOpen} sx={{border:'none',outline:'none',cursor:'pointer',backgroundColor:'#fff',position:'relative',borderRadius:3}}>
      <div style={{ position: 'relative',width:'30px',height:'30px'}}>
           <AddIcon style={{ minWidth: '30px', color: '#4775d1' }} />
            </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <div style={{fontSize:20,color:'#4775d1',marginTop:3,marginBottom:25}}>
            {props.baslik} EKLE
        </div>
         <Form close={handleClose}/>
       </Box>
      </Modal>
    </div>
  );
}