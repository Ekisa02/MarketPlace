import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <Box sx={{ py: 8, background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)' }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 4 }}>
          Find freelancers who can help you build what's next
        </Typography>
        <Button component={Link} to="/register" variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', px: 4, py: 1.5, fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
          Explore Freelancers
        </Button>
      </Container>
    </Box>
  );
}