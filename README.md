# moggie.dev — Portfolio

Personal portfolio of **Aung Myint Myat**, software engineer. Dark-first, high-contrast single page built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 — design tokens in `src/app/globals.css`
- **Animation:** Framer Motion (`motion/react`) — reduced-motion aware via `MotionConfig`
- **Icons:** Lucide React + inline brand SVGs (`src/components/icons.tsx`)
- **Fonts:** Geist + JetBrains Mono via `next/font/google`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

**Everything lives in one file: [`src/data/profile.ts`](src/data/profile.ts)** — name, links, bio, stack, experience, projects, and case studies. No component changes needed.

TODOs left in that file:

- `profile.resumeUrl` — turns the navbar CTA into a "Resume" button
- `profile.socials` — LinkedIn / X URLs (entries with an empty `href` are hidden)
- `projects[].repo` / `projects[].demo` — live & repo links per project

## Structure

```
src/
├── app/            # layout, page, global styles
├── components/     # Navbar, Hero, BentoAbout, Projects, Timeline, Contact…
├── data/           # profile.ts — single source of truth for content
├── hooks/          # useLocalTime, useTypewriter, useScrollLock
└── lib/            # motion variants, cn utility
```

The previous hand-built site is preserved in `legacy/`.
