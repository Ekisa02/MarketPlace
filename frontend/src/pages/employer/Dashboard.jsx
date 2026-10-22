import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EmployerDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Employer Hub</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">Find Talent</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Search verified workers by skill, rating and location.
              </Typography>
              <Button component={Link} to="/employer/post" variant="contained" sx={{ mr: 1 }}>Post Job</Button>
              <Button component={Link} to="/employer/jobs" variant="outlined">My Jobs</Button>
              <Button component={Link} to="/employer/search" variant="contained">Search Workers</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}