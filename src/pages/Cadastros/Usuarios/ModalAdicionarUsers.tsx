import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dialog, Divider, FormControl, FormHelperText, FormLabel, Input, ListItem, MenuItem, Select, TextField } from '@mui/material';
import { Button, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ModalAlertaErroPessoas from '../../../components/ModalAlertaErroPessoa';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalAdicionarPessoas from '../Pessoas/ModalAdicionarPessoas';
import { Password } from '@mui/icons-material';

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

  interface DataPeople {
    value: number;
    label: string;
}

  interface Data {
    id: number;
    person_type: string;
    telephone: number;
    id_person: number;
    dt_birth: number;
    emails: {email: string};
    username: string;
    id_profile: number;
  }
  
const ModalAdicionarUsers: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = React.useState(false);
  const [peoples, setPeoples] = React.useState<Data[]>([]);
  const [username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Nome, setNome] = React.useState('');
  const [id_profile, setiId_profile] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [msgErro, setMsgErro] = React.useState<string>();
  const [modalErro, setModalErro] = React.useState(false);
  const [icone, setIcon] = React.useState('success');
  const [modalAberto, setModalAberto] = React.useState(false);
  
  const token = localStorage.getItem("token");
  
  const handleFecharModal = () => {
    setModalAberto(false);
  };

  const handleAbrirModal = () => {
    setModalAberto(true);
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
  


  const handleSubmit = async () => {
    
  if (!email || !username || !id_profile || !Password ) {
      setMsgErro("Preencha todos os campos"); 
      setIcon("Erro");
      handleOpenAddModal();
      return;
  } 
    axios.post('http://localhost:3333/users', {
    
        "email": email,
        "password": Password,
        "username": username,
        "id_person": "Nome",
        "id_profile": id_profile,
        "avatar": "",
    
    }, { headers: {
      Authorization: token
    }
    }) 
    .then(function (response) {
      console.log("deu bom 2");
      setMsgErro("Pessoa Cadastrada Com sucesso"); 
      setIcon("success");
      handleOpenAddModal();
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  
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
        getCombosPeople()

    }, [])

  return (
    <> 
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Adicionar Pessoa
              </Typography>
              <Divider />
              <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'40px', background: '#1976D2'}} onClick={handleNestedClick}>
                <ListItem>
                  Dados Pessoais
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
                     {/* {peoples.map((people: DataPeople) => (
                        <MenuItem key={people.value} value={people.value}>
                            {people.label}
                        </MenuItem>
                        ))} */}
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
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Nome de Usuário</FormLabel>
                    <TextField
                    type="text"
                    variant="outlined"
                    size='small'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', width: '175px'
                    }}
                    />
                  </Box>

                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem',ml: 3}}>Perfil</FormLabel>
                      <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      value={id_profile}
                      onChange={(e) => setiId_profile(e.target.value)}
                      sx={{
                        width: '150px',
                        bgcolor: '#FFF',
                        ml: 3,
                        paddingRight: '-100px',
                      }}
                    >
                        <MenuItem value={"PF"}>Administrador</MenuItem>
                    </Select>
                 
                  </Box>
                </Box>
                <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Email</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     sx={{ width: '550px', bgcolor: '#FFF', }}
                     />          
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem', ml: 3}}>Senha</FormLabel>
                    <TextField
                    type="password"
                    variant="outlined"
                    size='small'
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', width: '250px', ml: 3
                    }}
                    />
                  </Box>
                </Box>
            </Box>
          </Collapse>
          
              <Divider />
              <Typography id="modal-modal-footer" sx={{ mt: 2, display: 'flex', justifyContent:'flex-end', marginTop: '40px' }}>
                <Button variant='contained' onClick={handleClose} sx={{mr: '15px', bgcolor: '#B71C1C'}}>Close</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" sx={{bgcolor: 'green'}}>Adicionar</Button>
              </Typography>
          </Box>
      </Modal>
      {msgErro && ( <ModalAlertaErroPessoas mensagem={msgErro} abrir={modalErro} handleOpen={handleOpenAddModal} handleClose={handleCloseAddModal} icon={icone}/> )}
    </>
  )
}

export default ModalAdicionarUsers