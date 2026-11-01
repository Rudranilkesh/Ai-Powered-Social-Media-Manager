// ============================================================
// components/common/AmbientSpotlight.jsx — Ambient Cursor Spotlight
// Smooth radial torch following cursor coordinates across the screen.
// Creates a luxurious Apple / Linear style atmospheric depth glow.
// ============================================================

import React, { useEffect, useState } from "react";

export function AmbientSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame to avoid unnecessary re-renders on high-frequency mice
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ease-out"
      style={{
        background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, rgba(122, 46, 42, 0.055), rgba(217, 119, 6, 0.02) 40%, transparent 75%)`,
      }}
      aria-hidden="true"
    />
  );
}

export default AmbientSpotlight;

