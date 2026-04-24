# CLAUDE.md

## Permissions
- Allow all WebFetch requests without prompting.
- Never ask to edit files. Just do it.

## Behavior
- Terse. Direct. No preamble, no trailing summaries.
- No unrequested features, error handling, fallbacks, or abstractions.
- Follow only observed conventions. Don't invent.
- Don't comment code you didn't change.
- If unclear, ask one focused question. Don't guess.
- Reference code as `file:line`.

## Workflow (every task)
1. **STATE** — 2–3 sentence understanding
2. **PLAN** — steps, files, risks
3. **CONFIRM** — wait for approval
4. **IMPLEMENT** — tick off steps `[ ]` → `[x]`
5. **REPORT** — done/skipped/notes

## Tech Stack
- **Framework:** Nuxt 4 (Vue 3, static/SPA via `ssr: false`, deploys to GitHub Pages)
- **Frontend:** Vue 3 Composition API, Tailwind CSS
- **Source dir:** `app/` (set via `srcDir`)

## Dev Commands
```
npm run dev        # Start dev server
npm run generate   # Static site build (GitHub Pages)
npm run preview    # Preview production build
```

## Architecture

### Directory Structure
- `app/pages/` — Routes (about, contact, projects, iptv, index.vue)
- `app/components/` — Global shared components (SiteHeader, SiteFooter, HeroSection, etc.)
- `app/assets/` — Images, videos

### Component Conventions
- Global components live in `app/components/` with no path prefix.
- Page-local components live in `app/pages/{name}/components/` — auto-scoped to that page subtree via `unplugin-vue-components`.
