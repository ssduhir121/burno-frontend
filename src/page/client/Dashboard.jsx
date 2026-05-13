



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
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import ContactSupportModal from '../../components/modals/ContactSupportModal';
// import AvailabilityCalendar from '../../components/AvailabilityCalendar';
// import AgendaWidget from '../../components/AgendaWidget';
// import ProfileCompletionBanner from '../../components/ProfileCompletionBanner';
// import ClientProfileCompletionModal from '../../components/ClientProfileCompletionModal';

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
//   const { user, logout, BACKEND_URL, profileCompletion, updateProfileCompletion } = useAuth();
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
//   const [showProfileModal, setShowProfileModal] = useState(false);
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
//     workMode: 'On-site'
//   });

//   // Define fetchDashboardData as a function that can be called from multiple places
//   const fetchDashboardData = async () => {
//     if (!user?.email) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/dashboard/${encodeURIComponent(user.email)}`, {
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.success && result.data) {
//         setDashboardData({
//           profile: result.data.profile || null,
//           requests: Array.isArray(result.data.recentRequests) ? result.data.recentRequests : [],
//           matches: Array.isArray(result.data.recentMatches) ? result.data.recentMatches : []
//         });
//         await fetchSupportTickets();
//       } else {
//         setError(result.error || 'Failed to load dashboard data');
//       }
//     } catch (err) {
//       console.error('Error fetching dashboard:', err);
//       setError('Network error. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   // Initial data fetch
//   useEffect(() => {
//     if (user?.email) {
//       fetchDashboardData();
//     }
//   }, [user, BACKEND_URL]);

//   // Check if profile is incomplete and show modal after delay
//   useEffect(() => {
//     if (user && profileCompletion.status !== 'complete') {
//       const timer = setTimeout(() => {
//         setShowProfileModal(true);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [user, profileCompletion]);

//   const handleProfileComplete = () => {
//     setShowProfileModal(false);
//     // Refresh dashboard data
//     fetchDashboardData();
//   };

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
//         position: request.positionName || (request.position_id?.name) || 'General',
//         workMode: request.workMode || 'On-site',
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
//         await fetchDashboardData();
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

//   const handleEditProfile = () => {
//     setShowProfileModal(true);
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
//         {/* Contact Support Modal */}
//         <ContactSupportModal 
//           isOpen={isSupportModalOpen}
//           onClose={() => setIsSupportModalOpen(false)}
//         />

//         {/* Ticket Details Modal */}
//         {selectedTicket && (
//           <TicketDetailsModal
//             ticket={selectedTicket}
//             onClose={() => setSelectedTicket(null)}
//             onReply={handleSubmitReply}
//           />
//         )}

//         {/* Profile Completion Modal */}
//         {showProfileModal && (
//           <ClientProfileCompletionModal
//             isOpen={showProfileModal}
//             onClose={() => setShowProfileModal(false)}
//             onComplete={handleProfileComplete}
//             user={user}
//             BACKEND_URL={BACKEND_URL}
//             updateProfileCompletion={updateProfileCompletion}
//           />
//         )}

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
//             <ProfileCompletionBanner 
//               profileCompletion={profileCompletion} 
//               onComplete={() => setShowProfileModal(true)}
//             />
            
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
//                       onAvailabilityChange={() => {}}
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
//                         onAvailabilityChange={() => {}}
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
//                   <button onClick={handleEditProfile} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
//                     Edit Profile
//                   </button>
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
//                       {/* <option value="remote">Remote</option> */}
//                       <option value="on-site">On-site</option><option value="hybrid">Hybrid</option>
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
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  LayoutDashboard,
  CalendarCheck,
  Handshake,
  FolderOpen,
  Inbox,
  UserCircle,
  FileCheck,
  Headset,
  Sliders,
  ChevronDown,
  TrendingUp,
  Zap,
  Activity,
  Eye,
  CalendarDays,
  Plus as PlusIcon,
  Upload,
  Filter as FilterIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Home,
  ArrowUpRight,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
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
          <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're having trouble loading your dashboard.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
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

// Quick Actions Widget
const QuickActions = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const actions = [
    { icon: <PlusIcon size={18} />, label: 'New Request', color: 'blue', action: 'newRequest' },
    { icon: <Search size={18} />, label: 'Find Consultants', color: 'green', action: 'consultants' },
    { icon: <MessageSquare size={18} />, label: 'Send Message', color: 'purple', action: 'messages' },
    { icon: <CalendarIcon size={18} />, label: 'Schedule Meeting', color: 'orange', action: 'calendar' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-in slide-in-from-bottom-5 duration-200">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                onAction(action.action);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-gray-200 hover:border-${action.color}-300 hover:shadow-xl transition-all w-48 group`}
            >
              <div className={`text-${action.color}-500`}>{action.icon}</div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{action.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white group"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <PlusIcon size={24} className={`transition-transform ${isHovered ? 'rotate-90' : ''}`} />
        )}
      </button>
    </div>
  );
};

// Smart Notifications System
const SmartNotifications = ({ onNotificationClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'New Consultant Match!',
      message: '3 new consultants matched with your request',
      time: '5 min ago',
      read: false,
      icon: <Handshake size={16} />,
      color: 'green'
    },
    {
      id: 2,
      type: 'proposal',
      title: 'New Proposal Received',
      message: 'John Smith submitted a proposal for AI Strategy',
      time: '1 hour ago',
      read: false,
      icon: <FileText size={16} />,
      color: 'blue'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview with Sarah Johnson tomorrow at 2 PM',
      time: '3 hours ago',
      read: true,
      icon: <Calendar size={16} />,
      color: 'purple'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-700">
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => {
                    markAsRead(notification.id);
                    onNotificationClick?.(notification);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition border-b border-gray-100 last:border-0 ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-${notification.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <div className={`text-${notification.color}-600`}>{notification.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Recent Activity Timeline
const RecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'match',
      title: 'New Matches',
      description: '3 new consultants matched with "AI Strategy" request',
      time: '10 minutes ago',
      icon: <Handshake size={14} />,
      color: 'green'
    },
    {
      id: 2,
      type: 'proposal',
      title: 'Proposal Received',
      description: 'New proposal for Digital Transformation project',
      time: '2 hours ago',
      icon: <FileText size={14} />,
      color: 'blue'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      description: 'Interview with consultant for AI Strategy tomorrow',
      time: '5 hours ago',
      icon: <Calendar size={14} />,
      color: 'purple'
    },
    {
      id: 4,
      type: 'request',
      title: 'Request Updated',
      description: 'Your request status changed to "Under Review"',
      time: '1 day ago',
      icon: <Target size={14} />,
      color: 'orange'
    },
  ];

  const activityList = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity size={20} className="text-blue-600" />
          Recent Activity
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View all →</button>
      </div>
      <div className="space-y-4">
        {activityList.map((activity, idx) => (
          <div key={activity.id} className="flex gap-3">
            <div className="relative">
              <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                <div className={`text-${activity.color}-600`}>{activity.icon}</div>
              </div>
              {idx < activityList.length - 1 && (
                <div className="absolute top-8 left-4 w-px h-full bg-gray-200"></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-600 mt-0.5">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile Bottom Navigation
const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'overview', label: 'Home', icon: <Home size={20} /> },
    { id: 'requests', label: 'Requests', icon: <FileText size={20} /> },
    { id: 'matches', label: 'Matches', icon: <Handshake size={20} /> },
    { id: 'consultants', label: 'Consultants', icon: <Users size={20} /> },
    { id: 'profile', label: 'Profile', icon: <Building size={20} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === item.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute bottom-0 w-8 h-0.5 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Professional Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Center</a></li>
              <li><a href="#" className="hover:text-white transition">Trust & Safety</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Terms & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Become a Consultant</a></li>
              <li><a href="#" className="hover:text-white transition">Partner Program</a></li>
              <li><a href="#" className="hover:text-white transition">Affiliate Program</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe size={16} />
              <span>English (US)</span>
              <span className="mx-2">|</span>
              <span>€ EUR</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-xs text-gray-500">
            <p>ConsultantHub is part of Booking Holdings Inc., the world leader in online travel and related services.</p>
            <p className="mt-2">Copyright © 1996–2026 ConsultantHub™. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Dropdown Menu Component
const DropdownMenu = ({ trigger, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onItemClick(item.action);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Support Ticket Component
const SupportTicket = ({ ticket, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.new;
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onViewDetails(ticket)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono text-blue-600">{ticket.ticketId}</span>
        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ticket.message}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        <span className="text-blue-600">View →</span>
      </div>
    </div>
  );
};

// Modern Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

// Consultant Card Component
const ConsultantCard = ({ consultant, onViewDetails, onContact }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
        {consultant.name?.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
            <p className="text-sm text-gray-600">{consultant.title}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{consultant.rating}</span>
            <span className="text-xs text-gray-400">({consultant.reviewCount})</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {consultant.expertise?.split(',').slice(0, 3).map((exp, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{exp.trim()}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={12} /> {consultant.location}</span>
            <span className="flex items-center gap-1"><DollarSign size={12} /> €{consultant.hourlyRate}/hr</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(consultant);
            }}
            className="text-blue-600 text-sm hover:text-blue-700 font-medium"
          >
            View Profile →
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Consultant Detail Modal (Availability Calendar only shows here when consultant is selected)
const ConsultantDetailModal = ({ consultant, isOpen, onClose, onContact }) => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const { BACKEND_URL } = useAuth();

  useEffect(() => {
    if (isOpen && consultant) {
      fetchConsultantAvailability();
    }
  }, [isOpen, consultant]);

  const fetchConsultantAvailability = async () => {
    if (!consultant?._id) return;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/availability/consultant/${consultant._id}`);
      const data = await response.json();
      if (data.success) {
        setAvailability(data.availability);
      }
    } catch (err) {
      console.error('Error fetching availability:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                {consultant.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{consultant.name}</h2>
                <p className="text-sm text-gray-500">{consultant.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Location</label>
                <p className="font-medium text-gray-900 flex items-center gap-1"><MapPin size={14} /> {consultant.location}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Hourly Rate</label>
                <p className="font-medium text-gray-900"><DollarSign size={14} className="inline" /> {consultant.hourlyRate}/hr</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Experience</label>
                <p className="font-medium text-gray-900">{consultant.experience || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Rating</label>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" /> {consultant.rating} ({consultant.reviewCount} reviews)
                </p>
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {consultant.expertise?.split(',').map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{exp.trim()}</span>
                ))}
              </div>
            </div>

            {/* Availability Calendar - ONLY SHOWN WHEN CONSULTANT IS SELECTED */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Consultant Availability
              </h3>
              {loading ? (
                <div className="text-center py-8">
                  <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                </div>
              ) : (
                <AvailabilityCalendar
                  userId={consultant._id}
                  userType="consultant"
                  BACKEND_URL={BACKEND_URL}
                  readOnly={true}
                  compact={false}
                />
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  onClose();
                  onContact(consultant);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Contact Consultant
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Match Card Component
const MatchCard = ({ match, onContact, onViewConsultant }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">{match.consultant}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium ml-1">{match.matchScore}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{match.expertise}</p>
      </div>
      <span className={`px-2 py-1 text-xs rounded-full ${
        match.status === 'suggested' ? 'bg-gray-100 text-gray-800' :
        match.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {match.status}
      </span>
    </div>
    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
      <span className="flex items-center gap-1"><MapPin size={12} /> {match.location}</span>
      <span className="flex items-center gap-1"><DollarSign size={12} /> {match.proposedRate}</span>
    </div>
    <div className="flex gap-2">
      <button 
        onClick={() => onViewConsultant(match)}
        className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm transition"
      >
        View Profile
      </button>
      <button 
        onClick={() => onContact(match)}
        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition"
      >
        Contact
      </button>
    </div>
  </div>
);

// Request Card Component
const RequestCard = ({ request, onView }) => {
  const getStatusColor = (status) => {
    const colors = {
      submitted: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      shortlist_ready: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.submitted;
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer"
      onClick={() => onView(request)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{request.title}</h3>
          <p className="text-sm text-gray-600">{request.position}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
          {request.status.replace('_', ' ')}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={12} /> {request.location}</span>
          <span className="flex items-center gap-1"><ClockIcon size={12} /> {request.workMode}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">{request.matchCount} matches</span>
          <ChevronRight size={16} className="text-blue-600" />
        </div>
      </div>
    </div>
  );
};

// New Request Modal Component
const NewRequestModal = ({ isOpen, onClose, onSubmit, positions, loading }) => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create New Project Request</h2>
                <p className="text-sm text-gray-500">Fill in the details to find the right consultant</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a position</option>
                {positions.map(pos => (
                  <option key={pos._id} value={pos.name}>{pos.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Digital Transformation Strategy"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the project requirements, scope, and expectations..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Type</label>
                <select
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily Rate</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="fixed">Fixed Price</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount</label>
                <input
                  type="number"
                  name="budgetAmount"
                  value={formData.budgetAmount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Country</label>
                <input
                  type="text"
                  name="workCountry"
                  value={formData.workCountry}
                  onChange={handleChange}
                  placeholder="e.g., Germany"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work City</label>
                <input
                  type="text"
                  name="workCity"
                  value={formData.workCity}
                  onChange={handleChange}
                  placeholder="e.g., Berlin"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workMode"
                    value="remote"
                    checked={formData.workMode === 'remote'}
                    onChange={handleChange}
                  />
                  <span>Remote</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workMode"
                    value="on-site"
                    checked={formData.workMode === 'on-site'}
                    onChange={handleChange}
                  />
                  <span>On-site</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workMode"
                    value="hybrid"
                    checked={formData.workMode === 'hybrid'}
                    onChange={handleChange}
                  />
                  <span>Hybrid</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader size={18} className="animate-spin" /> : <PlusIcon size={18} />}
                Create Request
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Client Dashboard Component
const ClientDashboard = () => {
  const { user, logout, BACKEND_URL, profileCompletion, updateProfileCompletion } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [calendarView, setCalendarView] = useState('compact');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [consultants, setConsultants] = useState([]);
  const [consultantsLoading, setConsultantsLoading] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    requests: [],
    matches: []
  });

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
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
  }, [user, BACKEND_URL]);

  // Fetch consultants
  const fetchConsultants = useCallback(async () => {
    setConsultantsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/client/consultants?search=${searchQuery}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success) {
        setConsultants(result.consultants || []);
      }
    } catch (err) {
      console.error('Error fetching consultants:', err);
    } finally {
      setConsultantsLoading(false);
    }
  }, [BACKEND_URL, searchQuery]);

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

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user, BACKEND_URL, fetchDashboardData]);

  useEffect(() => {
    if (activeTab === 'consultants') {
      fetchConsultants();
    }
  }, [activeTab, fetchConsultants, searchQuery]);

  useEffect(() => {
    if (user && profileCompletion.status !== 'complete') {
      const timer = setTimeout(() => setShowProfileModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user, profileCompletion]);

  const handleProfileComplete = () => {
    setShowProfileModal(false);
    fetchDashboardData();
  };

  const handleHeroAction = (action) => {
    if (action === 'newRequest') {
      setShowNewRequestModal(true);
    } else if (action === 'consultants') {
      setActiveTab('consultants');
    } else if (action === 'messages') {
      setActiveTab('messages');
    } else if (action === 'calendar') {
      setActiveTab('calendar');
    } else if (typeof action === 'string') {
      setActiveTab(action);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSubmitRequest = async (formData) => {
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
          ...formData
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

  const handleViewConsultant = (consultant) => {
    setSelectedConsultant(consultant);
    setShowConsultantModal(true);
  };

  const handleViewMatchConsultant = (match) => {
    const consultantData = {
      _id: match.consultantId,
      name: match.consultant,
      title: match.expertise.split(',')[0],
      location: match.location,
      hourlyRate: parseInt(match.proposedRate?.replace('€', '')) || 100,
      rating: 4.5,
      reviewCount: 12,
      expertise: match.expertise,
      experience: '5+ years'
    };
    setSelectedConsultant(consultantData);
    setShowConsultantModal(true);
  };

  const handleContactConsultant = (match) => {
    console.log('Contact consultant:', match);
    setActiveTab('messages');
  };

  const handleViewRequest = (request) => {
    console.log('View request:', request);
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
        workMode: request.workMode || 'On-site',
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
        companyName: match.companyName || '',
        consultantId: match.consultantProfileId?._id || match.consultantId
      }))
    : [];

  const stats = [
    { 
      icon: <Briefcase className="w-6 h-6 text-white" />, 
      label: 'Active Requests', 
      value: activeRequests.filter(r => r.status !== 'closed').length.toString(), 
      color: 'bg-blue-500'
    },
    { 
      icon: <FileText className="w-6 h-6 text-white" />, 
      label: 'Total Proposals', 
      value: activeRequests.reduce((sum, r) => sum + (r.proposals || 0), 0).toString(), 
      color: 'bg-green-500'
    },
    { 
      icon: <Users className="w-6 h-6 text-white" />, 
      label: 'Interviews', 
      value: matches.filter(m => m.status === 'shortlisted').length.toString(), 
      color: 'bg-purple-500'
    },
    { 
      icon: <Target className="w-6 h-6 text-white" />, 
      label: 'Matches Found', 
      value: matches.length.toString(), 
      color: 'bg-orange-500'
    }
  ];

  const profileMenuItems = [
    { label: 'Company Profile', icon: <Building size={16} />, action: 'profile' },
    { label: 'Settings', icon: <Settings size={16} />, action: 'settings' },
    { label: 'Help & Support', icon: <HelpCircle size={16} />, action: 'support' },
    { label: 'Sign Out', icon: <LogOut size={16} />, action: 'logout' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
        {/* Modals */}
        <ContactSupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
        {selectedTicket && (
          <TicketDetailsModal 
            ticket={selectedTicket} 
            onClose={() => setSelectedTicket(null)} 
            onReply={handleSubmitReply} 
          />
        )}
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

        {/* Quick Actions Widget */}
        <QuickActions onAction={handleHeroAction} />

        {/* Modern Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button 
                onClick={() => setActiveTab('overview')}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">ClientHub</h1>
              </button>

              <div className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Requests
                </button>
                <button
                  onClick={() => setActiveTab('matches')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'matches' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Matches
                </button>
                <button
                  onClick={() => setActiveTab('consultants')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'consultants' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Find Consultants
                </button>
              </div>

              <div className="flex items-center gap-3">
                <SmartNotifications onNotificationClick={(notification) => {
                  if (notification.type === 'match') setActiveTab('matches');
                  if (notification.type === 'proposal') setActiveTab('requests');
                  if (notification.type === 'interview') setActiveTab('calendar');
                }} />
                <DropdownMenu
                  trigger={
                    <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {companyProfile.name.charAt(0)}
                      </div>
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  }
                  items={profileMenuItems}
                  onItemClick={(action) => {
                    if (action === 'logout') {
                      logout();
                    } else if (action === 'support') {
                      setIsSupportModalOpen(true);
                    } else {
                      setActiveTab(action);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Hero Section */}
        <ClientDynamicHero 
          activeTab={activeTab}
          companyProfile={companyProfile}
          onAction={handleHeroAction}
          onSearch={handleSearch}
          requestsCount={activeRequests.length}
          matchesCount={matches.length}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileCompletionBanner 
            profileCompletion={profileCompletion} 
            onComplete={() => setShowProfileModal(true)}
          />

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Active Requests</h3>
                      <button onClick={() => setActiveTab('requests')} className="text-blue-600 text-sm">View all →</button>
                    </div>
                    {activeRequests.length > 0 ? (
                      <div className="space-y-3">
                        {activeRequests.slice(0, 3).map((request) => (
                          <RequestCard key={request.id} request={request} onView={handleViewRequest} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No active requests</p>
                        <button onClick={() => setShowNewRequestModal(true)} className="mt-2 text-blue-600 text-sm">
                          Create your first request →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* No availability calendar here - only shows when consultant is selected */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <RecentActivity />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                        {companyProfile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{companyProfile.name}</h3>
                        <p className="text-blue-200 text-sm">{companyProfile.industry}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Company Size</span><span>{companyProfile.size}</span></div>
                      <div className="flex justify-between"><span>Location</span><span>{companyProfile.location}</span></div>
                      <div className="flex justify-between"><span>Active Requests</span><span>{activeRequests.length}</span></div>
                    </div>
                    <button onClick={() => setActiveTab('profile')} className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-xl py-2 text-sm font-medium transition">
                      View Company Profile →
                    </button>
                  </div>
                </div>
              </div>

              {matches.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Top Consultant Matches</h3>
                    <button onClick={() => setActiveTab('matches')} className="text-blue-600 text-sm">View all →</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {matches.slice(0, 2).map((match) => (
                      <MatchCard 
                        key={match.id} 
                        match={match} 
                        onContact={handleContactConsultant}
                        onViewConsultant={handleViewMatchConsultant}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Project Requests</h2>
                  <p className="text-gray-600 mt-1">Manage your consulting project requests</p>
                </div>
                <button onClick={() => setShowNewRequestModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <PlusIcon size={18} />
                  New Request
                </button>
              </div>
              {activeRequests.length > 0 ? (
                <div className="space-y-4">
                  {activeRequests.map((request) => (
                    <RequestCard key={request.id} request={request} onView={handleViewRequest} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Consultant Matches</h2>
                <p className="text-gray-600 mt-1">Consultants matched with your project requests</p>
              </div>
              {matches.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {matches.map((match) => (
                    <MatchCard 
                      key={match.id} 
                      match={match} 
                      onContact={handleContactConsultant}
                      onViewConsultant={handleViewMatchConsultant}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Handshake className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Find Consultants</h2>
                  <p className="text-gray-600 mt-1">Search and discover top consultants</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search consultants..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FilterIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {consultantsLoading ? (
                <div className="text-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                </div>
              ) : consultants.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {consultants.map((consultant) => (
                    <ConsultantCard 
                      key={consultant._id} 
                      consultant={consultant} 
                      onViewDetails={handleViewConsultant}
                      onContact={() => handleContactConsultant(consultant)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No consultants found</h3>
                  <p className="text-gray-500">Try adjusting your search or create a request to get matched</p>
                  <button onClick={() => setShowNewRequestModal(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Create Request
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet</p>
                <p className="text-sm text-gray-400 mt-1">Messages will appear here when you connect with consultants</p>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
                    {companyProfile.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{companyProfile.name}</h1>
                    <p className="text-blue-200">{companyProfile.industry}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-blue-200">
                      <span>{companyProfile.size}</span>
                      <span>•</span>
                      <span>{companyProfile.location}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowProfileModal(true)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white transition">
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Company Information</h3>
                    <div className="space-y-3">
                      <div><label className="text-sm text-gray-500">Company Name</label><p className="font-medium text-gray-900">{companyProfile.name}</p></div>
                      <div><label className="text-sm text-gray-500">Industry</label><p className="font-medium text-gray-900">{companyProfile.industry}</p></div>
                      <div><label className="text-sm text-gray-500">Company Size</label><p className="font-medium text-gray-900">{companyProfile.size}</p></div>
                      <div><label className="text-sm text-gray-500">Location</label><p className="font-medium text-gray-900 flex items-center gap-1"><MapPin size={14} /> {companyProfile.location}</p></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Contact Information</h3>
                    <div className="space-y-3">
                      <div><label className="text-sm text-gray-500">Contact Name</label><p className="font-medium text-gray-900">{companyProfile.contactName || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Contact Title</label><p className="font-medium text-gray-900">{companyProfile.contactTitle || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Phone</label><p className="font-medium text-gray-900">{companyProfile.phone || 'Not provided'}</p></div>
                      <div><label className="text-sm text-gray-500">Email</label><p className="font-medium text-gray-900">{user?.email}</p></div>
                    </div>
                    {companyProfile.verified && (
                      <div className="mt-4 flex items-center gap-2 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-sm">Verified Company</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab - No availability calendar here either */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Consultant Availability</h1>
                <p className="text-gray-600">Select a consultant from the Consultants tab to view their availability calendar</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">No Consultant Selected</h3>
                <p className="text-blue-700 mb-4">Browse and select a consultant from the Consultants tab to view their availability calendar</p>
                <button 
                  onClick={() => setActiveTab('consultants')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
                >
                  <Search size={18} />
                  Find Consultants
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Schedule</h2>
                <AgendaWidget
                  userId={user?.email}
                  userType="client"
                  BACKEND_URL={BACKEND_URL}
                  compact={false}
                />
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Support Center</h2>
                    <p className="text-blue-200">Get help with your projects, account, or technical issues</p>
                  </div>
                  <button onClick={() => setIsSupportModalOpen(true)} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    Contact Support
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3"><Mail className="w-6 h-6 text-blue-600" /></div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-500 mb-2">support@consultanthub.com</p>
                  <p className="text-xs text-gray-400">Response within 24h</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3"><MessageSquare className="w-6 h-6 text-green-600" /></div>
                  <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-500 mb-2">Chat with support team</p>
                  <p className="text-xs text-gray-400">Available 24/7</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3"><BookOpen className="w-6 h-6 text-purple-600" /></div>
                  <h3 className="font-semibold text-gray-900 mb-1">Help Center</h3>
                  <p className="text-sm text-gray-500 mb-2">Browse knowledge base</p>
                  <p className="text-xs text-gray-400">Self-service resources</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Support Tickets</h3>
                {supportLoading ? (
                  <div className="text-center py-8"><Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto" /></div>
                ) : supportTickets.length > 0 ? (
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <SupportTicket key={ticket._id} ticket={ticket} onViewDetails={fetchTicketDetails} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No support tickets yet</p>
                    <button onClick={() => setIsSupportModalOpen(true)} className="mt-4 text-blue-600 font-medium">Create your first ticket →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span className="text-gray-700">Email notifications for new matches</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span className="text-gray-700">Email notifications for proposal updates</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /><span className="text-gray-700">Weekly project summaries</span></label>
                  </div>
                </div>
                <div className="pt-4 border-t"><button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Delete Account</button></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* New Request Modal */}
        <NewRequestModal
          isOpen={showNewRequestModal}
          onClose={() => setShowNewRequestModal(false)}
          onSubmit={handleSubmitRequest}
          positions={positions}
          loading={loading}
        />

        {/* Consultant Detail Modal - Availability calendar only shows here */}
        <ConsultantDetailModal
          consultant={selectedConsultant}
          isOpen={showConsultantModal}
          onClose={() => {
            setShowConsultantModal(false);
            setSelectedConsultant(null);
          }}
          onContact={() => {
            setShowConsultantModal(false);
            setActiveTab('messages');
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

// Client Dynamic Hero Section
const ClientDynamicHero = ({ activeTab, companyProfile, onAction, onSearch, requestsCount, matchesCount }) => {
  const getHeroContent = () => {
    const heroMap = {
      overview: {
        title: `Welcome back, ${companyProfile.name}!`,
        subtitle: "Find the perfect consultant for your projects and grow your business.",
        icon: <Building className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search for consultants, projects, or requests...",
        actions: [
          { label: 'New Request', icon: <PlusIcon size={18} />, action: 'newRequest' },
          { label: 'Find Consultants', icon: <Search size={18} />, action: 'consultants' }
        ]
      },
      requests: {
        title: "Project Requests",
        subtitle: `You have ${requestsCount} active project requests.`,
        icon: <FileText className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search your requests...",
        actions: [
          { label: 'New Request', icon: <PlusIcon size={18} />, action: 'newRequest' }
        ]
      },
      matches: {
        title: "Consultant Matches",
        subtitle: `You have ${matchesCount} consultant matches waiting for you.`,
        icon: <Handshake className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search matches by name or expertise...",
        actions: []
      },
      consultants: {
        title: "Find Consultants",
        subtitle: "Browse our network of top-tier consultants",
        icon: <Users className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search by name, expertise, or location...",
        actions: []
      },
      calendar: {
        title: "Consultant Availability",
        subtitle: "Select a consultant to view their availability",
        icon: <Calendar className="w-12 h-12" />,
        showSearch: false,
        actions: [
          { label: 'Find Consultants', icon: <Search size={18} />, action: 'consultants' }
        ]
      },
      messages: {
        title: "Messages",
        subtitle: "Communicate with your matched consultants",
        icon: <MessageSquare className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search conversations...",
        actions: []
      },
      profile: {
        title: "Company Profile",
        subtitle: "Manage your company information and preferences",
        icon: <Building className="w-12 h-12" />,
        showSearch: false,
        actions: []
      },
      support: {
        title: "Support Center",
        subtitle: "Get help with your projects, account, or technical issues",
        icon: <LifeBuoy className="w-12 h-12" />,
        showSearch: true,
        searchPlaceholder: "Search help articles...",
        actions: []
      },
      settings: {
        title: "Settings",
        subtitle: "Configure your notification preferences and account settings",
        icon: <Settings className="w-12 h-12" />,
        showSearch: false,
        actions: []
      }
    };
    return heroMap[activeTab] || heroMap.overview;
  };

  const content = getHeroContent();

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                {content.icon}
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {content.title}
                </h2>
                <p className="text-lg mt-1 text-blue-100">
                  {content.subtitle}
                </p>
              </div>
            </div>

            {content.actions.length > 0 && (
              <div className="flex gap-3 mt-4">
                {content.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAction(action.action)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition"
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {content.showSearch && (
          <div className="relative mt-6">
            <div className="bg-[#febb02] rounded-xl p-1 shadow-2xl">
              <div className="flex bg-white rounded-lg overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 flex-1">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={content.searchPlaceholder || "Search..."}
                    className="outline-none w-full text-gray-900"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </div>
                <button className="bg-[#0071c2] hover:bg-[#005fa3] transition text-white px-6 py-3 font-semibold">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Ticket Details Modal Component
const TicketDetailsModal = ({ ticket, onClose, onReply }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!replyMessage.trim()) return;
    setSubmitting(true);
    await onReply(ticket._id, replyMessage);
    setReplyMessage('');
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Ticket #{ticket.ticketId}</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">{ticket.subject}</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{ticket.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-end mt-3">
                <button onClick={handleSubmit} disabled={!replyMessage.trim() || submitting} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BookOpen icon component
const BookOpen = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

export default ClientDashboard;