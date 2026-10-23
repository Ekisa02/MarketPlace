import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ChooseRole from './pages/auth/ChooseRole';
import VerifyEmail from './pages/auth/VerifyEmail';
import PhoneLogin from './pages/auth/PhoneLogin';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Worker Pages
import WorkerDashboard from './pages/worker/Dashboard';
import KycStatus from './pages/worker/KycStatus';
import OpenJobs from './pages/worker/OpenJobs';
import WorkerPayouts from './pages/worker/Payouts';
import WorkerProfile from './pages/worker/Profile'; // <-- NEW IMPORT

// Employer Pages
import EmployerDashboard from './pages/employer/Dashboard';
import SearchWorkers from './pages/employer/SearchWorkers';
import PostJob from './pages/employer/PostJob';
import MyJobs from './pages/employer/MyJobs';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import PendingKyc from './pages/admin/PendingKyc';
import Payouts from './pages/admin/Payouts';

// Shared Pages
import Chats from './pages/chat/Chats';

function DashboardRedirect() {
  const { role } = useAuth();
  if (role === 'employer') return <Navigate to="/employer" replace />;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/worker" replace />;
}

export default function App() {
  const location = useLocation();
  
  const isAppLayout = 
    location.pathname.startsWith('/worker') ||
    location.pathname.startsWith('/employer') ||
    location.pathname.startsWith('/admin') ||
    location.pathname === '/chat';

  const isAuthPage = 
    location.pathname.startsWith('/register') || 
    location.pathname === '/login' || 
    location.pathname === '/login/phone' ||
    location.pathname === '/verify-email';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && !isAppLayout && <Navbar />}
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/login/phone" element={<PhoneLogin />} />
          <Route path="/register" element={<ChooseRole />} />
          <Route path="/register/worker" element={<Register />} />
          <Route path="/register/employer" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

          {/* Worker Routes */}
          <Route path="/worker" element={<ProtectedRoute role="worker"><WorkerDashboard /></ProtectedRoute>} />
          <Route path="/worker/kyc" element={<ProtectedRoute role="worker"><KycStatus /></ProtectedRoute>} />
          <Route path="/worker/jobs" element={<ProtectedRoute role="worker"><OpenJobs /></ProtectedRoute>} />
          <Route path="/worker/payouts" element={<ProtectedRoute role="worker"><WorkerPayouts /></ProtectedRoute>} />
          <Route path="/worker/profile" element={<ProtectedRoute role="worker"><WorkerProfile /></ProtectedRoute>} /> {/* <-- NEW ROUTE */}

          {/* Employer Routes */}
          <Route path="/employer" element={<ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>} />
          <Route path="/employer/search" element={<ProtectedRoute role="employer"><SearchWorkers /></ProtectedRoute>} />
          <Route path="/employer/post" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
          <Route path="/employer/jobs" element={<ProtectedRoute role="employer"><MyJobs /></ProtectedRoute>} />

          <Route path="/chat" element={<ProtectedRoute><Chats /></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<PendingKyc />} />
            <Route path="pending-kyc" element={<PendingKyc />} />
            <Route path="payouts" element={<Payouts />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && !isAppLayout && <Footer />}
    </div>
  );
}