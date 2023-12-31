import { createTheme } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[900] ,
            light: blue[600],
            contrastText: '#FFF',
        },   
        secondary: {
            main: blueGrey[700],
            dark: blueGrey[900] ,
            light: blueGrey[600],
            contrastText: '#FFF',
        },
        background: {
            default: '#f7f6f3',
            paper: '#FFF',
        }
    }
});