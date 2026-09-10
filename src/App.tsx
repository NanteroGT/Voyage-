import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import NzokoLoadingScreen from './components/common/NzokoLoadingScreen';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Tracking from './pages/public/Tracking';
import Contact from './pages/public/Contact';
import Booking from './pages/public/Booking';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Packages from './pages/admin/Packages';
import Users from './pages/admin/Users';
import Tickets from './pages/admin/Tickets';
import Messages from './pages/admin/Messages';
import Settings from './pages/admin/Settings';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleReplay = () => setIsLoading(true);
    window.addEventListener('replay-nzoko-loader', handleReplay);
    return () => window.removeEventListener('replay-nzoko-loader', handleReplay);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {isLoading && (
        <NzokoLoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="packages" element={<Packages />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}
