# SocialSync AI — Module Documentation

> Original reference: `docs/06_Module_Documentation.docx`

---

## Module Overview

| ID | Module | Owner | Status |
|---|---|---|---|
| M01 | Authentication & Profile | Ritam | ⬜ Pending (Task 3) |
| M02 | Social Account Connection | Sagnik | ⬜ Pending (Task 10) |
| M03 | AI Content Generation | Rudranil | ⬜ Pending (Task 7) |
| M04 | Post & Media Management | Sagnik | ⬜ Pending (Task 9) |
| M05 | Scheduling & Publishing | Sagnik | ⬜ Pending (Task 11) |
| M06 | Dashboard & Analytics | Rudranil | ⬜ Pending (Task 13-14) |
| M07 | Settings & Administration | Ritam | ⬜ Pending (Task 15) |

---

## M01 — Authentication & Profile
- **Endpoints:** `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- **Controller:** `authController.js`
- **Model:** `User.js`
- **Middleware:** `authMiddleware.js`
- **Status:** ⬜ Pending

## M02 — Social Account Connection
- **Endpoints:** `GET /connections`, `POST /connections/start`, `DELETE /connections/:id`
- **Controller:** `socialController.js`
- **Service:** `socialPublishService.js`, `providers/`
- **Model:** `SocialAccount.js`
- **Status:** ⬜ Pending

## M03 — AI Content Generation
- **Endpoints:** `POST /ai/generate`
- **Controller:** `aiController.js`
- **Service:** `aiService.js`
- **Model:** `AIGeneration.js`
- **Status:** ⬜ Pending

## M04 — Post & Media Management
- **Endpoints:** `GET /posts`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`
- **Controller:** `postController.js`, `uploadController.js`
- **Service:** `cloudinaryService.js`
- **Model:** `Post.js`, `PostTarget.js`
- **Status:** ⬜ Pending

## M05 — Scheduling & Publishing
- **Endpoints:** `POST /posts/:id/schedule`, `GET /jobs`
- **Controller:** `postController.js`
- **Service:** `schedulerService.js`, `socialPublishService.js`
- **Model:** `ScheduleJob.js`
- **Job:** `schedulerJob.js`
- **Status:** ⬜ Pending

## M06 — Dashboard & Analytics
- **Endpoints:** `GET /dashboard`, `GET /analytics/overview`
- **Controller:** `analyticsController.js`
- **Service:** `analyticsService.js`
- **Model:** `AnalyticsSnapshot.js`
- **Status:** ⬜ Pending

## M07 — Settings & Administration
- **Endpoints:** `PUT /users/profile`, `PUT /users/password`
- **Controller:** `userController.js`
- **Model:** `User.js`
- **Status:** ⬜ Pending

---

*Update status as each module is implemented.*
