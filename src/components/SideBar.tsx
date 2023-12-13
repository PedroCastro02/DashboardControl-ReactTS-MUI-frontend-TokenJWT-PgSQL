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
import { BrowserRouter, Routes } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
          <Button variant="contained" color="primary" sx={{ width: '100%', background: '#1976D2' }}>
            <ListItem key={'Home'} onClick={() => { window.location.href = '/Home' }} >
              <HomeIcon sx={{ marginRight: '15px' }} />
              Home
            </ListItem>
          </Button>

          <Button variant="contained" color="primary" sx={{ width: '100%', marginTop:'7px',  background: '#1976D2' }} onClick={handleNestedClick}>
            <ListItem>
              <AppRegistrationIcon sx={{ marginRight: '15px' }} />
              Cadastros
              {openNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Button>

          <Collapse in={openNested} timeout="auto" unmountOnExit sx={{backgroundColor: '#FFF'}}>
            <List component="div" disablePadding >
            <Button variant="contained" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Funcionarios'} onClick={() => { window.location.href = '/Funcionarios' }}>
                  <EngineeringIcon sx={{ marginRight: '15px' }} />
                  Funcionários
                </ListItem>
              </Button>
              <Button variant="contained" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Home2'} onClick={() => { window.location.href = '/Pessoas' }}>
                  <PeopleIcon sx={{ marginRight: '15px' }} />
                  Pessoas
                </ListItem>
              </Button>
              <Button variant="contained" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Home2'} onClick={() => { window.location.href = '/Usuarios' }}>
                  <AccountCircleIcon sx={{ marginRight: '15px' }} />
                  Usuários
                </ListItem>
              </Button>
              
            </List>
          </Collapse>
          
          <Button variant="contained" color="primary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick2}>
            <ListItem>
              <PaidIcon sx={{ marginRight: '15px' }} />
              Financeiro
              {openNested2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Button>

          <Collapse in={openNested2} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Funcionarios'} onClick={() => { window.location.href = '/Funcionarios' }}>
                  <PointOfSaleIcon sx={{ marginRight: '15px' }} />
                  Orçamento
                </ListItem>
              </Button>
              
            </List>
          </Collapse>

        
          <Button variant="contained" color="primary" sx={{ width: '100%', marginTop:'7px', background: '#1976D2'}} onClick={handleNestedClick3}>
            <ListItem>
              <AppRegistrationIcon sx={{ marginRight: '15px' }} />
              Produto
              {openNested3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </Button>

          <Collapse in={openNested3} timeout="auto" unmountOnExit sx={{backgroundColor: '#EEE'}}>
            <List component="div" disablePadding >
              <Button variant="contained" sx={{ width: '100%', paddingLeft: '40px', borderRadius: '0px', marginTop:'0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Funcionarios'} onClick={() => { window.location.href = '/Funcionarios' }}>
                  <EngineeringIcon sx={{ marginRight: '15px' }} />
                  Complementos
                </ListItem>
              </Button>
              <Button variant="contained" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Home2'} onClick={() => { window.location.href = '/Home2' }}>
                  <HomeIcon sx={{ marginRight: '15px' }} />
                  Tipo de Complemento
                </ListItem>
              </Button>
              <Button variant="contained" sx={{ width: '100%',  paddingLeft: '40px', borderRadius: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                <ListItem key={'Home2'} onClick={() => { window.location.href = '/Home2' }}>
                  <HomeIcon sx={{ marginRight: '15px' }} />
                  Tipos de Item
                </ListItem>
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
