// src/components/ProfileCompletionModal.jsx
import React, { useState, useEffect } from 'react';
import { X, User, Calendar, CreditCard, CheckCircle, ArrowRight, Loader, AlertCircle, Lock, Mail, Phone, MapPin, Briefcase, Clock, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileCompletionModal = ({ isOpen, onClose, initialStep = 'basic', onComplete }) => {
  const { user, BACKEND_URL, updateProfileCompletion } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Basic Info Form
  const [basicForm, setBasicForm] = useState({
    fullName: '',
    phone: '',
    dob: '',
    baseCountry: '',
    baseCity: '',
    workMode: 'remote',
    yearsExperience: '',
    positions: []
  });
  
  // Availability Form
  const [availabilityBlocks, setAvailabilityBlocks] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00'
  });
  
  const positionsList = [
    'Web Developer', 'Frontend Developer', 'Backend Developer',
    'Full Stack Developer', 'DevOps Engineer', 'UX/UI Designer',
    'Product Manager', 'Project Manager', 'Data Analyst',
    'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer'
  ];
  
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
          dob: data.profile.dob ? data.profile.dob.split('T')[0] : '',
          baseCountry: data.profile.baseCountry || '',
          baseCity: data.profile.baseCity || '',
          workMode: data.profile.workModePreference || 'remote',
          yearsExperience: data.profile.yearsExperience || '',
          positions: data.profile.positions?.map(p => p.name) || []
        });
        
        // Load availability
        if (data.availability && data.availability.length > 0) {
          setAvailabilityBlocks(data.availability);
        }
      }
    } catch (err) {
      console.error('Error loading profile:', err);
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
          dob: basicForm.dob,
          baseCountry: basicForm.baseCountry,
          baseCity: basicForm.baseCity,
          workMode: basicForm.workMode,
          yearsExperience: basicForm.yearsExperience,
          jobTitle: basicForm.positions[0] || ''
        })
      });
      
      const data = await response.json();
      if (data.success) {
        updateProfileCompletion('basic', true);
        setCurrentStep('availability');
      } else {
        setError(data.error || 'Failed to save profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddAvailability = () => {
    if (newAvailability.startDate && newAvailability.endDate) {
      setAvailabilityBlocks(prev => [...prev, { ...newAvailability, id: Date.now() }]);
      setNewAvailability({
        startDate: '',
        endDate: '',
        startTime: '09:00',
        endTime: '17:00'
      });
    }
  };
  
  const handleRemoveAvailability = (id) => {
    setAvailabilityBlocks(prev => prev.filter(block => block.id !== id));
  };
  
  const handleAvailabilitySubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('auth_token');
      // Save each availability block individually
      for (const block of availabilityBlocks) {
        await fetch(`${BACKEND_URL}/api/availability/save`, {
          method: 'POST',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user.email,
            userType: 'consultant',
            date: block.startDate,
            status: 'available',
            timeRange: { start: block.startTime, end: block.endTime }
          })
        });
      }
      
      updateProfileCompletion('availability', true);
      setCurrentStep('payment');
    } catch (err) {
      setError('Failed to save availability');
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
      case 'availability': return <Calendar className="w-6 h-6 text-blue-600" />;
      case 'payment': return <CreditCard className="w-6 h-6 text-blue-600" />;
      default: return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };
  
  const getStepTitle = () => {
    switch(currentStep) {
      case 'basic': return 'Complete Your Basic Profile';
      case 'availability': return 'Set Your Availability';
      case 'payment': return 'Activate Subscription';
      default: return 'Profile Complete';
    }
  };
  
  const getStepDescription = () => {
    switch(currentStep) {
      case 'basic':
        return 'Add your professional details, location, and expertise to start getting matched with clients.';
      case 'availability':
        return 'Let clients know when you\'re available for new projects.';
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
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={basicForm.dob}
                        onChange={(e) => setBasicForm({...basicForm, dob: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <input
                      type="text"
                      value={basicForm.baseCountry}
                      onChange={(e) => setBasicForm({...basicForm, baseCountry: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      placeholder="Germany"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={basicForm.baseCity}
                      onChange={(e) => setBasicForm({...basicForm, baseCity: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      placeholder="Berlin"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select
                      value={basicForm.yearsExperience}
                      onChange={(e) => setBasicForm({...basicForm, yearsExperience: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                    <select
                      value={basicForm.workMode}
                      onChange={(e) => setBasicForm({...basicForm, workMode: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="remote">Remote</option>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {positionsList.slice(0, 6).map((position) => (
                        <button
                          key={position}
                          type="button"
                          onClick={() => {
                            setBasicForm(prev => ({
                              ...prev,
                              positions: prev.positions.includes(position)
                                ? prev.positions.filter(p => p !== position)
                                : [...prev.positions, position]
                            }));
                          }}
                          className={`px-3 py-2 text-sm rounded-lg border transition ${
                            basicForm.positions.includes(position)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                          }`}
                        >
                          {position}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleBasicSubmit}
                  disabled={loading || !basicForm.fullName || !basicForm.baseCountry || !basicForm.baseCity || basicForm.positions.length === 0}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
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
            )}
            
            {/* Availability Step */}
            {currentStep === 'availability' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Add Available Time Block</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newAvailability.startDate}
                        onChange={(e) => setNewAvailability({...newAvailability, startDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={newAvailability.endDate}
                        onChange={(e) => setNewAvailability({...newAvailability, endDate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={newAvailability.startTime}
                        onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Time</label>
                      <input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAvailability}
                    disabled={!newAvailability.startDate || !newAvailability.endDate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add Time Block
                  </button>
                </div>
                
                {availabilityBlocks.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Your Availability</h3>
                    <div className="space-y-2">
                      {availabilityBlocks.map((block) => (
                        <div key={block.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-900">
                              {new Date(block.startDate).toLocaleDateString()} - {new Date(block.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-600">
                              {block.startTime} - {block.endTime}
                            </p>
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
                  </div>
                )}
                
                <button
                  onClick={handleAvailabilitySubmit}
                  disabled={loading || availabilityBlocks.length === 0}
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

export default ProfileCompletionModal;