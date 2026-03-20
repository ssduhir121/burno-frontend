
// // src/page/admin/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Shield,
//   Users,
//   Briefcase,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
//   Mail,
//   Phone,
//   MapPin,
//   Star,
//   Calendar,
//   FileText,
//   BarChart,
//   TrendingUp,
//   UserCheck,
//   AlertCircle,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   MessageSquare,
//   Link as LinkIcon,
//   Download,
//   RefreshCw,
//   ChevronDown,
//   Check,
//   AlertTriangle,
//   HelpCircle,
//   Paperclip,
//   Send,
//   Reply,
//   Tag,
//   Filter as FilterIcon,
//   ArrowLeft
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('Admin Dashboard Error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50">
//           <div className="text-center max-w-md p-8">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <AlertCircle className="w-10 h-10 text-red-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
//             <p className="text-gray-600 mb-6">We're having trouble loading the admin dashboard. Please try again.</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Refresh Page
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// // Bell icon component
// const Bell = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//     <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//   </svg>
// );

// const AdminDashboard = () => {
//   const { user, logout, BACKEND_URL } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedPriority, setSelectedPriority] = useState('all');
  
//   // Support modal states
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [replyMessage, setReplyMessage] = useState('');
//   const [isInternalNote, setIsInternalNote] = useState(false);
//   const [submittingReply, setSubmittingReply] = useState(false);
//   const [viewMode, setViewMode] = useState('list'); // 'list', 'detail'
  
//   // Data states
//   const [stats, setStats] = useState({
//     totalConsultants: 0,
//     pendingConsultants: 0,
//     verifiedConsultants: 0,
//     totalClients: 0,
//     activeMatches: 0,
//     totalRequests: 0,
//     pendingRequests: 0,
//     revenue: 0,
//     monthlyGrowth: 0
//   });

//   // Support data states
//   const [supportStats, setSupportStats] = useState({
//     total: 0,
//     new: 0,
//     inProgress: 0,
//     resolved: 0,
//     closed: 0,
//     avgResponseTime: 0,
//     byPriority: {
//       low: 0,
//       normal: 0,
//       high: 0,
//       critical: 0
//     }
//   });

//   const [supportRequests, setSupportRequests] = useState([]);
//   const [selectedTicketDetails, setSelectedTicketDetails] = useState(null);
//   const [ticketReplies, setTicketReplies] = useState([]);

//   const [consultants, setConsultants] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [matches, setMatches] = useState([]);
//   const [pendingConsultants, setPendingConsultants] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError('');
        
//         const token = localStorage.getItem('auth_token');
//         const headers = {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         };

//         // Fetch consultants
//         const consultantsRes = await fetch(`${BACKEND_URL}/api/admin/consultants`, { headers });
//         const consultantsData = await consultantsRes.json();
        
//         if (consultantsData.success) {
//           setConsultants(consultantsData.consultants || []);
//           const pendingConsultantsList = (consultantsData.consultants || []).filter(c => 
//             c.subscription_status === 'pending' || !c.is_verified
//           );
//           setPendingConsultants(pendingConsultantsList);
//         }

//         // Fetch requests
//         const requestsRes = await fetch(`${BACKEND_URL}/api/admin/requests`, { headers });
//         const requestsData = await requestsRes.json();
        
//         if (requestsData.success) {
//           setRequests(requestsData.requests || []);
//           const pendingRequestsList = (requestsData.requests || []).filter(r => 
//             r.status === 'submitted' || r.status === 'under_review'
//           );
//           setPendingRequests(pendingRequestsList);
//         }

//         // Fetch matches
//         const matchesRes = await fetch(`${BACKEND_URL}/api/admin/match-suggestions`, { headers });
//         const matchesData = await matchesRes.json();
        
//         if (matchesData.success) {
//           setMatches(matchesData.suggestions || []);
//         }

//         // Fetch support requests
//         await fetchSupportRequests(headers);
        
//         // Fetch support stats
//         await fetchSupportStats(headers);

//         // Calculate stats
//         const totalConsultants = consultantsData.consultants?.length || 0;
//         const pendingConsultantsCount = (consultantsData.consultants || []).filter(c => 
//           c.subscription_status === 'pending' || !c.is_verified
//         ).length;
//         const verifiedConsultants = totalConsultants - pendingConsultantsCount;
        
//         // Fetch clients if endpoint exists
//         let totalClients = 0;
//         try {
//           const clientsRes = await fetch(`${BACKEND_URL}/api/admin/clients`, { headers });
//           const clientsData = await clientsRes.json();
//           if (clientsData.success) {
//             totalClients = clientsData.clients?.length || 0;
//             setClients(clientsData.clients || []);
//           }
//         } catch (clientErr) {
//           console.warn('Could not fetch clients:', clientErr);
//         }
        
//         const activeMatches = (matchesData.suggestions || []).filter(m => 
//           m.admin_review_status === 'shortlisted' || m.admin_review_status === 'contacted'
//         ).length;
        
//         const totalRequests = requestsData.requests?.length || 0;
//         const pendingRequestsCount = (requestsData.requests || []).filter(r => 
//           r.status === 'submitted' || r.status === 'under_review'
//         ).length;
        
//         // Calculate revenue (€99 per active consultant)
//         const activeConsultants = (consultantsData.consultants || []).filter(c => 
//           c.subscription_status === 'active'
//         ).length;
//         const revenue = activeConsultants * 99;

//         setStats({
//           totalConsultants,
//           pendingConsultants: pendingConsultantsCount,
//           verifiedConsultants,
//           totalClients,
//           activeMatches,
//           totalRequests,
//           pendingRequests: pendingRequestsCount,
//           revenue,
//           monthlyGrowth: 15 // Mock data for now
//         });

//       } catch (err) {
//         console.error('Error fetching admin data:', err);
//         setError('Failed to load dashboard data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [BACKEND_URL]);

//   // Fetch support requests
//   const fetchSupportRequests = async (headers) => {
//     try {
//       const params = new URLSearchParams();
//       if (selectedStatus !== 'all') params.append('status', selectedStatus);
//       if (selectedPriority !== 'all') params.append('priority', selectedPriority);
//       if (searchTerm) params.append('search', searchTerm);
      
//       const response = await fetch(
//         `${BACKEND_URL}/api/admin/support-requests?${params.toString()}`,
//         { headers }
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         setSupportRequests(data.requests || []);
//       }
//     } catch (err) {
//       console.error('Error fetching support requests:', err);
//     }
//   };

//   // Fetch support stats
//   const fetchSupportStats = async (headers) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-stats`, { headers });
//       const data = await response.json();
      
//       if (data.success) {
//         setSupportStats(data.stats);
//       }
//     } catch (err) {
//       console.error('Error fetching support stats:', err);
//     }
//   };

//   // Fetch single ticket details
//   const fetchTicketDetails = async (ticketId) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('auth_token');
//       const headers = {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json'
//       };
      
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}`, { headers });
//       const data = await response.json();
      
//       if (data.success) {
//         setSelectedTicketDetails(data.request);
//         setTicketReplies(data.replies || []);
//         setViewMode('detail');
//       }
//     } catch (err) {
//       console.error('Error fetching ticket details:', err);
//       setError('Failed to load ticket details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit reply to ticket
//   const handleSubmitReply = async (ticketId) => {
//     if (!replyMessage.trim()) return;
    
//     try {
//       setSubmittingReply(true);
//       const token = localStorage.getItem('auth_token');
//       const headers = {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json'
//       };
      
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/reply`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           message: replyMessage,
//           isInternal: isInternalNote
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Refresh ticket details
//         await fetchTicketDetails(ticketId);
//         setReplyMessage('');
//         setIsInternalNote(false);
//       }
//     } catch (err) {
//       console.error('Error submitting reply:', err);
//       setError('Failed to submit reply');
//     } finally {
//       setSubmittingReply(false);
//     }
//   };

//   // Update ticket status
//   const handleUpdateTicketStatus = async (ticketId, newStatus) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const headers = {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json'
//       };
      
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/status`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ status: newStatus })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Refresh data
//         await fetchSupportRequests(headers);
//         await fetchSupportStats(headers);
//         if (viewMode === 'detail' && selectedTicketDetails) {
//           await fetchTicketDetails(ticketId);
//         }
//       }
//     } catch (err) {
//       console.error('Error updating ticket status:', err);
//     }
//   };

//   // Assign ticket to admin
//   const handleAssignTicket = async (ticketId) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const headers = {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json'
//       };
      
//       // Get current admin ID (you might need to fetch this from your auth context)
//       const adminId = user?.id;
      
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/assign`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ adminId })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Refresh data
//         await fetchSupportRequests(headers);
//         if (viewMode === 'detail' && selectedTicketDetails) {
//           await fetchTicketDetails(ticketId);
//         }
//       }
//     } catch (err) {
//       console.error('Error assigning ticket:', err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'pending':
//       case 'submitted':
//       case 'new':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'verified':
//       case 'active':
//       case 'shortlisted':
//       case 'resolved':
//         return 'bg-green-100 text-green-800';
//       case 'rejected':
//       case 'closed':
//         return 'bg-red-100 text-red-800';
//       case 'pending_intro':
//         return 'bg-blue-100 text-blue-800';
//       case 'intro_sent':
//       case 'contacting':
//       case 'in_progress':
//         return 'bg-purple-100 text-purple-800';
//       case 'under_review':
//         return 'bg-orange-100 text-orange-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'critical':
//         return 'bg-red-100 text-red-800';
//       case 'high':
//         return 'bg-orange-100 text-orange-800';
//       case 'normal':
//         return 'bg-blue-100 text-blue-800';
//       case 'low':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} minutes ago`;
//     if (diffHours < 24) return `${diffHours} hours ago`;
//     if (diffDays < 7) return `${diffDays} days ago`;
    
//     return date.toLocaleDateString();
//   };

//   const filteredConsultants = consultants.filter(c => 
//     c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     c.positions?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredRequests = requests.filter(r => 
//     r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     r.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading && activeTab !== 'support') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md p-8">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ErrorBoundary>
//       <div className="min-h-screen bg-gray-50">
//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl`}>
//           <div className="h-full flex flex-col">
//             {/* Sidebar Header */}
//             <div className="px-4 py-6 border-b border-gray-700">
//               <div className="flex items-center space-x-3">
//                   <div className="rounded-lg">
//               <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Admin Panel</h2>
//                   <p className="text-xs text-gray-400">Web Consultant Hub</p>
//                 </div>
//               </div>
//             </div>

//             {/* Admin Info */}
//             <div className="px-4 py-4 border-b border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-bold">A</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-sm">{user?.email || 'Admin'}</p>
//                   <p className="text-xs text-gray-400">Administrator</p>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
//               <button
//                 onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <BarChart className="w-5 h-5 mr-3" />
//                 Overview
//               </button>

//               <button
//                 onClick={() => { setActiveTab('consultants'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'consultants' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <Users className="w-5 h-5 mr-3" />
//                 Consultants
//                 {stats.pendingConsultants > 0 && (
//                   <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                     {stats.pendingConsultants}
//                   </span>
//                 )}
//               </button>

//               <button
//                 onClick={() => { setActiveTab('clients'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'clients' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <Briefcase className="w-5 h-5 mr-3" />
//                 Clients
//               </button>

//               <button
//                 onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <FileText className="w-5 h-5 mr-3" />
//                 Requests
//                 {stats.pendingRequests > 0 && (
//                   <span className="ml-auto bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
//                     {stats.pendingRequests}
//                   </span>
//                 )}
//               </button>

//               <button
//                 onClick={() => { setActiveTab('matches'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'matches' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <LinkIcon className="w-5 h-5 mr-3" />
//                 Matches
//               </button>

//               <button
//                 onClick={() => { 
//                   setActiveTab('support'); 
//                   setViewMode('list');
//                   setSidebarOpen(false); 
//                 }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'support' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <MessageSquare className="w-5 h-5 mr-3" />
//                 Support
//                 {supportStats.new > 0 && (
//                   <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     {supportStats.new}
//                   </span>
//                 )}
//               </button>

//               <button
//                 onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
//                 className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                   activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 <Settings className="w-5 h-5 mr-3" />
//                 Settings
//               </button>
//             </nav>

//             {/* Sidebar Footer */}
//             <div className="px-4 py-4 border-t border-gray-700">
//               <button 
//                 onClick={logout}
//                 className="flex items-center text-gray-300 hover:text-white w-full px-4 py-2 text-sm"
//               >
//                 <LogOut className="w-5 h-5 mr-3" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:pl-64">
//           {/* Top Navigation */}
//           <nav className="bg-white shadow-sm sticky top-0 z-10">
//             <div className="px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between items-center h-16">
//                 {/* Mobile menu button */}
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden text-gray-500 hover:text-gray-700"
//                 >
//                   <Menu className="w-6 h-6" />
//                 </button>

//                 {/* Search Bar - Only show in list views */}
//                 {(activeTab === 'consultants' || activeTab === 'requests' || 
//                   (activeTab === 'support' && viewMode === 'list')) && (
//                   <div className="hidden md:block flex-1 max-w-md ml-4">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder={`Search ${activeTab}...`}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Back button for support detail view */}
//                 {activeTab === 'support' && viewMode === 'detail' && (
//                   <button
//                     onClick={() => {
//                       setViewMode('list');
//                       setSelectedTicketDetails(null);
//                       setTicketReplies([]);
//                     }}
//                     className="flex items-center text-gray-600 hover:text-gray-900"
//                   >
//                     <ArrowLeft className="w-5 h-5 mr-2" />
//                     Back to Support List
//                   </button>
//                 )}

//                 {/* Right side icons */}
//                 <div className="flex items-center space-x-4 ml-auto">
//                   <button className="relative p-2 text-gray-400 hover:text-gray-600">
//                     <Bell className="w-6 h-6" />
//                     {supportStats.new > 0 && (
//                       <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                     )}
//                   </button>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
//                       A
//                     </div>
//                     <span className="hidden md:block text-sm font-medium text-gray-700">
//                       {user?.email || 'Admin User'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           {/* Page Content */}
//           <main className="p-4 sm:p-6 lg:p-8">
//             {activeTab === 'overview' && (
//               <>
//                 {/* Welcome Header */}
//                 <div className="mb-8">
//                   <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
//                   <p className="text-gray-600">Here's what's happening with your platform today.</p>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   {/* Consultants Card */}
//                   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="bg-blue-100 p-3 rounded-lg">
//                         <Users className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <span className="text-sm text-gray-500">Total</span>
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900">{stats.totalConsultants}</h3>
//                     <p className="text-gray-600 text-sm">Registered Consultants</p>
//                     <div className="mt-4 flex items-center text-sm">
//                       <span className="text-yellow-600 font-medium">{stats.pendingConsultants} pending</span>
//                       <span className="text-gray-300 mx-2">|</span>
//                       <span className="text-green-600 font-medium">{stats.verifiedConsultants} verified</span>
//                     </div>
//                   </div>

//                   {/* Clients Card */}
//                   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="bg-purple-100 p-3 rounded-lg">
//                         <Briefcase className="w-6 h-6 text-purple-600" />
//                       </div>
//                       <span className="text-sm text-gray-500">Active</span>
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900">{stats.totalClients}</h3>
//                     <p className="text-gray-600 text-sm">Active Clients</p>
//                     <div className="mt-4 flex items-center text-sm">
//                       <span className="text-green-600 font-medium">{stats.totalRequests} open requests</span>
//                     </div>
//                   </div>

//                   {/* Active Matches Card */}
//                   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="bg-green-100 p-3 rounded-lg">
//                         <LinkIcon className="w-6 h-6 text-green-600" />
//                       </div>
//                       <span className="text-sm text-gray-500">Active</span>
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900">{stats.activeMatches}</h3>
//                     <p className="text-gray-600 text-sm">Active Matches</p>
//                     <div className="mt-4 flex items-center text-sm">
//                       <span className="text-blue-600 font-medium">+{stats.monthlyGrowth} this week</span>
//                     </div>
//                   </div>

//                   {/* Revenue Card */}
//                   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="bg-yellow-100 p-3 rounded-lg">
//                         <TrendingUp className="w-6 h-6 text-yellow-600" />
//                       </div>
//                       <span className="text-sm text-gray-500">Annual</span>
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900">€{stats.revenue.toLocaleString()}</h3>
//                     <p className="text-gray-600 text-sm">Revenue (YTD)</p>
//                     <div className="mt-4 flex items-center text-sm">
//                       <span className="text-green-600 font-medium">+{stats.monthlyGrowth}% vs last month</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Support Stats Card */}
//                 <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-lg font-semibold text-gray-900">Support Overview</h2>
//                     <button 
//                       onClick={() => { setActiveTab('support'); setViewMode('list'); }}
//                       className="text-sm text-blue-600 hover:text-blue-700"
//                     >
//                       View All Tickets
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-gray-900">{supportStats.total}</p>
//                       <p className="text-xs text-gray-600">Total Tickets</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-yellow-600">{supportStats.new}</p>
//                       <p className="text-xs text-gray-600">New</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-purple-600">{supportStats.inProgress}</p>
//                       <p className="text-xs text-gray-600">In Progress</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-green-600">{supportStats.resolved}</p>
//                       <p className="text-xs text-gray-600">Resolved</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-blue-600">{supportStats.avgResponseTime}h</p>
//                       <p className="text-xs text-gray-600">Avg Response</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pending Approvals Section */}
//                 <div className="grid lg:grid-cols-2 gap-6">
//                   {/* Pending Consultants */}
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Pending Consultant Approvals</h2>
//                       <button 
//                         onClick={() => setActiveTab('consultants')}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="p-6">
//                       {pendingConsultants.length > 0 ? (
//                         pendingConsultants.slice(0, 5).map((consultant) => (
//                           <div key={consultant.id} className="flex items-center justify-between py-3 border-b last:border-0">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                                 <span className="text-sm font-semibold text-gray-600">
//                                   {consultant.full_name?.split(' ').map(n => n[0]).join('') || '?'}
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900">{consultant.full_name}</p>
//                                 <p className="text-sm text-gray-600">{consultant.positions || 'Consultant'}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('pending')}`}>
//                                 Pending
//                               </span>
//                               <button 
//                                 onClick={() => handleVerifyConsultant(consultant.id)}
//                                 className="p-1 text-green-600 hover:text-green-700"
//                                 title="Verify"
//                               >
//                                 <CheckCircle className="w-5 h-5" />
//                               </button>
//                               <button className="p-1 text-gray-400 hover:text-gray-600">
//                                 <Eye className="w-5 h-5" />
//                               </button>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8 text-gray-500">
//                           No pending consultant approvals
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Pending Client Requests */}
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Pending Client Requests</h2>
//                       <button 
//                         onClick={() => setActiveTab('requests')}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="p-6">
//                       {pendingRequests.length > 0 ? (
//                         pendingRequests.slice(0, 5).map((request) => (
//                           <div key={request.id} className="flex items-center justify-between py-3 border-b last:border-0">
//                             <div>
//                               <p className="font-medium text-gray-900">{request.title}</p>
//                               <p className="text-sm text-gray-600">{request.company_name} • {request.budget_amount ? `€${request.budget_amount}` : 'Budget TBD'}</p>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
//                                 {request.status?.replace('_', ' ')}
//                               </span>
//                               <button 
//                                 onClick={() => handleUpdateRequestStatus(request.id, 'under_review')}
//                                 className="p-1 text-blue-600 hover:text-blue-700"
//                                 title="Start Review"
//                               >
//                                 <Eye className="w-5 h-5" />
//                               </button>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8 text-gray-500">
//                           No pending requests
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Recent Support Tickets */}
//                   <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h2>
//                       <button 
//                         onClick={() => { setActiveTab('support'); setViewMode('list'); }}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                           {supportRequests.slice(0, 5).map((ticket) => (
//                             <tr key={ticket._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => fetchTicketDetails(ticket._id)}>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                                 {ticket.ticketId}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
//                                 <div className="text-xs text-gray-500">{ticket.email}</div>
//                               </td>
//                               <td className="px-6 py-4">
//                                 <div className="text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
//                                   {ticket.priority}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
//                                   {ticket.status?.replace('_', ' ')}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {formatDate(ticket.createdAt)}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                 <button 
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     fetchTicketDetails(ticket._id);
//                                   }}
//                                   className="text-blue-600 hover:text-blue-800"
//                                 >
//                                   View
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                           {supportRequests.length === 0 && (
//                             <tr>
//                               <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
//                                 No support tickets found
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Consultants Tab */}
//             {activeTab === 'consultants' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900">Consultant Management</h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultant</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {filteredConsultants.map((consultant) => (
//                         <tr key={consultant.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
//                                 <span className="text-xs font-semibold">
//                                   {consultant.full_name?.split(' ').map(n => n[0]).join('')}
//                                 </span>
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900">{consultant.full_name}</div>
//                                 <div className="text-sm text-gray-500">{consultant.email}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {consultant.positions || 'Not specified'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {consultant.base_city}, {consultant.base_country}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultant.is_verified ? 'verified' : 'pending')}`}>
//                               {consultant.is_verified ? 'Verified' : 'Pending'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultant.subscription_status)}`}>
//                               {consultant.subscription_status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
//                             {!consultant.is_verified && (
//                               <button 
//                                 onClick={() => handleVerifyConsultant(consultant.id)}
//                                 className="text-green-600 hover:text-green-800"
//                               >
//                                 Verify
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* Requests Tab */}
//             {activeTab === 'requests' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900">Client Requests</h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {filteredRequests.map((request) => (
//                         <tr key={request.id}>
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-medium text-gray-900">{request.title}</div>
//                             <div className="text-sm text-gray-500">{request.position_name}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {request.company_name}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             €{request.budget_amount} {request.budget_type}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
//                               {request.status?.replace('_', ' ')}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {request.match_count || 0} matches
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             <select
//                               onChange={(e) => handleUpdateRequestStatus(request.id, e.target.value)}
//                               value={request.status}
//                               className="text-sm border border-gray-300 rounded-lg px-2 py-1"
//                             >
//                               <option value="submitted">Submitted</option>
//                               <option value="under_review">Under Review</option>
//                               <option value="contacting">Contacting</option>
//                               <option value="shortlist_ready">Shortlist Ready</option>
//                               <option value="closed">Closed</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* Support Tab - List View */}
//             {activeTab === 'support' && viewMode === 'list' && (
//               <div className="space-y-6">
//                 {/* Support Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-gray-900">{supportStats.total}</p>
//                     <p className="text-xs text-gray-600">Total Tickets</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-yellow-600">{supportStats.new}</p>
//                     <p className="text-xs text-gray-600">New</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-purple-600">{supportStats.inProgress}</p>
//                     <p className="text-xs text-gray-600">In Progress</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-green-600">{supportStats.resolved}</p>
//                     <p className="text-xs text-gray-600">Resolved</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-gray-900">{supportStats.closed}</p>
//                     <p className="text-xs text-gray-600">Closed</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                     <p className="text-2xl font-bold text-blue-600">{supportStats.avgResponseTime}h</p>
//                     <p className="text-xs text-gray-600">Avg Response</p>
//                   </div>
//                 </div>

//                 {/* Priority Breakdown */}
//                 <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                   <h3 className="text-sm font-medium text-gray-700 mb-3">Tickets by Priority</h3>
//                   <div className="grid grid-cols-4 gap-4">
//                     <div className="text-center">
//                       <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                       <span className="text-sm text-gray-600">Low: {supportStats.byPriority.low}</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
//                       <span className="text-sm text-gray-600">Normal: {supportStats.byPriority.normal}</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
//                       <span className="text-sm text-gray-600">High: {supportStats.byPriority.high}</span>
//                     </div>
//                     <div className="text-center">
//                       <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
//                       <span className="text-sm text-gray-600">Critical: {supportStats.byPriority.critical}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
//                   <div className="flex flex-wrap gap-4">
//                     <div className="flex items-center space-x-2">
//                       <FilterIcon className="w-5 h-5 text-gray-400" />
//                       <select
//                         value={selectedStatus}
//                         onChange={(e) => {
//                           setSelectedStatus(e.target.value);
//                           const token = localStorage.getItem('auth_token');
//                           fetchSupportRequests({ Authorization: `Bearer ${token}` });
//                         }}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                       >
//                         <option value="all">All Status</option>
//                         <option value="new">New</option>
//                         <option value="in_progress">In Progress</option>
//                         <option value="resolved">Resolved</option>
//                         <option value="closed">Closed</option>
//                       </select>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Tag className="w-5 h-5 text-gray-400" />
//                       <select
//                         value={selectedPriority}
//                         onChange={(e) => {
//                           setSelectedPriority(e.target.value);
//                           const token = localStorage.getItem('auth_token');
//                           fetchSupportRequests({ Authorization: `Bearer ${token}` });
//                         }}
//                         className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                       >
//                         <option value="all">All Priority</option>
//                         <option value="low">Low</option>
//                         <option value="normal">Normal</option>
//                         <option value="high">High</option>
//                         <option value="critical">Critical</option>
//                       </select>
//                     </div>
//                     <button
//                       onClick={() => {
//                         setSelectedStatus('all');
//                         setSelectedPriority('all');
//                         setSearchTerm('');
//                         const token = localStorage.getItem('auth_token');
//                         fetchSupportRequests({ Authorization: `Bearer ${token}` });
//                       }}
//                       className="text-sm text-gray-600 hover:text-gray-900"
//                     >
//                       Clear Filters
//                     </button>
//                   </div>
//                 </div>

//                 {/* Tickets Table */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200">
//                         {supportRequests.map((ticket) => (
//                           <tr key={ticket._id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                               {ticket.ticketId}
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
//                               <div className="text-xs text-gray-500">{ticket.email}</div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
//                                 {ticket.priority}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
//                                 {ticket.status?.replace('_', ' ')}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                               {ticket.role}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {formatDate(ticket.createdAt)}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm">
//                               <button
//                                 onClick={() => fetchTicketDetails(ticket._id)}
//                                 className="text-blue-600 hover:text-blue-800 mr-3"
//                               >
//                                 View
//                               </button>
//                               <select
//                                 onChange={(e) => handleUpdateTicketStatus(ticket._id, e.target.value)}
//                                 value={ticket.status}
//                                 className="text-xs border border-gray-300 rounded px-2 py-1"
//                               >
//                                 <option value="new">New</option>
//                                 <option value="in_progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                                 <option value="closed">Closed</option>
//                               </select>
//                             </td>
//                           </tr>
//                         ))}
//                         {supportRequests.length === 0 && (
//                           <tr>
//                             <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
//                               No support tickets found
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Support Tab - Detail View */}
//             {activeTab === 'support' && viewMode === 'detail' && selectedTicketDetails && (
//               <div className="space-y-6">
//                 {/* Ticket Header */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">{selectedTicketDetails.subject}</h2>
//                       <p className="text-sm text-gray-600 mt-1">
//                         Ticket #{selectedTicketDetails.ticketId} • Created {new Date(selectedTicketDetails.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedTicketDetails.priority)}`}>
//                         {selectedTicketDetails.priority}
//                       </span>
//                       <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedTicketDetails.status)}`}>
//                         {selectedTicketDetails.status?.replace('_', ' ')}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <p className="text-xs text-gray-500">From</p>
//                       <p className="text-sm font-medium">{selectedTicketDetails.name}</p>
//                       <p className="text-xs text-gray-600">{selectedTicketDetails.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Role</p>
//                       <p className="text-sm font-medium capitalize">{selectedTicketDetails.role}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Assigned To</p>
//                       <p className="text-sm font-medium">
//                         {selectedTicketDetails.assignedTo?.email || 'Unassigned'}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Actions</p>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <button
//                           onClick={() => handleAssignTicket(selectedTicketDetails._id)}
//                           className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//                         >
//                           Assign to me
//                         </button>
//                         <select
//                           onChange={(e) => handleUpdateTicketStatus(selectedTicketDetails._id, e.target.value)}
//                           value={selectedTicketDetails.status}
//                           className="text-xs border border-gray-300 rounded px-2 py-1"
//                         >
//                           <option value="new">New</option>
//                           <option value="in_progress">In Progress</option>
//                           <option value="resolved">Resolved</option>
//                           <option value="closed">Closed</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Original Message */}
//                   <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedTicketDetails.message}</p>
//                     {selectedTicketDetails.attachments?.length > 0 && (
//                       <div className="mt-4">
//                         <p className="text-xs font-medium text-gray-500 mb-2">Attachments:</p>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedTicketDetails.attachments.map((att, idx) => (
//                             <a
//                               key={idx}
//                               href={`${BACKEND_URL}${att}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
//                             >
//                               <Paperclip className="w-4 h-4 text-gray-400" />
//                               <span className="text-blue-600">{att.split('/').pop()}</span>
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Replies */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h3>
                  
//                   <div className="space-y-4 mb-6">
//                     {ticketReplies.map((reply, index) => (
//                       <div key={index} className={`flex ${reply.userRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
//                         <div className={`max-w-[80%] ${reply.userRole === 'admin' ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg p-4`}>
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium">
//                               {reply.userRole === 'admin' ? 'Support Team' : reply.userRole}
//                               {reply.isInternal && (
//                                 <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
//                                   Internal Note
//                                 </span>
//                               )}
//                             </span>
//                             <span className="text-xs text-gray-500">
//                               {new Date(reply.createdAt).toLocaleString()}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-800 whitespace-pre-wrap">{reply.message}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Reply Form */}
//                   <div className="border-t border-gray-200 pt-6">
//                     <h4 className="text-sm font-medium text-gray-700 mb-3">Add Reply</h4>
//                     <textarea
//                       value={replyMessage}
//                       onChange={(e) => setReplyMessage(e.target.value)}
//                       placeholder="Type your reply here..."
//                       rows="4"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     />
                    
//                     <div className="flex items-center justify-between mt-4">
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={isInternalNote}
//                           onChange={(e) => setIsInternalNote(e.target.checked)}
//                           className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                         />
//                         <span className="text-sm text-gray-700">Mark as internal note (admin only)</span>
//                       </label>
                      
//                       <button
//                         onClick={() => handleSubmitReply(selectedTicketDetails._id)}
//                         disabled={!replyMessage.trim() || submittingReply}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                       >
//                         {submittingReply ? (
//                           <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                             Sending...
//                           </>
//                         ) : (
//                           <>
//                             <Send className="w-4 h-4 mr-2" />
//                             Send Reply
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default AdminDashboard;


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
  AlertTriangle,
  HelpCircle,
  Paperclip,
  Send,
  Reply,
  Tag,
  Filter as FilterIcon,
  ArrowLeft,
  LifeBuoy,
  Ticket
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AvailabilityCalendar from '../../components/AvailabilityCalendar';
import AgendaWidget from '../../components/AgendaWidget';

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

// Support Ticket Component for admin
const AdminSupportTicket = ({ ticket, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
      onClick={() => onViewDetails(ticket)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-mono text-blue-600">{ticket.ticketId}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
          {ticket.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.message}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <span>{ticket.name}</span>
          <span>•</span>
          <span>{ticket.role}</span>
        </div>
        <span>{formatDate(ticket.createdAt)}</span>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout, BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  
  // Support modal states
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'detail'
  
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

  // Support data states
  const [supportStats, setSupportStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    avgResponseTime: 0,
    byPriority: {
      low: 0,
      normal: 0,
      high: 0,
      critical: 0
    }
  });

  const [supportRequests, setSupportRequests] = useState([]);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(null);
  const [ticketReplies, setTicketReplies] = useState([]);

  const [consultants, setConsultants] = useState([]);
  const [clients, setClients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [matches, setMatches] = useState([]);
  const [pendingConsultants, setPendingConsultants] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});

  // Handle availability change (for admin oversight)
  const handleAvailabilityChange = (date, status, timeRange) => {
    console.log('Admin updating consultant availability:', { date, status, timeRange });
    // This would update the consultant's availability in the database
  };

  // Handle viewing consultant availability
  const handleViewConsultantAvailability = (consultant) => {
    setSelectedConsultant(consultant);
    setShowAvailabilityModal(true);
  };

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

      // Fetch consultants (this now includes next_available from backend)
      const consultantsRes = await fetch(`${BACKEND_URL}/api/admin/consultants`, { headers });
      const consultantsData = await consultantsRes.json();
      
      if (consultantsData.success) {
        setConsultants(consultantsData.consultants || []);
        const pendingConsultantsList = (consultantsData.consultants || []).filter(c => 
          c.subscription_status === 'pending' || !c.is_verified
        );
        setPendingConsultants(pendingConsultantsList);
        
        // Fetch availability for each consultant to display in the table
        const availabilityMap = {};
        for (const consultant of (consultantsData.consultants || [])) {
          if (consultant.email) {
            try {
              const availRes = await fetch(`${BACKEND_URL}/api/availability/consultant/${encodeURIComponent(consultant.email)}`, { headers });
              const availData = await availRes.json();
              if (availData.success) {
                availabilityMap[consultant.id || consultant._id] = availData.availability;
              }
            } catch (err) {
              console.error(`Error fetching availability for ${consultant.email}:`, err);
            }
          }
        }
        setAvailabilityData(availabilityMap);
      }

      // Fetch requests
      const requestsRes = await fetch(`${BACKEND_URL}/api/admin/requests`, { headers });
      const requestsData = await requestsRes.json();
      
      if (requestsData.success) {
        setRequests(requestsData.requests || []);
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

      // Fetch support requests
      await fetchSupportRequests(headers);
      
      // Fetch support stats
      await fetchSupportStats(headers);

      // Calculate stats
      const totalConsultants = consultantsData.consultants?.length || 0;
      const pendingConsultantsCount = (consultantsData.consultants || []).filter(c => 
        c.subscription_status === 'pending' || !c.is_verified
      ).length;
      const verifiedConsultants = totalConsultants - pendingConsultantsCount;
      
      // Fetch clients if endpoint exists
      let totalClients = 0;
      try {
        const clientsRes = await fetch(`${BACKEND_URL}/api/admin/clients`, { headers });
        const clientsData = await clientsRes.json();
        if (clientsData.success) {
          totalClients = clientsData.clients?.length || 0;
          setClients(clientsData.clients || []);
        }
      } catch (clientErr) {
        console.warn('Could not fetch clients:', clientErr);
      }
      
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
        monthlyGrowth: 15
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


useEffect(() => {
  if (consultants.length > 0) {
    console.log('Consultants data:', consultants);
    console.log('Availability data map:', availabilityData);
    
    // Check a specific consultant's availability
    const testConsultant = consultants.find(c => c.email === 'pssudhir405@gmail.com');
    if (testConsultant) {
      const avail = availabilityData[testConsultant.id || testConsultant._id];
      console.log('Availability for pssudhir405@gmail.com:', avail);
    }
  }
}, [consultants, availabilityData]);
  // Fetch support requests
  const fetchSupportRequests = async (headers) => {
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== 'all') params.append('status', selectedStatus);
      if (selectedPriority !== 'all') params.append('priority', selectedPriority);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(
        `${BACKEND_URL}/api/admin/support-requests?${params.toString()}`,
        { headers }
      );
      const data = await response.json();
      
      if (data.success) {
        setSupportRequests(data.requests || []);
      }
    } catch (err) {
      console.error('Error fetching support requests:', err);
    }
  };

  // Fetch support stats
  const fetchSupportStats = async (headers) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/support-stats`, { headers });
      const data = await response.json();
      
      if (data.success) {
        setSupportStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching support stats:', err);
    }
  };

  // Fetch single ticket details
  const fetchTicketDetails = async (ticketId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };
      
      const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}`, { headers });
      const data = await response.json();
      
      if (data.success) {
        setSelectedTicketDetails(data.request);
        setTicketReplies(data.replies || []);
        setViewMode('detail');
      }
    } catch (err) {
      console.error('Error fetching ticket details:', err);
      setError('Failed to load ticket details');
    } finally {
      setLoading(false);
    }
  };

  // Submit reply to ticket
  const handleSubmitReply = async (ticketId) => {
    if (!replyMessage.trim()) return;
    
    try {
      setSubmittingReply(true);
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };
      
      const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/reply`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: replyMessage,
          isInternal: isInternalNote
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh ticket details
        await fetchTicketDetails(ticketId);
        setReplyMessage('');
        setIsInternalNote(false);
      }
    } catch (err) {
      console.error('Error submitting reply:', err);
      setError('Failed to submit reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  // Update ticket status
  const handleUpdateTicketStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };
      
      const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh data
        await fetchSupportRequests(headers);
        await fetchSupportStats(headers);
        if (viewMode === 'detail' && selectedTicketDetails) {
          await fetchTicketDetails(ticketId);
        }
      }
    } catch (err) {
      console.error('Error updating ticket status:', err);
    }
  };

  // Assign ticket to admin
  const handleAssignTicket = async (ticketId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };
      
      // Get current admin ID (you might need to fetch this from your auth context)
      const adminId = user?.id;
      
      const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/assign`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ adminId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh data
        await fetchSupportRequests(headers);
        if (viewMode === 'detail' && selectedTicketDetails) {
          await fetchTicketDetails(ticketId);
        }
      }
    } catch (err) {
      console.error('Error assigning ticket:', err);
    }
  };

  // Verify consultant
  const handleVerifyConsultant = async (consultantId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/consultants/${consultantId}/verify`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh consultants list
        const headers = {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        };
        const consultantsRes = await fetch(`${BACKEND_URL}/api/admin/consultants`, { headers });
        const consultantsData = await consultantsRes.json();
        if (consultantsData.success) {
          setConsultants(consultantsData.consultants || []);
          setPendingConsultants((consultantsData.consultants || []).filter(c => 
            c.subscription_status === 'pending' || !c.is_verified
          ));
        }
      }
    } catch (err) {
      console.error('Error verifying consultant:', err);
    }
  };

  // Update request status
  const handleUpdateRequestStatus = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh requests list
        const headers = {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        };
        const requestsRes = await fetch(`${BACKEND_URL}/api/admin/requests`, { headers });
        const requestsData = await requestsRes.json();
        if (requestsData.success) {
          setRequests(requestsData.requests || []);
          setPendingRequests((requestsData.requests || []).filter(r => 
            r.status === 'submitted' || r.status === 'under_review'
          ));
        }
      }
    } catch (err) {
      console.error('Error updating request status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
      case 'submitted':
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
      case 'active':
      case 'shortlisted':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'pending_intro':
        return 'bg-blue-100 text-blue-800';
      case 'intro_sent':
      case 'contacting':
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'under_review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
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

  if (loading && activeTab !== 'support') {
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
                <div className="rounded-lg">
                  <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
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
                onClick={() => { 
                  setActiveTab('support'); 
                  setViewMode('list');
                  setSidebarOpen(false); 
                }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'support' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Support
                {supportStats.new > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {supportStats.new}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('availability'); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
                  activeTab === 'availability' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Availability Overview
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

                {/* Search Bar - Only show in list views */}
                {(activeTab === 'consultants' || activeTab === 'requests' || 
                  (activeTab === 'support' && viewMode === 'list')) && (
                  <div className="hidden md:block flex-1 max-w-md ml-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search ${activeTab}...`}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {/* Back button for support detail view */}
                {activeTab === 'support' && viewMode === 'detail' && (
                  <button
                    onClick={() => {
                      setViewMode('list');
                      setSelectedTicketDetails(null);
                      setTicketReplies([]);
                    }}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Support List
                  </button>
                )}

                {/* Right side icons */}
                <div className="flex items-center space-x-4 ml-auto">
                  <button className="relative p-2 text-gray-400 hover:text-gray-600">
                    <Bell className="w-6 h-6" />
                    {supportStats.new > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
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

                {/* Support Stats Card */}
                <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Support Overview</h2>
                    <button 
                      onClick={() => { setActiveTab('support'); setViewMode('list'); }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View All Tickets
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{supportStats.total}</p>
                      <p className="text-xs text-gray-600">Total Tickets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{supportStats.new}</p>
                      <p className="text-xs text-gray-600">New</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{supportStats.inProgress}</p>
                      <p className="text-xs text-gray-600">In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{supportStats.resolved}</p>
                      <p className="text-xs text-gray-600">Resolved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{supportStats.avgResponseTime}h</p>
                      <p className="text-xs text-gray-600">Avg Response</p>
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
                          <div key={consultant.id || consultant._id} className="flex items-center justify-between py-3 border-b last:border-0">
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
                                onClick={() => handleVerifyConsultant(consultant.id || consultant._id)}
                                className="p-1 text-green-600 hover:text-green-700"
                                title="Verify"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleViewConsultantAvailability(consultant)}
                                className="p-1 text-blue-600 hover:text-blue-700"
                                title="View Availability"
                              >
                                <Calendar className="w-5 h-5" />
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
                          <div key={request.id || request._id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div>
                              <p className="font-medium text-gray-900">{request.title}</p>
                              <p className="text-sm text-gray-600">{request.company_name} • {request.budget_amount ? `€${request.budget_amount}` : 'Budget TBD'}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                                {request.status?.replace('_', ' ')}
                              </span>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id || request._id, 'under_review')}
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

                  {/* Recent Support Tickets */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h2>
                      <button 
                        onClick={() => { setActiveTab('support'); setViewMode('list'); }}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {supportRequests.slice(0, 5).map((ticket) => (
                            <tr key={ticket._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => fetchTicketDetails(ticket._id)}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                {ticket.ticketId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
                                <div className="text-xs text-gray-500">{ticket.email}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                                  {ticket.priority}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                                  {ticket.status?.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(ticket.createdAt)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    fetchTicketDetails(ticket._id);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                          {supportRequests.length === 0 && (
                            <tr>
                              <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                No support tickets found
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

            {/* Availability Overview Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Consultant Availability Overview</h2>
                      <p className="text-gray-600 mt-1">View and manage consultant availability for the next 6 months</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        onChange={(e) => {
                          const consultant = consultants.find(c => {
                            const consultantId = c.id || c._id;
                            return consultantId === e.target.value;
                          });
                          if (consultant) handleViewConsultantAvailability(consultant);
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        style={{ color: '#111827' }}
                        value=""
                      >
                        <option key="default-select-option" value="" style={{ color: '#111827' }}>
                          Select a consultant...
                        </option>
                        {consultants.map(c => {
                          const consultantId = c.id || c._id;
                          const consultantName = c.full_name || c.fullName || c.name || 'Unnamed Consultant';
                          return (
                            <option key={`consultant-${consultantId}`} value={consultantId} style={{ color: '#111827' }}>
                              {consultantName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Calendar Widget - Aggregated View */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Consultants Availability (Aggregated)</h3>
                    <AvailabilityCalendar
                      userId="all"
                      userType="admin"
                      BACKEND_URL={BACKEND_URL}
                      onAvailabilityChange={handleAvailabilityChange}
                      compact={false}
                    />
                  </div>

                  {/* Consultant List with Availability Status */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultant Availability Status</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Available</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {consultants.slice(0, 10).map((consultant) => {
                            const consultantId = consultant.id || consultant._id;
                            // Calculate next available date from availability data
                            const consultantAvailability = availabilityData[consultantId] || {};
                            const nextAvailable = Object.keys(consultantAvailability).find(
                              date => consultantAvailability[date]?.status === 'available'
                            );
                            {console.log(consultant)}
                            return (
                              <tr key={consultantId} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-xs font-semibold">
                                        {consultant.full_name?.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{consultant.full_name}</div>
                                      <div className="text-xs text-gray-500">{consultant.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {consultant.positions || 'General'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {nextAvailable ? new Date(nextAvailable).toLocaleDateString() : 'No availability set'}
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    consultant.subscription_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {consultant.subscription_status === 'active' ? 'Active' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    onClick={() => handleViewConsultantAvailability(consultant)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    View Calendar
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
                      {filteredConsultants.map((consultant) => {
                        const consultantId = consultant.id || consultant._id;
                        return (
                          <tr key={consultantId}>
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
                              <button 
                                onClick={() => handleViewConsultantAvailability(consultant)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Availability
                              </button>
                              <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                              {!consultant.is_verified && (
                                <button 
                                  onClick={() => handleVerifyConsultant(consultantId)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  Verify
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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
                      {filteredRequests.map((request) => {
                        const requestId = request.id || request._id;
                        return (
                          <tr key={requestId}>
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
                                onChange={(e) => handleUpdateRequestStatus(requestId, e.target.value)}
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Client Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clients.map((client) => {
                        const clientId = client.id || client._id;
                        return (
                          <tr key={clientId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{client.company_name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{client.contact_name}</div>
                              <div className="text-xs text-gray-500">{client.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {client.industry}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(client.is_verified ? 'verified' : 'pending')}`}>
                                {client.is_verified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {client.request_count || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <button className="text-blue-600 hover:text-blue-800">View</button>
                            </td>
                          </tr>
                        );
                      })}
                      {clients.length === 0 && (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                            No clients found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Match Suggestions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {matches.map((match) => {
                        const matchId = match.id || match._id;
                        return (
                          <tr key={matchId}>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{match.request_title}</div>
                              <div className="text-xs text-gray-500">{match.company_name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{match.consultant_name}</div>
                              <div className="text-xs text-gray-500">{match.consultant_email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm font-medium">{match.match_score}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(match.admin_review_status)}`}>
                                {match.admin_review_status?.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <select
                                onChange={(e) => {
                                  // Handle match status update
                                  console.log('Update match status:', matchId, e.target.value);
                                }}
                                value={match.admin_review_status}
                                className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                              >
                                <option value="suggested">Suggested</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="contacted">Contacted</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                      {matches.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No match suggestions yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Support Tab - List View */}
            {activeTab === 'support' && viewMode === 'list' && (
              <div className="space-y-6">
                {/* Support Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{supportStats.total}</p>
                    <p className="text-xs text-gray-600">Total Tickets</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-yellow-600">{supportStats.new}</p>
                    <p className="text-xs text-gray-600">New</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-purple-600">{supportStats.inProgress}</p>
                    <p className="text-xs text-gray-600">In Progress</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-green-600">{supportStats.resolved}</p>
                    <p className="text-xs text-gray-600">Resolved</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{supportStats.closed}</p>
                    <p className="text-xs text-gray-600">Closed</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                    <p className="text-2xl font-bold text-blue-600">{supportStats.avgResponseTime}h</p>
                    <p className="text-xs text-gray-600">Avg Response</p>
                  </div>
                </div>

                {/* Priority Breakdown */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Tickets by Priority</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">Low: {supportStats.byPriority.low}</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">Normal: {supportStats.byPriority.normal}</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">High: {supportStats.byPriority.high}</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-600">Critical: {supportStats.byPriority.critical}</span>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <FilterIcon className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedStatus}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                          const token = localStorage.getItem('auth_token');
                          fetchSupportRequests({ Authorization: `Bearer ${token}` });
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <select
                        value={selectedPriority}
                        onChange={(e) => {
                          setSelectedPriority(e.target.value);
                          const token = localStorage.getItem('auth_token');
                          fetchSupportRequests({ Authorization: `Bearer ${token}` });
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="all">All Priority</option>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedStatus('all');
                        setSelectedPriority('all');
                        setSearchTerm('');
                        const token = localStorage.getItem('auth_token');
                        fetchSupportRequests({ Authorization: `Bearer ${token}` });
                      }}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {supportRequests.map((ticket) => (
                          <tr key={ticket._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {ticket.ticketId}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{ticket.name}</div>
                              <div className="text-xs text-gray-500">{ticket.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">{ticket.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                                {ticket.status?.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {ticket.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(ticket.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => fetchTicketDetails(ticket._id)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                View
                              </button>
                              <select
                                onChange={(e) => handleUpdateTicketStatus(ticket._id, e.target.value)}
                                value={ticket.status}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                        {supportRequests.length === 0 && (
                          <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                              No support tickets found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Support Tab - Detail View */}
            {activeTab === 'support' && viewMode === 'detail' && selectedTicketDetails && (
              <div className="space-y-6">
                {/* Ticket Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTicketDetails.subject}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Ticket #{selectedTicketDetails.ticketId} • Created {new Date(selectedTicketDetails.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedTicketDetails.priority)}`}>
                        {selectedTicketDetails.priority}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedTicketDetails.status)}`}>
                        {selectedTicketDetails.status?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-sm font-medium">{selectedTicketDetails.name}</p>
                      <p className="text-xs text-gray-600">{selectedTicketDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="text-sm font-medium capitalize">{selectedTicketDetails.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="text-sm font-medium">
                        {selectedTicketDetails.assignedTo?.email || 'Unassigned'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Actions</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => handleAssignTicket(selectedTicketDetails._id)}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          Assign to me
                        </button>
                        <select
                          onChange={(e) => handleUpdateTicketStatus(selectedTicketDetails._id, e.target.value)}
                          value={selectedTicketDetails.status}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Original Message */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedTicketDetails.message}</p>
                    {selectedTicketDetails.attachments?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-gray-500 mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedTicketDetails.attachments.map((att, idx) => (
                            <a
                              key={`attachment-${idx}`}
                              href={`${BACKEND_URL}${att}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
                            >
                              <Paperclip className="w-4 h-4 text-gray-400" />
                              <span className="text-blue-600">{att.split('/').pop()}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Replies */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h3>
                  
                  <div className="space-y-4 mb-6">
                    {ticketReplies.map((reply, index) => (
                      <div key={`reply-${index}`} className={`flex ${reply.userRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${reply.userRole === 'admin' ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {reply.userRole === 'admin' ? 'Support Team' : reply.userRole}
                              {reply.isInternal && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                  Internal Note
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">{reply.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Add Reply</h4>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    
                    <div className="flex items-center justify-between mt-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isInternalNote}
                          onChange={(e) => setIsInternalNote(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Mark as internal note (admin only)</span>
                      </label>
                      
                      <button
                        onClick={() => handleSubmitReply(selectedTicketDetails._id)}
                        disabled={!replyMessage.trim() || submittingReply}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {submittingReply ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reply
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Maintenance Mode</span>
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Allow New Consultant Registrations</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Allow New Client Registrations</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Subscription</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Consultant Monthly Fee (€)</label>
                        <input
                          type="number"
                          defaultValue="99"
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Client Platform Fee (%)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Email Notifications for New Support Tickets</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Email Notifications for Consultant Verifications</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Daily Summary Reports</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Consultant Availability Modal */}
        {showAvailabilityModal && selectedConsultant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedConsultant.full_name || selectedConsultant.fullName} - Availability</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage availability for the next 6 months</p>
                </div>
                <button 
                  onClick={() => setShowAvailabilityModal(false)} 
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <AvailabilityCalendar
                  userId={selectedConsultant.email}
                  userType="consultant"
                  BACKEND_URL={BACKEND_URL}
                  onAvailabilityChange={handleAvailabilityChange}
                />
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowAvailabilityModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;