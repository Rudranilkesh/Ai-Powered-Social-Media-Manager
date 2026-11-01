// ============================================================
// components/layout/TopBar.jsx — Top Application Header
// Styled per design.md with dynamic scale micro-interactions:
// - Height: 64px (h-16)
// - Glassmorphic backdrop-blur
// - Primary action: "+ Create Post" with hover scale 1.05 & tactile press
// - Active status pulse indicator
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function TopBar({ onMenuClick, onSearchClick }) {
  const { user } = useAuth();

  return (
    <header className="h-16 glass-nav px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 transition-all duration-200">
      {/* Left: Mobile hamburger & Workspace heading */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-control text-ink hover:bg-surface-soft border border-line hover:scale-110 active:scale-90 transition-all shadow-xs cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-ink hidden sm:inline hover:text-brand transition-colors cursor-default">
            Workspace
          </span>
          <span className="text-ink-subtle hidden sm:inline">/</span>
          <span className="font-medium text-ink-muted">Overview</span>
        </div>
      </div>

      {/* Center: Command Palette Search Pill */}
      <button
        type="button"
        onClick={onSearchClick}
        className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-control border border-line bg-surface/80 hover:bg-surface text-xs text-ink-muted hover:text-ink hover:border-brand/40 transition-all duration-200 shadow-xs group cursor-pointer"
        title="Open Command Palette (Ctrl+K)"
      >
        <svg className="w-3.5 h-3.5 text-ink-subtle group-hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search or quick actions...</span>
        <kbd className="text-[10px] bg-canvas border border-line px-1.5 py-0.5 rounded text-ink-subtle font-mono group-hover:border-brand/40 group-hover:text-brand transition-colors">
          ⌘K
        </kbd>
      </button>

      {/* Right: Actions & User Info */}
      <div className="flex items-center gap-3">
        {/* Quick Create Post Action */}
        <Link
          to="/posts"
          className="btn-primary text-xs sm:text-sm py-2 px-3.5 sm:px-4 shadow-sm"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Create Post</span>
          <span className="sm:hidden">Create</span>
        </Link>

        {/* User Role Badge with Pulse */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-line hover:scale-105 transition-transform cursor-default">
          <span className="w-2 h-2 rounded-full bg-positive animate-ping" />
          <span className="text-xs text-ink-muted font-medium capitalize">
            {user?.role || "Creator"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
