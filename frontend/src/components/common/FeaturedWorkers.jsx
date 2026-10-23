import { Box, Container, Typography, Grid, Card, Avatar, Chip, Stack, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WORKERS = [
  {
    name: 'Ada Okonkwo',
    skill: 'Interior Designer',
    city: 'Nairobi',
    rating: 4.9,
    reviews: 128,
    price: 'KSh 2,500/hr',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ada&backgroundColor=b6e3f4',
    tag: 'Design'
  },
  {
    name: 'John Kamau',
    skill: 'Licensed Electrician',
    city: 'Mombasa',
    rating: 4.8,
    reviews: 94,
    price: 'KSh 1,800/hr',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffd5dc',
    tag: 'Electrical'
  },
  {
    name: 'Mary Wanjiku',
    skill: 'Home Cleaner',
    city: 'Nairobi',
    rating: 5.0,
    reviews: 210,
    price: 'KSh 1,200/hr',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary&backgroundColor=c0aede',
    tag: 'Cleaning'
  }
];

export default function FeaturedWorkers() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: (t) =>
          t.palette.mode === 'light'
            ? 'linear-gradient(180deg, transparent 0%, rgba(108, 99, 255, 0.05) 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(108, 99, 255, 0.15) 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}
          >
            TOP RATED THIS WEEK
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
            Meet our featured workers
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Hand-picked professionals with verified IDs and stellar reviews.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {WORKERS.map((w, i) => (
            <Grid item xs={12} md={4} key={w.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }
                  }}
                >
                  <Chip
                    label={w.tag}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      src={w.avatar}
                      sx={{
                        width: 72,
                        height: 72,
                        border: '3px solid',
                        borderColor: 'primary.main'
                      }}
                    />
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {w.name}
                        </Typography>
                        <VerifiedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {w.skill}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                    <StarIcon sx={{ fontSize: 18, color: '#FFD700' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {w.rating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({w.reviews} reviews)
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {w.city}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {w.price}
                    </Typography>
                    <Button
                      component={Link}
                      to="/register"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      Hire
                    </Button>
                  </Stack>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 700 }}
          >
            Browse all workers
          </Button>
        </Box>
      </Container>
    </Box>
  );
}