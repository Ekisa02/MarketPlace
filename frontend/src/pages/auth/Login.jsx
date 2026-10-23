import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Divider, Link as MuiLink, InputAdornment } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../api/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Inline Apple SVG
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper to fetch role from Firestore and redirect
  const redirectBasedOnRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'employer') navigate('/employer');
        else if (userData.role === 'admin') navigate('/admin');
        else navigate('/worker');
      } else {
        // Default fallback if user doc missing
        navigate('/worker');
      }
    } catch (err) {
      console.error("Error fetching role:", err);
      navigate('/');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginWithEmail(email, password);
      
      if (!user.emailVerified) {
        navigate('/verify-email');
        toast.error('Please verify your email first.');
      } else {
        await redirectBasedOnRole(user.uid);
        toast.success('Welcome back!');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      
      if (!user.emailVerified) {
         navigate('/verify-email');
      } else {
         await redirectBasedOnRole(user.uid);
         toast.success('Signed in with Google');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: { xs: 2, md: 4 }, pl: { md: 6 } }}>
        <Typography component={Link} to="/" variant="h5" sx={{ fontWeight: 800, fontFamily: 'sans-serif', color: '#1A1D27', textDecoration: 'none' }}>
          LocalPro
        </Typography>
      </Box>

      <Container maxWidth="xs" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: -6 }}>
        <Box sx={{ border: '1px solid #E4E4E7', borderRadius: 4, p: 4, bgcolor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 3 }}>
            Log in to LocalPro
          </Typography>

          {error && (
            <Box sx={{ bgcolor: '#FEF2F2', color: '#991B1B', p: 1.5, borderRadius: 1, mb: 2, fontSize: '0.85rem' }}>
              {error}
            </Box>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth placeholder="Username or Email" value={email}
              onChange={(e) => setEmail(e.target.value)} size="small" required
              InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlineIcon fontSize="small" /></InputAdornment>) }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} size="small" required
              sx={{ mb: 3 }}
            />
            <Button 
              type="submit" fullWidth variant="contained" disabled={loading}
              sx={{ py: 1.2, bgcolor: '#00A86B', mb: 3, borderRadius: 8, textTransform: 'none', '&:hover': { bgcolor: '#008F5A' } }}
            >
              {loading ? 'Signing in...' : 'Continue'}
            </Button>
          </Box>

          <Divider sx={{ mb: 3, color: 'text.secondary', fontSize: '0.875rem' }}>or</Divider>

          <Button 
            fullWidth variant="contained" onClick={handleGoogle} disabled={loading}
            startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" width="18" />}
            sx={{ mb: 2, py: 1.2, bgcolor: '#4285F4', color: 'white', textTransform: 'none', borderRadius: 8, '&:hover': { bgcolor: '#3367D6' } }}
          >
            Continue with Google
          </Button>

          <Button 
            fullWidth variant="outlined" startIcon={<AppleIcon />}
            sx={{ py: 1.2, borderColor: '#1A1D27', color: '#1A1D27', borderRadius: 8, textTransform: 'none' }}
          >
            Continue with Apple
          </Button>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Don't have an account?</Typography>
            <Button 
              component={Link} to="/register" fullWidth variant="outlined" 
              sx={{ color: '#00A86B', borderColor: '#00A86B', borderRadius: 8, py: 1, textTransform: 'none', '&:hover': { bgcolor: 'rgba(0,168,107,0.04)' } }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>

      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="caption" color="text.secondary">
          © 2025 - 2026 LocalPro Global LLC · Privacy Policy · Your Privacy Choices
        </Typography>
      </Box>
    </Box>
  );
}