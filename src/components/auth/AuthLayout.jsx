// components/auth/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Users, Shield } from 'lucide-react';

const AuthLayout = ({ 
  children, 
  userType, 
  title, 
  subtitle,
  showBackButton = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Web Consultant Hub</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {userType === 'consultant' ? 'Consultant' : 'Client'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Link 
                  to="/" 
                  className="inline-flex items-center text-gray-600 hover:text-blue-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to home
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-xl ${userType === 'consultant' ? 'bg-blue-100' : 'bg-gray-900'}`}>
                {userType === 'consultant' ? (
                  <Users className="w-8 h-8 text-blue-600" />
                ) : (
                  <Briefcase className="w-8 h-8 text-white" />
                )}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              {title}
            </h2>
            
            <p className="mt-2 text-gray-600">
              {subtitle}
            </p>
            
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              Secure email-based access
            </div>
          </div>

          {children}

          {/* Switch Link */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {userType === 'consultant' 
                ? "Looking for consultants?" 
                : "Are you a consultant?"}
            </p>
            <Link 
              to={userType === 'consultant' ? "/client/signup" : "/consultant/signup"}
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              {userType === 'consultant' 
                ? "Start as a client (free)" 
                : "Join as a consultant"}
              <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;