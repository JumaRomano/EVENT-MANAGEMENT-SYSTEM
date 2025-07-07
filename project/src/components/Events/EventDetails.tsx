import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Event } from '../../types';
import { eventAPI } from '../../services/api';
import { EventBookingModal } from './EventBookingModal';
import { formatKenyanCurrency } from '../../utils/kenyanData';
import { toast } from 'react-hot-toast';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserGroupIcon,
  TicketIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true);
      // For now, we'll find the event from our mock data
      const response = await eventAPI.getEvents();
      const foundEvent = response.data.find((e: Event) => e.id === eventId);
      
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        toast.error('Event not found');
        navigate('/events');
      }
    } catch (error) {
      toast.error('Failed to fetch event details');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    toast.success('Event booked successfully!');
    if (event) {
      fetchEvent(event.id); // Refresh event data
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const availabilityPercentage = (event.availableSlots / event.capacity) * 100;
  const minPrice = event.isFree ? 0 : Math.min(...event.ticketTypes.map(t => t.price));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Events
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-6">
              <img
                src={event.imageUrl || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={event.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {event.county}
                    </span>
                    <span className={`text-sm font-medium ${isUpcoming ? 'text-green-600' : 'text-gray-500'}`}>
                      {isUpcoming ? 'Upcoming' : 'Past Event'}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                  <p className="text-gray-600 mb-4">Organized by {event.organizerName}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isFavorited ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ShareIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <CalendarIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-gray-600">
                        {format(eventDate, 'EEEE, MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <MapPinIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-500">{event.county}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <UserGroupIcon className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-gray-600">
                        {event.availableSlots} of {event.capacity} spots available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Availability</span>
                  <span>{Math.round(availabilityPercentage)}% available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      availabilityPercentage > 50 ? 'bg-green-500' : 
                      availabilityPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${availabilityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Ticket Types */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TicketIcon className="h-5 w-5 mr-2" />
                Available Tickets
              </h3>
              
              <div className="space-y-4">
                {event.ticketTypes.map((ticketType) => (
                  <div key={ticketType.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{ticketType.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{ticketType.description}</p>
                        
                        {ticketType.benefits.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Includes:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {ticketType.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-blue-600">
                          {ticketType.price === 0 ? 'FREE' : formatKenyanCurrency(ticketType.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ticketType.availableQuantity} available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {event.isFree ? 'FREE EVENT' : `From ${formatKenyanCurrency(minPrice)}`}
                </p>
                <p className="text-sm text-gray-600">
                  {event.availableSlots} spots remaining
                </p>
              </div>

              {isUpcoming && event.availableSlots > 0 ? (
                <button
                  onClick={handleBooking}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                    event.isFree 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {event.isFree ? 'Get Free Tickets' : 'Book Now'}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-md font-medium text-white bg-gray-400 cursor-not-allowed"
                >
                  {!isUpcoming ? 'Event Ended' : 'Sold Out'}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Event Organizer</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">
                      {event.organizerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.organizerName}</p>
                    <p className="text-sm text-gray-600">Event Organizer</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Share Event</h4>
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {event && (
        <EventBookingModal
          event={event}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}