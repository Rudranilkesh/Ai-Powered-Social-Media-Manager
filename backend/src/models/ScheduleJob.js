// ============================================================
// Model: ScheduleJob
// Stores scheduled publishing jobs in the database.
// The background worker (schedulerJob.js) polls this collection
// to find jobs that are due and publishes them.
// Storing jobs in DB ensures they survive server restarts.
// ============================================================

import mongoose from "mongoose";
import { JOB_STATUS } from "../constants/postStatus.js";

// ── Schema definition — defines the shape of a schedule job document ──
const scheduleJobSchema = new mongoose.Schema(
  {
    // Reference to the PostTarget this job will publish
    postTargetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostTarget",
      required: [true, "PostTarget ID is required"],
    },

    // The exact UTC date and time when this job should be executed
    scheduledFor: {
      type: Date,
      required: [true, "Scheduled time is required"],
    },

    // Current status of this job in the queue
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.QUEUED,
    },

    // Number of times this job has been attempted
    // Used to enforce the maximum retry limit
    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Maximum number of times to retry before marking as failed
    maxAttempts: {
      type: Number,
      default: 3,
    },

    // The UTC time when the next retry attempt should be made
    // Null if the job has not failed yet
    nextAttemptAt: {
      type: Date,
      default: null,
    },

    // Unique key to prevent the same job from running more than once
    // Prevents duplicate publishes if the worker crashes and restarts
    idempotencyKey: {
      type: String,
      required: [true, "Idempotency key is required"],
      unique: true,
    },

    // Short error message from the last failed attempt
    // Used for debugging and displaying error info to the user
    lastError: {
      type: String,
      default: null,
      maxlength: 500,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── Compound index — used by the worker to efficiently find due jobs ──
// Queries: "find all queued or retry_wait jobs where nextAttemptAt <= now"
scheduleJobSchema.index({ status: 1, nextAttemptAt: 1 });

// ── Index — speeds up fetching jobs for a specific post target ──
scheduleJobSchema.index({ postTargetId: 1 });

// ── Export the model ──
const ScheduleJob = mongoose.model("ScheduleJob", scheduleJobSchema);
export default ScheduleJob;
