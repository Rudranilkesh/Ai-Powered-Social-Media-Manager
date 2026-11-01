// ============================================================
// components/auth/PublicRoute.jsx — Public Auth Route Guard
// Ensures authenticated users are redirected away from login/register.
// Displays the creative branded pre-loader while resolving session.
// ============================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { LoadingPreloader } from "../common/LoadingPreloader.jsx";

export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPreloader message="Checking session state..." />;
  }

  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default PublicRoute;
