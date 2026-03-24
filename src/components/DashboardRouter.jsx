// src/components/DashboardRouter.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConsultantDashboard from '../page/consultant/Dashboard';
import ClientDashboard from '../page/client/Dashboard';
import AdminDashboard from '../page/admin/Dashboard';

const DashboardRouter = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // If user is already on /dashboard, redirect to role-specific dashboard
      const role = user.role;
      if (role === 'consultant') {
        navigate('/consultant/dashboard', { replace: true });
      } else if (role === 'client') {
        navigate('/client/dashboard', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Fallback - show loading or redirect
  return null;
};

export default DashboardRouter;