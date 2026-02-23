// src/page/consultant/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Star,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  Link as LinkIcon,
  TrendingUp,
  Users,
  DollarSign,
  AlertCircle,
  Loader
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
    console.error('Dashboard Error:', error, errorInfo);
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

const ConsultantDashboard = () => {
  const { user, logout, BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    matches: [],
    stats: {
      profileViews: 0,
      matchRequests: 0,
      interviews: 0,
      earnings: 0
    }
  });

  // Fetch real dashboard data from backend
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
          // Safely extract data with fallbacks
          const profile = result.data.profile || {};
          const matches = Array.isArray(result.data.matches) ? result.data.matches : [];
          
          setDashboardData({
            profile: profile,
            matches: matches,
            stats: {
              profileViews: profile.profile_views || 0,
              matchRequests: matches.length || 0,
              interviews: matches.filter(m => m?.admin_review_status === 'interview_scheduled').length || 0,
              earnings: profile.earnings_ytd || 0
            }
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

  // Safe data access with fallbacks
  const profile = dashboardData.profile ? {
    name: dashboardData.profile.full_name || user?.name || 'Consultant',
    title: dashboardData.profile.title || 'Senior Consultant',
    location: dashboardData.profile.base_city && dashboardData.profile.base_country 
      ? `${dashboardData.profile.base_city}, ${dashboardData.profile.base_country}`
      : 'Location not set',
    availability: dashboardData.profile.availability || 'Availability not set',
    rating: dashboardData.profile.rating || 0,
    completedProjects: dashboardData.profile.completed_projects || 0,
    hourlyRate: dashboardData.profile.hourly_rate 
      ? `€${dashboardData.profile.hourly_rate}` 
      : 'Rate not set',
    expertise: Array.isArray(dashboardData.profile.positions) 
      ? dashboardData.profile.positions 
      : (typeof dashboardData.profile.positions === 'string' 
          ? dashboardData.profile.positions.split(',').map(s => s.trim()) 
          : []),
    verified: dashboardData.profile.is_verified || false,
    subscription_status: dashboardData.profile.subscription_status || 'inactive'
  } : {
    name: user?.name || 'Consultant',
    title: 'Consultant',
    location: 'Location not set',
    availability: 'Availability not set',
    rating: 0,
    completedProjects: 0,
    hourlyRate: 'Rate not set',
    expertise: [],
    verified: false,
    subscription_status: 'inactive'
  };

  // Safe matches array
  const activeMatches = Array.isArray(dashboardData.matches) 
    ? dashboardData.matches.map(match => ({
        id: match?.id || Math.random(),
        client: match?.company_name || 'Client',
        project: match?.request_title || 'Project',
        duration: match?.duration || 'Duration TBD',
        startDate: match?.start_date || new Date().toISOString().split('T')[0],
        status: match?.admin_review_status || 'pending'
      }))
    : [];

  // Stats with safe values
  const stats = [
    { 
      label: 'Profile Views', 
      value: dashboardData.stats.profileViews.toString(), 
      icon: <Users className="w-5 h-5" />, 
      change: '+0%' 
    },
    { 
      label: 'Match Requests', 
      value: dashboardData.stats.matchRequests.toString(), 
      icon: <LinkIcon className="w-5 h-5" />, 
      change: '0' 
    },
    { 
      label: 'Interviews', 
      value: dashboardData.stats.interviews.toString(), 
      icon: <Calendar className="w-5 h-5" />, 
      change: '0 pending' 
    },
    { 
      label: 'Earnings (YTD)', 
      value: `€${(dashboardData.stats.earnings / 1000).toFixed(1)}k`, 
      icon: <DollarSign className="w-5 h-5" />, 
      change: '+0%' 
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending Acceptance';
      case 'interview_scheduled': return 'Interview Scheduled';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Declined';
      default: return status?.replace('_', ' ') || 'Unknown';
    }
  };

  const handleCompleteProfile = () => {
    navigate('/consultant/profile-setup');
  };

  const handleViewMatch = (matchId) => {
    // Navigate to match details
    console.log('View match:', matchId);
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
        <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="px-4 py-6 border-b border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Consultant Panel</h2>
                  <p className="text-xs text-blue-200">Web Consultant Hub</p>
                </div>
              </div>
            </div>

            {/* User Profile Summary */}
            <div className="px-4 py-4 border-b border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">{profile.name}</p>
                  <p className="text-xs text-blue-200">{profile.title}</p>
                  {profile.rating > 0 && (
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs ml-1">{profile.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              {profile.subscription_status !== 'active' && (
                <div className="mt-3 bg-yellow-500/20 text-yellow-200 text-xs p-2 rounded-lg">
                  Subscription {profile.subscription_status}
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
                { id: 'matches', label: 'My Matches', icon: <LinkIcon className="w-5 h-5" /> },
                { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
                { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                    activeTab === item.id ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="px-4 py-4 border-t border-blue-700">
              <button 
                onClick={logout}
                className="flex items-center text-blue-100 hover:text-white w-full px-4 py-2 text-sm"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Top Navigation */}
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
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {profile.name.charAt(0)}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">{profile.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'overview' && (
              <>
                {/* Welcome Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile.name.split(' ')[0] || 'Consultant'}!</h1>
                  <p className="text-gray-600">Here's your consulting activity overview.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                          {stat.icon}
                        </div>
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Profile Completion - Only show if profile incomplete */}
                {!dashboardData.profile && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Profile</h2>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">30% complete - Finish setting up your profile to get matches</span>
                      <button 
                        onClick={handleCompleteProfile}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Complete Profile →
                      </button>
                    </div>
                  </div>
                )}

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Active Matches */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Active Matches</h2>
                      <button 
                        onClick={() => setActiveTab('matches')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {activeMatches.length > 0 ? (
                        activeMatches.slice(0, 3).map((match) => (
                          <div key={match.id} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer"
                               onClick={() => handleViewMatch(match.id)}>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900">{match.client}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
                                {getStatusText(match.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{match.project}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {match.duration}
                              <Calendar className="w-4 h-4 ml-3 mr-1" />
                              Starts {new Date(match.startDate).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LinkIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">No active matches yet</p>
                          <p className="text-sm text-gray-400">Complete your profile to get matched with projects</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Messages - Using mock data for now */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
                      <button 
                        onClick={() => setActiveTab('messages')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="text-center py-8">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No messages yet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Professional Profile</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Edit Profile
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <p className="font-medium text-gray-900">{profile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Professional Title</label>
                        <p className="font-medium text-gray-900">{profile.title}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Location</label>
                        <p className="font-medium text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {profile.location}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <p className="font-medium text-gray-900">{user?.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Professional Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Hourly Rate</label>
                        <p className="font-medium text-gray-900">{profile.hourlyRate}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Completed Projects</label>
                        <p className="font-medium text-gray-900">{profile.completedProjects}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Availability</label>
                        <p className="font-medium text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {profile.availability}
                        </p>
                      </div>
                      {profile.expertise.length > 0 && (
                        <div>
                          <label className="text-sm text-gray-500">Expertise</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profile.expertise.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center pt-2">
                        {profile.verified && (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm text-green-700">Verified Consultant</span>
                          </>
                        )}
                        {profile.subscription_status === 'active' && (
                          <span className="ml-4 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Subscription Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Matches</h2>
                
                {activeMatches.length > 0 ? (
                  <div className="space-y-4">
                    {activeMatches.map((match) => (
                      <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{match.client}</h3>
                            <p className="text-gray-600">{match.project}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
                            {getStatusText(match.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4 text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {match.duration}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(match.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LinkIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
                    <p className="text-gray-500">Complete your profile to get matched with relevant projects</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ConsultantDashboard;