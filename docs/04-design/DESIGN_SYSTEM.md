# SocialSync AI — Design System

> **Reference:** [design.md](../../design.md) (Product UI/UX Design System & Developer Implementation Guide)  
> **Source of truth:** `frontend/tailwind.config.js` and `frontend/src/index.css`

---

## 1. Design Intent & Aesthetic

SocialSync AI uses a warm, accessible, editorial SaaS aesthetic:
- **Canvas:** Warm cream background (`#f8f5f1`)
- **Surfaces:** Crisp white cards (`#ffffff`) with soft blush highlights (`#fff1f1`)
- **Brand Primary:** Deep wine burgundy (`#7a2e2a` / hover `#61231f`)
- **Typography:** IBM Plex Sans across all interfaces

---

## 2. Semantic Color Tokens

| Semantic Token | Tailwind Class | Hex Value | Role & Usage |
|---|---|---|---|
| `--color-canvas` | `bg-canvas` | `#f8f5f1` | Outer page & app background |
| `--color-surface` | `bg-surface` | `#ffffff` | Cards, panels, modal dialogs, drawers |
| `--color-surface-soft` | `bg-surface-soft` | `#fff1f1` | Selected navigation highlight, featured badges |
| `--color-text` | `text-ink` | `#3b1f1d` | Headings, primary body typography |
| `--color-text-muted` | `text-ink-muted` | `#674c49` | Subtitles, secondary labels, metadata |
| `--color-brand` | `bg-brand`, `text-brand` | `#7a2e2a` | Primary buttons, active nav indicators |
| `--color-brand-hover` | `hover:bg-brand-hover` | `#61231f` | Hover state for primary buttons |
| `--color-border` | `border-line` | `#e8dcda` | Card borders, dividers, subtle outlines |
| `--color-positive` | `text-positive` | `#176534` | Success status, published badges |
| `--color-caution` | `text-caution` | `#805000` | Scheduled / pending status badges |
| `--color-negative` | `text-negative` | `#a02525` | Form errors, failed attempts |

---

## 3. Typography

- **Primary Font:** `IBM Plex Sans` (Google Fonts), system-ui sans-serif fallback
- **Hierarchy:**
  - `h1`: Page headings (`24–32px`, font-bold, `text-ink`)
  - `h2`: Section headings (`18–20px`, font-bold, `text-ink`)
  - `h3`: Card titles (`14–16px`, font-semibold, `text-ink`)
  - Body: `14–16px`, line-height `1.55`, `text-ink`
  - Captions / Meta: `11–12px`, `text-ink-muted`

---

## 4. Reusable Component Classes

Defined in `frontend/src/index.css`:

### Buttons
```html
<!-- Primary Brand Button -->
<button class="btn-primary">Create Post</button>

<!-- Secondary Button -->
<button class="btn-secondary">Drafts</button>

<!-- Ghost Button -->
<button class="btn-ghost">Options</button>
```

### Cards
```html
<div class="card">
  <!-- 16px radius, white surface, subtle border and warm shadow -->
</div>
```

### Form Inputs
```html
<input class="input" placeholder="What would you like to post about?" />
```

### Badges
```html
<span class="badge bg-surface-soft text-brand font-semibold">Active</span>
```

### Micro-Interactions & Special Components
- **Ambient Spotlight:** Soft cursor-following torch (`AmbientSpotlight.jsx`)
- **Command Palette:** Global keyboard modal triggerable with `Ctrl+K` (`CommandPalette.jsx`)
- **Dual Infinite Marquees:** Hardware-accelerated continuous right-to-left tickers with hover-to-pause
- **Live Device Simulation:** Multi-platform mobile mockup with interactive reactions (`LivePostPreviewer.jsx`)
- **Invisible Scrollbars:** Clean viewport aesthetics with mousewheel/touch scroll preserved

---

*Synchronized with design.md and implemented in Task T05.*
