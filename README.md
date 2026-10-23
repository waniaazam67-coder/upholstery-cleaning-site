# Upholstery Cleaning — website

One-page website for **Upholstery Cleaning**, an at-home sofa, upholstery, carpet, mattress and curtain cleaning service in Dubai.

Built with [Astro](https://astro.build) 7 as a fully static site. See [`decisions.md`](./decisions.md) for every technical and design decision and the items still waiting on the client.

## Requirements

- Node.js 24 (see `.nvmrc`)

## Commands

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm install`     | Install dependencies                                |
| `npm run dev`     | Start the local dev server at http://localhost:4321 |
| `npm run build`   | Type-check, then build the site into `dist/`        |
| `npm run preview` | Serve the built `dist/` folder locally              |
| `npm run format`  | Format all files with Prettier                      |

## Project structure

```
src/
  config/site.ts        Business details: name, phone, WhatsApp, hours, nav links
  data/services.ts      The service cards (title, text, photo)
  assets/images/        Source photos (optimised automatically at build time)
  styles/
    tokens.css          Colours, fonts, sizes (light and dark)
    global.css          Base styles, layout helpers, buttons
    animations.css      Shared keyframes and scroll-reveal states
  scripts/              Small TypeScript modules for scroll and motion effects
  components/           One component per page section
  layouts/BaseLayout.astro  <head>, SEO tags, structured data
  pages/index.astro     The page: puts the sections in order
public/                 Files copied as-is (favicon, robots.txt)
```

## Common edits

- **Phone number, hours, WhatsApp messages:** `src/config/site.ts`
- **Add, remove or reorder a service:** `src/data/services.ts` (put the photo in `src/assets/images/`)
- **Colours or fonts:** `src/styles/tokens.css`
- **Domain:** `SITE_URL` in `astro.config.mjs` and the sitemap line in `public/robots.txt`

## Deploying

The site is hosted on Vercel (project `upholstery-cleaning-dubai`). Vercel detects Astro automatically: build command `npm run build`, output folder `dist`.
