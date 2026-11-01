// ============================================================
// components/common/TiltCard.jsx — Interactive 3D Parallax Tilt Card
// Calculates cursor coordinates on hover to apply subtle 3D perspective
// tilt and dynamic cursor-following spotlight glare.
// ============================================================

import React, { useRef, useState } from "react";

export function TiltCard({ children, className = "", maxTilt = 6 }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotateY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlarePosition({ x: xPct, y: yPct, opacity: 0.12 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle 240px at ${glarePosition.x}% ${glarePosition.y}%, rgba(122, 46, 42, 0.25), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export default TiltCard;

