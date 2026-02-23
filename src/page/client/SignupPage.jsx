

// // src/page/client/SignupPage.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Building, 
//   Mail, 
//   User, 
//   Lock, 
//   Globe, 
//   CheckCircle,
//   ArrowRight,
//   AlertCircle,
//   Phone,
//   MapPin
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const ClientSignupPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     contactName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     companySize: '',
//     industry: '',
//     location: '',
//     website: '',
//     agreeToTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const validateStep1 = () => {
//     const newErrors = {};
//     if (!formData.companyName) newErrors.companyName = 'Company name is required';
//     if (!formData.contactName) newErrors.contactName = 'Contact person name is required';
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
//     if (!formData.companySize) newErrors.companySize = 'Company size is required';
//     if (!formData.industry) newErrors.industry = 'Industry is required';
//     if (!formData.location) newErrors.location = 'Location is required';
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
//       login(formData.email, 'client');
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
//             <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
//               <div className="h-full flex flex-col">
//                 <div className="flex items-center space-x-2 mb-8">
//                   <Building className="w-8 h-8" />
//                   <span className="text-xl font-bold">Web Consultant Hub</span>
//                 </div>
                
//                 <h2 className="text-2xl font-bold mb-4">Join as a Client</h2>
//                 <p className="text-gray-300 mb-8">Find the perfect consultants for your projects - completely free.</p>
                
//                 <div className="space-y-4 flex-1">
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Post unlimited project requests</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Access pre-vetted consultants</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Get admin-validated matches</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>100% free - no subscription fees</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-8">
//                   <p className="text-sm text-gray-300">
//                     Already have an account?{' '}
//                     <Link to="/client/login" className="text-white font-medium underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Form */}
//             <div className="md:w-3/5 p-8">
//               <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900">Create your company account</h1>
//                 <p className="text-gray-600">Step {currentStep} of 2</p>
//               </div>

//               {/* Progress bar */}
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
//                 <div 
//                   className="bg-gray-900 h-2 rounded-full transition-all duration-300"
//                   style={{ width: currentStep === 1 ? '50%' : '100%' }}
//                 ></div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {currentStep === 1 ? (
//                   // Step 1: Basic Information
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Company Name *
//                       </label>
//                       <div className="relative">
//                         <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={formData.companyName}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                             errors.companyName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Acme Corporation"
//                         />
//                       </div>
//                       {errors.companyName && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.companyName}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Contact Person Name *
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="contactName"
//                           value={formData.contactName}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                             errors.contactName ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="John Doe"
//                         />
//                       </div>
//                       {errors.contactName && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.contactName}
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
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                             errors.email ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="you@company.com"
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
//                         Phone Number
//                       </label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                           placeholder="+49 123 456789"
//                         />
//                       </div>
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
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
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
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
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
//                   // Step 2: Company Information
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Company Size *
//                       </label>
//                       <select
//                         name="companySize"
//                         value={formData.companySize}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.companySize ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select company size</option>
//                         <option value="1-10">1-10 employees</option>
//                         <option value="11-50">11-50 employees</option>
//                         <option value="51-200">51-200 employees</option>
//                         <option value="201-500">201-500 employees</option>
//                         <option value="501+">501+ employees</option>
//                       </select>
//                       {errors.companySize && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.companySize}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Industry *
//                       </label>
//                       <select
//                         name="industry"
//                         value={formData.industry}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.industry ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select industry</option>
//                         <option value="Technology">Technology</option>
//                         <option value="Finance">Finance</option>
//                         <option value="Healthcare">Healthcare</option>
//                         <option value="Manufacturing">Manufacturing</option>
//                         <option value="Retail">Retail</option>
//                         <option value="Consulting">Consulting</option>
//                         <option value="Other">Other</option>
//                       </select>
//                       {errors.industry && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.industry}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Location *
//                       </label>
//                       <div className="relative">
//                         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="location"
//                           value={formData.location}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                             errors.location ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="Berlin, Germany"
//                         />
//                       </div>
//                       {errors.location && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.location}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Website (Optional)
//                       </label>
//                       <div className="relative">
//                         <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="url"
//                           name="website"
//                           value={formData.website || ''}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                           placeholder="https://www.company.com"
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
//                         <a href="/terms" className="text-gray-900 hover:underline font-medium">Terms of Service</a>
//                         {' '}and{' '}
//                         <a href="/privacy" className="text-gray-900 hover:underline font-medium">Privacy Policy</a>
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
//                     className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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

// export default ClientSignupPage;




// // src/page/client/SignupPage.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Building, 
//   Mail, 
//   User, 
//   Globe, 
//   CheckCircle,
//   ArrowRight,
//   AlertCircle,
//   Phone,
//   MapPin
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';

// const ClientSignupPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     contactName: '',
//     email: '',
//     phone: '',
//     companySize: '',
//     industry: '',
//     location: '',
//     website: '',
//     agreeToTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [magicLinkSent, setMagicLinkSent] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.companyName) newErrors.companyName = 'Company name is required';
//     if (!formData.contactName) newErrors.contactName = 'Contact person name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.companySize) newErrors.companySize = 'Company size is required';
//     if (!formData.industry) newErrors.industry = 'Industry is required';
//     if (!formData.location) newErrors.location = 'Location is required';
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call - replace with actual registration
//     setTimeout(() => {
//       // Send magic link for signup
//       login(formData.email, 'client');
//       setMagicLinkSent(true);
//       setIsLoading(false);
//     }, 1500);
//   };

//   // If magic link was sent, show success message
//   if (magicLinkSent) {
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
//               We've sent a magic link to <strong>{formData.email}</strong>
//             </p>
            
//             <p className="text-sm text-gray-500 mb-6">
//               Click the link in the email to verify your account and set up your company profile. The link will expire in 15 minutes.
//             </p>
            
//             <p className="text-sm text-gray-600 mb-4">
//               Didn't receive the email? Check your spam folder or{' '}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 click here to resend
//               </button>
//             </p>
            
//             <button
//               onClick={() => setMagicLinkSent(false)}
//               className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
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
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
//       <Header />
      
//       <main className="flex-grow flex items-center justify-center p-4 py-8">
//         <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* Left side - Benefits */}
//             <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
//               <div className="h-full flex flex-col">
//                 <div className="flex items-center space-x-2 mb-8">
//                   <Building className="w-8 h-8" />
//                   <span className="text-xl font-bold">Web Consultant Hub</span>
//                 </div>
                
//                 <h2 className="text-2xl font-bold mb-4">Join as a Client</h2>
//                 <p className="text-gray-300 mb-8">Find the perfect consultants for your projects - completely free.</p>
                
//                 <div className="space-y-4 flex-1">
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Post unlimited project requests</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Access pre-vetted consultants</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>Get admin-validated matches</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
//                     <span>100% free - no subscription fees</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-8">
//                   <p className="text-sm text-gray-300">
//                     Already have an account?{' '}
//                     <Link to="/client/login" className="text-white font-medium underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Form */}
//             <div className="md:w-3/5 p-8">
//               <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900">Create your company account</h1>
//                 <p className="text-gray-600">
//                   Enter your details and we'll send a magic link to verify your email
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 {/* 2-column grid layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Company Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Company Name *
//                     </label>
//                     <div className="relative">
//                       <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="companyName"
//                         value={formData.companyName}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.companyName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Acme Corporation"
//                       />
//                     </div>
//                     {errors.companyName && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.companyName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Contact Person Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Person Name *
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="contactName"
//                         value={formData.contactName}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.contactName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     {errors.contactName && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.contactName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Email Address */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.email ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="you@company.com"
//                       />
//                     </div>
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number (Optional)
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                         placeholder="+49 123 456789"
//                       />
//                     </div>
//                   </div>

//                   {/* Company Size */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Company Size *
//                     </label>
//                     <select
//                       name="companySize"
//                       value={formData.companySize}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                         errors.companySize ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select size</option>
//                       <option value="1-10">1-10 employees</option>
//                       <option value="11-50">11-50 employees</option>
//                       <option value="51-200">51-200 employees</option>
//                       <option value="201-500">201-500 employees</option>
//                       <option value="501+">501+ employees</option>
//                     </select>
//                     {errors.companySize && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.companySize}
//                       </p>
//                     )}
//                   </div>

//                   {/* Industry */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Industry *
//                     </label>
//                     <select
//                       name="industry"
//                       value={formData.industry}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                         errors.industry ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select industry</option>
//                       <option value="Technology">Technology</option>
//                       <option value="Finance">Finance</option>
//                       <option value="Healthcare">Healthcare</option>
//                       <option value="Manufacturing">Manufacturing</option>
//                       <option value="Retail">Retail</option>
//                       <option value="Consulting">Consulting</option>
//                       <option value="Other">Other</option>
//                     </select>
//                     {errors.industry && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.industry}
//                       </p>
//                     )}
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Location *
//                     </label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
//                           errors.location ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="Berlin, Germany"
//                       />
//                     </div>
//                     {errors.location && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.location}
//                       </p>
//                     )}
//                   </div>

//                   {/* Website */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Website (Optional)
//                     </label>
//                     <div className="relative">
//                       <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="url"
//                         name="website"
//                         value={formData.website || ''}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                         placeholder="https://www.company.com"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Terms Checkbox - Full width */}
//                 <div className="mt-6">
//                   <div className="flex items-start">
//                     <input
//                       type="checkbox"
//                       name="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onChange={handleChange}
//                       className="mt-1 mr-3"
//                       required
//                     />
//                     <label className="text-sm text-gray-600">
//                       I agree to the{' '}
//                       <a href="/terms" className="text-gray-900 hover:underline font-medium">Terms of Service</a>
//                       {' '}and{' '}
//                       <a href="/privacy" className="text-gray-900 hover:underline font-medium">Privacy Policy</a>
//                       *
//                     </label>
//                   </div>
//                   {errors.agreeToTerms && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-1" />
//                       {errors.agreeToTerms}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit Button - Full width */}
//                 <div className="mt-8">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Sending magic link...
//                       </>
//                     ) : (
//                       <>
//                         Send Magic Link
//                         <ArrowRight className="w-5 h-5 ml-2" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>

//               <p className="mt-6 text-center text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/client/login" className="text-gray-900 hover:text-black font-medium">
//                   Sign in
//                 </Link>
//               </p>

//               <div className="mt-4 text-center">
//                 <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
//                   ← Back to Home
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ClientSignupPage;



// src/page/client/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building, 
  Mail, 
  User, 
  Globe, 
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Phone,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ClientSignupPage = () => {
  const navigate = useNavigate();
  const { login, BACKEND_URL } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    industry: '',
    location: '',
    website: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.contactName) newErrors.contactName = 'Contact person name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.companySize) newErrors.companySize = 'Company size is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.location) newErrors.location = 'Location is required';
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
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || '',
        companySize: formData.companySize,
        industry: formData.industry,
        location: formData.location,
        website: formData.website || ''
      };
      
      localStorage.setItem('client_signup_data', JSON.stringify(signupData));
      console.log('✅ Client signup data saved to localStorage:', signupData);

      // Try to save to backend if available
      if (BACKEND_URL) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/save-client-signup-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Client signup data saved to backend:', data);
          } else {
            console.warn('⚠️ Backend save failed, but data saved to localStorage');
          }
        } catch (backendError) {
          console.warn('⚠️ Could not save to backend, but data saved to localStorage:', backendError);
        }
      }
    } catch (error) {
      console.error('Error saving client signup data:', error);
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
      const result = await login(formData.email, 'client');
      
      if (result.success) {
        setMagicLinkSent(true);
      } else {
        setError(result.message || 'Failed to send magic link');
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
      await login(formData.email, 'client');
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
              Click the link in the email to verify your account and set up your company profile. The link will expire in 15 minutes.
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
      
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="max-w-7xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Benefits */}
            <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
              <div className="h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-8">
                  <Building className="w-8 h-8" />
                  <span className="text-xl font-bold">Web Consultant Hub</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Join as a Client</h2>
                <p className="text-gray-300 mb-8">Find the perfect consultants for your projects - completely free.</p>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                    <span>Post unlimited project requests</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                    <span>Access pre-vetted consultants</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                    <span>Get admin-validated matches</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                    <span>100% free - no subscription fees</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-300">
                    Already have an account?{' '}
                    <Link to="/client/login" className="text-white font-medium underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create your company account</h1>
                <p className="text-gray-600">
                  Enter your details and we'll send a magic link to verify your email
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* 2-column grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          errors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Acme Corporation"
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Contact Person Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          errors.contactName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.contactName}
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
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="you@company.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size *
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.companySize ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.companySize}
                      </p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                        errors.industry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Berlin, Germany"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="https://www.company.com"
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
                      <a href="/terms" className="text-gray-900 hover:underline font-medium">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-gray-900 hover:underline font-medium">Privacy Policy</a>
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
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Link to="/client/login" className="text-gray-900 hover:text-black font-medium">
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

export default ClientSignupPage;