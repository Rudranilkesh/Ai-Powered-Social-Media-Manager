// ============================================================
// controllers/authController.js — Authentication logic
// Handles user registration, login, and profile retrieval.
// Uses asyncHandler so no try/catch blocks are needed.
// AuditLog entries are created for every auth event.
// ============================================================

import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";
import { generateToken } from "../utils/tokenUtils.js";
import { AppError, asyncHandler } from "../middleware/errorMiddleware.js";

// ── buildSafeUser — removes sensitive fields before sending response ──
// Never send password, __v, or internal fields to the client
const buildSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

// ── createAuditEntry — saves an audit log record silently ──
// If audit logging fails, we log the error but do not
// break the main request — auth should still succeed
const createAuditEntry = async (actorId, action, metadata = {}) => {
  try {
    await AuditLog.create({
      actorId,
      action,
      entityType: "User",
      entityId: actorId,
      timestamp: new Date(),
      metadata, // Must never contain passwords or tokens
    });
  } catch (err) {
    // Log internally but do not expose to client
    console.error(`⚠️  AuditLog failed for action "${action}":`, err.message);
  }
};

// ============================================================
// POST /api/v1/auth/register
// Creates a new user account with the default "creator" role.
// Password is hashed by the User model's pre-save hook.
// Returns a JWT and the safe user profile on success.
// ============================================================
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if this email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("An account with this email already exists", 400);
  }

  // Create the user — password hashing is done by the pre-save hook in User.js
  // Do NOT hash the password here — that would double-hash it
  const user = await User.create({ name, email, password });

  // Generate JWT token with the new user's id and role
  const token = generateToken(user._id, user.role);

  // Record the registration in the audit log
  // Metadata must never include the password or token
  await createAuditEntry(user._id, "user.registered", { email: user.email });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      user: buildSafeUser(user),
      token,
    },
  });
});

// ============================================================
// POST /api/v1/auth/login
// Authenticates an existing user with email and password.
// Returns a JWT and safe user profile on success.
// Uses a generic error message to avoid revealing
// whether the email exists in the system.
// ============================================================
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Explicitly select password — it has select:false in the schema
  const user = await User.findOne({ email }).select("+password");

  // Use a single generic message for both "user not found" and "wrong password"
  // This prevents attackers from enumerating registered emails
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  // Block login for deactivated accounts
  if (!user.isActive) {
    throw new AppError("Your account has been deactivated. Please contact support.", 403);
  }

  // Generate JWT token
  const token = generateToken(user._id, user.role);

  // Record the login in the audit log
  await createAuditEntry(user._id, "user.login", { email: user.email });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: buildSafeUser(user),
      token,
    },
  });
});

// ============================================================
// GET /api/v1/auth/me
// Returns the profile of the currently authenticated user.
// Protected by authMiddleware — req.user is already verified.
// Password and sensitive fields are never included.
// ============================================================
const getMe = asyncHandler(async (req, res) => {
  // req.user.id is set by authMiddleware after JWT verification
  const user = await User.findById(req.user.id);

  // Handle edge case where user was deleted after token was issued
  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  // Block access for deactivated accounts even with a valid token
  if (!user.isActive) {
    throw new AppError("Your account has been deactivated", 403);
  }

  res.status(200).json({
    success: true,
    data: {
      user: buildSafeUser(user),
    },
  });
});

export { register, login, getMe };
