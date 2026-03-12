
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
  Calendar,
  MapPin,
  Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ConsultantSignupPage = () => {
  const navigate = useNavigate();
  const { BACKEND_URL } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    yearsOfExperience: '',
    workLocation: '',
    cvFile: null,
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [cvFileName, setCvFileName] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.workLocation) newErrors.workLocation = 'Work location is required';
    if (!formData.cvFile) newErrors.cvFile = 'CV is required';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type (optional)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cvFile: 'Please upload a PDF or Word document' }));
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'File size must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, cvFile: file }));
      setCvFileName(file.name);
      // Clear error for this field
      if (errors.cvFile) {
        setErrors(prev => ({ ...prev, cvFile: '' }));
      }
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
  setErrors({});
  
  try {
    // Create FormData object for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('jobTitle', formData.jobTitle);
    formDataToSend.append('yearsOfExperience', formData.yearsOfExperience);
    formDataToSend.append('workLocation', formData.workLocation);
    formDataToSend.append('cvFile', formData.cvFile);
    
    // Log FormData contents for debugging
    console.log('📤 Sending FormData:');
    for (let pair of formDataToSend.entries()) {
      if (pair[0] === 'cvFile') {
        console.log('   - cvFile:', pair[1].name, pair[1].type, pair[1].size);
      } else {
        console.log(`   - ${pair[0]}:`, pair[1]);
      }
    }
    
    // Don't set Content-Type header - let browser set it with boundary
    const response = await fetch(`${BACKEND_URL}/api/consultant/signup`, {
      method: 'POST',
      body: formDataToSend
    });
    
    const data = await response.json();
    console.log('📥 Response:', data);
    
    if (response.ok) {
      setSignupEmail(formData.email);
      setMagicLinkSent(true);
    } else {
      setErrors({ form: data.error || 'Failed to sign up. Please try again.' });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    setErrors({ form: 'Network error. Please check your connection and try again.' });
  } finally {
    setIsLoading(false);
  }
};

  const handleResendMagicLink = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: signupEmail, 
          userType: 'consultant' 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Failed to resend:', data.error);
      }
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
              We've sent a magic link to <strong>{signupEmail}</strong>
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to verify your account and complete your consultant profile. The link will expire in 15 minutes.
            </p>
            
            <p className="text-sm text-gray-600 mb-4">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResendMagicLink}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'click here to resend'}
              </button>
            </p>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setMagicLinkSent(false);
                  setSignupEmail('');
                }}
                className="block w-full text-center text-gray-600 hover:text-gray-900"
              >
                ← Use a different email
              </button>
              
              <Link 
                to="/consultant/login"
                className="block w-full text-center text-blue-600 hover:text-blue-700"
              >
                Go to login page
              </Link>
            </div>
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
        <div className="max-w-7xl w-full">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create your consultant account</h1>
              <p className="text-gray-600">
                Enter your details and we'll send a magic link to verify your email
              </p>
            </div>

            {errors.form && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{errors.form}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Job Title - New field replacing expertise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                        errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Senior Software Consultant"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.jobTitle}
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
                      disabled={isLoading}
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

                {/* Work Location - New field replacing GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                        errors.workLocation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Remote, New York, London"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.workLocation && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.workLocation}
                    </p>
                  )}
                </div>

                {/* Upload CV - New field replacing LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CV (PDF or Word) *
                  </label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="file"
                      name="cvFile"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                        errors.cvFile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {cvFileName && (
                    <p className="mt-1 text-xs text-gray-500">
                      Selected: {cvFileName}
                    </p>
                  )}
                  {errors.cvFile && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cvFile}
                    </p>
                  )}
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
                    disabled={isLoading}
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
                      Creating account...
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

          {/* Benefits Card Section - Now below the form */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
            {/* <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-8 h-8" />
              <span className="text-xl font-bold">Web Consultant Hub</span>
            </div> */}
            
            <h2 className="text-2xl font-bold mb-4">Join as a Consultant</h2>
            <p className="text-blue-100 mb-8">Start connecting with quality projects today.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            {/* <div className="mt-8 pt-6 border-t border-blue-500">
              <p className="text-sm text-blue-200">
                Already have an account?{' '}
                <Link to="/consultant/login" className="text-white font-medium underline">
                  Sign in
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsultantSignupPage;