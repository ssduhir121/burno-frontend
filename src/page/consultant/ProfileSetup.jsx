// // src/page/consultant/ProfileSetup.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   Briefcase,
//   Calendar,
//   Clock,
//   CheckCircle,
//   ArrowRight,
//   Upload,
//   X,
//   AlertCircle,
//   Loader
// } from 'lucide-react';

// const ConsultantProfileSetup = () => {
//   const navigate = useNavigate();
//   const { user, BACKEND_URL } = useAuth();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     // Personal Info
//     full_name: '',
//     phone: '',
//     base_country: '',
//     base_city: '',
    
//     // Professional Info
//     positions: [],
//     years_experience: '',
//     work_mode: 'remote',
//     travel_willingness: false,
//     travel_radius: '',
    
//     // Certifications
//     certificates: [],
    
//     // Availability
//     availability_blocks: []
//   });

//   const [newCertificate, setNewCertificate] = useState({
//     name: '',
//     organization: '',
//     issue_date: '',
//     expiry_date: ''
//   });

//   const [newAvailability, setNewAvailability] = useState({
//     start_date: '',
//     end_date: '',
//     start_time: '',
//     end_time: '',
//     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
//   });

//   const positions = [
//     'Web Developer', 'Frontend Developer', 'Backend Developer',
//     'Full Stack Developer', 'DevOps Engineer', 'UX/UI Designer',
//     'Product Manager', 'Project Manager', 'Scrum Master',
//     'Data Analyst', 'Machine Learning Engineer', 'Cloud Architect',
//     'Security Engineer', 'Mobile Developer', 'QA Engineer'
//   ];

//   useEffect(() => {
//     if (!user) {
//       navigate('/consultant/login');
//     }
//   }, [user, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handlePositionToggle = (position) => {
//     setFormData(prev => ({
//       ...prev,
//       positions: prev.positions.includes(position)
//         ? prev.positions.filter(p => p !== position)
//         : [...prev.positions, position]
//     }));
//   };

//   const handleAddCertificate = () => {
//     if (newCertificate.name) {
//       setFormData(prev => ({
//         ...prev,
//         certificates: [...prev.certificates, { ...newCertificate, id: Date.now() }]
//       }));
//       setNewCertificate({
//         name: '',
//         organization: '',
//         issue_date: '',
//         expiry_date: ''
//       });
//     }
//   };

//   const handleRemoveCertificate = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       certificates: prev.certificates.filter(c => c.id !== id)
//     }));
//   };

//   const handleAddAvailability = () => {
//     if (newAvailability.start_date && newAvailability.end_date) {
//       setFormData(prev => ({
//         ...prev,
//         availability_blocks: [...prev.availability_blocks, { ...newAvailability, id: Date.now() }]
//       }));
//       setNewAvailability({
//         start_date: '',
//         end_date: '',
//         start_time: '',
//         end_time: '',
//         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
//       });
//     }
//   };

//   const handleRemoveAvailability = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       availability_blocks: prev.availability_blocks.filter(a => a.id !== id)
//     }));
//   };

//   const handleSubmitStep1 = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/save-consultant-profile`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: user.email,
//           step: 'profile',
//           formData
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setCurrentStep(2);
//       } else {
//         setError(data.error || 'Failed to save profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitStep2 = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/save-consultant-profile`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: user.email,
//           step: 'availability',
//           formData: {
//             availability_blocks: formData.availability_blocks
//           }
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           navigate('/consultant/subscription');
//         }, 2000);
//       } else {
//         setError(data.error || 'Failed to save availability');
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
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Saved!</h2>
//           <p className="text-gray-600 mb-4">Redirecting you to subscription setup...</p>
//           <Loader className="w-6 h-6 animate-spin mx-auto text-blue-600" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Step {currentStep} of 2: {currentStep === 1 ? 'Professional Profile' : 'Availability'}
//             </span>
//             <span className="text-sm text-gray-500">{currentStep === 1 ? '30%' : '70%'} complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: currentStep === 1 ? '30%' : '70%' }}
//             ></div>
//           </div>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h1 className="text-2xl font-bold text-gray-900 mb-6">
//             {currentStep === 1 ? 'Complete Your Consultant Profile' : 'Set Your Availability'}
//           </h1>

//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
//               <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {currentStep === 1 ? (
//             // Step 1: Professional Profile
//             <div className="space-y-6">
//               {/* Personal Information */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="full_name"
//                       value={formData.full_name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       placeholder="Dr. Sarah Chen"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       placeholder="+49 123 456789"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Country *
//                     </label>
//                     <input
//                       type="text"
//                       name="base_country"
//                       value={formData.base_country}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       placeholder="Germany"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City *
//                     </label>
//                     <input
//                       type="text"
//                       name="base_city"
//                       value={formData.base_city}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       placeholder="Berlin"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Professional Information */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Areas of Expertise *
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {positions.map((position) => (
//                       <button
//                         key={position}
//                         type="button"
//                         onClick={() => handlePositionToggle(position)}
//                         className={`px-3 py-2 text-sm rounded-lg border transition ${
//                           formData.positions.includes(position)
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
//                         }`}
//                       >
//                         {position}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Years of Experience
//                     </label>
//                     <select
//                       name="years_experience"
//                       value={formData.years_experience}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     >
//                       <option value="">Select</option>
//                       <option value="0-2">0-2 years</option>
//                       <option value="3-5">3-5 years</option>
//                       <option value="6-10">6-10 years</option>
//                       <option value="10+">10+ years</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Work Mode Preference
//                     </label>
//                     <select
//                       name="work_mode"
//                       value={formData.work_mode}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     >
//                       <option value="remote">Remote</option>
//                       <option value="on-site">On-site</option>
//                       <option value="hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="travel_willingness"
//                       checked={formData.travel_willingness}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     <span className="text-sm text-gray-700">I am willing to travel</span>
//                   </label>
//                 </div>

//                 {formData.travel_willingness && (
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Travel radius (km)
//                     </label>
//                     <input
//                       type="number"
//                       name="travel_radius"
//                       value={formData.travel_radius}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       placeholder="100"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Certifications */}
//               <div className="border-b border-gray-200 pb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
                
//                 {/* Add Certificate Form */}
//                 <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <input
//                       type="text"
//                       placeholder="Certificate name"
//                       value={newCertificate.name}
//                       onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
//                       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Issuing organization"
//                       value={newCertificate.organization}
//                       onChange={(e) => setNewCertificate({...newCertificate, organization: e.target.value})}
//                       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Issue date"
//                       value={newCertificate.issue_date}
//                       onChange={(e) => setNewCertificate({...newCertificate, issue_date: e.target.value})}
//                       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Expiry date"
//                       value={newCertificate.expiry_date}
//                       onChange={(e) => setNewCertificate({...newCertificate, expiry_date: e.target.value})}
//                       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     onClick={handleAddCertificate}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                   >
//                     Add Certificate
//                   </button>
//                 </div>

//                 {/* Certificate List */}
//                 <div className="space-y-2">
//                   {formData.certificates.map((cert) => (
//                     <div key={cert.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                       <div>
//                         <p className="font-medium text-gray-900">{cert.name}</p>
//                         <p className="text-sm text-gray-600">{cert.organization}</p>
//                       </div>
//                       <button
//                         onClick={() => handleRemoveCertificate(cert.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmitStep1}
//                 disabled={loading || !formData.full_name || !formData.base_country || !formData.base_city || formData.positions.length === 0}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader className="animate-spin mr-2 w-5 h-5" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     Continue to Availability
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           ) : (
//             // Step 2: Availability
//             <div className="space-y-6">
//               {/* Add Availability Form */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-medium text-gray-900 mb-4">Add Available Time Block</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">Start Date</label>
//                     <input
//                       type="date"
//                       value={newAvailability.start_date}
//                       onChange={(e) => setNewAvailability({...newAvailability, start_date: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">End Date</label>
//                     <input
//                       type="date"
//                       value={newAvailability.end_date}
//                       onChange={(e) => setNewAvailability({...newAvailability, end_date: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">Start Time</label>
//                     <input
//                       type="time"
//                       value={newAvailability.start_time}
//                       onChange={(e) => setNewAvailability({...newAvailability, start_time: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-gray-600 mb-1">End Time</label>
//                     <input
//                       type="time"
//                       value={newAvailability.end_time}
//                       onChange={(e) => setNewAvailability({...newAvailability, end_time: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleAddAvailability}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Add Time Block
//                 </button>
//               </div>

//               {/* Availability List */}
//               <div className="space-y-2">
//                 <h3 className="font-medium text-gray-900">Your Availability</h3>
//                 {formData.availability_blocks.map((block) => (
//                   <div key={block.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                     <div>
//                       <p className="text-sm text-gray-900">
//                         {new Date(block.start_date).toLocaleDateString()} - {new Date(block.end_date).toLocaleDateString()}
//                       </p>
//                       {(block.start_time || block.end_time) && (
//                         <p className="text-xs text-gray-600">
//                           {block.start_time || '00:00'} - {block.end_time || '23:59'} ({block.timezone})
//                         </p>
//                       )}
//                     </div>
//                     <button
//                       onClick={() => handleRemoveAvailability(block.id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => setCurrentStep(1)}
//                   className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium"
//                 >
//                   ← Back
//                 </button>
//                 <button
//                   onClick={handleSubmitStep2}
//                   disabled={loading || formData.availability_blocks.length === 0}
//                   className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="animate-spin mr-2 w-5 h-5" />
//                       Saving...
//                     </>
//                   ) : (
//                     'Complete Profile'
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Help Text */}
//         <p className="mt-4 text-sm text-gray-500 text-center">
//           Your profile helps us match you with the right opportunities. 
//           All information is verified by our team before matching.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConsultantProfileSetup;




// src/page/consultant/ProfileSetup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Upload,
  X,
  AlertCircle,
  Loader,
  Lock
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ConsultantProfileSetup = () => {
  const navigate = useNavigate();
  const { user, BACKEND_URL } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const [formData, setFormData] = useState({
    // Personal Info (from signup)
    full_name: '',
    email: '',
    
    // Additional Personal Info
    phone: '',
    base_country: '',
    base_city: '',
    
    // Professional Info
    positions: [],
    years_experience: '',
    work_mode: 'remote',
    travel_willingness: false,
    travel_radius: '',
    
    // Social Links
    linkedin: '',
    github: '',
    
    // Certifications
    certificates: [],
    
    // Availability
    availability_blocks: []
  });

  const [newCertificate, setNewCertificate] = useState({
    name: '',
    organization: '',
    issue_date: '',
    expiry_date: ''
  });

  const [newAvailability, setNewAvailability] = useState({
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const positions = [
    'Web Developer', 'Frontend Developer', 'Backend Developer',
    'Full Stack Developer', 'DevOps Engineer', 'UX/UI Designer',
    'Product Manager', 'Project Manager', 'Scrum Master',
    'Data Analyst', 'Machine Learning Engineer', 'Cloud Architect',
    'Security Engineer', 'Mobile Developer', 'QA Engineer'
  ];

  useEffect(() => {
    if (!user) {
      navigate('/consultant/login');
      return;
    }

    // Load signup data from localStorage or context
    const loadSignupData = async () => {
      try {
        // Try to get from localStorage first
        const storedData = localStorage.getItem('consultant_signup_data');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setSignupData(parsed);
          setFormData(prev => ({
            ...prev,
            full_name: parsed.fullName || '',
            email: parsed.email || '',
            years_experience: parsed.yearsOfExperience || '',
            linkedin: parsed.linkedin || '',
            github: parsed.github || ''
          }));
        } else {
          // If no stored data, try to fetch from backend
          const response = await fetch(`${BACKEND_URL}/api/get-consultant-signup-data?email=${user.email}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            if (data.success && data.data) {
              setSignupData(data.data);
              setFormData(prev => ({
                ...prev,
                full_name: data.data.fullName || '',
                email: data.data.email || '',
                years_experience: data.data.yearsOfExperience || '',
                linkedin: data.data.linkedin || '',
                github: data.data.github || ''
              }));
            }
          } else {
            console.log('No signup data found for this user');
          }
        }
      } catch (err) {
        console.error('Error loading signup data:', err);
      }
    };

    loadSignupData();
  }, [user, navigate, BACKEND_URL]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Don't allow editing of locked fields
    if (['full_name', 'email'].includes(name)) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePositionToggle = (position) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.includes(position)
        ? prev.positions.filter(p => p !== position)
        : [...prev.positions, position]
    }));
  };

  const handleAddCertificate = () => {
    if (newCertificate.name) {
      setFormData(prev => ({
        ...prev,
        certificates: [...prev.certificates, { ...newCertificate, id: Date.now() }]
      }));
      setNewCertificate({
        name: '',
        organization: '',
        issue_date: '',
        expiry_date: ''
      });
    }
  };

  const handleRemoveCertificate = (id) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c.id !== id)
    }));
  };

  const handleAddAvailability = () => {
    if (newAvailability.start_date && newAvailability.end_date) {
      setFormData(prev => ({
        ...prev,
        availability_blocks: [...prev.availability_blocks, { ...newAvailability, id: Date.now() }]
      }));
      setNewAvailability({
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    }
  };

  const handleRemoveAvailability = (id) => {
    setFormData(prev => ({
      ...prev,
      availability_blocks: prev.availability_blocks.filter(a => a.id !== id)
    }));
  };

  const handleSubmitStep1 = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/save-consultant-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          step: 'profile',
          formData: {
            full_name: formData.full_name,
            phone: formData.phone,
            base_country: formData.base_country,
            base_city: formData.base_city,
            work_mode: formData.work_mode,
            travel_willingness: formData.travel_willingness,
            travel_radius: formData.travel_radius,
            years_experience: formData.years_experience,
            linkedin: formData.linkedin,
            github: formData.github,
            positions: formData.positions,
            certificates: formData.certificates
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep(2);
      } else {
        setError(data.error || 'Failed to save profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/save-consultant-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          step: 'availability',
          formData: {
            availability_blocks: formData.availability_blocks
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Clear stored signup data
        localStorage.removeItem('consultant_signup_data');
        setTimeout(() => {
          navigate('/consultant/subscription');
        }, 2000);
      } else {
        setError(data.error || 'Failed to save availability');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Saved!</h2>
            <p className="text-gray-600 mb-4">Redirecting you to subscription setup...</p>
            <Loader className="w-6 h-6 animate-spin mx-auto text-blue-600" />
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
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of 2: {currentStep === 1 ? 'Professional Profile' : 'Availability'}
              </span>
              <span className="text-sm text-gray-500">{currentStep === 1 ? '30%' : '70%'} complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: currentStep === 1 ? '30%' : '70%' }}
              ></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {currentStep === 1 ? 'Complete Your Consultant Profile' : 'Set Your Availability'}
            </h1>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {currentStep === 1 ? (
              // Step 1: Professional Profile
              <div className="space-y-6">
                {/* Personal Information - with locked fields from signup */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name - Locked from signup */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                          disabled
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">From signup - cannot be changed</p>
                    </div>

                    {/* Email - Locked from signup */}
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
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                          disabled
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">From signup - cannot be changed</p>
                    </div>

                    {/* Phone - Editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    {/* Country - Editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="base_country"
                        value={formData.base_country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Germany"
                        required
                      />
                    </div>

                    {/* City - Editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="base_city"
                        value={formData.base_city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Berlin"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Expertise *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {positions.map((position) => (
                        <button
                          key={position}
                          type="button"
                          onClick={() => handlePositionToggle(position)}
                          className={`px-3 py-2 text-sm rounded-lg border transition ${
                            formData.positions.includes(position)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                          }`}
                        >
                          {position}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Years of Experience - Pre-filled from signup but editable */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="years_experience"
                        value={formData.years_experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Mode Preference
                      </label>
                      <select
                        name="work_mode"
                        value={formData.work_mode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="remote">Remote</option>
                        <option value="on-site">On-site</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="travel_willingness"
                        checked={formData.travel_willingness}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">I am willing to travel</span>
                    </label>
                  </div>

                  {formData.travel_willingness && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel radius (km)
                      </label>
                      <input
                        type="number"
                        name="travel_radius"
                        value={formData.travel_radius}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub/Portfolio
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
                  
                  {/* Add Certificate Form */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Certificate name"
                        value={newCertificate.name}
                        onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Issuing organization"
                        value={newCertificate.organization}
                        onChange={(e) => setNewCertificate({...newCertificate, organization: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <input
                        type="date"
                        placeholder="Issue date"
                        value={newCertificate.issue_date}
                        onChange={(e) => setNewCertificate({...newCertificate, issue_date: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <input
                        type="date"
                        placeholder="Expiry date"
                        value={newCertificate.expiry_date}
                        onChange={(e) => setNewCertificate({...newCertificate, expiry_date: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCertificate}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add Certificate
                    </button>
                  </div>

                  {/* Certificate List */}
                  <div className="space-y-2">
                    {formData.certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{cert.name}</p>
                          <p className="text-sm text-gray-600">{cert.organization}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveCertificate(cert.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitStep1}
                  disabled={loading || !formData.base_country || !formData.base_city || formData.positions.length === 0}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 w-5 h-5" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue to Availability
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              // Step 2: Availability
              <div className="space-y-6">
                {/* Add Availability Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Add Available Time Block</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newAvailability.start_date}
                        onChange={(e) => setNewAvailability({...newAvailability, start_date: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={newAvailability.end_date}
                        onChange={(e) => setNewAvailability({...newAvailability, end_date: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={newAvailability.start_time}
                        onChange={(e) => setNewAvailability({...newAvailability, start_time: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Time</label>
                      <input
                        type="time"
                        value={newAvailability.end_time}
                        onChange={(e) => setNewAvailability({...newAvailability, end_time: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAvailability}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add Time Block
                  </button>
                </div>

                {/* Availability List */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Your Availability</h3>
                  {formData.availability_blocks.map((block) => (
                    <div key={block.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-900">
                          {new Date(block.start_date).toLocaleDateString()} - {new Date(block.end_date).toLocaleDateString()}
                        </p>
                        {(block.start_time || block.end_time) && (
                          <p className="text-xs text-gray-600">
                            {block.start_time || '00:00'} - {block.end_time || '23:59'} ({block.timezone})
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveAvailability(block.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitStep2}
                    disabled={loading || formData.availability_blocks.length === 0}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin mr-2 w-5 h-5" />
                        Saving...
                      </>
                    ) : (
                      'Complete Profile'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Text */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Your profile helps us match you with the right opportunities. 
            All information is verified by our team before matching.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsultantProfileSetup;