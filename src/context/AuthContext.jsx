

// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileCompletion, setProfileCompletion] = useState({
//     basicInfo: false,
//     availability: false,
//     payment: false,
//     status: 'incomplete'
//   });

//   // Listen for storage events to sync across tabs
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'auth_token' || e.key === 'user_data' || e.key === 'profile_completion') {
//         // Auth state changed in another tab
//         checkAuth();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     // Initial auth check
//     checkAuth();

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // NEW FUNCTION: Determine redirect path based on user role and profile completion
//   const determineRedirectPath = (user) => {
//     if (!user) return '/';
    
//     const userRole = user?.role?.toLowerCase();
//     console.log('🔄 determineRedirectPath called for role:', userRole);
    
//     // For consultants
//     if (userRole === 'consultant') {
//       // Check payment status from profileCompletion
//       if (profileCompletion.payment === true) {
//         console.log('✅ Consultant has completed payment -> dashboard');
//         return '/consultant/dashboard';
//       } else {
//         // Check if they have basic info and availability set
//         if (profileCompletion.basicInfo === true && profileCompletion.availability === true) {
//           console.log('📝 Consultant needs to complete payment -> redirect to payment page');
//           return '/consultant/setup/payment';
//         } else if (profileCompletion.basicInfo === true) {
//           console.log('📝 Consultant needs to set availability -> redirect to availability page');
//           return '/consultant/setup/availability';
//         } else {
//           console.log('📝 Consultant needs to complete basic info -> redirect to basic info page');
//           return '/consultant/setup/basic-info';
//         }
//       }
//     } 
//     // For clients
//     else if (userRole === 'client') {
//       return '/client/dashboard';
//     } 
//     // For admins
//     else if (userRole === 'admin') {
//       return '/admin/dashboard';
//     }
    
//     // Default fallback
//     return '/';
//   };

//   const checkAuth = async () => {
//     const token = localStorage.getItem('auth_token');
//     const userData = localStorage.getItem('user_data');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
        
//         // Verify token with backend
//         const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
        
//         if (response.ok) {
//           // Token is valid, set user
//           setUser(parsedUser);
          
//           // IMPORTANT: First check if we have subscription_complete in localStorage
//           const subscriptionComplete = localStorage.getItem('subscription_complete') === 'true';
//           const profileSetupComplete = localStorage.getItem('profile_setup_complete');
//           const availabilityExists = localStorage.getItem('consultant_availability') !== null;
          
//           // Calculate availability status
//           const availabilityComplete = profileSetupComplete === 'availability' || 
//                                       profileSetupComplete === 'complete' || 
//                                       availabilityExists;
          
//           // Get basic info from user data or localStorage
//           const basicInfoComplete = !!(parsedUser.fullName) || 
//                                    localStorage.getItem('consultant_basic_complete') === 'true' ||
//                                    localStorage.getItem('consultant_signup_data') !== null;
          
//           console.log('📊 checkAuth - Calculated values:', {
//             subscriptionComplete,
//             availabilityComplete,
//             basicInfoComplete,
//             profileSetupComplete,
//             availabilityExists
//           });
          
//           const newCompletion = {
//             basicInfo: basicInfoComplete,
//             availability: availabilityComplete,
//             payment: subscriptionComplete,
//             status: subscriptionComplete ? 'complete' : 
//                     (basicInfoComplete ? 'partial' : 'incomplete')
//           };
          
//           console.log('📊 Setting profile completion from checkAuth:', newCompletion);
//           setProfileCompletion(newCompletion);
//           localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
          
//         } else {
//           // Token invalid, clear everything
//           console.warn('Token verification failed, clearing auth data');
//           clearAuthData();
//         }
//       } catch (error) {
//         console.error('Auth check error:', error);
//         // On error, use stored data
//         try {
//           setUser(JSON.parse(userData));
//           const savedCompletion = localStorage.getItem('profile_completion');
//           if (savedCompletion) {
//             setProfileCompletion(JSON.parse(savedCompletion));
//           }
//         } catch (e) {
//           console.error('Error parsing cached data:', e);
//           clearAuthData();
//         }
//       }
//     }
//     setLoading(false);
//   };

//   const clearAuthData = () => {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('user_data');
//     localStorage.removeItem('consultant_signup_data');
//     localStorage.removeItem('profile_setup_complete');
//     localStorage.removeItem('consultant_basic_complete');
//     localStorage.removeItem('consultant_availability');
//     localStorage.removeItem('subscription_complete');
//     localStorage.removeItem('profile_completion');
//     setUser(null);
//     setProfileCompletion({
//       basicInfo: false,
//       availability: false,
//       payment: false,
//       status: 'incomplete'
//     });
//   };

//   const login = async (email, userType) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, userType })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         return { 
//           success: true, 
//           message: data.message || 'Magic link sent to your email',
//           emailSent: data.emailSent
//         };
//       } else {
//         return { 
//           success: false, 
//           message: data.error || data.message || 'Failed to send magic link'
//         };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, message: 'Network error. Please try again.' };
//     }
//   };

//   const verifyMagicLink = async (token, email, userType) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/verify-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, email, userType })
//       });
      
//       const data = await response.json();
      
//       console.log('🔍 VERIFY MAGIC LINK RESPONSE:', data);
//       console.log('📤 Backend redirectTo:', data.redirectTo);

//       if (data.success && data.user) {
//         // Store auth data
//         localStorage.setItem('auth_token', data.token);
//         localStorage.setItem('user_data', JSON.stringify(data.user));
//         setUser(data.user);
        
//         // IMPORTANT: Check if subscription is active from the response
//         const isPaymentComplete = data.user.profileCompletion?.payment === true;
        
//         // Set profile completion based on what we know
//         const newCompletion = {
//           basicInfo: true, // If they're at this point, basic info is complete
//           availability: true, // If subscription is active, availability must be complete
//           payment: isPaymentComplete,
//           status: isPaymentComplete ? 'complete' : 'partial'
//         };
        
//         console.log('📊 Setting profile completion from verification:', newCompletion);
//         setProfileCompletion(newCompletion);
//         localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
        
//         // Set individual flags
//         localStorage.setItem('consultant_basic_complete', 'true');
//         localStorage.setItem('profile_setup_complete', isPaymentComplete ? 'complete' : 'availability');
//         localStorage.setItem('consultant_availability', 'true');
        
//         if (isPaymentComplete) {
//           localStorage.setItem('subscription_complete', 'true');
//         }
        
//         console.log('✅ Using backend redirectTo:', data.redirectTo);
        
//         return { 
//           success: true, 
//           user: data.user,
//           redirectTo: data.redirectTo
//         };
//       }
//       return { success: false, message: data.error || 'Invalid or expired token' };
//     } catch (error) {
//       console.error('Verification error:', error);
//       return { success: false, message: 'Verification failed. Please try again.' };
//     }
//   };

//   const checkEmailStatus = async (email) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/check-email-status/${encodeURIComponent(email)}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error checking email status:', error);
//       return { exists: false, is_verified: false };
//     }
//   };

//   const logout = () => {
//     clearAuthData();
//     window.location.href = '/';
//   };

//   const updateProfileCompletion = (step, completed = true) => {
//     setProfileCompletion(prev => {
//       const newCompletion = { ...prev };
      
//       if (step === 'basic') {
//         newCompletion.basicInfo = completed;
//         localStorage.setItem('consultant_basic_complete', completed ? 'true' : '');
//         localStorage.setItem('profile_setup_complete', completed ? 'basic' : '');
//       } else if (step === 'availability') {
//         newCompletion.availability = completed;
//         if (completed) {
//           localStorage.setItem('profile_setup_complete', 'availability');
//           localStorage.setItem('consultant_availability', 'true');
//         }
//       } else if (step === 'payment') {
//         newCompletion.payment = completed;
//         if (completed) {
//           localStorage.setItem('subscription_complete', 'true');
//           localStorage.setItem('profile_setup_complete', 'complete');
//           console.log('✅ Payment completion saved to localStorage');
//         }
//       }
      
//       // Update overall status
//       if (newCompletion.payment) {
//         newCompletion.status = 'complete';
//       } else if (newCompletion.basicInfo) {
//         newCompletion.status = 'partial';
//       } else {
//         newCompletion.status = 'incomplete';
//       }
      
//       // Save to localStorage for persistence
//       localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
//       console.log('Profile completion updated:', newCompletion);
      
//       return newCompletion;
//     });
//   };

//   const refreshUserData = async () => {
//     const token = localStorage.getItem('auth_token');
//     if (!token || !user) return false;
    
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/refresh-user-data`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.user) {
//           localStorage.setItem('user_data', JSON.stringify(data.user));
//           setUser(data.user);
//           return true;
//         }
//       }
//     } catch (error) {
//       console.error('Error refreshing user data:', error);
//     }
//     return false;
//   };

//   // Create the context value with all functions including determineRedirectPath
//   const value = {
//     user,
//     loading,
//     profileCompletion,
//     login,
//     verifyMagicLink,
//     checkEmailStatus,
//     logout,
//     updateProfileCompletion,
//     refreshUserData,
//     determineRedirectPath, // ADD THIS LINE
//     BACKEND_URL
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState({
    basicInfo: false,
    availability: false,
    payment: false,
    status: 'incomplete'
  });

  // Listen for storage events to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token' || e.key === 'user_data' || e.key === 'profile_completion') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Initial auth check
    checkAuth();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Determine redirect path based on user role and profile completion
  const determineRedirectPath = (userData, completion) => {
    if (!userData) return '/';
    
    const userRole = userData?.role?.toLowerCase();
    console.log('🔄 determineRedirectPath called for role:', userRole);
    
    if (userRole === 'consultant') {
      // Check payment status
      if (completion?.payment === true) {
        console.log('✅ Consultant has completed payment -> dashboard');
        return '/consultant/dashboard';
      } else if (completion?.basicInfo === true && completion?.availability === true) {
        console.log('📝 Consultant needs to complete payment -> redirect to payment page');
        return '/consultant/subscription';
      } else if (completion?.basicInfo === true) {
        console.log('📝 Consultant needs to set availability -> redirect to availability page');
        return '/consultant/profile-setup?step=availability';
      } else {
        console.log('📝 Consultant needs to complete basic info -> redirect to basic info page');
        return '/consultant/profile-setup?step=basic';
      }
    } else if (userRole === 'client') {
      return '/client/dashboard';
    } else if (userRole === 'admin') {
      return '/admin/dashboard';
    }
    
    return '/';
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Verify token with backend
        const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setUser(parsedUser);
          
          // Get profile completion from localStorage or use default
          const savedCompletion = localStorage.getItem('profile_completion');
          if (savedCompletion) {
            setProfileCompletion(JSON.parse(savedCompletion));
          }
        } else {
          console.warn('Token verification failed, clearing auth data');
          clearAuthData();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        try {
          setUser(JSON.parse(userData));
          const savedCompletion = localStorage.getItem('profile_completion');
          if (savedCompletion) {
            setProfileCompletion(JSON.parse(savedCompletion));
          }
        } catch (e) {
          console.error('Error parsing cached data:', e);
          clearAuthData();
        }
      }
    }
    setLoading(false);
  };

  const clearAuthData = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('consultant_signup_data');
    localStorage.removeItem('profile_setup_complete');
    localStorage.removeItem('consultant_basic_complete');
    localStorage.removeItem('consultant_availability');
    localStorage.removeItem('subscription_complete');
    localStorage.removeItem('profile_completion');
    setUser(null);
    setProfileCompletion({
      basicInfo: false,
      availability: false,
      payment: false,
      status: 'incomplete'
    });
  };

  // UNIFIED AUTHENTICATION - Single entry point for both signup and login
  const initiateAuth = async (email, userType) => {
    try {
      console.log('🔐 Initiating unified auth for:', email, 'as', userType);
      
      const response = await fetch(`${BACKEND_URL}/api/auth/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store email for later use (optional)
        localStorage.setItem('pending_auth_email', email);
        localStorage.setItem('pending_auth_type', userType);
        
        return { 
          success: true, 
          message: data.message || 'Magic link sent to your email',
          isNewUser: data.isNewUser,
          emailSent: data.emailSent
        };
      } else {
        return { 
          success: false, 
          message: data.error || data.message || 'Failed to send magic link'
        };
      }
    } catch (error) {
      console.error('Auth initiation error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

// In AuthContext.jsx - Update verifyMagicLink function
const verifyMagicLink = async (token, email, userType) => {
  try {
    console.log('🔍 verifyMagicLink called with:', { email, userType, token: token?.substring(0, 10) });
    
    const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email, userType })
    });
    
    const data = await response.json();
    
    console.log('🔍 verifyMagicLink response:', data);
    
    if (data.success && data.user) {
      // Clear any pending auth data
      localStorage.removeItem('pending_auth_email');
      localStorage.removeItem('pending_auth_type');
      
      // Store new auth data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      setUser(data.user);
      
      // Set profile completion from response
      const completion = data.profileCompletion || {
        basicInfo: false,
        availability: false,
        payment: false,
        status: 'incomplete'
      };
      
      console.log('📊 Setting profile completion from verification:', completion);
      setProfileCompletion(completion);
      localStorage.setItem('profile_completion', JSON.stringify(completion));
      
      // Set individual flags for compatibility
      if (completion.basicInfo) {
        localStorage.setItem('consultant_basic_complete', 'true');
      }
      if (completion.availability) {
        localStorage.setItem('consultant_availability', 'true');
        localStorage.setItem('profile_setup_complete', 'availability');
      }
      if (completion.payment) {
        localStorage.setItem('subscription_complete', 'true');
        localStorage.setItem('profile_setup_complete', 'complete');
      }
      
      // Always redirect to dashboard (not profile setup)
      const redirectTo = '/dashboard';
      console.log('✅ Redirecting to:', redirectTo);
      
      return { 
        success: true, 
        user: data.user,
        dashboardData: data.dashboardData,
        profileCompletion: completion,
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
    const response = await fetch(`${BACKEND_URL}/api/auth/check-email/${encodeURIComponent(email)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking email status:', error);
    return { exists: false, is_verified: false };
  }
};

  const logout = () => {
    clearAuthData();
    window.location.href = '/';
  };

  const updateProfileCompletion = (step, completed = true) => {
    setProfileCompletion(prev => {
      const newCompletion = { ...prev };
      
      if (step === 'basic') {
        newCompletion.basicInfo = completed;
        localStorage.setItem('consultant_basic_complete', completed ? 'true' : '');
      } else if (step === 'availability') {
        newCompletion.availability = completed;
        if (completed) {
          localStorage.setItem('consultant_availability', 'true');
          localStorage.setItem('profile_setup_complete', 'availability');
        }
      } else if (step === 'payment') {
        newCompletion.payment = completed;
        if (completed) {
          localStorage.setItem('subscription_complete', 'true');
          localStorage.setItem('profile_setup_complete', 'complete');
          console.log('✅ Payment completion saved to localStorage');
        }
      }
      
      // Update overall status
      if (newCompletion.payment) {
        newCompletion.status = 'complete';
      } else if (newCompletion.basicInfo) {
        newCompletion.status = 'partial';
      } else {
        newCompletion.status = 'incomplete';
      }
      
      localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
      console.log('Profile completion updated:', newCompletion);
      
      return newCompletion;
    });
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token || !user) return false;
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          localStorage.setItem('user_data', JSON.stringify(data.user));
          setUser(data.user);
          return true;
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
    return false;
  };

  // Legacy login function - kept for backward compatibility
  const login = async (email, userType) => {
    return initiateAuth(email, userType);
  };

  const value = {
    user,
    loading,
    profileCompletion,
    initiateAuth,
    login, // Legacy alias
    verifyMagicLink,
    checkEmailStatus,
    logout,
    updateProfileCompletion,
    refreshUserData,
    determineRedirectPath,
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