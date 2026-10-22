import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Avatar, Menu, MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { mode, toggleColorMode } = useColorMode();
  const { user, role, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawer, setDrawer] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();

  const links = [
    { label: 'Home', to: '/' },
    ...(role === 'worker' ? [{ label: 'Worker Hub', to: '/worker' }] : []),
    ...(role === 'employer' ? [{ label: 'Find Talent', to: '/employer/search' }] : []),
    ...(role === 'admin' ? [{ label: 'Admin', to: '/admin' }] : []),
    ...(user ? [{ label: 'Messages', to: '/chat' }] : [])
  ];

  const handleLogout = async () => {
    setAnchor(null);
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" elevation={0}
      sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Typography
          component={Link} to="/"
          variant="h6" sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none', flexGrow: { xs: 1, md: 0 }, mr: 4 }}>
          LocalPro
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            {links.map((l) => (
              <Button key={l.to} component={Link} to={l.to} color="inherit">{l.label}</Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 'auto' }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {!user ? (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" variant="contained">Sign Up</Button>
            </>
          ) : (
            <>
              <Avatar
                sx={{ cursor: 'pointer', bgcolor: 'primary.main' }}
                onClick={(e) => setAnchor(e.currentTarget)}
              >
                {(user.email?.[0] || 'U').toUpperCase()}
              </Avatar>
              <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => { setAnchor(null); navigate('/' + (role || '')); }}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}

          {isMobile && (
            <IconButton onClick={() => setDrawer(true)} color="inherit"><MenuIcon /></IconButton>
          )}
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <List sx={{ width: 240 }}>
          {links.map((l) => (
            <ListItem
              key={l.to}
              component={Link}
              to={l.to}
              onClick={() => setDrawer(false)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemText primary={l.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}