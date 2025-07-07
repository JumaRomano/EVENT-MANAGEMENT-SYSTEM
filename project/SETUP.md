# EventHub Kenya - Local Development Setup Guide

This guide will help you set up and run EventHub Kenya locally on your machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (version 18.0.0 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Verify Installation
Run these commands to verify your installations:

```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 8.0.0 or higher
git --version     # Should show git version
```

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to the project directory
cd eventhub-kenya
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install
```

This will install all the required packages including:
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Lucide React (for icons)
- And many more...

### 3. Environment Setup (Optional)

Create a `.env` file in the root directory for environment variables:

```bash
# Create environment file
touch .env
```

Add the following variables (optional for development):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# M-Pesa Configuration (for future real integration)
VITE_MPESA_CONSUMER_KEY=your_mpesa_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret

# App Configuration
VITE_APP_NAME=EventHub Kenya
VITE_APP_VERSION=1.0.0
```

**Note**: The app works perfectly without these environment variables as it uses mock data for development.

### 4. Start the Development Server

```bash
# Start the development server
npm run dev
```

You should see output similar to:

```
  VITE v5.4.2  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. Open the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

You should see the EventHub Kenya homepage! 🎉

## 🧪 Testing the Application

### Demo Accounts
Use these pre-configured accounts to test different user roles:

| Role | Email | Password | Access |
|------|-------|----------|---------|
| **Admin** | admin@example.com | password | Full system access, analytics |
| **Organizer** | organizer@example.com | password | Create/manage events |
| **Attendee** | attendee@example.com | password | Browse/book events |

### Test Scenarios

1. **Browse Events**
   - Visit the Events page
   - Try filtering by county, category, or price
   - Click on event cards to view details

2. **Book an Event**
   - Login as an attendee
   - Select an event and click "Book Now"
   - Try the ticket selection and payment flow

3. **Create an Event**
   - Login as an organizer
   - Go to "Create Event"
   - Fill out the form with multiple ticket types

4. **Admin Dashboard**
   - Login as admin
   - View the comprehensive dashboard
   - Check user and event management

## 🛠️ Development Commands

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run dev -- --host # Start dev server accessible on network

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

### Development Workflow

1. **Make Changes**: Edit files in the `src/` directory
2. **Hot Reload**: Changes automatically reflect in the browser
3. **Check Console**: Monitor browser console for any errors
4. **Test Features**: Use demo accounts to test functionality

## 📁 Project Structure

```
eventhub-kenya/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Auth/         # Login, Register components
│   │   ├── Dashboard/    # Role-based dashboards
│   │   ├── Events/       # Event management
│   │   ├── Layout/       # Header, Footer, Layout
│   │   ├── Payment/      # M-Pesa, payment components
│   │   └── Tickets/      # Ticketing system
│   ├── context/          # React Context (Auth)
│   ├── pages/            # Page components
│   ├── services/         # API services & mock data
│   ├── types/            # TypeScript definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## 🔧 Customization

### Adding New Features

1. **Create Components**: Add new components in appropriate directories
2. **Update Routes**: Modify `src/App.tsx` for new pages
3. **Add Types**: Define TypeScript types in `src/types/`
4. **Mock Data**: Update `src/services/api.ts` for new API endpoints

### Styling Changes

1. **Tailwind Classes**: Use Tailwind CSS classes for styling
2. **Custom Styles**: Add custom CSS in `src/index.css`
3. **Theme Colors**: Modify `tailwind.config.js` for color schemes

### Adding Kenyan Data

1. **Counties**: Update `src/utils/kenyanData.ts`
2. **Venues**: Add popular venues by county
3. **Categories**: Modify event categories for local market

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use a different port
npm run dev -- --port 3000
```

#### 2. Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### 3. TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Common fix: Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### 4. Build Errors
```bash
# Clear Vite cache
rm -rf dist .vite
npm run build
```

### Performance Issues

1. **Slow Development Server**
   - Close unnecessary browser tabs
   - Restart the development server
   - Check for memory-intensive processes

2. **Large Bundle Size**
   - Run `npm run build` to check bundle size
   - Use browser dev tools to analyze performance

## 📱 Mobile Development

### Testing on Mobile Devices

1. **Find Your IP Address**
   ```bash
   # Start server with network access
   npm run dev -- --host
   ```

2. **Access from Mobile**
   - Connect mobile device to same WiFi
   - Visit `http://YOUR_IP_ADDRESS:5173`

3. **Mobile-Specific Testing**
   - Test M-Pesa payment flow
   - Verify responsive design
   - Check touch interactions

## 🔐 Security Notes

### Development Security

1. **Mock Data**: All payment processing is simulated
2. **Local Storage**: Demo tokens are stored locally
3. **No Real Payments**: No actual money transactions occur
4. **Test Data**: All user data is temporary and local

### Production Considerations

1. **Environment Variables**: Use secure environment variables
2. **API Security**: Implement proper authentication
3. **Payment Security**: Use real M-Pesa API with proper certificates
4. **Data Protection**: Implement proper data encryption

## 🚀 Next Steps

### After Setup

1. **Explore Features**: Test all user roles and features
2. **Read Documentation**: Review component documentation
3. **Customize**: Modify for your specific needs
4. **Deploy**: Consider deployment options

### Learning Resources

1. **React Documentation**: https://react.dev/
2. **Tailwind CSS**: https://tailwindcss.com/docs
3. **TypeScript**: https://www.typescriptlang.org/docs/
4. **Vite**: https://vitejs.dev/guide/

## 📞 Getting Help

If you encounter issues:

1. **Check Browser Console**: Look for error messages
2. **Review Network Tab**: Check API requests
3. **Verify Setup**: Ensure all prerequisites are met
4. **Test with Demo Data**: Use provided demo accounts

## 🎉 Success!

If you can see the EventHub Kenya homepage and login with demo accounts, you're all set! 

The application is now running locally and ready for development or testing. Enjoy exploring Kenya's premier event management platform! 🇰🇪✨

---

**Happy Coding!** 🚀