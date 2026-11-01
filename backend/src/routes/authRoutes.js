// ============================================================
// routes/authRoutes.js — Authentication API routes
// Defines the three auth endpoints and applies the correct
// validators and middleware to each one.
// Base path: /api/v1/auth (registered in app.js)
// ============================================================

import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// ── POST /api/v1/auth/register ──
// Validates input first, then creates a new user account
router.post("/register", registerValidator, register);

// ── POST /api/v1/auth/login ──
// Validates input first, then authenticates the user
router.post("/login", loginValidator, login);

// ── GET /api/v1/auth/me ──
// Protected route — JWT must be valid to reach getMe
router.get("/me", protect, getMe);

export default router;
