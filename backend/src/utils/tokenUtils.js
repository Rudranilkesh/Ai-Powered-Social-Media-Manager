// ============================================================
// utils/tokenUtils.js — JWT token generation utility
// Single place for creating JWT tokens.
// Both authController and authMiddleware use the same
// JWT_SECRET from .env — no inconsistency possible.
// ============================================================

import jwt from "jsonwebtoken";

// ── generateToken — creates a signed JWT for a user ──
// Payload contains userId and role so middleware can
// attach them to req.user without a DB query on every request
const generateToken = (userId, role) => {
  // Fail loudly at startup if JWT_SECRET is not configured
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

export { generateToken };
