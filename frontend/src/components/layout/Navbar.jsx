import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme,
  Avatar, Menu, MenuItem, Divider, Stack, Container, Grid
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useColorMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Data for the Mega Menus based on your screenshots
const MEGA_MENUS = {
  'Hire Talent': {
    categories: [
      { title: 'AI & Automation', sub: ['AI Video Creators & Editors', 'AI Integration Developers', 'Chatbot developers', 'Machine learning engineers', 'AI Developers', 'Automation Experts', 'N8N Experts', 'Vibe Coders', 'Claude Experts', 'AI Consultants'] },
      { title: 'Development & IT', sub: ['Web Development', 'Mobile Apps', 'Game Development', 'Software Testing'] },
      { title: 'Design & Creative', sub: ['UI/UX Design', 'Logo Design', 'Video Editing', 'Illustration'] },
      { title: 'Marketing', sub: ['SEO', 'Social Media Marketing', 'Email Marketing'] }
    ]
  },
  'Get outcomes': {
    title: 'Drive larger-scale work',
    desc: 'Build specialized teams for complex projects',
    columns: [
      { header: 'OUTCOMES', links: [
        { title: 'Build my website', sub: 'Web design, development and more' },
        { title: 'Design my brand', sub: 'Logo, brand identity and more' },
        { title: 'Scale my paid ad campaigns', sub: 'Growth marketing, media strategy and more' },
        { title: 'Automate my workflows', sub: 'Planning, integration, AI agents and more' },
        { title: 'Handle customer support with AI', sub: 'Chatbots, AI agents, systems and more' },
        { title: 'Build my sales pipeline', sub: 'Lead generation, AI outreach and more' }
      ]}
    ]
  },
  'Find work': {
    categories: [
      { title: 'AI & Automation', sub: ['Artificial Intelligence', 'AI Model Training', 'AI Content Creation', 'AI Writing', 'Chatbot', 'AI Generated Video', 'Prompt Engineering', 'Generative AI', 'Automation', 'ChatGPT'] },
      { title: 'Development & IT', sub: ['Web Dev', 'Mobile Dev', 'Data Science'] },
      { title: 'Marketing', sub: ['SEO', 'Content Writing', 'Social Media'] }
    ]
  },
  'Why LocalPro': {
    title: 'Learn about LocalPro',
    desc: 'Get to know the platform built for the future of work',
    columns: [
      { header: 'RESOURCES', links: [
        { title: 'Success stories', sub: 'Discover how teams work strategically to grow' },
        { title: 'Reviews', sub: "See what it's like to collaborate on LocalPro" },
        { title: 'How to hire', sub: 'Learn the different ways you can get work done' },
        { title: 'How to find work', sub: 'Learn about how to grow on your terms' }
      ]},
      { header: "WHAT'S NEW", links: [
        { title: 'LocalPro Updates', sub: 'Our latest products, features, and partners' },
        { title: 'Research Institute', sub: 'Insights and tools for business leaders' },
        { title: 'Blog', sub: "News and stories from the world's work marketplace" },
        { title: 'Release notes', sub: 'Our latest product news and improvements' }
      ]}
    ]
  }
};

export default function Navbar() {
  const { mode, toggleColorMode } = useColorMode();
  const { user, role, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawer, setDrawer] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setAnchor(null);
    await logout();
    navigate('/');
  };

  const handleMenuEnter = (menu) => setActiveMenu(menu);
  const handleMenuLeave = () => setActiveMenu(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      onMouseLeave={handleMenuLeave}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1200
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '72px' }}>
          <Typography
            component={Link} to="/"
            variant="h5" 
            sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none', mr: 4 }}
          >
            LocalPro
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {Object.keys(MEGA_MENUS).map((menu) => (
                <Box key={menu} onMouseEnter={() => handleMenuEnter(menu)}>
                  <Button
                    color="inherit"
                    endIcon={<ExpandMoreIcon sx={{ transform: activeMenu === menu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />}
                    sx={{ fontWeight: 500, color: activeMenu === menu ? 'primary.main' : 'text.primary' }}
                  >
                    {menu}
                  </Button>
                </Box>
              ))}
              <Button color="inherit" sx={{ fontWeight: 500 }}>Pricing</Button>
              <Button color="inherit" sx={{ fontWeight: 500 }}>Enterprise</Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', ml: 'auto' }}>
            <IconButton onClick={toggleColorMode} size="small">
              {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>

            {!user ? (
              <>
                <Button component={Link} to="/login" sx={{ fontWeight: 600, color: 'text.primary' }}>Log in</Button>
                <Button component={Link} to="/register" variant="contained" sx={{ background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', color: 'white', borderRadius: 10, px: 3 }}>Sign up</Button>
              </>
            ) : (
              <>
                <Avatar
                  sx={{ cursor: 'pointer', background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', width: 32, height: 32 }}
                  onClick={(e) => setAnchor(e.currentTarget)}
                >
                  {(user.email?.[0] || 'U').toUpperCase()}
                </Avatar>
                <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
                  <MenuItem onClick={() => { setAnchor(null); navigate('/' + (role || '')); }}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
            {isMobile && <IconButton onClick={() => setDrawer(true)}><MenuIcon /></IconButton>}
          </Box>
        </Toolbar>
      </Container>

      {/* Mega Menu Dropdown */}
      {!isMobile && activeMenu && (
        <Box
          onMouseEnter={() => handleMenuEnter(activeMenu)}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            borderTop: '1px solid',
            borderColor: 'divider',
            zIndex: 1100,
            py: 4,
            px: 4,
            animation: 'fadeIn 0.2s ease',
            '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(-5px)' }, to: { opacity: 1, transform: 'translateY(0)' } }
          }}
        >
          {MEGA_MENUS[activeMenu].categories ? (
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>CATEGORIES</Typography>
                {MEGA_MENUS[activeMenu].categories.map(cat => (
                  <Box key={cat.title} sx={{ py: 1, px: 2, bgcolor: cat.title === 'AI & Automation' ? 'action.hover' : 'transparent', borderRadius: 1, mb: 0.5, cursor: 'pointer' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{cat.title}</Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 2 }}>AI & AUTOMATION</Typography>
                <Grid container spacing={2}>
                  {MEGA_MENUS[activeMenu].categories.find(c => c.title === 'AI & Automation')?.sub.map(link => (
                    <Grid item xs={4} key={link}>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5, cursor: 'pointer' }}>{link}</Typography>
                      <Typography variant="caption" color="text.secondary">Generate and edit AI-powered content</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Button size="small" sx={{ mt: 3, color: 'primary.main' }}>See all skills &gt;</Button>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', gap: 6 }}>
              <Box sx={{ width: 250 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{MEGA_MENUS[activeMenu].title}</Typography>
                <Typography variant="body2" color="text.secondary">{MEGA_MENUS[activeMenu].desc}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 6, flex: 1 }}>
                {MEGA_MENUS[activeMenu].columns.map(col => (
                  <Box key={col.header}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 2 }}>{col.header}</Typography>
                    {col.links.map(link => (
                      <Box key={link.title} sx={{ mb: 2, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{link.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{link.sub}</Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LocalPro</Typography>
            <IconButton onClick={() => setDrawer(false)}><CloseIcon /></IconButton>
          </Box>
          <List>
            {Object.keys(MEGA_MENUS).map(menu => (
              <ListItem key={menu} button><ListItemText primary={menu} /></ListItem>
            ))}
            <ListItem button><ListItemText primary="Pricing" /></ListItem>
            <ListItem button><ListItemText primary="Enterprise" /></ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}