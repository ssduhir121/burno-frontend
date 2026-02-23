import React from 'react';
import { 
  CheckCircle, 
  Users, 
  Briefcase, 
  Globe, 
  Shield, 
  Zap, 
  ArrowRight,
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Star,
  MessageSquare,
  BarChart,
  Clock,
  Building,
  UserCheck,
  Target,
  Link as LinkIcon
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Onboarding",
      description: "Email-first access. Get started in minutes, not days."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Control",
      description: "Every match is validated by our team before introduction."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connect with consultants and clients worldwide."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Simple Pricing",
      description: "Consultants pay €99/year. Clients use it for free."
    }
  ];

  const consultantBenefits = [
    "Create professional profile",
    "Set your availability & location",
    "Upload CV for visibility",
    "Get matched with quality projects",
    "Admin-validated opportunities"
  ];

  const clientBenefits = [
    "Submit requests for free",
    "Access pre-vetted consultants",
    "Specify budget & requirements",
    "Admin-managed matching process",
    "Quality-focused introductions"
  ];

  const steps = [
    { 
      number: "1", 
      title: "Choose Role", 
      description: "Consultant or Client",
      icon: <Users className="w-8 h-8" />
    },
    { 
      number: "2", 
      title: "Quick Setup", 
      description: "Email-based access",
      icon: <LinkIcon className="w-8 h-8" />
    },
    { 
      number: "3", 
      title: "Define Needs", 
      description: "Profile or request",
      icon: <Target className="w-8 h-8" />
    },
    { 
      number: "4", 
      title: "Get Connected", 
      description: "Admin-facilitated matches",
      icon: <UserCheck className="w-8 h-8" />
    }
  ];

  const stats = [
    { label: "Average Match Time", value: "48h", icon: <Clock className="w-5 h-5" /> },
    { label: "Success Rate", value: "94%", icon: <BarChart className="w-5 h-5" /> },
    { label: "Consultant Satisfaction", value: "4.8/5", icon: <Star className="w-5 h-5" /> },
    { label: "Admin Response Time", value: "<24h", icon: <MessageSquare className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Where <span className="text-blue-600">Expertise</span> Meets
              <span className="text-blue-600"> Opportunity</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              A curated platform connecting professional consultants with quality projects. 
              Every match is validated by our team to ensure perfect partnerships.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/consultant/signup" 
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5 mr-3" />
                Join as Consultant
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="/client/signup" 
                className="group bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-medium text-lg inline-flex items-center justify-center shadow hover:shadow-lg"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Start as Client
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-white border-t border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-blue-600 mr-2">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process designed for quality connections
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-3/4 w-full h-0.5 bg-blue-200"></div>
                )}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mr-4">
                      {step.number}
                    </div>
                    <div className="text-blue-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for professionals, built for quality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Consultant Column */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-xl mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">For Consultants</h3>
                  <p className="text-blue-600 font-medium">€99/year subscription</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {consultantBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="/consultant/signup" 
                className="mt-8 inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
              >
                Start as consultant
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            {/* Client Column */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-gray-900 p-3 rounded-xl mr-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">For Clients</h3>
                  <p className="text-gray-600 font-medium">Free to use</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {clientBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="/client/signup" 
                className="mt-8 inline-flex items-center text-gray-900 font-medium hover:text-blue-600"
              >
                Start as client
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no complicated plans
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
                    <span className="font-medium">Consultant Plan</span>
                  </div>
                  <div className="flex items-end justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">€99</span>
                    <span className="text-gray-600 ml-2 mb-2">/ year</span>
                  </div>
                  <p className="text-gray-600">One-time annual subscription</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Set availability & location</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Upload CV & certificates</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Location & work mode preferences</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Admin-validated matches</span>
                  </div>
                </div>
                
                <a 
                  href="/consultant" 
                  className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Start as Consultant
                </a>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 mb-4">
                    <span className="font-medium">Client Plan</span>
                  </div>
                  <div className="flex items-end justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">€0</span>
                    <span className="text-gray-600 ml-2 mb-2">/ forever</span>
                  </div>
                  <p className="text-gray-600">Completely free for clients</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-700 mr-3" />
                    <span className="text-gray-700">Company profile creation</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-gray-700 mr-3" />
                    <span className="text-gray-700">Submit detailed project requests</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 text-gray-700 mr-3" />
                    <span className="text-gray-700">Access pre-vetted consultants</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-gray-700 mr-3" />
                    <span className="text-gray-700">Admin-managed matching process</span>
                  </div>
                </div>
                
                <a 
                  href="/client/signup" 
                  className="block w-full bg-gray-900 text-white text-center py-4 rounded-xl hover:bg-black transition font-medium"
                >
                  Start as Client
                </a>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                Both plans include email-based access, admin matching validation, and dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals and companies already connecting through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/consultant/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium text-lg inline-flex items-center justify-center shadow-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Join as Consultant
            </a>
            
            <a 
              href="/client/signup" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium text-lg inline-flex items-center justify-center"
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Start as Client
            </a>
          </div>
          
          <p className="text-blue-200 mt-8 text-sm">
            No credit card required for clients • 30-day satisfaction guarantee for consultants
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;