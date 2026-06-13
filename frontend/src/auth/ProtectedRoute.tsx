import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
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
  const normalizedRole = user.role ? user.role.toLowerCase().replace('role_', '') : '';
  if (normalizedRole !== 'user') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
