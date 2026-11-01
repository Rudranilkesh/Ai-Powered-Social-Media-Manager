// ============================================================
// components/auth/ProtectedRoute.jsx — Protected Route Guard
// Ensures only authenticated users can access the route.
// Unauthenticated users are redirected to /login with return state.
// ============================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function ProtectedRoute({ children }) {
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
        <p className="text-slate-400 text-sm">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;

