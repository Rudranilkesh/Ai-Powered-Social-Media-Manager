// ============================================================
// vite.config.js — Vite build tool configuration
// Sets up the React plugin and a development proxy so that
// /api requests are forwarded to the Express backend,
// avoiding CORS issues during local development.
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    // ── Dev proxy — forwards /api calls to Express backend ──
    // This means frontend can call /api/v1/... without CORS errors
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    // Output directory for production build
    outDir: "dist",
    // Generate source maps for debugging production builds
    sourcemap: false,
  },
});
