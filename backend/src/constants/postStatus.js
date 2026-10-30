// ============================================================
// constants/postStatus.js — Post and scheduling status enums
// Single source of truth for all status string values used
// in Post, PostTarget, and ScheduleJob models.
// Import these constants instead of using raw strings.
// ============================================================

// ── Post lifecycle statuses ──
const POST_STATUS = Object.freeze({
  DRAFT:               "draft",               // Saved but not ready to publish
  READY:               "ready",               // Approved and ready to schedule
  SCHEDULED:           "scheduled",           // At least one target is queued
  PARTIALLY_PUBLISHED: "partially_published", // Some targets published, some failed
  PUBLISHED:           "published",           // All targets successfully published
  FAILED:              "failed",              // All targets failed
  CANCELLED:           "cancelled",           // Manually cancelled by user
});

// ── ScheduleJob lifecycle statuses ──
const JOB_STATUS = Object.freeze({
  QUEUED:      "queued",      // Waiting to be picked up by the worker
  RUNNING:     "running",     // Currently being processed
  SUCCEEDED:   "succeeded",   // Published successfully
  RETRY_WAIT:  "retry_wait",  // Waiting before next retry attempt
  FAILED:      "failed",      // Exhausted all retry attempts
  CANCELLED:   "cancelled",   // Manually cancelled before execution
});

export { POST_STATUS, JOB_STATUS };
