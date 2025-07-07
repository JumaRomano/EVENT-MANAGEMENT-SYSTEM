# EventHub Kenya 🇰🇪

A comprehensive event management platform designed specifically for Kenya, featuring M-Pesa integration, county-based event discovery, and a complete ticketing system.

## 🌟 Features

### 🎫 **Complete Ticketing System**
- Multiple ticket types per event (VIP, Regular, Student, etc.)
- Individual pricing, quantities, and benefits
- Real-time availability tracking
- QR code generation for tickets
- **Digital ticket receipts with download/print functionality**
- **Comprehensive ticket management page**

### 💰 **Payment Integration**
- **M-Pesa payment simulation** (Kenya's primary mobile payment)
- Card payment options
- KES currency formatting
- Secure payment flow with transaction IDs

### 🇰🇪 **Kenyan Localization**
- All 47 Kenyan counties as location options
- Popular venues (KICC, Sarit Centre, Nyali Beach, etc.)
- County-based event filtering
- Kenyan phone number formatting

### 👥 **User Roles & Dashboards**
- **Admin**: Manage all users, events, and view analytics
- **Organizer**: Create and manage events, view bookings
- **Attendee**: Browse and book events, manage tickets

### 📱 **Modern UI/UX**
- Responsive design optimized for mobile
- Beautiful, production-ready interface
- **Professional ticket design with QR codes**
- **Print-ready ticket layouts**
- Dark mode support
- Intuitive navigation and user flows

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eventhub-kenya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Development Setup

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Role-based dashboards
│   ├── Events/         # Event management components
│   ├── Layout/         # Layout components (Header, Footer)
│   ├── Payment/        # Payment processing components
│   └── Tickets/        # Ticketing system components
├── context/            # React Context providers
├── pages/              # Page components
├── services/           # API services and mock data
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and Kenyan data
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_MPESA_CONSUMER_KEY=your_mpesa_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
```

## 🎯 Demo Accounts

The application includes demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password |
| Organizer | organizer@example.com | password |
| Attendee | attendee@example.com | password |

## 📱 Key Features Walkthrough

### 1. **Event Discovery**
- Browse events across all 47 Kenyan counties
- Filter by category, date, location, and price range
- Search functionality for finding specific events

### 2. **Event Creation** (Organizers)
- Rich event creation form with Kenyan venues
- Multiple ticket types with individual pricing
- Capacity management and benefit listing
- Image upload and event categorization

### 3. **Booking Flow**
- Interactive ticket selection with quantity controls
- Real-time price calculation
- M-Pesa and card payment options
- Booking confirmation with QR codes
- **Instant ticket generation and download**

### 4. **Dashboard Management**
- **Admin Dashboard**: User management, analytics, system overview
- **Organizer Dashboard**: Event management, booking analytics
- **Attendee Dashboard**: Ticket management, event history

5. **Ticket Management**
- **View all purchased tickets in one place**
- **Filter tickets by status (upcoming, past, used)**
- **Download tickets as digital files**
- **Print-ready ticket designs**
- **QR codes for venue entry**
- **Share events with friends**

## 🏗️ Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **React Router** for client-side routing
- **Context API** for state management
- **Axios** for API communication

### Component Design
- Modular component architecture
- Reusable UI components
- Role-based component rendering
- Responsive design patterns

### State Management
- React Context for authentication
- Local state for component-specific data
- Mock API layer for development

## 🔐 Authentication & Security

### JWT-Based Authentication
- Secure token storage in localStorage
- Automatic token refresh handling
- Role-based route protection
- API request interceptors

### Role-Based Access Control
- Protected routes based on user roles
- Component-level permission checks
- API endpoint protection
- Secure user session management

## 💳 Payment Integration

### M-Pesa Integration (Simulated)
- STK Push simulation
- Transaction ID generation
- Payment status tracking
- Error handling and retry logic

### Multi-Payment Support
- M-Pesa (primary for Kenya)
- Credit/Debit cards
- Free event handling
- Payment confirmation flow

## 🌍 Kenyan Market Features

### Geographic Integration
- All 47 counties supported
- Popular venue suggestions
- Regional event discovery
- Location-based filtering

### Cultural Adaptation
- Event categories for Kenyan market
- Local currency (KES) formatting
- Mobile-first design approach
- Community-focused features

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- Component unit tests
- Integration tests for user flows
- API service tests
- Mock data for consistent testing

## 📦 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t eventhub-kenya .

# Run container
docker run -p 3000:3000 eventhub-kenya
```

### Environment Configuration
- Development: Local mock API
- Staging: Test API endpoints
- Production: Live API with real payments

## 🔧 API Integration

### Mock API (Development)
The application includes a comprehensive mock API for development:

- User authentication simulation
- Event CRUD operations
- Booking and payment simulation
- Admin analytics data

### Real API Integration
To connect to a real backend:

1. Update `src/services/api.ts`
2. Configure environment variables
3. Implement real payment gateways
4. Set up database connections

## 🎨 Customization

### Theming
- Tailwind CSS configuration
- Custom color schemes
- Responsive breakpoints
- Component styling patterns

### Branding
- Logo and brand colors
- Custom fonts and typography
- Marketing content
- Regional customization

## 🐛 Troubleshooting

### Common Issues

1. **Development server won't start**
   - Check Node.js version (18+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Payment simulation not working**
   - Check browser console for errors
   - Verify phone number format
   - Ensure mock API is responding

3. **Routing issues**
   - Check React Router configuration
   - Verify route protection logic
   - Clear browser cache

### Getting Help
- Check the browser console for errors
- Review the component documentation
- Test with demo accounts
- Verify API responses in Network tab

## 🚀 Future Enhancements

### Planned Features
- Real M-Pesa API integration
- Email notification system
- Advanced analytics dashboard
- Mobile app development
- Multi-language support (Swahili)

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the demo implementation

---

**EventHub Kenya** - Connecting communities across all 47 counties! 🇰🇪✨