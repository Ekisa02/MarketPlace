import { useRef, useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setupRecaptcha, loginWithPhone } from '../../api/auth';
import toast from 'react-hot-toast';

export default function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();
    setError('');
    try {
      recaptchaRef.current = setupRecaptcha('recaptcha-container');
      const result = await loginWithPhone(phone, recaptchaRef.current);
      setConfirmation(result);
      toast.success('Verification code sent');
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    try {
      await confirmation.confirm(code);
      toast.success('Phone verified');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Phone Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box id="recaptcha-container" sx={{ mb: 2 }} />
        {!confirmation ? (
          <Box component="form" onSubmit={sendCode}>
            <Stack spacing={2}>
              <TextField label="Phone (e.g. +254712345678)" fullWidth required
                value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Button type="submit" variant="contained">Send Code</Button>
            </Stack>
          </Box>
        ) : (
          <Box component="form" onSubmit={verifyCode}>
            <Stack spacing={2}>
              <TextField label="6-digit code" fullWidth required
                value={code} onChange={(e) => setCode(e.target.value)} />
              <Button type="submit" variant="contained">Verify</Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Container>
  );
}