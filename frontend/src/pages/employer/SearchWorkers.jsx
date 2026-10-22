import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Chip, TextField, Box, CircularProgress } from '@mui/material';
import RatingStars from '../../components/common/RatingStars';
import { searchWorkers } from '../../api/workers';

export default function SearchWorkers() {
  const [workers, setWorkers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await searchWorkers({ q: query });
        setWorkers(data.workers || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Find Workers</Typography>
      <TextField fullWidth label="Search by skill, name or city" value={query} onChange={(e) => setQuery(e.target.value)} sx={{ mb: 4 }} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : workers.length === 0 ? (
        <Typography color="text.secondary">No workers found yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {workers.map((w) => (
            <Grid item xs={12} md={4} key={w.uid}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>{w.name?.[0] || 'W'}</Avatar>
                  <Typography variant="h6">{w.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{w.skill || 'General services'}</Typography>
                  <Box sx={{ mt: 1 }}><RatingStars value={w.rating || 0} /></Box>
                  {w.kycStatus === 'approved' && <Chip label="Verified" color="success" size="small" sx={{ mt: 1.5 }} />}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}