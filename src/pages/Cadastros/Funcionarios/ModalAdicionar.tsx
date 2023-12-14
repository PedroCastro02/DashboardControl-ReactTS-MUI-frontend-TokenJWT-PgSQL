import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, Divider, FormControl, FormHelperText, FormLabel, Input, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { Button, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ModalAlertaErro from './ModalAlertaErro';


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
    person: { id: number, name: string };
    id_shift: number;
  }
  interface DataTurno {
    id: number;
    shift: string;
  }

const ModalAdicionar: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);
  const [employees, setEmployees] = React.useState<Data[]>([]);
  const [turnos, setTurnos] = React.useState<DataTurno[]>([]);
  // const [dependents, setDependents] = useState([]);
  const token = localStorage.getItem("token");
  const [showDependentInputs, setShowDependentInputs] = React.useState(false);
  const [Nome, setNome] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [RealWage, setRealWage] = React.useState('');
  const [FiscalWage, setFiscalWage] = React.useState('');
  const [dt_hiring, setDt_hiring] = React.useState('');
  const [Shifts, setShifts] = React.useState('');
  const [msgErro, setMsgErro] = React.useState<string>();
  const [modalErro, setModalErro] = React.useState(false);

    const handleOpenAddModal = () => {
      setModalErro(true);
    };
    const handleCloseAddModal = () => {
      setModalErro(false);
    };

  const handleNestedClick = () => {
    setOpenNested(!openNested);
  };
  const handleNestedClick2 = () => {
    setOpenNested2(!openNested2);
  };
  const handleAddDependent = () => {
    setShowDependentInputs(true);
  };
  React.useEffect(() => {
    axios.get('http://localhost:3333/employees', {
      headers:{
        Authorization: token}
    })
      .then(response => {
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);
  
  React.useEffect(() => {
    axios.get('http://localhost:3333/shifts', {
      headers:{
        Authorization: token}
    })
      .then(response => {
        setTurnos(response.data.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const handleSubmit = async () => {
   
 if (!Nome || !Shifts || !position || !dt_hiring || !RealWage || !FiscalWage) {
    setMsgErro("Preencha todos os campos"); 
    handleOpenAddModal();
    return;
 }

    axios.post('http://localhost:3333/employees', {
      "id_person": Nome,
      "id_shift": Shifts,
      "position": position,
      "dt_hiring": dt_hiring,
      "real_wage": parseFloat(RealWage),
      "fiscal_wage": parseFloat(FiscalWage),
    }, { headers: {
      Authorization: token
    }
    }) 
    .then(function (response) {
      localStorage.setItem("token", response.data.Token);
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  
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

          <Collapse in={openNested} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE', borderRadius: '10px'}}>
          <Box component="form" sx={{ml: 3, mt: 3, mb: 3}}>
            <Box  sx={{display: 'flex', flexDirection: 'row'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <FormLabel sx={{fontSize: '1.4rem'}}>Id</FormLabel>
                <TextField
                  type="input"
                  size="small"
                  name="Nome"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ bgcolor: '#CCCCCC', width: '25%' }}
                />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem',  marginLeft: '-150px',}}>Nome</FormLabel>
                      <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      value={Nome}
                      onChange={(e) => setNome(e.target.value)}
                      sx={{
                        width: '300px',
                        bgcolor: '#FFF',
                        marginLeft: '-150px',
                        paddingRight: '-100px',
                      }}
                    >
                     {employees.map((employee: Data) => (
                        <MenuItem key={employee.id} value={employee.person.id}>
                          {employee.person.name}
                        </MenuItem>
                      ))}
                    </Select>

                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Cargo/Função</FormLabel>
                    <TextField
                    fullWidth
                    id="fullWidth" 
                    type="input"
                    variant="outlined"
                    size='small'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
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
                    type="date"
                    variant="outlined"
                    size='small'
                    value={dt_hiring}
                    onChange={(e) => setDt_hiring(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', 
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Salário real</FormLabel>
                    <TextField
                    type="number"
                    variant="outlined"
                    size='small'
                    value={RealWage}
                    onChange={(e) => setRealWage(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', width: '110%'
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Salário fiscal</FormLabel>
                    <TextField
                    type="number"
                    variant="outlined"
                    size='small'
                    value={FiscalWage}
                    onChange={(e) => setFiscalWage(e.target.value)}
                    required
                    sx={{bgcolor: '#FFF', width: '360px', ml: 4,
                   }}
                    />
                  </Box>
                </Box>
                <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Turnos</FormLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      value={Shifts}
                      onChange={(e) => setShifts(e.target.value)}
                      sx={{
                        bgcolor: '#FFF',
                        width: '200px',
                        '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                          paddingRight: '-100px',
                          maxWidth: '200px',
                        },
                        '& .css-1rz0597-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                          maxWidth: '200px',
                        },
                      }}
                    >
                     {turnos.map((turno: DataTurno) => (
                        <MenuItem key={turno.id} value={turno.id}>
                          {turno.shift}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
            </Box>
          </Collapse>

          <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick2}>
                <ListItem>
                  Dependentes
                  {openNested2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
              </Button>

          <Collapse in={openNested2} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            {showDependentInputs && (
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
                     <FormLabel sx={{fontSize: '1.4rem',  marginLeft: '-150px'}}>Nome</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     sx={{ width: '300px', bgcolor: '#FFF', marginLeft: '-150px'
                     }}
                     />
 
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Relação</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     sx={{ width: '460px', bgcolor: '#FFF',
                     }}
                     />
                   </Box>
                 </Box>
                 <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                 <Box sx={{display: 'flex', flexDirection: 'column'}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Data de Nascimento</FormLabel>
                     <TextField
                     type="date"
                     variant="outlined"
                     size='small'
                     required
                     sx={{ bgcolor: '#FFF', width: '300px'
                     }}
                     />
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Telefone</FormLabel>
                     <TextField
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     sx={{ bgcolor: '#FFF', width: '300px'
                     }}
                     />
                   </Box>
                  
                 </Box>         
             </FormControl>
            )}
          <Button onClick={handleAddDependent} variant="contained" color="primary" sx={{mt: 3,}}>
            + Novo Dependente
          </Button>
          </Collapse>

              <Divider />
              <Typography id="modal-modal-footer" sx={{ mt: 2, display: 'flex', justifyContent:'flex-end', marginTop: '40px' }}>
                <Button variant='contained' onClick={handleClose} sx={{mr: '15px', bgcolor: 'red'}}>Close</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" sx={{bgcolor: 'green'}}>Adicionar</Button>
              </Typography>
          </Box>
      </Modal>
      {msgErro && ( <ModalAlertaErro mensagem={msgErro} abrir={modalErro} handleOpen={handleOpenAddModal} handleClose={handleCloseAddModal}/> )}
    </>
  )
}

export default ModalAdicionar