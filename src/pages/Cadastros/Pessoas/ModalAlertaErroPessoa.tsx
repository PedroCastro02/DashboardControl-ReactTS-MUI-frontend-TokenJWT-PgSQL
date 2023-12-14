import { Modal, Box, Typography, Button } from '@mui/material'
import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';

const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  interface TiposModal {
    mensagem: string;
    abrir: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

  

const ModalAlertaErro: React.FC<TiposModal> = ({ mensagem, abrir, handleOpen, handleClose }) => {
    return (
      <>
      <Modal open={abrir} onClose={handleClose}> 
        <Box sx={style2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ErrorIcon sx={{ fontSize: '4rem', mb: 3, color: 'red', mr: 1 }} />
          </Box>
          <Typography variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
            {mensagem}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={handleClose} sx={{ mr: '15px', bgcolor: 'red' }}>Close</Button>
          </Box>
        </Box>
      </Modal>
      </>
  )
}

export default ModalAlertaErro