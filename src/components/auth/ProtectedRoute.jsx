// In src/components/auth/ProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role, requireComplete = false }) => {
  const { user, loading, profileCompletion, BACKEND_URL } = useAuth();
  const [checking, setChecking] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (user?.role === 'consultant' && requireComplete) {
        try {
          setChecking(true);
          // Fetch latest profile data from backend
          const response = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${user.email}`);
          const data = await response.json();
          
          if (data.success && data.data) {
            // In a real scenario, you'd have a separate endpoint to check subscription
            // For now, we'll check localStorage as fallback
            const hasSubscription = localStorage.getItem('subscription_complete') === 'true';
            setSubscriptionActive(hasSubscription);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
        } finally {
          setChecking(false);
        }
      }
    };

    checkSubscription();
  }, [user, BACKEND_URL, requireComplete]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === 'consultant') return <Navigate to="/consultant/dashboard" replace />;
    if (user.role === 'client') return <Navigate to="/client/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Check if profile is complete for consultant dashboard
  if (user.role === 'consultant' && requireComplete) {
    // Check from profileCompletion state first
    const basicComplete = profileCompletion.basicInfo;
    const availabilityComplete = profileCompletion.availability;
    const paymentComplete = profileCompletion.payment || subscriptionActive || localStorage.getItem('subscription_complete') === 'true';
    
    console.log('ProtectedRoute check:', {
      basicComplete,
      availabilityComplete,
      paymentComplete,
      profileCompletion,
      subscriptionActive,
      localStorage: localStorage.getItem('subscription_complete')
    });
    
    if (!basicComplete) {
      return <Navigate to="/consultant/profile-setup?step=basic" replace />;
    }
    if (!availabilityComplete) {
      return <Navigate to="/consultant/profile-setup?step=availability" replace />;
    }
    if (!paymentComplete) {
      return <Navigate to="/consultant/subscription" replace />;
    }
  }

  // Check if profile is complete for client dashboard
  if (user.role === 'client' && requireComplete) {
    if (!profileCompletion.basicInfo) {
      return <Navigate to="/client/profile-setup" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;