// src/page/Privacy.jsx
import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Cookie, UserCheck, Globe, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Privacy = () => {
  const lastUpdated = "March 15, 2026";

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "1. Information We Collect",
      content: "We collect several types of information to provide and improve our service to you:",
      subPoints: [
        {
          title: "Personal Information",
          items: [
            "Name and contact information (email, phone number)",
            "Professional details (job title, expertise, experience)",
            "Company information for clients",
            "Payment information (processed securely through Stripe)"
          ]
        },
        {
          title: "Profile Information",
          items: [
            "CV/resume documents",
            "Professional certifications",
            "Work preferences and availability",
            "Location information"
          ]
        },
        {
          title: "Usage Data",
          items: [
            "Log data and device information",
            "Pages visited and features used",
            "Time and date of visits",
            "Interaction with matches and messages"
          ]
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "2. How We Use Your Information",
      content: "We use the collected information for various purposes:",
      subPoints: [
        "To create and manage your account",
        "To facilitate matches between consultants and clients",
        "To process subscription payments",
        "To communicate with you about matches and platform updates",
        "To improve and personalize your experience",
        "To ensure platform security and prevent fraud",
        "To comply with legal obligations"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "3. Information Sharing and Disclosure",
      content: "We respect your privacy and limit information sharing:",
      subPoints: [
        {
          title: "With Other Users",
          items: [
            "Consultant profiles are visible to potential clients",
            "Client company information is visible to matched consultants",
            "Contact details are only shared after both parties accept a match"
          ]
        },
        {
          title: "With Service Providers",
          items: [
            "Payment processing (Stripe)",
            "Email communications (Brevo)",
            "Cloud hosting and database services"
          ]
        },
        {
          title: "Legal Requirements",
          items: [
            "We may disclose information if required by law",
            "To protect rights, property, or safety of our users"
          ]
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "4. Data Security",
      content: "We implement appropriate security measures to protect your information:",
      subPoints: [
        "Encryption of data in transit and at rest",
        "Secure socket layer technology (SSL)",
        "Regular security audits and monitoring",
        "Access controls and authentication requirements",
        "Secure data centers with physical security"
      ]
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "5. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.",
      subPoints: [
        "Session cookies: To authenticate users and maintain sessions",
        "Preference cookies: To remember your settings and preferences",
        "Analytics cookies: To understand how users interact with our platform",
        "You can instruct your browser to refuse all cookies or indicate when a cookie is being sent"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "6. Email Communications",
      content: "We may send you emails related to your account, matches, and platform updates:",
      subPoints: [
        "Magic link login emails",
        "Match notifications and updates",
        "Subscription confirmations and reminders",
        "Support ticket communications",
        "You can opt out of marketing communications at any time"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "7. International Data Transfers",
      content: "Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.",
      subPoints: [
        "We ensure appropriate safeguards are in place",
        "We comply with GDPR requirements for EU users",
        "Data is processed in compliance with applicable laws"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "8. Data Retention",
      content: "We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      subPoints: [
        "Account information retained while account is active",
        "Profile data retained for matching purposes",
        "Deleted accounts: data removed within 30 days",
        "Legal or regulatory requirements may require longer retention"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "9. Your Rights",
      content: "Depending on your location, you may have certain rights regarding your personal information:",
      subPoints: [
        "Right to access your personal data",
        "Right to rectify inaccurate data",
        "Right to erasure ('right to be forgotten')",
        "Right to restrict processing",
        "Right to data portability",
        "Right to object to processing",
        "Rights related to automated decision making"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "10. GDPR Compliance",
      content: "For users in the European Union, we comply with the General Data Protection Regulation (GDPR):",
      subPoints: [
        "Legal basis for processing: contract performance, legitimate interests, consent",
        "Data Protection Officer contact: dpo@webconsultanthub.com",
        "Right to lodge a complaint with a supervisory authority",
        "Consent can be withdrawn at any time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-white/80" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-600 mb-4">
              At Web Consultant Hub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Your trust matters:</strong> We are committed to protecting your personal information and being transparent about how we use it.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
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
                    <div className="space-y-4">
                      {section.subPoints.map((point, idx) => (
                        <div key={idx}>
                          {point.title && (
                            <h3 className="font-medium text-gray-900 mb-2">{point.title}</h3>
                          )}
                          {point.items ? (
                            <ul className="space-y-2">
                              {point.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <li className="flex items-start text-gray-600 ml-4">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                              <span>{typeof point === 'string' ? point : point.title}</span>
                            </li>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mt-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <Mail className="w-5 h-5 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">privacy@webconsultanthub.com</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <Shield className="w-5 h-5 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">Data Protection Officer</h3>
                <p className="text-sm text-gray-600">dpo@webconsultanthub.com</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                For GDPR-related inquiries, please contact our Data Protection Officer directly.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Web Consultant Hub. All rights reserved.</p>
            <p className="mt-2">This Privacy Policy was last updated on {lastUpdated}.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;