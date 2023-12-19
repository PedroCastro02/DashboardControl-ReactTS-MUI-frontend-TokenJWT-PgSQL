import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import ModalAdicionarPessoas from './ModalAdicionarPessoas';

interface Column {
  id: 'id' | 'editar' | 'nome' | 'position' | 'telefone' | 'person_type' | 'status';
  label: string;
  format?: (value: number) => string;
}
  
  const columns: readonly Column[] = [
    { id: 'id', label: 'Id'},
    { id: 'editar', label: 'editar'},
    { id: 'nome', label: 'Nome'},
    {
      id: 'telefone',
      label: 'telefone',   
    },
    {
      id: 'person_type',
      label: 'Tipo Pessoa',
    },
    {
      id: 'status',
      label: 'status',
    },
  ];
  
  interface Data {
    id: number;
    name: string;
    telephone: number; // ou o tipo de data apropriado
    person_type: string;
    active: boolean; // ou o tipo de data apropriado
  }



  
const Pessoas = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [search, setSearch] = React.useState("");
    const [peoples, setPeoples] = useState<Data[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [filter, setFilter] = useState('Todos')

    const handleOpenAddModal = () => {
      setModalAberto(true);
    };
  
    const handleCloseAddModal = () => {
      setModalAberto(false);
    };
  
    const searchLowerCase = search.toLocaleLowerCase();
    const pessoas = peoples.filter(pessoa => 
        pessoa.name.toLocaleLowerCase().includes(searchLowerCase) ||
        pessoa.person_type.toLocaleLowerCase().includes(searchLowerCase)
    );

    useEffect(() => {
      const token = localStorage.getItem("token")
      axios.get('http://localhost:3333/people', {
        headers:{
          Authorization: token}
      })
        .then(response => {
          console.log(response.data.data)
          setPeoples(response.data.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }, []);
  

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  

  return (
    <>
        <Box sx={{display:'flex', alignItems: 'center'}}>
            <Box sx={{display:'flex', alignItems: 'center', width: '90%'}}>
                <TextField
                id="filled-search"
                label="Search field"
                type="search"
                size='small'
                variant="filled"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ ml: 2, bgcolor:"white", width: '20%',borderRadius: '10px',boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}
                />
                <Button sx={{background: '#1976D2', 
                color: 'white', 
                ml: 3, 
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}
                >Buscar
                </Button>
                <Button sx={{background: '#1976D2',
                 color: 'white', 
                 ml: 2, 
                 boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}
                 >Limpar
                 </Button>
                 <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      size='small'
                      variant="outlined"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      sx={{
                        width: '210px',
                        bgcolor: '#FFF',
                        ml: 3,
                        paddingRight: '-100px',
                      }}
                    >
                        <MenuItem value={"Todos"}>Todos</MenuItem>
                        <MenuItem value={"Ativo"}>Ativo</MenuItem>
                        <MenuItem value={"Inativo"}>Inativo</MenuItem>
                    </Select>
            </Box>
        <Button onClick={handleOpenAddModal} sx={{background: '#1976D2', color: 'white', ml: 2, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Adicionar</Button>
           <ModalAdicionarPessoas open={modalAberto} handleClose={handleCloseAddModal} />
        </Box>
        {/* TABELA */}
        <Box sx={{ mt: 3, height: '1000px','.css-41abqd-MuiTableContainer-root': {
            maxHeight: '600px',
          }}}>  
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
                  {pessoas.filter((people) => {
                  if (filter === 'Ativo') return people.active;
                  if (filter === 'Inativo') return !people.active;
                  return true; // Mostrar todos os dados se o filtro for 'Todos'
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((peoples: Data) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={peoples.name}>
                    <TableCell>{peoples.id}</TableCell>
                    <TableCell><EditIcon sx={{cursor: 'pointer'}} /></TableCell>
                    <TableCell>{peoples.name}</TableCell>
                    <TableCell>{peoples.telephone}</TableCell>
                    <TableCell>{peoples.person_type}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: peoples.active ? 'green' : 'red'}}>{peoples.active ? 'ativo' : 'inativo'}</TableCell>
                </TableRow>
            ))}
                  </TableBody>
                  </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 15, 30]}
                component="div"
                count={peoples.length}
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

export default Pessoas