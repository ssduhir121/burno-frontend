// // src/page/consultant/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Briefcase, 
//   User, 
//   Settings, 
//   LogOut,
//   Bell,
//   Menu,
//   Star,
//   MapPin,
//   Calendar,
//   Clock,
//   CheckCircle,
//   FileText,
//   MessageSquare,
//   Link as LinkIcon,
//   TrendingUp,
//   Users,
//   DollarSign,
//   AlertCircle,
//   Loader,
//   HelpCircle,
//   Send,
//   X,
//   ChevronRight,
//   Mail,
//   LifeBuoy,
//   Ticket,
//   Grid,
//   List,
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import ContactSupportModal from '../../components/modals/ContactSupportModal';
// import AvailabilityCalendar from '../../components/AvailabilityCalendar';
// import AgendaWidget from '../../components/AgendaWidget';
// import ProfileCompletionBanner from '../../components/ProfileCompletionBanner';
// import ProfileCompletionModal from '../../components/ProfileCompletionModal';

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
//     console.error('Dashboard Error:', error, errorInfo);
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

// const ConsultantDashboard = () => {
//   const { user, logout, profileCompletion, BACKEND_URL, updateProfileCompletion } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [supportTickets, setSupportTickets] = useState([]);
//   const [supportLoading, setSupportLoading] = useState(false);
//   const [availabilityData, setAvailabilityData] = useState({});
//   const [calendarView, setCalendarView] = useState('full');
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [modalStep, setModalStep] = useState('basic');
//   const [dashboardData, setDashboardData] = useState({
//     profile: null,
//     matches: [],
//     stats: {
//       profileViews: 0,
//       matchRequests: 0,
//       interviews: 0,
//       earnings: 0
//     }
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
//       console.log('Fetching dashboard data for:', user.email);
      
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
//       console.log('Dashboard data received:', result);

//       if (result.success && result.data) {
//         const profile = result.data.profile || {};
//         const matches = Array.isArray(result.data.recentMatches) ? result.data.recentMatches : [];
        
//         setDashboardData({
//           profile: profile,
//           matches: matches,
//           stats: {
//             profileViews: profile.profileViews || 0,
//             matchRequests: matches.length || 0,
//             interviews: matches.filter(m => m?.status === 'interview_scheduled' || m?.adminReviewStatus === 'interview_scheduled').length || 0,
//             earnings: profile.earningsYtd || 0
//           }
//         });

//         if (result.data.availability) {
//           setAvailabilityData(result.data.availability);
//         }

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

//   // Handle availability change
//   const handleAvailabilityChange = (date, status, timeRange) => {
//     console.log('Availability updated:', { date, status, timeRange });
//     setAvailabilityData(prev => ({
//       ...prev,
//       [date]: { status, timeRange }
//     }));
//   };

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

//   const handleProfileComplete = (step) => {
//     if (step === 'payment') {
//       updateProfileCompletion('payment', true);
//     }
//     setShowProfileModal(false);
//     // Refresh dashboard data
//     fetchDashboardData();
//   };

//   // Safe data access with fallbacks - FIXED expertise mapping
//   const profile = dashboardData.profile ? {
//     name: dashboardData.profile.fullName || user?.name || 'Consultant',
//     title: dashboardData.profile.title || 'Senior Consultant',
//     location: dashboardData.profile.baseCity && dashboardData.profile.baseCountry 
//       ? `${dashboardData.profile.baseCity}, ${dashboardData.profile.baseCountry}`
//       : 'Location not set',
//     availability: dashboardData.profile.availability || 'Availability not set',
//     rating: dashboardData.profile.rating || 0,
//     completedProjects: dashboardData.profile.completedProjects || 0,
//     hourlyRate: dashboardData.profile.hourlyRate 
//       ? `€${dashboardData.profile.hourlyRate}` 
//       : 'Rate not set',
//     expertise: Array.isArray(dashboardData.profile.positions) 
//       ? dashboardData.profile.positions.map(p => {
//           // Handle both object and string formats
//           if (p && typeof p === 'object') {
//             return p.name || p;
//           }
//           return p;
//         })
//       : (typeof dashboardData.profile.positions === 'string' 
//           ? dashboardData.profile.positions.split(',').map(s => s.trim()) 
//           : []),
//     verified: dashboardData.profile.isVerified || false,
//     subscriptionStatus: dashboardData.profile.subscriptionStatus || 'inactive'
//   } : {
//     name: user?.name || 'Consultant',
//     title: 'Consultant',
//     location: 'Location not set',
//     availability: 'Availability not set',
//     rating: 0,
//     completedProjects: 0,
//     hourlyRate: 'Rate not set',
//     expertise: [],
//     verified: false,
//     subscriptionStatus: 'inactive'
//   };

//   // FIXED activeMatches mapping to handle objects
//   const activeMatches = Array.isArray(dashboardData.matches) 
//     ? dashboardData.matches.map(match => ({
//         id: match?._id || match?.id || Math.random(),
//         client: typeof match?.companyName === 'object' 
//           ? (match.companyName?.name || 'Client') 
//           : (match?.companyName || match?.clientName || 'Client'),
//         project: match?.requestTitle || match?.title || 'Project',
//         duration: match?.duration || 'Duration TBD',
//         startDate: match?.startDate || new Date().toISOString().split('T')[0],
//         status: match?.adminReviewStatus || match?.status || 'suggested'
//       }))
//     : [];

//   const stats = [
//     { 
//       label: 'Profile Views', 
//       value: dashboardData.stats.profileViews.toString(), 
//       icon: <Users className="w-5 h-5" />, 
//       change: '+0%' 
//     },
//     { 
//       label: 'Match Requests', 
//       value: dashboardData.stats.matchRequests.toString(), 
//       icon: <LinkIcon className="w-5 h-5" />, 
//       change: '0' 
//     },
//     { 
//       label: 'Interviews', 
//       value: dashboardData.stats.interviews.toString(), 
//       icon: <Calendar className="w-5 h-5" />, 
//       change: '0 pending' 
//     },
//     { 
//       label: 'Earnings (YTD)', 
//       value: `€${(dashboardData.stats.earnings / 1000).toFixed(1)}k`, 
//       icon: <DollarSign className="w-5 h-5" />, 
//       change: '+0%' 
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'pending':
//       case 'suggested':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'interview_scheduled':
//       case 'contacted':
//         return 'bg-blue-100 text-blue-800';
//       case 'accepted':
//       case 'shortlisted':
//         return 'bg-green-100 text-green-800';
//       case 'rejected':
//       case 'unavailable':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (status) => {
//     switch(status) {
//       case 'suggested': return 'Suggested Match';
//       case 'pending': return 'Pending';
//       case 'contacted': return 'Contacted';
//       case 'interview_scheduled': return 'Interview Scheduled';
//       case 'shortlisted': return 'Shortlisted';
//       case 'accepted': return 'Accepted';
//       case 'rejected': return 'Declined';
//       case 'unavailable': return 'Unavailable';
//       default: return status?.replace('_', ' ') || 'Unknown';
//     }
//   };

//   const handleCompleteProfile = () => {
//     setModalStep('basic');
//     setShowProfileModal(true);
//   };

//   const handleViewMatch = (matchId) => {
//     console.log('View match:', matchId);
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
//           <ProfileCompletionModal
//             isOpen={showProfileModal}
//             onClose={() => setShowProfileModal(false)}
//             initialStep={modalStep}
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
//         <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl`}>
//           <div className="h-full flex flex-col">
//             {/* Sidebar Header */}
//             <div className="px-4 py-6 border-b border-blue-700">
//               <div className="flex items-center space-x-3">
//                 <div className="rounded-lg">
//                   <img src="/logo.png" alt="Logo" className="h-12 object-contain" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Consultant Panel</h2>
//                   <p className="text-xs text-blue-200">Web Consultant Hub</p>
//                 </div>
//               </div>
//             </div>

//             {/* User Profile Summary */}
//             <div className="px-4 py-4 border-b border-blue-700">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
//                   <User className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="font-medium">{profile.name}</p>
//                   <p className="text-xs text-blue-200">{profile.title}</p>
//                   {profile.rating > 0 && (
//                     <div className="flex items-center mt-1">
//                       <Star className="w-3 h-3 text-yellow-400 fill-current" />
//                       <span className="text-xs ml-1">{profile.rating}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {profile.subscriptionStatus !== 'active' && (
//                 <div className="mt-3 bg-yellow-500/20 text-yellow-200 text-xs p-2 rounded-lg">
//                   Subscription {profile.subscriptionStatus}
//                 </div>
//               )}
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-2 py-4 space-y-1">
//               {[
//                 { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
//                 { id: 'calendar', label: 'Calendar & Agenda', icon: <Calendar className="w-5 h-5" /> },
//                 { id: 'matches', label: 'My Matches', icon: <LinkIcon className="w-5 h-5" /> },
//                 { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
//                 { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
//                 { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
//                 { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
//                 { id: 'support', label: 'Support', icon: <LifeBuoy className="w-5 h-5" /> },
//                 { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
//                   className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition ${
//                     activeTab === item.id ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
//                   }`}
//                 >
//                   {item.icon}
//                   <span className="ml-3">{item.label}</span>
//                 </button>
//               ))}
//             </nav>

//             {/* Sidebar Footer */}
//             <div className="px-4 py-4 border-t border-blue-700">
//               <button 
//                 onClick={logout}
//                 className="flex items-center text-blue-100 hover:text-white w-full px-4 py-2 text-sm"
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
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden text-gray-500 hover:text-gray-700"
//                 >
//                   <Menu className="w-6 h-6" />
//                 </button>

//                 <div className="flex-1 flex justify-end items-center space-x-4">
//                   <button className="relative p-2 text-gray-400 hover:text-gray-600">
//                     <Bell className="w-6 h-6" />
//                     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//                   </button>
//                   <button
//                     onClick={() => setIsSupportModalOpen(true)}
//                     className="p-2 text-gray-400 hover:text-gray-600 relative group"
//                     title="Contact Support"
//                   >
//                     <HelpCircle className="w-6 h-6" />
//                   </button>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
//                       {profile.name.charAt(0)}
//                     </div>
//                     <span className="hidden md:block text-sm font-medium text-gray-700">{profile.name}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           {/* Page Content */}
//           <main className="p-4 sm:p-6 lg:p-8">
//             <ProfileCompletionBanner 
//               profileCompletion={profileCompletion} 
//               onComplete={(step) => {
//                 setModalStep(step);
//                 setShowProfileModal(true);
//               }}
//             />
            
//             {activeTab === 'overview' && (
//               <>
//                 {/* Welcome Header */}
//                 <div className="mb-8">
//                   <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile.name.split(' ')[0] || 'Consultant'}!</h1>
//                   <p className="text-gray-600">Here's your consulting activity overview.</p>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   {stats.map((stat, index) => (
//                     <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
//                           {stat.icon}
//                         </div>
//                         <span className="text-sm text-green-600">{stat.change}</span>
//                       </div>
//                       <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//                       <p className="text-gray-600 text-sm">{stat.label}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Quick Calendar Preview */}
//                 <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-lg font-semibold text-gray-900">Quick Schedule View</h2>
//                     <button 
//                       onClick={() => setActiveTab('calendar')}
//                       className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//                     >
//                       View Full Calendar →
//                     </button>
//                   </div>
//                   <div className="grid lg:grid-cols-2 gap-6">
//                     <AvailabilityCalendar
//                       userId={user?.email}
//                       userType="consultant"
//                       BACKEND_URL={BACKEND_URL}
//                       onAvailabilityChange={handleAvailabilityChange}
//                       compact={true}
//                     />
//                     <AgendaWidget
//                       userId={user?.email}
//                       userType="consultant"
//                       BACKEND_URL={BACKEND_URL}
//                       compact={true}
//                     />
//                   </div>
//                 </div>

//                 {/* Two Column Layout */}
//                 <div className="grid lg:grid-cols-2 gap-6">
//                   {/* Active Matches */}
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Active Matches</h2>
//                       <button 
//                         onClick={() => setActiveTab('matches')}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="p-6">
//                       {activeMatches.length > 0 ? (
//                         activeMatches.slice(0, 3).map((match) => (
//                           <div 
//                             key={match.id} 
//                             className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer"
//                             onClick={() => handleViewMatch(match.id)}
//                           >
//                             <div className="flex justify-between items-start mb-2">
//                               <h3 className="font-medium text-gray-900">{match.client}</h3>
//                               <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
//                                 {getStatusText(match.status)}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-600 mb-2">{match.project}</p>
//                             <div className="flex items-center text-sm text-gray-500">
//                               <Clock className="w-4 h-4 mr-1" />
//                               {match.duration}
//                               <Calendar className="w-4 h-4 ml-3 mr-1" />
//                               Starts {new Date(match.startDate).toLocaleDateString()}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-center py-8">
//                           <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <LinkIcon className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <p className="text-gray-500 mb-2">No active matches yet</p>
//                           <p className="text-sm text-gray-400">Complete your profile to get matched with projects</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Support Tickets Preview */}
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                       <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
//                       <button 
//                         onClick={() => setActiveTab('support')}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         View All
//                       </button>
//                     </div>
//                     <div className="p-6">
//                       {supportLoading ? (
//                         <div className="flex justify-center py-8">
//                           <Loader className="w-6 h-6 animate-spin text-blue-600" />
//                         </div>
//                       ) : supportTickets.length > 0 ? (
//                         <div className="space-y-3">
//                           {supportTickets.slice(0, 2).map((ticket) => (
//                             <div
//                               key={ticket._id}
//                               onClick={() => fetchTicketDetails(ticket)}
//                               className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
//                             >
//                               <div className="flex items-center justify-between mb-1">
//                                 <span className="text-xs font-mono text-blue-600">{ticket.ticketId}</span>
//                                 <span className={`px-2 py-0.5 text-xs rounded-full ${
//                                   ticket.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
//                                   ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
//                                   'bg-green-100 text-green-800'
//                                 }`}>
//                                   {ticket.status}
//                                 </span>
//                               </div>
//                               <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
//                               <p className="text-xs text-gray-500 mt-1">
//                                 {new Date(ticket.createdAt).toLocaleDateString()}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center py-6">
//                           <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
//                             <Ticket className="w-6 h-6 text-gray-400" />
//                           </div>
//                           <p className="text-gray-500 text-sm mb-2">No support tickets</p>
//                           <button
//                             onClick={() => setIsSupportModalOpen(true)}
//                             className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//                           >
//                             Contact Support →
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Calendar & Agenda Tab */}
//             {activeTab === 'calendar' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Calendar & Agenda</h1>
//                     <p className="text-gray-600 mt-1">Manage your availability and view upcoming engagements</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setCalendarView('full')}
//                       className={`p-2 rounded-lg transition ${calendarView === 'full' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                       title="Full View"
//                     >
//                       <Grid className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setCalendarView('compact')}
//                       className={`p-2 rounded-lg transition ${calendarView === 'compact' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                       title="Compact View"
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className={`grid ${calendarView === 'full' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
//                   <div className={calendarView === 'full' ? 'lg:col-span-2' : 'lg:col-span-1'}>
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                       <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                         <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                         Availability Calendar
//                       </h2>
//                       <p className="text-sm text-gray-500 mb-4">
//                         Click on any date to mark your availability. Green dates show when you're available for new projects.
//                       </p>
//                       <AvailabilityCalendar
//                         userId={user?.email}
//                         userType="consultant"
//                         BACKEND_URL={BACKEND_URL}
//                         onAvailabilityChange={handleAvailabilityChange}
//                         compact={calendarView === 'compact'}
//                       />
//                     </div>
//                   </div>

//                   <div className={calendarView === 'full' ? 'lg:col-span-1' : 'lg:col-span-1'}>
//                     <AgendaWidget
//                       userId={user?.email}
//                       userType="consultant"
//                       BACKEND_URL={BACKEND_URL}
//                       compact={calendarView === 'compact'}
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-orange-600" />
//                     Upcoming Deadlines
//                   </h2>
//                   <div className="text-center py-8 text-gray-500">
//                     <p>No upcoming deadlines</p>
//                     <p className="text-sm mt-1">Deadlines from your active projects will appear here</p>
//                   </div>
//                 </div>

//                 <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
//                   <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
//                     <HelpCircle className="w-5 h-5 mr-2" />
//                     Availability Tips
//                   </h3>
//                   <ul className="text-sm text-blue-800 space-y-1">
//                     <li>• Mark your availability at least 2 weeks in advance to get better matches</li>
//                     <li>• Update your calendar regularly to reflect your current availability</li>
//                     <li>• Set specific time ranges to help clients schedule meetings</li>
//                     <li>• Mark days as "Busy" when you're on active projects</li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Profile Tab - FIXED expertise rendering */}
//             {activeTab === 'profile' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Professional Profile</h2>
//                   <button 
//                     onClick={() => {
//                       setModalStep('basic');
//                       setShowProfileModal(true);
//                     }}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Personal Information</h3>
//                     <div className="space-y-4">
//                       <div><label className="text-sm text-gray-500">Full Name</label><p className="font-medium text-gray-900">{profile.name}</p></div>
//                       <div><label className="text-sm text-gray-500">Professional Title</label><p className="font-medium text-gray-900">{profile.title}</p></div>
//                       <div><label className="text-sm text-gray-500">Location</label><p className="font-medium text-gray-900 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" />{profile.location}</p></div>
//                       <div><label className="text-sm text-gray-500">Email</label><p className="font-medium text-gray-900">{user?.email || 'Not provided'}</p></div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Professional Details</h3>
//                     <div className="space-y-4">
//                       <div><label className="text-sm text-gray-500">Hourly Rate</label><p className="font-medium text-gray-900">{profile.hourlyRate}</p></div>
//                       <div><label className="text-sm text-gray-500">Completed Projects</label><p className="font-medium text-gray-900">{profile.completedProjects}</p></div>
//                       <div><label className="text-sm text-gray-500">Availability</label><p className="font-medium text-gray-900 flex items-center"><Calendar className="w-4 h-4 mr-1 text-gray-400" />{profile.availability}</p></div>
//                       {profile.expertise.length > 0 && (
//                         <div>
//                           <label className="text-sm text-gray-500">Expertise</label>
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {profile.expertise.map((skill, index) => {
//                               // Ensure we're rendering a string
//                               const skillName = typeof skill === 'string' ? skill : skill?.name || String(skill);
//                               return (
//                                 <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                                   {skillName}
//                                 </span>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex items-center pt-2">
//                         {profile.verified && (<><CheckCircle className="w-5 h-5 text-green-500 mr-2" /><span className="text-sm text-green-700">Verified Consultant</span></>)}
//                         {profile.subscriptionStatus === 'active' && (<span className="ml-4 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Subscription Active</span>)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Matches Tab */}
//             {activeTab === 'matches' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">My Matches</h2>
//                 {activeMatches.length > 0 ? (
//                   <div className="space-y-4">
//                     {activeMatches.map((match) => (
//                       <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
//                         <div className="flex justify-between items-start mb-3">
//                           <div><h3 className="font-semibold text-gray-900">{match.client}</h3><p className="text-gray-600">{match.project}</p></div>
//                           <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>{getStatusText(match.status)}</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center space-x-4 text-gray-500">
//                             <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{match.duration}</span>
//                             <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(match.startDate).toLocaleDateString()}</span>
//                           </div>
//                           <button onClick={() => handleViewMatch(match.id)} className="text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><LinkIcon className="w-10 h-10 text-gray-400" /></div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
//                     <p className="text-gray-500">Complete your profile to get matched with relevant projects</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Projects Tab */}
//             {activeTab === 'projects' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">My Projects</h2>
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><Briefcase className="w-10 h-10 text-gray-400" /></div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
//                   <p className="text-gray-500">Projects will appear here once you're matched and accepted</p>
//                 </div>
//               </div>
//             )}

//             {/* Messages Tab */}
//             {activeTab === 'messages' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Messages</h2>
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><MessageSquare className="w-10 h-10 text-gray-400" /></div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
//                   <p className="text-gray-500">Messages will appear here when you connect with clients</p>
//                 </div>
//               </div>
//             )}

//             {/* Documents Tab */}
//             {activeTab === 'documents' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Documents</h2>
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-10 h-10 text-gray-400" /></div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
//                   <p className="text-gray-500">Upload contracts, invoices, and other documents here</p>
//                 </div>
//               </div>
//             )}

//             {/* Support Tab */}
//             {activeTab === 'support' && (
//               <div className="space-y-6">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex items-center justify-between">
//                     <div><h2 className="text-2xl font-bold text-gray-900">Support Center</h2><p className="text-gray-600 mt-1">Get help with your account, projects, or technical issues</p></div>
//                     <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center"><HelpCircle className="w-5 h-5 mr-2" />Contact Support</button>
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
//                     <div className="space-y-4">{supportTickets.map((ticket) => (<SupportTicket key={ticket._id} ticket={ticket} onViewDetails={fetchTicketDetails} />))}</div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Ticket className="w-8 h-8 text-gray-400" /></div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
//                       <p className="text-gray-500 mb-4">You haven't created any support tickets yet</p>
//                       <button onClick={() => setIsSupportModalOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Create Support Ticket</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
//                 <div className="space-y-6">
//                   <div><h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for new matches</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for messages</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Weekly summary emails</span></label>
//                     </div>
//                   </div>
//                   <div><h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Make my profile visible to clients</span></label>
//                       <label className="flex items-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="ml-2 text-gray-700">Show my availability status</span></label>
//                     </div>
//                   </div>
//                   <div className="pt-4 border-t border-gray-200"><button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">Delete Account</button></div>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// };

// export default ConsultantDashboard;




// src/page/consultant/Dashboard.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Briefcase,
  User,
  Settings,
  LogOut,
  Bell,
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
  Loader,
  HelpCircle,
  Send,
  X,
  ChevronRight,
  Mail,
  LifeBuoy,
  Ticket,
  Grid,
  List,
  Sparkles,
  Award,
  Shield,
  Zap,
  ChevronDown,
  Search,
  Home,
  Target,
  ThumbsUp,
  BookOpen,
  Video,
  Menu,
  ArrowUpRight,
  CalendarDays,
  Plus,
  Upload,
  Filter,
  Clock as ClockIcon,
  LayoutDashboard,
  CalendarCheck,
  Handshake,
  FolderOpen,
  Inbox,
  UserCircle,
  FileCheck,
  Headset,
  Sliders,
  ChevronLeft,
  CalendarPlus,
  MessageCircle,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  Activity,
  Eye,
  Check,
  Radio,
  Wifi,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Maximize2,
  Minimize2,
  Save,
  Trash2,
  Repeat,
  EyeOff,
    CreditCard,
  Download,

} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactSupportModal from '../../components/modals/ContactSupportModal';
import AvailabilityCalendar from '../../components/AvailabilityCalendar';
import AgendaWidget from '../../components/AgendaWidget';
import ProfileCompletionBanner from '../../components/ProfileCompletionBanner';
import ProfileCompletionModal from '../../components/ProfileCompletionModal';

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
    { icon: <CalendarPlus size={18} />, label: 'Set Availability', color: 'blue', action: 'calendar' },
    { icon: <MessageCircle size={18} />, label: 'Quick Message', color: 'green', action: 'messages' },
    { icon: <Upload size={18} />, label: 'Upload Document', color: 'purple', action: 'documents' },
    { icon: <DollarSignIcon size={18} />, label: 'Create Invoice', color: 'orange', action: 'projects' },
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
          <Plus size={24} className={`transition-transform ${isHovered ? 'rotate-90' : ''}`} />
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
      title: 'New Match Opportunity!',
      message: 'TechCorp is interested in your profile',
      time: '5 min ago',
      read: false,
      icon: <Handshake size={16} />,
      color: 'green'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Meeting Reminder',
      message: 'Interview with Acme Inc in 30 minutes',
      time: '25 min ago',
      read: false,
      icon: <Calendar size={16} />,
      color: 'blue'
    },
    {
      id: 3,
      type: 'document',
      title: 'Document Upload Required',
      message: 'Please upload your updated CV',
      time: '2 hours ago',
      read: true,
      icon: <FileText size={16} />,
      color: 'purple'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Received',
      message: '€2,500 credited to your account',
      time: '1 day ago',
      read: true,
      icon: <DollarSignIcon size={16} />,
      color: 'orange'
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
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
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
                ))
              )}
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700">
                View all notifications
              </button>
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
      type: 'view',
      title: 'Profile View',
      description: 'Sarah Johnson viewed your profile',
      time: '10 minutes ago',
      icon: <Eye size={14} />,
      color: 'blue'
    },
    {
      id: 2,
      type: 'match',
      title: 'New Match',
      description: 'You matched with "Digital Transformation Project"',
      time: '2 hours ago',
      icon: <Handshake size={14} />,
      color: 'green'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting Scheduled',
      description: 'Interview with Tech Solutions on Friday',
      time: '5 hours ago',
      icon: <Calendar size={14} />,
      color: 'purple'
    },
    {
      id: 4,
      type: 'document',
      title: 'Document Uploaded',
      description: 'Contract_v2.pdf was uploaded',
      time: '1 day ago',
      icon: <FileText size={14} />,
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
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { id: 'matches', label: 'Matches', icon: <Target size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
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
              <li><a href="#" className="hover:text-white transition">Manage your trips</a></li>
              <li><a href="#" className="hover:text-white transition">Attractions help center</a></li>
              <li><a href="#" className="hover:text-white transition">Safety Resource Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Genius loyalty program</a></li>
              <li><a href="#" className="hover:text-white transition">Seasonal and holiday deals</a></li>
              <li><a href="#" className="hover:text-white transition">Travel articles</a></li>
              <li><a href="#" className="hover:text-white transition">Booking.com for Business</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Terms and settings</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Notice</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-white transition">Partner dispute</a></li>
              <li><a href="#" className="hover:text-white transition">Modern Slavery Statement</a></li>
              <li><a href="#" className="hover:text-white transition">Human Rights Statement</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Extranet login</a></li>
              <li><a href="#" className="hover:text-white transition">Partner help</a></li>
              <li><a href="#" className="hover:text-white transition">List your property</a></li>
              <li><a href="#" className="hover:text-white transition">Become an affiliate</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About ConsultantHub</a></li>
              <li><a href="#" className="hover:text-white transition">How We Work</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition">Press center</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Investor relations</a></li>
              <li><a href="#" className="hover:text-white transition">Corporate contact</a></li>
              <li><a href="#" className="hover:text-white transition">Content guidelines</a></li>
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
              <a href="#" className="text-gray-400 hover:text-white transition"><Youtube size={20} /></a>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-4 justify-center">
              <span>ConsultantHub is part of Booking Holdings Inc.</span>
              <span>•</span>
              <span>Copyright © 1996–2026 ConsultantHub™</span>
            </div>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Sitemap</span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">
            All rights reserved. ConsultantHub is a global leader in professional consulting services.
          </p>
        </div>
      </div>
    </footer>
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

// Match Card Component
const MatchCard = ({ match }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-gray-900">{match.client}</h3>
        <p className="text-sm text-gray-600">{match.project}</p>
      </div>
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
        {match.status}
      </span>
    </div>
    <div className="flex items-center gap-4 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <Clock size={12} /> {match.duration}
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={12} /> {match.startDate}
      </span>
    </div>
  </div>
);

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

// Mega Dropdown for Categories
const MegaDropdown = ({ trigger, categories, onCategoryClick }) => {
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
        <div className="absolute left-0 mt-2 w-[600px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">{category.title}</h4>
                <div className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => {
                        onCategoryClick(item.action);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Availability Form Component - Always visible in Hero
const HeroAvailabilityForm = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availabilityType, setAvailabilityType] = useState('available');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [timezone, setTimezone] = useState('Europe/London');
  const [recurring, setRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState('weekly');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availabilityOptions = [
    { value: 'available', label: 'Available', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700' },
    { value: 'busy', label: 'Busy', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700' },
    { value: 'limited', label: 'Limited', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-700' },
  ];

  const timezones = [
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris/Berlin)' },
    { value: 'America/New_York', label: 'EST (New York)' },
    { value: 'America/Los_Angeles', label: 'PST (Los Angeles)' },
    { value: 'Asia/Dubai', label: 'GST (Dubai)' },
    { value: 'Asia/Singapore', label: 'SGT (Singapore)' },
  ];

  const recurringOptions = [
    { value: 'weekly', label: 'Every week' },
    { value: 'biweekly', label: 'Every 2 weeks' },
    { value: 'monthly', label: 'Every month' },
  ];

  const selectedOption = availabilityOptions.find(opt => opt.value === availabilityType);

  const handleSave = async () => {
    setSaving(true);
    const availabilityData = {
      id: Date.now(),
      date: selectedDate,
      type: availabilityType,
      startTime,
      endTime,
      timezone,
      recurring,
      recurringType: recurring ? recurringType : null,
      notes: notes || null,
    };
    await onSave(availabilityData);
    setSaving(false);
    setShowSuccess(true);
    setNotes('');
    setRecurring(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <CalendarPlus className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Set Your Availability</h3>
        {showSuccess && (
          <span className="ml-auto text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Saved successfully!
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Availability Status</label>
          <div className="relative">
            <select
              value={availabilityType}
              onChange={(e) => setAvailabilityType(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg appearance-none focus:ring-2 focus:ring-offset-0 ${selectedOption?.borderColor} ${selectedOption?.bgColor} ${selectedOption?.textColor}`}
            >
              {availabilityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Timezone</label>
          <div className="relative">
            <Globe size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Repeat Weekly</label>
          <button
            onClick={() => setRecurring(!recurring)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-sm border rounded-lg transition ${
              recurring ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            <Repeat size={14} className={recurring ? 'text-blue-600' : 'text-gray-400'} />
            <span>{recurring ? 'ON' : 'OFF'}</span>
            <div className={`ml-auto w-8 h-4 rounded-full transition-colors ${recurring ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`w-3 h-3 bg-white rounded-full mt-0.5 transition-transform ${recurring ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </button>
        </div>

        {recurring && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Repeat Pattern</label>
            <div className="relative">
              <select
                value={recurringType}
                onChange={(e) => setRecurringType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {recurringOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        <div className={recurring ? '' : 'lg:col-span-2'}>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about your availability..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
          Save Availability
        </button>
      </div>
    </div>
  );
};

// Availability Modal Component (for date click)
const AvailabilityModal = ({ selectedDate, existingAvailability, onSave, onDelete, onClose }) => {
  const [availabilityType, setAvailabilityType] = useState(existingAvailability?.type || 'available');
  const [startTime, setStartTime] = useState(existingAvailability?.startTime || '09:00');
  const [endTime, setEndTime] = useState(existingAvailability?.endTime || '17:00');
  const [timezone, setTimezone] = useState(existingAvailability?.timezone || 'Europe/London');
  const [recurring, setRecurring] = useState(existingAvailability?.recurring || false);
  const [recurringType, setRecurringType] = useState(existingAvailability?.recurringType || 'weekly');
  const [notes, setNotes] = useState(existingAvailability?.notes || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(!existingAvailability);

  const availabilityOptions = [
    { value: 'available', label: 'Available', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700' },
    { value: 'busy', label: 'Busy', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700' },
    { value: 'limited', label: 'Limited', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-700' },
  ];

  const timezones = [
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris/Berlin)' },
    { value: 'America/New_York', label: 'EST (New York)' },
    { value: 'America/Los_Angeles', label: 'PST (Los Angeles)' },
    { value: 'Asia/Dubai', label: 'GST (Dubai)' },
    { value: 'Asia/Singapore', label: 'SGT (Singapore)' },
  ];

  const selectedOption = availabilityOptions.find(opt => opt.value === availabilityType);
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  const handleSave = async () => {
    setSaving(true);
    const availabilityData = {
      id: existingAvailability?.id || Date.now(),
      date: selectedDate,
      type: availabilityType,
      startTime,
      endTime,
      timezone,
      recurring,
      recurringType: recurring ? recurringType : null,
      notes: notes || null,
    };
    await onSave(availabilityData, existingAvailability?.id);
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(existingAvailability.id);
    setDeleting(false);
    onClose();
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {existingAvailability ? 'Edit Availability' : 'Add Availability'}
                  </h2>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {existingAvailability && !isEditing ? (
              // View Mode
              <div className="space-y-4">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-${selectedOption?.bgColor} text-${selectedOption?.textColor}`}>
                  {selectedOption?.label}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={18} className="text-gray-400" />
                    <span>{formatTime(startTime)} - {formatTime(endTime)} ({timezone})</span>
                  </div>
                  
                  {notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs font-medium text-gray-500 mb-1">Notes</div>
                      <div className="text-sm text-gray-700">{notes}</div>
                    </div>
                  )}
                  
                  {recurring && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Repeat size={14} />
                      <span>Repeats {recurringType === 'weekly' ? 'every week' : recurringType === 'biweekly' ? 'every 2 weeks' : 'every month'}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    {deleting ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              // Edit/Create Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                  <div className="relative">
                    <select
                      value={availabilityType}
                      onChange={(e) => setAvailabilityType(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-offset-0 ${selectedOption?.borderColor} ${selectedOption?.bgColor} ${selectedOption?.textColor}`}
                    >
                      {availabilityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Repeat Weekly</label>
                  <button
                    onClick={() => setRecurring(!recurring)}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm border rounded-lg transition ${
                      recurring ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <Repeat size={14} className={recurring ? 'text-blue-600' : 'text-gray-400'} />
                    <span>{recurring ? 'ON' : 'OFF'}</span>
                    <div className={`ml-auto w-8 h-4 rounded-full transition-colors ${recurring ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full mt-0.5 transition-transform ${recurring ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </button>
                </div>

                {recurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repeat Pattern</label>
                    <div className="relative">
                      <select
                        value={recurringType}
                        onChange={(e) => setRecurringType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="weekly">Every week</option>
                        <option value="biweekly">Every 2 weeks</option>
                        <option value="monthly">Every month</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about your availability..."
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    {existingAvailability ? 'Update' : 'Save'}
                  </button>
                  {existingAvailability && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Collapsible Calendar Component - Shows as row by default, expands on eye icon click
const CollapsibleCalendar = ({ availabilityData, onUpdateAvailability, onDateClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateAvailability, setSelectedDateAvailability] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        availability: null,
      });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const availability = availabilityData?.find(a => a.date === dateStr);
      days.push({
        date,
        isCurrentMonth: true,
        availability: availability || null,
      });
    }
    // Next month days to fill grid (6 rows = 42 days)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        availability: null,
      });
    }
    setCalendarDays(days);
  }, [currentMonth, availabilityData]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return;
    const dateStr = day.date.toISOString().split('T')[0];
    const existing = availabilityData.find(a => a.date === dateStr);
    setSelectedDate(dateStr);
    setSelectedDateAvailability(existing || null);
    setShowAvailabilityModal(true);
    onDateClick?.(existing);
  };

  const handleSaveAvailability = async (availability, existingId) => {
    await onUpdateAvailability(availability, null);
  };

  const handleDeleteAvailability = async (id) => {
    await onUpdateAvailability(null, id);
  };

  const getAvailabilityColor = (type) => {
    switch(type) {
      case 'available': return 'green';
      case 'busy': return 'red';
      case 'limited': return 'yellow';
      default: return 'gray';
    }
  };

  const getAvailabilityLabel = (type) => {
    switch(type) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'limited': return 'Limited';
      default: return '';
    }
  };

  // Get upcoming availability summary
  const upcomingAvailability = availabilityData
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <>
      {/* Collapsed Row View - Default */}
      {!isExpanded ? (
        <div 
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Availability Calendar</h3>
                <p className="text-sm text-gray-500">
                  {availabilityData.length} availability {availabilityData.length === 1 ? 'slot' : 'slots'} set
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Upcoming summary */}
              {upcomingAvailability.length > 0 && (
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-gray-400">Next:</span>
                  {upcomingAvailability.map((a, idx) => (
                    <span key={a.id} className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full bg-${getAvailabilityColor(a.type)}-500`} />
                      <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      {idx < upcomingAvailability.length - 1 && <span className="text-gray-300">•</span>}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 text-blue-600">
                <span className="text-sm">View Calendar</span>
                <Eye size={18} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Expanded Full Calendar View
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Availability Calendar</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {availabilityData.length} set
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-gray-200 rounded-lg transition flex items-center gap-1 text-sm text-gray-600"
            >
              <EyeOff size={16} />
              <span>Collapse</span>
            </button>
          </div>

          <div className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={18} />
              </button>
              <h4 className="font-medium text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                const isToday = day.date.toDateString() === new Date().toDateString();
                const hasAvailability = !!day.availability;
                const availabilityColor = hasAvailability ? getAvailabilityColor(day.availability.type) : null;

                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative aspect-square p-1 rounded-lg transition-all
                      ${day.isCurrentMonth ? 'hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-default'}
                      ${isToday ? 'ring-2 ring-blue-500' : ''}
                      ${hasAvailability && day.isCurrentMonth ? `bg-${availabilityColor}-50` : ''}
                    `}
                    disabled={!day.isCurrentMonth}
                  >
                    <span className={`text-xs ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}`}>
                      {day.date.getDate()}
                    </span>
                    {hasAvailability && day.isCurrentMonth && (
                      <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-${availabilityColor}-500`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-xs text-gray-600">Busy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="text-xs text-gray-600">Limited</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-xs text-gray-400">Click on any date to add/edit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
       <AvailabilityModal
  selectedDate={selectedDate}
  existingAvailability={selectedDateAvailability}
  onSave={async (availability, existingId) => {
    await onUpdateAvailability(availability, null);
    setShowAvailabilityModal(false);
    setSelectedDateAvailability(null);
    setSelectedDate(null);
  }}
  onDelete={async (id) => {
    await onUpdateAvailability(null, id);
    setShowAvailabilityModal(false);
    setSelectedDateAvailability(null);
    setSelectedDate(null);
  }}
  onClose={() => {
    setShowAvailabilityModal(false);
    setSelectedDateAvailability(null);
    setSelectedDate(null);
  }}
/>
      )}
    </>
  );
};

const ConsultantDashboard = () => {
  const { user, logout, profileCompletion, BACKEND_URL, updateProfileCompletion } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [modalStep, setModalStep] = useState('basic');
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityList, setAvailabilityList] = useState([]);
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

  // Navigation Categories for Mega Menu
  const navigationCategories = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: <LayoutDashboard size={16} />, action: "overview" },
        { label: "Calendar & Agenda", icon: <CalendarCheck size={16} />, action: "calendar" },
        { label: "My Matches", icon: <Handshake size={16} />, action: "matches" },
      ]
    },
    {
      title: "Work",
      items: [
        { label: "Projects", icon: <FolderOpen size={16} />, action: "projects" },
        { label: "Messages", icon: <Inbox size={16} />, action: "messages" },
        { label: "Documents", icon: <FileCheck size={16} />, action: "documents" },
      ]
    },
    {
      title: "Account",
      items: [
        { label: "Profile", icon: <UserCircle size={16} />, action: "profile" },
        { label: "Support", icon: <Headset size={16} />, action: "support" },
        { label: "Settings", icon: <Sliders size={16} />, action: "settings" },
      ]
    }
  ];

const handleUpdateAvailability = useCallback(async (availability, deleteId = null) => {
  try {
    const token = localStorage.getItem('auth_token');
    
    if (deleteId) {
      // Delete availability
      const availabilityToDelete = availabilityList.find(a => a.id === deleteId);
      if (availabilityToDelete) {
        const response = await fetch(`${BACKEND_URL}/api/availability/${encodeURIComponent(user.email)}/${availabilityToDelete.date}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          setAvailabilityList(prev => prev.filter(a => a.id !== deleteId));
        }
      }
    } else if (availability) {
      // Save availability to backend
      const response = await fetch(`${BACKEND_URL}/api/availability/save`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.email,
          userType: 'consultant',
          date: availability.date,
          type: availability.type,
          startTime: availability.startTime,
          endTime: availability.endTime,
          timezone: availability.timezone,
          notes: availability.notes,
          recurring: availability.recurring,
          recurringType: availability.recurringType
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setAvailabilityList(prev => {
          const existingIndex = prev.findIndex(a => a.id === availability.id);
          if (existingIndex >= 0) {
            const newList = [...prev];
            newList[existingIndex] = { ...availability, id: availability.id };
            return newList;
          }
          return [...prev, { ...availability, id: availability.id || Date.now() }];
        });
      }
    }
  } catch (error) {
    console.error('Error updating availability:', error);
  }
}, [user, BACKEND_URL, availabilityList]);

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
      const profile = result.data.profile || {};
      const matches = Array.isArray(result.data.recentMatches) ? result.data.recentMatches : [];
      const availability = result.data.availability || [];
      
      // Transform availability from backend format to frontend format
      const transformedAvailability = availability.map(block => ({
        id: block._id || `${block.date}-${Date.now()}`,
        date: block.date,
        type: block.status === 'available' ? 'available' : (block.status === 'busy' ? 'busy' : 'limited'),
        startTime: block.startTime,
        endTime: block.endTime,
        timezone: block.timezone,
        notes: block.notes,
        recurring: false
      }));
      
      setAvailabilityList(transformedAvailability);
      
      setDashboardData({
        profile: {
          ...profile,
          fullName: profile.fullName || '',
          phone: profile.phone || '',
          ageRange: profile.ageRange || '',
          baseCountry: profile.baseCountry || '',
          baseCity: profile.baseCity || '',
          yearsExperience: profile.yearsExperience || '',
          positions: profile.positions || [],
          cvFileName: profile.cvFileName || '',
          cvUrl: profile.cvUrl || '',
          rating: profile.rating || 0,
          completedProjects: profile.completedProjects || 0,
          hourlyRate: profile.hourlyRate || 0,
          earningsYtd: profile.earningsYtd || 0,
          subscriptionActive: profile.subscriptionStatus === 'active',
          subscriptionEndDate: profile.subscriptionEndDate,
          isVerified: profile.isVerified || false,
          profileViews: profile.profileViews || 0,
          totalReviews: profile.totalReviews || 0,
          createdAt: profile.createdAt
        },
        matches: matches,
        stats: {
          profileViews: profile.profileViews || 0,
          matchRequests: result.data.stats?.matchCount || matches.length || 0,
          interviews: result.data.stats?.activeMatches || 0,
          earnings: profile.earningsYtd || 0
        }
      });

      await fetchSupportTickets();
    } else {
      setError(result.error || 'Failed to load dashboard data');
    }
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    setError('Unable to connect to server');
  } finally {
    setLoading(false);
  }
}, [user, BACKEND_URL]);

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
        { headers: { 'Authorization': token ? `Bearer ${token}` : '' } }
      );
      const data = await response.json();
      if (data.success) {
        setSelectedTicket(data.request);
      }
    } catch (err) {
      console.error('Error fetching ticket details:', err);
    }
  };

  const handleSubmitReply = async (ticketId, message) => {
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`${BACKEND_URL}/api/admin/support-requests/${ticketId}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, isInternal: false })
      });
      await fetchSupportTickets();
      if (selectedTicket) await fetchTicketDetails(selectedTicket);
    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user, BACKEND_URL, fetchDashboardData]);

  // Load availability from backend
useEffect(() => {
  const loadAvailability = async () => {
    if (!user?.email) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/availability/consultant/${encodeURIComponent(user.email)}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.availability) {
          const transformed = Object.entries(data.availability).map(([date, block]) => ({
            id: `${date}-${Date.now()}`,
            date: date,
            type: block.status === 'available' ? 'available' : (block.status === 'busy' ? 'busy' : 'limited'),
            startTime: block.startTime || '09:00',
            endTime: block.endTime || '17:00',
            timezone: block.timezone || 'Europe/London',
            notes: block.notes || '',
            recurring: false
          }));
          setAvailabilityList(transformed);
        }
      }
    } catch (error) {
      console.error('Error loading availability:', error);
    }
  };
  
  loadAvailability();
}, [user, BACKEND_URL]);

  useEffect(() => {
    if (user && profileCompletion.status !== 'complete') {
      const timer = setTimeout(() => setShowProfileModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user, profileCompletion]);

  const handleProfileComplete = (step) => {
    if (step === 'payment') updateProfileCompletion('payment', true);
    setShowProfileModal(false);
    fetchDashboardData();
  };

  const handleHeroAction = (action) => {
    if (typeof action === 'string') {
      setActiveTab(action);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query, 'in tab:', activeTab);
  };

  const handleDateClick = (availability) => {
    console.log('Date clicked with availability:', availability);
  };

const profile = dashboardData.profile ? {
  name: dashboardData.profile.fullName || user?.name || 'Consultant',
  title: dashboardData.profile.positions?.[0]?.name || 'Strategic Consultant',
  location: dashboardData.profile.baseCity && dashboardData.profile.baseCountry 
    ? `${dashboardData.profile.baseCity}, ${dashboardData.profile.baseCountry}`
    : (dashboardData.profile.baseCountry || 'Remote'),
  rating: dashboardData.profile.rating || 0,
  completedProjects: dashboardData.profile.completedProjects || 0,
  matchesCount: dashboardData.matches?.length || 0,
  hourlyRate: dashboardData.profile.hourlyRate ? `€${dashboardData.profile.hourlyRate}/hr` : 'Rate not set',
  expertise: Array.isArray(dashboardData.profile.positions) 
    ? dashboardData.profile.positions.map(p => typeof p === 'object' ? p.name : p)
    : [],
  verified: dashboardData.profile.isVerified || false,
  phone: dashboardData.profile.phone || '',
  ageRange: dashboardData.profile.ageRange || '',
  yearsExperience: dashboardData.profile.yearsExperience || '',
  cvFileName: dashboardData.profile.cvFileName || '',
  cvUpdatedAt: dashboardData.profile.cvUpdatedAt || '',
  memberSince: dashboardData.profile.createdAt ? new Date(dashboardData.profile.createdAt).getFullYear() : new Date().getFullYear(),
  totalReviews: dashboardData.profile.totalReviews || 0,
  subscriptionActive: dashboardData.profile.subscriptionActive || dashboardData.profile.subscriptionStatus === 'active',
  nextBillingDate: dashboardData.profile.subscriptionEndDate ? new Date(dashboardData.profile.subscriptionEndDate).toLocaleDateString() : '',
  earningsYtd: dashboardData.profile.earningsYtd || 0,
} : {
  name: user?.name || 'Consultant',
  title: 'Strategic Consultant',
  location: 'Remote',
  rating: 0,
  completedProjects: 0,
  matchesCount: 0,
  hourlyRate: 'Rate not set',
  expertise: [],
  verified: false,
  phone: '',
  ageRange: '',
  yearsExperience: '',
  cvFileName: '',
  cvUpdatedAt: '',
  memberSince: new Date().getFullYear(),
  totalReviews: 0,
  subscriptionActive: false,
  nextBillingDate: '',
  earningsYtd: 0,
};

  const activeMatches = Array.isArray(dashboardData.matches) 
    ? dashboardData.matches.map(match => ({
        id: match?._id || match?.id,
        client: typeof match?.companyName === 'object' ? match.companyName?.name : (match?.companyName || 'Client'),
        project: match?.requestTitle || match?.title || 'Project',
        duration: match?.duration || '3 months',
        startDate: match?.startDate ? new Date(match.startDate).toLocaleDateString() : 'TBD',
        status: match?.adminReviewStatus || match?.status || 'Pending'
      }))
    : [];

  const stats = [
    { icon: <Users className="w-6 h-6 text-white" />, label: 'Profile Views', value: dashboardData.stats.profileViews.toLocaleString(), color: 'bg-blue-500' },
    { icon: <LinkIcon className="w-6 h-6 text-white" />, label: 'Matches', value: dashboardData.stats.matchRequests.toString(), color: 'bg-green-500' },
    { icon: <Calendar className="w-6 h-6 text-white" />, label: 'Interviews', value: dashboardData.stats.interviews.toString(), color: 'bg-purple-500' },
    { icon: <DollarSign className="w-6 h-6 text-white" />, label: 'YTD Earnings', value: `€${(dashboardData.stats.earnings / 1000).toFixed(1)}k`, color: 'bg-orange-500' }
  ];

  // Profile dropdown menu items
  const profileMenuItems = [
    { label: 'My Profile', icon: <UserCircle size={16} />, action: 'profile' },
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
          <ProfileCompletionModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            initialStep={modalStep}
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
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">ConsultantHub</h1>
              </button>

              <div className="hidden lg:flex items-center gap-1">
                <MegaDropdown
                  trigger={
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                      <Menu size={18} />
                      <span>Menu</span>
                      <ChevronDown size={14} />
                    </button>
                  }
                  categories={navigationCategories}
                  onCategoryClick={handleHeroAction}
                />

                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setActiveTab('matches')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'matches' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Opportunities
                </button>
              </div>

              <div className="flex items-center gap-3">
                <SmartNotifications onNotificationClick={(notification) => {
                  console.log('Notification clicked:', notification);
                  if (notification.type === 'match') setActiveTab('matches');
                  if (notification.type === 'meeting') setActiveTab('calendar');
                }} />

                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{profile.rating}</span>
                </div>

                <DropdownMenu
                  trigger={
                    <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {profile.name.charAt(0)}
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

        {/* Hero Section with Availability Form */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Message */}
            <div className="mb-5">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Welcome back, {profile.name.split(' ')[0]}!
              </h2>
              <p className="text-blue-200 mt-1">Manage your availability and track consulting opportunities</p>
            </div>

            {/* Availability Form - Always Visible */}
            <HeroAvailabilityForm onSave={handleUpdateAvailability} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Completion Banner */}
          <ProfileCompletionBanner 
            profileCompletion={profileCompletion} 
            onComplete={(step) => {
              setModalStep(step);
              setShowProfileModal(true);
            }}
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
                      <h3 className="text-xl font-semibold text-gray-900">Recent Opportunities</h3>
                      <button onClick={() => setActiveTab('matches')} className="text-blue-600 text-sm">View all →</button>
                    </div>
                    {activeMatches.length > 0 ? (
                      <div className="space-y-3">
                        {activeMatches.slice(0, 3).map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No opportunities yet</p>
                      </div>
                    )}
                  </div>

                  {/* Agenda Widget takes full width in overview */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Agenda</h3>
                    <AgendaWidget
                      userId={user?.email}
                      userType="consultant"
                      BACKEND_URL={BACKEND_URL}
                      compact={false}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                        {profile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{profile.name}</h3>
                        <p className="text-blue-200 text-sm">{profile.title}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Rating</span><span>⭐ {profile.rating}</span></div>
                      <div className="flex justify-between"><span>Projects</span><span>{profile.completedProjects} completed</span></div>
                      <div className="flex justify-between"><span>Hourly Rate</span><span>{profile.hourlyRate}</span></div>
                    </div>
                    <button onClick={() => setActiveTab('profile')} className="w-full mt-4 bg-white/20 hover:bg-white/30 rounded-xl py-2 text-sm font-medium transition">
                      View Full Profile →
                    </button>
                  </div>

                  <RecentActivity />
                </div>
              </div>
            </>
          )}

          {/* Calendar Tab - Collapsible Calendar as Row */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* Collapsible Calendar - Shows as row by default */}
              <CollapsibleCalendar
                availabilityData={availabilityList}
                onUpdateAvailability={handleUpdateAvailability}
                onDateClick={handleDateClick}
              />

              {/* Agenda Widget */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Schedule</h2>
                <AgendaWidget
                  userId={user?.email}
                  userType="consultant"
                  BACKEND_URL={BACKEND_URL}
                  compact={false}
                />
              </div>
            </div>
          )}

          {/* Matches Tab */}
          {activeTab === 'matches' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Matches</h2>
              {activeMatches.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {activeMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
                  <p className="text-gray-500">Complete your profile to get matched with projects</p>
                </div>
              )}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Projects</h2>
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active projects yet</p>
                <p className="text-sm text-gray-400 mt-1">Projects will appear here once you're matched</p>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No messages yet</p>
                <p className="text-sm text-gray-400 mt-1">Messages will appear here when you connect with clients</p>
              </div>
            </div>
          )}

         {/* Profile Tab */}
{activeTab === 'profile' && (
  <div className="space-y-6">
    {/* Profile Header */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
            <p className="text-blue-200">{profile.title}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-blue-200">
              <span>⭐ {profile.rating}</span>
              <span>•</span>
              <span>{profile.completedProjects} projects</span>
            </div>
          </div>
          <button 
            onClick={() => { setModalStep('basic'); setShowProfileModal(true); }} 
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white transition flex items-center gap-2"
          >
            <Settings size={16} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>

    {/* Main Profile Content Grid */}
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Personal Information */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Full Name</label>
              <p className="font-medium text-gray-900 mt-1">{profile.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Email Address</label>
              <p className="font-medium text-gray-900 mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</label>
              <p className="font-medium text-gray-900 mt-1">{profile.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Age Range</label>
              <p className="font-medium text-gray-900 mt-1">{profile.ageRange || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Location</label>
              <p className="font-medium text-gray-900 mt-1 flex items-center gap-1">
                <MapPin size={14} className="text-gray-400" /> 
                {profile.location}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Years of Experience</label>
              <p className="font-medium text-gray-900 mt-1">{profile.yearsExperience || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Expertise Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-blue-600" />
            Areas of Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.expertise && profile.expertise.length > 0 ? (
              profile.expertise.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No expertise added yet</p>
            )}
          </div>
        </div>

        {/* CV Upload Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Curriculum Vitae (CV)
          </h3>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <FileText size={24} className="text-red-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {profile.cvFileName || 'No CV uploaded'}
                </p>
                <p className="text-xs text-gray-500">
                  {profile.cvFileName ? 'Last updated: ' + (profile.cvUpdatedAt || 'Recently') : 'Upload your CV to get better matches'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('cv-upload-profile').click()}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              <Upload size={16} />
              Upload New CV
            </button>
            <input
              id="cv-upload-profile"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
             onChange={async (e) => {
  const file = e.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('email', user.email);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/consultant/upload-cv`, {
        method: 'POST',
        headers: { 
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        // Refresh profile data to show updated CV
        fetchDashboardData();
        // Show success message
        alert('CV uploaded successfully!');
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    }
  }
}}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Account & Payment */}
      <div className="space-y-6">
        {/* Account Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            Account Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Profile Status</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${profileCompletion.status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {profileCompletion.status === 'complete' ? 'Complete' : 'Incomplete'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Verification</span>
              <span className={`text-sm font-medium flex items-center gap-1 ${profile.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                {profile.verified ? (
                  <>
                    <CheckCircle size={14} />
                    Verified
                  </>
                ) : (
                  'Pending Verification'
                )}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="text-sm font-medium text-gray-900">{profile.memberSince || '2024'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Rating</span>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="font-medium text-gray-900">{profile.rating}</span>
                <span className="text-xs text-gray-400">({profile.totalReviews || 0} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Subscription Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard size={20} className="text-blue-600" />
            Subscription & Payment
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Subscription Plan</span>
              <span className="text-sm font-medium text-blue-600">Consultant Pro • €99/year</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Subscription Status</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${profile.subscriptionActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {profile.subscriptionActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Next Billing Date</span>
              <span className="text-sm font-medium text-gray-900">{profile.nextBillingDate || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Hourly Rate</span>
              <span className="text-lg font-bold text-green-600">{profile.hourlyRate}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            {!profile.subscriptionActive && (
              <button 
                onClick={() => { setModalStep('payment'); setShowProfileModal(true); }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <CreditCard size={16} />
                Activate Subscription
              </button>
            )}
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Download size={16} />
              Download Invoice History
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Profile Views</span>
              <span className="text-2xl font-bold">{dashboardData.stats.profileViews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Matches Received</span>
              <span className="text-2xl font-bold">{dashboardData.stats.matchRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Interviews Scheduled</span>
              <span className="text-2xl font-bold">{dashboardData.stats.interviews}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-700">
              <span className="text-blue-200">YTD Earnings</span>
              <span className="text-2xl font-bold">{dashboardData.stats.earnings.toLocaleString()}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No documents uploaded yet</p>
                <p className="text-sm text-gray-400 mt-1">Upload contracts, invoices, and other documents here</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Upload Document</button>
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
                    <p className="text-blue-200">Get help with your account, projects, or technical issues</p>
                  </div>
                  <button onClick={() => setIsSupportModalOpen(true)} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    Contact Support
                  </button>
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
                    <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked /><span className="text-gray-700">Email notifications for messages</span></label>
                    <label className="flex items-center gap-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" /><span className="text-gray-700">Weekly summary emails</span></label>
                  </div>
                </div>
                <div className="pt-4 border-t"><button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Delete Account</button></div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Footer */}
        <Footer />

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ErrorBoundary>
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

export default ConsultantDashboard;