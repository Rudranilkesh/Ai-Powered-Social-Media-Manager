// ============================================================
// Model: SocialAccount
// Stores connected social media accounts for each user.
// One user can connect multiple accounts across platforms.
// Access tokens are stored encrypted — never as plain text.
// ============================================================

import mongoose from "mongoose";
import { PLATFORM_VALUES, ACCOUNT_STATUS } from "../constants/platformTypes.js";

// ── Schema definition — defines the shape of a social account document ──
const socialAccountSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this connected account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // The social media platform this account belongs to
    // Must be one of the supported platform values
    provider: {
      type: String,
      enum: PLATFORM_VALUES,
      required: [true, "Provider is required"],
    },

    // The unique account ID assigned by the social media platform
    providerAccountId: {
      type: String,
      required: [true, "Provider account ID is required"],
      trim: true,
    },

    // Display name shown in the UI (e.g. Instagram username)
    displayName: {
      type: String,
      trim: true,
      default: "",
    },

    // Profile picture URL from the social platform
    avatarUrl: {
      type: String,
      default: "",
    },

    // Encrypted OAuth tokens — never stored as plain text
    // Encrypted using ENCRYPTION_KEY from .env before saving
    encryptedCredentials: {
      type: String,
      required: [true, "Encrypted credentials are required"],
      select: false, // Never returned in API responses
    },

    // Current connection status of this account
    status: {
      type: String,
      enum: Object.values(ACCOUNT_STATUS),
      default: ACCOUNT_STATUS.CONNECTED,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Compound index — ensures a user cannot connect the same account twice ──
// Also speeds up queries filtering by userId and provider together
socialAccountSchema.index(
  { userId: 1, provider: 1, providerAccountId: 1 },
  { unique: true }
);

// ── Index — speeds up queries that fetch all accounts for a user ──
socialAccountSchema.index({ userId: 1 });

// ── Export the model ──
const SocialAccount = mongoose.model("SocialAccount", socialAccountSchema);
export default SocialAccount;
