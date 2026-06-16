# mixipos-lander

The **mixipos** marketing landing page as a lightweight **Astro** static site.
mixipos is the restaurant/cafe/bar/hotel-F&B **POS & adisyon** product in the
[Adviceal](https://adviceal.com) family (alongside minirez, maxirez and mixifin).

It builds to a plain `dist/` folder that any static host serves directly — there
is no Node server to keep alive, so there is no cold-start 503 to worry about.

## Run

```bash
npm install
npm run dev       # http://localhost:4321  (live reload)
npm run build     # → dist/  (static, ready to deploy)
npm run preview   # serve the built dist/ locally to sanity-check
```

Astro 6 requires Node.js **22.12.0 or newer**.

## Stack

- Astro `^6.4.6`, `output: 'static'`, **zero runtime dependencies**.
- One page (`src/pages/index.astro`), hand-authored `public/styles.css` and
  vanilla `public/script.js`. No framework, no Tailwind, no chart library.
- All motion is `IntersectionObserver`-gated and falls back to a static final
  state under `prefers-reduced-motion`.

## Deploy on a static host

Use a **static** deployment, not a Node app:

| Setting           | Value           |
| ----------------- | --------------- |
| Framework preset  | **Astro**       |
| Build command     | `npm run build` |
| Output directory  | `dist`          |
| Install command   | `npm install`   |

The output is static files, so there is no running process.

## Analytics

Google Analytics is **not** shipped. A placeholder gtag block is left commented
in `src/pages/index.astro`; wire in a real GA4 id (see `.env.example`) only when
one is available for this property.

## Structure

```
astro.config.mjs       Astro static build config
src/pages/index.astro  the single page route for /  (head/SEO/JSON-LD + sections)
public/                static assets copied verbatim → dist/
  styles.css           full design system
  script.js            landing interactions + POS set-pieces
  favicon.svg
  robots.txt · sitemap.xml
  assets/
    mixipos-logo.svg       wordmark (vector)
    panel-screenshot.png   OG / social card image
    photos/                segment photos (restoran, kafebar, otel, qrsiparis, magaza)
```

Cache-bust `styles.css?v=N` / `script.js?v=N` by bumping `N` on each deploy.
