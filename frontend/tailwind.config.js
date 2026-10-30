// ============================================================
// tailwind.config.js — Tailwind CSS configuration
// Defines which files Tailwind scans for class names and
// sets up the base theme with project-specific colors.
// ============================================================

/** @type {import('tailwindcss').Config} */
export default {
  // ── Content paths — Tailwind scans these for used class names ──
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      // ── Brand color palette ──
      colors: {
        primary: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        surface: {
          DEFAULT: "#0f172a",  // Main dark background
          card:    "#1e293b",  // Card / panel background
          border:  "#334155",  // Border color
        },
      },

      // ── Font family ──
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },

  plugins: [],
};
