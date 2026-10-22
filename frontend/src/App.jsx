import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import WorkerDashboard from './pages/worker/Dashboard';
import KycStatus from './pages/worker/KycStatus';
import EmployerDashboard from './pages/employer/Dashboard';
import SearchWorkers from './pages/employer/SearchWorkers';
import AdminLayout from './pages/admin/AdminLayout';
import PendingKyc from './pages/admin/PendingKyc';
import Payouts from './pages/admin/Payouts';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PhoneLogin from './pages/auth/PhoneLogin';
import PostJob from './pages/employer/PostJob';
import MyJobs from './pages/employer/MyJobs';
import OpenJobs from './pages/worker/OpenJobs';
import WorkerPayouts from './pages/worker/Payouts';
import Chats from './pages/chat/Chats';


export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/phone" element={<PhoneLogin />} />
          <Route path="/worker/payouts" element={
            <ProtectedRoute role="worker"><WorkerPayouts /></ProtectedRoute>
          } />
          <Route path="/worker" element={
            <ProtectedRoute role="worker"><WorkerDashboard /></ProtectedRoute>
          } />
          <Route path="/chat" element={<Chats />} />
          <Route path="/employer/post" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
          <Route path="/employer/jobs" element={<ProtectedRoute role="employer"><MyJobs /></ProtectedRoute>} />
          <Route path="/worker/jobs" element={<ProtectedRoute role="worker"><OpenJobs /></ProtectedRoute>} />
          <Route path="/worker/kyc" element={
            <ProtectedRoute role="worker"><KycStatus /></ProtectedRoute>
          } />

          <Route path="/employer" element={
            <ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>
          } />
          <Route path="/employer/search" element={
            <ProtectedRoute role="employer"><SearchWorkers /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>
          }>
            <Route index element={<PendingKyc />} />
            <Route path="pending-kyc" element={<PendingKyc />} />
            <Route path="payouts" element={<Payouts />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
