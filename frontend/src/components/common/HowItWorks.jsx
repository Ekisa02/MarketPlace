import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Grid, Card, Button } from '@mui/material';

const UPWORK_IMAGE = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80';
const WORKER_IMAGE = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80';

export default function HowItWorks() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>How it works</Typography>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 8, minHeight: 40, '.MuiTabs-indicator': { display: 'none' } }}>
          <Tab label="For hiring" sx={{ borderRadius: 8, textTransform: 'none', '&.Mui-selected': { bgcolor: 'action.hover', color: 'text.primary' } }} />
          <Tab label="For finding work" sx={{ borderRadius: 8, textTransform: 'none', '&.Mui-selected': { bgcolor: 'action.hover', color: 'text.primary' } }} />
        </Tabs>
      </Box>

      {tab === 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 'none', background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(255,101,132,0.1))' }}>
              <Box sx={{ p: 4, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>LocalPro<br/>Get started</Typography>
                <Button size="small" sx={{ bgcolor: 'white', color: 'primary.main', alignSelf: 'flex-start', borderRadius: 4, px: 2, fontWeight: 600 }}>Sign up</Button>
              </Box>
            </Card>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>Posting jobs is always free</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ height: 250, borderRadius: 2, overflow: 'hidden' }}>
               <img src={WORKER_IMAGE} alt="Proposal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>Get proposals and hire</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ height: 250, borderRadius: 2, overflow: 'hidden' }}>
               <img src={UPWORK_IMAGE} alt="Pay" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>Pay when work is done</Typography>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6">Find work content goes here</Typography>
        </Box>
      )}
    </Container>
  );
}