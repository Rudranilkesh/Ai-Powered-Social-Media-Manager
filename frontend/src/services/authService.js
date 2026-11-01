// ============================================================
// services/authService.js — Authentication API service
// Encapsulates all auth-related HTTP calls to the backend.
// Uses the pre-configured Axios instance from api.js.
// ============================================================

import api from "./api.js";

/**
 * Register a new user account.
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} API response data with user and token
 */
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/**
 * Authenticate an existing user with email and password.
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} API response data with user and token
 */
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Retrieve the current authenticated user's profile.
 * Bearer token is automatically attached by the api.js request interceptor.
 * @returns {Promise<Object>} API response data with safe user object
 */
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

/**
 * Log out user by clearing credentials from localStorage.
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  getMe,
  logout,
};

export default authService;

