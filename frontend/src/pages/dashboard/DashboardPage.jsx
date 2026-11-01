// ============================================================
// pages/dashboard/DashboardPage.jsx — Dashboard Baseline
// Protected page displaying current user information and logout action.
// Serves as the landing destination for authenticated users.
// ============================================================

import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface text-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-surface-card border-b border-surface-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary-400">SocialSync AI</span>
          <span className="text-lg">🚀</span>
          <span className="hidden sm:inline-block text-xs bg-primary-900 text-primary-200 px-2.5 py-0.5 rounded-full font-medium">
            T04 Authenticated
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{user?.name || "Creator"}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="btn-secondary text-sm py-2 px-4 hover:border-red-500 hover:text-red-300 transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-10 space-y-8">
        {/* Welcome Banner */}
        <div className="card bg-gradient-to-r from-surface-card to-primary-950/40 border border-surface-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {user?.name || "Creator"}! 👋
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                You are successfully authenticated in SocialSync AI.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-950 text-green-400 border border-green-800">
                ● Active Session
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-surface-border text-slate-300 capitalize">
                Role: {user?.role || "creator"}
              </span>
            </div>
          </div>
        </div>

        {/* Profile & Auth Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>👤</span> User Profile
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Account ID</span>
                <span className="font-mono text-xs text-slate-300">{user?.id || user?._id || "—"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Name</span>
                <span className="text-white font-medium">{user?.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Email</span>
                <span className="text-white font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Role</span>
                <span className="capitalize text-primary-400 font-medium">{user?.role}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Member Since</span>
                <span className="text-slate-300">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Just now"}
                </span>
              </div>
            </div>
          </div>

          {/* Authentication System Card */}
          <div className="card space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔒</span> Session & Security
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">JWT Token</span>
                <span className="text-green-400 font-medium">Stored in localStorage</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Axios Interceptor</span>
                <span className="text-green-400 font-medium">Active (Bearer header attached)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-border">
                <span className="text-slate-400">Route Guard</span>
                <span className="text-green-400 font-medium">ProtectedRoute verified</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Token Expiry</span>
                <span className="text-slate-300">7 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Development Progress Card */}
        <div className="card border-primary-500/30 bg-primary-950/20">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="text-base font-bold text-primary-300">
                Task T04 Complete — Authentication Frontend
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                The login, registration, AuthContext, Axios interceptor, and route guard flows are now fully operational.
                The next planned task is <strong>T05 — Dashboard layout and navigation</strong> (sidebar, metric cards, post feed).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;

