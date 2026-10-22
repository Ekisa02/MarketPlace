import { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Stack, Alert, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmail } from '../../api/auth';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [role, setRole] = useState('worker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail({ ...form, role });
      toast.success('Account created!');
      navigate(role === 'worker' ? '/worker' : '/employer');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Create your account</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <ToggleButtonGroup value={role} exclusive onChange={(_, v) => v && setRole(v)} fullWidth>
              <ToggleButton value="worker">I'm a Worker</ToggleButton>
              <ToggleButton value="employer">I'm an Employer</ToggleButton>
            </ToggleButtonGroup>
            <TextField label="Full name" fullWidth required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" type="email" fullWidth required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button type="submit" variant="contained" size="large">Create Account</Button>
          </Stack>
        </Box>
        <Typography variant="body2" sx={{ mt: 3 }} align="center">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </Paper>
    </Container>
  );
}