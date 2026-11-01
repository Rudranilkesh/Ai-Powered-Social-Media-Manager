// ============================================================
// components/auth/PublicRoute.jsx — Public Auth Route Guard
// Ensures already authenticated users are redirected away from
// auth pages (/login, /register) to the dashboard.
// ============================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4 text-white"
      >
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default PublicRoute;

