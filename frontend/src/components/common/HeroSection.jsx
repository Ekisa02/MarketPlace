import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Top Promo Bar */}
        <Box sx={{ background: 'linear-gradient(90deg, rgba(108, 99, 255, 0.1), rgba(255, 101, 132, 0.1))', p: 1.5, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, border: '1px solid', borderColor: 'primary.light' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>Hire the top 1% of talent on Business Plus.</Typography>
          <Button component={Link} to="/register" size="small" sx={{ color: 'primary.main', fontWeight: 600 }}>Get started &gt;</Button>
        </Box>

        {/* Main Hero Image */}
        <Box sx={{
          position: 'relative',
          height: { xs: 400, md: 500 },
          borderRadius: 3,
          overflow: 'hidden',
          backgroundImage: `linear-gradient(to right, rgba(26,29,39,0.95) 0%, rgba(26,29,39,0.4) 100%), url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          p: { xs: 4, md: 8 }
        }}>
          <Box sx={{ maxWidth: 500 }}>
            
            {/* Functional Toggle Tabs */}
            <Stack direction="row" spacing={1} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)', p: 0.5, borderRadius: 5, width: 'fit-content' }}>
              <Button 
                onClick={() => navigate('/register/employer')} 
                size="small" 
                sx={{ color: 'white', bgcolor: 'primary.main', borderRadius: 4, px: 2, '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Hire
              </Button>
              <Button 
                onClick={() => navigate('/register/worker')} 
                size="small" 
                sx={{ color: 'white', borderRadius: 4, px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Work
              </Button>
            </Stack>

            <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1, mb: 2 }}>
              Work at the speed of your ambition
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, fontWeight: 400 }}>
              Hire experts who use LocalPro to amplify their talent, turning complex work into high-impact business outcomes.
            </Typography>
            <Button component={Link} to="/register" variant="contained" size="large" sx={{ background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', color: 'white', borderRadius: 8, px: 4, py: 1.5, fontWeight: 600, boxShadow: '0 8px 24px rgba(108, 99, 255, 0.4)' }}>
              Get started <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}