// ============================================================
// Model: AuditLog
// Records important user and system actions for security
// and debugging purposes.
// Examples: user login, post published, account connected,
// password changed, admin action performed.
// Audit logs are write-only — never modified after creation.
// ============================================================

import mongoose from "mongoose";

// ── Schema definition — defines the shape of an audit log document ──
const auditLogSchema = new mongoose.Schema(
  {
    // Reference to the user who performed the action
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Actor ID is required"],
    },

    // A short string describing what action was performed
    // Use consistent naming: "user.login", "post.created", "account.connected"
    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
    },

    // The type of entity that was affected by this action
    // Examples: "Post", "SocialAccount", "User"
    entityType: {
      type: String,
      trim: true,
      default: null,
    },

    // The ID of the specific entity that was affected
    // Null if the action does not target a specific document
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // The exact UTC time this action occurred
    timestamp: {
      type: Date,
      required: [true, "Timestamp is required"],
      default: Date.now,
    },

    // Additional context about the action — stored as a flexible object
    // Must never contain passwords, tokens, or sensitive credentials
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Index — speeds up fetching audit history for a specific user ──
auditLogSchema.index({ actorId: 1, timestamp: -1 });

// ── Index — speeds up filtering logs by action type ──
auditLogSchema.index({ action: 1 });

// ── Export the model ──
const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
