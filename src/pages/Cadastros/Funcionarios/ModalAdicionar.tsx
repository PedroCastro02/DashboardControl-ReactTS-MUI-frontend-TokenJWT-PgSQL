import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, FormHelperText, FormLabel, Input, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { Button, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

interface ModalAdicionarProps {
  open: boolean;
  handleClose: () => void;
} 

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  interface ModalAdicionarProps {
  open: boolean;
  handleClose: () => void;
  }

  interface Data {
    id: number;
    person: { name: string };
  }

const ModalAdicionar: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);
  const [employees, setEmployees] = React.useState<Data[]>([]);

  const handleNestedClick = () => {
    setOpenNested(!openNested);
  };
  const handleNestedClick2 = () => {
    setOpenNested2(!openNested2);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get('http://localhost:3333/employees', {
      headers:{
        Authorization: token}
    })
      .then(response => {
        console.log(response.data.data);
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);
  
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Adicionar Funcionários
              </Typography>
              <Divider />
              <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'40px', background: '#1976D2'}} onClick={handleNestedClick}>
                <ListItem>
                  Dados do Funcionario
                  {openNested ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
              </Button>

          <Collapse in={openNested} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
          <FormControl sx={{ml: 3, mt: 3, mb: 3}}>
            <Box  sx={{display: 'flex', flexDirection: 'row'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <FormLabel sx={{fontSize: '1.4rem'}}>Id</FormLabel>
                <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ bgcolor: '#CCCCCC', width: '25%' }}
                  />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem',  marginLeft: '-170%',}}>Nome</FormLabel>
                      <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      sx={{
                        width: '200%',
                        marginLeft: '-170%',
                        '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                          paddingRight: '-70px',
                        },
                      }}
                    >
                     {employees.map((employee: Data) => (
                        <MenuItem key={employee.id} value={employee.person.name}>
                          {employee.person.name}
                        </MenuItem>
                      ))}
                    </Select>

                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Cargo/Função</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ width: '210%', bgcolor: '#FFF',
                    }}
                    />
                  </Box>
                </Box>
                <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Data da contratação</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ bgcolor: '#FFF', 
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Salário real</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ bgcolor: '#FFF'
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Salário fiscal</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{bgcolor: '#FFF'
                   }}
                    />
                  </Box>
                </Box>
                <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Turnos</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ bgcolor: '#FFF'
                    }}
                    />
                  </Box>
                </Box>
            </FormControl>
          </Collapse>

          <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick2}>
                <ListItem>
                  Dependentes
                  {openNested2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
              </Button>

          <Collapse in={openNested2} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            ola
          </Collapse>

              <Divider />
              <Typography id="modal-modal-footer" sx={{ mt: 2, display: 'flex', justifyContent:'flex-end', marginTop: '40px' }}>
                <Button>Close</Button>
                <Button>Adicionar</Button>
              </Typography>
          </Box>
      </Modal>
    </>
  )
}

export default ModalAdicionar