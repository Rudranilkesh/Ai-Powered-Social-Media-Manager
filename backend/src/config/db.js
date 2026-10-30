// ============================================================
// config/db.js — MongoDB connection
// Uses Mongoose to connect to MongoDB Atlas.
// Called once at server startup before the HTTP server starts.
// ============================================================

import mongoose from "mongoose";

const connectDB = async () => {
  // ── Guard — warn clearly if MONGODB_URI is not configured yet ──
  if (
    !process.env.MONGODB_URI ||
    process.env.MONGODB_URI === "your_mongodb_atlas_connection_string_here"
  ) {
    console.warn("⚠️  MONGODB_URI is not set in .env — skipping DB connection.");
    console.warn("    Add your MongoDB Atlas URI to backend/.env and restart.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅  MongoDB Connected: ${conn.connection.host}`);

    // ── Log when connection is lost ──
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected.");
    });

    // ── Log when connection is re-established ──
    mongoose.connection.on("reconnected", () => {
      console.log("✅  MongoDB reconnected.");
    });
  } catch (error) {
    console.error(`❌  MongoDB Connection Error: ${error.message}`);
    // Exit process — server cannot run without a database
    process.exit(1);
  }
};

export default connectDB;
