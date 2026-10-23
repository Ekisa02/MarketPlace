// VerifyEmail.jsx
import { Box, Container, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

export default function VerifyEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkVerification = async () => {
    await auth.currentUser.reload();
    if (auth.currentUser.emailVerified) {
      navigate('/dashboard');
    } else {
      alert('Email not verified yet. Please check your inbox (and spam folder).');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <MarkEmailReadIcon sx={{ fontSize: 80, color: '#00A86B', mb: 3 }} />
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Verify your email</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We sent a verification link to <strong>{user?.email}</strong>. 
        Please check your inbox (and spam/junk folder) to activate your account.
      </Typography>
      <Button 
        variant="contained" 
        onClick={checkVerification} 
        sx={{ bgcolor: '#a8000e', px: 4, py: 1.5, textTransform: 'none', borderRadius: 2, '&:hover': { bgcolor: '#008F5A' } }}
      >
        I have verified my email
      </Button>
    </Container>
  );
}