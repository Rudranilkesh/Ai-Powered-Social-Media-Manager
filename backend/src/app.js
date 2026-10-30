// ============================================================
// app.js — Express application factory
// Configures middleware (CORS, body parsing, rate limiting),
// mounts all API routes, and registers error handlers.
// ============================================================

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

// ── Route imports (uncomment each as the module is built) ──
// import authRoutes       from "./routes/authRoutes.js";
// import userRoutes       from "./routes/userRoutes.js";
// import postRoutes       from "./routes/postRoutes.js";
// import aiRoutes         from "./routes/aiRoutes.js";
// import socialRoutes     from "./routes/socialRoutes.js";
// import uploadRoutes     from "./routes/uploadRoutes.js";
// import analyticsRoutes  from "./routes/analyticsRoutes.js";

export function createApp() {
  const app = express();

  // ── CORS — allow requests only from the configured frontend origin ──
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    })
  );

  // ── Body parsers ──
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // ── Global rate limiter — 100 requests per 15 minutes per IP ──
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later.",
    },
  });
  app.use("/api", globalLimiter);

  // ── Health check — used by deployment platforms and CI ──
  app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
      success: true,
      status: "ok",
      message: "SocialSync AI API is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // ── API routes (uncomment as each module is implemented) ──
  // app.use("/api/v1/auth",       authRoutes);
  // app.use("/api/v1/users",      userRoutes);
  // app.use("/api/v1/posts",      postRoutes);
  // app.use("/api/v1/ai",         aiRoutes);
  // app.use("/api/v1/connections", socialRoutes);
  // app.use("/api/v1/upload",     uploadRoutes);
  // app.use("/api/v1/analytics",  analyticsRoutes);

  // ── 404 handler — catches any unmatched route ──
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
    });
  });

  // ── Global error handler — catches errors forwarded via next(err) ──
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Do not leak stack traces in production
    const response = {
      success: false,
      message,
    };

    if (process.env.NODE_ENV === "development") {
      response.stack = err.stack;
    }

    console.error(`❌  [${req.method}] ${req.originalUrl} → ${statusCode}: ${message}`);
    res.status(statusCode).json(response);
  });

  return app;
}
