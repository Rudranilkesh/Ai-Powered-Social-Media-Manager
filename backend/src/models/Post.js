// ============================================================
// Model: Post
// Stores social media posts created by users.
// A post contains the content (caption, media) and its status.
// One post can target multiple platforms via PostTarget documents.
// ============================================================

import mongoose from "mongoose";
import { POST_STATUS } from "../constants/postStatus.js";

// ── Schema definition — defines the shape of a post document ──
const postSchema = new mongoose.Schema(
  {
    // Reference to the user who created this post
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // The main text content of the post
    caption: {
      type: String,
      trim: true,
      maxlength: [2200, "Caption cannot exceed 2200 characters"],
      default: "",
    },

    // List of hashtags associated with the post
    hashtags: {
      type: [String],
      default: [],
    },

    // Cloudinary URLs of uploaded images or videos
    mediaUrls: {
      type: [String],
      default: [],
    },

    // Current lifecycle status of the post
    status: {
      type: String,
      enum: Object.values(POST_STATUS),
      default: POST_STATUS.DRAFT,
    },

    // Optional reference to the AI generation that created this content
    // Null if the user wrote the content manually
    aiGenerationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIGeneration",
      default: null,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Compound index — speeds up fetching all posts for a user sorted by date ──
postSchema.index({ userId: 1, createdAt: -1 });

// ── Index — speeds up filtering posts by their current status ──
postSchema.index({ userId: 1, status: 1 });

// ── Export the model ──
const Post = mongoose.model("Post", postSchema);
export default Post;
