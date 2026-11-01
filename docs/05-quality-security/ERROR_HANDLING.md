# SocialSync AI — Error Handling

---

## Standard Error Response Format

All API errors return this structure:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

In development, `stack` is also included:
```json
{
  "success": false,
  "message": "Post not found",
  "stack": "Error: Post not found\n    at ..."
}
```

---

## AppError Class

Location: `backend/src/middleware/errorMiddleware.js`

```js
// Throw known errors like this
throw new AppError("Post not found", 404);
throw new AppError("Not authorized", 401);
throw new AppError("Email already exists", 400);
```

---

## asyncHandler

Wraps every async controller — no try/catch needed:

```js
import { asyncHandler, AppError } from "../middleware/errorMiddleware.js";

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);
  res.status(200).json({ success: true, data: post });
});
```

---

## HTTP Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad request / validation error |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (valid token, wrong role) |
| 404 | Not found |
| 429 | Too many requests (rate limited) |
| 500 | Internal server error |

---

*Last updated: Task 1 complete — middleware implemented*
