// // src/components/ProfileCompletionModal.jsx
// import React, { useState, useEffect } from 'react';
// import { X, User, Calendar, CreditCard, CheckCircle, ArrowRight, Loader, AlertCircle, Lock, Mail, Phone, MapPin, Briefcase, Clock, Globe } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const ProfileCompletionModal = ({ isOpen, onClose, initialStep = 'basic', onComplete }) => {
//   const { user, BACKEND_URL, updateProfileCompletion } = useAuth();
//   const [currentStep, setCurrentStep] = useState(initialStep);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
  
//   // Basic Info Form
//   const [basicForm, setBasicForm] = useState({
//     fullName: '',
//     phone: '',
//     dob: '',
//     baseCountry: '',
//     baseCity: '',
//     workMode: 'remote',
//     yearsExperience: '',
//     positions: []
//   });
  
//   // Availability Form
//   const [availabilityBlocks, setAvailabilityBlocks] = useState([]);
//   const [newAvailability, setNewAvailability] = useState({
//     startDate: '',
//     endDate: '',
//     startTime: '09:00',
//     endTime: '17:00'
//   });
  
//   const positionsList = [
//     'Web Developer', 'Frontend Developer', 'Backend Developer',
//     'Full Stack Developer', 'DevOps Engineer', 'UX/UI Designer',
//     'Product Manager', 'Project Manager', 'Data Analyst',
//     'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer'
//   ];
  
//   useEffect(() => {
//     if (isOpen && user) {
//       loadProfileData();
//     }
//   }, [isOpen, user]);
  
//   const loadProfileData = async () => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/consultant/profile/${user.email}`, {
//         headers: { 'Authorization': token ? `Bearer ${token}` : '' }
//       });
      
//       const data = await response.json();
//       if (data.success && data.profile) {
//         setBasicForm({
//           fullName: data.profile.fullName || '',
//           phone: data.profile.phone || '',
//           dob: data.profile.dob ? data.profile.dob.split('T')[0] : '',
//           baseCountry: data.profile.baseCountry || '',
//           baseCity: data.profile.baseCity || '',
//           workMode: data.profile.workModePreference || 'remote',
//           yearsExperience: data.profile.yearsExperience || '',
//           positions: data.profile.positions?.map(p => p.name) || []
//         });
        
//         // Load availability
//         if (data.availability && data.availability.length > 0) {
//           setAvailabilityBlocks(data.availability);
//         }
//       }
//     } catch (err) {
//       console.error('Error loading profile:', err);
//     }
//   };
  
//   const handleBasicSubmit = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/consultant/complete-profile`, {
//         method: 'POST',
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: user.email,
//           fullName: basicForm.fullName,
//           phone: basicForm.phone,
//           dob: basicForm.dob,
//           baseCountry: basicForm.baseCountry,
//           baseCity: basicForm.baseCity,
//           workMode: basicForm.workMode,
//           yearsExperience: basicForm.yearsExperience,
//           jobTitle: basicForm.positions[0] || ''
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         updateProfileCompletion('basic', true);
//         setCurrentStep('availability');
//       } else {
//         setError(data.error || 'Failed to save profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleAddAvailability = () => {
//     if (newAvailability.startDate && newAvailability.endDate) {
//       setAvailabilityBlocks(prev => [...prev, { ...newAvailability, id: Date.now() }]);
//       setNewAvailability({
//         startDate: '',
//         endDate: '',
//         startTime: '09:00',
//         endTime: '17:00'
//       });
//     }
//   };
  
//   const handleRemoveAvailability = (id) => {
//     setAvailabilityBlocks(prev => prev.filter(block => block.id !== id));
//   };
  
//   const handleAvailabilitySubmit = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const token = localStorage.getItem('auth_token');
//       // Save each availability block individually
//       for (const block of availabilityBlocks) {
//         await fetch(`${BACKEND_URL}/api/availability/save`, {
//           method: 'POST',
//           headers: {
//             'Authorization': token ? `Bearer ${token}` : '',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             userId: user.email,
//             userType: 'consultant',
//             date: block.startDate,
//             status: 'available',
//             timeRange: { start: block.startTime, end: block.endTime }
//           })
//         });
//       }
      
//       updateProfileCompletion('availability', true);
//       setCurrentStep('payment');
//     } catch (err) {
//       setError('Failed to save availability');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handlePaymentSubmit = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/consultant/create-subscription`, {
//         method: 'POST',
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: user.email,
//           paymentMethodId: 'mock_payment'
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         updateProfileCompletion('payment', true);
//         setSuccess(true);
//         setTimeout(() => {
//           onComplete('payment');
//           onClose();
//         }, 1500);
//       } else {
//         setError(data.error || 'Payment failed');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const getStepIcon = () => {
//     switch(currentStep) {
//       case 'basic': return <User className="w-6 h-6 text-blue-600" />;
//       case 'availability': return <Calendar className="w-6 h-6 text-blue-600" />;
//       case 'payment': return <CreditCard className="w-6 h-6 text-blue-600" />;
//       default: return <CheckCircle className="w-6 h-6 text-green-600" />;
//     }
//   };
  
//   const getStepTitle = () => {
//     switch(currentStep) {
//       case 'basic': return 'Complete Your Basic Profile';
//       case 'availability': return 'Set Your Availability';
//       case 'payment': return 'Activate Subscription';
//       default: return 'Profile Complete';
//     }
//   };
  
//   const getStepDescription = () => {
//     switch(currentStep) {
//       case 'basic':
//         return 'Add your professional details, location, and expertise to start getting matched with clients.';
//       case 'availability':
//         return 'Let clients know when you\'re available for new projects.';
//       case 'payment':
//         return 'Activate your €99/year subscription to unlock full platform access.';
//       default:
//         return 'Your profile is now complete!';
//     }
//   };
  
//   if (!isOpen) return null;
  
//   if (success) {
//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
//         <div className="relative min-h-screen flex items-center justify-center p-4">
//           <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="w-10 h-10 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Activated!</h2>
//             <p className="text-gray-600 mb-4">Your consultant profile is now complete.</p>
//             <Loader className="w-6 h-6 animate-spin mx-auto text-blue-600" />
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <div className="bg-blue-100 p-2 rounded-lg">
//                 {getStepIcon()}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">{getStepTitle()}</h2>
//                 <p className="text-sm text-gray-500">{getStepDescription()}</p>
//               </div>
//             </div>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           <div className="p-6">
//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
//                 <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
//                 {error}
//               </div>
//             )}
            
//             {/* Basic Info Step */}
//             {currentStep === 'basic' && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={basicForm.fullName}
//                         onChange={(e) => setBasicForm({...basicForm, fullName: e.target.value})}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                         placeholder="John Doe"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="tel"
//                         value={basicForm.phone}
//                         onChange={(e) => setBasicForm({...basicForm, phone: e.target.value})}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                         placeholder="+49 123 456789"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="date"
//                         value={basicForm.dob}
//                         onChange={(e) => setBasicForm({...basicForm, dob: e.target.value})}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
//                     <input
//                       type="text"
//                       value={basicForm.baseCountry}
//                       onChange={(e) => setBasicForm({...basicForm, baseCountry: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                       placeholder="Germany"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                     <input
//                       type="text"
//                       value={basicForm.baseCity}
//                       onChange={(e) => setBasicForm({...basicForm, baseCity: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                       placeholder="Berlin"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
//                     <select
//                       value={basicForm.yearsExperience}
//                       onChange={(e) => setBasicForm({...basicForm, yearsExperience: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                     >
//                       <option value="">Select</option>
//                       <option value="0-2">0-2 years</option>
//                       <option value="3-5">3-5 years</option>
//                       <option value="6-10">6-10 years</option>
//                       <option value="10+">10+ years</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
//                     <select
//                       value={basicForm.workMode}
//                       onChange={(e) => setBasicForm({...basicForm, workMode: e.target.value})}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//                     >
//                       <option value="remote">Remote</option>
//                       <option value="on-site">On-site</option>
//                       <option value="hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise *</label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                       {positionsList.slice(0, 6).map((position) => (
//                         <button
//                           key={position}
//                           type="button"
//                           onClick={() => {
//                             setBasicForm(prev => ({
//                               ...prev,
//                               positions: prev.positions.includes(position)
//                                 ? prev.positions.filter(p => p !== position)
//                                 : [...prev.positions, position]
//                             }));
//                           }}
//                           className={`px-3 py-2 text-sm rounded-lg border transition ${
//                             basicForm.positions.includes(position)
//                               ? 'bg-blue-600 text-white border-blue-600'
//                               : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
//                           }`}
//                         >
//                           {position}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleBasicSubmit}
//                   disabled={loading || !basicForm.fullName || !basicForm.baseCountry || !basicForm.baseCity || basicForm.positions.length === 0}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="animate-spin mr-2 w-5 h-5" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       Continue to Availability
//                       <ArrowRight className="ml-2 w-5 h-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
            
//             {/* Availability Step */}
//             {currentStep === 'availability' && (
//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-medium text-gray-900 mb-4">Add Available Time Block</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Start Date</label>
//                       <input
//                         type="date"
//                         value={newAvailability.startDate}
//                         onChange={(e) => setNewAvailability({...newAvailability, startDate: e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">End Date</label>
//                       <input
//                         type="date"
//                         value={newAvailability.endDate}
//                         onChange={(e) => setNewAvailability({...newAvailability, endDate: e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Start Time</label>
//                       <input
//                         type="time"
//                         value={newAvailability.startTime}
//                         onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">End Time</label>
//                       <input
//                         type="time"
//                         value={newAvailability.endTime}
//                         onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={handleAddAvailability}
//                     disabled={!newAvailability.startDate || !newAvailability.endDate}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                   >
//                     Add Time Block
//                   </button>
//                 </div>
                
//                 {availabilityBlocks.length > 0 && (
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-2">Your Availability</h3>
//                     <div className="space-y-2">
//                       {availabilityBlocks.map((block) => (
//                         <div key={block.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                           <div>
//                             <p className="text-sm text-gray-900">
//                               {new Date(block.startDate).toLocaleDateString()} - {new Date(block.endDate).toLocaleDateString()}
//                             </p>
//                             <p className="text-xs text-gray-600">
//                               {block.startTime} - {block.endTime}
//                             </p>
//                           </div>
//                           <button
//                             onClick={() => handleRemoveAvailability(block.id)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 <button
//                   onClick={handleAvailabilitySubmit}
//                   disabled={loading || availabilityBlocks.length === 0}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="animate-spin mr-2 w-5 h-5" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       Continue to Payment
//                       <ArrowRight className="ml-2 w-5 h-5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
            
//             {/* Payment Step */}
//             {currentStep === 'payment' && (
//               <div className="space-y-6">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                     <CreditCard className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">€99/year Subscription</h3>
//                   <p className="text-gray-600 mb-4">
//                     Activate your profile to start receiving match requests
//                   </p>
//                   <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 max-w-sm mx-auto">
//                     <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Professional profile visibility</li>
//                     <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Admin-validated matches</li>
//                     <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 30-day money-back guarantee</li>
//                   </ul>
//                 </div>
                
//                 <button
//                   onClick={handlePaymentSubmit}
//                   disabled={loading}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader className="animate-spin mr-2 w-5 h-5" />
//                       Processing Payment...
//                     </>
//                   ) : (
//                     <>
//                       Activate Subscription (Mock Payment)
//                       <ArrowRight className="ml-2 w-5 h-5" />
//                     </>
//                   )}
//                 </button>
                
//                 <p className="text-xs text-center text-gray-500">
//                   Mock payment mode - No real charges
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCompletionModal;





// src/components/ProfileCompletionModal.jsx
import React, { useState, useEffect } from 'react';
import { X, User, Calendar, CreditCard, CheckCircle, ArrowRight, Loader, AlertCircle, Phone, Briefcase, Globe, Upload, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileCompletionModal = ({ isOpen, onClose, initialStep = 'basic', onComplete }) => {
  const { user, BACKEND_URL, updateProfileCompletion } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Basic Info Form
  const [basicForm, setBasicForm] = useState({
    fullName: '',
    phone: '',
    ageRange: '',
    baseCountry: '',
    yearsExperience: '',
    positions: [],
    cvFile: null,
    cvFileName: ''
  });
  
  // Age Range Options
  const ageRanges = [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+'
  ];
  
  // Areas of Expertise (Dropdown options)
  const expertiseOptions = [
    { id: 1, name: 'Web Developer', category: 'Development' },
    { id: 2, name: 'Frontend Developer', category: 'Development' },
    { id: 3, name: 'Backend Developer', category: 'Development' },
    { id: 4, name: 'Full Stack Developer', category: 'Development' },
    { id: 5, name: 'DevOps Engineer', category: 'Development' },
    { id: 6, name: 'Mobile Developer', category: 'Development' },
    { id: 7, name: 'UX/UI Designer', category: 'Design' },
    { id: 8, name: 'Graphic Designer', category: 'Design' },
    { id: 9, name: 'Product Manager', category: 'Management' },
    { id: 10, name: 'Project Manager', category: 'Management' },
    { id: 11, name: 'Scrum Master', category: 'Management' },
    { id: 12, name: 'Data Analyst', category: 'Data' },
    { id: 13, name: 'Data Scientist', category: 'Data' },
    { id: 14, name: 'Machine Learning Engineer', category: 'Data' },
    { id: 15, name: 'Cloud Architect', category: 'Infrastructure' },
    { id: 16, name: 'Security Engineer', category: 'Infrastructure' },
    { id: 17, name: 'QA Engineer', category: 'Quality' },
    { id: 18, name: 'Technical Writer', category: 'Documentation' },
    { id: 19, name: 'Business Analyst', category: 'Business' },
    { id: 20, name: 'Sales Consultant', category: 'Sales' },
    { id: 21, name: 'Marketing Specialist', category: 'Marketing' },
    { id: 22, name: 'Digital Marketing Expert', category: 'Marketing' },
    { id: 23, name: 'SEO Specialist', category: 'Marketing' },
    { id: 24, name: 'Content Strategist', category: 'Content' }
  ];
  
  // Group expertise by category
  const groupedExpertise = expertiseOptions.reduce((groups, option) => {
    if (!groups[option.category]) {
      groups[option.category] = [];
    }
    groups[option.category].push(option);
    return groups;
  }, {});
  
  useEffect(() => {
    if (isOpen && user) {
      loadProfileData();
    }
  }, [isOpen, user]);
  
  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/consultant/profile/${user.email}`, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' }
      });
      
      const data = await response.json();
      if (data.success && data.profile) {
        setBasicForm({
          fullName: data.profile.fullName || '',
          phone: data.profile.phone || '',
          ageRange: data.profile.ageRange || '',
          baseCountry: data.profile.baseCountry || '',
          yearsExperience: data.profile.yearsExperience || '',
          positions: data.profile.positions?.map(p => typeof p === 'object' ? p.name : p) || [],
          cvFile: null,
          cvFileName: data.profile.cvFileName || ''
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  };
  
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('email', user.email);
    
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/consultant/upload-cv`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });
      
      clearInterval(interval);
      setUploadProgress(100);
      
      const data = await response.json();
      if (data.success) {
        setBasicForm(prev => ({
          ...prev,
          cvFileName: data.fileName || file.name
        }));
        setTimeout(() => setUploadProgress(0), 1000);
      } else {
        setError(data.error || 'Failed to upload CV');
        setUploadProgress(0);
      }
    } catch (err) {
      clearInterval(interval);
      setError('Network error. Please try again.');
      setUploadProgress(0);
    }
  };
  
  const handleBasicSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/consultant/complete-profile`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          fullName: basicForm.fullName,
          phone: basicForm.phone,
          ageRange: basicForm.ageRange,
          baseCountry: basicForm.baseCountry,
          yearsExperience: basicForm.yearsExperience,
          jobTitle: basicForm.positions[0] || '',
          positions: basicForm.positions
        })
      });
      
      const data = await response.json();
      if (data.success) {
        updateProfileCompletion('basic', true);
        updateProfileCompletion('availability', true); // Mark availability as complete since it's managed in dashboard
        setCurrentStep('payment');
      } else {
        setError(data.error || 'Failed to save profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePaymentSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/consultant/create-subscription`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          paymentMethodId: 'mock_payment'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        updateProfileCompletion('payment', true);
        setSuccess(true);
        setTimeout(() => {
          onComplete('payment');
          onClose();
        }, 1500);
      } else {
        setError(data.error || 'Payment failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const getStepIcon = () => {
    switch(currentStep) {
      case 'basic': return <User className="w-6 h-6 text-blue-600" />;
      case 'payment': return <CreditCard className="w-6 h-6 text-blue-600" />;
      default: return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };
  
  const getStepTitle = () => {
    switch(currentStep) {
      case 'basic': return 'Complete Your Basic Profile';
      case 'payment': return 'Activate Subscription';
      default: return 'Profile Complete';
    }
  };
  
  const getStepDescription = () => {
    switch(currentStep) {
      case 'basic':
        return 'Add your professional details, expertise, and upload your CV to start getting matched with clients.';
      case 'payment':
        return 'Activate your €99/year subscription to unlock full platform access.';
      default:
        return 'Your profile is now complete!';
    }
  };
  
  if (!isOpen) return null;
  
  if (success) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Activated!</h2>
            <p className="text-gray-600 mb-4">Your consultant profile is now complete.</p>
            <Loader className="w-6 h-6 animate-spin mx-auto text-blue-600" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                {getStepIcon()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{getStepTitle()}</h2>
                <p className="text-sm text-gray-500">{getStepDescription()}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            
            {/* Basic Info Step */}
            {currentStep === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={basicForm.fullName}
                        onChange={(e) => setBasicForm({...basicForm, fullName: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={basicForm.phone}
                        onChange={(e) => setBasicForm({...basicForm, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={basicForm.ageRange}
                        onChange={(e) => setBasicForm({...basicForm, ageRange: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 appearance-none"
                        required
                      >
                        <option value="">Select Age Range</option>
                        {ageRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={basicForm.baseCountry}
                        onChange={(e) => setBasicForm({...basicForm, baseCountry: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="Germany"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={basicForm.yearsExperience}
                        onChange={(e) => setBasicForm({...basicForm, yearsExperience: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV *</label>
                    <div className="relative">
                      <input
                        type="file"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setBasicForm({...basicForm, cvFile: file});
                            handleFileUpload(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                      >
                        {basicForm.cvFileName ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <FileText className="w-5 h-5" />
                            <span>{basicForm.cvFileName}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setBasicForm({...basicForm, cvFile: null, cvFileName: ''});
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload your CV</p>
                            <p className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise *</label>
                    <div className="relative">
                      <select
                        value={basicForm.positions[0] || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && !basicForm.positions.includes(value)) {
                            setBasicForm(prev => ({
                              ...prev,
                              positions: [...prev.positions, value]
                            }));
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                      >
                        <option value="">Select an expertise area...</option>
                        {Object.entries(groupedExpertise).map(([category, options]) => (
                          <optgroup key={category} label={category}>
                            {options.map(option => (
                              <option key={option.id} value={option.name}>{option.name}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    
                    {/* Selected Expertise Tags */}
                    {basicForm.positions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {basicForm.positions.map((position) => (
                          <span
                            key={position}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {position}
                            <button
                              type="button"
                              onClick={() => {
                                setBasicForm(prev => ({
                                  ...prev,
                                  positions: prev.positions.filter(p => p !== position)
                                }));
                              }}
                              className="hover:text-blue-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Select multiple expertise areas from the dropdown</p>
                  </div>
                </div>
                
                <button
                  onClick={handleBasicSubmit}
                  disabled={loading || !basicForm.fullName || !basicForm.ageRange || !basicForm.baseCountry || basicForm.positions.length === 0 || (!basicForm.cvFileName && !basicForm.cvFile)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 w-5 h-5" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">€99/year Subscription</h3>
                  <p className="text-gray-600 mb-4">
                    Activate your profile to start receiving match requests
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 max-w-sm mx-auto">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Professional profile visibility</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Admin-validated matches</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Direct client communication</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 30-day money-back guarantee</li>
                  </ul>
                </div>
                
                <button
                  onClick={handlePaymentSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 w-5 h-5" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Activate Subscription (Mock Payment)
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-500">
                  Mock payment mode - No real charges
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ChevronDown component
const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default ProfileCompletionModal;