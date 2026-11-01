# SocialSync AI — Code Style Guide

---

## JavaScript — General

- Use `const` by default, `let` only when reassignment needed
- Use `async/await` — no raw `.then()` chains
- Wrap all async controller functions with `asyncHandler()`
- Use ES Modules (`import/export`) — both frontend and backend use `"type": "module"`
- No `var`

---

## Backend Conventions

### File naming
- Controllers: `camelCase.js` → `authController.js`
- Models: `PascalCase.js` → `User.js`
- Routes: `camelCase.js` → `authRoutes.js`
- Services: `camelCase.js` → `aiService.js`
- Constants: `camelCase.js` → `postStatus.js`

### Controller pattern
```js
// Always use asyncHandler — no try/catch needed
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);
  res.status(200).json({ success: true, data: post });
});
```

### Error handling
```js
// Use AppError for known errors
throw new AppError("Not authorized", 401);

// Never send raw errors to client
// Never log passwords, tokens, or credentials
```

### Response format
```js
// Success
res.status(200).json({ success: true, data: result });

// Created
res.status(201).json({ success: true, data: newItem });

// Error (handled by global error middleware)
throw new AppError("message", statusCode);
```

---

## Frontend Conventions

### File naming
- Pages: `PascalCase.jsx` → `LoginPage.jsx`
- Components: `PascalCase.jsx` → `Sidebar.jsx`
- Services: `camelCase.js` → `authService.js`
- Hooks: `camelCase.js` starting with `use` → `useAuth.js`

### Component pattern
```jsx
// Use named exports for components
export function LoginPage() {
  return <div className="...">...</div>;
}
```

### Tailwind usage
- Use Tailwind utility classes only
- Use custom classes from `index.css` for repeating patterns: `btn-primary`, `card`, `input`
- No separate `.css` files per component

---

## Comments
- All comments in **English only**
- Use section headers for file-level context:
```js
// ── Section name ──
```
- Comment the *why*, not the *what*

---

*Last updated: Task 1 complete*
