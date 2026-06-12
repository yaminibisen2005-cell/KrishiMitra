/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50/5">
        <LoadingSpinner message="Checking authentication status..." size="lg" />
      </div>
    );
  }

  // Not logged in at all
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Logged in but not 'user' role
  if (user.role !== 'user') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
