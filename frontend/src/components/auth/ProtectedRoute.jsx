// ============================================================
// components/auth/ProtectedRoute.jsx — Protected Route Guard
// Ensures only authenticated users can access the route.
// Displays the creative branded pre-loader while resolving session.
// ============================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { LoadingPreloader } from "../common/LoadingPreloader.jsx";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPreloader message="Verifying authentication session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
