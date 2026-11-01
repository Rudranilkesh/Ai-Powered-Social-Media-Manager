// ============================================================
// hooks/useScrollReveal.js — Scroll Reveal Intersection Observer
// Observes elements as they enter the viewport and triggers
// smooth, staggered entrance animations on scroll.
// ============================================================

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect when an element scrolls into view.
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useScrollReveal(options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, keep visible (unobserve)
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

export default useScrollReveal;

