import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, alpha, styled } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalAdicionar from './ModalAdicionar';

interface Column {
  id: 'id' | 'editar' | 'nome' | 'position' | 'telefone' | 'dt_hiring' | 'balance_of_hours' | 'anexar_documentos' | 'visualizar_funcionario' | 'apagar';
  label: string;
  format?: (value: number) => string;
}
  
  const columns: readonly Column[] = [
    { id: 'id', label: 'Id'},
    { id: 'editar', label: 'editar'},
    { id: 'nome', label: 'Nome'},
    { id: 'position',label: 'Função',},
    { id: 'telefone',label: 'telefone',},
    { id: 'dt_hiring', label: 'Data de contratação', },
    { id: 'balance_of_hours', label: 'Banco de Horas'},
    { id: 'anexar_documentos', label: 'Anexar Documentos'},
    { id: 'visualizar_funcionario', label: 'Visualizar Funcionário'},
    { id: 'apagar', label: 'Apagar'},
  ];
  
  interface Data {
    id: number;
    person: { name: string, telephone: number};
    name: string;
    position: string;
    dt_hiring: string; // ou o tipo de data apropriado
    balance_of_hours: number; // ou o tipo apropriado
}
interface DataPeople {
    id: number;
    name: string;
}

  
const Funcionarios = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [search, setSearch] = React.useState("");
    const [employees, setEmployees] = useState<Data[]>([]);
    const [people, setPeoples] = useState<DataPeople[]>([]);
    const [modalAberto, setModalAberto] = React.useState(false);

    const handleOpenAddModal = () => {
      setModalAberto(true);
    };
  
    const handleCloseAddModal = () => {
      setModalAberto(false);
    };
  
  
    const searchLowerCase = search.toLocaleLowerCase();
    const funcionarios = employees.filter(funcionario => 
      funcionario.person.name.toLocaleLowerCase().includes(searchLowerCase) ||
      funcionario.position.toLocaleLowerCase().includes(searchLowerCase)
    );

    function getPeople(){
      const token = localStorage.getItem("token")
      axios.get('http://localhost:3333/combos/people', {
        headers:{
          Authorization: token}
      })
        .then(response => {
          setPeoples(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }
    function getEmployees(){
      const token = localStorage.getItem("token")
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
    }
   
  
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleDelete = async (id: number) => {
      const token = localStorage.getItem("token")
      try {
        await axios.delete(`http://localhost:3333/employees/${id}`, {
          headers: {
            Authorization: token 
          }
        });
        getEmployees();
    
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
      }
    };
   
  useEffect(() => {
      getPeople();
      getEmployees();
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
          <ModalAdicionar open={modalAberto} handleClose={handleCloseAddModal} />
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
                {funcionarios
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((employee: Data) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell><EditIcon sx={{cursor: 'pointer'}} /></TableCell>
                <TableCell>{employee.person.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.person.telephone}</TableCell>
                <TableCell>{employee.dt_hiring}</TableCell>
                <TableCell>{employee.balance_of_hours}</TableCell>
                <TableCell><AttachFileIcon sx={{cursor: 'pointer', marginLeft: '30%'}} /></TableCell>
                <TableCell><VisibilityIcon sx={{cursor: 'pointer',  marginLeft: '30%'}} /></TableCell>
                <TableCell data-id={employee.id}>
                  <DeleteIcon
                    sx={{ cursor: 'pointer', marginLeft: '30%', color: '#b71c1c' }}
                    onClick={() => handleDelete(employee.id)}
                  />
                </TableCell>
            </TableRow>
        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[7, 15, 30]}
                component="div"
                count={employees.length}
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