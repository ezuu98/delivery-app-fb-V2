import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="page-wrap"><p className="muted-text">Loading…</p></div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  const providerOk = user?.providerData?.some(p => p.providerId === 'phone');
  if (user?.email && !user.emailVerified && !providerOk) {
    return <Navigate to="/login" replace state={{ reason: 'email_unverified' }} />;
  }
  return children;
}
