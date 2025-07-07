import React, { useState, useEffect } from 'react';
import { Event, EventFilters } from '../../types';
import { EventCard } from './EventCard';
import { EventFiltersComponent } from './EventFilters';
import { EventBookingModal } from './EventBookingModal';
import { eventAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFilters>({});
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getEvents(filters);
      setEvents(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsBookingModalOpen(true);
    }
  };

  const handleBookingSuccess = () => {
    toast.success('Event booked successfully!');
    fetchEvents(); // Refresh events to update availability
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Events</h1>
        <p className="text-gray-600">
          Find and book amazing events happening across Kenya
        </p>
      </div>

      <EventFiltersComponent filters={filters} onFiltersChange={setFilters} />

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showBookButton={true}
              onBook={handleBook}
            />
          ))}
        </div>
      )}
      
      {selectedEvent && (
        <EventBookingModal
          event={selectedEvent}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}