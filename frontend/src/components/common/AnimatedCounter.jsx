// ============================================================
// components/common/AnimatedCounter.jsx — Dynamic Rolling Counter
// Rolls numbers up from 0 to target value with smooth ease-out physics.
// Formats integers with commas (e.g. 1,280) or floats if decimals exist.
// ============================================================

import React, { useEffect, useState } from "react";

export function AnimatedCounter({ target = 0, duration = 1200, prefix = "", suffix = "" }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Parse target number safely
    const numTarget = typeof target === "number" ? target : parseFloat(String(target).replace(/,/g, "")) || 0;
    if (numTarget === 0) {
      setCurrent(0);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.floor(easeProgress * numTarget);

      setCurrent(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(numTarget);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;

