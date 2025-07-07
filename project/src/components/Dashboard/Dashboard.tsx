import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { OrganizerDashboard } from './OrganizerDashboard';
import { AttendeeDashboard } from './AttendeeDashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'organizer':
      return <OrganizerDashboard />;
    case 'attendee':
      return <AttendeeDashboard />;
    default:
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
          </div>
        </div>
      );
  }
}