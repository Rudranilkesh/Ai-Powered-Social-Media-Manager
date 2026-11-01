// ============================================================
// Model: PostTarget
// Represents one publishing destination for a post.
// A single post can have multiple PostTargets — one per platform.
// Each target tracks its own publishing status independently.
// Example: same post → Instagram (published), LinkedIn (failed)
// ============================================================

import mongoose from "mongoose";

// ── Allowed status values for a single publish attempt ──
const TARGET_STATUS = Object.freeze({
  PENDING:   "pending",   // Waiting to be scheduled or published
  PUBLISHED: "published", // Successfully published on this platform
  FAILED:    "failed",    // Publishing failed after all retry attempts
  CANCELLED: "cancelled", // Cancelled before publishing
});

// ── Schema definition — defines the shape of a post target document ──
const postTargetSchema = new mongoose.Schema(
  {
    // Reference to the parent post this target belongs to
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },

    // Reference to the social account this post will be published to
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialAccount",
      required: [true, "Account ID is required"],
    },

    // Current publishing status for this specific platform
    status: {
      type: String,
      enum: Object.values(TARGET_STATUS),
      default: TARGET_STATUS.PENDING,
    },

    // The ID assigned by the social platform after successful publishing
    // Null until the post is actually published
    providerPostId: {
      type: String,
      default: null,
    },

    // The exact UTC time when this post was published successfully
    // Null until publishing succeeds
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Compound index — prevents the same post from targeting the same account twice ──
postTargetSchema.index({ postId: 1, accountId: 1 }, { unique: true });

// ── Index — speeds up fetching all targets for a specific post ──
postTargetSchema.index({ postId: 1 });

// ── Export TARGET_STATUS so other files can use these values ──
export { TARGET_STATUS };

// ── Export the model ──
const PostTarget = mongoose.model("PostTarget", postTargetSchema);
export default PostTarget;
