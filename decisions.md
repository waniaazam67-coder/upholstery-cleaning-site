# Decisions

This file records the decisions made for the Upholstery Cleaning website, both technical and design, and why they were made.
Add new decisions at the bottom of the matching section, with the date.

**Project:** One-page website for _Upholstery Cleaning_, an at-home sofa and upholstery cleaning service in Dubai (client: NAR Technical Services).
**Status:** Design approved by the client on 23 Oct 2026. The production build is based on that approved design.

---

## Open items (waiting on the client)

| Item          | Current value                                                      | Where to change it                                              |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Working hours | Placeholder: 8:00 AM – 9:00 PM, every day                          | `src/config/site.ts` → `hours`                                  |
| Domain        | Not confirmed. Site runs on `upholstery-cleaning-dubai.vercel.app` | `astro.config.mjs` → `SITE_URL`, and `public/robots.txt`        |
| Real photos   | AI-generated photos are used for now                               | Replace the files in `src/assets/images/` (keep the file names) |
| Logo          | Text logo with a teal "U" mark                                     | `src/components/Header.astro`, `public/favicon.svg`             |

---

## Tech decisions

### T1. Astro 7 as a static site (23 Oct 2026)

- **Decision:** Build with [Astro](https://astro.build) 7.4, `output: "static"`.
- **Why:** The site is one page of content with small interactive touches. Astro outputs plain HTML and CSS and only ships the few kilobytes of JavaScript the page actually uses. It also gives us components, TypeScript and image optimisation without a client-side framework.
- **Rejected:** Next.js / React (too heavy for a one-page brochure site, ships a runtime for no benefit); a single hand-written HTML file (the approved prototype was this, but it is hard to maintain and edit).

### T2. Node.js 24 LTS (23 Oct 2026)

- **Decision:** Require Node 24 (`.nvmrc`, `engines` in `package.json`).
- **Why:** Astro 7 needs Node 22.23 or newer. Node 24 is the current long-term-support release.

### T3. TypeScript 6, not 7 (23 Oct 2026)

- **Decision:** Pin TypeScript 6.0.
- **Why:** TypeScript 7 is out, but `@astrojs/check` (used for type-checking `.astro` files) only supports TypeScript 5 and 6 so far. Move to 7 once `@astrojs/check` supports it.
- Strict mode is on (`astro/tsconfigs/strict`).

### T4. Plain CSS with design tokens, no CSS framework (23 Oct 2026)

- **Decision:** All colours, fonts, radii and sizes are CSS custom properties in `src/styles/tokens.css`. Each component keeps its own styles in a scoped `<style>` block. Shared pieces (container, section heading, buttons) are in `src/styles/global.css`.
- **Why:** The approved design was already written as token-based CSS, so porting it kept the look identical. Scoped styles keep each section's CSS next to its markup, which is easier to read than long utility class lists.
- **Rejected:** Tailwind CSS (would mean rewriting the approved design and long class strings in the markup for little gain on a single page).
- **Naming:** Component classes use a light BEM style (`.hero__badge`, `.btn--primary`) so it is clear what belongs to what.

### T5. No animation library (23 Oct 2026)

- **Decision:** Animations are CSS keyframes and transitions. The three behaviours that need JavaScript are small TypeScript modules in `src/scripts/`:
  - `scroll-reveal.ts`: sections slide up as they come into view (IntersectionObserver).
  - `services-scroller.ts`: the services row moves sideways while the visitor scrolls down.
  - `hero-bubbles.ts`: floating foam bubbles in the hero.
  - `header-shadow.ts`: shadow under the header once scrolled.
- **Why:** These effects are simple, and a library such as GSAP or Motion would add weight and another dependency to keep updated.
- **Safety:** Nothing is hidden before JavaScript runs. Only elements below the first screen are hidden for the reveal, and a 12-second fallback shows anything that was missed. Without JavaScript, the services row becomes a normal sideways-scrollable row.

### T6. Self-hosted variable fonts via Fontsource (23 Oct 2026)

- **Decision:** Load Sora and Figtree from the `@fontsource-variable/*` npm packages.
- **Why:** Fonts are served from our own domain (faster, no request to Google, better for privacy) and the build works offline.
- **Rejected:** Google Fonts `<link>` (extra third-party connection); Astro's Fonts API (downloads fonts at build time, so builds fail without network access).

### T7. Images through Astro's `<Picture>` (23 Oct 2026)

- **Decision:** Source photos live in `src/assets/images/`. Astro generates AVIF files with a WebP fallback, in several widths, with `srcset`/`sizes`. Responsive image layout is on by default (`image.layout: "constrained"`).
- **Why:** AVIF files came out roughly 25–45% smaller than the WebP versions of the same photos. The whole built site is about 1.5 MB, counting every image size.
- **Note:** The hero photo loads eagerly with `fetchpriority="high"`; all others lazy-load.

### T8. Business details in one config file (23 Oct 2026)

- **Decision:** Name, phone, WhatsApp number, hours and pre-filled WhatsApp messages live in `src/config/site.ts`. Service cards are in `src/data/services.ts`.
- **Why:** Changing the phone number, hours or a service should never require editing a component.

### T9. SEO basics (23 Oct 2026)

- **Decision:** Title and description, canonical URL, Open Graph / social preview image (generated from the hero photo as a 1200px JPEG), `HomeAndConstructionBusiness` structured data, `sitemap-index.xml` (via `@astrojs/sitemap`) and `robots.txt`.
- **Why:** Helps the business appear in local Google results and gives a proper preview when the link is shared on WhatsApp.

### T10. Code formatting and checks (23 Oct 2026)

- **Decision:** Prettier (with `prettier-plugin-astro`) formats all files. `npm run build` runs `astro check` (type-checking) before building, so a type error stops a broken deploy.

### T11. Hosting on Vercel (23 Oct 2026)

- **Decision:** Static hosting on Vercel, project `upholstery-cleaning-dubai` (team "AURA").
- **Why:** Free for this size of site, global CDN, HTTPS, and the client's domain can be attached when it is confirmed.
- **How it is deployed for now:** the built `dist/` folder is uploaded to Vercel. A GitHub repository (`upholstery-cleaning`) exists and can be connected to Vercel later so every push deploys automatically.

### T12. Astro 7 HTML whitespace (23 Oct 2026)

- **Note:** Astro 7 changed the default `compressHTML` to `'jsx'`, which can remove spaces between inline elements. Where two inline elements need a space between them, write it explicitly (`{" "}`).

---

## Design decisions

### D1. Brand name and logo (23 Oct 2026)

- Brand name is **Upholstery Cleaning** (confirmed by the client). Logo is a teal rounded square with a white "U" and a small yellow sparkle, next to the name in two lines.

### D2. Colours (23 Oct 2026)

- Teal (`#0E9F9A`) as the brand colour, deep navy (`#10304A`) for text, soft aqua and white backgrounds, small yellow (`#F2B63C`) sparkles as the accent.
- **Why:** Taken from the client's design PDF; teal and white read as clean and fresh. Yellow is used sparingly so it stays an accent.
- WhatsApp green (`#25D366`) is used only for the floating WhatsApp button, so people recognise it.

### D3. Typography (23 Oct 2026)

- **Sora** (bold, rounded geometric) for headings and **Figtree** for body text.
- **Why:** Friendly and modern without looking corporate, and very legible on phones.

### D4. One page, not three (23 Oct 2026)

- The client's PDF showed three pages (Home, Services, About & Contact). These were combined into one scrolling page with menu links that jump to each section.
- **Section order:** Header → Hero → Trust strip → Services → How it works → About / Why choose us → Booking banner → Contact → Footer, plus a floating WhatsApp button.

### D5. Every service is at the customer's home (23 Oct 2026)

- From the client: all services are done at home with vacuums and machines; nothing is collected or taken to a shop.
- The copy says this in the hero, the trust strip, the steps and the About section. No wording suggests pick-up.

### D6. Curtain cleaning wording (23 Oct 2026)

- Added at the client's request. Described only as "Curtain vacuuming and cleaning", with no mention of whether curtains are taken down or cleaned hanging, and no mention of washing.

### D7. No prices, no domain shown (23 Oct 2026)

- Prices are left out on purpose, as in the client's PDF. Customers get an estimate on WhatsApp.
- The domain is not shown anywhere on the page until it is confirmed.

### D8. WhatsApp is the only way to book (23 Oct 2026)

- Every booking button opens WhatsApp with a message already typed (general, booking, or custom estimate), so the customer only has to tap send.
- The "How it works" steps tell customers what to send: location, furniture type and a photo.

### D9. Photos (23 Oct 2026)

- AI-generated, realistic photos, as agreed with the client. They show South Asian (Pakistani/Indian) technicians in plain teal uniforms with no logos, working with vacuums and extraction machines in Dubai apartments. The client asked specifically for no Western models.
- No AI "before and after" photos, because they would claim results that never happened. Real before/after photos can be added when the client provides them.
- The current files are about 780px wide (taken from screenshots). Higher-resolution originals would make the hero sharper on large screens.

### D10. Wording that could be misread (23 Oct 2026)

- "We come to your home" was changed to "Our team comes to your home" because "We come" was being read as "Welcome" with a missing letter.
- British spelling ("Odour") is used, matching the client's PDF and common UAE usage.

### D11. Services as a scroll-driven sideways row (23 Oct 2026)

- Services are in one horizontal row. When the visitor reaches the section and keeps scrolling down, the section stays pinned and the cards slide sideways. After the last card, the page continues normally.
- This works the same on desktop and phones. **No swiping is needed** (the client was explicit about this).
- A thin progress bar and a counter (for example "4 / 7") show how far along the row the visitor is. The "Scroll to see more" / "Swipe to see more" hint text was removed at the client's request.
- On phones the short description under the services heading is hidden so the heading and cards fit on one screen while pinned.

### D12. Premium motion, kept subtle (23 Oct 2026)

- On load: hero text fades up line by line; the hero photo is uncovered left to right like a cleaning pass, followed by a soft shine; the badge floats; foam bubbles drift up.
- On scroll: sections slide up into view, with cards in a row arriving one after another.
- On hover: photos zoom slightly, a teal line draws across the top of service cards, buttons get a light sweep, icons tilt.
- Always: sparkles twinkle, and the WhatsApp button has a slow pulse.
- **Why:** Feels premium without being busy. Everything turns off for visitors who have "reduce motion" switched on.

### D13. Dark mode follows the visitor's device (23 Oct 2026)

- The site switches to a dark teal palette when the visitor's phone or computer is in dark mode. There is no manual toggle, to keep the page simple.
