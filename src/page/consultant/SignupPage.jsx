
// // src/page/consultant/SignupPage.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Briefcase, 
//   Mail, 
//   User, 
//   Lock, 
//   CheckCircle,
//   ArrowRight,
//   AlertCircle,
//   Github,
//   Linkedin
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const ConsultantSignupPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     expertise: '',
//     yearsOfExperience: '',
//     linkedin: '',
//     github: '',
//     agreeToTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const validateStep1 = () => {
//     const newErrors = {};
//     if (!formData.fullName) newErrors.fullName = 'Full name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
//     return newErrors;
//   };

//   const validateStep2 = () => {
//     const newErrors = {};
//     if (!formData.expertise) newErrors.expertise = 'Area of expertise is required';
//     if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
//     if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleNextStep = () => {
//     const stepErrors = validateStep1();
//     if (Object.keys(stepErrors).length === 0) {
//       setCurrentStep(2);
//     } else {
//       setErrors(stepErrors);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (currentStep === 1) {
//       handleNextStep();
//       return;
//     }

//     const stepErrors = validateStep2();
//     if (Object.keys(stepErrors).length > 0) {
//       setErrors(stepErrors);
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call - replace with actual registration
//     setTimeout(() => {
//       // Send magic link instead of direct registration
//       login(formData.email, 'consultant');
//       navigate('/magic-link-sent', { state: { email: formData.email } });
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//       <Header />
      
//       <main className="flex-grow flex items-center justify-center p-4 py-8">
//         <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* Left side - Benefits */}
//             <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
//               <div className="h-full flex flex-col">
//                 <div className="flex items-center space-x-2 mb-8">
//                   <Briefcase className="w-8 h-8" />
//                   <span className="text-xl font-bold">Web Consultant Hub</span>
//                 </div>
                
//                 <h2 className="text-2xl font-bold mb-4">Join as a Consultant</h2>
//                 <p className="text-blue-100 mb-8">Start connecting with quality projects today.</p>
                
//                 <div className="space-y-4 flex-1">
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                     <span>Create your professional profile</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                     <span>Get matched with vetted projects</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                     <span>Set your own rates and availability</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                     <span>€99/year subscription - 30-day guarantee</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-8">
//                   <p className="text-sm text-blue-200">
//                     Already have an account?{' '}
//                     <Link to="/consultant/login" className="text-white font-medium underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Form */}
//             <div className="md:w-3/5 p-8">
//               <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
//                 <p className="text-gray-600">Step {currentStep} of 2</p>
//               </div>

//               {/* Progress bar */}
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: currentStep === 1 ? '50%' : '100%' }}
//                 ></div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {currentStep === 1 ? (
//                   // Step 1: Basic Information
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name *
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                             errors.fullName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="John Doe"
//                         />
//                       </div>
//                       {errors.fullName && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.fullName}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                             errors.email ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="you@example.com"
//                         />
//                       </div>
//                       {errors.email && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Password *
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="password"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                             errors.password ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="••••••••"
//                         />
//                       </div>
//                       {errors.password && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.password}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Confirm Password *
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="password"
//                           name="confirmPassword"
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                             errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="••••••••"
//                         />
//                       </div>
//                       {errors.confirmPassword && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.confirmPassword}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   // Step 2: Professional Information
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Area of Expertise *
//                       </label>
//                       <select
//                         name="expertise"
//                         value={formData.expertise}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                           errors.expertise ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select your primary expertise</option>
//                         <option value="AI Strategy">AI Strategy</option>
//                         <option value="Digital Transformation">Digital Transformation</option>
//                         <option value="Change Management">Change Management</option>
//                         <option value="IT Strategy">IT Strategy</option>
//                         <option value="Business Process">Business Process</option>
//                         <option value="Organizational Design">Organizational Design</option>
//                       </select>
//                       {errors.expertise && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.expertise}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Years of Experience *
//                       </label>
//                       <select
//                         name="yearsOfExperience"
//                         value={formData.yearsOfExperience}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
//                           errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select years of experience</option>
//                         <option value="0-2">0-2 years</option>
//                         <option value="3-5">3-5 years</option>
//                         <option value="6-10">6-10 years</option>
//                         <option value="10+">10+ years</option>
//                       </select>
//                       {errors.yearsOfExperience && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.yearsOfExperience}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         LinkedIn Profile (Optional)
//                       </label>
//                       <div className="relative">
//                         <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="url"
//                           name="linkedin"
//                           value={formData.linkedin || ''}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                           placeholder="https://linkedin.com/in/username"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         GitHub/Portfolio (Optional)
//                       </label>
//                       <div className="relative">
//                         <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="url"
//                           name="github"
//                           value={formData.github || ''}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                           placeholder="https://github.com/username"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <input
//                         type="checkbox"
//                         name="agreeToTerms"
//                         checked={formData.agreeToTerms}
//                         onChange={handleChange}
//                         className="mt-1 mr-3"
//                         required
//                       />
//                       <label className="text-sm text-gray-600">
//                         I agree to the{' '}
//                         <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
//                         {' '}and{' '}
//                         <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
//                         *
//                       </label>
//                     </div>
//                     {errors.agreeToTerms && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.agreeToTerms}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 <div className="mt-8 space-y-4">
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
//                         Creating account...
//                       </>
//                     ) : currentStep === 1 ? (
//                       'Continue'
//                     ) : (
//                       'Create Account'
//                     )}
//                   </button>

//                   {currentStep === 2 && (
//                     <button
//                       type="button"
//                       onClick={() => setCurrentStep(1)}
//                       className="w-full text-gray-600 py-2 hover:text-gray-900"
//                     >
//                       ← Back
//                     </button>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ConsultantSignupPage;




// src/page/consultant/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Mail, 
  User, 
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Github,
  Linkedin,
  Calendar,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ConsultantSignupPage = () => {
  const navigate = useNavigate();
  const { login, BACKEND_URL } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: '',
    yearsOfExperience: '',
    linkedin: '',
    github: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.expertise) newErrors.expertise = 'Area of expertise is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const saveSignupData = async () => {
    try {
      // Save to localStorage as backup
      const signupData = {
        fullName: formData.fullName,
        email: formData.email,
        expertise: formData.expertise,
        yearsOfExperience: formData.yearsOfExperience,
        linkedin: formData.linkedin || '',
        github: formData.github || ''
      };
      
      localStorage.setItem('consultant_signup_data', JSON.stringify(signupData));
      console.log('✅ Signup data saved to localStorage:', signupData);

      // Try to save to backend if available
      if (BACKEND_URL) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/save-consultant-signup-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Signup data saved to backend:', data);
          } else {
            console.warn('⚠️ Backend save failed, but data saved to localStorage');
          }
        } catch (backendError) {
          console.warn('⚠️ Could not save to backend, but data saved to localStorage:', backendError);
        }
      }
    } catch (error) {
      console.error('Error saving signup data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // First save the signup data
      await saveSignupData();
      
      // Then send magic link
      const result = await login(formData.email, 'consultant');
      
      if (result.success) {
        setMagicLinkSent(true);
      } else {
        setErrors(result.message || 'Failed to send magic link');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors({ form: 'Failed to process signup. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendMagicLink = async () => {
    setIsLoading(true);
    try {
      await login(formData.email, 'consultant');
    } catch (error) {
      console.error('Error resending magic link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If magic link was sent, show success message
  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a magic link to <strong>{formData.email}</strong>
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to verify your account and complete your consultant profile. The link will expire in 15 minutes.
            </p>
            
            <p className="text-sm text-gray-600 mb-4">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResendMagicLink}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                click here to resend
              </button>
            </p>
            
            <button
              onClick={() => setMagicLinkSent(false)}
              className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
            >
              ← Go back
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
      
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Benefits */}
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
              <div className="h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-8">
                  <Briefcase className="w-8 h-8" />
                  <span className="text-xl font-bold">Web Consultant Hub</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Join as a Consultant</h2>
                <p className="text-blue-100 mb-8">Start connecting with quality projects today.</p>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Create your professional profile</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Get matched with vetted projects</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Set your own rates and availability</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>€99/year subscription - 30-day guarantee</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-blue-200">
                    Already have an account?{' '}
                    <Link to="/consultant/login" className="text-white font-medium underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create your consultant account</h1>
                <p className="text-gray-600">
                  Enter your details and we'll send a magic link to verify your email
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* 2-column grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Area of Expertise */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area of Expertise *
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                          errors.expertise ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select expertise</option>
                        <option value="AI Strategy">AI Strategy</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Change Management">Change Management</option>
                        <option value="IT Strategy">IT Strategy</option>
                        <option value="Business Process">Business Process</option>
                        <option value="Organizational Design">Organizational Design</option>
                      </select>
                    </div>
                    {errors.expertise && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.expertise}
                      </p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                          errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    {errors.yearsOfExperience && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.yearsOfExperience}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn Profile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile (Optional)
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  {/* GitHub/Portfolio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub/Portfolio (Optional)
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="github"
                        value={formData.github || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox - Full width */}
                <div className="mt-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                      required
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                      *
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                {/* Submit Button - Full width */}
                <div className="mt-8">
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
                        Sending magic link...
                      </>
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Magic Link Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    We'll send a one-time login link to your email to verify your account. 
                    No password needed - it's more secure!
                  </span>
                </p>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/consultant/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>

              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsultantSignupPage;