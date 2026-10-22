import { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, Button, Stack, Alert, Chip, Box, CircularProgress, Link
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { startOnboarding, getStripeStatus, getStripeDashboardLink } from '../../api/stripe';
import toast from 'react-hot-toast';

export default function WorkerPayouts() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [params] = useSearchParams();

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getStripeStatus();
      setStatus(data);
    } catch (err) {
      toast.error('Could not load Stripe status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    if (params.get('stripe') === 'done') toast.success('Stripe onboarding complete');
    if (params.get('stripe') === 'refresh') toast('Please retry onboarding');
  }, []);

  const onboard = async () => {
    setWorking(true);
    try {
      const { data } = await startOnboarding();
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to start onboarding');
      setWorking(false);
    }
  };

  const dashboard = async () => {
    try {
      const { data } = await getStripeDashboardLink();
      window.open(data.url, '_blank');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to open dashboard');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Payouts</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Connect a Stripe Express account to receive automated payouts when jobs complete.
        </Typography>

        {!status?.connected && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You haven't connected a payout account yet. You cannot receive earnings until you do.
          </Alert>
        )}

        {status?.connected && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box>
              <Typography variant="subtitle2">Status</Typography>
              <Chip
                label={status.payoutsEnabled ? 'Active' : 'Action Required'}
                color={status.payoutsEnabled ? 'success' : 'warning'}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">Charges enabled</Typography>
              <Chip label={status.chargesEnabled ? 'Yes' : 'No'} size="small" />
            </Box>
            <Box>
              <Typography variant="subtitle2">Payouts enabled</Typography>
              <Chip label={status.payoutsEnabled ? 'Yes' : 'No'} size="small" />
            </Box>
            {status.requirementsDue?.length > 0 && (
              <Alert severity="warning">
                Missing info: {status.requirementsDue.join(', ')}
              </Alert>
            )}
          </Stack>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            onClick={onboard}
            disabled={working || status?.payoutsEnabled}
          >
            {working ? 'Redirecting…' : status?.connected ? 'Update payout info' : 'Connect Payout Account'}
          </Button>
          {status?.payoutsEnabled && (
            <Button variant="outlined" onClick={dashboard}>Open Stripe Dashboard</Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}