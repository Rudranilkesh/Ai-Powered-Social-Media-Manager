// ============================================================
// hooks/useParallax.js — Scroll Position & Parallax Offset Hook
// Tracks viewport scroll depth to drive parallax background motion
// and live scroll progress bar indicators.
// ============================================================

import { useState, useEffect } from "react";

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollY(currentScroll);

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}

export default useParallax;

