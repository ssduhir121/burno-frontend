// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          // Verify token with backend
          const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            setUser(JSON.parse(userData));
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        } catch (error) {
          console.error('Auth verification error:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, userType) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { 
          success: true, 
          message: data.message || 'Magic link sent to your email',
          emailSent: data.emailSent
        };
      } else {
        return { 
          success: false, 
          message: data.error || data.message || 'Failed to send magic link'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const verifyMagicLink = async (token, email, userType) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/verify-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, userType })
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        // Store auth data
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        setUser(data.user);
        
        // Determine redirect path
        let redirectTo = '/';
        if (data.user.role === 'admin') {
          redirectTo = '/admin/dashboard';
        } else if (data.user.role === 'consultant') {
          redirectTo = data.user.hasProfile ? '/consultant/dashboard' : '/consultant/profile-setup';
        } else if (data.user.role === 'client') {
          redirectTo = data.user.hasProfile ? '/client/dashboard' : '/client/profile-setup';
        }
        
        return { 
          success: true, 
          user: data.user,
          redirectTo: redirectTo
        };
      }
      return { success: false, message: data.error || 'Invalid or expired token' };
    } catch (error) {
      console.error('Verification error:', error);
      return { success: false, message: 'Verification failed. Please try again.' };
    }
  };

  const checkEmailStatus = async (email) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/check-email-status/${encodeURIComponent(email)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking email status:', error);
      return { exists: false, is_verified: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login,
    verifyMagicLink,
    checkEmailStatus,
    logout,
    BACKEND_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};