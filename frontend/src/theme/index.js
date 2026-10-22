import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    ...(mode === 'light'
      ? { background: { default: '#F8F9FE', paper: '#FFFFFF' } }
      : { background: { default: '#0F1117', paper: '#1A1D27' } })
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { padding: '10px 24px', borderRadius: 10 }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' }
      }
    }
  }
});

export default getTheme;