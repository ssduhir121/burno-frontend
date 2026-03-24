

// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

// // Original pages
// import Apply from './page/Apply.jsx';
// import Home from './page/Home.jsx';
// import Terms from './page/Terms';
// import Privacy from './page/Privacy';
// // Admin Pages
// import AdminLogin from './page/admin/AdminLogin.jsx';
// import AdminDashboard from './page/admin/Dashboard.jsx';

// // Consultant Pages
// import ConsultantSignupPage from './page/consultant/SignupPage.jsx';
// import ConsultantLoginPage from './page/consultant/LoginPage.jsx';
// import ConsultantDashboard from './page/consultant/Dashboard.jsx';
// import ConsultantProfileSetup from './page/consultant/ProfileSetup.jsx';
// import ConsultantSubscription from './page/consultant/Subscription.jsx';

// // Client Pages
// import ClientSignupPage from './page/client/SignupPage.jsx';
// import ClientLoginPage from './page/client/LoginPage.jsx';
// import ClientDashboard from './page/client/Dashboard.jsx';
// import ClientProfileSetup from './page/client/ProfileSetup.jsx';

// // Shared Pages
// import MagicLinkSentPage from './page/MagicLinkSentPage.jsx';

// // Protected Route wrapper
// import ProtectedRoute from './components/auth/ProtectedRoute';

// function App() {
//   return (
//     <Router> {/* Router must be OUTSIDE AuthProvider */}
//       <AuthProvider> {/* AuthProvider inside Router so it can use useNavigate */}
//         <Routes>
//           {/* ========== PUBLIC ROUTES ========== */}
//           <Route path="/" element={<Home />} />
//           <Route path="/apply" element={<Apply />} />
          
//           {/* ========== AUTH ROUTES ========== */}
//           {/* Consultant Auth */}
//           <Route path="/consultant/signup" element={<ConsultantSignupPage />} />
//           <Route path="/consultant/login" element={<ConsultantLoginPage />} />
          
//           {/* Client Auth */}
//           <Route path="/client/signup" element={<ClientSignupPage />} />
//           <Route path="/client/login" element={<ClientLoginPage />} />
          
//           {/* Admin Auth */}
//           <Route path="/admin/login" element={<AdminLogin />} />
          
//           {/* Magic Link */}
//           <Route path="/magic-link-sent" element={<MagicLinkSentPage />} />
//           <Route path="/auth/verify" element={<MagicLinkSentPage />} />
          
//           {/* ========== PROTECTED ROUTES ========== */}
          
//           {/* Consultant Routes */}
//           <Route 
//             path="/consultant/dashboard" 
//             element={
//               <ProtectedRoute role="consultant" requireComplete={true}>
//                 <ConsultantDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           <Route 
//             path="/consultant/profile-setup" 
//             element={
//               <ProtectedRoute role="consultant">
//                 <ConsultantProfileSetup />
//               </ProtectedRoute>
//             } 
//           />
          
//           <Route 
//             path="/consultant/subscription" 
//             element={
//               <ProtectedRoute role="consultant">
//                 <ConsultantSubscription />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Client Routes */}
//           <Route 
//             path="/client/dashboard" 
//             element={
//               <ProtectedRoute role="client" requireComplete={true}>
//                 <ClientDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           <Route 
//             path="/client/profile-setup" 
//             element={
//               <ProtectedRoute role="client">
//                 <ClientProfileSetup />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Admin Routes */}
//           <Route 
//             path="/admin/dashboard" 
//             element={
//               <ProtectedRoute role="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route path="/terms" element={<Terms />} />
// <Route path="/privacy" element={<Privacy />} />
          
//           {/* ========== 404 - CATCH ALL ========== */}
//           <Route path="*" element={<Home />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;





// // src/App.jsx - Updated routes
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

// // Pages
// import Apply from './page/Apply.jsx';
// import Home from './page/Home.jsx';
// import Terms from './page/Terms';
// import Privacy from './page/Privacy';

// // Auth Pages
// import LoginPage from './page/auth/LoginPage.jsx';
// import SignupPage from './page/auth/SignupPage.jsx';
// import MagicLinkSentPage from './page/MagicLinkSentPage.jsx';

// // Dashboard Router (handles role-based dashboard routing)
// import DashboardRouter from './components/DashboardRouter.jsx';

// // Admin Pages
// import AdminLogin from './page/admin/AdminLogin.jsx';
// import AdminDashboard from './page/admin/Dashboard.jsx';

// // Consultant Pages
// import ConsultantDashboard from './page/consultant/Dashboard.jsx';
// import ConsultantProfileSetup from './page/consultant/ProfileSetup.jsx';
// import ConsultantSubscription from './page/consultant/Subscription.jsx';

// // Client Pages
// import ClientDashboard from './page/client/Dashboard.jsx';
// import ClientProfileSetup from './page/client/ProfileSetup.jsx';

// // Protected Route wrapper
// import ProtectedRoute from './components/auth/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* ========== PUBLIC ROUTES ========== */}
//           <Route path="/" element={<Home />} />
//           <Route path="/apply" element={<Apply />} />
          
//           {/* ========== AUTH ROUTES ========== */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
          
//           {/* Legacy routes - redirect to new pages */}
//           <Route path="/consultant/login" element={<LoginPage />} />
//           <Route path="/client/login" element={<LoginPage />} />
//           <Route path="/consultant/signup" element={<SignupPage />} />
//           <Route path="/client/signup" element={<SignupPage />} />
          
//           {/* Admin Auth */}
//           <Route path="/admin/login" element={<AdminLogin />} />
          
//           {/* Magic Link Verification */}
//           <Route path="/magic-link-sent" element={<MagicLinkSentPage />} />
//           <Route path="/auth/verify" element={<MagicLinkSentPage />} />
          
//           {/* ========== DASHBOARD ROUTE (Unified) ========== */}
//           {/* Users always land here after verification */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute requireComplete={false}>
//                 <DashboardRouter />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* ========== CONSULTANT ROUTES ========== */}
//           {/* Dashboard - accessible even with incomplete profile (shows banner) */}
//           <Route 
//             path="/consultant/dashboard" 
//             element={
//               <ProtectedRoute role="consultant" requireComplete={false}>
//                 <ConsultantDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Profile Setup - accessible when profile incomplete */}
//           <Route 
//             path="/consultant/profile-setup" 
//             element={
//               <ProtectedRoute role="consultant" requireComplete={true}>
//                 <ConsultantProfileSetup />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Subscription - accessible when payment needed */}
//           <Route 
//             path="/consultant/subscription" 
//             element={
//               <ProtectedRoute role="consultant" requireComplete={true}>
//                 <ConsultantSubscription />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* ========== CLIENT ROUTES ========== */}
//           {/* Dashboard - accessible even with incomplete profile (shows banner) */}
//           <Route 
//             path="/client/dashboard" 
//             element={
//               <ProtectedRoute role="client" requireComplete={false}>
//                 <ClientDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Profile Setup - accessible when profile incomplete */}
//           <Route 
//             path="/client/profile-setup" 
//             element={
//               <ProtectedRoute role="client" requireComplete={true}>
//                 <ClientProfileSetup />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* ========== ADMIN ROUTES ========== */}
//           <Route 
//             path="/admin/dashboard" 
//             element={
//               <ProtectedRoute role="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/privacy" element={<Privacy />} />
          
//           {/* ========== 404 - CATCH ALL ========== */}
//           <Route path="*" element={<Home />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




// src/App.jsx - Optional: Remove separate auth pages if you want only modals
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import Apply from './page/Apply.jsx';
import Home from './page/Home.jsx';
import Terms from './page/Terms';
import Privacy from './page/Privacy';

// Dashboard Router
import DashboardRouter from './components/DashboardRouter.jsx';

// Admin Pages
import AdminDashboard from './page/admin/Dashboard.jsx';

// Consultant Pages
import ConsultantDashboard from './page/consultant/Dashboard.jsx';
import ConsultantProfileSetup from './page/consultant/ProfileSetup.jsx';
import ConsultantSubscription from './page/consultant/Subscription.jsx';

// Client Pages
import ClientDashboard from './page/client/Dashboard.jsx';
import ClientProfileSetup from './page/client/ProfileSetup.jsx';

// Magic Link Verification
import MagicLinkSentPage from './page/MagicLinkSentPage.jsx';

// Protected Route wrapper
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          
          {/* Magic Link Verification */}
          <Route path="/auth/verify" element={<MagicLinkSentPage />} />
          
          {/* ========== DASHBOARD ROUTE ========== */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireComplete={false}>
                <DashboardRouter />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== CONSULTANT ROUTES ========== */}
          <Route 
            path="/consultant/dashboard" 
            element={
              <ProtectedRoute role="consultant" requireComplete={false}>
                <ConsultantDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/consultant/profile-setup" 
            element={
              <ProtectedRoute role="consultant" requireComplete={true}>
                <ConsultantProfileSetup />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/consultant/subscription" 
            element={
              <ProtectedRoute role="consultant" requireComplete={true}>
                <ConsultantSubscription />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== CLIENT ROUTES ========== */}
          <Route 
            path="/client/dashboard" 
            element={
              <ProtectedRoute role="client" requireComplete={false}>
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/client/profile-setup" 
            element={
              <ProtectedRoute role="client" requireComplete={true}>
                <ClientProfileSetup />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== ADMIN ROUTES ========== */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* ========== 404 - CATCH ALL ========== */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;