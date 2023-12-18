import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Collapse } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ListIcon from '@mui/icons-material/List';
import CategoryIcon from '@mui/icons-material/Category';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import EventIcon from '@mui/icons-material/Event';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end', 
}));

export default function SideBar({children, titulo}: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openNested, setOpenNested] = useState(false);
  const [openNested2, setOpenNested2] = useState(false);
  const [openNested3, setOpenNested3] = useState(false);
  const [openNested4, setOpenNested4] = useState(false);
  const [openNested5, setOpenNested5] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
  const handleNestedClick4 = () => {
    setOpenNested4(!openNested4);
  };
  const handleNestedClick5 = () => {
    setOpenNested5(!openNested5);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar  sx={{ background: '#DDE2DB', color: '#000'}}>
          <IconButton
          
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" sx={{ display: 'flex', justifyContent: 'flex-end',  color: '#000'}}>
            {titulo}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }, '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
            background: '#DDE2DB'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          <Button variant="contained" color="primary" size="large" sx={{ width: '100%', background: '#1976D2' }}>
            <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem key={'Home'} >
                <HomeIcon sx={{ marginRight: '15px' }} />
                Home
              </ListItem>
            </Link>
          </Button>

          <Button variant="contained" color="primary" size="small" sx={{ width: '100%', marginTop:'7px',  background: '#1976D2' }} onClick={handleNestedClick}>
            <ListItem>
              <AppRegistrationIcon sx={{ marginRight: '15px' }} />
              Cadastros
              {openNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Button>

          <Collapse in={openNested} timeout="auto" unmountOnExit sx={{backgroundColor: '#FFF'}}>
            <List component="div" disablePadding >
            <Button variant="contained" size="small" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
              <Link to="/Funcionarios" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem key={'Funcionarios'}>
                  <EngineeringIcon sx={{ marginRight: '15px' }} />
                  Funcionários
                </ListItem>
              </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Pessoas" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Pessoas'}>
                    <PeopleIcon sx={{ marginRight: '15px' }} />
                      Pessoas
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Usuarios" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Usuarios'}>
                      <AccountCircleIcon sx={{ marginRight: '15px' }} />
                      Usuários
                    </ListItem>
                </Link>
              </Button>
              
            </List>
          </Collapse>
          
          <Button variant="contained" color="primary" size="small" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick2}>
            <ListItem>
              <PaidIcon sx={{ marginRight: '15px' }} />
              Financeiro
              {openNested2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Button>

          <Collapse in={openNested2} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" size="small" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Orcamento" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Funcionarios'}>
                    <PointOfSaleIcon sx={{ marginRight: '15px' }} />
                    Orçamento
                  </ListItem>
                </Link>
              </Button>
              
            </List>
          </Collapse>

        
          <Button variant="contained" color="primary" size="small" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick3}>
              <ListItem>
                <DeveloperBoardIcon sx={{ marginRight: '15px' }} />
                Operacional
                {openNested3 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
          </Button>

          <Collapse in={openNested3} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" size="small" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Complementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Complementos'}>
                    <EventIcon sx={{ marginRight: '15px' }} />
                    Agendamento
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/TiposDeComplementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Home2'}>
                    <ListIcon sx={{ marginRight: '15px' }} />
                    Hist. de Agendamento
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  <Link to="/TiposDeItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Home2'}>
                      <FormatListNumberedIcon  sx={{ marginRight: '15px' }} />
                      Lista Agendamentos
                    </ListItem>
                  </Link>
              </Button>
            </List>
          </Collapse>

          <Button variant="contained" color="primary" size="small" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick4}>
              <ListItem>
                <Inventory2Icon sx={{ marginRight: '15px' }} />
                Pontos
                {openNested4 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
          </Button>

          <Collapse in={openNested4} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" size="small" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Complementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Complementos'}>
                    <EngineeringIcon sx={{ marginRight: '15px' }} />
                    Acerto De Banco
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/TiposDeComplementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Home2'}>
                    <ListIcon sx={{ marginRight: '15px' }} />
                    Batimento
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  <Link to="/TiposDeItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Home2'}>
                      <CategoryIcon sx={{ marginRight: '15px' }} />
                      Cadastro de Faltas
                    </ListItem>
                  </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  <Link to="/TiposDeItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Home2'}>
                      <CategoryIcon sx={{ marginRight: '15px' }} />
                      Relatorios
                    </ListItem>
                  </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  <Link to="/TiposDeItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Home2'}>
                      <CategoryIcon sx={{ marginRight: '15px' }} />
                      Turnos
                    </ListItem>
                  </Link>
              </Button>
            </List>
          </Collapse>

          <Button variant="contained" color="primary" size="small" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick5}>
              <ListItem>
                <Inventory2Icon sx={{ marginRight: '15px' }} />
                Produto
                {openNested5 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
          </Button>

          <Collapse in={openNested5} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" size="small" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/Complementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Complementos'}>
                    <EngineeringIcon sx={{ marginRight: '15px' }} />
                    Complementos
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <Link to="/TiposDeComplementos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem key={'Home2'}>
                    <ListIcon sx={{ marginRight: '15px' }} />
                    Tipo de Complemento
                  </ListItem>
                </Link>
              </Button>
              <Button variant="contained" size="small" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                  <Link to="/TiposDeItem" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={'Home2'}>
                      <CategoryIcon sx={{ marginRight: '15px' }} />
                      Tipos de Item
                    </ListItem>
                  </Link>
              </Button>
            </List>
          </Collapse>
          
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
       
       {children}
      </Main>
     
    </Box>
  );
}
