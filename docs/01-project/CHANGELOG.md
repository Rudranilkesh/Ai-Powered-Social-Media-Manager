# SocialSync AI — Changelog

All notable changes to this project are documented here.
Format: `[version] — date — description`

---

## [0.5.0] — 2026-11-01 — Dashboard Layout & Design System (Task T05)

### Added
- `frontend/src/components/layout/Sidebar.jsx` — Desktop permanent sidebar (260px) and mobile drawer with brand header, workspace navigation (`Dashboard`, `AI Studio`, `Posts`, `Calendar`, `Accounts`, `Analytics`), active route indicator with blush highlight (`#fff1f1`), and user profile/logout footer.
- `frontend/src/components/layout/TopBar.jsx` — Responsive top bar with mobile menu trigger, workspace breadcrumb, quick `+ Create Post` primary action, and active status indicator.
- `frontend/src/components/layout/AppLayout.jsx` — Main authenticated layout integrating sidebar, top bar, accessible mobile drawer with backdrop blur, and scrollable content area.
- `frontend/src/pages/dashboard/DashboardPage.jsx` — Main creator dashboard implemented per `design.md` Section 4.7:
  - Dynamic time-based greeting ("Good morning / afternoon / evening") with creator name.
  - Quick action buttons (Create Post, AI Studio).
  - 4 KPI metric cards (Total Posts, Scheduled, Published, AI Generations).
  - Upcoming scheduled posts feed with accessible empty state and calendar link.
  - Connected accounts summary with multi-platform readiness indicators.
  - Workspace Quick Start onboarding guide.
- `frontend/src/components/common/AmbientSpotlight.jsx` — Smooth radial cursor torch tracking mouse coordinates across the app with warm wine & amber depth.
- `frontend/src/components/common/AnimatedCounter.jsx` — Rolling numbers component with ease-out cubic interpolation for dynamic KPI metric rollups.
- `frontend/src/components/common/CommandPalette.jsx` — Spotlight command palette with global `Ctrl+K` / `Cmd+K` keyboard shortcut, fuzzy action search, and keyboard arrow navigation.
- `frontend/src/components/common/LivePostPreviewer.jsx` — Interactive smartphone mockup widget simulating real-time rendering across Instagram, LinkedIn, Twitter/X, and Facebook with interactive like counter.
- `frontend/src/components/common/ConfettiCanvas.jsx` — Native HTML5 Canvas confetti engine firing celebratory brand particle bursts upon completing onboarding checklist items.
- Added route placeholders in `App.jsx` for `/ai`, `/posts`, `/calendar`, `/accounts`, `/analytics`, and `/settings`.

### Changed
- Aligned UI design system with `design.md`:
  - `frontend/index.html` — Configured Google Font `IBM Plex Sans`.
  - `frontend/tailwind.config.js` — Implemented semantic tokens (`canvas: #f8f5f1`, `surface: #ffffff`, `surface.soft: #fff1f1`, `ink: #3b1f1d`, `brand: #7a2e2a`, `line: #e8dcda`).
  - `frontend/src/index.css` — Configured global base styles, button classes (`btn-primary`, `btn-secondary`, `btn-ghost`), `card`, `input`, and accessible focus indicators.
  - `LoginPage.jsx` & `RegisterPage.jsx` — Updated to warm cream canvas with white card and wine brand styling.
  - `docs/04-design/DESIGN_SYSTEM.md` — Synchronized with `design.md`.

---

## [0.4.0] — 2026-11-01 — Authentication Frontend (Task T04)

### Added
- `frontend/src/services/authService.js` — Axios wrapper service for `register`, `login`, `getMe`, and `logout` operations.
- `frontend/src/context/AuthContext.jsx` — Global authentication context & provider with session restore (`getMe` on mount), `localStorage` JWT synchronization, and `useAuth` hook.
- `frontend/src/components/auth/ProtectedRoute.jsx` — Route guard redirecting unauthenticated users to `/login` with return location state and accessible loading status.
- `frontend/src/components/auth/PublicRoute.jsx` — Route guard redirecting authenticated users away from `/login` and `/register` to `/dashboard`.
- `frontend/src/pages/auth/LoginPage.jsx` — Login form with client validation, server error alerts, password show/hide toggle, loading spinner, and signup link.
- `frontend/src/pages/auth/RegisterPage.jsx` — Registration form with client validation matching backend rules (name max 100, valid email, password with min 8 chars, uppercase, number, password confirmation), password criteria checklist, server error alerts, and login link.
- `frontend/src/pages/dashboard/DashboardPage.jsx` — Initial authenticated dashboard showing active user profile, session details, and logout action.
- `frontend/public/favicon.svg` — Brand SVG favicon.
- `backend/.env.example` & `frontend/.env.example` — Sanitized environment configuration templates.

### Changed
- `frontend/src/App.jsx` — Integrated `<AuthProvider>` and defined application routes (`/login`, `/register`, `/dashboard`, `/`, with catch-all redirect).

---

## [0.3.0] — 2026-11-01 — Authentication Backend

### Added
- `src/utils/tokenUtils.js` — JWT token generation utility (`generateToken`)
- `src/validators/authValidator.js` — Input validation for register and login using express-validator
- `src/controllers/authController.js` — Register, login, getMe controllers with AuditLog integration
- `src/routes/authRoutes.js` — Auth route definitions
- `app.js` updated — auth routes registered at `/api/v1/auth`

### Implemented Endpoints
- `POST /api/v1/auth/register` — Creates user, hashes password, returns JWT
- `POST /api/v1/auth/login` — Verifies credentials, returns JWT
- `GET /api/v1/auth/me` — Returns authenticated user profile (protected)

### Security
- Password never returned in any response
- Generic error message for invalid login (no email enumeration)
- isActive check before issuing token
- AuditLog entries for register and login events
- Passwords and tokens never stored in AuditLog

### Tests
- 7 test cases run and passed against live MongoDB Atlas

---



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
