# SocialSync AI — Security Guidelines

---

## Authentication

- JWT tokens signed with `JWT_SECRET` (min 32 chars)
- Token expiry: `JWT_EXPIRES_IN=7d`
- Tokens sent via `Authorization: Bearer <token>` header
- Never store JWT in cookies without HttpOnly flag

## Password Security

- Passwords hashed with `bcryptjs` (salt rounds: 12)
- Plain text passwords never stored or logged
- Password field excluded from query results by default (`select: false`)

## API Security

- Rate limiting: 100 requests / 15 min / IP
- CORS restricted to `CLIENT_URL` only
- Request body size limit: 10MB
- Input validation on all endpoints using `express-validator`

## Sensitive Data Rules

- Social media tokens encrypted with `ENCRYPTION_KEY` before storing
- Encrypted credentials never returned in API responses
- All secrets in `.env` — never committed to GitHub
- Frontend `.env` only contains `VITE_` prefixed non-secret values

## Environment Variables

- Never log environment variables
- Never expose backend env vars to frontend
- Use `.env.example` for documentation, never real values

---

## What NEVER Goes in Code

- API keys
- JWT secrets
- Database URIs
- OAuth tokens
- Encryption keys
- Real passwords

---

*Update this file when auth, encryption, or API security changes.*
