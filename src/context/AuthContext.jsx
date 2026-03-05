// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for existing session on mount
//     const checkAuth = async () => {
//       const token = localStorage.getItem('auth_token');
//       const userData = localStorage.getItem('user_data');
      
//       if (token && userData) {
//         try {
//           // Verify token with backend
//           const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
          
//           if (response.ok) {
//             setUser(JSON.parse(userData));
//           } else {
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('user_data');
//           }
//         } catch (error) {
//           console.error('Auth verification error:', error);
//           localStorage.removeItem('auth_token');
//           localStorage.removeItem('user_data');
//         }
//       }
//       setLoading(false);
//     };
    
//     checkAuth();
//   }, []);

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
      
//       if (data.success && data.user) {
//         // Store auth data
//         localStorage.setItem('auth_token', data.token);
//         localStorage.setItem('user_data', JSON.stringify(data.user));
//         setUser(data.user);
        
//         // Determine redirect path
//         let redirectTo = '/';
//         if (data.user.role === 'admin') {
//           redirectTo = '/admin/dashboard';
//         } else if (data.user.role === 'consultant') {
//           redirectTo = data.user.hasProfile ? '/consultant/dashboard' : '/consultant/profile-setup';
//         } else if (data.user.role === 'client') {
//           redirectTo = data.user.hasProfile ? '/client/dashboard' : '/client/profile-setup';
//         }
        
//         return { 
//           success: true, 
//           user: data.user,
//           redirectTo: redirectTo
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
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('user_data');
//     setUser(null);
//     window.location.href = '/';
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     verifyMagicLink,
//     checkEmailStatus,
//     logout,
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




// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// // Remove: import { useNavigate } from 'react-router-dom';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileCompletion, setProfileCompletion] = useState({
//     basicInfo: false,
//     availability: false,
//     payment: false,
//     status: 'incomplete' // 'incomplete', 'partial', 'complete'
//   });
  
//   // Remove: const navigate = useNavigate();

//   useEffect(() => {
//     // Check for existing session on mount
//     const checkAuth = async () => {
//       const token = localStorage.getItem('auth_token');
//       const userData = localStorage.getItem('user_data');
      
//       if (token && userData) {
//         try {
//           // Verify token with backend
//           const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
          
//           if (response.ok) {
//             const parsedUser = JSON.parse(userData);
//             setUser(parsedUser);
            
//             // If user is logged in, check their profile completion status
//             if (parsedUser) {
//               await checkUserProfileCompletion(parsedUser.email, parsedUser.role);
//             }
//           } else {
//             // Token invalid, clear storage
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('user_data');
//           }
//         } catch (error) {
//           console.error('Auth verification error:', error);
//           localStorage.removeItem('auth_token');
//           localStorage.removeItem('user_data');
//         }
//       }
//       setLoading(false);
//     };
    
//     checkAuth();
//   }, []);

//   const checkUserProfileCompletion = async (email, role) => {
//     try {
//       if (role === 'consultant') {
//         // Fetch consultant profile data
//         const response = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${encodeURIComponent(email)}`);
        
//         if (response.ok) {
//           const data = await response.json();
          
//           if (data.success && data.data) {
//             const profile = data.data;
            
//             // Check profile completion
//             const basicInfoComplete = !!(
//               profile.fullName && 
//               profile.expertise && 
//               profile.yearsOfExperience
//             );
            
//             // For now, we'll consider availability and payment as false
//             // You can enhance this by fetching full profile later
//             const availabilityComplete = false;
//             const paymentComplete = false;
            
//             let status = 'incomplete';
//             if (basicInfoComplete && availabilityComplete && paymentComplete) {
//               status = 'complete';
//             } else if (basicInfoComplete) {
//               status = 'partial';
//             }
            
//             setProfileCompletion({
//               basicInfo: basicInfoComplete,
//               availability: availabilityComplete,
//               payment: paymentComplete,
//               status: status
//             });
//           }
//         }
//       } else if (role === 'client') {
//         // Fetch client profile data
//         const response = await fetch(`${BACKEND_URL}/api/get-client-signup-data?email=${encodeURIComponent(email)}`);
        
//         if (response.ok) {
//           const data = await response.json();
          
//           if (data.success && data.data) {
//             const profile = data.data;
            
//             // Check profile completion for client
//             const basicInfoComplete = !!(
//               profile.companyName && 
//               profile.contactName
//             );
            
//             setProfileCompletion({
//               basicInfo: basicInfoComplete,
//               status: basicInfoComplete ? 'complete' : 'incomplete'
//             });
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error checking profile completion:', error);
//     }
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
      
//       if (data.success && data.user) {
//         // Store auth data
//         localStorage.setItem('auth_token', data.token);
//         localStorage.setItem('user_data', JSON.stringify(data.user));
//         setUser(data.user);
        
//         // Check profile completion for the user
//         await checkUserProfileCompletion(data.user.email, data.user.role);
        
//         // Determine redirect path based on profile completion
//         let redirectTo = '/';
        
//         if (data.user.role === 'admin') {
//           redirectTo = '/admin/dashboard';
//         } 
//         else if (data.user.role === 'consultant') {
//           // Check if we have profile completion info from the backend
//           if (data.user.profileCompletion) {
//             const { basicInfo, availability, payment } = data.user.profileCompletion;
            
//             if (!basicInfo) {
//               redirectTo = '/consultant/profile-setup?step=basic';
//             } else if (!availability) {
//               redirectTo = '/consultant/profile-setup?step=availability';
//             } else if (!payment) {
//               redirectTo = '/consultant/subscription';
//             } else {
//               redirectTo = '/consultant/dashboard';
//             }
//           } else {
//             // Fallback to checking locally
//             const profileComplete = await checkLocalProfileCompletion(email, 'consultant');
            
//             if (!profileComplete.basicInfo) {
//               redirectTo = '/consultant/profile-setup?step=basic';
//             } else if (!profileComplete.availability) {
//               redirectTo = '/consultant/profile-setup?step=availability';
//             } else if (!profileComplete.payment) {
//               redirectTo = '/consultant/subscription';
//             } else {
//               redirectTo = '/consultant/dashboard';
//             }
//           }
//         } 
//         else if (data.user.role === 'client') {
//           redirectTo = data.user.hasProfile ? '/client/dashboard' : '/client/profile-setup';
//         }
        
//         return { 
//           success: true, 
//           user: data.user,
//           redirectTo: redirectTo
//         };
//       }
//       return { success: false, message: data.error || 'Invalid or expired token' };
//     } catch (error) {
//       console.error('Verification error:', error);
//       return { success: false, message: 'Verification failed. Please try again.' };
//     }
//   };

//   // Helper function to check profile completion locally if backend data not available
//   const checkLocalProfileCompletion = async (email, role) => {
//     const completion = {
//       basicInfo: false,
//       availability: false,
//       payment: false
//     };
    
//     try {
//       if (role === 'consultant') {
//         // Check localStorage for profile data
//         const signupData = localStorage.getItem('consultant_signup_data');
//         if (signupData) {
//           const data = JSON.parse(signupData);
//           completion.basicInfo = !!(data.fullName && data.expertise && data.yearsOfExperience);
//         }
        
//         // Check if they've completed availability (you might want to check actual backend)
//         const profileSetupComplete = localStorage.getItem('profile_setup_complete');
//         if (profileSetupComplete) {
//           completion.availability = true;
//         }
        
//         // Check subscription status from localStorage
//         const subscriptionComplete = localStorage.getItem('subscription_complete');
//         if (subscriptionComplete) {
//           completion.payment = true;
//         }
//       }
//     } catch (error) {
//       console.error('Error checking local profile:', error);
//     }
    
//     return completion;
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
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('user_data');
//     localStorage.removeItem('consultant_signup_data');
//     localStorage.removeItem('profile_setup_complete');
//     localStorage.removeItem('subscription_complete');
//     setUser(null);
//     setProfileCompletion({
//       basicInfo: false,
//       availability: false,
//       payment: false,
//       status: 'incomplete'
//     });
    
//     // Use window.location for navigation since we can't use useNavigate here
//     window.location.href = '/';
//   };

//   // Function to update profile completion status
//   const updateProfileCompletion = (step, completed = true) => {
//     setProfileCompletion(prev => {
//       const newCompletion = { ...prev };
      
//       if (step === 'basic') {
//         newCompletion.basicInfo = completed;
//         localStorage.setItem('profile_setup_complete', completed ? 'basic' : '');
//       } else if (step === 'availability') {
//         newCompletion.availability = completed;
//         if (completed) localStorage.setItem('profile_setup_complete', 'availability');
//       } else if (step === 'payment') {
//         newCompletion.payment = completed;
//         if (completed) localStorage.setItem('subscription_complete', 'true');
//       }
      
//       // Update overall status
//       if (newCompletion.basicInfo && newCompletion.availability && newCompletion.payment) {
//         newCompletion.status = 'complete';
//       } else if (newCompletion.basicInfo) {
//         newCompletion.status = 'partial';
//       } else {
//         newCompletion.status = 'incomplete';
//       }
      
//       return newCompletion;
//     });
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

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            // First try to load from saved profile_completion
            const savedCompletion = localStorage.getItem('profile_completion');
            if (savedCompletion) {
              const parsed = JSON.parse(savedCompletion);
              setProfileCompletion(parsed);
              console.log('Loaded profile completion from localStorage:', parsed);
            } else {
              // Fallback to loading from individual items
              loadProfileCompletionFromStorage();
            }
            
            // Then check with backend (but don't override localStorage values)
            await checkUserProfileCompletion(parsedUser.email, parsedUser.role);
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('profile_completion');
          }
        } catch (error) {
          console.error('Auth verification error:', error);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const loadProfileCompletionFromStorage = () => {
    // Check from various localStorage items
    const availabilityComplete = localStorage.getItem('profile_setup_complete') === 'availability' || 
                                 localStorage.getItem('consultant_availability') !== null;
    
    const paymentComplete = localStorage.getItem('subscription_complete') === 'true';
    
    // Check if basic info is complete from signup data
    const signupData = localStorage.getItem('consultant_signup_data');
    let basicInfo = false;
    if (signupData) {
      try {
        const data = JSON.parse(signupData);
        // Check for jobTitle or expertise for backward compatibility
        basicInfo = !!(data.fullName && (data.jobTitle || data.expertise) && data.yearsOfExperience);
      } catch (e) {
        console.error('Error parsing signup data:', e);
      }
    }

    // Also check if basic profile was completed
    const basicComplete = localStorage.getItem('consultant_basic_complete') === 'true';
    
    const newCompletion = {
      basicInfo: basicInfo || basicComplete,
      availability: availabilityComplete,
      payment: paymentComplete,
      status: 'incomplete'
    };

    if ((basicInfo || basicComplete) && availabilityComplete && paymentComplete) {
      newCompletion.status = 'complete';
    } else if (basicInfo || basicComplete) {
      newCompletion.status = 'partial';
    }

    setProfileCompletion(newCompletion);
    localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
    console.log('Loaded profile completion from storage:', newCompletion);
  };

  const checkUserProfileCompletion = async (email, role) => {
    try {
      if (role === 'consultant') {
        const response = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${encodeURIComponent(email)}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.data) {
            const profile = data.data;
            
            // Check basic info from backend - use jobTitle instead of expertise
            const basicInfoComplete = !!(
              profile.fullName && 
              (profile.jobTitle || profile.expertise) && 
              profile.yearsOfExperience
            );
            
            // Get availability and payment from localStorage (these are set during the flow)
            const availabilityComplete = localStorage.getItem('profile_setup_complete') === 'availability' || 
                                        localStorage.getItem('consultant_availability') !== null;
            
            const paymentComplete = localStorage.getItem('subscription_complete') === 'true';
            
            // Update basic info in localStorage if it's from backend
            if (basicInfoComplete && !localStorage.getItem('consultant_signup_data')) {
              localStorage.setItem('consultant_signup_data', JSON.stringify({
                fullName: profile.fullName,
                email: profile.email,
                jobTitle: profile.jobTitle || profile.expertise,
                yearsOfExperience: profile.yearsOfExperience
              }));
            }
            
            let status = 'incomplete';
            if (basicInfoComplete && availabilityComplete && paymentComplete) {
              status = 'complete';
            } else if (basicInfoComplete) {
              status = 'partial';
            }
            
            const newCompletion = {
              basicInfo: basicInfoComplete,
              availability: availabilityComplete,
              payment: paymentComplete,
              status: status
            };
            
            setProfileCompletion(newCompletion);
            
            // Save to localStorage for persistence
            localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
            console.log('Profile completion from backend:', newCompletion);
          }
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
    }
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
      
      if (data.success && data.user) {
        // Store auth data
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        setUser(data.user);
        
        // IMPORTANT: Check actual profile completion from the backend response
        // The backend returns profileCompletion in the user object
        let basicComplete = false;
        let availabilityComplete = false;
        let paymentComplete = false;
        
        if (data.user.profileCompletion) {
          basicComplete = data.user.profileCompletion.basicInfo || false;
          availabilityComplete = data.user.profileCompletion.availability || false;
          paymentComplete = data.user.profileCompletion.payment || false;
        }
        
        // Also check localStorage as backup
        const localBasicComplete = localStorage.getItem('consultant_signup_data') !== null;
        const localAvailabilityComplete = localStorage.getItem('profile_setup_complete') === 'availability' || 
                                         localStorage.getItem('consultant_availability') !== null;
        const localPaymentComplete = localStorage.getItem('subscription_complete') === 'true';
        
        // Combine both sources (backend takes precedence)
        const finalBasicComplete = basicComplete || localBasicComplete;
        const finalAvailabilityComplete = availabilityComplete || localAvailabilityComplete;
        const finalPaymentComplete = paymentComplete || localPaymentComplete;
        
        // Update profile completion state
        const newCompletion = {
          basicInfo: finalBasicComplete,
          availability: finalAvailabilityComplete,
          payment: finalPaymentComplete,
          status: 'incomplete'
        };
        
        if (finalBasicComplete && finalAvailabilityComplete && finalPaymentComplete) {
          newCompletion.status = 'complete';
        } else if (finalBasicComplete) {
          newCompletion.status = 'partial';
        }
        
        setProfileCompletion(newCompletion);
        localStorage.setItem('profile_completion', JSON.stringify(newCompletion));
        
        console.log('Profile completion after verification:', newCompletion);
        console.log('Backend data:', data.user.profileCompletion);
        console.log('LocalStorage:', {
          signup: localStorage.getItem('consultant_signup_data'),
          profile: localStorage.getItem('profile_setup_complete'),
          availability: localStorage.getItem('consultant_availability'),
          subscription: localStorage.getItem('subscription_complete')
        });
        
        // Determine redirect path based on actual completion
        let redirectTo = '/';
        
        if (data.user.role === 'admin') {
          redirectTo = '/admin/dashboard';
        } 
        else if (data.user.role === 'consultant') {
          if (!finalBasicComplete) {
            redirectTo = '/consultant/profile-setup?step=basic';
          } else if (!finalAvailabilityComplete) {
            redirectTo = '/consultant/profile-setup?step=availability';
          } else if (!finalPaymentComplete) {
            redirectTo = '/consultant/subscription';
          } else {
            redirectTo = '/consultant/dashboard';
          }
        } 
        else if (data.user.role === 'client') {
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
        }
      } else if (step === 'payment') {
        newCompletion.payment = completed;
        if (completed) {
          localStorage.setItem('subscription_complete', 'true');
          console.log('✅ Payment completion saved to localStorage');
          
          // Also update user_data in localStorage to persist payment status
          const storedUser = localStorage.getItem('user_data');
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              userData.profileCompletion = {
                ...userData.profileCompletion,
                payment: true
              };
              localStorage.setItem('user_data', JSON.stringify(userData));
              console.log('✅ Updated user_data with payment status');
            } catch (e) {
              console.error('Error updating user_data:', e);
            }
          }
        }
      }
      
      // Update overall status
      if (newCompletion.basicInfo && newCompletion.availability && newCompletion.payment) {
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

  const value = {
    user,
    loading,
    profileCompletion,
    login,
    verifyMagicLink,
    checkEmailStatus,
    logout,
    updateProfileCompletion,
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