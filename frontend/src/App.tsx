/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import WeatherDashboard from './pages/WeatherDashboard';
import MarketPrices from './pages/MarketPrices';
import AdminPanel from './pages/AdminPanel';

// Authentication & Protection Modules
import { AuthProvider } from './auth/authContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './auth/ProtectedRoute';
import RoleProtectedRoute from './auth/RoleProtectedRoute';

// Authentication Pages
import AuthChoice from './pages/AuthChoice';
import FarmerLogin from './pages/FarmerLogin';
import FarmerRegister from './pages/FarmerRegister';
import AdminLogin from './pages/AdminLogin';
import Unauthorized from './pages/Unauthorized';
import UserDashboard from './pages/UserDashboard';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-emerald-50/10 font-sans" id="krishimitra-app-wrapper">
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthChoice />} />
                <Route path="/login" element={<FarmerLogin />} />
                <Route path="/register" element={<FarmerRegister />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
  
                {/* Protected User Routes (Require role = user) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/crop-recommendation" 
                  element={
                    <ProtectedRoute>
                      <CropRecommendation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/disease-detection" 
                  element={
                    <ProtectedRoute>
                      <DiseaseDetection />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/weather" 
                  element={
                    <ProtectedRoute>
                      <WeatherDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/market-prices" 
                  element={
                    <ProtectedRoute>
                      <MarketPrices />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/market" 
                  element={
                    <ProtectedRoute>
                      <MarketPrices />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/chatbot" 
                  element={
                    <ProtectedRoute>
                      <Chatbot />
                    </ProtectedRoute>
                  } 
                />
  
                {/* Protected Admin Routes (Require role = admin) */}
                <Route 
                  path="/admin" 
                  element={
                    <RoleProtectedRoute>
                      <AdminPanel />
                    </RoleProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/prices" 
                  element={
                    <RoleProtectedRoute>
                      <AdminPanel />
                    </RoleProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/support" 
                  element={
                    <RoleProtectedRoute>
                      <AdminPanel />
                    </RoleProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <RoleProtectedRoute>
                      <AdminPanel />
                    </RoleProtectedRoute>
                  } 
                />
  
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
  
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

