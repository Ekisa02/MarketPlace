import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';
import HeroSection from '../components/common/HeroSection';
import RatingStars from '../components/common/RatingStars';

const categories = [
  'Plumbing', 'Electrical', 'Cleaning', 'Tutoring', 'Design', 'Moving', 'Carpentry', 'Photography'
];

const workers = [
  { name: 'Ada O.', skill: 'Interior Designer', rating: 4.9, verified: true },
  { name: 'John K.', skill: 'Licensed Electrician', rating: 4.8, verified: true },
  { name: 'Mary W.', skill: 'Home Cleaner', rating: 5.0, verified: true }
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Popular categories</Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Browse pros across the services most requested near you.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((c) => (
            <Grid item key={c}>
              <Chip label={c} sx={{ px: 2, py: 2.5, fontWeight: 600 }} variant="outlined" color="primary" />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Top rated workers</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {workers.map((w) => (
            <Grid item xs={12} md={4} key={w.name}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', mb: 2 }}>
                    {w.name[0]}
                  </Avatar>
                  <Typography variant="h6">{w.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{w.skill}</Typography>
                  <Box sx={{ mt: 1 }}><RatingStars value={w.rating} /></Box>
                  {w.verified && <Chip label="Verified" color="success" size="small" sx={{ mt: 1.5 }} />}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}