
// // src/page/client/LoginPage.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Building, 
//   Mail, 
//   Lock, 
//   ArrowRight,
//   AlertCircle,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const ClientLoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [magicLinkSent, setMagicLinkSent] = useState(false);

//   const handleMagicLinkLogin = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setError('Please enter your email');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const result = await login(email, 'client');
    
//     if (result.success) {
//       setMagicLinkSent(true);
//       navigate('/magic-link-sent', { state: { email } });
//     } else {
//       setError(result.message);
//     }
//     setIsLoading(false);
//   };

//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setError('Password login is disabled. Please use magic link.');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//       <Header />
      
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="max-w-md w-full">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center space-x-2">
//               <div className="bg-gray-900 p-3 rounded-xl">
//                 <Building className="w-8 h-8 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-gray-900">Web Consultant Hub</span>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
//             <p className="text-gray-600 mb-6">Sign in to your client account</p>

//             {error && (
//               <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//                 <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             {magicLinkSent ? (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Mail className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
//                 <p className="text-gray-600 mb-4">
//                   We've sent a magic link to <strong>{email}</strong>
//                 </p>
//                 <button
//                   onClick={() => setMagicLinkSent(false)}
//                   className="text-gray-900 hover:text-black font-medium"
//                 >
//                   Try another email
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* Magic Link Form (Primary) */}
//                 <form onSubmit={handleMagicLinkLogin} className="mb-6">
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                         placeholder="company@example.com"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition duration-300 font-medium flex items-center justify-center disabled:opacity-50"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         Send Magic Link
//                         <ArrowRight className="w-5 h-5 ml-2" />
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 {/* Divider */}
//                 <div className="relative mb-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">Or sign in with password</span>
//                   </div>
//                 </div>

//                 {/* Password Form (Secondary) */}
//                 <form onSubmit={handlePasswordLogin}>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                         placeholder="••••••••"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-5 h-5 text-gray-400" />
//                         ) : (
//                           <Eye className="w-5 h-5 text-gray-400" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center">
//                       <input
//                         id="remember"
//                         type="checkbox"
//                         className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
//                       />
//                       <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
//                         Remember me
//                       </label>
//                     </div>
//                     <a href="/client/forgot-password" className="text-sm text-gray-900 hover:text-black font-medium">
//                       Forgot password?
//                     </a>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-300 font-medium"
//                   >
//                     Sign in with Password
//                   </button>
//                 </form>

//                 {/* Demo Account Note */}
//                 <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs text-gray-600">
//                     <span className="font-medium">Demo Client:</span> client@demo.com
//                   </p>
//                 </div>
//               </>
//             )}

//             <p className="mt-6 text-center text-sm text-gray-600">
//               Don't have a client account?{' '}
//               <Link to="/client/signup" className="text-gray-900 hover:text-black font-medium">
//                 Register your company
//               </Link>
//             </p>

//             <div className="mt-4 text-center">
//               <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
//                 ← Back to Home
//               </Link>
//             </div>
//           </div>

//           {/* Security Note */}
//           <p className="mt-4 text-xs text-center text-gray-500">
//             By signing in, you agree to our Terms of Service and Privacy Policy.
//             All client accounts are free and include admin-managed matching.
//           </p>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ClientLoginPage;



// src/page/client/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building, 
  Mail, 
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ClientLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await login(email, 'client');
    
    if (result.success) {
      setMagicLinkSent(true);
    } else {
      setError(result.message || 'Failed to send magic link');
    }
    setIsLoading(false);
  };

  const handleResendMagicLink = async () => {
    setIsLoading(true);
    setError('');
    
    const result = await login(email, 'client');
    
    if (result.success) {
      // Show success message briefly
      setError('');
    } else {
      setError(result.message || 'Failed to resend magic link');
    }
    setIsLoading(false);
  };

  // If magic link was sent, show success message
  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a magic link to <strong>{email}</strong>
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to sign in securely. The link will expire in 15 minutes.
            </p>
            
            <button
              onClick={handleResendMagicLink}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-700 font-medium mb-4 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Resend Magic Link'}
            </button>
            
            <button
              onClick={() => setMagicLinkSent(false)}
              className="block w-full text-center text-gray-600 hover:text-gray-900"
            >
              ← Try another email
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="bg-gray-900 p-3 rounded-xl">
                <Building className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Web Consultant Hub</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600 mb-6">Sign in to your client account</p>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Magic Link Form */}
            <form onSubmit={handleMagicLinkLogin} className="mb-6">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="company@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition duration-300 font-medium flex items-center justify-center disabled:opacity-50"
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

            {/* Magic Link Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  We'll send a one-time login link to your email. 
                  No password needed - it's more secure!
                </span>
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have a client account?{' '}
              <Link to="/client/signup" className="text-gray-900 hover:text-black font-medium">
                Register your company
              </Link>
            </p>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* Security Note */}
          <p className="mt-4 text-xs text-center text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            All client accounts are free and include admin-managed matching.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientLoginPage;