import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Event } from '../../types';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserGroupIcon,
  TicketIcon
} from '@heroicons/react/24/outline';

interface EventCardProps {
  event: Event;
  showBookButton?: boolean;
  onBook?: (eventId: string) => void;
}

export function EventCard({ event, showBookButton = false, onBook }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const availabilityPercentage = (event.availableSlots / event.capacity) * 100;
  const minPrice = event.isFree ? 0 : Math.min(...event.ticketTypes.map(t => t.price));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={event.imageUrl || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {event.category}
          </span>
          <span className="text-sm font-medium text-green-600">
            {event.county}
          </span>
          <span className={`text-sm font-medium ${isUpcoming ? 'text-green-600' : 'text-gray-500'}`}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/events/${event.id}`} className="hover:text-blue-600 transition-colors">
            {event.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {format(eventDate, 'MMM dd, yyyy')}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-2" />
            {event.time}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2" />
            {event.location}, {event.county}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            {event.availableSlots} / {event.capacity} slots available
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <TicketIcon className="h-4 w-4 mr-2" />
            {event.isFree ? 'FREE' : `From ${formatKenyanCurrency(minPrice)}`}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Availability</span>
            <span>{Math.round(availabilityPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                availabilityPercentage > 50 ? 'bg-green-500' : 
                availabilityPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            by {event.organizerName}
          </span>
          
          {showBookButton && isUpcoming && event.availableSlots > 0 && (
            <button
              onClick={() => onBook?.(event.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                event.isFree 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {event.isFree ? 'Get Tickets' : 'Book Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}