# SocialSync AI — Environment Setup

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | v20+ | [nodejs.org](https://nodejs.org) |
| npm | v10+ | Comes with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com) |

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/socialsync-ai.git
cd socialsync-ai

# 2. Checkout dev branch
git checkout dev

# 3. Install backend dependencies
cd backend
npm install

# 4. Install frontend dependencies
cd ../frontend
npm install
```

---

## Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_minimum_32_characters
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
AYRSHARE_API_KEY=your_ayrshare_api_key
ENCRYPTION_KEY=your_exactly_32_character_key
CLIENT_URL=http://localhost:5173
```

### Frontend — `frontend/.env`

```env
VITE_API_BASE_URL=/api/v1
```

> ⚠️ Never commit `.env` files. They are in `.gitignore`.
> Share actual values with teammates privately (WhatsApp/DM).

---

## Running Locally

```bash
# Backend (Terminal 1)
cd backend
npm run dev
# Runs on http://localhost:5000

# Frontend (Terminal 2)
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## Verify Connection

Open `http://localhost:5173` — should show **"✅ SocialSync AI API is running"**

Or directly: `http://localhost:5000/api/v1/health`

---

## MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free M0 cluster (Singapore region)
3. Create database user
4. Network access → Add `0.0.0.0/0`
5. Connect → Drivers → copy connection string
6. Paste into `backend/.env` as `MONGODB_URI`

---

*Last updated: Task 1 complete*
