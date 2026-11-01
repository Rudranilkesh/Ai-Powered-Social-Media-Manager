// ============================================================
// components/common/ConfettiCanvas.jsx — High-Performance Canvas Confetti
// Zero-dependency native HTML5 Canvas celebratory confetti burst
// Styled with SocialSync AI brand palette (Wine, Gold, Blush, Emerald)
// ============================================================

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const PALETTE = [
  "#7a2e2a", // Deep wine
  "#9b3834", // Wine light
  "#d97706", // Amber gold
  "#f59e0b", // Warm gold
  "#fff1f1", // Blush
  "#10b981", // Positive emerald
];

export const ConfettiCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameId = useRef(null);

  useImperativeHandle(ref, () => ({
    burst: (originX, originY, count = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const startX = originX !== undefined ? originX : window.innerWidth / 2;
      const startY = originY !== undefined ? originY : window.innerHeight / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 8;
        particlesRef.current.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: 5 + Math.random() * 6,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          gravity: 0.22,
          decay: 0.012 + Math.random() * 0.01,
        });
      }

      if (!animFrameId.current) {
        render();
      }
    },
  }));

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > canvas.height + 20) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
    }

    if (particles.length > 0) {
      animFrameId.current = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrameId.current = null;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
});

export default ConfettiCanvas;

