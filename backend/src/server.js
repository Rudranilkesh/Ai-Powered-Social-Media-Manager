// ============================================================
// server.js — Application entry point
// Loads environment variables, connects to MongoDB,
// then starts the Express HTTP server.
// ============================================================

import "dotenv/config";
import { createApp } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// ── Start server only after DB connection is established ──
const startServer = async () => {
  await connectDB();

  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log("=========================================");
    console.log("🚀  SocialSync AI — Backend Server");
    console.log(`📡  Port    : ${PORT}`);
    console.log(`🌍  Env     : ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗  Health  : http://localhost:${PORT}/api/v1/health`);
    console.log("=========================================");
  });

  // ── Graceful shutdown on termination signals ──
  const shutdown = (signal) => {
    console.log(`\n⚠️  ${signal} received — shutting down gracefully...`);
    server.close(() => {
      console.log("✅  HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer();
