import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, alpha, styled } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAdicionar from '../Funcionarios/ModalAdicionar';
import ModalAdicionarUsers from './ModalAdicionarUsers';
import { useForm } from 'react-hook-form';

interface Column {
  id: 'id' | 'editar' | 'nome' | 'username' | 'profile' | 'email' | 'apagar';
  label: string;
  format?: (value: number) => string;
}
  
  const columns: readonly Column[] = [
    { id: 'id', label: 'Id'},
    { id: 'editar', label: 'editar'},
    { id: 'nome', label: 'Nome'},
    {
      id: 'username',
      label: 'Nome De Usuário',
      
    },
    {
      id: 'profile',
      label: 'Perfil',
      
    },
    {
      id: 'email',
      label: 'E-mail',
    
    },
    { id: 'apagar', label: 'Apagar'},
  ];
  
  interface Data {
    id: number;
    person: { name: string, profile: {perfil: string} };
    name: string;
    username: string;
    email: string;
}

const Funcionarios = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [search, setSearch] = React.useState("");
    const [users, setUsers] = useState<Data[]>([]);
    const [modalAberto, setModalAberto] = React.useState(false);

    const handleOpenAddModal = () => {
      setModalAberto(true);
    };
  
    const handleCloseAddModal = () => {
      setModalAberto(false);
    };
  
    const searchLowerCase = search.toLocaleLowerCase();
    const usuarios = users.filter(user => 
        user.person.name.toLocaleLowerCase().includes(searchLowerCase) ||
        user.person.profile.perfil.toLocaleLowerCase().includes(searchLowerCase) || 
        user.username.toLocaleLowerCase().includes(searchLowerCase)
    );
    function getUsers(){
      const token = localStorage.getItem("token")
      axios.get('http://localhost:3333/users', {
        headers:{
          Authorization: token}
      })
        .then(response => {
          console.log(response.data.data);
          setUsers(response.data.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }
    
    const handleDelete = async (id: number) => {
      const token = localStorage.getItem("token")
      const confirmar = window.confirm("Tem certeza que deseja excluir este funcionário?");

      if (!confirmar) {
        return;
      }
      try {
        await axios.delete(`http://localhost:3333/users/${id}`, {
          headers: {
            Authorization: token 
          }
        });
        getUsers();
    
      } catch (error) {
        console.error('Erro ao excluir Usuario:', error);
      }
    };
    
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    useEffect(() => {
      getUsers();
    }, []);
   
   
  return (
    <>
        <Box sx={{display:'flex', alignItems: 'center'}}>
            <Box sx={{display:'flex', alignItems: 'center', width: '90%'}}>
                <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="outlined"
                size='small'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ ml: 2, bgcolor:"white", width: '20%',borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}
                />
                <Button sx={{background: '#1976D2',
                 color: 'white', 
                 ml: 3, 
                 boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Buscar</Button>
                <Button sx={{background: '#1976D2', color: 'white', ml: 2, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Limpar</Button>
            </Box>
        <Button onClick={handleOpenAddModal} sx={{background: '#1976D2', color: 'white', ml: 2, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Adicionar</Button>
        <ModalAdicionarUsers open={modalAberto} handleClose={handleCloseAddModal} />
        </Box>
        {/* TABELA */}
        <Box sx={{ mt: 3, height: '1000px',}}>  
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        sx={{background: '#EEE', color: 'black'}}
                        key={column.id}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {usuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: Data) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell><EditIcon sx={{cursor: 'pointer'}} /></TableCell>
                        <TableCell>{user.person.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.person.profile ? user.person.profile.perfil : ''}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><DeleteIcon sx={{cursor: 'pointer',  marginLeft: '10%', color: '#b71c1c'}} onClick={() => handleDelete(user.id)} /></TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 15, 30]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{background: '#e9e9e9', color: 'black'}}
            />
        </Paper>
        </Box>
        
    </>
  )
}

export default Funcionarios