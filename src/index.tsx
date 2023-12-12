import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from './themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <ThemeProvider theme={LightTheme}>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
   </ThemeProvider>
);

