import { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  FormControlLabel, Checkbox, MenuItem, Divider, IconButton, InputAdornment, Link as MuiLink, CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { registerWithEmail, loginWithGoogle } from '../../api/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Inline Apple SVG
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const countries = [
  { code: 'KE', label: 'Kenya' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'ZA', label: 'South Africa' },
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'IN', label: 'India' },
];

export default function Register() {
  const { role } = useParams(); // 'employer' or 'worker'
  const isEmployer = role === 'employer';
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    firstName: '', lastName: '', email: '', password: '', country: 'KE' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [error, setError] = useState('');
  
  // Loading states for UI feedback
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    
    setError('');
    setLoadingEmail(true);
    const toastId = toast.loading('Creating your account...');
    
    try {
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      await registerWithEmail({ 
        name: fullName, 
        email: form.email, 
        password: form.password, 
        role: isEmployer ? 'employer' : 'worker' 
      });
      
      toast.success('Account created successfully! Please check your email.', { id: toastId });
      navigate('/verify-email');
    } catch (err) {
      setError(err.message);
      toast.error(err.message, { id: toastId });
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoadingGoogle(true);
    const toastId = toast.loading('Connecting to Google...');
    
    try {
      const user = await loginWithGoogle();
      
      // Ensure user document exists in Firestore for Google signups
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || 'Google User',
          email: user.email,
          role: isEmployer ? 'employer' : 'worker',
          emailVerified: true,
          createdAt: new Date().toISOString()
        });
      }
      
      toast.success('Signed up with Google successfully!', { id: toastId });
      navigate(isEmployer ? '/employer' : '/worker');
    } catch (err) {
      setError(err.message);
      toast.error(err.message, { id: toastId });
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 10 }}>
      {/* Top Navbar */}
      <Box sx={{ borderBottom: '1px solid #E4E4E7', py: 2, px: { xs: 2, md: 8 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component={Link} to="/" variant="h5" sx={{ fontWeight: 800, fontFamily: 'sans-serif', color: '#1A1D27', textDecoration: 'none' }}>
          LocalPro
        </Typography>
        <Box>
          <Typography variant="body2" component="span" sx={{ mr: 1 }}>
            {isEmployer ? 'Looking for work?' : 'Looking to hire?'}
          </Typography>
          <MuiLink 
            component={Link} 
            to={isEmployer ? '/register/worker' : '/register/employer'} 
            underline="hover" 
            sx={{ color: '#00A86B', fontWeight: 600 }}
          >
            {isEmployer ? 'Apply as talent' : 'Join as a client'}
          </MuiLink>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, mb: 4, color: '#1A1D27' }}>
          {isEmployer ? 'Sign up to hire talent' : 'Sign up to find work'}
        </Typography>

        {/* Social Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button 
            variant="outlined" 
            fullWidth 
            startIcon={loadingApple ? <CircularProgress size={20} /> : <AppleIcon />} 
            disabled={loadingApple || loadingGoogle || loadingEmail}
            onClick={() => toast.error('Apple Sign-in is coming soon!')}
            sx={{ py: 1.5, borderRadius: 4, borderColor: '#1A1D27', color: '#1A1D27', fontWeight: 600, textTransform: 'none' }}
          >
            Continue with Apple
          </Button>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleGoogleAuth}
            disabled={loadingApple || loadingGoogle || loadingEmail}
            startIcon={
              loadingGoogle 
                ? <CircularProgress size={20} sx={{ color: 'white' }} /> 
                : <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" width="20" />
            }
            sx={{ py: 1.5, borderRadius: 4, bgcolor: '#1877F2', color: 'white', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#1565C0' } }}
          >
            {loadingGoogle ? 'Connecting...' : 'Continue with Google'}
          </Button>
        </Box>

        <Divider sx={{ mb: 4, color: 'text.secondary', fontSize: '0.875rem' }}>or</Divider>

        {error && (
          <Box sx={{ bgcolor: '#FEF2F2', color: '#991B1B', p: 2, borderRadius: 1, mb: 3, fontSize: '0.875rem', border: '1px solid #FCA5A5' }}>
            {error}
          </Box>
        )}

        {/* Main Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>First name</Typography>
              <TextField 
                fullWidth name="firstName" value={form.firstName} onChange={handleChange} required size="small"
                disabled={loadingEmail}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Last name</Typography>
              <TextField 
                fullWidth name="lastName" value={form.lastName} onChange={handleChange} required size="small"
                disabled={loadingEmail}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              {isEmployer ? 'Work email address' : 'Email address'}
            </Typography>
            <TextField 
              fullWidth name="email" type="email" value={form.email} onChange={handleChange} required size="small"
              disabled={loadingEmail}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>
            <TextField 
              fullWidth name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required size="small"
              placeholder="Password (8 or more characters)"
              disabled={loadingEmail}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Country</Typography>
            <TextField
              fullWidth select name="country" value={form.country} onChange={handleChange} size="small"
              disabled={loadingEmail}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              {countries.map((option) => (
                <MenuItem key={option.code} value={option.code}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Box>

          <FormControlLabel
            control={<Checkbox checked={marketing} onChange={(e) => setMarketing(e.target.checked)} color="success" disabled={loadingEmail} />}
            label={<Typography variant="body2">Send me emails with tips on how to find talent that fits my needs.</Typography>}
            sx={{ mb: 2, alignItems: 'flex-start' }}
          />

          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} color="success" disabled={loadingEmail} />}
            label={
              <Typography variant="body2">
                Yes, I understand and agree to the <MuiLink href="#" sx={{ color: '#00A86B' }}>Terms of Service</MuiLink>, including the <MuiLink href="#" sx={{ color: '#00A86B' }}>User Agreement</MuiLink> and <MuiLink href="#" sx={{ color: '#00A86B' }}>Privacy Policy</MuiLink>.
              </Typography>
            }
            sx={{ mb: 4, alignItems: 'flex-start' }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loadingEmail || loadingGoogle || loadingApple}
              startIcon={loadingEmail ? <CircularProgress size={20} sx={{ color: 'white' }} /> : null}
              sx={{ bgcolor: '#00A86B', color: 'white', px: 4, py: 1.5, borderRadius: 2, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#008F5A' } }}
            >
              {loadingEmail ? 'Creating Account...' : 'Create my account'}
            </Button>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account? <Link to="/login" style={{ color: '#00A86B', fontWeight: 500 }}>Log in</Link>
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}