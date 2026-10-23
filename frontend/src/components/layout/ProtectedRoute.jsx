import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, role: currentRole, loading } = useAuth();
  const location = useLocation();

  // 1. Wait for Auth state to finish loading
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }
  
  // 2. Not logged in -> go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. EMAIL VERIFICATION GUARD
  // Only block if explicitly false. (Google auth users may sometimes be undefined briefly)
  if (user.emailVerified === false && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  // 4. If verified user tries to access /verify-email, kick them to their dashboard
  if (user.emailVerified === true && location.pathname === '/verify-email') {
    return <Navigate to="/dashboard" replace />;
  }

  // 5. Role check (e.g., worker trying to access employer page)
  if (role && currentRole !== role) {
    // If they don't have the right role, send them to home page
    return <Navigate to="/" replace />;
  }

  return children;
}