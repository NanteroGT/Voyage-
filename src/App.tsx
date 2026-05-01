/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Destinations from './pages/admin/Destinations';
import Agencies from './pages/admin/Agencies';
import Settings from './pages/admin/Settings';
import Tracking from './pages/Tracking';
import News from './pages/News';
import Gallery from './pages/Gallery';
import AdminTracking from './pages/admin/Tracking';
import AdminNews from './pages/admin/News';
import AdminGallery from './pages/admin/Gallery';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminFAQ from './pages/admin/FAQ';
import AdminSiteSettings from './pages/admin/SiteSettings';
import AdminUsersAdmin from './pages/admin/AdminUsers';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        // Attempt to check connection to Firestore Enterprise Edition
        await getDocFromServer(doc(db, 'system', 'health'));
        console.log("Firebase connection established.");
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration or internet connection.");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suivi" element={<Tracking />} />
            <Route path="/actualites" element={<News />} />
            <Route path="/galerie" element={<Gallery />} />
            
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="agencies" element={<Agencies />} />
              <Route path="settings" element={<AdminSiteSettings />} />
              <Route path="tracking" element={<AdminTracking />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="users" element={<AdminUsersAdmin />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}
