

// // src/components/AvailabilityCalendar.jsx
// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, ChevronLeft, ChevronRight, X, Save, Loader, AlertCircle, User, Briefcase } from 'lucide-react';

// const AvailabilityCalendar = ({ 
//   userId, 
//   userType, // 'consultant', 'client', or 'admin'
//   onAvailabilityChange, 
//   readOnly = false,
//   compact = false,
//   showAgenda = false,
//   BACKEND_URL 
// }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availability, setAvailability] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [availabilityType, setAvailabilityType] = useState('available');
//   const [timeRange, setTimeRange] = useState({ start: '09:00', end: '17:00' });
//   const [agendaItems, setAgendaItems] = useState([]);

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//     return { daysInMonth, firstDayOfMonth };
//   };

//   // Fetch availability data
//   const fetchAvailability = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('auth_token');
//       const url = `${BACKEND_URL}/api/availability/${userType}/${encodeURIComponent(userId)}?months=6`;
//       console.log('📅 Fetching availability from:', url);
      
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await response.json();
//       console.log('📊 Availability data received:', data);
      
//       if (data.success) {
//         setAvailability(data.availability || {});
//         console.log('✅ Availability keys:', Object.keys(data.availability || {}));
//         if (showAgenda) {
//           setAgendaItems(data.agenda || []);
//         }
//       } else {
//         console.error('❌ Failed to fetch availability:', data.error);
//       }
//     } catch (err) {
//       console.error('❌ Error fetching availability:', err);
//       setError('Failed to load availability data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save availability for a date
//   const saveAvailability = async () => {
//     if (!selectedDate) return;
    
//     try {
//       setSaving(true);
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`${BACKEND_URL}/api/availability/save`, {
//         method: 'POST',
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : '',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           userId,
//           userType,
//           date: selectedDate.toISOString().split('T')[0],
//           status: availabilityType,
//           timeRange: availabilityType === 'available' ? timeRange : null
//         })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         const dateKey = selectedDate.toISOString().split('T')[0];
//         setAvailability(prev => ({
//           ...prev,
//           [dateKey]: {
//             status: availabilityType,
//             timeRange: availabilityType === 'available' ? timeRange : null
//           }
//         }));
        
//         console.log('✅ Availability saved for:', dateKey, availabilityType);
        
//         if (onAvailabilityChange) {
//           onAvailabilityChange(selectedDate, availabilityType, timeRange);
//         }
        
//         setShowModal(false);
//       } else {
//         setError(data.error || 'Failed to save availability');
//       }
//     } catch (err) {
//       console.error('❌ Error saving availability:', err);
//       setError('Network error while saving');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDateClick = (date) => {
//     if (readOnly) return;
    
//     const dateKey = date.toISOString().split('T')[0];
//     const existing = availability[dateKey];
    
//     setSelectedDate(date);
//     if (existing) {
//       setAvailabilityType(existing.status);
//       if (existing.timeRange) {
//         setTimeRange(existing.timeRange);
//       }
//     } else {
//       setAvailabilityType('available');
//       setTimeRange({ start: '09:00', end: '17:00' });
//     }
//     setShowModal(true);
//   };

// // In AvailabilityCalendar.jsx, update the getDateStatus function
// const getDateStatus = (date) => {
//   // Create a date key using local date
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const dateKey = `${year}-${month}-${day}`;
  
//   const status = availability[dateKey]?.status;
  
//   // Debug log for specific dates
//   if (dateKey === '2026-03-20' || dateKey === '2026-03-21' || dateKey === '2026-03-23' || dateKey === '2026-03-25') {
//     console.log(`📅 Date ${dateKey} status:`, status);
//   }
  
//   switch(status) {
//     case 'available':
//       return 'bg-green-100 text-green-800 border-green-300';
//     case 'unavailable':
//       return 'bg-red-100 text-red-800 border-red-300';
//     case 'busy':
//       return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//     default:
//       return 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
//   }
// };

//   const getAgendaForDate = (date) => {
//     const dateKey = date.toISOString().split('T')[0];
//     return agendaItems.find(item => item.date === dateKey);
//   };

//   const renderCalendar = () => {
//     const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
//     const days = [];
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     // Add empty cells for days before month starts
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>);
//     }
    
//     // Add days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//       const isPast = date < today;
//       const statusClass = getDateStatus(date);
//       const agenda = getAgendaForDate(date);
//       const dateKey = date.toISOString().split('T')[0];
//       const hasAvailability = availability[dateKey];
      
//       days.push(
//         <div
//           key={day}
//           onClick={() => !isPast && !readOnly && handleDateClick(date)}
//           className={`min-h-24 p-2 border border-gray-200 transition ${!isPast && !readOnly ? 'cursor-pointer hover:shadow-md' : ''} ${isPast ? 'bg-gray-100 opacity-50' : statusClass}`}
//         >
//           <div className="flex justify-between items-start">
//             <span className={`text-sm font-medium ${isPast ? 'text-gray-400' : 'text-gray-700'}`}>
//               {day}
//             </span>
//             {agenda && !compact && (
//               <div className="flex items-center text-xs text-blue-600">
//                 <Briefcase className="w-3 h-3 mr-1" />
//                 {agenda.title}
//               </div>
//             )}
//           </div>
          
//           {!compact && hasAvailability?.timeRange && hasAvailability.status === 'available' && (
//             <div className="mt-1 text-xs text-gray-500 flex items-center">
//               <Clock className="w-3 h-3 mr-1" />
//               {hasAvailability.timeRange.start} - {hasAvailability.timeRange.end}
//             </div>
//           )}
          
//           {!compact && hasAvailability && hasAvailability.status !== 'available' && (
//             <div className="mt-1 text-xs text-gray-500">
//               {hasAvailability.status === 'busy' ? 'Busy' : 'Unavailable'}
//             </div>
//           )}
          
//           {agenda && compact && (
//             <div className="mt-1 text-xs text-blue-600 truncate">
//               {agenda.title}
//             </div>
//           )}
//         </div>
//       );
//     }
    
//     return days;
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchAvailability();
//     }
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-8">
//         <Loader className="w-8 h-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//       {/* Calendar Header */}
//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-gray-900">
//           {!compact ? 'Availability Calendar' : 'My Schedule'}
//         </h3>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               newDate.setMonth(newDate.getMonth() - 1);
//               setCurrentDate(newDate);
//             }}
//             className="p-2 hover:bg-gray-100 rounded-lg transition"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <span className="text-sm font-medium text-gray-700">
//             {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//           </span>
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               newDate.setMonth(newDate.getMonth() + 1);
//               setCurrentDate(newDate);
//             }}
//             className="p-2 hover:bg-gray-100 rounded-lg transition"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Legend */}
//       {!compact && (
//         <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap gap-4 text-sm">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
//             <span className="text-gray-600">Available</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
//             <span className="text-gray-600">Unavailable</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
//             <span className="text-gray-600">Busy</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-white border border-gray-200 rounded mr-2"></div>
//             <span className="text-gray-600">Not Set</span>
//           </div>
//         </div>
//       )}

//       {/* Weekday Headers */}
//       <div className="grid grid-cols-7 border-b border-gray-200">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//           <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 border-r border-gray-200 last:border-r-0">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 auto-rows-fr">
//         {renderCalendar()}
//       </div>

//       {/* Availability Modal */}
//       {showModal && selectedDate && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
//           <div className="relative min-h-screen flex items-center justify-center p-4">
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Set Availability for {selectedDate.toLocaleDateString()}
//                   </h3>
//                   <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {error && (
//                   <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
//                     <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
//                     {error}
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status
//                     </label>
//                     <div className="grid grid-cols-3 gap-3">
//                       <button
//                         onClick={() => setAvailabilityType('available')}
//                         className={`p-3 rounded-lg border-2 transition ${
//                           availabilityType === 'available'
//                             ? 'border-green-500 bg-green-50 text-green-700'
//                             : 'border-gray-200 hover:border-green-300'
//                         }`}
//                       >
//                         <div className="text-center">
//                           <div className="font-medium">Available</div>
//                           <div className="text-xs text-gray-500">Open for work</div>
//                         </div>
//                       </button>
//                       <button
//                         onClick={() => setAvailabilityType('busy')}
//                         className={`p-3 rounded-lg border-2 transition ${
//                           availabilityType === 'busy'
//                             ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
//                             : 'border-gray-200 hover:border-yellow-300'
//                         }`}
//                       >
//                         <div className="text-center">
//                           <div className="font-medium">Busy</div>
//                           <div className="text-xs text-gray-500">On a project</div>
//                         </div>
//                       </button>
//                       <button
//                         onClick={() => setAvailabilityType('unavailable')}
//                         className={`p-3 rounded-lg border-2 transition ${
//                           availabilityType === 'unavailable'
//                             ? 'border-red-500 bg-red-50 text-red-700'
//                             : 'border-gray-200 hover:border-red-300'
//                         }`}
//                       >
//                         <div className="text-center">
//                           <div className="font-medium">Unavailable</div>
//                           <div className="text-xs text-gray-500">Not available</div>
//                         </div>
//                       </button>
//                     </div>
//                   </div>

//                   {availabilityType === 'available' && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Available Hours
//                       </label>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-xs text-gray-500 mb-1">Start Time</label>
//                           <input
//                             type="time"
//                             value={timeRange.start}
//                             onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs text-gray-500 mb-1">End Time</label>
//                           <input
//                             type="time"
//                             value={timeRange.end}
//                             onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-end space-x-3 mt-6">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={saveAvailability}
//                     disabled={saving}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center"
//                   >
//                     {saving ? (
//                       <>
//                         <Loader className="w-4 h-4 animate-spin mr-2" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4 mr-2" />
//                         Save
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailabilityCalendar;




// src/components/AvailabilityCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, X, Save, Loader, AlertCircle, User, Briefcase } from 'lucide-react';

const AvailabilityCalendar = ({ 
  userId, 
  userType, // 'consultant', 'client', or 'admin'
  onAvailabilityChange, 
  readOnly = false,
  compact = false,
  showAgenda = false,
  BACKEND_URL 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [availabilityType, setAvailabilityType] = useState('available');
  const [timeRange, setTimeRange] = useState({ start: '09:00', end: '17:00' });
  const [agendaItems, setAgendaItems] = useState([]);
  
  const isAdmin = userType === 'admin';

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  // Fetch availability data
  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const url = `${BACKEND_URL}/api/availability/${userType}/${encodeURIComponent(userId)}?months=6`;
      console.log('📅 Fetching availability from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('📊 Availability data received:', data);
      
      if (data.success) {
        setAvailability(data.availability || {});
        console.log('✅ Availability keys:', Object.keys(data.availability || {}));
        if (showAgenda) {
          setAgendaItems(data.agenda || []);
        }
      } else {
        console.error('❌ Failed to fetch availability:', data.error);
      }
    } catch (err) {
      console.error('❌ Error fetching availability:', err);
      setError('Failed to load availability data');
    } finally {
      setLoading(false);
    }
  };

  // Save availability for a date
  const saveAvailability = async () => {
    if (!selectedDate) return;
    
    try {
      setSaving(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${BACKEND_URL}/api/availability/save`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          userType,
          date: selectedDate.toISOString().split('T')[0],
          status: availabilityType,
          timeRange: availabilityType === 'available' ? timeRange : null
        })
      });
      
      const data = await response.json();
      if (data.success) {
        const dateKey = selectedDate.toISOString().split('T')[0];
        setAvailability(prev => ({
          ...prev,
          [dateKey]: {
            status: availabilityType,
            timeRange: availabilityType === 'available' ? timeRange : null
          }
        }));
        
        console.log('✅ Availability saved for:', dateKey, availabilityType);
        
        if (onAvailabilityChange) {
          onAvailabilityChange(selectedDate, availabilityType, timeRange);
        }
        
        setShowModal(false);
      } else {
        setError(data.error || 'Failed to save availability');
      }
    } catch (err) {
      console.error('❌ Error saving availability:', err);
      setError('Network error while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDateClick = (date) => {
    if (readOnly || isAdmin) return; // Admin can't edit from aggregated view
    
    const dateKey = date.toISOString().split('T')[0];
    const existing = availability[dateKey];
    
    setSelectedDate(date);
    if (existing && existing.status) {
      setAvailabilityType(existing.status);
      if (existing.timeRange) {
        setTimeRange(existing.timeRange);
      }
    } else {
      setAvailabilityType('available');
      setTimeRange({ start: '09:00', end: '17:00' });
    }
    setShowModal(true);
  };

  // Get status for a date (handles both consultant and admin formats)
  const getDateStatus = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    const data = availability[dateKey];
    
    let status = null;
    
    if (data) {
      if (data.status) {
        // Consultant/Client view format
        status = data.status;
      } else if (data.consultants && data.consultants.length > 0) {
        // Admin aggregated view format
        // Determine the dominant status for display
        const hasAvailable = data.consultants.some(c => c.status === 'available');
        const hasBusy = data.consultants.some(c => c.status === 'busy');
        const hasUnavailable = data.consultants.some(c => c.status === 'unavailable');
        
        // For admin view, prioritize showing available if any are available
        if (hasAvailable) {
          status = 'available';
        } else if (hasBusy) {
          status = 'busy';
        } else if (hasUnavailable) {
          status = 'unavailable';
        }
      }
    }
    
    // Debug log for specific dates
    if (dateKey === '2026-03-21' || dateKey === '2026-03-22' || dateKey === '2026-03-23' || dateKey === '2026-03-25' || dateKey === '2026-03-28') {
      console.log(`📅 Date ${dateKey} status:`, status, 'data:', data);
    }
    
    switch(status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
    }
  };

  // Get display info for a date (time range or status text)
  const getDateDisplayInfo = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;
    
    const data = availability[dateKey];
    
    if (!data) return null;
    
    if (data.status) {
      // Consultant/Client view
      if (data.status === 'available' && data.timeRange) {
        return {
          type: 'timeRange',
          start: data.timeRange.start,
          end: data.timeRange.end
        };
      } else if (data.status === 'busy') {
        return { type: 'text', text: 'Busy' };
      } else if (data.status === 'unavailable') {
        return { type: 'text', text: 'Unavailable' };
      }
    } else if (data.consultants && data.consultants.length > 0 && isAdmin) {
      // Admin view - show availability count
      const availableCount = data.availableCount || data.consultants.filter(c => c.status === 'available').length;
      const totalCount = data.totalCount || data.consultants.length;
      
      if (availableCount > 0) {
        return { 
          type: 'count', 
          text: `${availableCount}/${totalCount} available`,
          isAvailable: true
        };
      } else {
        // Show first consultant's status
        const firstConsultant = data.consultants[0];
        if (firstConsultant.status === 'busy') {
          return { type: 'text', text: 'Busy' };
        } else if (firstConsultant.status === 'unavailable') {
          return { type: 'text', text: 'Unavailable' };
        }
      }
    }
    
    return null;
  };

  const getAgendaForDate = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    return agendaItems.find(item => item.date === dateKey);
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isPast = date < today;
      const statusClass = getDateStatus(date);
      const agenda = getAgendaForDate(date);
      const displayInfo = getDateDisplayInfo(date);
      
      days.push(
        <div
          key={day}
          onClick={() => !isPast && !readOnly && !isAdmin && handleDateClick(date)}
          className={`min-h-24 p-2 border border-gray-200 transition ${!isPast && !readOnly && !isAdmin ? 'cursor-pointer hover:shadow-md' : ''} ${isPast ? 'bg-gray-100 opacity-50' : statusClass}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isPast ? 'text-gray-400' : 'text-gray-700'}`}>
              {day}
            </span>
            {agenda && !compact && (
              <div className="flex items-center text-xs text-blue-600">
                <Briefcase className="w-3 h-3 mr-1" />
                {agenda.title}
              </div>
            )}
          </div>
          
          {!compact && displayInfo && (
            displayInfo.type === 'timeRange' ? (
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {displayInfo.start} - {displayInfo.end}
              </div>
            ) : displayInfo.type === 'count' ? (
              <div className="mt-1 text-xs text-green-600 font-medium">
                {displayInfo.text}
              </div>
            ) : (
              <div className="mt-1 text-xs text-gray-500">
                {displayInfo.text}
              </div>
            )
          )}
          
          {agenda && compact && (
            <div className="mt-1 text-xs text-blue-600 truncate">
              {agenda.title}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  useEffect(() => {
    if (userId) {
      fetchAvailability();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {!compact ? 'Availability Calendar' : 'My Schedule'}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      {!compact && (
        <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
            <span className="text-gray-600">Available</span>
            {isAdmin && <span className="text-xs text-gray-400 ml-1">(has available consultants)</span>}
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
            <span className="text-gray-600">Unavailable</span>
            {isAdmin && <span className="text-xs text-gray-400 ml-1">(no available consultants)</span>}
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
            <span className="text-gray-600">Busy</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded mr-2"></div>
            <span className="text-gray-600">Not Set</span>
          </div>
        </div>
      )}

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {renderCalendar()}
      </div>

      {/* Availability Modal - Only for non-admin users */}
      {showModal && selectedDate && !isAdmin && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Set Availability for {selectedDate.toLocaleDateString()}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setAvailabilityType('available')}
                        className={`p-3 rounded-lg border-2 transition ${
                          availabilityType === 'available'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium">Available</div>
                          <div className="text-xs text-gray-500">Open for work</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setAvailabilityType('busy')}
                        className={`p-3 rounded-lg border-2 transition ${
                          availabilityType === 'busy'
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium">Busy</div>
                          <div className="text-xs text-gray-500">On a project</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setAvailabilityType('unavailable')}
                        className={`p-3 rounded-lg border-2 transition ${
                          availabilityType === 'unavailable'
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium">Unavailable</div>
                          <div className="text-xs text-gray-500">Not available</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {availabilityType === 'available' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Hours
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={timeRange.start}
                            onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">End Time</label>
                          <input
                            type="time"
                            value={timeRange.end}
                            onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAvailability}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center"
                  >
                    {saving ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;