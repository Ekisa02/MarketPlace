import { Box, Container, Typography, Button, Stack, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import BoltIcon from '@mui/icons-material/Bolt';
import PaymentsIcon from '@mui/icons-material/Payments';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } })
};

export default function HeroSection() {
  return (
    <Box sx={{
      background: (t) => t.palette.mode === 'light'
        ? 'linear-gradient(135deg, #F0EEFF 0%, #FFF0F4 100%)'
        : 'linear-gradient(135deg, #1A1D27 0%, #20182A 100%)',
      pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Chip icon={<VerifiedIcon />} label="Verified local talent" color="primary" variant="outlined" sx={{ mb: 2 }} />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' }, lineHeight: 1.05 }}>
                Hire trusted <Box component="span" sx={{ color: 'primary.main' }}>local pros</Box> in minutes.
              </Typography>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 3, fontWeight: 400, maxWidth: 560 }}>
                Verified IDs, transparent ratings, and secure automated payouts — so you can hire with confidence.
              </Typography>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button component={Link} to="/register" variant="contained" size="large"
                  sx={{ px: 4, py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #FF6584)' }}>
                  Get Started Free
                </Button>
                <Button component={Link} to="/employer/search" variant="outlined" size="large" sx={{ px: 4, py: 1.5 }}>
                  Browse Talent
                </Button>
              </Stack>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {[
                  { icon: <VerifiedIcon color="primary" />, title: 'Verified Profiles', desc: 'ID-verified workers only' },
                  { icon: <BoltIcon color="warning" />, title: 'Instant Matching', desc: 'Find the right pro fast' },
                  { icon: <PaymentsIcon color="success" />, title: 'Secure Payouts', desc: 'Automated commission handling' }
                ].map((f, i) => (
                  <Box key={i} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', boxShadow: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                    {f.icon}
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}