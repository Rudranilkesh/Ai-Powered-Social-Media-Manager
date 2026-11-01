# SocialSync AI — Changelog

All notable changes to this project are documented here.
Format: `[version] — date — description`

---

## [0.1.0] — 2026-11-01 — Initial Setup

### Added
- Full project folder structure (frontend + backend + docs)
- Root `.gitignore`, `README.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitattributes`
- **Backend boilerplate:**
  - `package.json` with all dependencies
  - `src/server.js` — entry point with graceful shutdown
  - `src/app.js` — Express app, CORS, rate limiting, health check `/api/v1/health`
  - `src/config/db.js` — MongoDB connection with placeholder guard
  - `src/middleware/authMiddleware.js` — JWT protect + restrictTo
  - `src/middleware/errorMiddleware.js` — AppError class + asyncHandler
  - `src/constants/postStatus.js` — POST_STATUS, JOB_STATUS enums
  - `src/constants/platformTypes.js` — PLATFORMS, ACCOUNT_STATUS enums
- **Frontend boilerplate:**
  - `package.json` with all dependencies
  - `vite.config.js` — React plugin + dev proxy
  - `tailwind.config.js` — brand colors + fonts
  - `postcss.config.js` — Tailwind + autoprefixer
  - `index.html` — HTML entry point
  - `src/main.jsx` — React + BrowserRouter
  - `src/App.jsx` — route structure (routes commented, ready to activate)
  - `src/index.css` — Tailwind directives + reusable utility classes
  - `src/services/api.js` — Axios instance + JWT interceptor
- **Empty scaffold files** created for all models, controllers, routes, services, validators
- Documentation structure set up in `docs/`
- GitHub repo initialized, `dev` branch active
- npm packages installed on both frontend and backend

### Team
- Ritam — Project lead, backend foundation
- Rudranil — Frontend setup
- Sagnik — Feature planning

---

*Add new entries at the top whenever features are added, changed, or fixed.*
