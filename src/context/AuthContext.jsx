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

//   const checkAuth = async () => {
//     const token = localStorage.getItem('auth_token');
//     const userData = localStorage.getItem('user_data');
//     const paymentVerified = localStorage.getItem('payment_verified') === 'true';
    
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
          
//           // Check if we already have payment verified from recent login
//           if (paymentVerified) {
//             console.log('✅ Using payment verified flag, skipping profile fetch');
            
//             // Load profile completion from localStorage but ensure payment is true
//             const savedCompletion = localStorage.getItem('profile_completion');
//             if (savedCompletion) {
//               const completion = JSON.parse(savedCompletion);
//               // Ensure payment is true if we have the flag
//               if (paymentVerified && !completion.payment) {
//                 completion.payment = true;
//                 completion.status = 'complete';
//               }
//               setProfileCompletion(completion);
//               localStorage.setItem('profile_completion', JSON.stringify(completion));
//             }
//           } else {
//             // No payment verified flag, fetch fresh data from backend
//             try {
//               const profileResponse = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${parsedUser.email}`);
              
//               if (profileResponse.ok) {
//                 const profileData = await profileResponse.json();
                
//                 if (profileData.success && profileData.data) {
//                   // Check subscription status - need to get this from a separate endpoint ideally
//                   // For now, check localStorage
//                   const paymentComplete = localStorage.getItem('subscription_complete') === 'true';
                  
//                   // Check availability from localStorage
//                   const availabilityComplete = localStorage.getItem('profile_setup_complete') === 'availability' || 
//                                               localStorage.getItem('consultant_availability') !== null;
                  
//                   const newCompletion = {
//                     basicInfo: !!(profileData.data.fullName),
//                     availability: availabilityComplete,
//                     payment: paymentComplete,
//                     status: paymentComplete ? 'complete' : 
//                             (!!(profileData.data.fullName) ? 'partial' : 'incomplete')
//                   };
                  
//                   console.log('📊 Setting profile completion from checkAuth:', newCompletion);
//                   setProfileCompletion(newCompletion);
//                   localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
//                 } else {
//                   // Fallback to stored completion
//                   const savedCompletion = localStorage.getItem('profile_completion');
//                   if (savedCompletion) {
//                     setProfileCompletion(JSON.parse(savedCompletion));
//                   }
//                 }
//               } else {
//                 // Fallback to stored completion
//                 const savedCompletion = localStorage.getItem('profile_completion');
//                 if (savedCompletion) {
//                   setProfileCompletion(JSON.parse(savedCompletion));
//                 }
//               }
//             } catch (profileErr) {
//               console.error('Error fetching profile:', profileErr);
//               // Fallback to stored completion
//               const savedCompletion = localStorage.getItem('profile_completion');
//               if (savedCompletion) {
//                 setProfileCompletion(JSON.parse(savedCompletion));
//               }
//             }
//           }
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
//     localStorage.removeItem('payment_verified');
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
        
//         // IMPORTANT: Set profile completion from backend ONLY
//         if (data.user.profileCompletion) {
//           const backendCompletion = data.user.profileCompletion;
          
//           // Calculate status based on backend data
//           let status = 'incomplete';
//           if (backendCompletion.payment) {
//             status = 'complete';
//             // Set payment verified flag to prevent checkAuth from overwriting
//             localStorage.setItem('payment_verified', 'true');
//           } else if (backendCompletion.basicInfo) {
//             status = 'partial';
//           }
          
//           const newCompletion = {
//             basicInfo: backendCompletion.basicInfo || false,
//             availability: backendCompletion.availability || false,
//             payment: backendCompletion.payment || false,
//             status: status
//           };
          
//           console.log('📊 Setting profile completion from backend:', newCompletion);
//           setProfileCompletion(newCompletion);
//           localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
          
//           // Set individual flags for backward compatibility
//           if (backendCompletion.basicInfo) {
//             localStorage.setItem('consultant_basic_complete', 'true');
//           }
//           if (backendCompletion.availability) {
//             localStorage.setItem('profile_setup_complete', 'availability');
//           }
//           if (backendCompletion.payment) {
//             localStorage.setItem('subscription_complete', 'true');
//             localStorage.setItem('profile_setup_complete', 'complete');
//           }
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
//         }
//       } else if (step === 'payment') {
//         newCompletion.payment = completed;
//         if (completed) {
//           localStorage.setItem('subscription_complete', 'true');
//           localStorage.setItem('payment_verified', 'true');
//           console.log('✅ Payment completion saved to localStorage');
          
//           // Also update user_data in localStorage to persist payment status
//           const storedUser = localStorage.getItem('user_data');
//           if (storedUser) {
//             try {
//               const userData = JSON.parse(storedUser);
//               userData.profileCompletion = {
//                 ...userData.profileCompletion,
//                 payment: true
//               };
//               localStorage.setItem('user_data', JSON.stringify(userData));
//               console.log('✅ Updated user_data with payment status');
//             } catch (e) {
//               console.error('Error updating user_data:', e);
//             }
//           }
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
        // Auth state changed in another tab
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

  const checkAuth = async () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Verify token with backend
        const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          // Token is valid, set user
          setUser(parsedUser);
          
          // IMPORTANT: First check if we have subscription_complete in localStorage
          const subscriptionComplete = localStorage.getItem('subscription_complete') === 'true';
          const profileSetupComplete = localStorage.getItem('profile_setup_complete');
          const availabilityExists = localStorage.getItem('consultant_availability') !== null;
          
          // Calculate availability status
          const availabilityComplete = profileSetupComplete === 'availability' || 
                                      profileSetupComplete === 'complete' || 
                                      availabilityExists;
          
          // Get basic info from user data or localStorage
          const basicInfoComplete = !!(parsedUser.fullName) || 
                                   localStorage.getItem('consultant_basic_complete') === 'true' ||
                                   localStorage.getItem('consultant_signup_data') !== null;
          
          console.log('📊 checkAuth - Calculated values:', {
            subscriptionComplete,
            availabilityComplete,
            basicInfoComplete,
            profileSetupComplete,
            availabilityExists
          });
          
          const newCompletion = {
            basicInfo: basicInfoComplete,
            availability: availabilityComplete,
            payment: subscriptionComplete,
            status: subscriptionComplete ? 'complete' : 
                    (basicInfoComplete ? 'partial' : 'incomplete')
          };
          
          console.log('📊 Setting profile completion from checkAuth:', newCompletion);
          setProfileCompletion(newCompletion);
          localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
          
        } else {
          // Token invalid, clear everything
          console.warn('Token verification failed, clearing auth data');
          clearAuthData();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, use stored data
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
      
      console.log('🔍 VERIFY MAGIC LINK RESPONSE:', data);
      console.log('📤 Backend redirectTo:', data.redirectTo);

      if (data.success && data.user) {
        // Store auth data
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        setUser(data.user);
        
        // IMPORTANT: Check if subscription is active from the response
        const isPaymentComplete = data.user.profileCompletion?.payment === true;
        
        // Set profile completion based on what we know
        const newCompletion = {
          basicInfo: true, // If they're at this point, basic info is complete
          availability: true, // If subscription is active, availability must be complete
          payment: isPaymentComplete,
          status: isPaymentComplete ? 'complete' : 'partial'
        };
        
        console.log('📊 Setting profile completion from verification:', newCompletion);
        setProfileCompletion(newCompletion);
        localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
        
        // Set individual flags
        localStorage.setItem('consultant_basic_complete', 'true');
        localStorage.setItem('profile_setup_complete', isPaymentComplete ? 'complete' : 'availability');
        localStorage.setItem('consultant_availability', 'true');
        
        if (isPaymentComplete) {
          localStorage.setItem('subscription_complete', 'true');
        }
        
        console.log('✅ Using backend redirectTo:', data.redirectTo);
        
        return { 
          success: true, 
          user: data.user,
          redirectTo: data.redirectTo
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
    clearAuthData();
    window.location.href = '/';
  };

  const updateProfileCompletion = (step, completed = true) => {
    setProfileCompletion(prev => {
      const newCompletion = { ...prev };
      
      if (step === 'basic') {
        newCompletion.basicInfo = completed;
        localStorage.setItem('consultant_basic_complete', completed ? 'true' : '');
        localStorage.setItem('profile_setup_complete', completed ? 'basic' : '');
      } else if (step === 'availability') {
        newCompletion.availability = completed;
        if (completed) {
          localStorage.setItem('profile_setup_complete', 'availability');
          localStorage.setItem('consultant_availability', 'true');
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
      
      // Save to localStorage for persistence
      localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
      console.log('Profile completion updated:', newCompletion);
      
      return newCompletion;
    });
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token || !user) return false;
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/refresh-user-data`, {
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

  const value = {
    user,
    loading,
    profileCompletion,
    login,
    verifyMagicLink,
    checkEmailStatus,
    logout,
    updateProfileCompletion,
    refreshUserData,
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