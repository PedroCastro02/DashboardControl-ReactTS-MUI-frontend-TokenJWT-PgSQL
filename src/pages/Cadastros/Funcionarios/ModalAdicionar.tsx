import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, FormHelperText, FormLabel, Input, ListItem, TextField } from '@mui/material';
import { Button, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

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

const ModalAdicionar: React.FC<ModalAdicionarProps> = ({ open, handleClose }) => {
  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);

  const handleNestedClick = () => {
    setOpenNested(!openNested);
  };
  const handleNestedClick2 = () => {
    setOpenNested2(!openNested2);
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
                      readOnly: true, // Adiciona a propriedade readOnly
                    }}
                    sx={{ bgcolor: '#CCCCCC', width: '25%',
                    }}
                    />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <FormLabel sx={{fontSize: '1.4rem',  marginLeft: '-68%',}}>Nome</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ marginLeft: '-68%',
                    }}
                    />
                    <Select
                      disabled={false}
                      placeholder="Choose one…"
                    >
                      <Option value="dog">Dog</Option>
                      <Option value="cat">Cat</Option>
                    </Select>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  ml: 2,}}>
                    <FormLabel sx={{fontSize: '1.4rem'}}>Cargo/Função</FormLabel>
                    <TextField
                    type="input"
                    variant="outlined"
                    size='small'
                    required
                    sx={{ width: '170%',
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
                    sx={{ 
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
                    sx={{ 
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
                    sx={{
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
                    sx={{
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