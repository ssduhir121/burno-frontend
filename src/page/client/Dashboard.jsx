

// // src/page/client/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Briefcase,
//   Users,
//   Settings,
//   LogOut,
//   Bell,
//   Menu,
//   Plus,
//   Search,
//   FileText,
//   MessageSquare,
//   Calendar,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   AlertCircle,
//   Star,
//   Building,
//   Target,
//   UserCheck,
//   X,
//   Loader,
//   MapPin,
//   Filter,
//   HelpCircle,
//   LifeBuoy,
//   Ticket,
//   Send,
//   ChevronRight,
//   Mail,
//   Phone,
//   Grid,
//   List,
//   Eye,
//   ExternalLink
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import ContactSupportModal from '../../components/modals/ContactSupportModal';
// import AvailabilityCalendar from '../../components/AvailabilityCalendar';
// import AgendaWidget from '../../components/AgendaWidget';
// import ProfileCompletionBanner from '../../components/ProfileCompletionBanner';
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
//     console.error('Client Dashboard Error:', error, errorInfo);
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
//             <p className="text-gray-600 mb-6">We're having trouble loading your dashboard. Please try again.</p>
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

// // Support Ticket Component
// const SupportTicket = ({ ticket, onViewDetails }) => {
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'new': return 'bg-yellow-100 text-yellow-800';
//       case 'in_progress': return 'bg-blue-100 text-blue-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'critical': return 'bg-red-100 text-red-800';
//       case 'high': return 'bg-orange-100 text-orange-800';
//       case 'normal': return 'bg-blue-100 text-blue-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
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

//   return (
//     <div 
//       className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
//       onClick={() => onViewDetails(ticket)}
//     >
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <div className="flex items-center space-x-2 mb-1">
//             <span className="text-sm font-mono text-blue-600">{ticket.ticketId}</span>
//             <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
//               {ticket.priority}
//             </span>
//           </div>
//           <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
//         </div>
//         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
//           {ticket.status.replace('_', ' ')}
//         </span>
//       </div>
//       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.message}</p>
//       <div className="flex items-center justify-between text-xs text-gray-500">
//         <span>{formatDate(ticket.createdAt)}</span>
//         <span className="flex items-center text-blue-600">
//           View Details <ChevronRight className="w-4 h-4 ml-1" />
//         </span>
//       </div>
//     </div>
//   );
// };

// // Ticket Details Modal
// const TicketDetailsModal = ({ ticket, onClose, onReply }) => {
//   const [replyMessage, setReplyMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmitReply = async () => {
//     if (!replyMessage.trim()) return;
//     setSubmitting(true);
//     await onReply(ticket._id, replyMessage);
//     setReplyMessage('');
//     setSubmitting(false);
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'new': return 'bg-yellow-100 text-yellow-800';
//       case 'in_progress': return 'bg-blue-100 text-blue-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'critical': return 'bg-red-100 text-red-800';
//       case 'high': return 'bg-orange-100 text-orange-800';
//       case 'normal': return 'bg-blue-100 text-blue-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//             <h2 className="text-xl font-bold text-gray-900">Ticket #{ticket.ticketId}</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X className="w-6 h-6" />
//             </button>
//           </div>
          
//           <div className="p-6">
//             <div className="mb-6">
//               <div className="flex items-center space-x-2 mb-3">
//                 <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(ticket.priority)}`}>
//                   {ticket.priority} priority
//                 </span>
//                 <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(ticket.status)}`}>
//                   {ticket.status.replace('_', ' ')}
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h3>
//               <p className="text-sm text-gray-600">Created on {new Date(ticket.createdAt).toLocaleString()}</p>
//             </div>

//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-medium text-gray-900">Your Message</span>
//                 <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
//             </div>

//             {ticket.replies && ticket.replies.length > 0 && (
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-900 mb-4">Conversation</h4>
//                 <div className="space-y-4">
//                   {ticket.replies.map((reply, index) => (
//                     <div key={index} className={`p-4 rounded-lg ${
//                       reply.userRole === 'admin' ? 'bg-blue-50 ml-4' : 'bg-gray-50'
//                     }`}>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium text-gray-900">
//                           {reply.userRole === 'admin' ? 'Support Team' : 'You'}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {new Date(reply.createdAt).toLocaleString()}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 whitespace-pre-wrap">{reply.message}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
//               <div className="border-t border-gray-200 pt-6">
//                 <h4 className="font-medium text-gray-900 mb-3">Add Reply</h4>
//                 <textarea
//                   value={replyMessage}
//                   onChange={(e) => setReplyMessage(e.target.value)}
//                   placeholder="Type your reply here..."
//                   rows="4"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                 />
//                 <div className="flex justify-end mt-3">
//                   <button
//                     onClick={handleSubmitReply}
//                     disabled={!replyMessage.trim() || submitting}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader className="w-4 h-4 animate-spin mr-2" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4 mr-2" />
//                         Send Reply
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ClientDashboard = () => {
//   const { user, logout, BACKEND_URL, profileCompletion } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showNewRequestModal, setShowNewRequestModal] = useState(false);
//   const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [supportTickets, setSupportTickets] = useState([]);
//   const [supportLoading, setSupportLoading] = useState(false);
//   const [positions, setPositions] = useState([]);
//   const [calendarView, setCalendarView] = useState('full');
//   const [dashboardData, setDashboardData] = useState({
//     profile: null,
//     requests: [],
//     matches: []
//   });

//   const [newRequest, setNewRequest] = useState({
//     position: '',
//     title: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     budgetType: 'daily',
//     budgetAmount: '',
//     currency: 'EUR',
//     workCountry: '',
//     workCity: '',
//     workMode: 'remote'
//   });

//   // Check if profile is complete
//   useEffect(() => {
//     if (user && !profileCompletion?.basicInfo) {
//       navigate('/client/profile-setup');
//     }
//   }, [user, profileCompletion, navigate]);

//   const handleAvailabilityChange = (date, status, timeRange) => {
//     console.log('Consultant availability viewed:', { date, status, timeRange });
//   };

//   // Fetch dashboard data
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       if (!user?.email) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError('');
        
//         const token = localStorage.getItem('auth_token');
//         const response = await fetch(`${BACKEND_URL}/api/dashboard/${encodeURIComponent(user.email)}`, {
//           headers: {
//             'Authorization': token ? `Bearer ${token}` : '',
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           setDashboardData({
//             profile: result.data.profile || null,
//             requests: Array.isArray(result.data.recentRequests) ? result.data.recentRequests : [],
//             matches: Array.isArray(result.data.recentMatches) ? result.data.recentMatches : []
//           });
//           await fetchSupportTickets();
//         } else {
//           setError(result.error || 'Failed to load dashboard data');
//         }
//       } catch (err) {
//         console.error('Error fetching dashboard:', err);
//         setError('Network error. Please check your connection and try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [user, BACKEND_URL]);

//   // Fetch support tickets
//   const fetchSupportTickets = async () => {
//     if (!user?.email) return;
    
//     try {
//       setSupportLoading(true);
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/support/user/${encodeURIComponent(user.email)}`, {
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setSupportTickets(data.requests || []);
//       }
//     } catch (err) {
//       console.error('Error fetching support tickets:', err);
//     } finally {
//       setSupportLoading(false);
//     }
//   };

//   // Fetch ticket details
//   const fetchTicketDetails = async (ticket) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(
//         `${BACKEND_URL}/api/support/ticket/${ticket.ticketId}?email=${encodeURIComponent(user.email)}`,
//         {
//           headers: {
//             'Authorization': token ? `Bearer ${token}` : '',
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       const data = await response.json();
//       if (data.success) {
//         setSelectedTicket({
//           ...data.request,
//           replies: data.replies || []
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching ticket details:', err);
//     }
//   };

//   // Submit reply to ticket
//   const handleSubmitReply = async (ticketId, message) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/reply`, {
//         method: 'POST',
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message, isInternal: false })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         if (selectedTicket) {
//           await fetchTicketDetails(selectedTicket);
//         }
//         await fetchSupportTickets();
//       }
//     } catch (err) {
//       console.error('Error submitting reply:', err);
//     }
//   };

//   // Fetch positions
//   useEffect(() => {
//     const fetchPositions = async () => {
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/positions`);
//         const result = await response.json();
//         if (result.success) {
//           setPositions(result.positions || []);
//         }
//       } catch (err) {
//         console.error('Error fetching positions:', err);
//       }
//     };
//     fetchPositions();
//   }, [BACKEND_URL]);

//   const companyProfile = dashboardData.profile ? {
//     name: dashboardData.profile.companyName || user?.name || 'Company Name',
//     industry: dashboardData.profile.industry || 'Technology',
//     size: dashboardData.profile.companySize || 'Company size not set',
//     location: dashboardData.profile.location || 'Location not set',
//     verified: dashboardData.profile.isVerified || false,
//     contactName: dashboardData.profile.contactName || '',
//     contactTitle: dashboardData.profile.contactTitle || '',
//     phone: dashboardData.profile.phone || '',
//     website: dashboardData.profile.website || ''
//   } : {
//     name: user?.name || 'Company Name',
//     industry: 'Technology',
//     size: 'Company size not set',
//     location: 'Location not set',
//     verified: false,
//     contactName: '',
//     contactTitle: '',
//     phone: '',
//     website: ''
//   };

//   const activeRequests = Array.isArray(dashboardData.requests) 
//     ? dashboardData.requests.map(request => ({
//         id: request._id || request.id,
//         title: request.title || 'Untitled Request',
//         posted: request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'Recently',
//         proposals: request.proposal_count || 0,
//         shortlisted: request.shortlisted_count || 0,
//         matchCount: request.matchCount || 0,
//         status: request.status || 'submitted',
//         position: request.positionName || request.position_id?.name || 'General',
//         workMode: request.workMode || 'remote',
//         location: request.workCity && request.workCountry 
//           ? `${request.workCity}, ${request.workCountry}`
//           : 'Location TBD'
//       }))
//     : [];

//   const matches = Array.isArray(dashboardData.matches)
//     ? dashboardData.matches.map(match => ({
//         id: match._id || match.id,
//         consultant: match.consultantName || match.consultant_name || 'Consultant',
//         expertise: match.consultantPositions || match.expertise || 'General',
//         matchScore: match.matchScore || 0,
//         status: match.adminReviewStatus || match.status || 'suggested',
//         proposedRate: match.proposedRate || 'Rate TBD',
//         location: match.consultantLocation || match.location || 'Location not specified',
//         companyName: match.companyName || ''
//       }))
//     : [];

//   const stats = [
//     { 
//       label: 'Active Projects', 
//       value: activeRequests.filter(r => r.status !== 'closed').length.toString(), 
//       icon: <Briefcase className="w-5 h-5" />,
//       change: '+0%'
//     },
//     { 
//       label: 'Total Proposals', 
//       value: activeRequests.reduce((sum, r) => sum + (r.proposals || 0), 0).toString(), 
//       icon: <FileText className="w-5 h-5" />,
//       change: '0 new'
//     },
//     { 
//       label: 'Interviews', 
//       value: matches.filter(m => m.status === 'interviewing' || m.status === 'shortlisted').length.toString(), 
//       icon: <Users className="w-5 h-5" />,
//       change: '0 scheduled'
//     },
//     { 
//       label: 'Time to Match', 
//       value: '2.5 days', 
//       icon: <Clock className="w-5 h-5" />,
//       change: '-0.5 days'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'submitted': return 'bg-yellow-100 text-yellow-800';
//       case 'under_review': return 'bg-blue-100 text-blue-800';
//       case 'contacting': return 'bg-purple-100 text-purple-800';
//       case 'shortlist_ready': return 'bg-green-100 text-green-800';
//       case 'closed': return 'bg-gray-100 text-gray-800';
//       case 'interviewing': return 'bg-blue-100 text-blue-800';
//       case 'shortlisted': return 'bg-green-100 text-green-800';
//       case 'suggested': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRequest(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitRequest = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/client/create-request`, {
//         method: 'POST',
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: user.email,
//           ...newRequest
//         })
//       });

//       const result = await response.json();

//       if (result.success) {
//         setShowNewRequestModal(false);
//         const dashboardResponse = await fetch(`${BACKEND_URL}/api/dashboard/${encodeURIComponent(user.email)}`, {
//           headers: { 'Authorization': token ? `Bearer ${token}` : '' }
//         });
//         const dashboardResult = await dashboardResponse.json();
//         if (dashboardResult.success && dashboardResult.data) {
//           setDashboardData({
//             profile: dashboardResult.data.profile || null,
//             requests: Array.isArray(dashboardResult.data.recentRequests) ? dashboardResult.data.recentRequests : [],
//             matches: Array.isArray(dashboardResult.data.recentMatches) ? dashboardResult.data.recentMatches : []
//           });
//         }
//       } else {
//         setError(result.error || 'Failed to create request');
//       }
//     } catch (err) {
//       console.error('Error creating request:', err);
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !dashboardData.profile) {
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
//         <ContactSupportModal 
//           isOpen={isSupportModalOpen}
//           onClose={() => setIsSupportModalOpen(false)}
//         />

//         {selectedTicket && (
//           <TicketDetailsModal
//             ticket={selectedTicket}
//             onClose={() => setSelectedTicket(null)}
//             onReply={handleSubmitReply}
//           />
//         )}

//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl`}>
//           <div className="h-full flex flex-col">
//             <div className="px-4 py-6 border-b border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg">
//                   <img src="/logo.png" alt="Logo" className="h-12 object-contain" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Client Panel</h2>
//                   <p className="text-xs text-gray-400">Web Consultant Hub</p>
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 py-4 border-b border-gray-700">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
//                   <Building className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="font-medium">{companyProfile.name}</p>
//                   <p className="text-xs text-gray-400">{companyProfile.industry}</p>
//                 </div>
//               </div>
//             </div>

//             <nav className="flex-1 px-2 py-4 space-y-1">
//               {[
//                 { id: 'overview', label: 'Overview', icon: <Target className="w-5 h-5" /> },
//                 { id: 'calendar', label: 'Calendar & Agenda', icon: <Calendar className="w-5 h-5" /> },
//                 { id: 'requests', label: 'My Requests', icon: <FileText className="w-5 h-5" /> },
//                 { id: 'matches', label: 'Matches', icon: <UserCheck className="w-5 h-5" /> },
//                 { id: 'consultants', label: 'Consultants', icon: <Users className="w-5 h-5" /> },
//                 { id: 'support', label: 'Support', icon: <LifeBuoy className="w-5 h-5" /> },
//                 { id: 'profile', label: 'Company Profile', icon: <Building className="w-5 h-5" /> },
//                 { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
//                   className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                     activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
//                   }`}
//                 >
//                   {item.icon}
//                   <span className="ml-3">{item.label}</span>
//                 </button>
//               ))}
//             </nav>

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
//           <nav className="bg-white shadow-sm sticky top-0 z-10">
//             <div className="px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between items-center h-16">
//                 <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
//                   <Menu className="w-6 h-6" />
//                 </button>
//                 <div className="flex-1 flex justify-end items-center space-x-4">
//                   <button className="relative p-2 text-gray-400 hover:text-gray-600">
//                     <Bell className="w-6 h-6" />
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                   </button>
//                   <button onClick={() => setIsSupportModalOpen(true)} className="p-2 text-gray-400 hover:text-gray-600" title="Contact Support">
//                     <HelpCircle className="w-6 h-6" />
//                   </button>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
//                       {companyProfile.name.charAt(0)}
//                     </div>
//                     <span className="hidden md:block text-sm font-medium text-gray-700">{companyProfile.name}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           <main className="p-4 sm:p-6 lg:p-8">
//             <ProfileCompletionBanner profileCompletion={profileCompletion} />
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <>
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Welcome back, {companyProfile.name}</h1>
//                     <p className="text-gray-600">Find the perfect consultant for your projects.</p>
//                   </div>
//                   <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
//                     <Plus className="w-5 h-5 mr-2" />
//                     New Request
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   {stats.map((stat, index) => (
//                     <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="bg-blue-100 p-3 rounded-lg text-blue-600">{stat.icon}</div>
//                         <span className="text-sm text-green-600">{stat.change}</span>
//                       </div>
//                       <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//                       <p className="text-gray-600 text-sm">{stat.label}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-semibold text-gray-900">Consultant Schedule Preview</h2>
//                     <button onClick={() => setActiveTab('calendar')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                       View Full Calendar →
//                     </button>
//                   </div>
//                   <div className="grid lg:grid-cols-2 gap-6">
//                     <AvailabilityCalendar
//                       userId="all"
//                       userType="client"
//                       BACKEND_URL={BACKEND_URL}
//                       readOnly={true}
//                       onAvailabilityChange={handleAvailabilityChange}
//                       compact={true}
//                     />
//                     <AgendaWidget
//                       userId={user?.email}
//                       userType="client"
//                       BACKEND_URL={BACKEND_URL}
//                       compact={true}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid lg:grid-cols-2 gap-6">
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Active Requests</h2>
//                       <button onClick={() => setActiveTab('requests')} className="text-sm text-blue-600 hover:text-blue-700">View All</button>
//                     </div>
//                     <div className="p-6">
//                       {activeRequests.length > 0 ? (
//                         activeRequests.slice(0, 3).map((request) => (
//                           <div key={request.id} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer">
//                             <div className="flex justify-between items-start mb-2">
//                               <h3 className="font-medium text-gray-900">{request.title}</h3>
//                               <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
//                                 {request.status.replace('_', ' ')}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 mb-2">{request.position}</p>
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center space-x-4 text-gray-500">
//                                 <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{request.location}</span>
//                                 <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{request.workMode}</span>
//                               </div>
//                               <div className="flex items-center space-x-4">
//                                 <span className="text-gray-600">{request.matchCount} matches</span>
//                                 <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View →</button>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8">
//                           <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <FileText className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <p className="text-gray-500 mb-2">No active requests</p>
//                           <button onClick={() => setShowNewRequestModal(true)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                             Create your first request →
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
//                       <button onClick={() => setActiveTab('support')} className="text-sm text-blue-600 hover:text-blue-700">View All</button>
//                     </div>
//                     <div className="p-6">
//                       {supportLoading ? (
//                         <div className="flex justify-center py-8"><Loader className="w-6 h-6 animate-spin text-blue-600" /></div>
//                       ) : supportTickets.length > 0 ? (
//                         <div className="space-y-3">
//                           {supportTickets.slice(0, 2).map((ticket) => (
//                             <div key={ticket._id} onClick={() => fetchTicketDetails(ticket)} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
//                               <div className="flex items-center justify-between mb-1">
//                                 <span className="text-xs font-mono text-blue-600">{ticket.ticketId}</span>
//                                 <span className={`px-2 py-0.5 text-xs rounded-full ${ticket.status === 'new' ? 'bg-yellow-100 text-yellow-800' : ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
//                                   {ticket.status}
//                                 </span>
//                               </div>
//                               <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
//                               <p className="text-xs text-gray-500 mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</p>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center py-6">
//                           <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                             <Ticket className="w-6 h-6 text-gray-400" />
//                           </div>
//                           <p className="text-gray-500 text-sm mb-2">No support tickets</p>
//                           <button onClick={() => setIsSupportModalOpen(true)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                             Contact Support →
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {matches.length > 0 && (
//                   <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Top Consultant Matches</h2>
//                       <button onClick={() => setActiveTab('matches')} className="text-sm text-blue-600 hover:text-blue-700">View All Matches</button>
//                     </div>
//                     <div className="p-6">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         {matches.slice(0, 2).map((match) => (
//                           <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                             <div className="flex items-start justify-between mb-3">
//                               <div>
//                                 <h3 className="font-semibold text-gray-900">{match.consultant}</h3>
//                                 <p className="text-sm text-gray-600">{match.expertise}</p>
//                               </div>
//                               <div className="flex items-center">
//                                 <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                                 <span className="text-sm font-medium ml-1">{match.matchScore}%</span>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center space-x-2 text-gray-500">
//                                 <MapPin className="w-4 h-4" />
//                                 <span>{match.location}</span>
//                               </div>
//                               <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Contact →</button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Calendar Tab */}
//             {activeTab === 'calendar' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Consultant Availability & Agenda</h1>
//                     <p className="text-gray-600 mt-1">View consultant availability and track your upcoming engagements</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button onClick={() => setCalendarView('full')} className={`p-2 rounded-lg transition ${calendarView === 'full' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
//                       <Grid className="w-5 h-5" />
//                     </button>
//                     <button onClick={() => setCalendarView('compact')} className={`p-2 rounded-lg transition ${calendarView === 'compact' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`grid ${calendarView === 'full' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
//                   <div className={calendarView === 'full' ? 'lg:col-span-2' : 'lg:col-span-1'}>
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                       <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                         <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                         Consultant Availability Calendar
//                       </h2>
//                       <p className="text-sm text-gray-500 mb-4">View when consultants are available for new projects. Green dates show available consultants.</p>
//                       <AvailabilityCalendar
//                         userId="all"
//                         userType="client"
//                         BACKEND_URL={BACKEND_URL}
//                         readOnly={true}
//                         onAvailabilityChange={handleAvailabilityChange}
//                         compact={calendarView === 'compact'}
//                       />
//                     </div>
//                   </div>

//                   <div className={calendarView === 'full' ? 'lg:col-span-1' : 'lg:col-span-1'}>
//                     <AgendaWidget
//                       userId={user?.email}
//                       userType="client"
//                       BACKEND_URL={BACKEND_URL}
//                       compact={calendarView === 'compact'}
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
//                     Upcoming Interviews
//                   </h2>
//                   {matches.filter(m => m.status === 'shortlisted' || m.status === 'interviewing').length > 0 ? (
//                     <div className="space-y-3">
//                       {matches.filter(m => m.status === 'shortlisted' || m.status === 'interviewing').map((match) => (
//                         <div key={match.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
//                           <div>
//                             <p className="font-medium text-gray-900">{match.consultant}</p>
//                             <p className="text-sm text-gray-600">{match.expertise}</p>
//                           </div>
//                           <div className="text-right">
//                             <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mb-1">
//                               {match.status === 'shortlisted' ? 'Shortlisted' : 'Interview Scheduled'}
//                             </span>
//                             <button className="block text-sm text-blue-600 hover:text-blue-700 mt-1">Schedule Interview →</button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8 text-gray-500">
//                       <p>No upcoming interviews</p>
//                       <p className="text-sm mt-1">When consultants are shortlisted, interviews will appear here</p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
//                   <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
//                     <HelpCircle className="w-5 h-5 mr-2" />
//                     Consultant Availability Tips
//                   </h3>
//                   <ul className="text-sm text-blue-800 space-y-1">
//                     <li>• Green dates show when consultants are available for new projects</li>
//                     <li>• Click on any date to see which consultants are available that day</li>
//                     <li>• Create a request to get matched with available consultants</li>
//                     <li>• Once matched, you'll be able to schedule interviews directly</li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Requests Tab */}
//             {activeTab === 'requests' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">My Project Requests</h2>
//                   <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm">
//                     <Plus className="w-4 h-4 mr-2" />
//                     New Request
//                   </button>
//                 </div>
//                 {activeRequests.length > 0 ? (
//                   <div className="space-y-4">
//                     {activeRequests.map((request) => (
//                       <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <h3 className="font-semibold text-gray-900">{request.title}</h3>
//                             <p className="text-sm text-gray-600">{request.position}</p>
//                           </div>
//                           <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
//                             {request.status.replace('_', ' ')}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center space-x-4 text-gray-500">
//                             <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{request.location}</span>
//                             <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{request.workMode}</span>
//                           </div>
//                           <div className="flex items-center space-x-4">
//                             <span className="text-gray-600">{request.matchCount} matches</span>
//                             <button className="text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FileText className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
//                     <p className="text-gray-500 mb-6">Create your first project request to find consultants</p>
//                     <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
//                       Create New Request
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Matches Tab */}
//             {activeTab === 'matches' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Consultant Matches</h2>
//                 {matches.length > 0 ? (
//                   <div className="space-y-4">
//                     {matches.map((match) => (
//                       <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <div className="flex items-center space-x-2 mb-1">
//                               <h3 className="font-semibold text-gray-900">{match.consultant}</h3>
//                               <div className="flex items-center">
//                                 <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                                 <span className="text-sm font-medium ml-1">{match.matchScore}%</span>
//                               </div>
//                             </div>
//                             <p className="text-sm text-gray-600">{match.expertise}</p>
//                           </div>
//                           <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
//                             {match.status}
//                           </span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
//                           <div className="flex items-center text-gray-500"><MapPin className="w-4 h-4 mr-1" />{match.location}</div>
//                           <div className="flex items-center text-gray-500"><DollarSign className="w-4 h-4 mr-1" />{match.proposedRate}</div>
//                         </div>
//                         <div className="flex justify-end">
//                           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Contact Consultant</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <UserCheck className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
//                     <p className="text-gray-500 mb-6">Create a project request to get matched with consultants</p>
//                     <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
//                       Create Request
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Consultants Tab */}
//             {activeTab === 'consultants' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">Browse Consultants</h2>
//                     <p className="text-gray-600 mt-1">Find and connect with top consultants</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="relative">
//                       <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input type="text" placeholder="Search consultants..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                     </div>
//                     <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Filter className="w-5 h-5 text-gray-500" /></button>
//                   </div>
//                 </div>
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Users className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Consultant Directory Coming Soon</h3>
//                   <p className="text-gray-500">Create a project request and we'll find the best matches for you</p>
//                   <button onClick={() => setShowNewRequestModal(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//                     Create Request
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Support Tab */}
//             {activeTab === 'support' && (
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
//                       <p className="text-gray-600 mt-1">Get help with your projects, account, or technical issues</p>
//                     </div>
//                     <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center">
//                       <HelpCircle className="w-5 h-5 mr-2" />
//                       Contact Support
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-4">
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><Mail className="w-6 h-6 text-blue-600" /></div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
//                     <p className="text-sm text-gray-600 mb-3">support@webconsultanthub.com</p>
//                     <p className="text-xs text-gray-500">Reply within 24 hours</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><MessageSquare className="w-6 h-6 text-green-600" /></div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
//                     <p className="text-sm text-gray-600 mb-3">Chat with support team</p>
//                     <p className="text-xs text-gray-500">Available 24/7</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><FileText className="w-6 h-6 text-purple-600" /></div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
//                     <p className="text-sm text-gray-600 mb-3">Browse knowledge base</p>
//                     <p className="text-xs text-gray-500">Self-service resources</p>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
//                   {supportLoading ? (
//                     <div className="flex justify-center py-8"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>
//                   ) : supportTickets.length > 0 ? (
//                     <div className="space-y-4">
//                       {supportTickets.map((ticket) => (
//                         <SupportTicket key={ticket._id} ticket={ticket} onViewDetails={fetchTicketDetails} />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Ticket className="w-8 h-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
//                       <p className="text-gray-500 mb-4">You haven't created any support tickets yet</p>
//                       <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
//                         Create Support Ticket
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
//                   <div className="space-y-4">
//                     <div className="border-b border-gray-200 pb-4">
//                       <h4 className="font-medium text-gray-900 mb-2">How do I create a new project request?</h4>
//                       <p className="text-sm text-gray-600">Click on the "New Request" button in your dashboard or navigate to the Requests tab and click "Create New Request". Fill in the project details and submit.</p>
//                     </div>
//                     <div className="border-b border-gray-200 pb-4">
//                       <h4 className="font-medium text-gray-900 mb-2">How long does it take to get matches?</h4>
//                       <p className="text-sm text-gray-600">Our average match time is 48 hours. Our admin team manually reviews each request to find the most suitable consultants.</p>
//                     </div>
//                     <div className="border-b border-gray-200 pb-4">
//                       <h4 className="font-medium text-gray-900 mb-2">Can I communicate with consultants directly?</h4>
//                       <p className="text-sm text-gray-600">Yes, after a match is made and both parties express interest, you'll be able to communicate directly through our messaging system.</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-900 mb-2">What if I'm not satisfied with a match?</h4>
//                       <p className="text-sm text-gray-600">If a consultant isn't the right fit, contact our support team. We'll work with you to find alternative matches until you're satisfied.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Edit Profile</button>
//                 </div>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Company Information</h3>
//                     <div className="space-y-4">
//                       <div><label className="text-sm text-gray-500">Company Name</label><p className="font-medium text-gray-900">{companyProfile.name}</p></div>
//                       <div><label className="text-sm text-gray-500">Industry</label><p className="font-medium text-gray-900">{companyProfile.industry}</p></div>
//                       <div><label className="text-sm text-gray-500">Company Size</label><p className="font-medium text-gray-900">{companyProfile.size}</p></div>
//                       <div><label className="text-sm text-gray-500">Location</label><p className="font-medium text-gray-900 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" />{companyProfile.location}</p></div>
//                       {companyProfile.website && (<div><label className="text-sm text-gray-500">Website</label><p className="font-medium text-gray-900"><a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{companyProfile.website}</a></p></div>)}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
//                     <div className="space-y-4">
//                       <div><label className="text-sm text-gray-500">Contact Name</label><p className="font-medium text-gray-900">{companyProfile.contactName || 'Not provided'}</p></div>
//                       <div><label className="text-sm text-gray-500">Contact Title</label><p className="font-medium text-gray-900">{companyProfile.contactTitle || 'Not provided'}</p></div>
//                       <div><label className="text-sm text-gray-500">Phone</label><p className="font-medium text-gray-900">{companyProfile.phone || 'Not provided'}</p></div>
//                       <div><label className="text-sm text-gray-500">Email</label><p className="font-medium text-gray-900">{user?.email}</p></div>
//                     </div>
//                     {companyProfile.verified && (<div className="mt-6 flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /><span className="text-sm text-green-700">Verified Company</span></div>)}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for new matches</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for proposal updates</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Weekly project summaries</span></label>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Show company profile to consultants</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Share contact information with matched consultants</span></label>
//                     </div>
//                   </div>
//                   <div className="pt-4 border-t border-gray-200">
//                     <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">Delete Account</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>

//         {/* New Request Modal */}
//         {showNewRequestModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
//                 <h2 className="text-xl font-bold text-gray-900">New Project Request</h2>
//                 <button onClick={() => setShowNewRequestModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
//                   <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
//                 </button>
//               </div>
//               {error && (<div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"><AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" /><span className="text-sm">{error}</span></div>)}
//               <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
//                 <div><label className="block text-sm font-medium text-gray-700 mb-2">Position / Role *</label>
//                   <select name="position" value={newRequest.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
//                     <option value="">Select a position</option>
//                     {positions.map(pos => (<option key={pos._id} value={pos.name}>{pos.name}</option>))}
//                   </select>
//                 </div>
//                 <div><label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
//                   <input type="text" name="title" value={newRequest.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., AI Strategy Implementation" required />
//                 </div>
//                 <div><label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
//                   <textarea name="description" value={newRequest.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Describe your project requirements, goals, and expectations..." required />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
//                     <input type="date" name="startDate" value={newRequest.startDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
//                   </div>
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                     <input type="date" name="endDate" value={newRequest.endDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">Budget Type</label>
//                     <select name="budgetType" value={newRequest.budgetType} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
//                       <option value="daily">Daily Rate</option><option value="hourly">Hourly Rate</option><option value="fixed">Fixed Price</option>
//                     </select>
//                   </div>
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">Budget Amount *</label>
//                     <div className="flex"><select name="currency" value={newRequest.currency} onChange={handleInputChange} className="w-24 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"><option value="EUR">€</option><option value="USD">$</option><option value="GBP">£</option></select>
//                     <input type="number" name="budgetAmount" value={newRequest.budgetAmount} onChange={handleInputChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Amount" required /></div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
//                     <select name="workMode" value={newRequest.workMode} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
//                       <option value="remote">Remote</option><option value="on-site">On-site</option><option value="hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div><label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                     <input type="text" name="workCountry" value={newRequest.workCountry} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., Germany" />
//                   </div>
//                 </div>
//                 <div><label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                   <input type="text" name="workCity" value={newRequest.workCity} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., Berlin" />
//                 </div>
//                 <div className="flex justify-end space-x-4 pt-4 border-t">
//                   <button type="button" onClick={() => setShowNewRequestModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
//                   <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center">
//                     {loading ? (<><Loader className="w-4 h-4 animate-spin mr-2" />Submitting...</>) : 'Submit Request'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default ClientDashboard;





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
  Filter,
  HelpCircle,
  LifeBuoy,
  Ticket,
  Send,
  ChevronRight,
  Mail,
  Phone,
  Grid,
  List,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactSupportModal from '../../components/modals/ContactSupportModal';
import AvailabilityCalendar from '../../components/AvailabilityCalendar';
import AgendaWidget from '../../components/AgendaWidget';
import ProfileCompletionBanner from '../../components/ProfileCompletionBanner';
import ClientProfileCompletionModal from '../../components/ClientProfileCompletionModal';

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

// Support Ticket Component
const SupportTicket = ({ ticket, onViewDetails }) => {
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
        <span>{formatDate(ticket.createdAt)}</span>
        <span className="flex items-center text-blue-600">
          View Details <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </div>
  );
};

// Ticket Details Modal
const TicketDetailsModal = ({ ticket, onClose, onReply }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyMessage.trim()) return;
    setSubmitting(true);
    await onReply(ticket._id, replyMessage);
    setReplyMessage('');
    setSubmitting(false);
  };

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Ticket #{ticket.ticketId}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority} priority
                </span>
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h3>
              <p className="text-sm text-gray-600">Created on {new Date(ticket.createdAt).toLocaleString()}</p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Your Message</span>
                <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
            </div>

            {ticket.replies && ticket.replies.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Conversation</h4>
                <div className="space-y-4">
                  {ticket.replies.map((reply, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      reply.userRole === 'admin' ? 'bg-blue-50 ml-4' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {reply.userRole === 'admin' ? 'Support Team' : 'You'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{reply.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-3">Add Reply</h4>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleSubmitReply}
                    disabled={!replyMessage.trim() || submitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {submitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const { user, logout, BACKEND_URL, profileCompletion, updateProfileCompletion } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [calendarView, setCalendarView] = useState('full');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    requests: [],
    matches: []
  });

  const [newRequest, setNewRequest] = useState({
    position: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    budgetType: 'daily',
    budgetAmount: '',
    currency: 'EUR',
    workCountry: '',
    workCity: '',
    workMode: 'remote'
  });

  // Define fetchDashboardData as a function that can be called from multiple places
  const fetchDashboardData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/dashboard/${encodeURIComponent(user.email)}`, {
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
          requests: Array.isArray(result.data.recentRequests) ? result.data.recentRequests : [],
          matches: Array.isArray(result.data.recentMatches) ? result.data.recentMatches : []
        });
        await fetchSupportTickets();
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

  // Fetch support tickets
  const fetchSupportTickets = async () => {
    if (!user?.email) return;
    
    try {
      setSupportLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/support/user/${encodeURIComponent(user.email)}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setSupportTickets(data.requests || []);
      }
    } catch (err) {
      console.error('Error fetching support tickets:', err);
    } finally {
      setSupportLoading(false);
    }
  };

  // Fetch ticket details
  const fetchTicketDetails = async (ticket) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `${BACKEND_URL}/api/support/ticket/${ticket.ticketId}?email=${encodeURIComponent(user.email)}`,
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      if (data.success) {
        setSelectedTicket({
          ...data.request,
          replies: data.replies || []
        });
      }
    } catch (err) {
      console.error('Error fetching ticket details:', err);
    }
  };

  // Submit reply to ticket
  const handleSubmitReply = async (ticketId, message) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, isInternal: false })
      });
      
      const data = await response.json();
      if (data.success) {
        if (selectedTicket) {
          await fetchTicketDetails(selectedTicket);
        }
        await fetchSupportTickets();
      }
    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  // Fetch positions
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

  // Initial data fetch
  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user, BACKEND_URL]);

  // Check if profile is incomplete and show modal after delay
  useEffect(() => {
    if (user && profileCompletion.status !== 'complete') {
      const timer = setTimeout(() => {
        setShowProfileModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, profileCompletion]);

  const handleProfileComplete = () => {
    setShowProfileModal(false);
    // Refresh dashboard data
    fetchDashboardData();
  };

  const companyProfile = dashboardData.profile ? {
    name: dashboardData.profile.companyName || user?.name || 'Company Name',
    industry: dashboardData.profile.industry || 'Technology',
    size: dashboardData.profile.companySize || 'Company size not set',
    location: dashboardData.profile.location || 'Location not set',
    verified: dashboardData.profile.isVerified || false,
    contactName: dashboardData.profile.contactName || '',
    contactTitle: dashboardData.profile.contactTitle || '',
    phone: dashboardData.profile.phone || '',
    website: dashboardData.profile.website || ''
  } : {
    name: user?.name || 'Company Name',
    industry: 'Technology',
    size: 'Company size not set',
    location: 'Location not set',
    verified: false,
    contactName: '',
    contactTitle: '',
    phone: '',
    website: ''
  };

  const activeRequests = Array.isArray(dashboardData.requests) 
    ? dashboardData.requests.map(request => ({
        id: request._id || request.id,
        title: request.title || 'Untitled Request',
        posted: request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'Recently',
        proposals: request.proposal_count || 0,
        shortlisted: request.shortlisted_count || 0,
        matchCount: request.matchCount || 0,
        status: request.status || 'submitted',
        position: request.positionName || (request.position_id?.name) || 'General',
        workMode: request.workMode || 'remote',
        location: request.workCity && request.workCountry 
          ? `${request.workCity}, ${request.workCountry}`
          : 'Location TBD'
      }))
    : [];

  const matches = Array.isArray(dashboardData.matches)
    ? dashboardData.matches.map(match => ({
        id: match._id || match.id,
        consultant: match.consultantName || match.consultant_name || 'Consultant',
        expertise: match.consultantPositions || match.expertise || 'General',
        matchScore: match.matchScore || 0,
        status: match.adminReviewStatus || match.status || 'suggested',
        proposedRate: match.proposedRate || 'Rate TBD',
        location: match.consultantLocation || match.location || 'Location not specified',
        companyName: match.companyName || ''
      }))
    : [];

  const stats = [
    { 
      label: 'Active Projects', 
      value: activeRequests.filter(r => r.status !== 'closed').length.toString(), 
      icon: <Briefcase className="w-5 h-5" />,
      change: '+0%'
    },
    { 
      label: 'Total Proposals', 
      value: activeRequests.reduce((sum, r) => sum + (r.proposals || 0), 0).toString(), 
      icon: <FileText className="w-5 h-5" />,
      change: '0 new'
    },
    { 
      label: 'Interviews', 
      value: matches.filter(m => m.status === 'interviewing' || m.status === 'shortlisted').length.toString(), 
      icon: <Users className="w-5 h-5" />,
      change: '0 scheduled'
    },
    { 
      label: 'Time to Match', 
      value: '2.5 days', 
      icon: <Clock className="w-5 h-5" />,
      change: '-0.5 days'
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
    setNewRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/client/create-request`, {
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
        await fetchDashboardData();
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

  const handleEditProfile = () => {
    setShowProfileModal(true);
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

  if (error && !dashboardData.profile) {
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
        {/* Contact Support Modal */}
        <ContactSupportModal 
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
        />

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <TicketDetailsModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onReply={handleSubmitReply}
          />
        )}

        {/* Profile Completion Modal */}
        {showProfileModal && (
          <ClientProfileCompletionModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            onComplete={handleProfileComplete}
            user={user}
            BACKEND_URL={BACKEND_URL}
            updateProfileCompletion={updateProfileCompletion}
          />
        )}

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
                <div className="rounded-lg">
                  <img src="/logo.png" alt="Logo" className="h-12 object-contain" />
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
                { id: 'calendar', label: 'Calendar & Agenda', icon: <Calendar className="w-5 h-5" /> },
                { id: 'requests', label: 'My Requests', icon: <FileText className="w-5 h-5" /> },
                { id: 'matches', label: 'Matches', icon: <UserCheck className="w-5 h-5" /> },
                { id: 'consultants', label: 'Consultants', icon: <Users className="w-5 h-5" /> },
                { id: 'support', label: 'Support', icon: <LifeBuoy className="w-5 h-5" /> },
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
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
                  <Menu className="w-6 h-6" />
                </button>
                <div className="flex-1 flex justify-end items-center space-x-4">
                  <button className="relative p-2 text-gray-400 hover:text-gray-600">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button onClick={() => setIsSupportModalOpen(true)} className="p-2 text-gray-400 hover:text-gray-600" title="Contact Support">
                    <HelpCircle className="w-6 h-6" />
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
            <ProfileCompletionBanner 
              profileCompletion={profileCompletion} 
              onComplete={() => setShowProfileModal(true)}
            />
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {companyProfile.name}</h1>
                    <p className="text-gray-600">Find the perfect consultant for your projects.</p>
                  </div>
                  <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Request
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">{stat.icon}</div>
                        <span className="text-sm text-green-600">{stat.change}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Consultant Schedule Preview</h2>
                    <button onClick={() => setActiveTab('calendar')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Full Calendar →
                    </button>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <AvailabilityCalendar
                      userId="all"
                      userType="client"
                      BACKEND_URL={BACKEND_URL}
                      readOnly={true}
                      onAvailabilityChange={() => {}}
                      compact={true}
                    />
                    <AgendaWidget
                      userId={user?.email}
                      userType="client"
                      BACKEND_URL={BACKEND_URL}
                      compact={true}
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Active Requests</h2>
                      <button onClick={() => setActiveTab('requests')} className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                    <div className="p-6">
                      {activeRequests.length > 0 ? (
                        activeRequests.slice(0, 3).map((request) => (
                          <div key={request.id} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900">{request.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{request.position}</p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4 text-gray-500">
                                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{request.location}</span>
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{request.workMode}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-gray-600">{request.matchCount} matches</span>
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View →</button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">No active requests</p>
                          <button onClick={() => setShowNewRequestModal(true)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Create your first request →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
                      <button onClick={() => setActiveTab('support')} className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                    </div>
                    <div className="p-6">
                      {supportLoading ? (
                        <div className="flex justify-center py-8"><Loader className="w-6 h-6 animate-spin text-blue-600" /></div>
                      ) : supportTickets.length > 0 ? (
                        <div className="space-y-3">
                          {supportTickets.slice(0, 2).map((ticket) => (
                            <div key={ticket._id} onClick={() => fetchTicketDetails(ticket)} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-mono text-blue-600">{ticket.ticketId}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${ticket.status === 'new' ? 'bg-yellow-100 text-yellow-800' : ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                  {ticket.status}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                              <p className="text-xs text-gray-500 mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Ticket className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 text-sm mb-2">No support tickets</p>
                          <button onClick={() => setIsSupportModalOpen(true)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Contact Support →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {matches.length > 0 && (
                  <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Top Consultant Matches</h2>
                      <button onClick={() => setActiveTab('matches')} className="text-sm text-blue-600 hover:text-blue-700">View All Matches</button>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {matches.slice(0, 2).map((match) => (
                          <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-gray-900">{match.consultant}</h3>
                                <p className="text-sm text-gray-600">{match.expertise}</p>
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{match.matchScore}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>{match.location}</span>
                              </div>
                              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Contact →</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Consultant Availability & Agenda</h1>
                    <p className="text-gray-600 mt-1">View consultant availability and track your upcoming engagements</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCalendarView('full')} className={`p-2 rounded-lg transition ${calendarView === 'full' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      <Grid className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCalendarView('compact')} className={`p-2 rounded-lg transition ${calendarView === 'compact' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className={`grid ${calendarView === 'full' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                  <div className={calendarView === 'full' ? 'lg:col-span-2' : 'lg:col-span-1'}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Consultant Availability Calendar
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">View when consultants are available for new projects. Green dates show available consultants.</p>
                      <AvailabilityCalendar
                        userId="all"
                        userType="client"
                        BACKEND_URL={BACKEND_URL}
                        readOnly={true}
                        onAvailabilityChange={() => {}}
                        compact={calendarView === 'compact'}
                      />
                    </div>
                  </div>

                  <div className={calendarView === 'full' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                    <AgendaWidget
                      userId={user?.email}
                      userType="client"
                      BACKEND_URL={BACKEND_URL}
                      compact={calendarView === 'compact'}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                    Upcoming Interviews
                  </h2>
                  {matches.filter(m => m.status === 'shortlisted' || m.status === 'interviewing').length > 0 ? (
                    <div className="space-y-3">
                      {matches.filter(m => m.status === 'shortlisted' || m.status === 'interviewing').map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p className="font-medium text-gray-900">{match.consultant}</p>
                            <p className="text-sm text-gray-600">{match.expertise}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mb-1">
                              {match.status === 'shortlisted' ? 'Shortlisted' : 'Interview Scheduled'}
                            </span>
                            <button className="block text-sm text-blue-600 hover:text-blue-700 mt-1">Schedule Interview →</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No upcoming interviews</p>
                      <p className="text-sm mt-1">When consultants are shortlisted, interviews will appear here</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Consultant Availability Tips
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Green dates show when consultants are available for new projects</li>
                    <li>• Click on any date to see which consultants are available that day</li>
                    <li>• Create a request to get matched with available consultants</li>
                    <li>• Once matched, you'll be able to schedule interviews directly</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Project Requests</h2>
                  <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm">
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
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{request.location}</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{request.workMode}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{request.matchCount} matches</span>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
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
                    <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                      Create New Request
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Consultant Matches</h2>
                {matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{match.consultant}</h3>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{match.matchScore}%</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{match.expertise}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
                            {match.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="flex items-center text-gray-500"><MapPin className="w-4 h-4 mr-1" />{match.location}</div>
                          <div className="flex items-center text-gray-500"><DollarSign className="w-4 h-4 mr-1" />{match.proposedRate}</div>
                        </div>
                        <div className="flex justify-end">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Contact Consultant</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
                    <p className="text-gray-500 mb-6">Create a project request to get matched with consultants</p>
                    <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                      Create Request
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Consultants Tab */}
            {activeTab === 'consultants' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Browse Consultants</h2>
                    <p className="text-gray-600 mt-1">Find and connect with top consultants</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search consultants..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Filter className="w-5 h-5 text-gray-500" /></button>
                  </div>
                </div>
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Consultant Directory Coming Soon</h3>
                  <p className="text-gray-500">Create a project request and we'll find the best matches for you</p>
                  <button onClick={() => setShowNewRequestModal(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Create Request
                  </button>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
                      <p className="text-gray-600 mt-1">Get help with your projects, account, or technical issues</p>
                    </div>
                    <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Contact Support
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><Mail className="w-6 h-6 text-blue-600" /></div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-3">support@webconsultanthub.com</p>
                    <p className="text-xs text-gray-500">Reply within 24 hours</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><MessageSquare className="w-6 h-6 text-green-600" /></div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600 mb-3">Chat with support team</p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"><FileText className="w-6 h-6 text-purple-600" /></div>
                    <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                    <p className="text-sm text-gray-600 mb-3">Browse knowledge base</p>
                    <p className="text-xs text-gray-500">Self-service resources</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
                  {supportLoading ? (
                    <div className="flex justify-center py-8"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>
                  ) : supportTickets.length > 0 ? (
                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <SupportTicket key={ticket._id} ticket={ticket} onViewDetails={fetchTicketDetails} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
                      <p className="text-gray-500 mb-4">You haven't created any support tickets yet</p>
                      <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                        Create Support Ticket
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">How do I create a new project request?</h4>
                      <p className="text-sm text-gray-600">Click on the "New Request" button in your dashboard or navigate to the Requests tab and click "Create New Request". Fill in the project details and submit.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">How long does it take to get matches?</h4>
                      <p className="text-sm text-gray-600">Our average match time is 48 hours. Our admin team manually reviews each request to find the most suitable consultants.</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Can I communicate with consultants directly?</h4>
                      <p className="text-sm text-gray-600">Yes, after a match is made and both parties express interest, you'll be able to communicate directly through our messaging system.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What if I'm not satisfied with a match?</h4>
                      <p className="text-sm text-gray-600">If a consultant isn't the right fit, contact our support team. We'll work with you to find alternative matches until you're satisfied.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
                  <button onClick={handleEditProfile} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Edit Profile
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Company Information</h3>
                    <div className="space-y-4">
                      <div><label className="text-sm text-gray-500">Company Name</label><p className="font-medium text-gray-900">{companyProfile.name}</p></div>
                      <div><label className="text-sm text-gray-500">Industry</label><p className="font-medium text-gray-900">{companyProfile.industry}</p></div>
                      <div><label className="text-sm text-gray-500">Company Size</label><p className="font-medium text-gray-900">{companyProfile.size}</p></div>
                      <div><label className="text-sm text-gray-500">Location</label><p className="font-medium text-gray-900 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" />{companyProfile.location}</p></div>
                      {companyProfile.website && (<div><label className="text-sm text-gray-500">Website</label><p className="font-medium text-gray-900"><a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{companyProfile.website}</a></p></div>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
                    <div className="space-y-4">
                      <div><label className="text-sm text-gray-500">Contact Name</label><p className="font-medium text-gray-900">{companyProfile.contactName || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Contact Title</label><p className="font-medium text-gray-900">{companyProfile.contactTitle || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Phone</label><p className="font-medium text-gray-900">{companyProfile.phone || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Email</label><p className="font-medium text-gray-900">{user?.email}</p></div>
                    </div>
                    {companyProfile.verified && (<div className="mt-6 flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /><span className="text-sm text-green-700">Verified Company</span></div>)}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for new matches</span></label>
                      <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for proposal updates</span></label>
                      <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Weekly project summaries</span></label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Show company profile to consultants</span></label>
                      <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Share contact information with matched consultants</span></label>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">Delete Account</button>
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
              {error && (<div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"><AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" /><span className="text-sm">{error}</span></div>)}
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Position / Role *</label>
                  <select name="position" value={newRequest.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required>
                    <option value="">Select a position</option>
                    {positions.map(pos => (<option key={pos._id} value={pos.name}>{pos.name}</option>))}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                  <input type="text" name="title" value={newRequest.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., AI Strategy Implementation" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                  <textarea name="description" value={newRequest.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Describe your project requirements, goals, and expectations..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input type="date" name="startDate" value={newRequest.startDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input type="date" name="endDate" value={newRequest.endDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Budget Type</label>
                    <select name="budgetType" value={newRequest.budgetType} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="daily">Daily Rate</option><option value="hourly">Hourly Rate</option><option value="fixed">Fixed Price</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Budget Amount *</label>
                    <div className="flex"><select name="currency" value={newRequest.currency} onChange={handleInputChange} className="w-24 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"><option value="EUR">€</option><option value="USD">$</option><option value="GBP">£</option></select>
                    <input type="number" name="budgetAmount" value={newRequest.budgetAmount} onChange={handleInputChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Amount" required /></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Work Mode</label>
                    <select name="workMode" value={newRequest.workMode} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="remote">Remote</option><option value="on-site">On-site</option><option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input type="text" name="workCountry" value={newRequest.workCountry} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., Germany" />
                  </div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" name="workCity" value={newRequest.workCity} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g., Berlin" />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button type="button" onClick={() => setShowNewRequestModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center">
                    {loading ? (<><Loader className="w-4 h-4 animate-spin mr-2" />Submitting...</>) : 'Submit Request'}
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