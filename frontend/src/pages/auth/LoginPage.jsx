// ============================================================
// pages/auth/LoginPage.jsx — User Login Page
// Allows creators and administrators to authenticate with email & password.
// Performs client-side validation and displays server-side error messages.
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Input change handler ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  // ── Client-side validation ──
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Form submission handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email.trim(), formData.password);
      // Redirect to target path or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      const apiMessage =
        err.response?.data?.message || err.message || "Failed to log in. Please try again.";
      setServerError(apiMessage);

      // If backend validation returned specific field errors
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const fieldErrors = {};
        err.response.data.errors.forEach((e) => {
          if (e.field) fieldErrors[e.field] = e.message;
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface text-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <span className="text-2xl font-extrabold text-primary-400 group-hover:text-primary-300 transition-colors">
              SocialSync AI
            </span>
            <span className="text-xl">🚀</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Log in to manage and automate your social media
          </p>
        </div>

        {/* Form Card */}
        <div className="card shadow-2xl">
          {/* Server Error Alert Banner */}
          {serverError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-sm flex items-start gap-3"
            >
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`input ${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-400 mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-200"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`input pr-11 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-red-400 mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6 py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="mt-6 pt-5 border-t border-surface-border text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

