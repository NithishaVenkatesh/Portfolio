# Nithisha — Portfolio v2

A ground-up rebuild of [nithisha.framer.website](https://nithisha.framer.website/) in Next.js, preserving the original visual identity (narrow centered column, Inter/Outfit/Geist Mono typography, ink-on-white palette, dashed hairline separators, blue verified badge, subtle card shadows and lift-on-hover motion) while updating all content from the latest resume.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **Framer Motion** — fade/rise reveals, staggered children, hover lift; respects `prefers-reduced-motion`
- **Lucide** icons, `next/font` (Inter, Outfit, Geist Mono), `next/image` for all images

## Getting started

Requires Node.js 18.18+ (20+ recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Editing content

**All content lives in [`src/data/site.ts`](src/data/site.ts)** — identity, socials, experience, projects, skills, tools grid, achievements, education. Components never hard-code copy; edit the data file only.

### TODOs before going live

1. **Domain** — replace `site.url` in `src/data/site.ts` with the production domain (used for canonical URL, Open Graph, sitemap, robots and JSON-LD).
2. **Certifications** — the resume lists none; add entries to `certifications` in `src/data/site.ts` and a section will be worth adding (see the TODO in `src/components/sections/education.tsx`).
3. **OG image** — `public/og.png` is carried over from V1; regenerate if the branding should change.

To update the resume later, replace `public/resume.pdf`.

## Structure

```
src/
  app/            layout (fonts, SEO metadata), page, globals.css, sitemap, robots
  data/site.ts    single source of truth for all content
  components/
    motion.tsx    Reveal / Stagger / HoverLift primitives
    navbar.tsx    floating pill nav with active-section highlight
    sections/     hero, experience, projects, skills, achievements, education, contact, footer
    ui/           Section shell, Tag pill
  hooks/          useActiveSection (IntersectionObserver)
public/
  favicon.png, og.png, tech/  (logo tiles, all served via next/image)
```

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In [vercel.com/new](https://vercel.com/new), import the repo — Vercel auto-detects Next.js; no configuration needed.
3. After the first deploy, set the custom domain under **Project → Settings → Domains**, then update `site.url` in `src/data/site.ts` and redeploy.

Or from the CLI: `npx vercel` (preview) / `npx vercel --prod`.

## Design notes

Tokens are defined in `globals.css` under `@theme`: ink `#0f1419`, soft `#555`, accent `#1d9bf0`, 20px card radius, layered ultra-subtle shadows, and the dashed `separator-dashed` hairline between sections — all lifted from V1 so the site reads as a version 2, not a redesign.

## Future improvements

- Dark mode (tokens are centralized, so it's a small `@media (prefers-color-scheme: dark)` block away)
- Per-project case-study pages (`/projects/[slug]`) like V1's `/projects/nucleus-ai`
- Project screenshots/videos in the cards once media is available
- A generated OG image (`opengraph-image.tsx`) with name + role typography
- Contact form with a serverless action instead of `mailto:`
