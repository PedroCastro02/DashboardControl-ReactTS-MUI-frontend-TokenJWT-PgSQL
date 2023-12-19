import { Modal, Box, Typography, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { Key } from '@mui/icons-material';

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
    id: number;
    funcionarios: any;
    // employeeId: number;
    // EmployeeNome: string;
    // dtHiring: any;
    // position: string;
}
interface Data {
  id: number;
  person: { name: string, telephone: number};
  name: string;
  position: string;
  dt_hiring: string; // ou o tipo de data apropriado
  balance_of_hours: number; // ou o tipo apropriado
  real_wage: number;
  fiscal_wage: number;
}


export const ModalVisualizar: React.FC<TiposVisu> = ({  isOpen, setOpen, id }: TiposVisu) => {
  // const key = id;
  const [employees, setEmployees] = useState<Data | null>(null);

    useEffect(() => {
      const fetchData = async (id: number) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:3333/employees/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          console.log(response.data);
          setEmployees(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };
      fetchData(id); 
    }, [id]); 

    if(isOpen) {
  return (
      <>
      <Modal open={isOpen()} onClose={() => setOpen(false)} > 
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }}>     
          Vizualização do funcionário
          </Box>
          <Divider />
            <Box sx={{  display: 'flex', justifyContent: 'space-between', mt: 3}}>     
              <Box sx={{ display: 'flex', flexDirection: 'column',}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Nome:</Typography>
                <Typography component='h5'>{employees?.person.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Cargo/Função:</Typography>
                <Typography component='h5'>{employees?.position}</Typography>
              </Box>
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Data de Contratação:</Typography>
                <Typography component='h5'>{employees?.dt_hiring}</Typography>
              </Box>
            </Box>
            <Box sx={{  display: 'flex', justifyContent: 'space-between', mt: 3 }}>  
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Real:</Typography>
                <Typography component='h5'>{employees?.real_wage}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold',  fontSize: '1.2rem'}}>Salário Fiscal:</Typography>
                <Typography component='h5'>{employees?.fiscal_wage}</Typography>
              </Box>
              <Box sx={{  display: 'flex', flexDirection: 'column'}}>     
                <Typography component='h1' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>Carga Horaria:</Typography>
                <Typography component='h5' sx={{fontWeight: 'bold', color: 'black'}}>{employees?.balance_of_hours}</Typography>
              </Box>
            </Box>
          <Divider />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
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