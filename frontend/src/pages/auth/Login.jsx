import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Divider, Stack, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../api/auth';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const google = async () => {
    try {
      await loginWithGoogle();
      toast.success('Signed in with Google');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (

    
    <Container maxWidth="sm" sx={{ py: 8 }}>
<Typography variant="body2" align="center" sx={{ mt: 2 }}>
  <Link to="/login/phone">Use phone instead</Link>
</Typography>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome back</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Log in to continue.</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" size="large">Log In</Button>
          </Stack>
        </Box>
        <Divider sx={{ my: 3 }}>or</Divider>
        <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} onClick={google}>
          Continue with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 3 }} align="center">
          No account? <Link to="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
}