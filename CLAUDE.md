# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (HMR)
npm run build     # production build → dist/
npm run lint      # ESLint check
npm run preview   # serve the production build locally
```

No test suite. No TypeScript — plain JSX.

Deployed on Vercel; `vercel.json` has a catch-all SPA rewrite rule so all routes hit `index.html`.

## Architecture

**GTW Speaker Hub** — a static React SPA for Global Tech Weekend Tbilisi 2026. No backend; all data is mock.

```
src/
  main.jsx          # entry, wraps App in BrowserRouter
  App.jsx           # top-level <Routes> definition
  data/index.js     # static mock data: PEOPLE, CHANNELS, MESSAGES
  main.css          # global design system (CSS custom properties, layout classes)
  App.css           # additional shared styles
  pages/            # full-page route components
  components/       # Sidebar, GtwLogo
```

**Routes**: `/login` → `/app` → `/directory` → `/profile`. All unknown paths redirect to `/login`.

**Auth**: `sessionStorage.getItem('gtw_logged_in') === '1'`. Pages guard themselves with a `useEffect` redirect. Cross-page DM intent uses `sessionStorage.getItem('gtw_open_dm')`.

**Data layer**: `src/data/index.js` exports `PEOPLE`, `CHANNELS`, and `MESSAGES`. Message state lives in `AppPage` React state — nothing is persisted beyond the session. Adding a new person/channel means editing that file.

## Design System

All CSS custom properties live in `:root` in `main.css`. Key tokens:

- `--color-bg: #000016` (Digital Midnight), `--color-cyan: #00FDFF`, `--color-lime: #C3FB1A`, `--color-magenta: #FF0040`, `--color-violet: #C13DFF`
- `--font-display`: Space Mono (Acro Mono fallback), `--font-body`: Inter Tight
- Spacing scale: `--space-1` (4px) through `--space-12` (48px)
- Radii: `--radius-sm` (6px) through `--radius-2xl` (32px)
- `--touch-min: 44px` — minimum touch target size
- Stage track colors: `--stage-ai`, `--stage-fintech`, `--stage-web3`, etc.

Per-component styles are often declared as inline `<style>` blocks at the top of the JSX component (see `AppPage.jsx`). No CSS modules, no Tailwind, no styled-components.

**Mobile layout**: Sidebar hidden on mobile; replaced by a bottom `mobile-nav` bar and a slide-up `mobile-drawer`. Breakpoints at 768px and 480px.
