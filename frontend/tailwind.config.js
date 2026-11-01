// ============================================================
// tailwind.config.js — Tailwind CSS configuration
// Configured according to design.md (SocialSync AI Design System):
// - IBM Plex Sans typography
// - Warm cream canvas (#f8f5f1), crisp white surfaces (#ffffff)
// - Deep wine brand accents (#7a2e2a / #61231f)
// - Blush highlight soft surfaces (#fff1f1)
// - Warm ink typography (#3b1f1d / #674c49)
// - Premium animations, shadows & micro-interaction tokens
// ============================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Outer app background
        canvas: "#f8f5f1",

        // Card & panel surfaces
        surface: {
          DEFAULT: "#ffffff",
          soft:    "#fff1f1", // Blush highlight for selected nav & badges
          muted:   "#fbf9f7",
        },

        // Text & ink hierarchy
        ink: {
          DEFAULT: "#3b1f1d", // Primary text & headings
          muted:   "#674c49", // Secondary text & descriptions
          subtle:  "#9a8280", // Placeholders & disabled text
        },

        // Brand colors (deep wine palette from design.md)
        brand: {
          DEFAULT: "#7a2e2a",
          hover:   "#61231f",
          active:  "#4e1a17",
          soft:    "#fff1f1",
          border:  "#7a2e2a",
        },

        // Borders & dividers
        line: {
          DEFAULT: "#e8dcda",
          muted:   "#f2e9e8",
        },

        // Status colors
        positive: {
          DEFAULT: "#176534",
          soft:    "#edf7ed",
          border:  "#b7e1cd",
        },
        caution: {
          DEFAULT: "#805000",
          soft:    "#fff8e6",
          border:  "#ffe082",
        },
        negative: {
          DEFAULT: "#a02525",
          soft:    "#fdeeed",
          border:  "#f5c6cb",
        },
      },

      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "-apple-system", "sans-serif"],
      },

      borderRadius: {
        card:    "1rem",     // 16px
        panel:   "1.75rem",  // 28px
        control: "0.75rem",  // 12px
      },

      boxShadow: {
        card: "0 1px 3px 0 rgba(59, 31, 29, 0.05), 0 1px 2px -1px rgba(59, 31, 29, 0.03)",
        elevated: "0 12px 30px -6px rgba(59, 31, 29, 0.08), 0 6px 12px -4px rgba(59, 31, 29, 0.04)",
        glow: "0 0 30px -4px rgba(122, 46, 42, 0.16)",
        "glow-sm": "0 0 16px -2px rgba(122, 46, 42, 0.10)",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.35s ease-out forwards",
        slideUp: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.3s ease-out forwards",
        float: "float 4.5s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },

  plugins: [],
};
