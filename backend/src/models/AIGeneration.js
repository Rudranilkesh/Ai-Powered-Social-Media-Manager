// ============================================================
// Model: AIGeneration
// Stores the history of AI content generation requests.
// Every time a user generates content using Gemini API,
// the prompt, output, and metadata are saved here.
// Can be optionally linked to a Post if the user used the output.
// ============================================================

import mongoose from "mongoose";

// ── Schema definition — defines the shape of an AI generation document ──
const aiGenerationSchema = new mongoose.Schema(
  {
    // Reference to the user who triggered this generation
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    // Optional reference to the post that used this generated content
    // Null if the user generated but did not save it as a post
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    // The input prompt the user provided to the AI
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
      trim: true,
      maxlength: [1000, "Prompt cannot exceed 1000 characters"],
    },

    // The social media platform for which content was generated
    // Affects the tone and length of the generated text
    platform: {
      type: String,
      trim: true,
      default: "general",
    },

    // The tone requested by the user (e.g. professional, casual, funny)
    tone: {
      type: String,
      trim: true,
      default: "neutral",
    },

    // The AI model used for this generation (e.g. gemini-pro)
    model: {
      type: String,
      required: [true, "Model name is required"],
      trim: true,
    },

    // The text output returned by the AI
    generatedText: {
      type: String,
      required: [true, "Generated text is required"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Index — speeds up fetching generation history for a specific user ──
aiGenerationSchema.index({ userId: 1, createdAt: -1 });

// ── Export the model ──
const AIGeneration = mongoose.model("AIGeneration", aiGenerationSchema);
export default AIGeneration;
