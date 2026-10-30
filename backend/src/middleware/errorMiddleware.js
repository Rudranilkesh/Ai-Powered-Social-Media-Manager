// ============================================================
// middleware/errorMiddleware.js — Centralized error utilities
//
// AppError   — Custom operational error class with HTTP status.
//              Throw this in controllers/services for known errors.
//
// asyncHandler — Wraps async route handlers to automatically
//                forward any thrown error to Express error handler,
//                eliminating repetitive try/catch blocks.
// ============================================================

// ── AppError — operational error with an HTTP status code ──
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Mark as operational so the global handler can distinguish
    // expected errors (validation, auth) from programming bugs
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ── asyncHandler — eliminates try/catch in every controller ──
// Wraps an async function and passes any rejection to next()
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { AppError, asyncHandler };
