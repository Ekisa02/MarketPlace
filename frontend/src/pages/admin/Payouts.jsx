import { Paper, Typography, Box } from '@mui/material';

export default function Payouts() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Payouts Overview</Typography>
      <Typography variant="body2" color="text.secondary">
        This dashboard will list completed jobs, commission breakdowns and payout status
        pulled from the FastAPI backend. Wire it to <code>GET /admin/payouts</code>.
      </Typography>
    </Paper>
  );
}