// // src/page/client/ProfileSetup.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import {
//   Building,
//   User,
//   Mail,
//   Phone,
//   Globe,
//   MapPin,
//   CheckCircle,
//   ArrowRight,
//   AlertCircle,
//   Loader
// } from 'lucide-react';

// const ClientProfileSetup = () => {
//   const navigate = useNavigate();
//   const { user, BACKEND_URL } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     company_name: '',
//     contact_name: '',
//     contact_title: '',
//     phone: '',
//     website: '',
//     company_size: '',
//     industry: '',
//     location: '',
//     company_description: ''
//   });

//   useEffect(() => {
//     if (!user) {
//       navigate('/client/login');
//     }
//   }, [user, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/save-client-profile`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: user.email,
//           ...formData
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           navigate('/client/dashboard');
//         }, 2000);
//       } else {
//         setError(data.error || 'Failed to save profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h2>
//           <p className="text-gray-600 mb-4">Redirecting you to your dashboard...</p>
//           <Loader className="w-6 h-6 animate-spin mx-auto text-gray-900" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Complete Your Company Profile</h1>
//             <p className="text-gray-600">Tell us about your company to start posting projects</p>
//           </div>

//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//               <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Company Information */}
//             <div className="border-b border-gray-200 pb-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Company Name *
//                   </label>
//                   <div className="relative">
//                     <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="company_name"
//                       value={formData.company_name}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="Acme Corporation"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Website
//                   </label>
//                   <div className="relative">
//                     <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="url"
//                       name="website"
//                       value={formData.website}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="https://www.acme.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Company Size *
//                   </label>
//                   <select
//                     name="company_size"
//                     value={formData.company_size}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select size</option>
//                     <option value="1-10">1-10 employees</option>
//                     <option value="11-50">11-50 employees</option>
//                     <option value="51-200">51-200 employees</option>
//                     <option value="201-500">201-500 employees</option>
//                     <option value="501+">501+ employees</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Industry *
//                   </label>
//                   <select
//                     name="industry"
//                     value={formData.industry}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select industry</option>
//                     <option value="Technology">Technology</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Healthcare">Healthcare</option>
//                     <option value="Manufacturing">Manufacturing</option>
//                     <option value="Retail">Retail</option>
//                     <option value="Consulting">Consulting</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location *
//                   </label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="Berlin, Germany"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Person */}
//             <div className="border-b border-gray-200 pb-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Name *
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="contact_name"
//                       value={formData.contact_name}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="John Doe"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Job Title
//                   </label>
//                   <input
//                     type="text"
//                     name="contact_title"
//                     value={formData.contact_title}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                     placeholder="HR Manager"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                       placeholder="+49 123 456789"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email (for contact)
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="email"
//                       value={user?.email || ''}
//                       disabled
//                       className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
//                     />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">Primary email for login</p>
//                 </div>
//               </div>
//             </div>

//             {/* Company Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Company Description
//               </label>
//               <textarea
//                 name="company_description"
//                 value={formData.company_description}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//                 placeholder="Tell us about your company, mission, and the types of projects you typically work on..."
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading || !formData.company_name || !formData.company_size || !formData.industry || !formData.location || !formData.contact_name}
//               className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader className="animate-spin mr-2 w-5 h-5" />
//                   Saving Profile...
//                 </>
//               ) : (
//                 <>
//                   Complete Profile
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           <p className="mt-4 text-xs text-center text-gray-500">
//             By completing your profile, you agree to our Terms of Service and Privacy Policy.
//             Your information will be used to match you with qualified consultants.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProfileSetup;



// src/page/client/ProfileSetup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Building,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Loader,
  Lock
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ClientProfileSetup = () => {
  const navigate = useNavigate();
  const { user, BACKEND_URL } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [signupData, setSignupData] = useState(null);

  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_title: '',
    phone: '',
    website: '',
    company_size: '',
    industry: '',
    location: '',
    company_description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/client/login');
      return;
    }

    // Load signup data from localStorage
    const loadSignupData = async () => {
      try {
        setInitialLoading(true);
        
        // Try to get from localStorage first
        const storedData = localStorage.getItem('client_signup_data');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setSignupData(parsed);
          setFormData(prev => ({
            ...prev,
            company_name: parsed.companyName || '',
            contact_name: parsed.contactName || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
            company_size: parsed.companySize || '',
            industry: parsed.industry || '',
            location: parsed.location || '',
            website: parsed.website || ''
          }));
          console.log('✅ Loaded client signup data from localStorage:', parsed);
        } else {
          // If no stored data, try to fetch from backend
          try {
            const response = await fetch(`${BACKEND_URL}/api/get-client-signup-data?email=${user.email}`);
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                setSignupData(data.data);
                setFormData(prev => ({
                  ...prev,
                  company_name: data.data.companyName || '',
                  contact_name: data.data.contactName || '',
                  email: data.data.email || '',
                  phone: data.data.phone || '',
                  company_size: data.data.companySize || '',
                  industry: data.data.industry || '',
                  location: data.data.location || '',
                  website: data.data.website || ''
                }));
                console.log('✅ Loaded client signup data from backend:', data.data);
              }
            }
          } catch (backendError) {
            console.warn('⚠️ Could not fetch from backend:', backendError);
          }
        }
      } catch (err) {
        console.error('Error loading client signup data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadSignupData();
  }, [user, navigate, BACKEND_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/save-client-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          ...formData
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Clear stored signup data
        localStorage.removeItem('client_signup_data');
        setTimeout(() => {
          navigate('/client/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Failed to save profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h2>
            <p className="text-gray-600 mb-4">Redirecting you to your dashboard...</p>
            <Loader className="w-6 h-6 animate-spin mx-auto text-gray-900" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin mx-auto text-gray-900 mb-4" />
            <p className="text-gray-600">Loading your information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Company Profile</h1>
              <p className="text-gray-600">Tell us more about your company to start posting projects</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name - Locked from signup */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        disabled
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">From signup - cannot be changed</p>
                  </div>

                  {/* Website - Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="https://www.acme.com"
                      />
                    </div>
                  </div>

                  {/* Company Size - Pre-filled but editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size *
                    </label>
                    <select
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>

                  {/* Industry - Pre-filled but editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
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
                  </div>

                  {/* Location - Pre-filled but editable */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Berlin, Germany"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Name - Locked from signup */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="contact_name"
                        value={formData.contact_name}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        disabled
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">From signup - cannot be changed</p>
                  </div>

                  {/* Job Title - Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="contact_title"
                      value={formData.contact_title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="HR Manager"
                    />
                  </div>

                  {/* Phone Number - Pre-filled but editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  {/* Email - Locked from auth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (for login)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        disabled
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Primary email for login - cannot be changed</p>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  name="company_description"
                  value={formData.company_description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Tell us about your company, mission, and the types of projects you typically work on..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.company_name || !formData.company_size || !formData.industry || !formData.location || !formData.contact_name}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 w-5 h-5" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-center text-gray-500">
              By completing your profile, you agree to our Terms of Service and Privacy Policy.
              Your information will be used to match you with qualified consultants.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientProfileSetup;