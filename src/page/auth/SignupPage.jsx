// // src/page/auth/SignupPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Briefcase, 
//   Building,
//   Mail, 
//   ArrowRight,
//   AlertCircle,
//   CheckCircle,
//   Loader2
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const { initiateAuth, checkEmailStatus } = useAuth();
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [magicLinkSent, setMagicLinkSent] = useState(false);
//   const [sentEmail, setSentEmail] = useState('');
//   const [emailExists, setEmailExists] = useState(null);
//   const [checkingEmail, setCheckingEmail] = useState(false);

//   // Debounce email check
//   React.useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (email && email.includes('@') && email.includes('.')) {
//         setCheckingEmail(true);
//         try {
//           const result = await checkEmailStatus(email);
//           setEmailExists(result.exists);
          
//           // If email already exists, show error
//           if (result.exists) {
//             setError(`An account already exists with this email. Please ${result.role === selectedRole ? 'login' : 'use the correct signup type'}.`);
//           } else {
//             setError('');
//           }
//         } catch (err) {
//           console.error('Error checking email:', err);
//         } finally {
//           setCheckingEmail(false);
//         }
//       } else {
//         setEmailExists(null);
//         setError('');
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [email, checkEmailStatus, selectedRole]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedRole) {
//       setError('Please select whether you are a Consultant or Client');
//       return;
//     }

//     if (!email) {
//       setError('Please enter your email address');
//       return;
//     }

//     if (!email.includes('@') || !email.includes('.')) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     if (emailExists) {
//       setError('An account already exists with this email. Please login instead.');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const result = await initiateAuth(email, selectedRole);
    
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
    
//     const result = await initiateAuth(sentEmail, selectedRole);
    
//     if (!result.success) {
//       setError(result.message || 'Failed to resend magic link');
//     }
//     setIsLoading(false);
//   };

//   // If magic link was sent, show success message
//   if (magicLinkSent) {
//     const roleDisplay = selectedRole === 'consultant' ? 'Consultant' : 'Client';
    
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
//               Click the link in the email to verify your {roleDisplay} account and get started. 
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
            
//             <div className="mt-6 space-y-3">
//               <button
//                 onClick={() => {
//                   setMagicLinkSent(false);
//                   setEmail('');
//                   setSentEmail('');
//                   setEmailExists(null);
//                 }}
//                 className="block w-full text-center text-gray-600 hover:text-gray-900"
//               >
//                 ← Try another email
//               </button>
              
//               <button
//                 onClick={() => navigate('/login')}
//                 className="block w-full text-center text-blue-600 hover:text-blue-700"
//               >
//                 Go to login page
//               </button>
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
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-gray-900">Web Consultant Hub</span>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
//             <p className="text-gray-600 mb-6">
//               Choose your role and enter your email to get started
//             </p>

//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//                 <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               {/* Role Selection */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   I am a: *
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setSelectedRole('consultant')}
//                     className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
//                       selectedRole === 'consultant'
//                         ? 'border-blue-600 bg-blue-50 text-blue-700'
//                         : 'border-gray-200 hover:border-blue-300 text-gray-600'
//                     }`}
//                   >
//                     <Briefcase className="w-5 h-5" />
//                     <span className="font-medium">Consultant</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedRole('client')}
//                     className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
//                       selectedRole === 'client'
//                         ? 'border-gray-900 bg-gray-50 text-gray-900'
//                         : 'border-gray-200 hover:border-gray-300 text-gray-600'
//                     }`}
//                   >
//                     <Building className="w-5 h-5" />
//                     <span className="font-medium">Client</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Email Input */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
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
//                 {email && !checkingEmail && !emailExists && email.includes('@') && (
//                   <p className="mt-2 text-sm text-blue-600 flex items-center">
//                     <CheckCircle className="w-4 h-4 mr-1" />
//                     This email is available. We'll create your account.
//                   </p>
//                 )}
//                 {email && emailExists && (
//                   <p className="mt-2 text-sm text-orange-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     An account already exists. Please login instead.
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading || !selectedRole || !email || emailExists}
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
//                     Send Magic Link
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
//                   We'll send a one-time login link to your email to verify your account. 
//                   No password needed - it's more secure!
//                 </span>
//               </p>
//             </div>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <button
//                   onClick={() => navigate('/login')}
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>

//             <div className="mt-4 text-center">
//               <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
//                 ← Back to Home
//               </a>
//             </div>
//           </div>

//           {/* Info Cards */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//               <div className="flex items-center space-x-3 mb-2">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <Briefcase className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900">For Consultants</h3>
//               </div>
//               <p className="text-sm text-gray-600">
//                 €99/year subscription. Create profile, set availability, get matched with projects.
//               </p>
//             </div>
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//               <div className="flex items-center space-x-3 mb-2">
//                 <div className="bg-gray-100 p-2 rounded-lg">
//                   <Building className="w-5 h-5 text-gray-700" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900">For Clients</h3>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Completely free! Post projects, get matched with vetted consultants.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SignupPage;




// src/components/auth/SignupModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building,
  Mail, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignupModal = ({ isOpen, onClose, onSuccess }) => {
  const { initiateAuth, checkEmailStatus } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [emailExists, setEmailExists] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedRole(null);
      setEmail('');
      setError('');
      setIsLoading(false);
      setMagicLinkSent(false);
      setSentEmail('');
      setEmailExists(null);
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
          setEmailExists(result.exists);
          
          if (result.exists) {
            setError(`An account already exists with this email. Please ${result.role === selectedRole ? 'login' : 'use the correct signup type'}.`);
          } else {
            setError('');
          }
        } catch (err) {
          console.error('Error checking email:', err);
        } finally {
          setCheckingEmail(false);
        }
      } else {
        setEmailExists(null);
        setError('');
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email, checkEmailStatus, selectedRole, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select whether you are a Consultant or Client');
      return;
    }

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (emailExists) {
      setError('An account already exists with this email. Please login instead.');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await initiateAuth(email, selectedRole);
    
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
    
    const result = await initiateAuth(sentEmail, selectedRole);
    
    if (!result.success) {
      setError(result.message || 'Failed to resend magic link');
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleLoginClick = () => {
    onClose();
    if (onSuccess) {
      onSuccess('login');
    }
  };

  if (!isOpen) return null;

  // Magic link sent view
  if (magicLinkSent) {
    const roleDisplay = selectedRole === 'consultant' ? 'Consultant' : 'Client';
    
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
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              
              <p className="text-gray-600 mb-6">
                We've sent a magic link to <strong>{sentEmail}</strong>
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                Click the link in the email to verify your {roleDisplay} account and get started. 
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
                  setEmailExists(null);
                }}
                className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
              >
                ← Try another email
              </button>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={handleLoginClick}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup form view
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
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600">Choose your role and enter your email to get started</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a: *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('consultant')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === 'consultant'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-600'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Consultant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('client')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === 'client'
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="font-medium">Client</span>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
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
              {email && !checkingEmail && !emailExists && email.includes('@') && (
                <p className="mt-2 text-sm text-blue-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  This email is available. We'll create your account.
                </p>
              )}
              {email && emailExists && (
                <p className="mt-2 text-sm text-orange-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  An account already exists. Please login instead.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedRole || !email || emailExists}
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
                  Send Magic Link
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 flex items-start">
              <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                We'll send a one-time login link to your email to verify your account. 
                No password needed - it's more secure!
              </span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleLoginClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
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

export default SignupModal;