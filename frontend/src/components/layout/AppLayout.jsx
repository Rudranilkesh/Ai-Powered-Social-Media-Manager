// ============================================================
// components/layout/AppLayout.jsx — Main Authenticated App Layout
// Houses permanent desktop sidebar (260px), sticky TopBar,
// accessible mobile drawer, and main scrollable content canvas.
// ============================================================

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { TopBar } from "./TopBar.jsx";
import { ScrollProgressBar } from "../common/ScrollProgressBar.jsx";
import { AmbientSpotlight } from "../common/AmbientSpotlight.jsx";
import { CommandPalette } from "../common/CommandPalette.jsx";

export function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-canvas text-ink flex relative overflow-x-hidden w-full max-w-full">
      {/* Ambient Cursor Torch Spotlight */}
      <AmbientSpotlight />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={setCommandPaletteOpen}
      />

      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* ── Permanent Desktop Sidebar (hidden on mobile) ── */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <Sidebar />
      </div>

      {/* ── Mobile Sidebar Drawer & Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-surface h-full shadow-2xl z-50">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main Content Area (Protected against horizontal overflow) ── */}
      <div className="md:pl-64 flex flex-col flex-1 min-w-0 overflow-x-hidden max-w-full">
        <TopBar
          onMenuClick={() => setMobileOpen(true)}
          onSearchClick={() => setCommandPaletteOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

