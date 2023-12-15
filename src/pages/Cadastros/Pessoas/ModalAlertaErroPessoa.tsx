import { Modal, Box, Typography, Button } from '@mui/material'
import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,
  };

  interface TiposModal {
    mensagem: string;
    abrir: boolean;
    icon: string;
    handleOpen: () => void;
    handleClose: () => void;
}

  

const ModalAlertaErro: React.FC<TiposModal> = ({ mensagem, abrir, handleOpen, handleClose , icon}) => {
    return (
      <>
      <Modal open={abrir} onClose={handleClose}> 
        <Box sx={style2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {icon === "success" ? <CheckBoxIcon sx={{ fontSize: '3rem', mb: 3, color: 'green', mr: 1 }} /> : <ErrorIcon sx={{ fontSize: '4rem', mb: 3, color: 'red', mr: 1 }} />}
          </Box>
          <Typography variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
            {mensagem}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={handleClose} sx={{ mr: '15px', bgcolor: '001119' }}>Close</Button>
          </Box>
        </Box>
      </Modal>
      </>
  )
}

export default ModalAlertaErro