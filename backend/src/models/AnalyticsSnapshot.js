// ============================================================
// Model: AnalyticsSnapshot
// Stores engagement metrics for published posts over time.
// A snapshot is taken periodically (e.g. daily) for each
// PostTarget to track how its performance changes.
// Multiple snapshots per PostTarget build a historical record.
// ============================================================

import mongoose from "mongoose";

// ── Schema definition — defines the shape of an analytics snapshot document ──
const analyticsSnapshotSchema = new mongoose.Schema(
  {
    // Reference to the published PostTarget this snapshot belongs to
    postTargetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostTarget",
      required: [true, "PostTarget ID is required"],
    },

    // Number of times the post was viewed
    // Null if the platform does not provide this metric
    views: {
      type: Number,
      default: null,
      min: 0,
    },

    // Number of likes or reactions on the post
    likes: {
      type: Number,
      default: null,
      min: 0,
    },

    // Number of comments on the post
    comments: {
      type: Number,
      default: null,
      min: 0,
    },

    // Number of times the post was shared or reposted
    shares: {
      type: Number,
      default: null,
      min: 0,
    },

    // The UTC timestamp when this snapshot was captured
    capturedAt: {
      type: Date,
      required: [true, "Capture time is required"],
      default: Date.now,
    },

    // The platform that provided this data (e.g. instagram, linkedin)
    source: {
      type: String,
      trim: true,
      required: [true, "Source platform is required"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Compound index — speeds up fetching analytics history for a post target ──
// Sorted descending so the most recent snapshot comes first
analyticsSnapshotSchema.index({ postTargetId: 1, capturedAt: -1 });

// ── Export the model ──
const AnalyticsSnapshot = mongoose.model("AnalyticsSnapshot", analyticsSnapshotSchema);
export default AnalyticsSnapshot;
