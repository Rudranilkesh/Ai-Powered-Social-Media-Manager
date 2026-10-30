// ============================================================
// postcss.config.js — PostCSS configuration
// Runs Tailwind CSS and Autoprefixer as PostCSS plugins.
// Vite automatically picks this file up during builds.
// ============================================================

export default {
  plugins: {
    // Processes Tailwind utility classes
    tailwindcss: {},
    // Adds vendor prefixes for cross-browser CSS compatibility
    autoprefixer: {},
  },
};
