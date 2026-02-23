// src/page/client/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Settings,
  LogOut,
  Bell,
  Menu,
  Plus,
  Search,
  FileText,
  MessageSquare,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Star,
  Building,
  Target,
  UserCheck,
  X,
  Loader,
  MapPin,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Client Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're having trouble loading your dashboard. Please try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ClientDashboard = () => {
  const { user, logout, BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    requests: [],
    matches: []
  });

  // Form state for new request
  const [newRequest, setNewRequest] = useState({
    position_id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    budget_type: 'daily',
    budget_amount: '',
    currency: 'EUR',
    work_country: '',
    work_city: '',
    work_mode: 'remote'
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${BACKEND_URL}/api/user/dashboard/${encodeURIComponent(user.email)}`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setDashboardData({
            profile: result.data.profile || null,
            requests: Array.isArray(result.data.requests) ? result.data.requests : [],
            matches: Array.isArray(result.data.matches) ? result.data.matches : []
          });
        } else {
          setError(result.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, BACKEND_URL]);

  // Fetch positions for dropdown
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/positions`);
        const result = await response.json();
        if (result.success) {
          setPositions(result.positions || []);
        }
      } catch (err) {
        console.error('Error fetching positions:', err);
      }
    };

    fetchPositions();
  }, [BACKEND_URL]);

  // Safe data access
  const companyProfile = dashboardData.profile ? {
    name: dashboardData.profile.company_name || user?.name || 'Company Name',
    industry: dashboardData.profile.industry || 'Technology',
    size: dashboardData.profile.company_size || 'Company size not set',
    location: dashboardData.profile.location || 'Location not set',
    verified: dashboardData.profile.is_verified || false,
    contact_name: dashboardData.profile.contact_name || '',
    contact_title: dashboardData.profile.contact_title || '',
    phone: dashboardData.profile.phone || '',
    website: dashboardData.profile.website || ''
  } : {
    name: user?.name || 'Company Name',
    industry: 'Technology',
    size: 'Company size not set',
    location: 'Location not set',
    verified: false,
    contact_name: '',
    contact_title: '',
    phone: '',
    website: ''
  };

  // Format requests
  const activeRequests = Array.isArray(dashboardData.requests) 
    ? dashboardData.requests.map(request => ({
        id: request.id,
        title: request.title || 'Untitled Request',
        posted: request.created_at ? new Date(request.created_at).toLocaleDateString() : 'Recently',
        proposals: request.proposal_count || 0,
        shortlisted: request.shortlisted_count || 0,
        match_count: request.match_count || 0,
        status: request.status || 'submitted',
        position: request.position_name || 'General',
        work_mode: request.work_mode || 'remote',
        location: request.work_city && request.work_country 
          ? `${request.work_city}, ${request.work_country}`
          : 'Location TBD'
      }))
    : [];

  // Format matches
  const matches = Array.isArray(dashboardData.matches)
    ? dashboardData.matches.map(match => ({
        id: match.id,
        consultant: match.consultant_name || 'Consultant',
        expertise: match.consultant_positions || 'General',
        matchScore: match.match_score || 0,
        status: match.admin_review_status || 'suggested',
        proposedRate: match.proposed_rate || 'Rate TBD',
        availability: match.availability || 'Check availability',
        location: match.consultant_location || 'Location not specified'
      }))
    : [];

  // Calculate stats
  const stats = [
    { 
      label: 'Active Projects', 
      value: activeRequests.filter(r => r.status !== 'closed').length.toString(), 
      icon: <Briefcase className="w-5 h-5" /> 
    },
    { 
      label: 'Total Proposals', 
      value: activeRequests.reduce((sum, r) => sum + r.proposals, 0).toString(), 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      label: 'Interviews', 
      value: matches.filter(m => m.status === 'interviewing').length.toString(), 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      label: 'Time to Match', 
      value: '2.5 days', 
      icon: <Clock className="w-5 h-5" /> 
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'contacting': return 'bg-purple-100 text-purple-800';
      case 'shortlist_ready': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'interviewing': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'suggested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/create-client-request`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          ...newRequest
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowNewRequestModal(false);
        // Refresh dashboard data
        window.location.reload();
      } else {
        setError(result.error || 'Failed to create request');
      }
    } catch (err) {
      console.error('Error creating request:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = (requestId) => {
    // Navigate to request details
    console.log('View request:', requestId);
  };

  const handleContactConsultant = (matchId) => {
    // Navigate to messaging
    console.log('Contact consultant:', matchId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl`}>
          <div className="h-full flex flex-col">
            <div className="px-4 py-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Client Panel</h2>
                  <p className="text-xs text-gray-400">Web Consultant Hub</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">{companyProfile.name}</p>
                  <p className="text-xs text-gray-400">{companyProfile.industry}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: <Target className="w-5 h-5" /> },
                { id: 'requests', label: 'My Requests', icon: <FileText className="w-5 h-5" /> },
                { id: 'matches', label: 'Matches', icon: <UserCheck className="w-5 h-5" /> },
                { id: 'consultants', label: 'Consultants', icon: <Users className="w-5 h-5" /> },
                { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
                { id: 'profile', label: 'Company Profile', icon: <Building className="w-5 h-5" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                    activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-gray-700">
              <button 
                onClick={logout}
                className="flex items-center text-gray-300 hover:text-white w-full px-4 py-2 text-sm"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <Menu className="w-6 h-6" />
                </button>

                <div className="flex-1 flex justify-end items-center space-x-4">
                  <button className="relative p-2 text-gray-400 hover:text-gray-600">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                      {companyProfile.name.charAt(0)}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">{companyProfile.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'overview' && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {companyProfile.name}</h1>
                    <p className="text-gray-600">Find the perfect consultant for your projects.</p>
                  </div>
                  <button
                    onClick={() => setShowNewRequestModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Request
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4 text-blue-600">
                        {stat.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Active Requests */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Active Requests</h2>
                      <button 
                        onClick={() => setActiveTab('requests')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {activeRequests.length > 0 ? (
                        activeRequests.slice(0, 3).map((request) => (
                          <div 
                            key={request.id} 
                            className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer"
                            onClick={() => handleViewRequest(request.id)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900">{request.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{request.position}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{request.match_count} matches</span>
                              <span className="text-gray-400">Posted {request.posted}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">No active requests</p>
                          <button
                            onClick={() => setShowNewRequestModal(true)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Create your first request →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Matches */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Top Matches</h2>
                      <button 
                        onClick={() => setActiveTab('matches')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {matches.length > 0 ? (
                        matches.slice(0, 3).map((match) => (
                          <div key={match.id} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900">{match.consultant}</h3>
                                <p className="text-sm text-gray-600">{match.expertise}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-green-600">{match.matchScore}% match</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-2">
                              <span className="text-gray-600">{match.proposedRate}</span>
                              <button 
                                onClick={() => handleContactConsultant(match.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Contact
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCheck className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">No matches yet</p>
                          <p className="text-sm text-gray-400">Create a request to get matched</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Project Requests</h2>
                  <button
                    onClick={() => setShowNewRequestModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </button>
                </div>
                
                {activeRequests.length > 0 ? (
                  <div className="space-y-4">
                    {activeRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.title}</h3>
                            <p className="text-sm text-gray-600">{request.position}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4 text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {request.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {request.work_mode}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{request.match_count} matches</span>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
                    <p className="text-gray-500 mb-6">Create your first project request to find consultants</p>
                    <button
                      onClick={() => setShowNewRequestModal(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                      Create New Request
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Edit Profile
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Company Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Company Name</label>
                        <p className="font-medium text-gray-900">{companyProfile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Industry</label>
                        <p className="font-medium text-gray-900">{companyProfile.industry}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Company Size</label>
                        <p className="font-medium text-gray-900">{companyProfile.size}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Location</label>
                        <p className="font-medium text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {companyProfile.location}
                        </p>
                      </div>
                      {companyProfile.website && (
                        <div>
                          <label className="text-sm text-gray-500">Website</label>
                          <p className="font-medium text-gray-900">
                            <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {companyProfile.website}
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Contact Name</label>
                        <p className="font-medium text-gray-900">{companyProfile.contact_name || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Contact Title</label>
                        <p className="font-medium text-gray-900">{companyProfile.contact_title || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <p className="font-medium text-gray-900">{companyProfile.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <p className="font-medium text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                    {companyProfile.verified && (
                      <div className="mt-6 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-sm text-green-700">Verified Company</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* New Request Modal */}
        {showNewRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-gray-900">New Project Request</h2>
                <button onClick={() => setShowNewRequestModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              
              {error && (
                <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position / Role *
                  </label>
                  <select
                    name="position_id"
                    value={newRequest.position_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select a position</option>
                    {positions.map(pos => (
                      <option key={pos.id} value={pos.id}>{pos.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newRequest.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., AI Strategy Implementation"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={newRequest.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe your project requirements, goals, and expectations..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={newRequest.start_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={newRequest.end_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Type
                    </label>
                    <select
                      name="budget_type"
                      value={newRequest.budget_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="daily">Daily Rate</option>
                      <option value="hourly">Hourly Rate</option>
                      <option value="fixed">Fixed Price</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Amount *
                    </label>
                    <div className="flex">
                      <select
                        name="currency"
                        value={newRequest.currency}
                        onChange={handleInputChange}
                        className="w-24 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="EUR">€</option>
                        <option value="USD">$</option>
                        <option value="GBP">£</option>
                      </select>
                      <input
                        type="number"
                        name="budget_amount"
                        value={newRequest.budget_amount}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Amount"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Mode
                    </label>
                    <select
                      name="work_mode"
                      value={newRequest.work_mode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="remote">Remote</option>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="work_country"
                      value={newRequest.work_country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="e.g., Germany"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="work_city"
                    value={newRequest.work_city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Berlin"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowNewRequestModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ClientDashboard;