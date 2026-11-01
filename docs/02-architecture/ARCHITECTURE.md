# SocialSync AI — System Architecture

> See also: [diagrams/System_Architecture.png](../diagrams/System_Architecture.png)

---

## Overview

Three-tier MERN stack with a separate background scheduler worker.

```
Client Layer          →    Application Layer    →    Data + External
React + Vite               Express REST API          MongoDB Atlas
Tailwind CSS               JWT Auth                  Gemini API
                           Rate Limiting             Cloudinary
                           Business Services         Ayrshare API
                           Background Worker
```

---

## Layers

### 1. Client Layer
- **React + Vite** — component-driven SPA
- **Tailwind CSS** — utility-first styling
- **React Router** — client-side routing
- **Axios** — HTTP client with JWT interceptor
- Communicates with backend via HTTPS/JSON on `/api/v1/*`

### 2. Application Layer

**Express REST API** (`backend/src/`)
- Validation → JWT Auth → Business Logic → Response
- Rate limiting: 100 requests / 15 min per IP
- CORS: restricted to `CLIENT_URL`

**MVC Structure:**
```
routes/       → define endpoints
controllers/  → handle HTTP req/res
services/     → business logic + external API calls
models/       → MongoDB schemas
middleware/   → auth, error handling
validators/   → input validation
constants/    → shared enums
```

### 3. Background Worker
- `jobs/schedulerJob.js` — Node-cron polls DB every minute
- Picks up `queued` ScheduleJobs
- Calls `socialPublishService.js` → Ayrshare API
- Updates job and post status after publish attempt
- Retry logic: max 3 attempts with backoff

### 4. Data Layer
- **MongoDB Atlas** — cloud-hosted, free M0 cluster
- **Mongoose** — ODM with schema validation
- 8 collections: Users, SocialAccounts, Posts, PostTargets, ScheduleJobs, AIGenerations, AnalyticsSnapshots, AuditLogs

---

## API Route Structure

```
/api/v1/health          → Health check (public)
/api/v1/auth/*          → Authentication
/api/v1/users/*         → User profile
/api/v1/posts/*         → Post management
/api/v1/ai/*            → AI content generation
/api/v1/connections/*   → Social account management
/api/v1/upload/*        → Media upload
/api/v1/analytics/*     → Analytics data
```

---

## External Services

| Service | Purpose | Config Key |
|---|---|---|
| MongoDB Atlas | Database | `MONGODB_URI` |
| Google Gemini API | AI content generation | `GEMINI_API_KEY` |
| Cloudinary | Media storage | `CLOUDINARY_*` |
| Ayrshare API | Social media publishing | `AYRSHARE_API_KEY` |

---

## Deployment Architecture

| Layer | Platform | Cost |
|---|---|---|
| Frontend | Vercel | Free |
| Backend | Render | Free |
| Database | MongoDB Atlas | Free (M0) |
| Media | Cloudinary | Free (25GB) |

---

*Last updated: Task 1 — Boilerplate complete*
