// ============================================================
// middleware/authMiddleware.js — JWT authentication guard
// Extracts and verifies the Bearer token from the
// Authorization header. Attaches decoded user to req.user.
// Usage: apply `protect` to any route that requires login.
// ============================================================

import jwt from "jsonwebtoken";
import { AppError } from "./errorMiddleware.js";

// ── protect — verifies JWT and attaches user payload to req ──
const protect = (req, res, next) => {
  try {
    // Extract token from "Authorization: Bearer <token>" header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Not authorized — no token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    // Verify token signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload (id, role, iat, exp) to request
    req.user = decoded;

    next();
  } catch (error) {
    // Handle expired or malformed tokens
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Not authorized — token has expired", 401));
    }
    return next(new AppError("Not authorized — token is invalid", 401));
  }
};

// ── restrictTo — role-based access control guard ──
// Usage: router.delete("/...", protect, restrictTo("admin"), handler)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

export { protect, restrictTo };
