// ============================================================
// components/common/LoadingPreloader.jsx — Branded Creative Pre-loader
// Provides an elegant, premium pre-loading experience during
// session validation and route transitions.
// ============================================================

import React from "react";

export function LoadingPreloader({ message = "Initializing SocialSync AI..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-canvas flex flex-col items-center justify-center relative overflow-hidden select-none p-6"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulseGlow" />
      <div className="absolute w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10 animate-pulseGlow" />

      <div className="relative z-10 flex flex-col items-center max-w-xs text-center space-y-6 animate-fadeIn">
        {/* Pulsing Branded Logo Mark */}
        <div className="relative">
          {/* Animated halo */}
          <div className="absolute -inset-2 rounded-2xl bg-brand/15 blur-sm animate-pulseGlow" />
          
          <div className="relative w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center font-bold text-2xl shadow-elevated">
            S
          </div>

          {/* Orbiting accent dot */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-hover rounded-full border-2 border-canvas animate-ping" />
        </div>

        {/* Brand Title & Status */}
        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-ink tracking-tight">SocialSync AI</h2>
          <p className="text-xs text-ink-muted animate-pulse">{message}</p>
        </div>

        {/* Creative Shimmer Progress Bar */}
        <div className="w-48 h-1 bg-line rounded-full overflow-hidden relative">
          <div className="h-full bg-brand rounded-full w-2/5 absolute animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPreloader;

