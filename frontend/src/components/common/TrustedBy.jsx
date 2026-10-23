import { Box, Container, Typography, Stack } from '@mui/material';

const BRANDS = ['airbnb', 'databricks', 'CrowdStrike', 'scale', 'Microsoft', 'pinterest', 'bambooHR', 'shutterstock'];

export default function TrustedBy() {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography align="center" variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 1, mb: 4, display: 'block' }}>
          TRUSTED BY 850,000 CLIENTS
        </Typography>
        <Stack direction="row" spacing={6} justifyContent="center" flexWrap="wrap" alignItems="center">
          {BRANDS.map((brand) => (
            <Typography key={brand} variant="h5" sx={{ fontWeight: 700, color: 'text.secondary', fontFamily: 'sans-serif', opacity: 0.5, '&:hover': { opacity: 1, color: 'primary.main' }, transition: '0.2s' }}>
              {brand}
            </Typography>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}