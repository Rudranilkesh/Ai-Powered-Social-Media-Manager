// ============================================================
// components/common/ScrollProgressBar.jsx — Scroll Depth Indicator
// A subtle, sleek brand gradient line at the top of the viewport
// that dynamically fills as the user scrolls down.
// ============================================================

import React from "react";
import { useParallax } from "../../hooks/useParallax.js";

export function ScrollProgressBar() {
  const { scrollProgress } = useParallax();

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand via-brand-hover to-brand transition-all duration-75 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

export default ScrollProgressBar;

