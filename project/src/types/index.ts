export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin' | 'organizer' | 'attendee';
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  benefits: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  county: string;
  category: string;
  capacity: number;
  availableSlots: number;
  organizerId: string;
  organizerName: string;
  imageUrl?: string;
  ticketTypes: TicketType[];
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  ticketTypeId: string;
  userId: string;
  ticketNumber: string;
  qrCode: string;
  status: 'active' | 'used' | 'cancelled';
  purchaseDate: string;
  price: number;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  tickets: Ticket[];
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'mpesa' | 'card' | 'bank_transfer';
  mpesaTransactionId?: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface EventFilters {
  category?: string;
  date?: string;
  county?: string;
  location?: string;
  search?: string;
  priceRange?: 'free' | 'under-1000' | '1000-5000' | 'above-5000';
}

export interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalUsers: number;
  upcomingEvents: number;
  totalRevenue: number;
}

export interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  eventId: string;
  ticketSelections: { ticketTypeId: string; quantity: number }[];
}