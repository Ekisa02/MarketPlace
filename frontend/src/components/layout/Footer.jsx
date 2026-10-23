import { Box, Container, Grid, Typography, Link as MuiLink, Divider, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FOOTER_LINKS = [
  { title: 'For Clients', links: ['How to hire', 'Talent Marketplace', 'Project Catalog', 'Hire an Agency', 'Enterprise', 'Business Plus', 'Any Hire', 'Contract-to-Hire', 'Direct Contracts'] },
  { title: 'For Talent', links: ['How to find work', 'Direct Contracts', 'Find Freelance Jobs Worldwide', 'Find Freelance Jobs in the USA', 'Win work with ads', 'Exclusive resources with Freelancer Plus'] },
  { title: 'Resources', links: ['Help & support', 'Success stories', 'LocalPro reviews', 'Resources', 'Blog', 'Affiliate program', 'Free Business Tools', 'Release notes'] },
  { title: 'Company', links: ['About us', 'Leadership', 'Investor relations', 'Careers', 'Our impact', 'Press', 'Contact us', 'Trust, safety & security', 'Modern slavery statement'] }
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#181818', color: 'white', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        
        {/* Top Columns */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {FOOTER_LINKS.map((col) => (
            <Grid item xs={6} md={2} key={col.title}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                {col.title}
              </Typography>
              <Stack spacing={1}>
                {col.links.map((link) => (
                  <MuiLink 
                    key={link} 
                    href="#" 
                    underline="hover" 
                    sx={{ color: '#b0b0b0', fontSize: '0.875rem', '&:hover': { color: 'white' } }}
                  >
                    {link}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
          
          {/* Follow Us Column */}
          <Grid item xs={6} md={2}>
             <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
               Follow us
             </Typography>
             <Stack direction="row" spacing={1}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                  <IconButton 
                    key={i} 
                    size="small" 
                    sx={{ color: '#b0b0b0', '&:hover': { color: 'white' } }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
             </Stack>
          </Grid>
        </Grid>
        
        {/* Divider */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />
        
        {/* Bottom Bar */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
            © 2024 - 2026 LocalPro Global LLC
          </Typography>
          
          <Stack direction="row" spacing={3}>
             {['Terms of Service', 'Privacy Policy', 'CA Notice at Collection', 'Your Privacy Choices'].map((item) => (
               <MuiLink 
                 key={item} 
                 href="#" 
                 underline="hover" 
                 sx={{ color: '#b0b0b0', fontSize: '0.75rem', '&:hover': { color: 'white' } }}
               >
                 {item}
               </MuiLink>
             ))}
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}