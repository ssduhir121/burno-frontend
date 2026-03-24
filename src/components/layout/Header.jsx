
// // // src/components/Header.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Briefcase, Users, X, LogIn } from 'lucide-react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';

// // const Header = () => {
// //   const { user, logout, loading, determineRedirectPath } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [showRoleModal, setShowRoleModal] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);

// //   // Handle redirect when user is logged in and on home page
// //   useEffect(() => {
// //     if (user && location.pathname === '/') {
// //       const redirectPath = determineRedirectPath(user);
// //       navigate(redirectPath, { replace: true });
// //     }
// //   }, [user, location.pathname, navigate, determineRedirectPath]);

// // // In Header.jsx - Update handleLogoClick
// // const handleLogoClick = (e) => {
// //   e.preventDefault();
  
// //   if (user) {
// //     const userRole = user?.role?.toLowerCase();
    
// //     // SIMPLIFIED: For consultants, check payment status from profileCompletion
// //     if (userRole === 'consultant' && profileCompletion?.payment === true) {
// //       navigate('/consultant/dashboard');
// //     } else if (userRole === 'consultant') {
// //       // If not paid, go to home or appropriate setup page
// //       navigate('/');
// //     } else if (userRole === 'client') {
// //       navigate('/client/dashboard');
// //     } else if (userRole === 'admin') {
// //       navigate('/admin/dashboard');
// //     } else {
// //       navigate('/');
// //     }
// //   } else {
// //     navigate('/');
// //   }
// // };

// //   // const handleLogoClick = (e) => {
// //   //   e.preventDefault();
    
// //   //   if (user) {
// //   //     // User is logged in - redirect to appropriate dashboard
// //   //     const redirectPath = determineRedirectPath(user);
// //   //     navigate(redirectPath);
// //   //   } else {
// //   //     // User is not logged in - redirect to home
// //   //     navigate('/');
// //   //   }
// //   // };

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       // logout already does window.location.href = '/'
// //     } catch (error) {
// //       console.error('Logout failed:', error);
// //     }
// //   };

// //   const handleGetStartedClick = (e) => {
// //     e.preventDefault();
// //     setShowRoleModal(true);
// //     setShowLoginModal(false);
// //   };

// //   const handleLoginClick = (e) => {
// //     e.preventDefault();
// //     setShowLoginModal(true);
// //     setShowRoleModal(false);
// //   };

// //   const handleRoleSelect = (role) => {
// //     setShowRoleModal(false);
// //     if (role === 'consultant') {
// //       navigate('/consultant/signup');
// //     } else {
// //       navigate('/client/signup');
// //     }
// //   };

// //   const handleLoginSelect = (role) => {
// //     setShowLoginModal(false);
// //     if (role === 'consultant') {
// //       navigate('/consultant/login');
// //     } else if (role === 'client') {
// //       navigate('/client/login');
// //     } else if (role === 'admin') {
// //       navigate('/admin/login');
// //     }
// //   };

// //   const closeModals = () => {
// //     setShowRoleModal(false);
// //     setShowLoginModal(false);
// //   };

// //   // Get user display info
// //   const getUserDisplayInfo = () => {
// //     if (!user) return null;
    
// //     const userName = user.fullName || user.name || user.email?.split('@')[0] || 'User';
// //     const userRole = user.role || 'User';
    
// //     return { userName, userRole };
// //   };

// //   const userInfo = getUserDisplayInfo();

// //   // Show loading state
// //   if (loading) {
// //     return (
// //       <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
// //         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-3">
// //               <div className="bg-blue-600 p-2 rounded-lg">
// //                 <Briefcase className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
// //               </div>
// //             </div>
// //             <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
// //           </div>
// //         </div>
// //       </nav>
// //     );
// //   }

// //   return (
// //     <>
// //       <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
// //         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Clickable Logo Section */}
// //             <button 
// //               onClick={handleLogoClick}
// //               className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
// //               aria-label="Go to homepage or dashboard"
// //             >
// //               <div className=" p-2 rounded-lg">
// //                 {/* <Briefcase className="w-6 h-6 text-white" /> */}
// //                    <div className="rounded-lg">
// //               <img src="/logo1.png" alt="Logo" className="h-10 object-contain" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
// //               </div>
// //             </button>

// //             {/* Navigation Links */}
// //             <div className="hidden md:flex items-center space-x-8">
// //               <Link 
// //                 to="/#how-it-works" 
// //                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
// //                 onClick={(e) => {
// //                   if (window.location.pathname === '/') {
// //                     e.preventDefault();
// //                     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
// //                   }
// //                 }}
// //               >
// //                 How it works
// //               </Link>
              
// //               <Link 
// //                 to="/#features" 
// //                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
// //                 onClick={(e) => {
// //                   if (window.location.pathname === '/') {
// //                     e.preventDefault();
// //                     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
// //                   }
// //                 }}
// //               >
// //                 Features
// //               </Link>
              
// //               <Link 
// //                 to="/#pricing" 
// //                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
// //                 onClick={(e) => {
// //                   if (window.location.pathname === '/') {
// //                     e.preventDefault();
// //                     document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
// //                   }
// //                 }}
// //               >
// //                 Pricing
// //               </Link>
              
// //               {/* Conditional rendering based on auth status */}
// //               {user ? (
// //                 <div className="flex items-center space-x-4">
// //                   <div className="flex items-center space-x-2">
// //                     <span className="text-sm text-gray-600">
// //                       {userInfo?.userName}
// //                     </span>
// //                     <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 capitalize">
// //                       {userInfo?.userRole}
// //                     </span>
// //                   </div>
// //                   <button 
// //                     onClick={handleLogout}
// //                     className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
// //                   >
// //                     Logout
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="flex items-center space-x-4">
// //                   <button
// //                     onClick={handleLoginClick}
// //                     className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200"
// //                   >
// //                     <LogIn className="w-4 h-4" />
// //                     <span>Login</span>
// //                   </button>

// //                   <button
// //                     onClick={handleGetStartedClick}
// //                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
// //                   >
// //                     Get Started
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Mobile menu button */}
// //             <button className="md:hidden cursor-pointer">
// //               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Login Modal */}
// //       {showLoginModal && (
// //         <div className="fixed inset-0 z-50 overflow-y-auto">
// //           <div 
// //             className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
// //             onClick={closeModals}
// //           ></div>
          
// //           <div className="flex min-h-full items-center justify-center p-4">
// //             <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all border border-white border-opacity-20">
// //               <button
// //                 onClick={closeModals}
// //                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>

// //               <div className="text-center mb-8">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
// //                   <LogIn className="w-8 h-8 text-blue-600" />
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
// //                   Welcome Back
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Choose your account type to login
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <button
// //                   onClick={() => handleLoginSelect('consultant')}
// //                   className="w-full p-6 border border-white border-opacity-20 bg-white bg-opacity-50 rounded-xl hover:bg-white hover:bg-opacity-80 hover:border-blue-600 transition-all group cursor-pointer backdrop-blur-sm"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="bg-blue-100 bg-opacity-80 p-3 rounded-xl group-hover:bg-blue-600 transition-colors mr-4">
// //                       <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
// //                     </div>
// //                     <div className="text-left">
// //                       <h4 className="text-lg font-bold text-gray-900 mb-1">Consultant Login</h4>
// //                       <p className="text-gray-600 text-sm">
// //                         Access your consultant account
// //                       </p>
// //                       <p className="text-blue-600 text-sm font-medium mt-2">
// //                         Manage your profile & projects
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </button>

// //                 <button
// //                   onClick={() => handleLoginSelect('client')}
// //                   className="w-full p-6 border border-white border-opacity-20 bg-white bg-opacity-50 rounded-xl hover:bg-white hover:bg-opacity-80 hover:border-blue-600 transition-all group cursor-pointer backdrop-blur-sm"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="bg-gray-100 bg-opacity-80 p-3 rounded-xl group-hover:bg-blue-600 transition-colors mr-4">
// //                       <Briefcase className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
// //                     </div>
// //                     <div className="text-left">
// //                       <h4 className="text-lg font-bold text-gray-900 mb-1">Client Login</h4>
// //                       <p className="text-gray-600 text-sm">
// //                         Access your client account
// //                       </p>
// //                       <p className="text-green-600 text-sm font-medium mt-2">
// //                         Post projects & find consultants
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </button>

// //                 <div className="relative">
// //                   <div className="absolute inset-0 flex items-center">
// //                     <div className="w-full border-t border-gray-300"></div>
// //                   </div>
// //                   <div className="relative flex justify-center text-sm">
// //                     <span className="px-2 bg-white bg-opacity-90 text-gray-500">Administrator</span>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={() => handleLoginSelect('admin')}
// //                   className="w-full p-4 border border-white border-opacity-20 bg-white bg-opacity-50 rounded-xl hover:bg-white hover:bg-opacity-80 hover:border-purple-600 transition-all group cursor-pointer backdrop-blur-sm"
// //                 >
// //                   <div className="flex items-center justify-center">
// //                     <LogIn className="w-5 h-5 text-purple-600 mr-3" />
// //                     <span className="font-medium text-gray-900">Admin Login</span>
// //                   </div>
// //                 </button>
// //               </div>

// //               <p className="text-center text-sm text-gray-500 mt-8">
// //                 Don't have an account?{' '}
// //                 <button 
// //                   onClick={() => {
// //                     setShowLoginModal(false);
// //                     setShowRoleModal(true);
// //                   }}
// //                   className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
// //                 >
// //                   Get Started
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Get Started Modal */}
// //       {showRoleModal && (
// //         <div className="fixed inset-0 z-50 overflow-y-auto">
// //           <div 
// //             className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
// //             onClick={closeModals}
// //           ></div>
          
// //           <div className="flex min-h-full items-center justify-center p-4">
// //             <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all border border-white border-opacity-20">
// //               <button
// //                 onClick={closeModals}
// //                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>

// //               <div className="text-center mb-8">
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
// //                   Join as
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Choose how you want to use the platform
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <button
// //                   onClick={() => handleRoleSelect('consultant')}
// //                   className="w-full p-6 border border-white border-opacity-20 bg-white bg-opacity-50 rounded-xl hover:bg-white hover:bg-opacity-80 hover:border-blue-600 transition-all group cursor-pointer backdrop-blur-sm"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="bg-blue-100 bg-opacity-80 p-3 rounded-xl group-hover:bg-blue-600 transition-colors mr-4">
// //                       <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
// //                     </div>
// //                     <div className="text-left">
// //                       <h4 className="text-lg font-bold text-gray-900 mb-1">Join as Consultant</h4>
// //                       <p className="text-gray-600 text-sm">
// //                         Offer your expertise and find quality projects
// //                       </p>
// //                       <p className="text-blue-600 text-sm font-medium mt-2">
// //                         €99/year subscription
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </button>

// //                 <button
// //                   onClick={() => handleRoleSelect('client')}
// //                   className="w-full p-6 border border-white border-opacity-20 bg-white bg-opacity-50 rounded-xl hover:bg-white hover:bg-opacity-80 hover:border-blue-600 transition-all group cursor-pointer backdrop-blur-sm"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="bg-gray-100 bg-opacity-80 p-3 rounded-xl group-hover:bg-blue-600 transition-colors mr-4">
// //                       <Briefcase className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
// //                     </div>
// //                     <div className="text-left">
// //                       <h4 className="text-lg font-bold text-gray-900 mb-1">Join as Client</h4>
// //                       <p className="text-gray-600 text-sm">
// //                         Find expert consultants for your projects
// //                       </p>
// //                       <p className="text-green-600 text-sm font-medium mt-2">
// //                         Free forever
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </button>
// //               </div>

// //               <p className="text-center text-sm text-gray-500 mt-8">
// //                 Already have an account?{' '}
// //                 <button 
// //                   onClick={() => {
// //                     setShowRoleModal(false);
// //                     setShowLoginModal(true);
// //                   }}
// //                   className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
// //                 >
// //                   Sign in
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Header;



// // src/components/Header.jsx
// import React, { useState, useEffect } from 'react';
// import { Briefcase, Users, LogIn, User, LogOut } from 'lucide-react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Header = () => {
//   const { user, logout, loading, profileCompletion } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Handle redirect when user is logged in and on home page
//   useEffect(() => {
//     if (user && location.pathname === '/') {
//       // Determine redirect based on role and profile completion
//       const userRole = user?.role?.toLowerCase();
      
//       if (userRole === 'consultant') {
//         if (profileCompletion?.payment === true) {
//           navigate('/consultant/dashboard', { replace: true });
//         } else {
//           navigate('/', { replace: true });
//         }
//       } else if (userRole === 'client') {
//         navigate('/client/dashboard', { replace: true });
//       } else if (userRole === 'admin') {
//         navigate('/admin/dashboard', { replace: true });
//       }
//     }
//   }, [user, location.pathname, navigate, profileCompletion]);

//   const handleLogoClick = (e) => {
//     e.preventDefault();
    
//     if (user) {
//       const userRole = user?.role?.toLowerCase();
      
//       if (userRole === 'consultant' && profileCompletion?.payment === true) {
//         navigate('/consultant/dashboard');
//       } else if (userRole === 'consultant') {
//         navigate('/');
//       } else if (userRole === 'client') {
//         navigate('/client/dashboard');
//       } else if (userRole === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/');
//       }
//     } else {
//       navigate('/');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // logout already does window.location.href = '/'
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/signup');
//   };

//   // Get user display info
//   const getUserDisplayInfo = () => {
//     if (!user) return null;
    
//     const userName = user.fullName || user.name || user.email?.split('@')[0] || 'User';
//     const userRole = user.role || 'User';
    
//     return { userName, userRole };
//   };

//   const userInfo = getUserDisplayInfo();

//   // Show loading state
//   if (loading) {
//     return (
//       <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
//         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-600 p-2 rounded-lg">
//                 <Briefcase className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
//               </div>
//             </div>
//             <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <>
//       <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
//         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Clickable Logo Section */}
//             <button 
//               onClick={handleLogoClick}
//               className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
//               aria-label="Go to homepage or dashboard"
//             >
//               <div className="rounded-lg">
//                 <img src="/logo1.png" alt="Logo" className="h-10 object-contain" />
//               </div>
//               <div>
//                 <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
//               </div>
//             </button>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               <Link 
//                 to="/#how-it-works" 
//                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                 }}
//               >
//                 How it works
//               </Link>
              
//               <Link 
//                 to="/#features" 
//                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                 }}
//               >
//                 Features
//               </Link>
              
//               <Link 
//                 to="/#pricing" 
//                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                 }}
//               >
//                 Pricing
//               </Link>
              
//               <Link 
//                 to="/#faq" 
//                 className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                 }}
//               >
//                 FAQ
//               </Link>
              
//               {/* Conditional rendering based on auth status */}
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <User className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div className="text-left">
//                       <span className="text-sm font-medium text-gray-900 block">
//                         {userInfo?.userName}
//                       </span>
//                       <span className="text-xs text-gray-500 capitalize">
//                         {userInfo?.userRole}
//                       </span>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 text-gray-600 hover:text-red-600 font-medium transition cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={handleLoginClick}
//                     className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200"
//                   >
//                     <LogIn className="w-4 h-4" />
//                     <span>Login</span>
//                   </button>

//                   <button
//                     onClick={handleSignupClick}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-4 py-3 space-y-3">
//               <Link 
//                 to="/#how-it-works" 
//                 className="block text-gray-600 hover:text-blue-600 font-medium py-2"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 How it works
//               </Link>
              
//               <Link 
//                 to="/#features" 
//                 className="block text-gray-600 hover:text-blue-600 font-medium py-2"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 Features
//               </Link>
              
//               <Link 
//                 to="/#pricing" 
//                 className="block text-gray-600 hover:text-blue-600 font-medium py-2"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 Pricing
//               </Link>
              
//               <Link 
//                 to="/#faq" 
//                 className="block text-gray-600 hover:text-blue-600 font-medium py-2"
//                 onClick={(e) => {
//                   if (window.location.pathname === '/') {
//                     e.preventDefault();
//                     document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                   setIsMobileMenuOpen(false);
//                 }}
//               >
//                 FAQ
//               </Link>
              
//               {user ? (
//                 <>
//                   <div className="pt-3 border-t border-gray-200">
//                     <div className="flex items-center space-x-3 mb-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                         <User className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">{userInfo?.userName}</p>
//                         <p className="text-sm text-gray-500 capitalize">{userInfo?.userRole}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsMobileMenuOpen(false);
//                       }}
//                       className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="pt-3 border-t border-gray-200 space-y-3">
//                   <button
//                     onClick={() => {
//                       handleLoginClick();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 font-medium py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//                   >
//                     <LogIn className="w-4 h-4" />
//                     <span>Login</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       handleSignupClick();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Header;





// src/components/Header.jsx (Update to use modals)
import React, { useState } from 'react';
import { Briefcase, User, LogIn, LogOut, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UnifiedAuthModal from '../../page/auth/UnifiedAuthModal';
const Header = () => {
  const { user, logout, loading, profileCompletion } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleLogoClick = (e) => {
    e.preventDefault();
    
    if (user) {
      const userRole = user?.role?.toLowerCase();
      
      if (userRole === 'consultant' && profileCompletion?.payment === true) {
        navigate('/consultant/dashboard');
      } else if (userRole === 'consultant') {
        navigate('/');
      } else if (userRole === 'client') {
        navigate('/client/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (type) => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    // Optionally refresh user data
    window.location.reload();
  };

  const getUserDisplayInfo = () => {
    if (!user) return null;
    const userName = user.fullName || user.name || user.email?.split('@')[0] || 'User';
    const userRole = user.role || 'User';
    return { userName, userRole };
  };

  const userInfo = getUserDisplayInfo();

  if (loading) {
    return (
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg">
                <img src="/logo1.png" alt="Logo" className="h-10 object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
        <UnifiedAuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Clickable Logo Section */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Go to homepage or dashboard"
            >
              <div className="rounded-lg">
                <img src="/logo1.png" alt="Logo" className="h-10 object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/#how-it-works" 
                className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                How it works
              </Link>
              
              <Link 
                to="/#features" 
                className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Features
              </Link>
              
              <Link 
                to="/#pricing" 
                className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Pricing
              </Link>
              
              <Link 
                to="/#faq" 
                className="text-gray-600 hover:text-blue-600 font-medium transition cursor-pointer"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                FAQ
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-900 block">
                        {userInfo?.userName}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {userInfo?.userRole}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 font-medium transition cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                      <button
          onClick={handleAuthClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
        >
          Get Started
        </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <Link 
                to="/#how-it-works" 
                className="block text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                How it works
              </Link>
              
              <Link 
                to="/#features" 
                className="block text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                Features
              </Link>
              
              <Link 
                to="/#pricing" 
                className="block text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                Pricing
              </Link>
              
              <Link 
                to="/#faq" 
                className="block text-gray-600 hover:text-blue-600 font-medium py-2"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                FAQ
              </Link>
              
              {user ? (
                <>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{userInfo?.userName}</p>
                        <p className="text-sm text-gray-500 capitalize">{userInfo?.userRole}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-3 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 font-medium py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => {
                      handleSignupClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;