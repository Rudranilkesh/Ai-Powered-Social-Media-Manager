// ============================================================
// pages/auth/RegisterPage.jsx — User Registration Page
// Allows new users to create an account with default "creator" role.
// Validates name, email, password rules, and password confirmation.
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Input change handler ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  // ── Password requirement checks ──
  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };

  // ── Client-side validation matching backend rules ──
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name cannot exceed 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      // Successful registration signs user in and issues JWT
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const apiMessage =
        err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setServerError(apiMessage);

      // Handle validation error array from express-validator
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
            Create your account
          </h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Start automating your social media with AI
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

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ritam Chatterjee"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`input ${
                  errors.name ? "border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-400 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
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
                <p id="email-error" className="text-xs text-red-400 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby="password-rules"
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
                <p className="text-xs text-red-400 mt-1">{errors.password}</p>
              )}

              {/* Password Requirement Checklist */}
              <div id="password-rules" className="mt-2 text-xs text-slate-400 space-y-1 pl-1">
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordCriteria.minLength ? "text-green-400" : "text-slate-500"
                  }`}
                >
                  <span>{passwordCriteria.minLength ? "✓" : "○"}</span>
                  <span>Minimum 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordCriteria.hasUpper ? "text-green-400" : "text-slate-500"
                  }`}
                >
                  <span>{passwordCriteria.hasUpper ? "✓" : "○"}</span>
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordCriteria.hasNumber ? "text-green-400" : "text-slate-500"
                  }`}
                >
                  <span>{passwordCriteria.hasNumber ? "✓" : "○"}</span>
                  <span>At least one number (0-9)</span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-200 mb-1.5"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                className={`input ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p id="confirm-error" className="text-xs text-red-400 mt-1">
                  {errors.confirmPassword}
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
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create account</span>
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="mt-6 pt-5 border-t border-surface-border text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;

