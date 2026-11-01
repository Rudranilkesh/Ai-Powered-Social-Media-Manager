# API Documentation

> Base URL: `http://localhost:5000/api/v1` (development)
> All protected routes require: `Authorization: Bearer <token>`

*Status: Will be updated as each module is implemented (Task 3 onwards)*

---

## Currently Implemented

### Health Check
```
GET /api/v1/health
Response: { success: true, status: "ok", message: "SocialSync AI API is running" }
```

---

## Authentication — `/api/v1/auth`

### POST /api/v1/auth/register
Creates a new user account.

**Request Body:**
```json
{
  "name": "Ritam Chatterjee",
  "email": "ritam@example.com",
  "password": "Test1234"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { "id": "...", "name": "Ritam Chatterjee", "email": "ritam@example.com", "role": "creator" },
    "token": "JWT_TOKEN"
  }
}
```

**Errors:** 400 duplicate email, 400 validation failed

---

### POST /api/v1/auth/login
Authenticates an existing user.

**Request Body:**
```json
{
  "email": "ritam@example.com",
  "password": "Test1234"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "...", "name": "Ritam Chatterjee", "email": "ritam@example.com", "role": "creator" },
    "token": "JWT_TOKEN"
  }
}
```

**Errors:** 401 invalid credentials, 403 account deactivated

---

### GET /api/v1/auth/me
Returns the authenticated user's profile.

**Headers:** `Authorization: Bearer JWT_TOKEN`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "Ritam Chatterjee", "email": "ritam@example.com", "role": "creator" }
  }
}
```

**Errors:** 401 no/invalid token, 403 account deactivated

---

*Endpoints will be added here as each controller is built.*
