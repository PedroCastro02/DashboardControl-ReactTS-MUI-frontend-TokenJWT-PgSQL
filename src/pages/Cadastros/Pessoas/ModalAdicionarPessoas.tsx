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
    document: number;
    person_type: string;
    telephone: number;
    dt_birth: number;
    address: { cep: number, street: string, number: number, district: string, complement: string, city: string, state: string };
    emails: {email: string};
  }
  interface DataTurno {
    id: number;
    shift: string;
  }
  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

const ModalAdicionar: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);
  const [openNested3, setOpenNested3] = React.useState(false);
  const [peoples, setPeoples] = React.useState<Data[]>([]);
  const token = localStorage.getItem("token");
  const [Nome, setNome] = React.useState('');
  const [document, setDocument] = React.useState('');
  const [person_type, setPersonType] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [dt_birth, setDt_birth] = React.useState('');
  const [CEP, setCEP] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [Complement, setComplement] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [msgErro, setMsgErro] = React.useState<string>();
  const [modalErro, setModalErro] = React.useState(false);
  const [icone, setIcon] = React.useState('success');

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
 const handleNestedClick3 = () => {
    setOpenNested3(!openNested3);
  };


  const handleSubmit = async () => {
    
  if (!Nome || !Document || !person_type || !dt_birth || !telephone ) {
      setMsgErro("Preencha todos os campos"); 
      setIcon("Erro");
      handleOpenAddModal();
      return;
  } 
    axios.post('http://localhost:3333/people', {
      "name": Nome,
      "document": document,
      "person_type": person_type,
      "telephone": telephone,
      "fantasy_name": "null",
      "is_supplier": true,
      "dt_birth": dt_birth,
      "addresses": [
        {
          "street": street,
          "complement": Complement,
          "number": number,
          "zip_code": CEP,
          "district": district,
          "state": state,
          "city": city,
        }
      ],
      "emails": [
        {
          "email": email
        }
      ]
    }, { headers: {
      Authorization: token
    }
    }) 
    .then(function (response) {
      console.log("deu bom");
      setMsgErro("Pessoa Cadastrada Com sucesso"); 
      setIcon("success");
      handleOpenAddModal();
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
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem', marginLeft: '-150px',}}>Nome</FormLabel>
                    <TextField
                    fullWidth
                    id="fullWidth" 
                    type="input"
                    variant="outlined"
                    size='small'
                    value={Nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    sx={{ width: '550px', bgcolor: '#FFF', marginLeft: '-150px',
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem', ml: 3}}>Tipo Pessoa</FormLabel>
                      <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      value={person_type}
                      onChange={(e) => setPersonType(e.target.value)}
                      sx={{
                        width: '210px',
                        bgcolor: '#FFF',
                        ml: 3,
                        paddingRight: '-100px',
                      }}
                    >
                        <MenuItem value={"PF"}>PF</MenuItem>
                        <MenuItem value={"PJ"}>PJ</MenuItem>
                    </Select>
                 
                  </Box>
                </Box>
                <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Documento</FormLabel>
                    <TextField
                    type="number"
                    variant="outlined"
                    size='small'
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', width: '300px'
                    }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem', ml: 2}}>Telefone</FormLabel>
                    <TextField
                    type="number"
                    variant="outlined"
                    size='small'
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                    sx={{bgcolor: '#FFF', width: '300px', ml: 2,
                   }}
                    />
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Data Nascimento</FormLabel>
                    <TextField
                    type="date"
                    variant="outlined"
                    size='small'
                    value={dt_birth}
                    onChange={(e) => setDt_birth(e.target.value)}
                    required
                    sx={{ bgcolor: '#FFF', width: '225px'
                    }}
                    />
                  </Box>
                </Box>
            </Box>
          </Collapse>

          <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick2}>
              <ListItem>
                  Endereços
                {openNested2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
          </Button>

          <Collapse in={openNested2} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
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
                 <Box sx={{display: 'flex', flexDirection: 'column',}}>
                     <FormLabel sx={{fontSize: '1.4rem', marginLeft: '-150px'}}>CEP</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     value={CEP}
                     onChange={(e) => setCEP(e.target.value)}
                     required
                     sx={{ width: '150px', bgcolor: '#FFF', marginLeft: '-150px'
                     }}
                     />
                   </Box>
                 <Box sx={{display: 'flex', flexDirection: 'column'}}>
                     <FormLabel sx={{fontSize: '1.4rem', ml: 2 }}>Rua</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     value={street}
                     onChange={(e) => setStreet(e.target.value)}
                     required
                     sx={{ width: '300px', bgcolor: '#FFF', ml: 2 }}
                     />          
                   </Box>

                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Número</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     value={number}
                     onChange={(e) => setNumber(e.target.value)}
                     required
                     sx={{ width: '150px', bgcolor: '#FFF',
                     }}
                     />
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Bairro</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     value={district}
                     onChange={(e) => setDistrict(e.target.value)}
                     required
                     sx={{ width: '150px', bgcolor: '#FFF',
                     }}
                     />
                   </Box>
                 </Box>
                 <Box  sx={{display: 'flex', flexDirection: 'row'}}>
                 <Box sx={{display: 'flex', flexDirection: 'column'}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Complemento</FormLabel>
                     <TextField
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     value={Complement}
                     onChange={(e) => setComplement(e.target.value)}
                     sx={{ bgcolor: '#FFF', width: '300px'
                     }}
                     />
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                     <FormLabel sx={{fontSize: '1.4rem'}}>Cidade</FormLabel>
                     <TextField
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     sx={{ bgcolor: '#FFF', width: '300px'
                     }}
                     />
                   </Box>
                   <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem', ml: 3}}>Estado</FormLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        size='small'
                        variant="outlined"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        sx={{
                          width: '210px',
                          bgcolor: '#FFF',
                          ml: 3,
                          paddingRight: '-100px',
                        }}
                      >
                    {estados.map((estado) => (
                        <MenuItem key={estado} value={estado}>
                          {estado}
                        </MenuItem>
                      ))}
                      </Select>
                    </Box>
                 </Box>         
             </FormControl>
          
          </Collapse>
          <Button variant="contained" color="secondary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick3}>
              <ListItem>
                  Emails
                {openNested3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
          </Button>
          <Collapse in={openNested3} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
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
                     <FormLabel sx={{fontSize: '1.4rem', ml: 2, marginLeft: '-150px'  }}>Email</FormLabel>
                     <TextField
                     fullWidth
                     id="fullWidth" 
                     type="input"
                     variant="outlined"
                     size='small'
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     sx={{ width: '550px', bgcolor: '#FFF', marginLeft: '-150px' }}
                     />          
                   </Box>
                 </Box>         
             </FormControl>
          
          </Collapse>
              <Divider />
              <Typography id="modal-modal-footer" sx={{ mt: 2, display: 'flex', justifyContent:'flex-end', marginTop: '40px' }}>
                <Button variant='contained' onClick={handleClose} sx={{mr: '15px', bgcolor: 'red'}}>Close</Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" sx={{bgcolor: 'green'}}>Adicionar</Button>
              </Typography>
          </Box>
      </Modal>
      {msgErro && ( <ModalAlertaErroPessoas mensagem={msgErro} abrir={modalErro} handleOpen={handleOpenAddModal} handleClose={handleCloseAddModal} icon={icone}/> )}
    </>
  )
}

export default ModalAdicionar