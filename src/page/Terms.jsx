// src/page/Terms.jsx
import React from 'react';
import { Shield,Building, CheckCircle, AlertCircle, FileText, Scale, Users, Briefcase, CreditCard, Globe, Clock } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Terms = () => {
  const lastUpdated = "March 15, 2026";

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Agreement to Terms",
      content: "By accessing or using the Web Consultant Hub platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "2. User Accounts",
      content: "When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
      subPoints: [
        "Consultants must maintain accurate professional profiles",
        "Clients must provide valid company information",
        "Account sharing is strictly prohibited",
        "We reserve the right to suspend or terminate accounts for violations"
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "3. Consultant Obligations",
      content: "Consultants using our platform agree to:",
      subPoints: [
        "Maintain an active subscription (€99/year)",
        "Keep profile information accurate and up-to-date",
        "Respond to match requests in a timely manner",
        "Maintain professional conduct in all communications",
        "Not share confidential client information",
        "Deliver services as agreed with clients"
      ]
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "4. Client Obligations",
      content: "Clients using our platform agree to:",
      subPoints: [
        "Provide accurate project requirements",
        "Respond to consultant matches promptly",
        "Maintain professional conduct",
        "Honor agreed payment terms with consultants",
        "Not misuse consultant information",
        "Provide timely feedback when requested"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "5. Matching Process",
      content: "Our matching process is administered by our team to ensure quality connections:",
      subPoints: [
        "All consultants are pre-vetted before matching",
        "Matches are manually reviewed by our admin team",
        "We do not guarantee matches for every request",
        "Match suggestions are based on profile compatibility",
        "Final acceptance of matches is at both parties' discretion"
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "6. Fees and Payments",
      content: "Our fee structure is transparent and simple:",
      subPoints: [
        "Consultants: €99 annual subscription fee",
        "Clients: Free to use the platform",
        "No commission on project payments",
        "Subscription fees are non-refundable",
        "Payments are processed securely through Stripe",
        "Clients and consultants handle project payments directly"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "7. Intellectual Property",
      content: "The platform and its original content, features, and functionality are owned by Web Consultant Hub and are protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "8. Limitation of Liability",
      content: "In no event shall Web Consultant Hub be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:",
      subPoints: [
        "Your use or inability to use the service",
        "Any conduct or content of any third party on the service",
        "Any content obtained from the service",
        "Unauthorized access, use or alteration of your transmissions or content"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "9. Termination",
      content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "10. Changes to Terms",
      content: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-white/80" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform
          </p>
          <p className="text-sm text-blue-200 mt-4">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition px-3 py-1"
              >
                {section.title.split('.')[1]?.trim() || section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Web Consultant Hub</h2>
            <p className="text-gray-600 mb-4">
              These Terms of Service govern your use of the Web Consultant Hub platform and all related services. By creating an account, accessing, or using our platform, you agree to be bound by these terms.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> If you are using our platform on behalf of a company or organization, you represent that you have the authority to bind that entity to these terms.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div 
                key={index} 
                id={`section-${index + 1}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 scroll-mt-20"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <div className="text-blue-600">
                      {section.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                
                <div className="ml-16">
                  <p className="text-gray-600 mb-4">{section.content}</p>
                  
                  {section.subPoints && (
                    <ul className="space-y-2">
                      {section.subPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mt-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">By Using Our Platform</h2>
            <p className="text-gray-700 mb-4">
              You acknowledge that you have read these Terms of Service and agree to be bound by them. If you do not agree to these terms, please do not use our platform.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-sm text-gray-600">Last updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Have questions about our Terms of Service?
            </p>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // You can trigger the contact modal here if needed
                window.location.href = '/contact';
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact our support team →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;