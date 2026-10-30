// ============================================================
// services/api.js — Central Axios HTTP client
// Creates a pre-configured Axios instance that:
//   1. Points to the backend API base URL from .env
//   2. Automatically attaches JWT token to every request
//   3. Handles 401 responses by clearing auth state
// Import `api` in any service file instead of raw axios.
// ============================================================

import axios from "axios";

// Base URL comes from .env — falls back to Vite proxy path
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api/v1";

// ── Create Axios instance with default config ──
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 second request timeout
});

// ── Request interceptor — attach JWT token to every request ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle auth errors globally ──
api.interceptors.response.use(
  // Pass successful responses through unchanged
  (response) => response,

  (error) => {
    // If the server returns 401, the token is invalid or expired
    if (error.response?.status === 401) {
      // Clear stored credentials
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Forward the error so individual callers can handle it
    return Promise.reject(error);
  }
);

export default api;
