import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function WorkerDashboard() {
  const { user } = useAuth();
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Worker Hub</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">KYC Verification</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Submit your ID to get verified and receive job requests.
              </Typography>
              <Button component={Link} to="/worker/kyc" variant="contained">Manage KYC</Button>
              <Button component={Link} to="/worker/jobs" variant="outlined" sx={{ ml: 1 }}>Browse Jobs</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Payouts</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Connect a payout account to receive earnings automatically.
              </Typography>
              <Button variant="outlined">Connect Payout Account</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}