// src/components/auth/UnifiedAuthModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building,
  Mail, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UnifiedAuthModal = ({ isOpen, onClose }) => {
  const { initiateAuth, checkEmailStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setError('');
      setIsLoading(false);
      setMagicLinkSent(false);
      setSentEmail('');
      setEmailStatus(null);
      setCheckingEmail(false);
      setShowRoleSelection(false);
      setSelectedRole(null);
    }
  }, [isOpen]);

  // Debounce email check
  useEffect(() => {
    if (!isOpen) return;
    
    const delayDebounceFn = setTimeout(async () => {
      if (email && email.includes('@') && email.includes('.')) {
        setCheckingEmail(true);
        try {
          const result = await checkEmailStatus(email);
          setEmailStatus(result);
          
          if (result.exists) {
            // Email exists - auto-detect role, no need to ask
            setShowRoleSelection(false);
            setError('');
          } else {
            // New user - need to ask for role
            setShowRoleSelection(true);
            setError('');
          }
        } catch (err) {
          console.error('Error checking email:', err);
        } finally {
          setCheckingEmail(false);
        }
      } else {
        setEmailStatus(null);
        setShowRoleSelection(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [email, checkEmailStatus, isOpen]);

  // Get role display name and icon
  const getRoleDisplay = (role) => {
    switch(role) {
      case 'admin':
        return { name: 'Administrator', icon: <Shield className="w-5 h-5" />, color: 'purple' };
      case 'consultant':
        return { name: 'Consultant', icon: <Briefcase className="w-5 h-5" />, color: 'blue' };
      case 'client':
        return { name: 'Client', icon: <Building className="w-5 h-5" />, color: 'gray' };
      default:
        return { name: role, icon: null, color: 'gray' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    // Determine user type
    let userType = null;
    
    if (emailStatus?.exists) {
      // Existing user - use their registered role
      userType = emailStatus.role;
    } else if (selectedRole) {
      // New user with selected role
      userType = selectedRole;
    } else {
      setError('Please select whether you are a Consultant or Client');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await initiateAuth(email, userType);
    
    if (result.success) {
      setSentEmail(email);
      setMagicLinkSent(true);
    } else {
      setError(result.message || 'Failed to send magic link');
    }
    setIsLoading(false);
  };

  const handleResendMagicLink = async () => {
    let userType = emailStatus?.exists ? emailStatus.role : selectedRole;
    if (!userType) return;
    
    setIsLoading(true);
    setError('');
    
    const result = await initiateAuth(sentEmail, userType);
    
    if (!result.success) {
      setError(result.message || 'Failed to resend magic link');
    }
    setIsLoading(false);
  };

  const getEmailMessage = () => {
    if (!email || !email.includes('@')) return null;
    
    if (checkingEmail) {
      return (
        <p className="mt-2 text-sm text-gray-500 flex items-center">
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          Checking...
        </p>
      );
    }
    
    if (emailStatus?.exists) {
      const roleInfo = getRoleDisplay(emailStatus.role);
      return (
        <p className="mt-2 text-sm text-green-600 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          Welcome back! Signing in as {roleInfo.name}.
        </p>
      );
    }
    
    if (email && !emailStatus?.exists && !checkingEmail && !showRoleSelection) {
      return (
        <p className="mt-2 text-sm text-blue-600 flex items-center">
          <Mail className="w-4 h-4 mr-1" />
          New account! We'll create your profile.
        </p>
      );
    }
    
    return null;
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  // Magic link sent view
  if (magicLinkSent) {
    const roleInfo = emailStatus?.exists 
      ? getRoleDisplay(emailStatus.role) 
      : { name: selectedRole === 'consultant' ? 'Consultant' : 'Client' };
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              
              <p className="text-gray-600 mb-6">
                We've sent a magic link to <strong>{sentEmail}</strong>
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                Click the link in the email to sign in to your {roleInfo.name} account. 
                The link will expire in 15 minutes.
              </p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
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
              
              <button
                onClick={() => {
                  setMagicLinkSent(false);
                  setEmail('');
                  setSentEmail('');
                  setEmailStatus(null);
                  setSelectedRole(null);
                }}
                className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4"
              >
                ← Try another email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unified Auth Form View
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
            <p className="text-gray-600">Enter your email to get started</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selection - Only for new users without email detection */}
            {showRoleSelection && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('consultant')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      selectedRole === 'consultant'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-600'
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span className="font-medium">Consultant</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('client')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      selectedRole === 'client'
                        ? 'border-gray-900 bg-gray-50 text-gray-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                    <span className="font-medium">Client</span>
                  </button>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  autoFocus
                />
                {checkingEmail && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                )}
              </div>
              {getEmailMessage()}
            </div>

            <button
              type="submit"
              disabled={isLoading || (showRoleSelection && !selectedRole)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Magic Link Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 flex items-start">
              <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                We'll send a one-time login link to your email. No password needed!
              </span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAuthModal;