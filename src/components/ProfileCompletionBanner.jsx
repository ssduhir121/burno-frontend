// src/components/ProfileCompletionBanner.jsx
import React from 'react';
import { AlertCircle, CheckCircle, ArrowRight, Calendar, CreditCard, User, Briefcase, Clock } from 'lucide-react';

const ProfileCompletionBanner = ({ profileCompletion, onComplete }) => {
  // If profile is complete, don't show banner
  if (profileCompletion.status === 'complete') {
    return null;
  }
  
  // Determine next step
  const getNextStep = () => {
    if (!profileCompletion.basicInfo) return 'basic';
    if (!profileCompletion.availability) return 'availability';
    if (!profileCompletion.payment) return 'payment';
    return null;
  };
  
  const nextStep = getNextStep();
  if (!nextStep) return null;
  
  const getStepIcon = () => {
    switch(nextStep) {
      case 'basic':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'availability':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
    }
  };
  
  const getStepTitle = () => {
    switch(nextStep) {
      case 'basic':
        return 'Complete Your Basic Profile';
      case 'availability':
        return 'Set Your Availability';
      case 'payment':
        return 'Activate Your Subscription';
      default:
        return 'Complete Your Profile';
    }
  };
  
  const getStepDescription = () => {
    switch(nextStep) {
      case 'basic':
        return 'Add your professional details, location, and expertise to start getting matched with clients.';
      case 'availability':
        return 'Let clients know when you\'re available for new projects. Set your working hours and time blocks.';
      case 'payment':
        return 'Activate your €99/year subscription to unlock full platform access and start receiving match requests.';
      default:
        return 'Complete your profile to unlock all features.';
    }
  };
  
  const getProgress = () => {
    let completed = 0;
    if (profileCompletion.basicInfo) completed += 33;
    if (profileCompletion.availability) completed += 33;
    if (profileCompletion.payment) completed += 34;
    return completed;
  };
  
  const getActionText = () => {
    switch(nextStep) {
      case 'basic':
        return 'Complete Profile';
      case 'availability':
        return 'Set Availability';
      case 'payment':
        return 'Activate Now';
      default:
        return 'Get Started';
    }
  };
  
  const handleAction = () => {
    // Call the onComplete callback with the next step
    if (onComplete) {
      onComplete(nextStep);
    }
  };
  
  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
              {getStepIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {getStepTitle()}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {getStepDescription()}
              </p>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Profile Completion</span>
                    <span>{getProgress()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgress()}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>~5 min remaining</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleAction}
            className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow flex-shrink-0"
          >
            {getActionText()}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;