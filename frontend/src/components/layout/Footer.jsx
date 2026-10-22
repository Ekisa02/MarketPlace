import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', mt: 8, pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>LocalPro</Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting verified local talent with employers who care about quality.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Company</Typography>
            {['About', 'Careers', 'Press', 'Blog'].map((t) => (
              <Link key={t} href="#" display="block" underline="hover" color="text.secondary" variant="body2" sx={{ mb: 0.5 }}>{t}</Link>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>For Workers</Typography>
            {['Get Verified', 'Payouts', 'Resources', 'Community'].map((t) => (
              <Link key={t} href="#" display="block" underline="hover" color="text.secondary" variant="body2" sx={{ mb: 0.5 }}>{t}</Link>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Stay in the loop</Typography>
            <Stack direction="row" spacing={1}>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                <IconButton key={i} size="small" color="primary"><Icon fontSize="small" /></IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          © {new Date().getFullYear()} LocalPro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}