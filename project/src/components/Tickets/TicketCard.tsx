import React, { useState } from 'react';
import { format } from 'date-fns';
import { Ticket, Event } from '../../types';
import { TicketDownloadModal } from './TicketDownloadModal';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  TicketIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface TicketCardProps {
  ticket: Ticket & { event: Event };
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const eventDate = new Date(ticket.event.date);
  const isUpcoming = eventDate > new Date();
  const ticketType = ticket.event.ticketTypes.find(t => t.id === ticket.ticketTypeId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'used':
        return <TicketIcon className="h-4 w-4" />;
      default:
        return <TicketIcon className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Event Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <img
            src={ticket.event.imageUrl || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={ticket.event.title}
            className="w-full h-32 object-cover"
          />
        </div>

        <div className="p-4">
          {/* Status and Ticket Number */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1 capitalize">{ticket.status}</span>
            </span>
            <span className="text-xs text-gray-500 font-mono">
              #{ticket.ticketNumber}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {ticket.event.title}
          </h3>

          {/* Ticket Type and Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-600">
              {ticketType?.name || 'General'}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {ticket.price === 0 ? 'FREE' : formatKenyanCurrency(ticket.price)}
            </span>
          </div>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {format(eventDate, 'MMM dd, yyyy')}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2" />
              {ticket.event.time}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span className="truncate">{ticket.event.location}</span>
            </div>
          </div>

          {/* Purchase Date */}
          <div className="text-xs text-gray-500 mb-4">
            Purchased: {format(new Date(ticket.purchaseDate), 'MMM dd, yyyy')}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
              Download
            </button>
            
            <button
              onClick={() => setShowDownloadModal(true)}
              className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <QrCodeIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <TicketDownloadModal
        ticket={ticket}
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  );
}