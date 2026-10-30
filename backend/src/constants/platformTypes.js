// ============================================================
// constants/platformTypes.js — Supported social media platforms
// Single source of truth for platform identifiers used in
// SocialAccount and PostTarget models.
// Import these constants instead of using raw strings.
// ============================================================

// ── Supported social media platforms ──
const PLATFORMS = Object.freeze({
  INSTAGRAM: "instagram",
  FACEBOOK:  "facebook",
  LINKEDIN:  "linkedin",
  TWITTER:   "twitter",
});

// ── Array of all supported platform values ──
// Useful for Mongoose enum validation
const PLATFORM_VALUES = Object.values(PLATFORMS);

// ── SocialAccount connection statuses ──
const ACCOUNT_STATUS = Object.freeze({
  CONNECTED:    "connected",    // OAuth token is valid and active
  EXPIRED:      "expired",      // Token has expired and needs refresh
  DISCONNECTED: "disconnected", // User manually disconnected the account
});

export { PLATFORMS, PLATFORM_VALUES, ACCOUNT_STATUS };
