
// // In src/components/auth/ProtectedRoute.jsx

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ProtectedRoute = ({ children, role, requireComplete = false }) => {
//   const { user, loading, profileCompletion } = useAuth();
//   const [checking, setChecking] = useState(false);

//   // Add debug logging
//   useEffect(() => {
//     if (user) {
//       console.log('🔒 ProtectedRoute - User:', user.email);
//       console.log('🔒 ProtectedRoute - Role:', user.role);
//       console.log('🔒 ProtectedRoute - ProfileCompletion:', profileCompletion);
//       console.log('🔒 ProtectedRoute - requireComplete:', requireComplete);
//     }
//   }, [user, profileCompletion, requireComplete]);

//   if (loading || checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     console.log('🔒 ProtectedRoute - No user, redirecting to home');
//     return <Navigate to="/" replace />;
//   }

//   // Role-based access control
//   if (role && user.role !== role) {
//     console.log(`🔒 ProtectedRoute - Role mismatch: expected ${role}, got ${user.role}`);
//     if (user.role === 'consultant') return <Navigate to="/consultant/dashboard" replace />;
//     if (user.role === 'client') return <Navigate to="/client/dashboard" replace />;
//     if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
//     return <Navigate to="/" replace />;
//   }

//   // Check if profile is complete for consultant routes
//   if (user.role === 'consultant' && requireComplete) {
//     // SIMPLIFIED: For dashboard access, only check payment status
//     // Since subscription can only be active after completing basic and availability
//     const hasActiveSubscription = profileCompletion.payment === true;
    
//     console.log('🔒 ProtectedRoute - Consultant dashboard access check:', {
//       hasActiveSubscription,
//       profileCompletion
//     });
    
//     if (!hasActiveSubscription) {
//       // If no active subscription, determine where to redirect
//       if (!profileCompletion.basicInfo) {
//         console.log('🔒 Redirecting to basic profile setup');
//         return <Navigate to="/consultant/profile-setup?step=basic" replace />;
//       }
//       if (!profileCompletion.availability) {
//         console.log('🔒 Redirecting to availability setup');
//         return <Navigate to="/consultant/profile-setup?step=availability" replace />;
//       }
//       console.log('🔒 Redirecting to subscription');
//       return <Navigate to="/consultant/subscription" replace />;
//     }
    
//     console.log('🔒 Access granted to consultant dashboard');
//   }

//   // Check if profile is complete for client dashboard
//   if (user.role === 'client' && requireComplete) {
//     if (!profileCompletion.basicInfo) {
//       console.log('🔒 Client profile incomplete, redirecting to setup');
//       return <Navigate to="/client/profile-setup" replace />;
//     }
//   }

//   return children;
// };

// export default ProtectedRoute;



// src/components/auth/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role, requireComplete = false }) => {
  const { user, loading, profileCompletion } = useAuth();

  // Add debug logging
  useEffect(() => {
    if (user) {
      console.log('🔒 ProtectedRoute - User:', user.email);
      console.log('🔒 ProtectedRoute - Role:', user.role);
      console.log('🔒 ProtectedRoute - ProfileCompletion:', profileCompletion);
      console.log('🔒 ProtectedRoute - requireComplete:', requireComplete);
    }
  }, [user, profileCompletion, requireComplete]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    console.log('🔒 ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Role-based access control - redirect to correct dashboard if role mismatch
  if (role && user.role !== role) {
    console.log(`🔒 ProtectedRoute - Role mismatch: expected ${role}, got ${user.role}`);
    if (user.role === 'consultant') return <Navigate to="/consultant/dashboard" replace />;
    if (user.role === 'client') return <Navigate to="/client/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // NEW: For dashboard routes (requireComplete = false), always allow access
  // The dashboard will show a banner to complete profile
  if (!requireComplete) {
    console.log('🔒 ProtectedRoute - Dashboard access granted (progressive onboarding)');
    return children;
  }

  // For specific routes that require completion (like profile setup steps, subscription)
  if (requireComplete && user.role === 'consultant') {
    const hasActiveSubscription = profileCompletion.payment === true;
    
    console.log('🔒 ProtectedRoute - Consultant route requiring completion check:', {
      hasActiveSubscription,
      profileCompletion
    });
    
    // If trying to access subscription page but already has active subscription
    if (window.location.pathname === '/consultant/subscription' && hasActiveSubscription) {
      console.log('🔒 Already has active subscription, redirect to dashboard');
      return <Navigate to="/consultant/dashboard" replace />;
    }
    
    // If trying to access profile setup but already has basic info
    if (window.location.pathname.includes('/consultant/profile-setup') && profileCompletion.basicInfo) {
      // Check which step we're trying to access
      const params = new URLSearchParams(window.location.search);
      const step = params.get('step');
      
      // If trying to access basic step but already completed
      if (step === 'basic' && profileCompletion.basicInfo) {
        console.log('🔒 Basic info already complete, redirect to next step');
        if (!profileCompletion.availability) {
          return <Navigate to="/consultant/profile-setup?step=availability" replace />;
        }
        return <Navigate to="/consultant/subscription" replace />;
      }
      
      // If trying to access availability step but already completed
      if (step === 'availability' && profileCompletion.availability) {
        console.log('🔒 Availability already complete, redirect to subscription');
        return <Navigate to="/consultant/subscription" replace />;
      }
    }
    
    // Allow access to profile setup and subscription even if not complete
    // This is where users go to complete their profile
    return children;
  }

  // For client routes that require completion
  if (requireComplete && user.role === 'client') {
    // If trying to access profile setup but already has basic info
    if (window.location.pathname === '/client/profile-setup' && profileCompletion.basicInfo) {
      console.log('🔒 Client profile already complete, redirect to dashboard');
      return <Navigate to="/client/dashboard" replace />;
    }
    
    return children;
  }

  // Admin routes - always allow
  if (user.role === 'admin') {
    return children;
  }

  return children;
};

export default ProtectedRoute;