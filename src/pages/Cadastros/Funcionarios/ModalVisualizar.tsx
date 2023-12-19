import { Modal, Box, Typography, Button, Divider } from '@mui/material'
import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,
  };

  interface TiposVisu {
    isOpen: () => boolean;
    setOpen: (isOpen: boolean) => void;
    // employeeId: number;
    // EmployeeNome: string;
    // dtHiring: any;
    // position: string;
}


export const ModalVisualizar: React.FC<TiposVisu> = ({  isOpen, setOpen, }: TiposVisu) => {
    if(isOpen) {
  return (
      <>
      <Modal open={isOpen()} onClose={() => setOpen(false)} > 
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>     
          Vizualização do funcionário
          </Box>
          <Divider />
            <Box sx={{ border: '2px solid yellow', display: 'flex', justifyContent: 'space-between',}}>     
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column',}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Nome:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Cargo/Função:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Data de Contratação:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
            </Box>
            <Box sx={{ border: '2px solid yellow', display: 'flex', justifyContent: 'space-between' }}>  
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Real:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Fiscal:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
              <Box sx={{ border: '2px solid red', display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Carga Horaria:</Typography>
                <Typography component='h5'>{}</Typography>
              </Box>
            </Box>
          <Divider />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={() => setOpen(false)} sx={{ mr: '15px', bgcolor: '001119' }}>Close</Button>
          </Box>
        </Box>
      </Modal>
      </>
  )
    }else {
      return <></>;
    }
}

export default ModalVisualizar