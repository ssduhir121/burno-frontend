
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
//   Paperclip,
//   X,
//   ChevronRight,
//   Mail,
//   Phone,
//   LifeBuoy,
//   Ticket
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import ContactSupportModal from '../../components/modals/ContactSupportModal';
// import AvailabilityCalendar from '../../components/AvailabilityCalendar';
// import AgendaWidget from '../../components/AgendaWidget';

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
// const TicketDetailsModal = ({ ticket, onClose, onReply, BACKEND_URL }) => {
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
//             {/* Ticket Header */}
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

//             {/* Original Message */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-medium text-gray-900">Your Message</span>
//                 <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
//             </div>

//             {/* Replies */}
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

//             {/* Reply Form */}
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
//   const { user, logout, profileCompletion, BACKEND_URL } = useAuth();
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

//   // Debug: Log profile completion on mount
//   useEffect(() => {
//     console.log('🔍 Dashboard mounted');
//     console.log('User:', user);
//     console.log('Profile Completion from context:', profileCompletion);
//     console.log('localStorage:', {
//       profile_setup_complete: localStorage.getItem('profile_setup_complete'),
//       subscription_complete: localStorage.getItem('subscription_complete'),
//       profile_completion: localStorage.getItem('profile_completion')
//     });

//     // Check if we should be here based on profile completion
//     const basicComplete = profileCompletion.basicInfo || localStorage.getItem('profile_setup_complete') === 'basic' || localStorage.getItem('profile_setup_complete') === 'availability';
//     const availabilityComplete = profileCompletion.availability || localStorage.getItem('profile_setup_complete') === 'availability';
//     const paymentComplete = profileCompletion.payment || localStorage.getItem('subscription_complete') === 'true';

//     console.log('Completion check:', { basicComplete, availabilityComplete, paymentComplete });

//     if (!basicComplete) {
//       console.log('⚠️ Basic info not complete, redirecting to profile setup');
//       navigate('/consultant/profile-setup?step=basic');
//     } else if (!availabilityComplete) {
//       console.log('⚠️ Availability not complete, redirecting to availability setup');
//       navigate('/consultant/profile-setup?step=availability');
//     } else if (!paymentComplete) {
//       console.log('⚠️ Payment not complete, redirecting to subscription');
//       navigate('/consultant/subscription');
//     } else {
//       console.log('✅ All checks passed, loading dashboard');
//     }
//   }, [user, profileCompletion, navigate]);

//   // Fetch support tickets
//   const fetchSupportTickets = async () => {
//     if (!user?.email) return;
    
//     try {
//       setSupportLoading(true);
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/user/support-requests/${encodeURIComponent(user.email)}`, {
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
//       setLoading(true);
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(
//         `${BACKEND_URL}/api/user/support-requests/${encodeURIComponent(user.email)}/${ticket.ticketId}`,
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
//     } finally {
//       setLoading(false);
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
//         // Refresh ticket details
//         if (selectedTicket) {
//           await fetchTicketDetails(selectedTicket);
//         }
//         // Refresh tickets list
//         await fetchSupportTickets();
//       }
//     } catch (err) {
//       console.error('Error submitting reply:', err);
//     }
//   };

//   // Handle availability change
//   const handleAvailabilityChange = (date, status, timeRange) => {
//     console.log('Availability updated:', { date, status, timeRange });
//     // You can add additional logic here if needed
//     // For example, update local state or trigger other actions
//     setAvailabilityData(prev => ({
//       ...prev,
//       [date.toISOString().split('T')[0]]: { status, timeRange }
//     }));
//   };

//   // Fetch real dashboard data from backend
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
//         console.log('Fetching dashboard data for:', user.email);
        
//         const response = await fetch(`${BACKEND_URL}/api/user/dashboard/${encodeURIComponent(user.email)}`, {
//           headers: {
//             'Authorization': token ? `Bearer ${token}` : '',
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Dashboard data received:', result);

//         if (result.success && result.data) {
//           // Safely extract data with fallbacks
//           const profile = result.data.profile || {};
//           const matches = Array.isArray(result.data.matches) ? result.data.matches : [];
          
//           setDashboardData({
//             profile: profile,
//             matches: matches,
//             stats: {
//               profileViews: profile.profile_views || 0,
//               matchRequests: matches.length || 0,
//               interviews: matches.filter(m => m?.admin_review_status === 'interview_scheduled').length || 0,
//               earnings: profile.earnings_ytd || 0
//             }
//           });

//           // Load availability data if exists
//           if (profile.availability) {
//             setAvailabilityData(profile.availability);
//           }

//           // Fetch support tickets after dashboard data
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

//     // Only fetch if user exists and completion checks pass
//     if (user?.email) {
//       fetchDashboardData();
//     }
//   }, [user, BACKEND_URL]);

//   // Safe data access with fallbacks
//   const profile = dashboardData.profile ? {
//     name: dashboardData.profile.full_name || user?.name || 'Consultant',
//     title: dashboardData.profile.title || 'Senior Consultant',
//     location: dashboardData.profile.base_city && dashboardData.profile.base_country 
//       ? `${dashboardData.profile.base_city}, ${dashboardData.profile.base_country}`
//       : 'Location not set',
//     availability: dashboardData.profile.availability || 'Availability not set',
//     rating: dashboardData.profile.rating || 0,
//     completedProjects: dashboardData.profile.completed_projects || 0,
//     hourlyRate: dashboardData.profile.hourly_rate 
//       ? `€${dashboardData.profile.hourly_rate}` 
//       : 'Rate not set',
//     expertise: Array.isArray(dashboardData.profile.positions) 
//       ? dashboardData.profile.positions 
//       : (typeof dashboardData.profile.positions === 'string' 
//           ? dashboardData.profile.positions.split(',').map(s => s.trim()) 
//           : []),
//     verified: dashboardData.profile.is_verified || false,
//     subscription_status: dashboardData.profile.subscription_status || 'inactive'
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
//     subscription_status: 'inactive'
//   };

//   // Safe matches array
//   const activeMatches = Array.isArray(dashboardData.matches) 
//     ? dashboardData.matches.map(match => ({
//         id: match?.id || Math.random(),
//         client: match?.company_name || 'Client',
//         project: match?.request_title || 'Project',
//         duration: match?.duration || 'Duration TBD',
//         startDate: match?.start_date || new Date().toISOString().split('T')[0],
//         status: match?.admin_review_status || 'pending'
//       }))
//     : [];

//   // Stats with safe values
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
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'interview_scheduled': return 'bg-blue-100 text-blue-800';
//       case 'accepted': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (status) => {
//     switch(status) {
//       case 'pending': return 'Pending Acceptance';
//       case 'interview_scheduled': return 'Interview Scheduled';
//       case 'accepted': return 'Accepted';
//       case 'rejected': return 'Declined';
//       default: return status?.replace('_', ' ') || 'Unknown';
//     }
//   };

//   const handleCompleteProfile = () => {
//     navigate('/consultant/profile-setup');
//   };

//   const handleViewMatch = (matchId) => {
//     // Navigate to match details
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
//             BACKEND_URL={BACKEND_URL}
//           />
//         )}

//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-gray-600 bg-opacity-10 z-20 lg:hidden"
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
//                   <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
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
//               {profile.subscription_status !== 'active' && (
//                 <div className="mt-3 bg-yellow-500/20 text-yellow-200 text-xs p-2 rounded-lg">
//                   Subscription {profile.subscription_status}
//                 </div>
//               )}
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-2 py-4 space-y-1">
//               {[
//                 { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
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

//                 {/* Profile Completion - Only show if profile incomplete */}
//                 {!dashboardData.profile && (
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//                     <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Profile</h2>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                       <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600">30% complete - Finish setting up your profile to get matches</span>
//                       <button 
//                         onClick={handleCompleteProfile}
//                         className="text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         Complete Profile →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Availability Calendar and Agenda Widget */}
//                 <div className="grid lg:grid-cols-2 gap-6 mb-8">
//                   {/* Availability Calendar */}
//                   <AvailabilityCalendar
//                     userId={user?.email}
//                     userType="consultant"
//                     BACKEND_URL={BACKEND_URL}
//                     onAvailabilityChange={handleAvailabilityChange}
//                   />
                  
//                   {/* Agenda Widget */}
//                   <AgendaWidget
//                     userId={user?.email}
//                     userType="consultant"
//                     BACKEND_URL={BACKEND_URL}
//                   />
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
//                           <div key={match.id} className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:shadow-md transition cursor-pointer"
//                                onClick={() => handleViewMatch(match.id)}>
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

//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900">Professional Profile</h2>
//                   <button 
//                     onClick={handleCompleteProfile}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Personal Information</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm text-gray-500">Full Name</label>
//                         <p className="font-medium text-gray-900">{profile.name}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-500">Professional Title</label>
//                         <p className="font-medium text-gray-900">{profile.title}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-500">Location</label>
//                         <p className="font-medium text-gray-900 flex items-center">
//                           <MapPin className="w-4 h-4 mr-1 text-gray-400" />
//                           {profile.location}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-500">Email</label>
//                         <p className="font-medium text-gray-900">{user?.email || 'Not provided'}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-4 pb-2 border-b">Professional Details</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm text-gray-500">Hourly Rate</label>
//                         <p className="font-medium text-gray-900">{profile.hourlyRate}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-500">Completed Projects</label>
//                         <p className="font-medium text-gray-900">{profile.completedProjects}</p>
//                       </div>
//                       <div>
//                         <label className="text-sm text-gray-500">Availability</label>
//                         <p className="font-medium text-gray-900 flex items-center">
//                           <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                           {profile.availability}
//                         </p>
//                       </div>
//                       {profile.expertise.length > 0 && (
//                         <div>
//                           <label className="text-sm text-gray-500">Expertise</label>
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {profile.expertise.map((skill, index) => (
//                               <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                                 {skill}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex items-center pt-2">
//                         {profile.verified && (
//                           <>
//                             <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                             <span className="text-sm text-green-700">Verified Consultant</span>
//                           </>
//                         )}
//                         {profile.subscription_status === 'active' && (
//                           <span className="ml-4 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
//                             Subscription Active
//                           </span>
//                         )}
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
//                           <div>
//                             <h3 className="font-semibold text-gray-900">{match.client}</h3>
//                             <p className="text-gray-600">{match.project}</p>
//                           </div>
//                           <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(match.status)}`}>
//                             {getStatusText(match.status)}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center space-x-4 text-gray-500">
//                             <span className="flex items-center">
//                               <Clock className="w-4 h-4 mr-1" />
//                               {match.duration}
//                             </span>
//                             <span className="flex items-center">
//                               <Calendar className="w-4 h-4 mr-1" />
//                               {new Date(match.startDate).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <button 
//                             onClick={() => handleViewMatch(match.id)}
//                             className="text-blue-600 hover:text-blue-700 font-medium"
//                           >
//                             View Details →
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <LinkIcon className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
//                     <p className="text-gray-500">Complete your profile to get matched with relevant projects</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Support Tab */}
//             {activeTab === 'support' && (
//               <div className="space-y-6">
//                 {/* Support Header */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
//                       <p className="text-gray-600 mt-1">Get help with your account, projects, or technical issues</p>
//                     </div>
//                     <button
//                       onClick={() => setIsSupportModalOpen(true)}
//                       className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center"
//                     >
//                       <HelpCircle className="w-5 h-5 mr-2" />
//                       Contact Support
//                     </button>
//                   </div>
//                 </div>

//                 {/* Quick Support Options */}
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
//                       <Mail className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
//                     <p className="text-sm text-gray-600 mb-3">support@webconsultanthub.com</p>
//                     <p className="text-xs text-gray-500">Reply within 24 hours</p>
//                   </div>

//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
//                       <MessageSquare className="w-6 h-6 text-green-600" />
//                     </div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
//                     <p className="text-sm text-gray-600 mb-3">Chat with support team</p>
//                     <p className="text-xs text-gray-500">Available 24/7</p>
//                   </div>

//                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
//                     <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
//                       <FileText className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
//                     <p className="text-sm text-gray-600 mb-3">Browse knowledge base</p>
//                     <p className="text-xs text-gray-500">Self-service resources</p>
//                   </div>
//                 </div>

//                 {/* Support Tickets */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
                  
//                   {supportLoading ? (
//                     <div className="flex justify-center py-8">
//                       <Loader className="w-8 h-8 animate-spin text-blue-600" />
//                     </div>
//                   ) : supportTickets.length > 0 ? (
//                     <div className="space-y-4">
//                       {supportTickets.map((ticket) => (
//                         <SupportTicket
//                           key={ticket._id}
//                           ticket={ticket}
//                           onViewDetails={fetchTicketDetails}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Ticket className="w-8 h-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
//                       <p className="text-gray-500 mb-4">You haven't created any support tickets yet</p>
//                       <button
//                         onClick={() => setIsSupportModalOpen(true)}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
//                       >
//                         Create Support Ticket
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Projects Tab */}
//             {activeTab === 'projects' && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">My Projects</h2>
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Briefcase className="w-10 h-10 text-gray-400" />
//                   </div>
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
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <MessageSquare className="w-10 h-10 text-gray-400" />
//                   </div>
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
//                   <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FileText className="w-10 h-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
//                   <p className="text-gray-500">Upload contracts, invoices, and other documents here</p>
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
//                       <label className="flex items-center">
//                         <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                         <span className="ml-2 text-gray-700">Email notifications for new matches</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                         <span className="ml-2 text-gray-700">Email notifications for messages</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                         <span className="ml-2 text-gray-700">Weekly summary emails</span>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center">
//                         <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                         <span className="ml-2 text-gray-700">Make my profile visible to clients</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//                         <span className="ml-2 text-gray-700">Show my availability status</span>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div className="pt-4 border-t border-gray-200">
//                     <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
//                       Delete Account
//                     </button>
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

// export default ConsultantDashboard;




// src/page/consultant/Dashboard.jsx (Updated with Calendar & Agenda Tab)

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
  Loader,
  HelpCircle,
  Send,
  Paperclip,
  X,
  ChevronRight,
  Mail,
  Phone,
  LifeBuoy,
  Ticket,
  Grid,
  List
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactSupportModal from '../../components/modals/ContactSupportModal';
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

// Support Ticket Component (same as before)
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

// Ticket Details Modal (same as before)
const TicketDetailsModal = ({ ticket, onClose, onReply, BACKEND_URL }) => {
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
            {/* Ticket Header */}
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

            {/* Original Message */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Your Message</span>
                <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
            </div>

            {/* Replies */}
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

            {/* Reply Form */}
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

const ConsultantDashboard = () => {
  const { user, logout, profileCompletion, BACKEND_URL } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [availabilityData, setAvailabilityData] = useState({});
  const [calendarView, setCalendarView] = useState('full'); // 'full' or 'compact'
  
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

  // Debug: Log profile completion on mount
  useEffect(() => {
    console.log('🔍 Dashboard mounted');
    console.log('User:', user);
    console.log('Profile Completion from context:', profileCompletion);
    console.log('localStorage:', {
      profile_setup_complete: localStorage.getItem('profile_setup_complete'),
      subscription_complete: localStorage.getItem('subscription_complete'),
      profile_completion: localStorage.getItem('profile_completion')
    });

    // Check if we should be here based on profile completion
    const basicComplete = profileCompletion.basicInfo || localStorage.getItem('profile_setup_complete') === 'basic' || localStorage.getItem('profile_setup_complete') === 'availability';
    const availabilityComplete = profileCompletion.availability || localStorage.getItem('profile_setup_complete') === 'availability';
    const paymentComplete = profileCompletion.payment || localStorage.getItem('subscription_complete') === 'true';

    console.log('Completion check:', { basicComplete, availabilityComplete, paymentComplete });

    if (!basicComplete) {
      console.log('⚠️ Basic info not complete, redirecting to profile setup');
      navigate('/consultant/profile-setup?step=basic');
    } else if (!availabilityComplete) {
      console.log('⚠️ Availability not complete, redirecting to availability setup');
      navigate('/consultant/profile-setup?step=availability');
    } else if (!paymentComplete) {
      console.log('⚠️ Payment not complete, redirecting to subscription');
      navigate('/consultant/subscription');
    } else {
      console.log('✅ All checks passed, loading dashboard');
    }
  }, [user, profileCompletion, navigate]);

  // Fetch support tickets
  const fetchSupportTickets = async () => {
    if (!user?.email) return;
    
    try {
      setSupportLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/user/support-requests/${encodeURIComponent(user.email)}`, {
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
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `${BACKEND_URL}/api/user/support-requests/${encodeURIComponent(user.email)}/${ticket.ticketId}`,
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
    } finally {
      setLoading(false);
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

  // Handle availability change
  const handleAvailabilityChange = (date, status, timeRange) => {
    console.log('Availability updated:', { date, status, timeRange });
    setAvailabilityData(prev => ({
      ...prev,
      [date.toISOString().split('T')[0]]: { status, timeRange }
    }));
  };

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
        console.log('Fetching dashboard data for:', user.email);
        
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
        console.log('Dashboard data received:', result);

        if (result.success && result.data) {
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

          if (profile.availability) {
            setAvailabilityData(profile.availability);
          }

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

    if (user?.email) {
      fetchDashboardData();
    }
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
            BACKEND_URL={BACKEND_URL}
          />
        )}

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-10 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="px-4 py-6 border-b border-blue-700">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg">
                  <img src="/logo.png" alt="Logo" className="h-20 object-contain" />
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
                { id: 'calendar', label: 'Calendar & Agenda', icon: <Calendar className="w-5 h-5" /> },
                { id: 'matches', label: 'My Matches', icon: <LinkIcon className="w-5 h-5" /> },
                { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
                { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
                { id: 'support', label: 'Support', icon: <LifeBuoy className="w-5 h-5" /> },
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
                  <button
                    onClick={() => setIsSupportModalOpen(true)}
                    className="p-2 text-gray-400 hover:text-gray-600 relative group"
                    title="Contact Support"
                  >
                    <HelpCircle className="w-6 h-6" />
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

                {/* Quick Calendar Preview */}
                <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Schedule View</h2>
                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Full Calendar →
                    </button>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <AvailabilityCalendar
                      userId={user?.email}
                      userType="consultant"
                      BACKEND_URL={BACKEND_URL}
                      onAvailabilityChange={handleAvailabilityChange}
                      compact={true}
                    />
                    <AgendaWidget
                      userId={user?.email}
                      userType="consultant"
                      BACKEND_URL={BACKEND_URL}
                      compact={true}
                    />
                  </div>
                </div>

                {/* Profile Completion */}
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

                  {/* Support Tickets Preview */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
                      <button 
                        onClick={() => setActiveTab('support')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-6">
                      {supportLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader className="w-6 h-6 animate-spin text-blue-600" />
                        </div>
                      ) : supportTickets.length > 0 ? (
                        <div className="space-y-3">
                          {supportTickets.slice(0, 2).map((ticket) => (
                            <div
                              key={ticket._id}
                              onClick={() => fetchTicketDetails(ticket)}
                              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-mono text-blue-600">{ticket.ticketId}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${
                                  ticket.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                                  ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {ticket.status}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(ticket.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Ticket className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 text-sm mb-2">No support tickets</p>
                          <button
                            onClick={() => setIsSupportModalOpen(true)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Contact Support →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* NEW: Calendar & Agenda Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Calendar & Agenda</h1>
                    <p className="text-gray-600 mt-1">Manage your availability and view upcoming engagements</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCalendarView('full')}
                      className={`p-2 rounded-lg transition ${
                        calendarView === 'full' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Full View"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCalendarView('compact')}
                      className={`p-2 rounded-lg transition ${
                        calendarView === 'compact' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title="Compact View"
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Calendar and Agenda Layout */}
                <div className={`grid ${calendarView === 'full' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                  {/* Calendar Section */}
                  <div className={calendarView === 'full' ? 'lg:col-span-2' : 'lg:col-span-1'}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Availability Calendar
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Click on any date to mark your availability. Green dates show when you're available for new projects.
                      </p>
                      <AvailabilityCalendar
                        userId={user?.email}
                        userType="consultant"
                        BACKEND_URL={BACKEND_URL}
                        onAvailabilityChange={handleAvailabilityChange}
                        compact={calendarView === 'compact'}
                      />
                    </div>
                  </div>

                  {/* Agenda Widget Section */}
                  <div className={calendarView === 'full' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                    <AgendaWidget
                      userId={user?.email}
                      userType="consultant"
                      BACKEND_URL={BACKEND_URL}
                      compact={calendarView === 'compact'}
                    />
                  </div>
                </div>

                {/* Upcoming Deadlines Section (Optional) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    Upcoming Deadlines
                  </h2>
                  <div className="text-center py-8 text-gray-500">
                    <p>No upcoming deadlines</p>
                    <p className="text-sm mt-1">Deadlines from your active projects will appear here</p>
                  </div>
                </div>

                {/* Availability Tips */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Availability Tips
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mark your availability at least 2 weeks in advance to get better matches</li>
                    <li>• Update your calendar regularly to reflect your current availability</li>
                    <li>• Set specific time ranges to help clients schedule meetings</li>
                    <li>• Mark days as "Busy" when you're on active projects</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Professional Profile</h2>
                  <button 
                    onClick={handleCompleteProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
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
                          <button 
                            onClick={() => handleViewMatch(match.id)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
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

            {/* Support Tab */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                {/* Support Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
                      <p className="text-gray-600 mt-1">Get help with your account, projects, or technical issues</p>
                    </div>
                    <button
                      onClick={() => setIsSupportModalOpen(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center"
                    >
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Contact Support
                    </button>
                  </div>
                </div>

                {/* Quick Support Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-3">support@webconsultanthub.com</p>
                    <p className="text-xs text-gray-500">Reply within 24 hours</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600 mb-3">Chat with support team</p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                    <p className="text-sm text-gray-600 mb-3">Browse knowledge base</p>
                    <p className="text-xs text-gray-500">Self-service resources</p>
                  </div>
                </div>

                {/* Support Tickets */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
                  
                  {supportLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : supportTickets.length > 0 ? (
                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <SupportTicket
                          key={ticket._id}
                          ticket={ticket}
                          onViewDetails={fetchTicketDetails}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
                      <p className="text-gray-500 mb-4">You haven't created any support tickets yet</p>
                      <button
                        onClick={() => setIsSupportModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Create Support Ticket
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Projects</h2>
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-500">Projects will appear here once you're matched and accepted</p>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Messages</h2>
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-500">Messages will appear here when you connect with clients</p>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Documents</h2>
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                  <p className="text-gray-500">Upload contracts, invoices, and other documents here</p>
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
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Email notifications for new matches</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Email notifications for messages</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Weekly summary emails</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Make my profile visible to clients</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">Show my availability status</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ConsultantDashboard;