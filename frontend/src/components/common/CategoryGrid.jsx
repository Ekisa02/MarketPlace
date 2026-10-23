import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';
import TranslateIcon from '@mui/icons-material/Translate';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const CATEGORIES = [
  { title: 'AI Services', icon: <SmartToyIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Development & IT', icon: <CodeIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Design & Creative', icon: <BrushIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Sales & Marketing', icon: <CampaignIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Writing & Translation', icon: <TranslateIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Admin & Support', icon: <SupportAgentIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Finance & Accounting', icon: <AccountBalanceIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Legal', icon: <GavelIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'HR & Training', icon: <GroupsIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
  { title: 'Engineering & Architecture', icon: <EngineeringIcon sx={{ color: 'primary.main', fontSize: 32 }} /> },
];

export default function CategoryGrid() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>Find freelancers for every type of work</Typography>
      <Grid container spacing={2}>
        {CATEGORIES.map((cat, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={cat.title} sx={{ width: { md: '20%' } }}>
            <Card
              component={Link}
              to="/register"
              sx={{
                textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid', borderColor: 'divider', borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transform: 'translateY(-2px)', borderColor: 'primary.main' }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>{cat.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{cat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}