// ============================================================
// App.jsx — Root application component
// Configures AuthProvider and application routes per design.md:
// - Public auth routes: /login, /register
// - Protected workspace routes wrapped in AppLayout (Sidebar + TopBar):
//   /dashboard, /ai, /posts, /calendar, /accounts, /analytics, /settings
// ============================================================

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { PublicRoute } from "./components/auth/PublicRoute.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegisterPage } from "./pages/auth/RegisterPage.jsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";

// Accessible placeholder component for upcoming tasks (T06-T15)
function PlaceholderPage({ title, task, description }) {
  return (
    <div className="card space-y-4 max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-surface-soft text-brand flex items-center justify-center font-bold text-lg">
          📌
        </span>
        <div>
          <h1 className="text-xl font-bold text-ink">{title}</h1>
          <p className="text-xs text-brand font-semibold">Planned for {task}</p>
        </div>
      </div>
      <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
      <div className="pt-2">
        <span className="badge bg-surface-soft text-ink-muted border border-line">
          Architecture verified • UI scaffold active
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public auth routes */}
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

        {/* Protected workspace routes with AppLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="app" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="ai"
            element={
              <PlaceholderPage
                title="AI Studio"
                task="Task T07 & T08"
                description="Google Gemini AI prompt generator with caption styling, tone selection, and hashtag suggestions."
              />
            }
          />
          <Route
            path="posts"
            element={
              <PlaceholderPage
                title="Posts & Composer"
                task="Task T09"
                description="Post draft creation, media attachment via Cloudinary, and platform selection."
              />
            }
          />
          <Route
            path="calendar"
            element={
              <PlaceholderPage
                title="Content Calendar"
                task="Task T12"
                description="Interactive month/agenda views for scheduled social posts and publishing timelines."
              />
            }
          />
          <Route
            path="accounts"
            element={
              <PlaceholderPage
                title="Connected Accounts"
                task="Task T10"
                description="Social media profile connections via Ayrshare API for Instagram, LinkedIn, Facebook, and Twitter."
              />
            }
          />
          <Route
            path="analytics"
            element={
              <PlaceholderPage
                title="Analytics Dashboard"
                task="Task T13 & T14"
                description="Engagement trends, post reach, and interaction metrics visualized with Recharts."
              />
            }
          />
          <Route
            path="settings"
            element={
              <PlaceholderPage
                title="Settings & Preferences"
                task="Task T15"
                description="Account profile settings, timezone preferences, and security management."
              />
            }
          />
        </Route>

        {/* Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
