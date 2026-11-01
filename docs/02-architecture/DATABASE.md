# SocialSync AI — Database Design

> See also: [diagrams/Database_ERD.png](../diagrams/Database_ERD.png)
> Original reference: `docs/05_Database_Design.docx`

---

## Overview

**Database:** MongoDB Atlas (M0 Free Tier)
**ODM:** Mongoose
**Collections:** 8

---

## Collection Summary

| Collection | Model File | Status |
|---|---|---|
| users | `User.js` | ✅ Task 2 — Complete |
| socialAccounts | `SocialAccount.js` | ✅ Task 2 — Complete |
| posts | `Post.js` | ✅ Task 2 — Complete |
| postTargets | `PostTarget.js` | ✅ Task 2 — Complete |
| scheduleJobs | `ScheduleJob.js` | ✅ Task 2 — Complete |
| aiGenerations | `AIGeneration.js` | ✅ Task 2 — Complete |
| analyticsSnapshots | `AnalyticsSnapshot.js` | ✅ Task 2 — Complete |
| auditLogs | `AuditLog.js` | ✅ Task 2 — Complete |

---

## Planned Schema Designs

*(Will be filled in as each model is implemented in Task 2)*

### Users
Fields: `_id`, `name`, `email` (unique), `passwordHash`, `role`, `createdAt`, `updatedAt`

### SocialAccounts
Fields: `_id`, `userId` (FK), `provider`, `providerAccountId`, `encryptedCredentials`, `status`, `createdAt`

### Posts
Fields: `_id`, `userId` (FK), `caption`, `hashtags[]`, `mediaUrls[]`, `status`, `createdAt`, `updatedAt`

### PostTargets
Fields: `_id`, `postId` (FK), `accountId` (FK), `status`, `providerPostId`, `publishedAt`

### ScheduleJobs
Fields: `_id`, `postTargetId` (FK), `scheduledFor`, `status`, `attempts`, `nextAttemptAt`, `idempotencyKey`, `lastError`

### AIGenerations
Fields: `_id`, `userId` (FK), `postId` (optional FK), `prompt`, `model`, `generatedText`, `createdAt`

### AnalyticsSnapshots
Fields: `_id`, `postTargetId` (FK), `views`, `likes`, `comments`, `capturedAt`, `source`

### AuditLogs
Fields: `_id`, `actorId` (FK), `action`, `entityType`, `entityId`, `timestamp`, `metadata`

---

## Post Lifecycle States
```
draft → ready → scheduled → partially_published / published / failed / cancelled
```

## Job Lifecycle States
```
queued → running → succeeded / retry_wait / failed / cancelled
```

---

*Update this file when Task 2 (MongoDB Models) is complete with actual schema code.*
