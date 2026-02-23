// src/page/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  FileText,
  BarChart,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Link as LinkIcon,
  Download,
  RefreshCw,
  ChevronDown,
  Check,
  AlertTriangle
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
    console.error('Admin Dashboard Error:', error, errorInfo);
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
            <p className="text-gray-600 mb-6">We're having trouble loading the admin dashboard. Please try again.</p>
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

// Bell icon component
const Bell = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const AdminDashboard = () => {
  const { user, logout, BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Data states
  const [stats, setStats] = useState({
    totalConsultants: 0,
    pendingConsultants: 0,
    verifiedConsultants: 0,
    totalClients: 0,
    activeMatches: 0,
    totalRequests: 0,
    pendingRequests: 0,
    revenue: 0,
    monthlyGrowth: 0
  });

  const [consultants, setConsultants] = useState([]);
  const [clients, setClients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [pendingConsultants, setPendingConsultants] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

// src/page/admin/Dashboard.jsx
// Find this section in your fetchDashboardData function (around line 150-180)
// Replace the entire fetchDashboardData function with this corrected version:

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };

      // Fetch consultants
      const consultantsRes = await fetch(`${BACKEND_URL}/api/admin/consultants`, { headers });
      const consultantsData = await consultantsRes.json();
      
      if (consultantsData.success) {
        setConsultants(consultantsData.consultants || []);
        // Fix: Define 'pending' variable correctly
        const pendingConsultantsList = (consultantsData.consultants || []).filter(c => 
          c.subscription_status === 'pending' || !c.is_verified
        );
        setPendingConsultants(pendingConsultantsList);
      }

      // Fetch requests
      const requestsRes = await fetch(`${BACKEND_URL}/api/admin/requests`, { headers });
      const requestsData = await requestsRes.json();
      
      if (requestsData.success) {
        setRequests(requestsData.requests || []);
        // Fix: Define 'pendingRequestsList' variable correctly
        const pendingRequestsList = (requestsData.requests || []).filter(r => 
          r.status === 'submitted' || r.status === 'under_review'
        );
        setPendingRequests(pendingRequestsList);
      }

      // Fetch matches
      const matchesRes = await fetch(`${BACKEND_URL}/api/admin/match-suggestions`, { headers });
      const matchesData = await matchesRes.json();
      
      if (matchesData.success) {
        setMatches(matchesData.suggestions || []);
      }

      // Calculate stats
      const totalConsultants = consultantsData.consultants?.length || 0;
      const pendingConsultantsCount = (consultantsData.consultants || []).filter(c => 
        c.subscription_status === 'pending' || !c.is_verified
      ).length;
      const verifiedConsultants = totalConsultants - pendingConsultantsCount;
      
      // You'll need a clients endpoint - for now, calculate from users table
      // This is a placeholder - you should create a proper admin/clients endpoint
      const totalClients = 0; 
      
      const activeMatches = (matchesData.suggestions || []).filter(m => 
        m.admin_review_status === 'shortlisted' || m.admin_review_status === 'contacted'
      ).length;
      
      const totalRequests = requestsData.requests?.length || 0;
      const pendingRequestsCount = (requestsData.requests || []).filter(r => 
        r.status === 'submitted' || r.status === 'under_review'
      ).length;
      
      // Calculate revenue (€99 per active consultant)
      const activeConsultants = (consultantsData.consultants || []).filter(c => 
        c.subscription_status === 'active'
      ).length;
      const revenue = activeConsultants * 99;

      setStats({
        totalConsultants,
        pendingConsultants: pendingConsultantsCount,
        verifiedConsultants,
        totalClients,
        activeMatches,
        totalRequests,
        pendingRequests: pendingRequestsCount,
        revenue,
        monthlyGrowth: 15 // Mock data for now
      });

    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, [BACKEND_URL]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
      case 'active':
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'pending_intro':
        return 'bg-blue-100 text-blue-800';
      case 'intro_sent':
      case 'contacting':
        return 'bg-purple-100 text-purple-800';
      case 'under_review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerifyConsultant = async (consultantId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/verify-consultant`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ consultantId })
      });

      if (response.ok) {
        // Refresh data
        window.location.reload();
      }
    } catch (err) {
      console.error('Error verifying consultant:', err);
    }
  };

  const handleUpdateMatchStatus = async (matchId, status) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/update-match-status`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ match_id: matchId, status })
      });

      if (response.ok) {
        // Refresh matches
        const matchesRes = await fetch(`${BACKEND_URL}/api/admin/match-suggestions`, {
          headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });
        const matchesData = await matchesRes.json();
        if (matchesData.success) {
          setMatches(matchesData.suggestions || []);
        }
      }
    } catch (err) {
      console.error('Error updating match status:', err);
    }
  };

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/update-request-status`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ request_id: requestId, status })
      });

      if (response.ok) {
        // Refresh requests
        const requestsRes = await fetch(`${BACKEND_URL}/api/admin/requests`, {
          headers: { 'Authorization': token ? `Bearer ${token}` : '' }
        });
        const requestsData = await requestsRes.json();
        if (requestsData.success) {
          setRequests(requestsData.requests || []);
        }
      }
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  const filteredConsultants = consultants.filter(c => 
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.positions?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRequests = requests.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
            {/* Sidebar Header */}
            <div className="px-4 py-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Admin Panel</h2>
                  <p className="text-xs text-gray-400">Web Consultant Hub</p>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="px-4 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{user?.email || 'Admin'}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              <button
                onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <BarChart className="w-5 h-5 mr-3" />
                Overview
              </button>

              <button
                onClick={() => { setActiveTab('consultants'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'consultants' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Consultants
                {stats.pendingConsultants > 0 && (
                  <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingConsultants}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('clients'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'clients' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Clients
              </button>

              <button
                onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Requests
                {stats.pendingRequests > 0 && (
                  <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingRequests}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('matches'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'matches' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <LinkIcon className="w-5 h-5 mr-3" />
                Matches
              </button>

              <button
                onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </nav>

            {/* Sidebar Footer */}
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
          {/* Top Navigation */}
          <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* Search Bar */}
                <div className="hidden md:block flex-1 max-w-md ml-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search consultants, clients, requests..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-gray-400 hover:text-gray-600">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.email || 'Admin User'}
                    </span>
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
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
                  <p className="text-gray-600">Here's what's happening with your platform today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Consultants Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-500">Total</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalConsultants}</h3>
                    <p className="text-gray-600 text-sm">Registered Consultants</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-yellow-600 font-medium">{stats.pendingConsultants} pending</span>
                      <span className="text-gray-300 mx-2">|</span>
                      <span className="text-green-600 font-medium">{stats.verifiedConsultants} verified</span>
                    </div>
                  </div>

                  {/* Clients Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-500">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalClients}</h3>
                    <p className="text-gray-600 text-sm">Active Clients</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-green-600 font-medium">{stats.totalRequests} open requests</span>
                    </div>
                  </div>

                  {/* Active Matches Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <LinkIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-500">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.activeMatches}</h3>
                    <p className="text-gray-600 text-sm">Active Matches</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-blue-600 font-medium">+{stats.monthlyGrowth} this week</span>
                    </div>
                  </div>

                  {/* Revenue Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-yellow-600" />
                      </div>
                      <span className="text-sm text-gray-500">Annual</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">€{stats.revenue.toLocaleString()}</h3>
                    <p className="text-gray-600 text-sm">Revenue (YTD)</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+{stats.monthlyGrowth}% vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Pending Approvals Section */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Pending Consultants */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Pending Consultant Approvals</h2>
                      <button 
                        onClick={() => setActiveTab('consultants')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {pendingConsultants.length > 0 ? (
                        pendingConsultants.slice(0, 5).map((consultant) => (
                          <div key={consultant.id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-600">
                                  {consultant.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{consultant.full_name}</p>
                                <p className="text-sm text-gray-600">{consultant.positions || 'Consultant'}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('pending')}`}>
                                Pending
                              </span>
                              <button 
                                onClick={() => handleVerifyConsultant(consultant.id)}
                                className="p-1 text-green-600 hover:text-green-700"
                                title="Verify"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Eye className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No pending consultant approvals
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pending Client Requests */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Pending Client Requests</h2>
                      <button 
                        onClick={() => setActiveTab('requests')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {pendingRequests.length > 0 ? (
                        pendingRequests.slice(0, 5).map((request) => (
                          <div key={request.id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div>
                              <p className="font-medium text-gray-900">{request.title}</p>
                              <p className="text-sm text-gray-600">{request.company_name} • {request.budget_amount ? `€${request.budget_amount}` : 'Budget TBD'}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                                {request.status?.replace('_', ' ')}
                              </span>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id, 'under_review')}
                                className="p-1 text-blue-600 hover:text-blue-700"
                                title="Start Review"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No pending requests
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Matches */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Matches</h2>
                      <button 
                        onClick={() => setActiveTab('matches')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Manage All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {matches.slice(0, 5).map((match) => (
                            <tr key={match.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{match.consultant_name}</div>
                                <div className="text-sm text-gray-500">{match.consultant_email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {match.client_company}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {match.request_title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-green-600">{match.match_score}%</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(match.admin_review_status)}`}>
                                  {match.admin_review_status?.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <select
                                  onChange={(e) => handleUpdateMatchStatus(match.id, e.target.value)}
                                  value={match.admin_review_status}
                                  className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                                >
                                  <option value="suggested">Suggested</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="interested">Interested</option>
                                  <option value="shortlisted">Shortlist</option>
                                  <option value="unavailable">Unavailable</option>
                                  <option value="rejected">Reject</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                          {matches.length === 0 && (
                            <tr>
                              <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                No matches found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Consultants Tab */}
            {activeTab === 'consultants' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Consultant Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredConsultants.map((consultant) => (
                        <tr key={consultant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-semibold">
                                  {consultant.full_name?.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{consultant.full_name}</div>
                                <div className="text-sm text-gray-500">{consultant.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {consultant.positions || 'Not specified'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {consultant.base_city}, {consultant.base_country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultant.is_verified ? 'verified' : 'pending')}`}>
                              {consultant.is_verified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultant.subscription_status)}`}>
                              {consultant.subscription_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                            {!consultant.is_verified && (
                              <button 
                                onClick={() => handleVerifyConsultant(consultant.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Client Requests</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{request.title}</div>
                            <div className="text-sm text-gray-500">{request.position_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {request.company_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            €{request.budget_amount} {request.budget_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                              {request.status?.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {request.match_count || 0} matches
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <select
                              onChange={(e) => handleUpdateRequestStatus(request.id, e.target.value)}
                              value={request.status}
                              className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="under_review">Under Review</option>
                              <option value="contacting">Contacting</option>
                              <option value="shortlist_ready">Shortlist Ready</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;