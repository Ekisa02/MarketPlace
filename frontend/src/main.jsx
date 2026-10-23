import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast'; 
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <AuthProvider>
          <CssBaseline />
          <Toaster position="top-right" reverseOrder={false} /> {/* <-- Add this */}
          <App />
        </AuthProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);