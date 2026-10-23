import { Box, Container, Typography, Card, CardActionArea } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, Link } from 'react-router-dom';

// Custom SVG for Client (Briefcase & Person)
const ClientIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1A1D27" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <rect x="12" y="14" width="8" height="6" rx="1" />
    <path d="M14 14v-2h4v2" />
    <path d="M14 17h4" />
  </svg>
);

// Custom SVG for Freelancer (Person & Laptop)
const FreelancerIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1A1D27" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
    <path d="M5 21v-2a4 4 0 0 1 4-4h4" />
    <rect x="12" y="13" width="10" height="7" rx="1" />
    <path d="M15 20v-2h4v2" />
    <circle cx="17" cy="16.5" r="0.5" fill="#1A1D27" />
  </svg>
);

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        bgcolor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle at top center, rgba(228, 248, 212, 0.5) 0%, transparent 60%)',
        pt: 4
      }}
    >
      {/* Top Left Logo */}
      <Box sx={{ pl: { xs: 2, md: 6 }, pt: 2 }}>
        <Typography 
          component={Link} 
          to="/" 
          variant="h5" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: 'sans-serif',
            color: '#1A1D27',
            textDecoration: 'none'
          }}
        >
          LocalPro
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pb: 10 }}>
        
        <Typography variant="h3" align="center" sx={{ fontWeight: 600, mb: 2, color: '#1A1D27', letterSpacing: '-0.5px' }}>
          Welcome to LocalPro
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 6 }}>
          Which describes you best?
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', width: '100%' }}>
          
          {/* Client Card */}
          <Card 
            elevation={0}
            sx={{ 
              width: { xs: '100%', sm: 280 },
              border: '1px solid #E4E4E7', 
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': { borderColor: '#A1A1AA', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' } 
            }}
          >
            <CardActionArea onClick={() => navigate('/register/employer')} sx={{ p: 2, pb: 3 }}>
              <Box sx={{ 
                height: 220, 
                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', 
                borderRadius: 1.5, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 3
              }}>
                <ClientIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A1D27', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                Client <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                Post jobs and hire
              </Typography>
            </CardActionArea>
          </Card>

          {/* Freelancer Card */}
          <Card 
            elevation={0}
            sx={{ 
              width: { xs: '100%', sm: 280 },
              border: '1px solid #E4E4E7', 
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': { borderColor: '#A1A1AA', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' } 
            }}
          >
            <CardActionArea onClick={() => navigate('/register/worker')} sx={{ p: 2, pb: 3 }}>
              <Box sx={{ 
                height: 220, 
                background: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', 
                borderRadius: 1.5, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 3
              }}>
                <FreelancerIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A1D27', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                Freelancer <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                Work and get paid
              </Typography>
            </CardActionArea>
          </Card>

        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account? <Link to="/login" style={{ color: '#14a800', fontWeight: 500, textDecoration: 'underline' }}>Log in</Link>
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}