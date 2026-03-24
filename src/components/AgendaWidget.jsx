// src/components/AgendaWidget.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Briefcase, ChevronRight, Loader, AlertCircle, Users } from 'lucide-react';

const AgendaWidget = ({ userId, userType, BACKEND_URL, compact = false }) => {
  const [agenda, setAgenda] = useState({
    currentMissions: [],
    upcomingEngagements: [],
    pendingRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

// src/components/AgendaWidget.jsx - Update the fetchAgenda function

const fetchAgenda = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('auth_token');
    
    // Determine the email to use
    let email = userId;
    // If userId is an email, use it directly
    if (userId.includes('@')) {
      email = userId;
    } else {
      // If userId is an ID, we need to fetch the email or use a different approach
      // For now, assume userId is email for simplicity
      console.warn('AgendaWidget: userId is not an email, may need to fetch user data');
    }
    
    const response = await fetch(
      `${BACKEND_URL}/api/agenda/${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      }
    );
    
    const data = await response.json();
    if (data.success) {
      setAgenda(data.agenda);
    } else {
      setError(data.error || 'Failed to load agenda');
    }
  } catch (err) {
    console.error('Error fetching agenda:', err);
    setError('Network error');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (userId) {
      fetchAgenda();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTimeRange = (start, end) => {
    return `${start} - ${end}`;
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Completed';
    if (diffDays === 0) return 'Ends today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
        {error}
      </div>
    );
  }

  const hasNoActivity = agenda.currentMissions.length === 0 && 
                        agenda.upcomingEngagements.length === 0 && 
                        agenda.pendingRequests.length === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Agenda Overview
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Current missions and upcoming engagements
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Missions */}
        {agenda.currentMissions.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-green-600" />
              Current Missions
            </h4>
            <div className="space-y-3">
              {agenda.currentMissions.map((mission, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{mission.title}</p>
                      <p className="text-sm text-gray-600">{mission.client}</p>
                    </div>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(mission.startDate)} - {formatDate(mission.endDate)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {getDaysRemaining(mission.endDate)}
                    </span>
                  </div>
                  {mission.hoursWorked && (
                    <div className="mt-2 text-xs text-gray-600">
                      Hours worked: {mission.hoursWorked}h / {mission.totalHours}h
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Engagements */}
        {agenda.upcomingEngagements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              Upcoming Engagements
            </h4>
            <div className="space-y-3">
              {agenda.upcomingEngagements.map((engagement, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{engagement.title}</p>
                      <p className="text-sm text-gray-600">{engagement.client || engagement.consultant}</p>
                    </div>
                    <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                      {engagement.type === 'interview' ? 'Interview' : 'Meeting'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(engagement.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {engagement.time}
                    </span>
                  </div>
                  {engagement.location && (
                    <div className="mt-1 text-xs text-gray-500">
                      📍 {engagement.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Requests */}
        {agenda.pendingRequests.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-yellow-600" />
              Pending Requests
            </h4>
            <div className="space-y-3">
              {agenda.pendingRequests.map((request, idx) => (
                <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{request.title}</p>
                      <p className="text-sm text-gray-600">From: {request.sender}</p>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Respond
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {request.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasNoActivity && (
          <div className="text-center py-8">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No upcoming engagements</p>
            <p className="text-sm text-gray-400">
              Your schedule will appear here once you have active missions or meetings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaWidget;