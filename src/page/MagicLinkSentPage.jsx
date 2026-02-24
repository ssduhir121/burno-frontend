// // src/page/MagicLinkSentPage.jsx
// import React, { useEffect, useState } from 'react';
// import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const MagicLinkSentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { verifyMagicLink } = useAuth();
//   const [verifying, setVerifying] = useState(false);
//   const [error, setError] = useState('');
//   const [countdown, setCountdown] = useState(60);
  
//   const email = location.state?.email || new URLSearchParams(location.search).get('email') || 'your email';
//   const userType = location.state?.userType || new URLSearchParams(location.search).get('type') || 'consultant';

//   // Check for token in URL (when user clicks magic link)
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get('token');
//     const emailFromUrl = params.get('email');
//     const typeFromUrl = params.get('type');

//     if (token) {
//       setVerifying(true);
//       verifyMagicLink(token, emailFromUrl || email, typeFromUrl || userType)
//         .then(result => {
//           if (result.success) {
//             console.log('Verification successful, redirecting to:', result.redirectTo);
//             // Use navigate instead of window.location for better SPA routing
//             navigate(result.redirectTo, { replace: true });
//           } else {
//             setError(result.message || 'Invalid or expired link');
//             setVerifying(false);
//           }
//         })
//         .catch(err => {
//           console.error('Verification error:', err);
//           setError('Verification failed. Please try again.');
//           setVerifying(false);
//         });
//     }
//   }, [location, navigate, verifyMagicLink, email, userType]);

//   // Countdown for resend
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleResend = async () => {
//     if (countdown > 0) return;
    
//     setVerifying(true);
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/send-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, userType })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         setCountdown(60);
//         setError('');
//       } else {
//         setError(data.error || 'Failed to resend');
//       }
//     } catch (err) {
//       setError('Network error');
//     }
//     setVerifying(false);
//   };

//   if (verifying) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your link...</h2>
//           <p className="text-gray-600">Please wait while we log you in.</p>
//         </div>
//       </div>
//     );
//   }

//   // If there's no token in URL, show the "check your email" message
//   if (!new URLSearchParams(location.search).get('token')) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Mail className="w-10 h-10 text-blue-600" />
//             </div>
            
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
            
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//               <div className="flex items-start">
//                 <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-green-700 text-left">
//                   We've sent a magic link to <strong>{email}</strong>
//                 </p>
//               </div>
//             </div>
            
//             <p className="text-gray-600 mb-8">
//               Click the link in the email to sign in instantly. The link will expire in 15 minutes.
//             </p>
            
//             <div className="space-y-4">
//               <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
//                 <p className="font-medium mb-2">📧 Didn't receive the email?</p>
//                 <p>Check your spam folder or click below to resend.</p>
//               </div>
              
//               <button
//                 onClick={handleResend}
//                 disabled={countdown > 0}
//                 className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
//               >
//                 Resend Magic Link {countdown > 0 && `(${countdown}s)`}
//               </button>
              
//               <Link
//                 to="/"
//                 className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If there's an error
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <AlertCircle className="w-10 h-10 text-red-600" />
//           </div>
          
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Link Expired or Invalid</h1>
          
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-sm text-red-700">{error || 'The magic link is invalid or has expired.'}</p>
//           </div>
          
//           <div className="space-y-4">
//             <button
//               onClick={handleResend}
//               disabled={countdown > 0}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center disabled:opacity-50"
//             >
//               <RefreshCw className="w-5 h-5 mr-2" />
//               Request New Magic Link {countdown > 0 && `(${countdown}s)`}
//             </button>
            
//             <Link
//               to="/"
//               className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MagicLinkSentPage;


// src/page/MagicLinkSentPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const MagicLinkSentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyMagicLink } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const verificationAttempted = useRef(false); // Track if we've already attempted verification
  
  const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';
  const userType = location.state?.userType || new URLSearchParams(location.search).get('type') || '';

  // Check for token in URL (when user clicks magic link)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const emailFromUrl = params.get('email');
    const typeFromUrl = params.get('type');

    console.log('MagicLinkPage - URL params:', { 
      token: token ? token.substring(0, 10) + '...' : 'none', 
      email: emailFromUrl || email, 
      type: typeFromUrl || userType 
    });

    // Only verify if:
    // 1. There's a token in the URL
    // 2. We haven't already attempted verification
    // 3. We're not already verifying
    if (token && !verificationAttempted.current && !verifying) {
      verificationAttempted.current = true; // Mark as attempted immediately
      setVerifying(true);
      
      console.log('Starting verification...');
      
      verifyMagicLink(token, emailFromUrl || email, typeFromUrl || userType)
        .then(result => {
          console.log('Verification result:', result);
          
          if (result.success) {
            console.log('✅ Verification successful, redirecting to:', result.redirectTo);
            // Navigate to the appropriate dashboard
            navigate(result.redirectTo, { replace: true });
          } else {
            console.error('❌ Verification failed:', result.message);
            setError(result.message || 'Invalid or expired link');
            setVerifying(false);
            // Allow retry on failure
            verificationAttempted.current = false;
          }
        })
        .catch(err => {
          console.error('❌ Verification error:', err);
          setError('Verification failed. Please try again.');
          setVerifying(false);
          // Allow retry on error
          verificationAttempted.current = false;
        });
    } else if (token && verificationAttempted.current) {
      console.log('Verification already attempted, skipping...');
    } else if (!token) {
      console.log('No token in URL, showing check email screen');
    }
  }, [location.search]); // Only depend on search params, not the whole location

  // Countdown for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setVerifying(true);
    setError('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCountdown(60);
        // Reset verification state for new token
        verificationAttempted.current = false;
        console.log('✅ Magic link resent successfully');
      } else {
        setError(data.error || 'Failed to resend');
      }
    } catch (err) {
      setError('Network error');
    }
    setVerifying(false);
  };

  // If there's an error and we're not verifying, show error state
  if (error && !verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Link Expired or Invalid</h1>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center disabled:opacity-50"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Request New Magic Link {countdown > 0 && `(${countdown}s)`}
              </button>
              
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your link...</h2>
          <p className="text-gray-600">Please wait while we log you in.</p>
        </div>
      </div>
    );
  }

  // If there's no token in URL, show the "check your email" message
  if (!new URLSearchParams(location.search).get('token')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h1>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700 text-left">
                  We've sent a magic link to <strong>{email}</strong>
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              Click the link in the email to sign in instantly. The link will expire in 15 minutes.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium mb-2">📧 Didn't receive the email?</p>
                <p>Check your spam folder or click below to resend.</p>
              </div>
              
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
              >
                Resend Magic Link {countdown > 0 && `(${countdown}s)`}
              </button>
              
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading state (should rarely hit this)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing...</h2>
      </div>
    </div>
  );
};

export default MagicLinkSentPage;