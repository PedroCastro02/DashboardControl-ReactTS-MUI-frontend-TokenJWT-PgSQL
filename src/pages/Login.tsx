import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { Email, Password } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleUsuarioChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    axios.post('http://localhost:3333/login', {
      'email': email,
      'password': password
    })
    .then(function (response) {
      localStorage.setItem("token", response.data.Token);
      console.log(response.data)
      navigate('/Home');
    })
    .catch(function (error) {
      console.log(error);
      setMsg("Usuário ou Senha Errado");
    });

  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#14365D',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '360px',
          height: '300px',
          flexDirection: 'column',
          background: '#FFF',
          borderRadius: '15px',
        }}
      >
        <Box sx={{ width: '300px', marginTop: '-90px', height: '100px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,background: 'linear-gradient(45deg, rgba(52,70,128,1) 0%, rgba(52,70,184,1) 100%)', }}>
            <Typography
            sx={{color: '#FFF', fontWeight: 'bold'}}
            variant='h3'>
                 {'<'}<span style={{ color: 'red' }}>mg</span> {'/>'} Pro
            </Typography>
        </Box>
        <Box sx={{ marginTop: '10%' }}>
          <TextField
            id="outlined-basic"
            label="Usuario"
            variant="outlined"
            size="small"
            onChange={handleUsuarioChange}
          />
        </Box>
        <Box sx={{ marginTop: '5%'}}>
          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            type="password"
            size="small"
            onChange={handleSenhaChange}
          />
        </Box>
        {msg && <p style={{ color: 'red', marginTop: '6%' }}>{msg}</p>}
        <Button type="submit" variant='outlined' sx={{ marginTop: '4%', marginBottom: '5%', width: '50%', bgcolor: '#14365D', color: 'white'}}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
