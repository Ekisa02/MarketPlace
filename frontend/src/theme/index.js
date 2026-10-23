import { createTheme } from '@mui/material/styles';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#00A86B' }, // Modern clean green
      secondary: { main: '#2C2C2C' },
      background: {
        default: mode === 'light' ? '#F7F7F7' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#1A1D27' : '#F0F2F7',
        secondary: '#6B7280',
      },
      divider: '#E5E7EB',
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, boxShadow: 'none' },
          containedPrimary: {
            '&:hover': { backgroundColor: '#008F5A', boxShadow: 'none' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': { borderRadius: 8, backgroundColor: mode === 'light' ? '#FAFAFA' : '#2C2C2C' },
          },
        },
      },
    },
  });

export default getTheme;