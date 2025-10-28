<!-- .github/copilot-instructions.md - guidance for AI coding agents working on this repo -->
# Quick instructions for AI coding agents

This repository is a Next.js (app router) TypeScript site scaffolded with Create Next App. Use the notes below to be immediately productive and to follow project-specific conventions.

- Project snapshot (key files):
  - `package.json` — scripts: `dev`, `build`, `start`, `lint`.
  - `next.config.ts` — `reactCompiler: true` is enabled.
  - `tsconfig.json` — `paths` maps `@/*` → `./src/*` (use `@/` imports).
  - `src/app/layout.tsx`, `src/app/page.tsx` — app-router entry, global layout + fonts.
  - `src/app/globals.css` — Tailwind import and CSS variables for theming.
  - `public/` — static assets referenced with `/...` (e.g. `/next.svg`).

- Architecture overview (big picture):
  - Uses Next.js App Router (all UI routes under `src/app`). Add routes as `src/app/<route>/page.tsx` and shared layouts as `src/app/<route>/layout.tsx`.
  - Global layout (`src/app/layout.tsx`) sets fonts via `next/font` and imports `./globals.css`.
  - Styling uses Tailwind (imported in `globals.css`) and CSS custom properties for theme variables (`--background`, `--foreground`, font variables like `--font-geist-sans`).

- Important conventions and patterns to follow (examples from code):
  - Use the app directory conventions: export `metadata` from route files and `layout.tsx` for root layout.
  - Fonts: prefer `next/font/google` helpers (see `layout.tsx`) and reference the generated CSS variables in components.
  - Images: use `next/image` and reference assets from `public/` (example: `src/app/page.tsx` uses `/next.svg`).
  - TypeScript: `strict: true` and `noEmit: true` — follow strict typing and avoid generating emitted JS files.
  - Path alias: import from `@/` for files under `src/` (e.g. `import X from '@/lib/x'`).

- Build / dev / lint (PowerShell examples):
  - Start development server: `npm run dev` (opens at http://localhost:3000).
  - Build for production: `npm run build`.
  - Run built server: `npm start`.
  - Lint: `npm run lint` (note: `package.json` defines `eslint` without args; run `npm run lint -- src` or `npx eslint "src/**/*.{ts,tsx}"` to target files).

- Integration and deployment notes:
  - Project is compatible with Vercel (README points to Vercel deployment). Keep `next.config.ts` in sync with platform expectations.
  - `reactCompiler: true` is set in `next.config.ts` — keep changes minimal around React/JSX transforms.

- What this agent should and should not change:
  - SHOULD: add or update routes under `src/app`, follow the layout/font/CSS variable conventions, use `@/` imports, and update `package.json` scripts if necessary.
  - SHOULD NOT: change Node/Next major version expectations without confirming (the repo pins `next` and `react` versions in `package.json`), or remove `reactCompiler` unless explicitly required.

- Quick inspection pointers (files to open for more context):
  - `src/app/layout.tsx` — shows font setup and global imports.
  - `src/app/globals.css` — theme variables + Tailwind.
  - `tsconfig.json` — path alias and strict TS rules.

If anything in these instructions is unclear or you want the agent to follow different patterns (for example, a preferred testing setup or CI steps), say which areas to expand and I will update this file.
