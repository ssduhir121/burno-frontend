

// // src/page/admin/Login.jsx
// import React, { useState } from 'react';
// import { 
//   Shield, 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Briefcase,
//   Key,
//   CheckCircle
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const AdminLogin = () => {
//   const { login, verifyMagicLink, BACKEND_URL } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [magicLinkSent, setMagicLinkSent] = useState(false);
//   const [loginMethod, setLoginMethod] = useState('magic'); // 'magic' or 'password'

// const handleMagicLinkSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setIsLoading(true);

//   try {
//     // Check if this is an admin email
//     if (!email.endsWith('@gmail.com') && email !== 'admin@webconsultanthub.com') {
//       setError('Invalid admin email. Please use your admin email address.');
//       setIsLoading(false);
//       return;
//     }

//     // Use the login function from context
//     const result = await login(email, 'admin');
    
//     if (result.success) {
//       setMagicLinkSent(true);
//       // Store email for resend functionality
//       localStorage.setItem('admin_email', email);
//     } else {
//       setError(result.message || 'Failed to send magic link');
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     setError('Network error. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       // For development only - in production, this should be a real API call
//       if (process.env.NODE_ENV === 'development') {
//         // Simulate API call for development
//         setTimeout(() => {
//           if (email === 'admin@webconsultanthub.com' && password === 'Admin123!') {
//             // Mock successful login
//             localStorage.setItem('auth_token', 'dev-token-123');
//             localStorage.setItem('user_data', JSON.stringify({
//               id: 1,
//               email: 'admin@webconsultanthub.com',
//               role: 'admin',
//               isVerified: true,
//               hasProfile: true
//             }));
//             window.location.href = '/admin/dashboard';
//           } else {
//             setError('Invalid email or password. Please try again.');
//           }
//           setIsLoading(false);
//         }, 1500);
//       } else {
//         // In production, you'd need to add a password login endpoint for admin
//         setError('Password login is disabled. Please use magic link.');
//         setIsLoading(false);
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   const handleResendMagicLink = async () => {
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           email, 
//           userType: 'admin' 
//         })
//       });
      
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         // Show success message briefly
//         setError('');
//       } else {
//         setError(data.error || 'Failed to resend magic link');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // If magic link was sent, show success message
//   if (magicLinkSent) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
//         <Header />
//         <main className="flex-grow flex items-center justify-center p-4">
//           <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="w-10 h-10 text-green-600" />
//             </div>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            
//             <p className="text-gray-600 mb-6">
//               We've sent a magic link to <strong>{email}</strong>
//             </p>
            
//             <p className="text-sm text-gray-500 mb-6">
//               Click the link in the email to sign in securely. The link will expire in 15 minutes.
//             </p>
            
//             <button
//               onClick={handleResendMagicLink}
//               disabled={isLoading}
//               className="text-blue-600 hover:text-blue-700 font-medium mb-4 disabled:opacity-50"
//             >
//               {isLoading ? 'Sending...' : 'Resend Magic Link'}
//             </button>
            
//             <button
//               onClick={() => setMagicLinkSent(false)}
//               className="block w-full text-center text-gray-600 hover:text-gray-900"
//             >
//               ← Try another email
//             </button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
//       <Header />
      
//       <main className="flex-grow flex items-center justify-center p-4">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
//         </div>

//         {/* Login Container */}
//         <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
//           <div className="flex flex-col lg:flex-row">
            
//             {/* Left Side - Branding & Features */}
//             <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-12 text-white hidden lg:block">
//               <div className="h-full flex flex-col">
//                 {/* Logo */}
//                 <div className="flex items-center space-x-3 mb-12">
//                   <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
//                     <Briefcase className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <span className="text-2xl font-bold">Web Consultant Hub</span>
//                     <span className="block text-sm text-blue-200">Admin Portal</span>
//                   </div>
//                 </div>

//                 {/* Admin Illustration */}
//                 <div className="flex-1 flex flex-col justify-center">
//                   <div className="mb-8">
//                     <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm mb-6">
//                       <Shield className="w-4 h-4 mr-2" />
//                       Secure Admin Access
//                     </div>
//                     <h1 className="text-4xl font-bold mb-4">Welcome Back, Admin</h1>
//                     <p className="text-blue-100 text-lg mb-8">
//                       Manage consultants, clients, and matches all in one place. Your centralized hub for platform administration.
//                     </p>
//                   </div>

//                   {/* Admin Features List */}
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-white/20 p-2 rounded-lg">
//                         <Shield className="w-5 h-5" />
//                       </div>
//                       <span>Consultant verification & management</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-white/20 p-2 rounded-lg">
//                         <Key className="w-5 h-5" />
//                       </div>
//                       <span>Client request approval system</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-white/20 p-2 rounded-lg">
//                         <Lock className="w-5 h-5" />
//                       </div>
//                       <span>Match validation & introduction</span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-white/20 p-2 rounded-lg">
//                         <Eye className="w-5 h-5" />
//                       </div>
//                       <span>Real-time platform analytics</span>
//                     </div>
//                   </div>

//                   {/* Security Badge */}
//                   <div className="mt-12 flex items-center space-x-2 text-blue-200 text-sm">
//                     <Shield className="w-4 h-4" />
//                     <span>256-bit SSL Encrypted Connection</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Login Form */}
//             <div className="lg:w-1/2 bg-white p-8 lg:p-12">
//               <div className="max-w-md mx-auto">
                
//                 {/* Mobile Logo */}
//                 <div className="lg:hidden flex items-center space-x-3 mb-8">
//                   <div className="bg-blue-600 p-3 rounded-xl">
//                     <Briefcase className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
//                     <span className="block text-sm text-gray-600">Admin Portal</span>
//                   </div>
//                 </div>

//                 {/* Header */}
//                 <div className="mb-8">
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
//                   <p className="text-gray-600">
//                     {loginMethod === 'magic' 
//                       ? 'Enter your email to receive a magic link' 
//                       : 'Enter your credentials to access the admin dashboard'}
//                   </p>
//                 </div>

//                 {/* Login Method Toggle */}
//                 <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setLoginMethod('magic')}
//                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
//                       loginMethod === 'magic' 
//                         ? 'bg-white text-blue-600 shadow' 
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     Magic Link
//                   </button>
//                   <button
//                     onClick={() => setLoginMethod('password')}
//                     className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
//                       loginMethod === 'password' 
//                         ? 'bg-white text-blue-600 shadow' 
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     Password (Dev Only)
//                   </button>
//                 </div>

//                 {/* Error Alert */}
//                 {error && (
//                   <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//                     <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm">{error}</span>
//                   </div>
//                 )}

//                 {/* Login Form */}
//                 <form onSubmit={loginMethod === 'magic' ? handleMagicLinkSubmit : handlePasswordSubmit} className="space-y-6">
//                   {/* Email Field */}
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Admin Email
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
//                         placeholder="admin@webconsultanthub.com"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field (only for password login) */}
//                   {loginMethod === 'password' && (
//                     <div>
//                       <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <Lock className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           id="password"
//                           type={showPassword ? 'text' : 'password'}
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
//                           placeholder="••••••••"
//                           required
//                           disabled={isLoading}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                           ) : (
//                             <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Remember Me & Forgot Password (only for password login) */}
//                   {loginMethod === 'password' && (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <input
//                           id="remember-me"
//                           type="checkbox"
//                           checked={rememberMe}
//                           onChange={(e) => setRememberMe(e.target.checked)}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="text-sm">
//                         <a href="/admin/forgot-password" className="text-blue-600 hover:text-blue-500 font-medium">
//                           Forgot password?
//                         </a>
//                       </div>
//                     </div>
//                   )}

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         {loginMethod === 'magic' ? 'Sending...' : 'Verifying...'}
//                       </>
//                     ) : (
//                       <>
//                         {loginMethod === 'magic' ? 'Send Magic Link' : 'Access Dashboard'}
//                         <ArrowRight className="w-5 h-5 ml-2" />
//                       </>
//                     )}
//                   </button>

//                   {/* Security Note */}
//                   <p className="text-xs text-gray-500 text-center mt-4">
//                     This area is restricted to authorized administrators only. 
//                     All access attempts are logged and monitored.
//                   </p>
//                 </form>

//                 {/* Magic Link Info (only for magic login) */}
//                 {loginMethod === 'magic' && (
//                   <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                     <p className="text-sm text-blue-800 flex items-start">
//                       <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
//                       <span>
//                         We'll send a one-time login link to your email. 
//                         No password needed - it's more secure!
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Demo Credentials (Development only) */}
//                 {process.env.NODE_ENV === 'development' && (
//                   <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                     <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials (Dev Only):</p>
//                     <p className="text-xs text-gray-600">Email: admin@webconsultanthub.com</p>
//                     <p className="text-xs text-gray-600">Password: Admin123! (password mode only)</p>
//                     <p className="text-xs text-gray-500 mt-2">In production, use magic link for better security</p>
//                   </div>
//                 )}

//                 {/* Back to Home */}
//                 <div className="mt-6 text-center">
//                   <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
//                     ← Back to Homepage
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       {/* Add animation styles */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminLogin;



// src/page/admin/Login.jsx
import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  ArrowRight,
  AlertCircle,
  Briefcase,
  Key,
  Eye,
  CheckCircle,
  Lock  // Add Lock back since it's used in the features list
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const AdminLogin = () => {
  const { login, BACKEND_URL } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check if this is an admin email
      if (!email.endsWith('@gmail.com') && email !== 'admin@webconsultanthub.com') {
        setError('Invalid admin email. Please use your admin email address.');
        setIsLoading(false);
        return;
      }

      // Use the login function from context
      const result = await login(email, 'admin');
      
      if (result.success) {
        setMagicLinkSent(true);
        // Store email for resend functionality
        localStorage.setItem('admin_email', email);
      } else {
        setError(result.message || 'Failed to send magic link');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendMagicLink = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          userType: 'admin' 
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Show success message briefly
        setError('');
      } else {
        setError(data.error || 'Failed to resend magic link');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If magic link was sent, show success message
  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        {/* Login Container */}
        <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side - Branding & Features */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-12 text-white hidden lg:block">
              <div className="h-full flex flex-col">
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-12">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">Web Consultant Hub</span>
                    <span className="block text-sm text-blue-200">Admin Portal</span>
                  </div>
                </div>

                {/* Admin Illustration */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm mb-6">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure Admin Access
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Welcome Back, Admin</h1>
                    <p className="text-blue-100 text-lg mb-8">
                      Manage consultants, clients, and matches all in one place. Your centralized hub for platform administration.
                    </p>
                  </div>

                  {/* Admin Features List */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span>Consultant verification & management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Key className="w-5 h-5" />
                      </div>
                      <span>Client request approval system</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Lock className="w-5 h-5" />
                      </div>
                      <span>Match validation & introduction</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span>Real-time platform analytics</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-12 flex items-center space-x-2 text-blue-200 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>256-bit SSL Encrypted Connection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 bg-white p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center space-x-3 mb-8">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
                    <span className="block text-sm text-gray-600">Admin Portal</span>
                  </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                  <p className="text-gray-600">
                    Enter your email to receive a secure magic link
                  </p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        placeholder="admin@webconsultanthub.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

                  {/* Security Note */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    This area is restricted to authorized administrators only. 
                    All access attempts are logged and monitored.
                  </p>
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

                {/* Back to Home */}
                <div className="mt-6 text-center">
                  <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
                    ← Back to Homepage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;