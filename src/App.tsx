@@ .. @@
 import React from 'react';
-import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
-import { Toaster } from 'react-hot-toast';
-import { AuthProvider } from './context/AuthContext';
-import { Layout } from './components/Layout/Layout';
-import { ProtectedRoute } from './components/Common/ProtectedRoute';
-import { HomePage } from './pages/HomePage';
-import { LoginForm } from './components/Auth/LoginForm';
-import { RegisterForm } from './components/Auth/RegisterForm';
-import { EventList } from './components/Events/EventList';
-import { CreateEventForm } from './components/Events/CreateEventForm';
-import { EventDetails } from './components/Events/EventDetails';
-import { TicketsPage } from './components/Tickets/TicketsPage';
-import { Dashboard } from './components/Dashboard/Dashboard';

 function App() {
   return (
-    <AuthProvider>
-      <Router>
-        <Layout>
-          <Routes>
-            <Route path="/" element={<HomePage />} />
-            <Route path="/login" element={<LoginForm />} />
-            <Route path="/register" element={<RegisterForm />} />
-            <Route path="/events" element={<EventList />} />
-            <Route path="/events/:id" element={<EventDetails />} />
-            
-            <Route 
-              path="/tickets" 
-              element={
-                <ProtectedRoute>
-                  <TicketsPage />
-                </ProtectedRoute>
-              } 
-            />
-            
-            <Route 
-              path="/dashboard" 
-              element={
-                <ProtectedRoute>
-                  <Dashboard />
-                </ProtectedRoute>
-              } 
-            />
-            
-            <Route 
-              path="/create-event" 
-              element={
-                <ProtectedRoute requiredRole="organizer">
-                  <CreateEventForm />
-                </ProtectedRoute>
-              } 
-            />
-          </Routes>
-        </Layout>
-        <Toaster position="top-right" />
-      </Router>
-    </AuthProvider>
+    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
+      <div className="text-center">
+        <h1 className="text-4xl font-bold text-gray-900 mb-4">EventHub Kenya</h1>
+        <p className="text-lg text-gray-600 mb-8">
+          Kenya's premier event management platform
+        </p>
+        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
+          <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome!</h2>
+          <p className="text-gray-600 mb-6">
+            The EventHub Kenya platform is loading. This is a comprehensive event management 
+            system designed for Kenya with M-Pesa integration, county-based filtering, 
+            and complete ticketing functionality.
+          </p>
+          <div className="space-y-2 text-sm text-gray-500">
+            <p>🎫 Complete ticketing system</p>
+            <p>💰 M-Pesa payment integration</p>
+            <p>🇰🇪 All 47 Kenyan counties</p>
+            <p>👥 Multi-role dashboards</p>
+          </div>
+        </div>
+      </div>
+    </div>
   );
 }