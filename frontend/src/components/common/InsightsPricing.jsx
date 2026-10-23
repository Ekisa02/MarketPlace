import { Box, Container, Typography, Grid, Card, CardContent, Button, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function InsightsPricing() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Dark Insights Card */}
      <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', borderRadius: 3, mb: 8, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 6 }, bgcolor: 'action.hover' }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>Get insights into freelancer pricing</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We'll calculate the average cost for freelancers with the skills you need.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, bgcolor: 'background.paper', p: 0.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <TextField size="small" fullWidth placeholder="Describe what you need done" sx={{ '& fieldset': { border: 'none' } }} />
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', borderRadius: 2, px: 3 }}>Go</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
             <Box sx={{ bgcolor: 'rgba(108,99,255,0.05)', p: 3, borderRadius: 2, width: 300 }}>
                <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>Cost estimate</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h5">KSh 2,000</Typography>
                    <Typography variant="h5">KSh 5,000</Typography>
                </Box>
                <Box sx={{ height: 8, background: 'linear-gradient(90deg, #6C63FF, #FF6584)', borderRadius: 4, width: '100%' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, color: 'text.secondary' }}>
                    <Typography variant="caption">Adaptable</Typography>
                    <Typography variant="caption">Typical</Typography>
                    <Typography variant="caption">Experts</Typography>
                </Box>
             </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Pricing Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>Choose how you want to hire</Typography>
        <Typography variant="body1" color="text.secondary">Flexible options designed to fit your hiring needs</Typography>
      </Box>
      
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Basic Plan */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Basic</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>For ongoing, repeat, one-off projects.</Typography>
            
            <Button variant="outlined" fullWidth sx={{ mb: 4, py: 1, borderColor: 'primary.main', color: 'primary.main', '&:hover': { bgcolor: 'rgba(108,99,255,0.04)' } }}>Get started for free</Button>
            
            <Typography variant="overline" sx={{ fontWeight: 600, color: 'text.secondary' }}>BASIC INCLUDES:</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Marketplace access - skilled freelancers across thousands of skills', 'Talent profiles - portfolios, ratings, and work history', 'Hiring tools - proposals and hires in one place', 'One workspace - messaging, files, and status in one view', 'Protected payments - escrow-backed pay tied to approved work'].map(item => (
                <Box key={item} sx={{ display: 'flex', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Business Plan (Highlighted) */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0 12px 32px rgba(108,99,255,0.15)', border: '2px solid', borderColor: 'primary.main', position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(108,99,255,0.1)', color: 'primary.main', px: 2, py: 0.5, borderRadius: 4, typography: 'caption', fontWeight: 700 }}>POPULAR</Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Business Plus</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>For larger work, recurring hires, and teams.</Typography>
            
            <Button variant="contained" fullWidth sx={{ mb: 4, py: 1, background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)' }}>Get started for free</Button>
            
            <Typography variant="overline" sx={{ fontWeight: 600, color: 'text.secondary' }}>EVERYTHING IN BASIC, PLUS:</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Curated shortlists - we surface top matches so you can hire faster', 'Premium talent access - access to the top tier of LocalPro freelancers', 'Team workspace - shared hiring with roles and permissions', 'Contractor billing - keep talent spend in one place', 'Priority support - faster help to keep projects moving'].map(item => (
                <Box key={item} sx={{ display: 'flex', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}