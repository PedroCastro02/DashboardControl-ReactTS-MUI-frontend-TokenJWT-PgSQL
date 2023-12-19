import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, FormLabel, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { Button, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalAdicionarPessoas from '../Pessoas/ModalAdicionarPessoas';
import ModalAlertaErroPessoa from '../../../components/ModalAlertaErroPessoa';


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
  interface DataPeople {
    value: number;
    label: string;
}


const ModalAdicionar: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = useState(false);
  const [openNested2, setOpenNested2] = useState(false);
  const [turnos, setTurnos] = useState<DataTurno[]>([]);
  // const [dependents, setDependents] = useState([]);
  const token = localStorage.getItem("token");
  const [showDependentInputs, setShowDependentInputs] = useState(false);
  const [Nome, setNome] = useState<string>('');
  const [position, setPosition] = useState('');
  const [RealWage, setRealWage] = useState('');
  const [FiscalWage, setFiscalWage] = useState('');
  const [dt_hiring, setDt_hiring] = useState('');
  const [Shifts, setShifts] = useState('');
  const [msgErro, setMsgErro] = useState<string>();
  const [peoples, setPeoples] = useState<DataPeople[]>([]);
  const [modalErro, setModalErro] = useState(false);
  const [icone, setIcon] = useState('success');
  const [modalAberto, setModalAberto] = useState(false);

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };

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
  
  function getShifts() {
    axios.get('http://localhost:3333/shifts', {
      headers:{
        Authorization: token}
    })
      .then(response => {
        setTurnos(response.data.data);
      })
      .catch(error => {
        // console.error('Erro ao buscar dados da API:', error);
      });
  }
  function getCombosPeople() {
    const token = localStorage.getItem("token")
    axios.get('http://localhost:3333/combos/people', {
      headers:{
        Authorization: token}
    })
      .then(response => {
        console.log(response.data);
        setPeoples(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
    }
  
  React.useEffect(() => {
   getShifts();
   getCombosPeople();
  }, []);
  const handleSubmit = async () => {
   
 if (!Nome || !Shifts || !position || !dt_hiring || !RealWage || !FiscalWage) {
    setMsgErro("Preencha todos os campos"); 
    setIcon("Erro");
    handleOpenAddModal();
    return
 }
  
  if (isNaN(parseFloat(RealWage)) || isNaN(parseFloat(FiscalWage))) {
    setMsgErro("Os salários devem ser números válidos");
    setIcon("Erro");
    handleOpenAddModal();
    return;
  }

    await axios.post('http://localhost:3333/employees', {
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
      setMsgErro("Funcionario cadastrado com sucesso"); 
      setIcon('success');
      handleOpenAddModal();
    })
    .catch(function (error) {
      console.log(error);
      if(error){
        setMsgErro("Pessoa Já é um colaborador");
        setIcon("Erro");
        handleOpenAddModal();
      return;
      }
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
                     {peoples.map((people: DataPeople) => (
                        <MenuItem key={people.value} value={people.value}>
                          {people.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
              {/* Botão para abrir o modal */}
                      <Button
                        color='primary'
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: 4,
                          ml: 2,
                          mr: 2,
                          bgcolor: '#1976D2'
                        }}
                        onClick={handleAbrirModal}
                      >
                        <AddBoxIcon sx={{ color: 'white' }} />
                      </Button>

                      {/* Componente de modal */}
                      <ModalAdicionarPessoas
                        open={modalAberto} handleClose={handleFecharModal} 
                      />
                    </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column', }}>
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
                    sx={{ width: '380px', bgcolor: '#FFF',
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
      {msgErro && ( <ModalAlertaErroPessoa mensagem={msgErro} abrir={modalErro} handleOpen={handleOpenAddModal} handleClose={handleCloseAddModal} icon={icone}/> )}
    </>
  )
}

export default ModalAdicionar