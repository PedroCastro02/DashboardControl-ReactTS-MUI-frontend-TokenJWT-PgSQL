import React, { useEffect, useState } from 'react'
import { Box, Button, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, alpha, styled } from '@mui/material';
import axios from 'axios';

interface Column {
  id: 'id' | 'nome' | 'position' | 'telefone' | 'dt_hiring' | 'balance_of_hours';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
  
  const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'nome', label: 'Nome', minWidth: 170 },
    {
      id: 'position',
      label: 'Função',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'telefone',
      label: 'telefone',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'dt_hiring',
      label: 'Data de contratação',
      minWidth: 170,
      align: 'right',
    },
    { id: 'balance_of_hours', label: 'Saldo de Horas', minWidth: 170, align: 'right' },
  ];
  
  interface Data {
    id: number;
    person: { name: string };
    name: string;
    position: string;
    telefone: string;
    dt_hiring: string; // ou o tipo de data apropriado
    balance_of_hours: number; // ou o tipo apropriado
}

// function createData(
//     id: number,
//     person: { name: string },
//     position: string,
//     telefone: string,
//     dt_hiring: string,
//     balance_of_hours: number
// ): Data {
//     return { id, person, position, telefone, dt_hiring, balance_of_hours };
// }
  

  
const Funcionarios = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
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
        <Box sx={{display:'flex', alignItems: 'center'}}>
            <Box sx={{display:'flex', alignItems: 'center', width: '90%'}}>
                <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="filled"
                sx={{ ml: 2, bgcolor:"white", width: '20%',borderRadius: '10px',boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}
                />
                <Button sx={{background: '#1976D2', color: 'white', ml: 3, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Buscar</Button>
                <Button sx={{background: '#1976D2', color: 'white', ml: 2, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Limpar</Button>
            </Box>
        <Button sx={{background: '#1976D2', color: 'white', ml: 2, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>Adicionar</Button>
        </Box>
        {/* TABELA */}
        <Box sx={{ mt: 3, height: '600px',}}>  
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'}}>
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        sx={{background: '#1976D2', color: 'white'}}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {employees
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((employee: Data) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.person.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.telefone}</TableCell>
                <TableCell>{employee.dt_hiring}</TableCell>
                <TableCell>{employee.balance_of_hours}</TableCell>
            </TableRow>
        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{background: '#1976D2', color: 'white'}}
            />
        </Paper>
        </Box>
        
    </>
  )
}

export default Funcionarios