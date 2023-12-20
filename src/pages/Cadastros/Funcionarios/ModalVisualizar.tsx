import { Modal, Box, Typography, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { Key } from '@mui/icons-material';
import { Data, TiposVisu } from './Types/Data';

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

 

export const ModalVisualizar: React.FC<TiposVisu> = ({  isOpen, setOpen, id }: TiposVisu) => {
  // const key = id;
  const [employees, setEmployees] = useState<{ [key: number]: Data } | null>(null);

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3333/employees/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('API Response:', response.data);
  
        // Atualizar o estado usando o id como chave
        setEmployees((prevEmployees) => ({
          ...(prevEmployees || {}), // Certificar-se de que prevEmployees é tratado como um objeto
          [id]: response.data,
        }));
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    fetchData(id);
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

    if(isOpen) {
  return (
      <>
      <Modal open={isOpen()} onClose={() => setOpen(false)} sx={{
        '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop': {
          position: 'relative',
        }
      }}> 
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>     
          Vizualização do funcionário
          </Box>
          <Divider />
            <Box sx={{  display: 'flex', justifyContent: 'space-between', mt: 3}}>     
              <Box sx={{ display: 'flex', flexDirection: 'column',}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Nome:</Typography>
                <Typography component='h5'>{employees?.[id]?.person.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Cargo/Função:</Typography>
                <Typography component='h5'>{employees?.[id]?.position}</Typography>
              </Box>
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Data de Contratação:</Typography>
                <Typography component='h5'>{employees?.[id]?.dt_hiring}</Typography>
              </Box>
            </Box>
            <Box sx={{  display: 'flex', justifyContent: 'space-between', mt: 3 }}>  
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Real:</Typography>
                <Typography component='h5'>{employees?.[id]?.real_wage}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Fiscal:</Typography>
                <Typography component='h5'>{employees?.[id]?.fiscal_wage}</Typography>
              </Box>
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Carga Horaria:</Typography>
                <Typography component='h5' sx={{fontWeight: 'bold', color: 'black'}}>{employees?.[id]?.balance_of_hours}</Typography>
              </Box>
            </Box>
          <Divider />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={handleClose} sx={{ mr: '15px', bgcolor: '#B71C1C' }}>Close</Button>
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