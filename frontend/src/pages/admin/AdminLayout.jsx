import { Container, Grid, Paper, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const items = [
    { label: 'Pending KYC', to: '/admin/pending-kyc' },
    { label: 'Payouts', to: '/admin/payouts' }
  ];
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Admin Console</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper>
            <List>
              {items.map((i) => (
                <ListItemButton key={i.to} selected={pathname === i.to} onClick={() => navigate(i.to)}>
                  <ListItemText primary={i.label} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}