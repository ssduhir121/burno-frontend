// // src/page/auth/LoginPage.jsx - Updated to handle admin role
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Briefcase, 
//   Building,
//   Shield,
//   Mail, 
//   ArrowRight,
//   AlertCircle,
//   CheckCircle,
//   Loader2
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { initiateAuth, checkEmailStatus } = useAuth();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [magicLinkSent, setMagicLinkSent] = useState(false);
//   const [sentEmail, setSentEmail] = useState('');
//   const [emailStatus, setEmailStatus] = useState(null);
//   const [checkingEmail, setCheckingEmail] = useState(false);

//   // Debounce email check
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (email && email.includes('@') && email.includes('.')) {
//         setCheckingEmail(true);
//         try {
//           const result = await checkEmailStatus(email);
//           setEmailStatus(result);
          
//           // Clear error if email exists and role matches (admin is allowed)
//           if (result.exists) {
//             setError('');
//           }
//         } catch (err) {
//           console.error('Error checking email:', err);
//         } finally {
//           setCheckingEmail(false);
//         }
//       } else {
//         setEmailStatus(null);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [email, checkEmailStatus]);

//   // Get role display name and icon
//   const getRoleDisplay = (role) => {
//     switch(role) {
//       case 'admin':
//         return { name: 'Administrator', icon: <Shield className="w-4 h-4 mr-1" />, color: 'purple' };
//       case 'consultant':
//         return { name: 'Consultant', icon: <Briefcase className="w-4 h-4 mr-1" />, color: 'blue' };
//       case 'client':
//         return { name: 'Client', icon: <Building className="w-4 h-4 mr-1" />, color: 'gray' };
//       default:
//         return { name: role, icon: null, color: 'gray' };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }

//     if (!email.includes('@') || !email.includes('.')) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     // Check if email exists
//     if (!emailStatus?.exists) {
//       setError('No account found with this email. Please sign up first.');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     // Use the detected role from email status
//     const result = await initiateAuth(email, emailStatus.role);
    
//     if (result.success) {
//       setSentEmail(email);
//       setMagicLinkSent(true);
//     } else {
//       setError(result.message || 'Failed to send magic link');
//     }
//     setIsLoading(false);
//   };

//   const handleResendMagicLink = async () => {
//     setIsLoading(true);
//     setError('');
    
//     const result = await initiateAuth(sentEmail, emailStatus.role);
    
//     if (!result.success) {
//       setError(result.message || 'Failed to resend magic link');
//     }
//     setIsLoading(false);
//   };

//   // Get email message
//   const getEmailMessage = () => {
//     if (!email || !email.includes('@')) return null;
    
//     if (checkingEmail) {
//       return (
//         <p className="mt-2 text-sm text-gray-500 flex items-center">
//           <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//           Checking...
//         </p>
//       );
//     }
    
//     if (emailStatus?.exists) {
//       const roleInfo = getRoleDisplay(emailStatus.role);
//       return (
//         <p className={`mt-2 text-sm text-${roleInfo.color}-600 flex items-center`}>
//           <CheckCircle className="w-4 h-4 mr-1" />
//           Found your {roleInfo.name} account! Continue to sign in.
//         </p>
//       );
//     }
    
//     if (email && !emailStatus?.exists && !checkingEmail) {
//       return (
//         <p className="mt-2 text-sm text-orange-600 flex items-center">
//           <AlertCircle className="w-4 h-4 mr-1" />
//           No account found. Please sign up first.
//         </p>
//       );
//     }
    
//     return null;
//   };

//   // If magic link was sent, show success message
//   if (magicLinkSent) {
//     const roleInfo = emailStatus ? getRoleDisplay(emailStatus.role) : { name: 'Account' };
    
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//         <Header />
//         <main className="flex-grow flex items-center justify-center p-4">
//           <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Mail className="w-10 h-10 text-green-600" />
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            
//             <p className="text-gray-600 mb-6">
//               We've sent a magic link to <strong>{sentEmail}</strong>
//             </p>
            
//             <p className="text-sm text-gray-500 mb-6">
//               Click the link in the email to sign in to your {roleInfo.name} account. 
//               The link will expire in 15 minutes.
//             </p>
            
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}
            
//             <p className="text-sm text-gray-600 mb-4">
//               Didn't receive the email? Check your spam folder or{' '}
//               <button
//                 onClick={handleResendMagicLink}
//                 disabled={isLoading}
//                 className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
//               >
//                 {isLoading ? 'Sending...' : 'click here to resend'}
//               </button>
//             </p>
            
//             <button
//               onClick={() => {
//                 setMagicLinkSent(false);
//                 setEmail('');
//                 setSentEmail('');
//                 setEmailStatus(null);
//               }}
//               className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
//             >
//               ← Try another email
//             </button>
            
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//       <Header />
      
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center space-x-2">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-gray-900">Web Consultant Hub</span>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//             <p className="text-gray-600 mb-6">
//               Sign in to your account using magic link
//             </p>

//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//                 <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             {/* Email Input Form */}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     placeholder="you@example.com"
//                     required
//                     disabled={isLoading}
//                     autoFocus
//                   />
//                   {checkingEmail && (
//                     <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
//                   )}
//                 </div>
//                 {getEmailMessage()}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading || (email && emailStatus && !emailStatus.exists)}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Continue
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Magic Link Info */}
//             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-sm text-blue-800 flex items-start">
//                 <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
//                 <span>
//                   We'll send a one-time login link to your email. No password needed!
//                 </span>
//               </p>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>

//             <div className="mt-4 text-center">
//               <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
//                 ← Back to Home
//               </a>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;




// src/components/auth/LoginModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building,
  Shield,
  Mail, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { initiateAuth, checkEmailStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setEmail('');
      setError('');
      setIsLoading(false);
      setMagicLinkSent(false);
      setSentEmail('');
      setEmailStatus(null);
      setCheckingEmail(false);
    }
  }, [isOpen]);

  // Debounce email check
  useEffect(() => {
    if (!isOpen) return;
    
    const delayDebounceFn = setTimeout(async () => {
      if (email && email.includes('@') && email.includes('.')) {
        setCheckingEmail(true);
        try {
          const result = await checkEmailStatus(email);
          setEmailStatus(result);
          
          if (result.exists) {
            setError('');
          }
        } catch (err) {
          console.error('Error checking email:', err);
        } finally {
          setCheckingEmail(false);
        }
      } else {
        setEmailStatus(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email, checkEmailStatus, isOpen]);

  // Get role display name and icon
  const getRoleDisplay = (role) => {
    switch(role) {
      case 'admin':
        return { name: 'Administrator', icon: <Shield className="w-4 h-4 mr-1" />, color: 'purple' };
      case 'consultant':
        return { name: 'Consultant', icon: <Briefcase className="w-4 h-4 mr-1" />, color: 'blue' };
      case 'client':
        return { name: 'Client', icon: <Building className="w-4 h-4 mr-1" />, color: 'gray' };
      default:
        return { name: role, icon: null, color: 'gray' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!emailStatus?.exists) {
      setError('No account found with this email. Please sign up first.');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await initiateAuth(email, emailStatus.role);
    
    if (result.success) {
      setSentEmail(email);
      setMagicLinkSent(true);
    } else {
      setError(result.message || 'Failed to send magic link');
    }
    setIsLoading(false);
  };

  const handleResendMagicLink = async () => {
    setIsLoading(true);
    setError('');
    
    const result = await initiateAuth(sentEmail, emailStatus.role);
    
    if (!result.success) {
      setError(result.message || 'Failed to resend magic link');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSignupClick = () => {
    onClose();
    // You can navigate to signup or open signup modal
    // For now, we'll just close and let parent handle navigation
    if (onSuccess) {
      onSuccess('signup');
    }
  };

  const getEmailMessage = () => {
    if (!email || !email.includes('@')) return null;
    
    if (checkingEmail) {
      return (
        <p className="mt-2 text-sm text-gray-500 flex items-center">
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          Checking...
        </p>
      );
    }
    
    if (emailStatus?.exists) {
      const roleInfo = getRoleDisplay(emailStatus.role);
      return (
        <p className={`mt-2 text-sm text-${roleInfo.color}-600 flex items-center`}>
          <CheckCircle className="w-4 h-4 mr-1" />
          Found your {roleInfo.name} account! Continue to sign in.
        </p>
      );
    }
    
    if (email && !emailStatus?.exists && !checkingEmail) {
      return (
        <p className="mt-2 text-sm text-orange-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          No account found. Please sign up first.
        </p>
      );
    }
    
    return null;
  };

  if (!isOpen) return null;

  // Magic link sent view
  if (magicLinkSent) {
    const roleInfo = emailStatus ? getRoleDisplay(emailStatus.role) : { name: 'Account' };
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              
              <p className="text-gray-600 mb-6">
                We've sent a magic link to <strong>{sentEmail}</strong>
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                Click the link in the email to sign in to your {roleInfo.name} account. 
                The link will expire in 15 minutes.
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mb-4">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResendMagicLink}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'click here to resend'}
                </button>
              </p>
              
              <button
                onClick={() => {
                  setMagicLinkSent(false);
                  setEmail('');
                  setSentEmail('');
                  setEmailStatus(null);
                }}
                className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
              >
                ← Try another email
              </button>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={handleSignupClick}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login form view
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account using magic link</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  autoFocus
                />
                {checkingEmail && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                )}
              </div>
              {getEmailMessage()}
            </div>

            <button
              type="submit"
              disabled={isLoading || (email && emailStatus && !emailStatus.exists)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 flex items-start">
              <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                We'll send a one-time login link to your email. No password needed!
              </span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={handleSignupClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;