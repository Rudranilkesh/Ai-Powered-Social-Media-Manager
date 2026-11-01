// ============================================================
// App.jsx — Root application component
// Configures AuthProvider and application routes:
// - Public auth routes: /login, /register
// - Protected routes: /dashboard, /
// ============================================================

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { PublicRoute } from "./components/auth/PublicRoute.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegisterPage } from "./pages/auth/RegisterPage.jsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes — accessible only when unauthenticated */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected routes — accessible only when authenticated */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback redirects to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
