import { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Avatar, Chip, Stack, Paper, 
  InputBase, Tabs, Tab, BottomNavigation, BottomNavigationAction, 
  CircularProgress 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WorkOffIcon from '@mui/icons-material/WorkOff';

import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { listJobs } from '../../api/jobs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

// Desktop Sidebar Item
const SidebarItem = ({ icon, label, active, to }) => (
  <Box 
    component={to ? Link : 'div'}
    to={to}
    sx={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      color: active ? 'text.primary' : 'text.secondary', 
      mb: 3.5, cursor: 'pointer', textDecoration: 'none',
      '&:hover': { color: 'text.primary' },
      ...(active && { bgcolor: '#F3F4F6', borderRadius: 2, p: 1, my: 1, mx: 2 })
    }}
  >
    {icon}
    <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem', fontWeight: active ? 600 : 400 }}>{label}</Typography>
  </Box>
);

export default function WorkerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [bottomNav, setBottomNav] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoadingJobs(true);
        const { data } = await listJobs({ status: 'open' });
        setJobs(data.jobs || []);
      } catch (err) {
        toast.error('Failed to load jobs');
      } finally {
        setLoadingJobs(false);
      }

      try {
        const docRef = doc(db, 'workers', user.uid);
        const docSnap = await getDoc(docRef);
        const profileData = docSnap.exists() ? docSnap.data() : {};
        
        let completeness = 25; // Base
        if (profileData.name) completeness += 25;
        if (profileData.skill) completeness += 25;
        if (profileData.bio || profileData.city) completeness += 25;
        
        setProfile({ ...profileData, completeness });
      } catch (err) {
        console.error('Profile fetch error', err);
      }
    };

    fetchData();
  }, [user]);

  const handleBottomNavChange = (event, newValue) => {
    setBottomNav(newValue);
    switch (newValue) {
      case 0: navigate('/worker/jobs'); break; 
      case 1: navigate('/worker'); break; 
      case 2: navigate('/chat'); break; 
      case 3: navigate('/worker/payouts'); break; 
      default: break;
    }
  };

  const isVerified = profile?.kycStatus === 'approved';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F7F7F9', pb: { xs: 8, md: 0 } }}>
      
      {/* 1. Left Sidebar (Desktop) */}
      <Box sx={{ 
        width: 80, bgcolor: 'white', borderRight: '1px solid #E5E7EB', 
        display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', py: 3,
        position: 'sticky', top: 0, height: '100vh'
      }}>
        <Avatar component={Link} to="/" sx={{ bgcolor: '#1A1D27', mb: 4, width: 36, height: 36, fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>LP</Avatar>
        
        <SidebarItem icon={<SearchIcon />} label="Search" to="/worker/jobs" />
        <SidebarItem icon={<HomeIcon />} label="Home" active />
        <SidebarItem icon={<MailOutlineIcon />} label="Messages" to="/chat" />
        <SidebarItem icon={<TrendingUpIcon />} label="Jobs" to="/worker/jobs" />
        <SidebarItem icon={<AssignmentIcon />} label="KYC" to="/worker/kyc" />
        <SidebarItem icon={<AttachMoneyIcon />} label="Finances" to="/worker/payouts" />
        <SidebarItem icon={<StarOutlineIcon />} label="Lp Ai" />
        
        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <NotificationsNoneIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
          <HelpOutlineIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* 2. Main Content Area */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: { xs: '100%', lg: 900 }, mx: 'auto' }}>
        
        <Paper sx={{ display: 'flex', alignItems: 'center', p: 1, px: 2, borderRadius: 8, border: '1px solid #E5E7EB', mb: 4, boxShadow: 'none', bgcolor: 'white' }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase 
            placeholder="Search for jobs" 
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/worker/jobs?q=${search}`); }}
            sx={{ fontSize: '0.95rem' }}
          />
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', mb: 3, overflowX: 'auto' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ minHeight: 40, '& .MuiTabs-indicator': { display: 'none' } }}>
            <Tab label="Best matches" sx={{ textTransform: 'none', fontWeight: tab === 0 ? 700 : 500, color: tab === 0 ? 'text.primary' : 'text.secondary', '&.Mui-selected': { color: 'text.primary' }, whiteSpace: 'nowrap' }} />
            <Tab label="Most recent" sx={{ textTransform: 'none', fontWeight: 500, whiteSpace: 'nowrap' }} />
            <Tab label="Saved jobs" sx={{ textTransform: 'none', fontWeight: 500, whiteSpace: 'nowrap' }} />
            <Tab label="Invites" sx={{ textTransform: 'none', fontWeight: 500, whiteSpace: 'nowrap' }} />
          </Tabs>
          <Box sx={{ border: '1px solid #E5E7EB', borderRadius: '50%', p: 0.5, display: { xs: 'none', sm: 'flex' }, cursor: 'pointer', color: 'text.secondary' }}>
             <CompareArrowsIcon fontSize="small" />
          </Box>
        </Box>

        <Stack spacing={3}>
          {loadingJobs ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
          ) : jobs.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2, border: '1px dashed #D1D5DB', bgcolor: 'transparent', boxShadow: 'none' }}>
              <WorkOffIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>No jobs found</Typography>
              <Typography variant="body2" color="text.secondary">
                We couldn't find any open jobs matching your profile right now.
              </Typography>
            </Paper>
          ) : (
            jobs.map((job) => (
              <Paper key={job.jobId} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, border: '1px solid #E5E7EB', boxShadow: 'none' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
                  <Chip 
                    label={`Posted ${new Date(job.createdAt).toLocaleDateString()}`} 
                    size="small" 
                    sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', borderRadius: 1, fontWeight: 500, fontSize: '0.75rem' }} 
                  />
                  <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
                    <ThumbDownOffAltIcon sx={{ fontSize: 20, cursor: 'pointer', '&:hover': { color: 'text.primary' } }} />
                    <FavoriteBorderIcon sx={{ fontSize: 20, cursor: 'pointer', '&:hover': { color: 'text.primary' } }} />
                  </Stack>
                </Stack>
                
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 1.5, mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  {job.title}
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'text.secondary', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="caption">Budget: KSh {job.budget / 100}</Typography>
                  <Typography variant="caption">· {job.category}</Typography>
                </Stack>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                  {job.description}
                </Typography>
                
                <Chip label={job.category} size="small" sx={{ bgcolor: '#F3F4F6', borderRadius: 1, mb: 2, fontWeight: 500 }} />
                
                <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', alignItems: 'center' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PaymentIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">Payment unverified</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">{job.city || 'Remote'}</Typography>
                  </Stack>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>
      </Box>

      {/* 3. Right Sidebar (Profile & KYC) */}
      <Box sx={{ width: 340, display: { xs: 'none', lg: 'block' }, p: 3, pr: 4 }}>
        
        <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#F8F9FA', boxShadow: 'none', mb: 3, border: '1px solid #E5E7EB' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar src={user?.photoURL} sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontWeight: 700 }}>
              {user?.email?.[0].toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {profile?.name || user?.displayName || 'Worker'}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {profile?.skill || 'Add a skill'}
              </Typography>
            </Box>
          </Stack>
          
          <Button 
            component={Link} 
            to="/worker/profile" 
            variant="outlined" 
            fullWidth 
            size="small"
            sx={{ 
              mb: 2, mt: 1,
              textTransform: 'none', 
              borderColor: '#D1D5DB', 
              color: 'text.primary', 
              fontWeight: 600,
              '&:hover': { bgcolor: '#F9FAFB', borderColor: '#9CA3AF' }
            }}
          >
            Edit Profile
          </Button>
          
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>Profile visibility</Typography>
            <Typography variant="body2" sx={{ color: '#00A86B', fontWeight: 600 }}>Public</Typography>
          </Stack>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
             <Box sx={{ flex: 1 }}>
               <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                 {profile?.completeness || 25}% Complete
               </Typography>
               <Box sx={{ height: 6, bgcolor: '#E5E7EB', borderRadius: 3, overflow: 'hidden' }}>
                 <Box sx={{ height: '100%', bgcolor: '#00A86B', width: `${profile?.completeness || 25}%`, transition: 'width 0.5s ease' }} />
               </Box>
             </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#F8F9FA', boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 1 }}>Identity verification</Typography>
          
          {isVerified ? (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'success.main', mb: 1 }}>
                <VerifiedIcon />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Verified Worker</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Your identity is confirmed. Clients trust your profile.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'warning.main', mb: 1 }}>
                <ErrorOutlineIcon />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Not Verified</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                Increase your profile visibility in search results and win more work with an IDV Badge.
              </Typography>
              <Button component={Link} to="/worker/kyc" variant="text" sx={{ color: '#00A86B', fontWeight: 600, p: 0, textTransform: 'none', fontSize: '0.9rem' }}>
                Get Verified Now →
              </Button>
            </Box>
          )}
        </Paper>

      </Box>

      {/* 4. Bottom Navigation (Mobile) */}
      <Paper sx={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, 
        display: { xs: 'block', md: 'none' }, borderTop: '1px solid #E5E7EB', 
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)' 
      }} elevation={3}>
        <BottomNavigation
          showLabels
          value={bottomNav}
          onChange={handleBottomNavChange}
          sx={{ bgcolor: 'white', '& .Mui-selected': { color: '#1A1D27', fontWeight: 600 } }}
        >
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Messages" icon={<MailOutlineIcon />} />
          <BottomNavigationAction label="Finances" icon={<AttachMoneyIcon />} />
        </BottomNavigation>
      </Paper>

    </Box>
  );
}