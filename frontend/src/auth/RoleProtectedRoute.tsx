/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'admin')[];
}

export default function RoleProtectedRoute({ children, allowedRoles = ['admin'] }: RoleProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50/5 font-sans">
        <LoadingSpinner message="Securing control nodes..." size="lg" />
      </div>
    );
  }

  // Not logged in at all
  if (!user) {
    // If attempting to access Admin pages, redirect to Admin Login, else general Role selection /auth
    const redirectPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/auth';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Logged in but doesn't have required role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
