// ============================================================
// validators/authValidator.js — Input validation for auth routes
// Uses express-validator to check incoming request data
// before it reaches the controller.
// If validation fails, a 400 error is returned immediately.
// ============================================================

import { body, validationResult } from "express-validator";

// ── validate — runs after validation rules and returns errors ──
// Call this as the last middleware in any validation chain
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// ── registerValidator — rules for POST /auth/register ──
// Checks name, email format, and password strength
const registerValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(), // Converts to lowercase and removes dots in Gmail

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),

  validate,
];

// ── loginValidator — rules for POST /auth/login ──
// Only checks that fields are present — detailed errors kept generic
// to avoid revealing whether an email exists in the system
const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),

  validate,
];

export { registerValidator, loginValidator };
