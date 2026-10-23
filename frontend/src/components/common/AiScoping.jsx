import { Box, Container, Grid, Typography, Button, Card, CardContent } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AiScoping() {
  return (
    <Box sx={{ bgcolor: 'action.hover', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>Free AI project scoping</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>Not sure where to start with AI?</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Answer a few quick questions. Get matched to the right AI project and specialist.
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>What's your top business priority?</Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: <AccessTimeIcon />, label: 'Save time' },
                    { icon: <TrendingUpIcon />, label: 'Grow revenue' },
                    { icon: <WorkspacePremiumIcon />, label: 'Boost loyalty' },
                    { icon: <BuildIcon />, label: 'Make better decisions' },
                    { icon: <AddCircleOutlineIcon />, label: 'Build something new' },
                    { icon: <AddCircleOutlineIcon />, label: 'Other' },
                  ].map((opt, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start', py: 1.5, borderColor: 'divider', color: 'text.primary', textTransform: 'none', borderRadius: 2, '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(108,99,255,0.04)' } }}>
                        <Box sx={{ color: 'primary.main', mr: 1.5, display: 'flex' }}>{opt.icon}</Box>
                        {opt.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}