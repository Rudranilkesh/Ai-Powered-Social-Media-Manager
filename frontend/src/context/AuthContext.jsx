// ============================================================
// context/AuthContext.jsx — Authentication Context & Provider
// Manages global authentication state, token persistence in
// localStorage, and provides login, register, and logout handlers.
// ============================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ── Synchronize authentication on initial mount ──
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getMe();
        if (response?.success && response.data?.user) {
          setUser(response.data.user);
          setToken(storedToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          throw new Error("Invalid profile response");
        }
      } catch (err) {
        // Token is invalid or expired
        console.warn("Session expired or invalid token:", err.message);
        authService.logout();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ── Login action ──
  const login = useCallback(async (email, password) => {
    const response = await authService.login({ email, password });
    if (response?.success && response.data) {
      const { user: loggedInUser, token: authToken } = response.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setToken(authToken);
      setUser(loggedInUser);
      return response.data;
    }
    throw new Error(response?.message || "Login failed");
  }, []);

  // ── Register action ──
  const register = useCallback(async (name, email, password) => {
    const response = await authService.register({ name, email, password });
    if (response?.success && response.data) {
      const { user: registeredUser, token: authToken } = response.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      setToken(authToken);
      setUser(registeredUser);
      return response.data;
    }
    throw new Error(response?.message || "Registration failed");
  }, []);

  // ── Logout action ──
  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume the AuthContext.
 * Throws an error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;

