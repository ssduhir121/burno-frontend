// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Original pages
import Apply from './page/Apply.jsx';
import Home from './page/Home.jsx';

// Admin Pages
import AdminLogin from './page/admin/AdminLogin.jsx';
import AdminDashboard from './page/admin/Dashboard.jsx';

// Consultant Pages
import ConsultantSignupPage from './page/consultant/SignupPage.jsx';
import ConsultantLoginPage from './page/consultant/LoginPage.jsx';
import ConsultantDashboard from './page/consultant/Dashboard.jsx';
import ConsultantProfileSetup from './page/consultant/ProfileSetup.jsx';
import ConsultantSubscription from './page/consultant/Subscription.jsx';

// Client Pages
import ClientSignupPage from './page/client/SignupPage.jsx';
import ClientLoginPage from './page/client/LoginPage.jsx';
import ClientDashboard from './page/client/Dashboard.jsx';
import ClientProfileSetup from './page/client/ProfileSetup.jsx';

// Shared Pages
import MagicLinkSentPage from './page/MagicLinkSentPage.jsx';

// Protected Route wrapper
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          
          {/* ========== AUTH ROUTES ========== */}
          {/* Consultant Auth */}
          <Route path="/consultant/signup" element={<ConsultantSignupPage />} />
          <Route path="/consultant/login" element={<ConsultantLoginPage />} />
          
          {/* Client Auth */}
          <Route path="/client/signup" element={<ClientSignupPage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          
          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Magic Link */}
          <Route path="/magic-link-sent" element={<MagicLinkSentPage />} />
          <Route path="/auth/verify" element={<MagicLinkSentPage />} />
          
          {/* ========== PROTECTED ROUTES ========== */}
          
          {/* Consultant Routes */}
          <Route 
            path="/consultant/dashboard" 
            element={
              <ProtectedRoute role="consultant">
                <ConsultantDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/consultant/profile-setup" 
            element={
              <ProtectedRoute role="consultant">
                <ConsultantProfileSetup />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/consultant/subscription" 
            element={
              <ProtectedRoute role="consultant">
                <ConsultantSubscription />
              </ProtectedRoute>
            } 
          />
          
          {/* Client Routes */}
          <Route 
            path="/client/dashboard" 
            element={
              <ProtectedRoute role="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/client/profile-setup" 
            element={
              <ProtectedRoute role="client">
                <ClientProfileSetup />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== 404 - CATCH ALL ========== */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;