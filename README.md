# SocialSync AI 🚀

> AI-Powered Social Media Automation Platform — Built with MERN Stack

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)](/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

---

## 📌 What is SocialSync AI?

SocialSync AI is a centralized social media management platform that helps content creators:

- ✨ Generate captions, hashtags, and post ideas using **Google Gemini AI**
- 📅 Schedule posts to multiple social platforms at once
- 🚀 Auto-publish via **Ayrshare API** (Instagram, Facebook, LinkedIn, Twitter)
- 🖼️ Upload and manage media using **Cloudinary**
- 📊 Track engagement analytics from a unified dashboard

> **Final Year Project — BCA** | Team SocialSync AI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js (MVC) |
| Database | MongoDB Atlas + Mongoose |
| AI | Google Gemini API |
| Media | Cloudinary |
| Social Publishing | Ayrshare API |
| Scheduling | Node-cron |
| Analytics | Recharts |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
Ai Powered Social Media Manager/
├── frontend/                  ← React + Vite + Tailwind
│   └── src/
│       ├── components/        ← Reusable UI components
│       │   ├── common/
│       │   ├── layout/
│       │   └── ui/
│       ├── pages/             ← Route-level pages
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── posts/
│       │   ├── ai-generator/
│       │   ├── calendar/
│       │   └── analytics/
│       ├── context/           ← React context (AuthContext)
│       ├── hooks/             ← Custom hooks
│       ├── services/          ← Axios API calls
│       └── utils/
│
├── backend/                   ← Node.js + Express (MVC)
│   └── src/
│       ├── config/            ← DB connection
│       ├── controllers/       ← HTTP request handlers
│       ├── models/            ← Mongoose schemas
│       ├── routes/            ← API endpoints
│       ├── middleware/        ← Auth + error handling
│       ├── services/          ← Business logic + integrations
│       ├── jobs/              ← Cron scheduler
│       ├── validators/        ← Input validation
│       ├── constants/         ← Shared enums
│       └── utils/
│
└── docs/                      ← Full project documentation
    ├── 01-project/
    ├── 02-architecture/
    ├── 03-development/
    ├── 04-design/
    ├── 05-quality-security/
    ├── 06-management/
    └── diagrams/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- npm v10+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/socialsync-ai.git
cd socialsync-ai
git checkout dev
```

### 2. Setup Backend
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your values
cp .env.example .env
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Verify
- Backend health: `http://localhost:5000/api/v1/health`
- Frontend: `http://localhost:5173` → should show **"✅ SocialSync AI API is running"**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
AYRSHARE_API_KEY=your_ayrshare_key
ENCRYPTION_KEY=your_32_char_key
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=/api/v1
```

---

## 📊 Current Development Status

| Task | Description | Status |
|---|---|---|
| T01 | Project setup + boilerplate | ✅ Complete |
| T02 | MongoDB Models | ✅ Complete |
| T03 | Authentication backend | ✅ Complete |
| T04 | Authentication frontend | ✅ Complete |
| T05 | Dashboard UI | ✅ Complete |
| T06 | Media upload (Cloudinary) | 🔄 Next |
| T07 | AI content generation | ⬜ Pending |
| T08 | AI generator UI | ⬜ Pending |
| T09 | Post management | ⬜ Pending |
| T10 | Social account connection | ⬜ Pending |
| T11 | Post scheduling | ⬜ Pending |
| T12 | Calendar UI | ⬜ Pending |
| T13 | Analytics backend | ⬜ Pending |
| T14 | Analytics dashboard | ⬜ Pending |
| T15 | Settings page | ⬜ Pending |
| T16 | Testing | ⬜ Pending |
| T17 | Deployment | ⬜ Pending |

---

## 📚 Documentation

| Document | Link |
|---|---|
| Full Documentation Index | [docs/INDEX.md](./docs/INDEX.md) |
| Architecture | [docs/02-architecture/ARCHITECTURE.md](./docs/02-architecture/ARCHITECTURE.md) |
| Database Design | [docs/02-architecture/DATABASE.md](./docs/02-architecture/DATABASE.md) |
| API Documentation | [docs/02-architecture/API_DOCUMENTATION.md](./docs/02-architecture/API_DOCUMENTATION.md) |
| Environment Setup | [docs/03-development/ENVIRONMENT.md](./docs/03-development/ENVIRONMENT.md) |
| Git Workflow | [docs/03-development/GIT_WORKFLOW.md](./docs/03-development/GIT_WORKFLOW.md) |
| Task Tracker | [docs/06-management/TASK_TRACKER.md](./docs/06-management/TASK_TRACKER.md) |
| Roadmap | [docs/01-project/ROADMAP.md](./docs/01-project/ROADMAP.md) |

---

## 👥 Team

| Name | Role |
|---|---|
| **Ritam** | Backend Lead — Auth, DB Models, Deployment |
| **Rudranil** | Frontend + AI — Dashboard, AI Generator, Media |
| **Sagnik** | Features — Posts, Scheduling, Analytics |

---

## 🤝 Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for team workflow and guidelines.

---

## 📄 License

MIT License — see [LICENSE](./LICENSE)
