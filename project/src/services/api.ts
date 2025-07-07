import axios from 'axios';
import { Event, User, Booking, EventFilters, DashboardStats, TicketType } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) =>
    api.post('/auth/register', userData),
  getCurrentUser: () =>
    api.get('/auth/me'),
};

export const eventAPI = {
  getEvents: (filters?: EventFilters) =>
    api.get('/events', { params: filters }),
  getEvent: (id: string) =>
    api.get(`/events/${id}`),
  createEvent: (eventData: Partial<Event>) =>
    api.post('/events', eventData),
  updateEvent: (id: string, eventData: Partial<Event>) =>
    api.put(`/events/${id}`, eventData),
  deleteEvent: (id: string) =>
    api.delete(`/events/${id}`),
  getMyEvents: () =>
    api.get('/events/my-events'),
};

export const bookingAPI = {
  bookEvent: (eventId: string) =>
    api.post(`/bookings/${eventId}`),
  cancelBooking: (bookingId: string) =>
    api.delete(`/bookings/${bookingId}`),
  getMyBookings: () =>
    api.get('/bookings/my-bookings'),
  getEventBookings: (eventId: string) =>
    api.get(`/bookings/event/${eventId}`),
};

export const ticketAPI = {
  getMyTickets: () =>
    api.get('/tickets/my-tickets'),
  getTicket: (id: string) =>
    api.get(`/tickets/${id}`),
  downloadTicket: (id: string) =>
    api.get(`/tickets/${id}/download`, { responseType: 'blob' }),
};

export const adminAPI = {
  getUsers: () =>
    api.get('/admin/users'),
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`),
  getDashboardStats: () =>
    api.get('/admin/dashboard-stats'),
  getAllEvents: () =>
    api.get('/admin/events'),
  getAllBookings: () =>
    api.get('/admin/bookings'),
};

// Mock API responses for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'organizer@example.com',
    firstName: 'John',
    lastName: 'Organizer',
    role: 'organizer',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'attendee@example.com',
    firstName: 'Jane',
    lastName: 'Attendee',
    role: 'attendee',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Nairobi Tech Summit 2024',
    description: 'Kenya\'s premier technology conference featuring the latest in AI, fintech, and digital innovation.',
    date: '2024-03-15',
    time: '09:00',
    location: 'KICC - Kenyatta International Convention Centre',
    county: 'Nairobi',
    category: 'Technology & Innovation',
    capacity: 500,
    availableSlots: 245,
    organizerId: '2',
    organizerName: 'John Organizer',
    isFree: false,
    ticketTypes: [
      {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Limited time offer',
        price: 2500,
        quantity: 100,
        availableQuantity: 45,
        benefits: ['Event access', 'Welcome kit', 'Lunch', 'Networking session']
      },
      {
        id: 'regular',
        name: 'Regular',
        description: 'Standard admission',
        price: 3500,
        quantity: 300,
        availableQuantity: 150,
        benefits: ['Event access', 'Lunch', 'Networking session']
      },
      {
        id: 'vip',
        name: 'VIP',
        description: 'Premium experience',
        price: 7500,
        quantity: 100,
        availableQuantity: 50,
        benefits: ['Event access', 'VIP seating', 'Welcome kit', 'Lunch', 'Networking session', 'Meet & greet with speakers']
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Kenyan Entrepreneurs Summit',
    description: 'Connect with successful entrepreneurs and learn strategies for building businesses in Kenya.',
    date: '2024-03-20',
    time: '10:00',
    location: 'Sarit Centre',
    county: 'Nairobi',
    category: 'Business & Entrepreneurship',
    capacity: 300,
    availableSlots: 150,
    organizerId: '2',
    organizerName: 'John Organizer',
    isFree: false,
    ticketTypes: [
      {
        id: 'student',
        name: 'Student',
        description: 'For university students',
        price: 1000,
        quantity: 50,
        availableQuantity: 25,
        benefits: ['Event access', 'Student networking', 'Lunch']
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'For working professionals',
        price: 2500,
        quantity: 200,
        availableQuantity: 100,
        benefits: ['Event access', 'Professional networking', 'Lunch', 'Workshop materials']
      },
      {
        id: 'entrepreneur',
        name: 'Entrepreneur',
        description: 'For business owners',
        price: 4000,
        quantity: 50,
        availableQuantity: 25,
        benefits: ['Event access', 'VIP networking', 'Lunch', 'Workshop materials', '1-on-1 mentorship session']
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Kisumu Cultural Festival',
    description: 'Celebrate the rich cultural heritage of Western Kenya with music, dance, and traditional crafts.',
    date: '2024-03-25',
    time: '14:00',
    location: 'Dunga Beach',
    county: 'Kisumu',
    category: 'Arts & Culture',
    capacity: 200,
    availableSlots: 180,
    organizerId: '2',
    organizerName: 'John Organizer',
    isFree: true,
    ticketTypes: [
      {
        id: 'general',
        name: 'General Admission',
        description: 'Free entry to the festival',
        price: 0,
        quantity: 200,
        availableQuantity: 180,
        benefits: ['Festival access', 'Cultural performances', 'Art exhibitions']
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Mombasa Beach Marathon',
    description: 'Annual marathon along the beautiful Kenyan coast. Multiple race categories available.',
    date: '2024-04-10',
    time: '06:00',
    location: 'Nyali Beach',
    county: 'Mombasa',
    category: 'Sports & Fitness',
    capacity: 1000,
    availableSlots: 750,
    organizerId: '2',
    organizerName: 'John Organizer',
    isFree: false,
    ticketTypes: [
      {
        id: '5k',
        name: '5K Fun Run',
        description: 'Family-friendly 5K run',
        price: 500,
        quantity: 300,
        availableQuantity: 250,
        benefits: ['Race participation', 'Finisher medal', 'T-shirt', 'Refreshments']
      },
      {
        id: '10k',
        name: '10K Race',
        description: 'Competitive 10K race',
        price: 1000,
        quantity: 400,
        availableQuantity: 300,
        benefits: ['Race participation', 'Finisher medal', 'T-shirt', 'Refreshments', 'Timing chip']
      },
      {
        id: 'half-marathon',
        name: 'Half Marathon',
        description: '21K half marathon',
        price: 1500,
        quantity: 250,
        availableQuantity: 175,
        benefits: ['Race participation', 'Finisher medal', 'T-shirt', 'Refreshments', 'Timing chip', 'Certificate']
      },
      {
        id: 'full-marathon',
        name: 'Full Marathon',
        description: '42K full marathon',
        price: 2000,
        quantity: 50,
        availableQuantity: 25,
        benefits: ['Race participation', 'Finisher medal', 'T-shirt', 'Refreshments', 'Timing chip', 'Certificate', 'Massage session']
      }
    ],
    imageUrl: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
];

// Mock tickets data
const mockTickets: (Ticket & { event: Event })[] = [
  {
    id: 'ticket-1',
    eventId: '1',
    ticketTypeId: 'early-bird',
    userId: '3',
    ticketNumber: 'TK001234567',
    qrCode: 'QR_TK001234567_ENCODED',
    status: 'active',
    purchaseDate: '2024-01-15T10:30:00Z',
    price: 2500,
    event: mockEvents[0]
  },
  {
    id: 'ticket-2',
    eventId: '2',
    ticketTypeId: 'professional',
    userId: '3',
    ticketNumber: 'TK001234568',
    qrCode: 'QR_TK001234568_ENCODED',
    status: 'active',
    purchaseDate: '2024-01-20T14:15:00Z',
    price: 2500,
    event: mockEvents[1]
  },
  {
    id: 'ticket-3',
    eventId: '3',
    ticketTypeId: 'general',
    userId: '3',
    ticketNumber: 'TK001234569',
    qrCode: 'QR_TK001234569_ENCODED',
    status: 'used',
    purchaseDate: '2024-01-10T09:45:00Z',
    price: 0,
    event: mockEvents[2]
  },
  {
    id: 'ticket-4',
    eventId: '4',
    ticketTypeId: '10k',
    userId: '3',
    ticketNumber: 'TK001234570',
    qrCode: 'QR_TK001234570_ENCODED',
    status: 'active',
    purchaseDate: '2024-02-01T16:20:00Z',
    price: 1000,
    event: mockEvents[3]
  }
];

// Mock API implementations
export const mockAPI = {
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          resolve({
            data: {
              user,
              token: 'mock-jwt-token',
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },
  
  register: (userData: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve({
          data: {
            user: newUser,
            token: 'mock-jwt-token',
          },
        });
      }, 1000);
    });
  },
  
  getEvents: (filters?: EventFilters) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredEvents = [...mockEvents];
        
        if (filters?.search) {
          filteredEvents = filteredEvents.filter(event =>
            event.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
            event.description.toLowerCase().includes(filters.search!.toLowerCase())
          );
        }
        
        if (filters?.category) {
          filteredEvents = filteredEvents.filter(event => event.category === filters.category);
        }
        
        if (filters?.county) {
          filteredEvents = filteredEvents.filter(event => event.county === filters.county);
        }
        
        if (filters?.priceRange) {
          switch (filters.priceRange) {
            case 'free':
              filteredEvents = filteredEvents.filter(event => event.isFree);
              break;
            case 'under-1000':
              filteredEvents = filteredEvents.filter(event => 
                !event.isFree && Math.min(...event.ticketTypes.map(t => t.price)) < 1000
              );
              break;
            case '1000-5000':
              filteredEvents = filteredEvents.filter(event => {
                if (event.isFree) return false;
                const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
                return minPrice >= 1000 && minPrice <= 5000;
              });
              break;
            case 'above-5000':
              filteredEvents = filteredEvents.filter(event => 
                !event.isFree && Math.min(...event.ticketTypes.map(t => t.price)) > 5000
              );
              break;
          }
        }
        
        resolve({ data: filteredEvents });
      }, 500);
    });
  },
  
  createEvent: (eventData: Partial<Event>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEvent: Event = {
          id: Date.now().toString(),
          ...eventData,
          availableSlots: eventData.capacity || 0,
          county: eventData.county || 'Nairobi',
          isFree: eventData.isFree || false,
          ticketTypes: eventData.ticketTypes || [],
          organizerId: '2',
          organizerName: 'John Organizer',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Event;
        resolve({ data: newEvent });
      }, 1000);
    });
  },
  
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats: DashboardStats = {
          totalEvents: mockEvents.length,
          totalBookings: 125,
          totalUsers: mockUsers.length,
          upcomingEvents: mockEvents.filter(e => new Date(e.date) > new Date()).length,
          totalRevenue: 2450000, // KES 2,450,000
        };
        resolve({ data: stats });
      }, 500);
    });
  },
  
  getMyTickets: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockTickets });
      }, 500);
    });
  },
};

// Override API calls with mock implementations for development
Object.assign(authAPI, {
  login: mockAPI.login,
  register: mockAPI.register,
});

Object.assign(eventAPI, {
  getEvents: mockAPI.getEvents,
  createEvent: mockAPI.createEvent,
  getMyEvents: () => mockAPI.getEvents(),
});

Object.assign(adminAPI, {
  getDashboardStats: mockAPI.getDashboardStats,
  getUsers: () => Promise.resolve({ data: mockUsers }),
  getAllEvents: () => mockAPI.getEvents(),
});

Object.assign(ticketAPI, {
  getMyTickets: mockAPI.getMyTickets,
});