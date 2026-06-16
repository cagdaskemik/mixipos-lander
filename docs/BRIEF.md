# mixipos-lander — BUILD BRIEF (authored by KARDIS)

> You are one of TWO parallel planners (multideck). Read this brief in full, STUDY the
> reference repo, then write YOUR OWN independent implementation plan. A second planner
> (the other model) is planning the same task in parallel; KARDIS will merge both plans
> into one authoritative `PLAN.md`, then a separate **Opus 4.8 (max effort)** agent will
> do the actual frontend coding and a **codex** agent will generate the stock photos.
> So: be opinionated, be concrete, and surface ideas the other planner might miss.

## Mission
Build **mixipos-lander**: a marketing landing page for **mixipos** — the point-of-sale /
adisyon product of the minirez–maxirez–mixifin ("Adviceal") family. POS for restaurants,
cafes, bars, and especially **hotel F&B** (it posts charges straight to the room folio).
Turkish-language lander. Must be **on quality par with the mixifin lander** (which was built
with Claude Fable): same calibre of animation, interaction, polish, and copy.

## Tech stack — MIRROR the reference EXACTLY
Reference repo to study: **/home/deck/projects/mixifin-lander** (live: https://mixifin.com).
- **Astro `^6.4.6`, `output: 'static'`. ZERO runtime dependencies** — no React/Vue, no
  Tailwind, no GSAP/AOS/Framer. All styling is hand-authored CSS; all interaction is vanilla JS.
- Structure: a single `src/pages/index.astro` (head/SEO/JSON-LD + all sections inlined),
  `public/styles.css` (all CSS, ~2k lines), `public/script.js` (all JS, ~700 lines),
  `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`, `public/assets/...`.
- `node >=22.12.0`. Scripts: dev/build/preview. Cache-bust CSS/JS with `?v=N`.
- READ these reference files closely before planning:
  - `src/pages/index.astro` (section structure, SEO head, JSON-LD)
  - `public/styles.css` (the CSS-variable theming system at :root, animations)
  - `public/script.js` (the animation/interaction toolkit — list every technique)

## Animation / interaction toolkit to PORT (from mixifin, all vanilla)
IntersectionObserver `.reveal` fade-up · top scroll-progress bar · aurora blur orbs (drift) ·
floating hero cards (floaty) · infinite marquee belt · 3D tilt on the hero mock (pointer:fine
only) · count-up KPI numbers (ease-out cubic, Intl.NumberFormat tr-TR) · SVG chart draw via
stroke-dashoffset + area fade + staggered bars · donut via stroke-dasharray · simulated
assistant chat typing demo · live campaign countdown · primary-button shine sweep · frosted
nav on scroll · mobile burger · `prefers-reduced-motion` fully respected. Re-skin these for POS
(e.g. the cashflow chart → a live "günün cirosu / saatlik sipariş" chart; the chat demo → the
AI POS dashboard asking "bugün en çok ne sattım?"; floating cards → "yeni QR siparişi",
"oda 214'e eklendi", "mutfak: hazır").

## COLOR PALETTE — ORANGE and its tones (hard requirement)
mixifin's palette lives entirely in CSS vars at `:root` (--brand1/2/3 + --grad + dark base).
Swap the teal→cyan→blue brand for a warm ORANGE ramp, and warm the dark base so orange glows.
Starting point (planners may refine; the MERGE will lock final hexes):
```
--brand1: #ff9f1c;   /* amber */
--brand2: #ff7a00;   /* orange */
--brand3: #ff5400;   /* deep orange */
--grad: linear-gradient(100deg, var(--brand1), var(--brand2) 55%, var(--brand3));
--bg0:#140b06; --bg1:#1b1109; --bg2:#23160d;   /* warm near-black (was cold navy) */
--gold:#ffb454; --ok:#34d399; --warn:#fb7185;  /* keep semantics readable */
```
Every UI element inherits the gradient, so a clean variable swap re-themes the whole page.
Keep contrast/legibility (orange text on dark needs care; prefer ink/white for body copy).

## What mixipos SELLS — POS feature inventory (source: minirez monorepo analysis)
The POS is deep and **AI-first**. Lead with the strongest:
1. **AI Akıllı Dashboard** — canlı ciro/sipariş/ortalama adisyon KPI'ları, anomali tespiti,
   ciro tahmini, yoğun saat ısı haritası, satış önerileri.
2. **QR ile self-servis sipariş** — misafir masadan telefonuyla sipariş verir (app yok),
   onay akışı, canlı durum takibi.
3. **Adisyon esnekliği** — hesap böl / birleştir / masa taşı, kişi-bazlı (split) ödeme.
4. **Mutfak Ekranı (KDS)** — gerçek-zamanlı sipariş akışı, hazırlanıyor→hazır→servis,
   geçen süre takibi, swipe ile durum.
5. **Oda folio entegrasyonu** — F&B adisyonunu tek tıkla otel odasına yaz (PMS entegre) — USP.
6. **Akıllı stok** — otomatik düşüm (atomik), kritik stok uyarısı, tükenme tahmini, fire/iade.
7. **Kasa & vardiya** — açılış/kapanış, Z-raporu, nakit-kart mutabakatı, sapma uyarısı.
8. **Tam denetim izi & raporlar** — her işlem loglu, garson performansı, ürün satış, iptal/void.
Other sellable: çok-şubeli/çok-outlet (restoran/bar/minibar/spa/oda servisi), rol-bazlı yetki,
QR menü (TR/EN çift dil), anket & misafir memnuniyeti, Socket.io canlı güncelleme, gerçek-zamanlı.
Payment integrations exist (iyzico, PayTR). Currency TRY. UI is Turkish-native.

## Section structure (adapt mixifin's, map to POS)
Suggested: Nav · Hero (animated POS dashboard mock, 3D tilt) · feature marquee · statement
(Adviceal ailesi: minirez/maxirez/mixifin/**mixipos**) · AI dashboard spotlight (chat demo) ·
features grid (the 8 above) · QR self-servis spotlight · KDS / mutfak spotlight · segments
"Kimler için?" (5 photo cards) · oda-folio / otel spotlight · stok & kasa spotlight ·
canlı-mimari/entegrasyon · testimonials · FAQ · final CTA · footer. Planners: propose the
final ordering and which get the "spotlight" 2-col treatment vs grid.

## Stock photos (5) — generated separately by a codex agent; you just SPEC them
Match mixifin's style: realistic Turkish small-business scenes, ~**1672×941 (16:9)**, JPEG,
in `public/assets/photos/`, with warm/orange-friendly lighting. Proposed segments + filenames
(planners refine the shot list, alt text, and exact filenames in their plan):
- `restoran.jpg`  — garson masada tablet/terminalden adisyon alıyor
- `kafebar.jpg`   — barmen/barista tezgah POS terminalinde
- `otel.jpg`      — otel restoranı / oda servisi (oda folio hikayesi)
- `qrsiparis.jpg` — misafir masadaki QR'ı telefonla okutup sipariş veriyor
- `mağaza.jpg`    — hızlı servis / kasa, dokunmatik POS ekranı
Also need: a `mixipos` wordmark logo (orange) and a hero dashboard screenshot/mock.

## SEO / meta / analytics (mirror mixifin's setup, new values)
Full TR meta + canonical + hreflang(tr-TR, x-default) + OG + Twitter card + JSON-LD
(Organization, WebSite, WebPage, SoftwareApplication w/ featureList, FAQPage, BreadcrumbList) +
robots.txt + sitemap.xml + favicon. New title/description/keywords for "restoran POS / adisyon
programı / QR sipariş / otel POS". GA4: leave a placeholder id (KARDIS will confirm). Domain
placeholder: https://mixipos.com (confirm with operator).

## Open decisions to call out in your plan
- Pre-register/campaign form: mixifin POSTs to a live preregister API. mixipos may NOT have one
  yet — do NOT wire a fake endpoint. Propose either (a) a real CTA to demo/iletişim/phone, or
  (b) a preregister form ONLY if an endpoint is confirmed. Flag this.
- Final orange hexes + whether dark base goes warm.
- Exact section order & which segments to feature.

## DELIVERABLE (what to write now)
Write a single file **`PLAN_<YOURNAME>.md`** (`PLAN_CLAUDE.md` or `PLAN_GPT.md`) at repo root:
1. Section-by-section page outline (copy angle + key visual/animation per section).
2. The exact CSS-variable palette you recommend (final orange hexes).
3. Full animation/interaction port list (mixifin technique → mixipos re-skin).
4. File/asset manifest (every file to create; the 5 photo specs w/ filenames + alt + prompt).
5. SEO/JSON-LD plan (titles, keywords, schema).
6. Copywriting: draft the hero H1/sub + at least the 8 feature card titles+blurbs, in Turkish.
7. Build/deploy notes + open-decision recommendations.
Be thorough and concrete — your plan feeds a real build. Do NOT write app code; plan only.
Do NOT commit or push. Just write your PLAN file to the working tree.
