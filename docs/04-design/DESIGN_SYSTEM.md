# SocialSync AI — Design System

> Source of truth: `frontend/tailwind.config.js` and `frontend/src/index.css`

---

## Color Palette

### Brand Colors (Primary)
| Token | Hex | Use |
|---|---|---|
| `primary-50` | `#eef2ff` | Light backgrounds |
| `primary-100` | `#e0e7ff` | Hover states |
| `primary-400` | `#818cf8` | Headings, accents |
| `primary-500` | `#6366f1` | Default brand |
| `primary-600` | `#4f46e5` | Buttons |
| `primary-700` | `#4338ca` | Button hover |
| `primary-900` | `#312e81` | Dark accents |

### Surface Colors (Background)
| Token | Hex | Use |
|---|---|---|
| `surface` | `#0f172a` | Main dark background |
| `surface-card` | `#1e293b` | Cards and panels |
| `surface-border` | `#334155` | Borders and dividers |

---

## Typography

**Font:** Inter (Google Fonts)
**Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

## Reusable CSS Classes

Defined in `frontend/src/index.css`:

### Buttons
```html
<!-- Primary button -->
<button class="btn-primary">Save Post</button>

<!-- Secondary button -->
<button class="btn-secondary">Cancel</button>
```

### Card
```html
<div class="card">Card content here</div>
```

### Input
```html
<input class="input" placeholder="Enter caption..." />
```

---

## Tailwind Usage Rules

- Use Tailwind utility classes directly in JSX
- Use `btn-primary`, `card`, `input` for repeating patterns
- Dark theme by default — `bg-surface`, `text-white`
- No separate CSS files per component

---

*Update this file when new components or design tokens are added.*
