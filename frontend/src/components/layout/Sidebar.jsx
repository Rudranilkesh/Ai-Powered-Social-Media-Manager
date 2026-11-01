// ============================================================
// components/layout/Sidebar.jsx — Desktop & Drawer Navigation
// Styled according to design.md (SocialSync AI Design System):
// - Width: 260px
// - Brand wine logo (#7a2e2a) with dynamic hover spin
// - Prominent link hover scale (1.03) and slide-right feedback
// - Icon scale and bounce micro-interactions
// ============================================================

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "AI Studio",
    path: "/ai",
    badge: "Gemini",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Posts & Drafts",
    path: "/posts",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: (
      <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export function Sidebar({ onClose }) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-surface border-r border-line flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-line">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2.5 font-bold text-lg text-ink group"
          onClick={onClose}
        >
          <span className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-glow-sm transition-all duration-300">
            S
          </span>
          <div className="flex flex-col">
            <span className="leading-tight tracking-tight group-hover:text-brand transition-colors">SocialSync AI</span>
            <span className="text-[10px] text-ink-muted font-normal uppercase tracking-wider">
              Creator Studio
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-soft active:scale-90 transition-all"
            aria-label="Close navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-2">
          Workspace
        </p>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-control text-sm transition-all duration-200 group active:scale-[0.97] ${
                isActive
                  ? "bg-surface-soft text-brand font-semibold border-l-4 border-brand shadow-sm scale-[1.02] translate-x-1"
                  : "text-ink-muted hover:text-ink hover:bg-surface-muted hover:scale-[1.03] hover:translate-x-1.5 font-medium"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 text-current">{item.icon}</span>
              <span className="transition-transform duration-200">{item.name}</span>
            </div>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-brand/10 text-brand group-hover:scale-110 transition-transform">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-line">
          <p className="px-3 text-[11px] font-semibold text-ink-subtle uppercase tracking-wider mb-2">
            Preferences
          </p>
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-control text-sm transition-all duration-200 group active:scale-[0.97] ${
                isActive
                  ? "bg-surface-soft text-brand font-semibold border-l-4 border-brand shadow-sm scale-[1.02] translate-x-1"
                  : "text-ink-muted hover:text-ink hover:bg-surface-muted hover:scale-[1.03] hover:translate-x-1.5 font-medium"
              }`
            }
          >
            <svg className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-125 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>

      {/* User Profile & Logout Footer */}
      <div className="p-3.5 border-t border-line bg-surface-muted">
        <div className="flex items-center justify-between gap-2 p-2 rounded-control bg-surface border border-line hover:border-brand/30 hover:shadow-card transition-all duration-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center flex-shrink-0 hover:scale-110 hover:rotate-6 transition-transform cursor-pointer">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ink truncate">{user?.name || "User"}</p>
              <p className="text-[11px] text-ink-muted truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 text-ink-muted hover:text-negative hover:bg-negative-soft hover:scale-115 active:scale-90 rounded-lg transition-all flex-shrink-0"
            title="Log out"
            aria-label="Log out"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
