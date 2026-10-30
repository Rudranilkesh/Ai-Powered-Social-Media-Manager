# SocialSync AI — Product UI/UX Design System & Developer Implementation Guide

**Version:** 1.0  
**Status:** Proposed implementation baseline; team approval required before coding  
**Project:** AI-Powered Social Media Management and Automation System Using MERN Stack  
**Product name:** SocialSync AI  
**Primary owner:** Sagnik — Frontend and UI/UX  
**Collaborators:** Rudranil — Backend/API and team lead; Ritam — Database and integrations  
**Target:** Responsive public SaaS website plus authenticated web application  
**Reference:** Team-supplied `design1.md` (FaceOff Technologies marketing-site design guidance). The original reference defines visual principles and tokens, **not** SocialSync AI product pages. All SocialSync-specific page layouts, component details, and implementation choices below are **proposed adaptations**, not claims about the referenced website.

---

## 1. Design intent, context, and goals

**One-sentence intent:** Build a clear, accessible, premium-feeling SaaS interface that uses IBM Plex Sans, warm cream/blush surfaces, deep wine accents, concise copy, and consistent token-driven components across both marketing and application experiences.

### 1.1 Primary users
- Students, creators, and small social-media teams managing posts and content calendars.
- New users evaluating the product on the public website.
- Logged-in users drafting AI-assisted content, scheduling posts, and reviewing status.

### 1.2 Primary journeys (must work end to end)
1. Visitor lands on Home → understands value → selects Get Started → signs up.
2. User logs in → sees dashboard → creates a draft → saves it → sees it on Posts.
3. User opens AI Studio → enters topic/tone/platform → generates content → edits → saves as draft.
4. User chooses a draft → selects account and future time → schedules → sees item in Calendar.
5. User sees publishing status and errors, with clearly differentiated states for *queued*, *published*, and *failed*.
6. User opens Accounts and connects/disconnects supported services only when the relevant third-party integration is actually implemented.

### 1.3 Scope and product honesty
- **MVP:** landing pages, authentication UI, dashboard, AI Studio, posts/drafts, scheduling interface, accounts management UI, basic analytics from available data, settings.
- **Integration-dependent:** live publishing, social-platform insights, OAuth connections. These must not be shown as working or supported unless backend/API integration is verified.
- **Pricing:** a pricing page may describe future plans; must not imply billing is live unless implemented. Use a clearly labeled *Coming soon* state when appropriate.
- **Metrics:** demo values must be explicitly identified as mock data during development and demo environments. Do not present invented user growth or publishing stats as real results.

---

## 2. Visual foundation and design tokens

### 2.1 Original reference values (preserved exactly)
The following tokens come from `design1.md` and are recorded for traceability. Some are unusual for product UI; see adaptations below.

| Reference token | Reference value |
|---|---|
| `font.family.primary` | IBM Plex Sans |
| `font.family.stack` | IBM Plex Sans, IBM Plex Sans Fallback, system-ui, sans-serif |
| `font.size.base` | 17px |
| `font.weight.base` | 400 |
| `font.lineHeight.base` | 29.75px |
| `font.size.xs / sm / md / lg / xl / 2xl / 3xl / 4xl` | 12 / 13 / 14 / 15 / 17 / 19 / 20 / 32px |
| `color.text.primary` | `#3b1f1d` |
| `color.border.muted` | `#7a2e2a` |
| `color.border.strong` | `#f8f5f1` |
| `color.text.inverse` | `#d5d1cc` |
| `color.surface.base` | `#000000` |
| `color.surface.muted` | `#fff1f1` |
| `color.surface.raised` | `#ffffff` |
| `color.surface.strong` | `oklab(0.999994 0.0000455678 0.0000200868 / 0.04)` |
| `space.1...space.8` | 2 / 4 / 6 / 6.91 / 8 / 8.64 / 11.52 / 12px |
| `radius.xs / sm / md / lg / xl / 2xl / step7` | 4 / 8 / 10 / 12 / 16 / 28 / 26843500px |
| `motion.duration.instant / fast / normal / slow / slower / step6 / step7 / step8` | 100 / 120 / 150 / 200 / 300 / 400 / 500 / 800ms |

Reference shadows (preserved):

```css
--reference-shadow-1: rgba(59,31,29,.16) 0 16px 38px 0, rgba(255,255,255,.75) 0 1px 0 0 inset, rgba(59,31,29,.08) 0 -1px 0 0 inset;
--reference-shadow-2: rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(60,6,8,.6) 0 26px 56px -24px;
--reference-shadow-3: rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,.05) 0 1px 2px 0;
--reference-shadow-4: rgba(255,255,255,.42) 0 1.5px 0 0 inset, rgba(150,60,0,.42) 0 -8px 16px 0 inset, rgba(240,122,16,.6) 0 18px 34px -18px;
```

**Do not copy the original brand identity, imagery, logo, or text from FaceOff Technologies.** SocialSync AI is a distinct product using an adapted design language.

### 2.2 Adopted SocialSync AI semantic colors
Use these *semantic names* in components, never scattered raw hex values. These are **proposed SocialSync mappings** from the reference palette, with practical additions for usability.

| Semantic token | Value | Intended use |
|---|---|---|
| `--color-canvas` | `#f8f5f1` | Outer app background / marketing page |
| `--color-surface` | `#ffffff` | Cards, drawers, dialogs |
| `--color-surface-soft` | `#fff1f1` | Featured sections, selected navigation |
| `--color-text` | `#3b1f1d` | Primary headings and body text |
| `--color-text-muted` | `#674c49` | Secondary text; test contrast on each surface |
| `--color-primary` | `#7a2e2a` | Buttons, links, active indicators |
| `--color-primary-hover` | `#61231f` | Primary hover state, proposed addition |
| `--color-primary-foreground` | `#ffffff` | Text/icons on primary buttons |
| `--color-border` | `#e8dcda` | Card/input borders, proposed addition |
| `--color-focus` | `#7a2e2a` | High-visibility keyboard focus ring |
| `--color-success` | `#176534` | Success state, proposed addition |
| `--color-warning` | `#805000` | Caution state, proposed addition |
| `--color-danger` | `#a02525` | Errors/destructive actions, proposed addition |

**Important:** The reference labels `#000000` as `color.surface.base`, `#7a2e2a` as `color.border.muted`, and `#f8f5f1` as `color.border.strong`; they should **not** be applied literally as the primary app canvas or border roles. SocialSync instead uses the warm cream/blush/white mapping above for application readability. Keep the reference values documented separately.

### 2.3 Typography
- **Must** use IBM Plex Sans for all UI text; fallback to system UI sans-serif.
- Default application body should use `16px / 1.55` (SocialSync adaptation); large marketing paragraphs may use `17px / 1.75` from the reference.
- **Must** use a consistent scale: `12px` captions, `14px` secondary labels, `16px` body/controls, `20px` section headings, `24px` page headings, `32–48px` marketing hero headlines (depending on viewport).
- **Must** use real `h1`–`h3` hierarchy, rather than styling plain divs as headings.
- **Should** limit desktop paragraph widths to about `65–75ch`, avoiding huge unreadable lines.
- **Must** allow browser text zoom up to 200% without hiding content or controls.

### 2.4 Spacing, radii, elevation and motion
- Preserve the reference compact spacing tokens as `--space-ref-*` if needed for fine-detail layout.
- **Proposed app layout spacing:** 4, 8, 12, 16, 24, 32, 48, 64px. **Must** use these named spacing steps for component layout; no arbitrary one-off spacing unless documented.
- Standard cards: `16px` radius; prominent hero/dialog: `28px`; controls: `10–12px`; pill controls: `9999px` (practical equivalent of the reference's unusually large pill radius).
- Cards should use restrained borders and minimal shadow; use the reference `shadow.3` style for quiet surfaces, `shadow.1` only for elevated overlays/highlights.
- Hover/focus transitions should usually be `150–200ms`; large transitions may use up to `300ms`. **Must** respect `prefers-reduced-motion` and remove decorative motion.
- **Must not** animate layout in ways that cause content jumps or prevent keyboard interaction.

### 2.5 Implementation-ready CSS theme (Tailwind CSS v4)
Use `@import "tailwindcss";` and `@theme` tokens in `frontend/src/styles/globals.css` if using Tailwind v4. If the repo uses Tailwind v3, port equivalent names into `tailwind.config.js` instead; do not mix configuration models.

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap");

@theme {
  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --color-canvas: #f8f5f1;
  --color-surface: #ffffff;
  --color-surface-soft: #fff1f1;
  --color-ink: #3b1f1d;
  --color-ink-muted: #674c49;
  --color-brand: #7a2e2a;
  --color-brand-hover: #61231f;
  --color-on-brand: #ffffff;
  --color-line: #e8dcda;
  --color-positive: #176534;
  --color-caution: #805000;
  --color-negative: #a02525;
  --radius-card: 1rem;
  --radius-panel: 1.75rem;
}

@layer base {
  html { font-family: var(--font-sans); }
  body { background: var(--color-canvas); color: var(--color-ink); }
  :focus-visible { outline: 3px solid var(--color-brand); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  }
}
```

**Build note:** Verify the font import order against the installed Tailwind build setup; if needed, place the Google Fonts `<link>` in `index.html` instead. Font loading must have a system-font fallback and must not block interaction.

---

## 3. Site map and application routing

### 3.1 Public (unauthenticated) routes
| Route | Page | Goal / required sections |
|---|---|---|
| `/` | Home | Nav, hero, product UI preview, three core benefits, how it works, final CTA, footer |
| `/features` | Features | AI generation, drafts, scheduling, calendar, analytics with actual capability labels |
| `/pricing` | Pricing | Clearly labeled plans or **Coming soon**; no fake checkout |
| `/about` | About | Product intent, benefits and team/project identity |
| `/login` | Login | Email, password, error handling, link to signup |
| `/signup` | Signup | Name, email, password, confirm password, consent as applicable |
| `/forgot-password` | Password recovery | Only enable working flow after backend endpoint exists; otherwise no broken CTA |
| `*` | Not found | 404 illustration/icon, explanation, return-home action |

### 3.2 Protected app routes
| Route | Page | Required sections |
|---|---|---|
| `/app` | Dashboard | Greeting, metric cards, upcoming posts, recent activity, CTA |
| `/app/ai-studio` | AI Studio | Prompt editor, platform, tone, generation, result editing, save |
| `/app/posts` | Posts | Search, filters, status tabs, list/cards, actions |
| `/app/posts/new` | Composer | Caption, media, account, preview, save/schedule |
| `/app/posts/:id` | Post editor/detail | Status, content, schedule, editing constraints |
| `/app/calendar` | Content Calendar | Month/week views, selected-day agenda, post detail |
| `/app/accounts` | Connected Accounts | Per-platform status, connect/reconnect/disconnect where supported |
| `/app/analytics` | Analytics | Date range, metrics, graphs, data freshness and limitations |
| `/app/settings` | Settings | Profile, preferences, account security, logout |

### 3.3 Navigation and layout contracts
- Public site: logo left; Features, Pricing, About navigation; Login and Get Started on right; collapsible mobile menu.
- Authenticated app: permanent desktop sidebar and top bar; mobile hamburger opens a labeled drawer; content uses a central fluid container.
- Desktop sidebar width should be `240–264px`; header height `64–72px`; content padding `24–32px`. On mobile, body padding `16px` and sidebar becomes overlay.
- **Must** show exactly one selected navigation item, using more than color alone (e.g., highlight + active indicator + `aria-current="page"`).
- **Must** support direct URL access and browser back/forward navigation.
- **Must** redirect unauthenticated protected routes to login and return to the intended page after authentication where secure/feasible.
- **Must** include a keyboard-accessible skip-to-content link.

---

## 4. Page-by-page wireframe and design requirements

### 4.1 Home page `/`
**Hierarchy:** Top nav → hero → compact product-preview mockup → benefits cards → workflow steps → CTA → footer.

**Hero:** cream canvas with blush feature panel; small pill eyebrow “Your AI social media workspace”; heading **“Create smarter. Schedule better. Grow faster.”**; short explanatory copy; primary button **Get Started**; secondary button **Explore Features**; product preview clearly labeled if illustrative. Heading is left-aligned desktop, centered or left-aligned on mobile consistently.

**Benefits:** three cards (AI Studio, Content Calendar, Performance Overview) with icon, 1–2 line body, clear link; no fabricated performance claims. Feature previews should match actually built screens.

**How it works:** Create → Refine → Schedule → Review. Each stage is numbered and expressed in plain language.

**Footer:** product name, navigation, privacy/terms links only if real pages exist, contact/project info where approved. **Must not** include invented customers, testimonials, partners, or certification marks.

### 4.2 Features `/features`
- Sticky/subtle public nav; page title and one-line positioning statement.
- Alternate image/text feature blocks: AI Studio, drafts, scheduler/calendar, analytics, account connections.
- Each block **must** distinguish **Available**, **Planned**, or **Integration required** in actual implementation copy (not only by color).
- CTA: Try SocialSync AI.

### 4.3 Pricing `/pricing`
- If payment/limits are not implemented: display a clearly labeled **Preview of future plans**, or replace plan prices with **Coming soon**.
- **Must not** create a fake functioning checkout or imply subscription entitlement.
- If real plans are added later: plan card includes price, billing interval, feature limits, and clear upgrade action; all backed by billing logic.

### 4.4 About `/about`
- Concise project mission, intended audiences, differentiating workflow, team attribution if approved.
- **Must not** misrepresent college project maturity as a production-grade enterprise offering.

### 4.5 Login `/login`
- Centered white card on cream canvas, max width approximately `420px`.
- Fields: email, password; descriptive labels outside inputs; Show/Hide password button; Remember me only if supported.
- Primary CTA: **Log in**; secondary: **Create account**.
- States: idle, invalid input, submitting, bad credentials, network error, success redirect.
- **Must** show field errors near corresponding inputs and preserve input after validation errors (excluding password when security policy requires).

### 4.6 Signup `/signup`
- Fields: full name, email, password, confirm password; show password policy before submission.
- **Must** check email format, password requirements, matching passwords; backend must validate independently.
- Loading disables duplicate submissions, but labels and values remain readable.
- Success route depends on backend (dashboard or email verification), never promise verification without the feature.

### 4.7 Dashboard `/app`
**First viewport:** page heading “Good morning” or “Overview”, description, **Create Post** primary action, and four KPI cards: Total Posts, Scheduled, Published, AI Generations. Values must come from backend or explicit mock fixtures.

**Second row:** publishing activity chart and upcoming-post list. Each scheduled item shows thumbnail (if any), platform, time with timezone, and status.

**Third row:** recent drafts/activity plus a small onboarding/empty-state card for first-time users.

- **Must** distinguish empty data from loading and from errors.
- **Must not** plot pretend engagement numbers as authentic platform analytics.
- Layout: 4 cards desktop, 2 tablet, 1 mobile.

### 4.8 AI Studio `/app/ai-studio`
**Two-column desktop:** left input/composer (topic, audience optional, target platform, tone, prompt, Generate); right response/editor/preview. On mobile, stack input above results.

- Input label: “What would you like to post about?”
- Platform selector: only supported output formatting options; no implication of connected account.
- Tone options: Professional, Friendly, Playful, Informative.
- Actions: **Generate content**, **Regenerate**, **Copy**, **Save draft**, **Edit in composer**.
- **Must** show loading/progress and a rate-limit/error state; prevent accidental double requests.
- **Must** let users review/edit AI output before scheduling or publishing.
- **Must** never show API keys in browser code or network responses.
- Empty-state helper: “Describe your topic to generate a first draft.”

### 4.9 Posts `/app/posts` and composer
- Header with **New Post** CTA; tabs for All, Drafts, Scheduled, Published, Failed; search; platform/date filters.
- Desktop: accessible data table or spacious list. Mobile: stacked cards rather than horizontal overflow for core actions.
- Each row/card: preview, title/excerpt, platform, status text, scheduled/published datetime, actions menu.
- Actions: Edit, Duplicate, Schedule/Reschedule, Delete; only legal based on status and permissions.
- Delete **must** require confirmation with exact post context; show resulting success/error.
- Composer **must** support save draft independently from schedule; scheduling requires a valid future local time converted to a timezone-aware value.
- If media is included, **must** provide preview, progress, size/type validation, replacement/removal, and alt-text entry where relevant.

### 4.10 Calendar `/app/calendar`
- Header: month/week navigation, today shortcut, timezone label, **Schedule Post** action.
- Desktop month grid; narrow screens should default to agenda/list with usable touch targets.
- Colored event chips **must** include text/label icon as well as color for status/platform.
- Selecting a day opens its agenda; selecting a post opens details; rescheduling requires confirmation and backend validation.
- Dates/times **must** render in the user's selected timezone and disambiguate timezone differences.
- Empty state should link to create/schedule post.

### 4.11 Accounts `/app/accounts`
- Each card: provider logo/icon, provider name, account handle, connection status, last sync (if available), connection action.
- **Must** distinguish Connected, Expired, Error, and Not connected.
- **Must not** display a working Connect button for unsupported providers; use **Coming soon** text.
- Disconnect action must explain impact on future scheduled posts and require confirmation.
- OAuth credentials/tokens must never be displayed in UI.

### 4.12 Analytics `/app/analytics`
- Date-range filter, source/provider filter, key metrics, trend chart, per-post performance table.
- **Must** state data source and “last updated” timestamp for third-party data.
- If external insights are unavailable, show internal metrics only (drafts, scheduled, successful/failed publishes, generations) with truthful labels.
- Chart **must** include text/table alternative and not communicate category distinction by color alone.
- Empty state should explain that metrics appear after activity.

### 4.13 Settings `/app/settings`
- Sections: Profile, Preferences (theme if implemented, timezone), Account Security, Logout.
- Settings rows must clearly indicate saved/unsaved state and persist only after successful server response.
- Security actions must require appropriate confirmation/re-authentication.

### 4.14 404, global error, empty and offline states
- 404: “Page not found” + **Return home**.
- 500 / API error: plain-language error + **Try again** where safe; no raw stack traces.
- Empty states: icon/illustration, meaningful reason, one recommended action.
- Offline/network issue: visible notification; don't silently discard typed drafts.

---

## 5. Reusable component specifications

All interactive components **must** provide the following state set, even if a particular state is represented as not applicable: **default, hover, focus-visible, active/pressed or selected, disabled, loading, error**. All **must** define pointer, keyboard, touch, overflow, long-copy, and responsive behavior.

| Component | Anatomy and variants | Interactions and states | Responsive / edge cases |
|---|---|---|---|
| `Button` | label, optional leading/trailing icon; primary/secondary/ghost/destructive | `<button>`; Enter/Space; hover/active/focus; `disabled`; spinner and `aria-busy` while loading; error notification on failed action | >=44×44px touch target; text wraps or truncates safely; full-width mobile when appropriate |
| `TextField` | label, helper, input, error text; text/email/password/search | real `<label for>`; keyboard focus; invalid with `aria-invalid` and `aria-describedby`; disabled; loading only if asynchronous validation | long input scrolls within field; errors wrap; mobile keyboard type matches data |
| `TextArea` | label, hint, character count, editor area | keyboard editing, visible focus, invalid/disabled/loading; count updates accessibly | auto-grow to cap; preserve line breaks; avoid tiny height |
| `Select` | label, trigger, list/options; native select preferred | arrows, Enter/Space, Escape; selected state; focus, disabled, error | menu must stay in viewport; options truncate with accessible full label |
| `Card` | optional header, body, footer/actions | static cards aren't clickable; interactive cards use a real link/button and focus-visible | avoid nesting links/buttons; content wraps; 1 column mobile |
| `Sidebar` | logo, grouped nav, active item, user footer | keyboard links; `aria-current`; active visual bar; drawer Escape/backdrop close | permanent desktop, modal drawer on mobile, focus trap when open |
| `TopBar` | breadcrumb/title, search (if working), notifications (if working), account menu | menus open by click/keyboard, Escape closes; active/focus states | primary actions remain accessible on small screens |
| `Tabs` | tablist, tab buttons, content panels | arrow keys move tabs; Home/End; selected aria states | horizontal scroll only tabs, not core content; avoid content clipping |
| `Modal/Dialog` | title, description, action row, dismiss control | focus trap, Escape closes unless blocking operation, restore trigger focus | max width and screen-height scrolling; destructive confirmations contextual |
| `Toast/Alert` | status icon, message, optional action | role/status announcements; close reachable via keyboard | no blocking layout; don't use toast alone for critical form errors |
| `StatusBadge` | icon+text; draft/scheduled/published/failed etc. | non-interactive unless implemented as filter control | never rely on hue alone, label must remain legible |
| `DataTable` | caption, column headers, data rows, actions | sortable headers as buttons with `aria-sort`; focusable menus; loading/error/empty | mobile card representation where horizontal scroll would hide actions |
| `Calendar` | date navigation, day cells, events, agenda | labeled dates; keyboard selectable; selected/focus states | switch to agenda on narrow screens, prevent tiny tap targets |
| `Chart` | title, axis labels, legend, source/time window | accessible summary and table; selected filters keyboard operable | legend wraps; chart stays within container; loading/error/empty state |
| `FileUploader` | labeled dropzone, browse button, preview, progress | works by click and keyboard, drag-drop optional; errors announced | touch browse supported; no drag-only requirement; validate file size/type |
| `Skeleton` | approximate content placeholder | `aria-busy` on region; no fake interactive controls | avoid flashing; reduced-motion static |

### 5.1 Cross-component non-negotiables
- Each control **must** have a discernible name and clear action, e.g. “Save draft”, not “Submit”.
- Each component **must** use semantic tokens and standardized spacing/type; no page-specific duplicate buttons.
- Each form **must** handle default, required, invalid, submitting, server-error and success states.
- Every loading state **must** have accompanying status text accessible to screen readers.
- Error messages **must** explain a recovery action where possible.
- Components **must** support 320px screen widths without horizontal page scrolling.

---

## 6. Accessibility criteria (WCAG 2.2 AA target)

The team **must** test the following, not merely visually inspect it:

| Criterion | Concrete pass/fail test |
|---|---|
| Keyboard | Tab from start to end; all actions reachable, no keyboard trap; Escape closes modal/drawer |
| Focus visible | Every link, button, field, tab and menu item shows an obvious focus indication on keyboard navigation |
| Contrast | Normal text >=4.5:1, large text >=3:1; non-text UI boundaries/indicators >=3:1 where applicable; confirm with automated/manual checker |
| Touch | Interactive targets at least 24×24 CSS px per WCAG 2.2 minimum with spacing exceptions; product guideline aims for >=44×44px |
| Forms | Inputs have programmatic labels; errors tied via `aria-describedby`; invalid state announced |
| Semantics | One `h1` per page where appropriate; ordered headings, landmark nav/main/footer, usable links |
| Reflow | At 320 CSS px width and at 200% zoom, content works without horizontal scrolling except genuinely two-dimensional content |
| Reduced motion | Enable OS reduced-motion; nonessential animations stop or greatly reduce |
| Screen reader | Test login, AI generate, save draft, dialog, calendar item, toast announcements with NVDA/VoiceOver where available |
| Color independence | Distinguish status by text/icon in addition to color; charts include legend and table/text summary |
| Error prevention | Destructive actions require clear confirmation; cancel always available; scheduled times validated |
| Timezone | Time controls and previews explicitly show locale/timezone, avoiding ambiguous scheduled publishing |

**If a semantic color fails contrast on a particular surface, adjust the role/token and document the correction; never ship a known failure to preserve a decorative shade.**

---

## 7. Content and tone standards

**Voice:** concise, confident, respectful, implementation-focused (inherited from reference); product-specific copy is original SocialSync AI writing.

| Context | Preferred copy | Avoid |
|---|---|---|
| Hero | “Create smarter. Schedule better. Grow faster.” | “Revolutionize your digital existence!!!” |
| AI input | “What would you like to post about?” | “Enter stuff here” |
| Save | “Save draft” | “Submit” |
| Schedule | “Schedule for 4 Nov, 3:30 PM IST” | “Done” |
| Empty posts | “No drafts yet. Create your first post.” | “Nothing here.” |
| Failed publish | “Publishing failed. Review the connected account and try again.” | “Error 500” |
| Unavailable integration | “LinkedIn connection is coming soon.” | A clickable button that does nothing |

**Must** use realistic field labels, helpful empty states, locale-aware dates, explicit timezone, and action-specific confirmations. **Must not** promise AI-generated text is factually accurate or guarantee engagement growth.

---

## 8. Frontend engineering handoff

### 8.1 Recommended dependencies and architecture
- React + Vite, React Router, Tailwind CSS; icon library (e.g. Lucide React), React Hook Form with schema validation if approved.
- Recharts for charts, but present no inaccessible chart without text/table equivalent.
- Use one shared API client with a configured base URL; **must not** scatter literal localhost URLs throughout components.
- Never place provider/API secrets in Vite `VITE_*` environment variables. Those are browser-exposed.

### 8.2 Suggested folder structure

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers.jsx
│   ├── assets/
│   ├── components/
│   │   ├── ui/             # Button, Input, Modal, Card, Badge, etc.
│   │   ├── layout/         # PublicNav, AppSidebar, TopBar, Footer
│   │   └── shared/         # EmptyState, ErrorState, LoadingState
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── ai-studio/
│   │   ├── posts/
│   │   ├── calendar/
│   │   ├── accounts/
│   │   └── analytics/
│   ├── pages/
│   │   ├── public/
│   │   └── app/
│   ├── services/
│   │   └── apiClient.js
│   ├── styles/
│   │   └── globals.css
│   └── main.jsx
├── index.html
└── package.json
```

### 8.3 API boundary responsibilities
- **Sagnik:** design and implement UI views, forms, frontend state, client-side validation, accessible responsive components.
- **Rudranil:** define backend endpoint contracts, auth/authorization behavior, post business logic, scheduling API behavior.
- **Ritam:** define MongoDB models, integrations/credentials on server, AI/social provider API, synchronization and data source guarantees.
- Before UI wiring, all three **must** agree on JSON shapes, pagination, error shape, states, and timestamps. Use ISO-8601 timestamps with timezone (`Z`/offset) from APIs.
- UI components **must** render four states for remote data: loading, success, empty, error.

### 8.4 Suggested API contract discussions (not implemented endpoints)
| Capability | Proposed endpoints | UI dependencies |
|---|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` | Login/signup/dashboard guard |
| Posts | `GET/POST /api/posts`, `GET/PATCH/DELETE /api/posts/:id` | Posts, composer, detail |
| AI | `POST /api/ai/generate` | AI Studio |
| Schedule | `POST /api/posts/:id/schedule` | Composer, calendar |
| Accounts | `GET /api/accounts`, provider-specific OAuth routes | Accounts page |
| Analytics | `GET /api/analytics/overview` | Dashboard/analytics |

**Do not treat this table as a shipped backend contract** until Rudranil and Ritam approve fields, permission checks, errors, and integration readiness.

### 8.5 Naming and coding conventions
- Components: `PascalCase.jsx`; hooks: `useSomething.js`; utility names: camelCase.
- Routes should be centralized in one router; no duplicated arbitrary path strings.
- Every reusable component should define prop contract, supported variants, disabled/loading/error behavior, and at least a small automated test.
- Do not hardcode mock metrics directly inside visual components. Keep demo fixtures separate and labeled.
- Use `aria-*` for state communication; do not replace native HTML semantics with div-based faux controls.

---

## 9. Responsive layout specification

| Viewport | Layout rule |
|---|---|
| Small mobile: 320–479px | Single column, 16px page padding; nav drawer; full-width CTAs; calendar agenda |
| Large mobile: 480–767px | Single column / selected 2-column small cards when readable; no clipped labels |
| Tablet: 768–1023px | 2-column KPI grid; collapsible sidebar or compact rail as tested |
| Desktop: 1024–1439px | Full sidebar; 3–4 KPI columns; dashboard content split into chart + activity |
| Wide: >=1440px | Max content width about 1440px; whitespace improves reading, not oversized controls |

- Breakpoints above are *project conventions*; use Tailwind utility breakpoints consistently after team selection.
- On mobile, primary task must be achievable without hover.
- Floating elements must not obscure primary controls or keyboard focus.
- Navigation drawer must lock unintended background interaction and restore focus after closing.

---

## 10. Edge-case design contracts

| Scenario | Required UI behavior |
|---|---|
| Slow API response | Show skeleton/spinner with accessible loading text; allow cancel if applicable |
| AI provider rate limit | Explain temporary limit; retain prompt; allow retry when appropriate |
| AI returns unsafe/unusable content | Allow edit/discard; do not auto-publish AI result |
| Token/session expires | Show session-expired notice; safe redirect to login; protect unsaved work where feasible |
| Post scheduled in past | Inline field error and no API submission |
| Publishing fails | Show failed badge, reason where safe, retry/reconnect action |
| No connected account | Allow local drafts; explain publishing needs account connection |
| Missing insights permissions | Show unavailable source/metric notice; don't convert missing data into zero |
| Long generated caption | Wrap text; preserve paragraphs; optional expandable preview |
| Mobile long tables | Use card layout or controlled horizontal scroll with visible affordance |
| File upload failure | Preserve composer text; show specific error and retry |
| Duplicate clicks | Disable in-flight submission and ensure backend idempotency where appropriate |
| Destructive action | Confirmation with item identity, Cancel default, result feedback |

---

## 11. Build order / line-by-line execution checklist

**Sagnik should follow these steps in sequence; integrate incrementally, not as one giant UI commit.**

### Stage A — Foundations
- [ ] A01. Create React/Vite frontend from agreed `develop` baseline.
- [ ] A02. Install/configure Tailwind version and IBM Plex Sans.
- [ ] A03. Add `globals.css` semantic theme tokens.
- [ ] A04. Verify text contrast, body styles, font fallback and keyboard focus globally.
- [ ] A05. Create `PublicLayout` and `AppLayout` with responsive navigation.
- [ ] A06. Implement routing, 404 page, and protected-route placeholders.
- [ ] A07. Add default loading, empty, error and toast primitives.

### Stage B — Component library
- [ ] B01. Implement Button + IconButton with complete state contract.
- [ ] B02. Implement TextField, PasswordField, TextArea and Select.
- [ ] B03. Implement Card, Badge, Tabs and Dropdown.
- [ ] B04. Implement Modal/confirmation dialog, Toast and Skeleton.
- [ ] B05. Implement accessible Table/List, Pagination and EmptyState.
- [ ] B06. Test keyboard, focus, wrapping, 320px viewport and high zoom for each.

### Stage C — Marketing and authentication
- [ ] C01. Home hero, benefit cards, how-it-works, CTA, footer.
- [ ] C02. Features page with true capability labels.
- [ ] C03. About page and honest pricing/coming-soon page.
- [ ] C04. Login form with validation and server-error handling.
- [ ] C05. Signup form with validation and submit state.
- [ ] C06. Verify routes, screen reader names and mobile navigation.

### Stage D — Product workspace
- [ ] D01. Dashboard KPI cards, upcoming posts, recent activity and empty state.
- [ ] D02. AI Studio prompt editor, selectors, results and save flow.
- [ ] D03. Posts list, filters, composer, draft editing and deletion confirmation.
- [ ] D04. Calendar month/agenda views, timezone display, post detail.
- [ ] D05. Accounts cards and accurate integration status controls.
- [ ] D06. Analytics filters, charts and data table alternative.
- [ ] D07. Settings profile/preferences/security UI.

### Stage E — API integration and quality
- [ ] E01. Agree and document API contracts with Rudranil and Ritam.
- [ ] E02. Replace fixture data with API client one page at a time.
- [ ] E03. Verify loading/success/empty/error for every remote resource.
- [ ] E04. Check auth redirects, permissions, stale data and timezone logic.
- [ ] E05. Add tests for critical flows: login, save draft, generate, schedule, delete.
- [ ] E06. Run automated lint/build/test, and manually keyboard-test each page.
- [ ] E07. Review on mobile, tablet, desktop and at 200% zoom.
- [ ] E08. Take screenshots for project report only after demo-ready UI is verified.

---

## 12. Anti-patterns and prohibited implementations

- **Must not** use copied FaceOff logos, branded assets, screenshots or sales text.
- **Must not** implement dark purple-gradient AI dashboards unless design direction is formally changed.
- **Must not** hardcode raw colors repeatedly inside JSX; use semantic tokens.
- **Must not** use clickable `div`s where `button` or `a` is appropriate.
- **Must not** hide focus rings, rely only on color, or use low-contrast labels.
- **Must not** ship dead controls, fake analytics, fake OAuth buttons, or a fake purchase flow.
- **Must not** use client-exposed API keys or store sensitive integration tokens in browser state.
- **Must not** auto-publish AI text without user review and actual publishing permissions.
- **Must not** create one-off spacing and type sizes to fix isolated screens without updating the system.
- **Should** prefer existing components and approved tokens over custom per-page patterns.

---

## 13. Design QA and acceptance gate

**A page is complete only when all applicable checks pass.**

### Visual consistency
- [ ] Uses IBM Plex Sans and approved semantic tokens.
- [ ] Heading hierarchy, padding, radii and buttons match the system.
- [ ] Card and panel density remains readable; long text is handled.
- [ ] Desktop, tablet and mobile match specified layout behavior.

### Functional behavior
- [ ] Navigation and CTAs route to working targets.
- [ ] Loading, empty, success and error states are implemented.
- [ ] Forms validate client-side and show server-side errors safely.
- [ ] UI does not imply integrations, metrics or payment are active when absent.

### Accessibility
- [ ] All controls work with keyboard only.
- [ ] Focus-visible is obvious and not obscured.
- [ ] Contrast is checked against WCAG 2.2 AA thresholds.
- [ ] Forms announce errors; modals manage focus; tabs/calendar are keyboard usable.
- [ ] Works at 320px and 200% zoom; reduced motion is respected.

### Engineering handoff
- [ ] Reusable component used instead of duplicate markup where possible.
- [ ] API states and data contracts documented.
- [ ] Tests and build pass in CI/local environment.
- [ ] Pull request includes before/after screenshots and acceptance notes.
- [ ] Rudranil reviews API/feature behavior, Ritam reviews data/integration assumptions, Sagnik signs off visual implementation.

---

## 14. Change management and ownership

1. Sagnik maintains this design document and component examples in the repository.
2. Rudranil approves navigation, business-flow and backend contract changes.
3. Ritam approves data-source, account-integration, metrics and scheduling assumptions.
4. Any change to shared colors, typography, spacing or reusable components **must** update this document and affected screens in the same pull request.
5. All changes should target a short-lived feature branch and be merged via reviewed PR into `develop`; `main` contains demo-ready releases only.

**End of design specification.**
