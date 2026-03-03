import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7c3aed' },
    secondary: { main: '#10b981' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    background: { default: '#0f172a', paper: '#1e293b' },
    text: { primary: '#e2e8f0', secondary: '#94a3b8' },
    divider: '#334155',
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Poppins", sans-serif' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { scrollBehavior: 'smooth' } } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiButton: { styleOverrides: { root: { borderRadius: 40 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 24 } } },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1e293b',
          '&:before': { borderBottom: 'none' },
          '&:after': { borderBottom: 'none' },
          '&:hover': { backgroundColor: '#2d3748' },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: { backgroundColor: '#fff', border: '2px solid #7c3aed' },
        track: { border: 'none' },
        rail: { backgroundColor: '#334155' },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);