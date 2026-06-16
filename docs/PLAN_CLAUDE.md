# PLAN_CLAUDE — mixipos-lander implementation plan

> Independent plan by the **CLAUDE** planner (Opus 4.8). Source of truth studied:
> `docs/BRIEF.md` (full) + the **mixifin-lander** reference repo read in full
> (`src/pages/index.astro` 1077 lines, `public/styles.css` 2059 lines, `public/script.js`
> 688 lines, plus `package.json`, `astro.config.mjs`, `robots.txt`, `sitemap.xml`,
> `favicon.svg`, asset tree). Goal: a Turkish POS/adisyon lander on quality par with
> mixifin — same Astro-static, zero-dependency, hand-CSS, vanilla-JS calibre — re-skinned
> warm ORANGE and re-told for restaurant/cafe/bar/hotel-F&B point of sale.

---

## 0. Guiding decisions (TL;DR — read this first)

1. **Clone the architecture verbatim, swap the content & theme.** One `index.astro`, one
   `styles.css` (~2k lines), one `script.js` (~700 lines). No frameworks, no Tailwind, no
   chart lib. Every animation is ported from mixifin and re-skinned; I add **5 new vanilla
   set-pieces** (KDS ticket flow, QR order flow, oda-folio transform, payment-mix donut,
   peak-hour heatmap) that are POS-native and that a naive 1:1 port would miss.
2. **The brand re-theme is a pure CSS-variable swap.** Because mixifin funnels *everything*
   through `--brand1/2/3` + `--grad` + the `--bg*`/`--paper*` ramps, changing ~20 root vars
   re-skins the whole page. I give final hexes in §2.
3. **No fake backend.** mixifin's pre-register form POSTs to a live maxirez API. mixipos has
   no confirmed endpoint, so I **drop the form + tier/credit-lock logic entirely** and replace
   the campaign section with a real **demo/iletişim CTA** (tel / WhatsApp / mailto). Optional:
   a *display-only* launch countdown (no backend) if a launch date is confirmed. Details §7.
4. **Honesty guards.** Don't reuse mixifin's GA4 id. Don't claim "gerçek ekran / çalışan ürün"
   for a generated mock. Frame testimonials as illustrative unless real pilots exist. Mark
   not-yet-shipped integrations "yakında" (mixifin already has this pattern). Details §7.
5. **ASCII asset filenames.** Use `magaza.jpg`, not `mağaza.jpg` — Turkish-char filenames
   invite URL-encoding bugs on static hosts/CDNs. All assets lowercase, no spaces.

---

## 1. Section-by-section page outline

Narrative arc: **hook → who we are → AI brain → what it does → see it move (QR/KDS/folio) →
proof → who it's for → trust → convert.** Backgrounds alternate light / warm-tint and
spotlights alternate normal / flipped exactly like mixifin, so the page breathes.

| # | Section (`id`) | Bg | Copy angle | Key visual / animation |
|---|---|---|---|---|
| 1 | **Nav** | transparent→frosted | Links: Özellikler · Ekranlar · AI · Çözümler · SSS. CTAs: "Giriş Yap" (ghost) + "Ücretsiz Demo" (primary). Phone pill. | Frosted-on-scroll, burger sheet, shine on primary |
| 2 | **Hero** (`#hero`/`#top`) | light sky | H1 lead (see §6) + sub + 4 trust chips + 2 CTAs. The product *in motion* on first paint. | **POS dashboard mock** (3D tilt): KPI count-ups, **saatlik ciro+sipariş chart**, kategori mini-bars, **ödeme-dağılımı donut**; 3 floating cards: "Yeni QR siparişi · Masa 7", "Oda 214'e yazıldı ✓", "Mutfak: Masa 3 hazır". Aurora orbs + grid + horizon glow |
| 3 | **Marquee** | dark hairline band | POS vocabulary belt (proves depth) | Infinite marquee |
| 4 | **Statement** (`#aile`) | dark anchor | Family DNA: minirez · maxirez · mixifin · **mixipos**. "Kasanın arkasındaki eski POS'u bırakın." | Family chips, `mixipos` chip `is-hot` |
| 5 | **AI Akıllı Dashboard** (`#asistan`) | tint | "Sor, panel cevaplasın." Anomali / tahmin / öneri. | **Chat typing demo** — "Bugün en çok ne sattım?" + insight ticklist |
| 6 | **Features grid** (`#ozellikler`) | light | The 8 core features (§6) | 8 `fcard`s, reveal stagger, hover lift + gradient top-rule |
| 7 | **Ciro/Sipariş spotlight** (`#ciro`) | tint | "Günü tahmin etmeyin, izleyin." Canlı ciro + yoğun-saat. | **Big live chart** (ciro line + saatlik sipariş bars) **+ peak-hour heatmap** (NEW) |
| 8 | **QR self-servis spotlight** (`#qr`) | light, flipped | "Misafir masadan sipariş versin, app yok." | **Phone mock 3-step order-flow demo** (NEW) |
| 9 | **KDS / Mutfak spotlight** (`#kds`) | tint | "Mutfak hiç şaşırmasın." Gerçek-zamanlı akış. | **KDS ticket-flow demo** (NEW): tickets advance hazırlanıyor→hazır, elapsed timers tick |
| 10 | **Oda folio spotlight** (`#oda`) ⭐USP | light, flipped | "F&B adisyonunu odaya tek tıkla yaz." PMS entegre. | **Adisyon→oda transform demo** (NEW, inbox-demo pattern) — pairs with `otel.jpg` |
| 11 | **Ekran turu** (`#ekranlar`) | light | Honest framing: "Ürün önizlemesi." | Framed `panel-screenshot.png` + floating pins (see §7 honesty note) |
| 12 | **Kimler için?** (`#kimler`) | light | Segments | **5 photo cards** (2 wide + 3 narrow), hover zoom |
| 13 | **Stats** (`#hiz`) | light | 6 one-glance value props | Stat cards, gradient top-rule |
| 14 | **Vardiya / gün akışı** (`#vardiya`) | tint | "Açılıştan Z-raporuna, gün kendini yönetir." | **Timeline** re-skin (açılış → servis → gün sonu) |
| 15 | **Entegrasyonlar & canlı mimari** (`#entegrasyon`) | light | Çok-outlet, anlık senkron, ödeme, PMS, QR menü, rol-yetki | Migrate card + integration grid (`yakında` badges for unshipped) |
| 16 | **Seçim kriterleri** (`#kriterler`) | tint | SEO category-criteria block ("adisyon POS seçerken") | 3 compare `fcard`s |
| 17 | **Testimonials** (`#yorumlar`) | light | Pilot/illustrative quotes | 3 quote cards (honesty framing) |
| 18 | **Demo CTA** (`#demo`) | dark anchor | Replaces campaign. "Restoranınıza özel canlı demo." | 3 how-steps + tel/WhatsApp/mailto buttons; **optional display-only launch countdown** |
| 19 | **SSS** (`#sss`) | light | 8 POS FAQs (feed FAQPage) | `<details>` accordion, +→× marker |
| 20 | **Finale** | dark anchor | "Eski POS'u kapatın, mixipos'u açın." | Big CTA, glow |
| 21 | **Footer** | near-black | Brand + Ürün + Adviceal ailesi + İletişim | 4-col, socials, legal |

**Spotlight treatment (2-col):** sections 5, 7, 8, 9, 10. That's the right density — each has a
*distinct* visual (chat / chart+heatmap / phone / kanban / transform) so alternating 2-col
layouts never feel repetitive. Everything else is grid/centered.

**Featured segments:** lead with **otel** (carries the oda-folio USP) and **restoran**; `qrsiparis`
reinforces §8. In the 6-col segment grid, the two wide cards = **Restoran & Adisyon** and
**Otel & Oda Servisi**; the three narrow = **Kafe & Bar**, **QR Self-Servis**, **Hızlı Servis / Kasa**.

---

## 2. Final CSS-variable palette (recommended — locks the orange + warms the base)

Drop-in replacement for mixifin's `:root`. Rationale inline. **Decision: yes, warm the dark
base** — a cold navy under orange looks muddy; warm espresso-black makes orange *glow*.

```css
:root {
  /* ---- warm near-black base (orange glows on it) ---- */
  --bg0: #160b05;   /* page base — warm espresso black */
  --bg1: #1f1008;   /* raised dark sections (statement/demo/finale) */
  --bg2: #29160b;   /* dark card / mock surfaces */
  --ink: #fdf1e7;   /* warm off-white body on dark (~15:1 on bg0) */
  --muted: #c3a896; /* warm taupe muted on dark (~7:1 on bg0) */
  --line: rgba(255, 178, 120, 0.14); /* warm hairline */

  /* ---- ORANGE ramp (the whole site inherits --grad) ---- */
  --brand1: #ffb02e;  /* marigold amber — gradient light end / glow */
  --brand2: #ff7a00;  /* signal orange — the core brand color */
  --brand3: #f5460b;  /* ember deep-orange — gradient deep anchor */
  --grad: linear-gradient(100deg, var(--brand1), var(--brand2) 52%, var(--brand3));

  --gold: #ffc24d;    /* warm highlight (oda-folio/credits/gift accents) */
  --ok: #34d399;      /* keep green — success / "hazır" / nakit (readable) */
  --warn: #fb7185;    /* keep rose — uyarı / void / gecikme (readable) */

  /* ---- light theme surfaces (WARM-tinted paper, not cold) ---- */
  --paper: #fff8f1;        /* warm paper */
  --paper-tint: #fdeee1;   /* warm tinted band */
  --ink-dark: #2a1a10;     /* warm near-black ink on light (~13:1) */
  --muted-dark: #7c6354;   /* warm muted on light (~4.7:1 AA body) */
  --line-dark: rgba(42, 26, 16, 0.10);

  /* ---- NEW: dark accent-ink for light surfaces ---- */
  /* bright brand orange is ILLEGIBLE as small text/icon strokes on paper.
     Use this burnt-orange for fcard icon strokes, tag text, inbox arrows. */
  --accent-ink: #c2410c;   /* burnt orange (~4.6:1 on paper) */
  --on-grad: #2a1304;      /* near-black-brown text ON gradient buttons/pills */

  --font-display: 'Sora', 'Segoe UI', system-ui, sans-serif;
  --font-text: 'Inter', 'Segoe UI', system-ui, sans-serif;
  --radius: 18px; --radius-sm: 12px;
  --shadow: 0 24px 70px -28px rgba(20, 8, 2, 0.7);  /* warm shadow */
  --maxw: 1180px;
}
```

**Concrete swaps the coder must also make (they're hardcoded in mixifin, not vars):**

- Every literal teal/cyan/blue rgba in `styles.css` → warm equivalent. Search-and-replace map:
  `45,212,191`→`255,176,46` · `34,211,238`→`255,122,0` · `59,130,246`→`245,70,11` ·
  `148,178,215` (cold hairline/muted) → `255,178,120` on dark, `42,26,16` on light.
- SVG chart gradients in `index.astro` (`#areaFill`,`#lineGrad`,`#lineGrad2`,`#bigFill`) and the
  donut/dot fills in `script.js` (`#22d3ee`,`#2dd4bf`,`#3b82f6`) → orange ramp; keep `#fb7185`
  for the warn slice/outflow.
- `color:#04141a` (dark text on gradient) → `var(--on-grad)`.
- Icon strokes `stroke:#0d9488` and tag text `color:#0d7c70/#0d9488` → `var(--accent-ink)`.
- `theme-color` meta `#060b16` → `#160b05`. `::selection` → `rgba(255,122,0,.30)`.
- `favicon.svg` gradient + the inline footer `brand__mark` gradient → orange.

**Legibility note (must-honor):** `grad-text` is only used on large bold display headings, where
the amber light-end is acceptable (matches mixifin's own low-contrast teal start). Never use
`grad-text` for body/small text. `.kicker` uses `--brand3` (ember) on light = fine; a
`.kicker--accent` variant can use `--brand2`.

---

## 3. Animation / interaction port list (mixifin technique → mixipos re-skin)

Everything stays **vanilla + IntersectionObserver-gated + `prefers-reduced-motion`-guarded**.
The reduced-motion fallback must always render the *final* state (no motion), exactly as
mixifin does.

### A. Direct ports (same code, re-skinned data/colors)

| mixifin technique (script.js / css) | mixipos re-skin |
|---|---|
| Scroll-progress bar (`scaleX` of scrollY/max) | identical, orange gradient |
| Frosted nav `is-scrolled` @ scrollY>16 | identical, warm frost |
| Burger toggle + `nav__sheet` slide | identical |
| Smooth-scroll hash links + on-load hash settle | identical (new section ids) |
| `.reveal` IO fade-up (thr 0.14, rootMargin −40px) + nth-child stagger | identical |
| Count-up (ease-out cubic, `Intl.NumberFormat('tr-TR')`, IO thr 0.6) | **Günün cirosu ₺**, **Sipariş adedi**, **Ortalama adisyon ₺**, **Açık masa** |
| Aurora orbs `drift` | warm amber/orange orbs |
| Hero grid + `horizon` radial glow | orange horizon |
| Hero-mock **3D tilt** (`pointer:fine` only, rotateX/Y on mousemove) | identical, on POS mock |
| Floating cards `floaty` | "Yeni QR siparişi · Masa 7" / "Oda 214'e yazıldı ✓ ₺840" / "Mutfak: Masa 3 hazır" |
| Primary-btn `shine` sweep | identical |
| `pulse` dots (chip, chat status, shot pins) | identical (orange / green status) |
| Marquee belt | POS vocab (see §6) |
| **`renderFlow`** chart (balance line via `stroke-dashoffset` 1.6s + area fade + inflow/outflow `scaleY` bars + grid + dots; Catmull-Rom `smoothPath`) | **Hero "Saatlik ciro & sipariş":** line = kümülatif ciro; twin bars = **kart (gold) / nakit (green)** per hour. Toggle **Bugün / Hafta**. *Same function, new data arrays.* |
| Big spotlight chart (IO thr 0.4) | **§7 big "Ciro & sipariş yoğunluğu"** — larger `renderFlow` instance |
| Income/expense mini-bars (`barup` keyframe, staggered delay) | **Kategori satışları** mini-bars (Yemek/İçecek/Tatlı/Bar) |
| Aging **donut** (`stroke-dasharray` anim, IO thr 0.5, staggered transition-delay) | **Ödeme dağılımı donut** — Kart 58 / Nakit 24 / Yemek kartı 12 / **Oda folio 6** (teases the USP inside the hero) |
| **Chat typing demo** (`typeText` char-by-char, typing dots, token-cancel `chatLoop`, chips) | **AI dashboard Q&A** (4 pairs in §6) |
| FAQ `<details>` accordion (CSS-only, +→× rotate) | identical |
| `prefers-reduced-motion` global guard | identical — **non-negotiable**, applies to all NEW set-pieces too |

### B. Dropped / repurposed

| mixifin | mixipos |
|---|---|
| Campaign **tier evaluation** (`evaluateCampaign`, +03:00 inclusive deadlines) | **DROP** — no campaign backend |
| **Pre-registration form** (`fetch` POST to `api.maxirez.com`) | **DROP** — no confirmed endpoint; replace with tel/WhatsApp/mailto buttons |
| **Countdown** (`setInterval` 1s, `tick` scale) | **Optional repurpose** → display-only "Lansmana kalan süre" to a *fixed confirmed date* (no backend, pure clock). Drop if no date. |

### C. NEW vanilla set-pieces (my additions — built in mixifin's idioms)

All IO-triggered, token-guarded where looping, reduced-motion → final state.

1. **KDS ticket-flow demo** (`#kds`): 3 kanban columns (Yeni / Hazırlanıyor / Hazır). On a
   `setInterval`, a ticket advances a column and its `mm:ss` elapsed timer ticks up; a subtle
   slide/scale on move (reuses `msgin`-style keyframe). Reduced-motion: static populated board.
2. **QR order-flow demo** (`#qr`): a phone frame cycling 3 steps (QR okutuldu → sepet onayı →
   "✓ Mutfağa iletildi · ~12 dk"), step-dots like a stepper. Built like a mini `chatLoop`.
3. **Oda-folio transform demo** (`#oda`): static-with-reveal "Masa 4 · Bar · ₺840" → button
   "Oda folyosuna yaz" → "✓ Oda 214 folyosuna işlendi". Direct re-use of the **inbox-demo**
   pattern (CSS + reveal; optional one-shot JS press animation).
4. **Peak-hour heatmap** (`#ciro`): a `gün × saat` grid; cells fade/scale in with
   opacity∝intensity, staggered via `transition-delay` (donut/bars idiom). IO-triggered.
5. **Payment-mix donut** — listed in A but it's effectively new content (oda-folio slice).

---

## 4. File / asset manifest

### Files to create (mirror mixifin exactly)

```
mixipos-lander/
├─ package.json              # name "mixipos-lander", "astro":"^6.4.6", node ">=22.12.0",
│                            #   scripts dev/build/preview, type module, private
├─ package-lock.json         # generated by npm install
├─ astro.config.mjs          # defineConfig({ output: 'static' })  — identical
├─ .gitignore                # node_modules, dist, .astro, .env  (copy mixifin)
├─ .env.example              # optional; document GA4 id + API base if ever added
├─ README.md                 # run/build/deploy notes (adapt mixifin's; remove form section)
├─ src/pages/index.astro     # head/SEO/JSON-LD + all 21 sections inlined (~1.1k lines)
└─ public/
   ├─ styles.css             # all CSS (~2k lines), CSS-var theme + light overrides
   ├─ script.js              # all JS (~700 lines) + 5 new set-pieces; load with ?v=1
   ├─ favicon.svg            # orange gradient version of mixifin's mark
   ├─ robots.txt             # Allow: / + Sitemap: https://mixipos.com/sitemap.xml
   ├─ sitemap.xml            # single url https://mixipos.com/  lastmod today
   └─ assets/
      ├─ mixipos-logo.png        # orange wordmark (generated) — ~256×66 (2×), transparent
      ├─ panel-screenshot.png    # POS dashboard preview (generated) — ~1600×1000 (og:image)
      └─ photos/
         ├─ restoran.jpg
         ├─ kafebar.jpg
         ├─ otel.jpg
         ├─ qrsiparis.jpg
         └─ magaza.jpg            # ASCII filename (NOT mağaza.jpg)
```

Cache-busting: `styles.css?v=1`, `script.js?v=1`, `mixipos-logo.png?v=1`, bump on each deploy.

### The 5 stock photos (codex agent generates; spec = filename + alt + prompt)

Style contract for all: **photorealistic, candid editorial, real Turkish small-business
scenes, warm/amber lighting that suits the orange brand, 1672×941 (16:9), JPEG, ~150–350 KB,
shallow DoF. No readable on-screen UI text, no brand logos, no watermarks, natural skin tones,
upper-third composition** (segment cards crop with `object-position: center 32%`).

1. **`restoran.jpg`** — Restoran & Adisyon
   - **alt:** `Restoran masasında elindeki dokunmatik POS terminalinden adisyon alan garson`
   - **prompt:** "Photorealistic candid scene in a warm modern Turkish restaurant at golden
     hour. A friendly waiter in a clean apron stands tableside holding a handheld POS
     terminal/tablet, taking a guest's order. Soft amber ambient light, bokeh of a lively
     dining room behind, shallow depth of field, editorial photography, 16:9. No readable
     screen text, no logos."

2. **`kafebar.jpg`** — Kafe & Bar
   - **alt:** `Bar tezgâhının arkasında dokunmatik POS terminalinde ödeme alan barista`
   - **prompt:** "Photorealistic scene of a barista/bartender behind a wooden café-bar counter
     operating a countertop POS touchscreen, warm pendant lighting with orange glow, espresso
     machine and bottles softly out of focus, cozy specialty-coffee atmosphere, Turkish urban
     café, candid moment, 16:9. No readable screen text, no logos."

3. **`otel.jpg`** — Otel F&B / Oda servisi (carries the oda-folio story)
   - **alt:** `Otel restoranında oda servisi hazırlayan, adisyonu odaya yazan üniformalı görevli`
   - **prompt:** "Photorealistic upscale hotel restaurant / room-service scene; a uniformed
     hotel F&B staff member preparing a service tray at a station with a POS terminal, warm
     elegant lighting, Mediterranean resort ambiance with soft sunset tones through large
     windows, premium hospitality feel, 16:9. No readable screen text, no logos."

4. **`qrsiparis.jpg`** — QR self-servis
   - **alt:** `Restoran masasındaki QR kodu telefonuyla okutarak sipariş veren genç misafir`
   - **prompt:** "Photorealistic candid lifestyle shot: a young guest at a restaurant table
     holding a smartphone scanning a small QR code stand on the table, phone screen glowing
     softly (no readable UI), friends and food softly blurred behind, warm inviting restaurant
     light, 16:9, warm orange tones. No logos."

5. **`magaza.jpg`** — Hızlı servis / Kasa
   - **alt:** `Hızlı servis tezgâhında dokunmatik POS ekranından satış yapan güleryüzlü kasiyer`
   - **prompt:** "Photorealistic quick-service / takeaway counter scene: a cashier using a
     touchscreen POS at checkout, handing a paper bag to a customer, bright but warm light,
     modern fast-casual Turkish eatery, menu boards softly blurred, energetic friendly mood,
     16:9. No readable screen text, no logos."

### Brand assets (generated)

- **`mixipos-logo.png`** — lowercase wordmark "mixipos" in a Sora-like geometric sans, filled
  with the `--grad` orange→ember gradient; optional tiny mark (receipt/chart glyph echoing the
  favicon zig-zag). Transparent PNG, export 2× (~256×66). *Prompt:* "Minimal lowercase
  wordmark 'mixipos', geometric sans, smooth amber-to-deep-orange horizontal gradient fill,
  transparent background, crisp vector look, no tagline."
- **`panel-screenshot.png`** — see §7 honesty note. Either a generated high-fidelity POS
  dashboard image **or** skip the file and render §11 from the HTML mock. If generated:
  warm-dark dashboard UI showing adisyon list, masa plan, saatlik ciro chart, KDS strip.

> Note: the **hero mock (§1 row 2) is HTML/CSS, not an image** — exactly as in mixifin. Only
> the §11 "Ekran turu" frame uses `panel-screenshot.png`.

---

## 5. SEO / meta / JSON-LD plan

**Domain placeholder** `https://mixipos.com/` (confirm w/ operator). **GA4:** placeholder
`G-XXXXXXXXXX` — **do NOT ship mixifin's `G-HG5997R7VH`** (that's mixifin's property; would
pollute their analytics). KARDIS confirms the real id.

**Title:** `Restoran, Kafe ve Otel için POS & Adisyon Programı | mixipos`
**Description:** `Restoran, kafe, bar ve otel F&B için yapay zekâ destekli POS ve adisyon
programı: QR ile self-servis sipariş, mutfak ekranı (KDS), oda folio entegrasyonu, akıllı
stok ve canlı ciro takibi. Kurulum yok, tarayıcıdan çalışır.`

**Keywords:** `restoran pos programı, adisyon programı, qr sipariş, qr menü, kafe pos, bar
pos, otel pos programı, mutfak ekranı, kds, oda folyo entegrasyonu, restoran adisyon
programı, garson el terminali, hesap bölme, z raporu, restoran stok takibi, dokunmatik pos,
restoran otomasyonu, akıllı pos, yapay zeka pos, çok şubeli pos`

**Head (mirror mixifin's full set):** charset, viewport, title, description, robots +
googlebot (`index, follow, max-image-preview:large …`), keywords, author/publisher
`Adviceal`, application-name `mixipos`, content-language `tr-TR`, `theme-color #160b05`,
color-scheme, **canonical** `https://mixipos.com/`, **hreflang** `tr-TR` + `x-default`,
**OG** (title/description/type website/url/site_name `mixipos`/locale `tr_TR`/image =
`panel-screenshot.png` w/ secure_url + type + width/height + alt), **Twitter**
`summary_large_image`, favicon, Google Fonts preconnect + Sora/Inter, `styles.css?v=1`,
JSON-LD `<script type="application/ld+json">`.

**JSON-LD `@graph` (6 nodes):**

1. **Organization** `#organization` — reuse the real Adviceal entity from mixifin: legal name
   *AdviceAl Online Danışmanlık Turizm Sanayi ve Ticaret Ltd. Şti.*, `url adviceal.com`,
   `telephone +90 242 606 19 91`, Antalya PostalAddress, **brand** = `{ Brand, name "mixipos",
   url, logo: mixipos-logo.png }`, `sameAs` socials (facebook/instagram/linkedin/twitter/
   youtube — same handles). *(Same company as mixifin; confirm phone/socials still apply.)*
2. **WebSite** `#website` — url, name `mixipos`, `inLanguage tr-TR`, publisher → org.
3. **WebPage** `#webpage` — url, name=title, description, isPartOf→website, about→software,
   primaryImageOfPage = panel image, `inLanguage tr-TR`.
4. **SoftwareApplication** `#software` — name `mixipos`,
   `applicationCategory "BusinessApplication"`, `applicationSubCategory "Point of Sale /
   Restaurant POS"`, `operatingSystem "Web"`, image, description, publisher/provider→org,
   `audience: { BusinessAudience, audienceType: "Restoran, kafe, bar, otel F&B, hızlı servis
   ve çok şubeli işletmeler" }`, and **featureList** (the 8, Turkish):
   - `Yapay zekâ akıllı dashboard: canlı ciro, anomali tespiti ve ciro tahmini`
   - `QR ile self-servis sipariş (uygulama gerektirmez)`
   - `Adisyon esnekliği: hesap böl, masa taşı, kişi bazlı ödeme`
   - `Mutfak ekranı (KDS) ve gerçek zamanlı sipariş akışı`
   - `Otel oda folio entegrasyonu (PMS ile)`
   - `Akıllı stok: otomatik düşüm, kritik stok uyarısı, fire/iade`
   - `Kasa & vardiya yönetimi, Z-raporu, nakit-kart mutabakatı`
   - `Tam denetim izi ve raporlar (garson performansı, ürün satış, iptal/void)`
   - **offers:** `{ Offer, price "0", priceCurrency "TRY", description "Ücretsiz canlı demo ve
     kurulum danışmanlığı" }` (demo, *not* a PreOrder credit campaign).
5. **FAQPage** `#faq` — `mainEntity` from the 8 FAQs in §6.
6. **BreadcrumbList** `#breadcrumb` — position 1 `mixipos` → site url.

`robots.txt`: `User-agent: *` / `Allow: /` / `Sitemap: https://mixipos.com/sitemap.xml`.
`sitemap.xml`: single `https://mixipos.com/`, `lastmod` = build date, weekly, priority 1.0.

---

## 6. Turkish copy draft

### Hero

- **Chip:** `Yeni · Adviceal ailesinin POS'u →`
- **H1 (primary):**
  `Siparişten ödemeye,<br/>restoranınızın <span class="grad-text">akıllı POS'u.</span>`
  - *alt A:* `Adisyondan mutfağa,<br/><span class="grad-text">tek dokunuşta.</span>`
  - *alt B:* `Masadan kasaya,<br/>her sipariş <span class="grad-text">kontrol altında.</span>`
- **Sub:** `QR ile self-servis sipariş, mutfak ekranı, hesap bölme ve oda folio entegrasyonu —
  restoran, kafe, bar ve otel F&B için yapay zekâ destekli adisyon. Kurulum yok, tarayıcıdan
  çalışır; gerisini <strong>mixipos</strong> halleder.`
- **Trust chips:** `Kurulum yok, tarayıcıdan çalışır` · `QR menü TR/EN` · `iyzico & PayTR ile
  ödeme*` · `7/24 canlı senkron`  *(\*mark "yakında" if not yet integrated)*
- **CTAs:** `Ücretsiz Demo` (→`#demo`) + `Özellikleri Gör` (→`#ozellikler`)

### Hero mock (concrete, internally-consistent numbers)

- KPI count-ups: **Günün cirosu** `₺128.480` · **Sipariş** `842` · **Ortalama adisyon** `₺152`
  (128480/842≈152 ✓) · **Açık masa** `14`.
- Sidebar: `mixipos` · Panel(active) · Adisyonlar · Masalar · Mutfak (KDS) · QR Sipariş ·
  Stok · Kasa & Vardiya · Raporlar · Asistan `AI`.
- Donut "Ödeme dağılımı": Kart 58 · Nakit 24 · Yemek kartı 12 · Oda folio 6.

### Marquee belt

`QR Sipariş · Adisyon · Hesap böl · Masa planı · Mutfak ekranı (KDS) · Oda folio · Z-raporu ·
Vardiya · Akıllı stok · Reçete & maliyet · Garson performansı · Saatlik ciro · Çok-şube ·
Anlık senkron · Yemek kartı · İkram & indirim · Void & iptal · Self-servis` (×2 for the loop)

### Statement

- **Quote:** `"Herkesle aynı yoldan yürüyüp farklı bir ufka ulaşamazsınız."`
- **Sub:** `Bu cümleyle minirez ve maxirez'i yaptık, mixifin ile ön muhasebeyi yeniledik.
  Şimdi sıra restoranda: kasanın arkasındaki o eski POS'u bırakın, işinizi gerçekten hızlandıran
  bir adisyon kullanın. <strong>mixipos</strong>, Adviceal ailesinin POS'u.`
- **Family chips:** `minirez · otel yönetimi` / `maxirez · acente teknolojisi` /
  `mixifin · ön muhasebe & e-fatura` / **`mixipos · POS & adisyon`** (`is-hot`)

### AI dashboard spotlight — chat QA (4 pairs for `script.js` QA array)

1. **Q** `Bugün en çok ne sattım?`
   **A** `En çok satan: <b>Adana porsiyon (128)</b>, ardından <b>köfte (96)</b> ve
   <b>lahmacun (84)</b>. Tatlıda künefe lider. Ürün satış raporunu açtım.`
2. **Q** `Şu an en kârlı ürün hangisi?`
   **A** `Birim kârda <b>ev yapımı limonata</b> ve <b>çorbalar</b> öne çıkıyor; ciroda ise
   <b>Adana</b>. İçecek menüsünü kasada biraz öne çıkarmanı öneririm.`
3. **Q** `Akşam yoğunluğu nasıl gidiyor?`
   **A** `20:00–22:00 arası dünden <b>%18 yoğun</b>. Bu hızla geceyi <b>~₺142.000 ciro</b> ile
   kapatırsın. Mutfağa 1 kişi daha almanı öneririm.`
4. **Q** `Stoğu biten ürün var mı?`
   **A** `<b>Kıyma</b> kritik seviyede, tahmini <b>1.5 saat</b> sonra tükenir. Tedarikçiye
   hatırlatma taslağı hazırladım, <b>onayına sunuyorum →</b>`

- **Spotlight ticklist:** `Yoğun saatleri ve ciroyu önceden tahmin eder` · `Anormal iade,
  iptal ve indirimleri yakalar` · `"Bugün neyi öne çıkar?" diye somut öneri verir` ·
  `Her ekranda içgörü kartı: düşen stok, yavaşlayan masa, artan iptal`
- **Hint:** `<kbd>Ctrl</kbd> + <kbd>K</kbd> ile her ürüne, masaya, rapora saniyeler içinde
  ulaşın.`

### The 8 feature cards (grid)

1. **AI Akıllı Dashboard** — `Canlı ciro, sipariş ve ortalama adisyon tek bakışta. mixipos
   yoğun saatleri tahmin eder, anormal iade/iptalleri yakalar ve "bugün neyi öne çıkar" diye
   önerir.` · tags: `Canlı ciro` `Anomali tespiti` `Ciro tahmini`
2. **QR ile Self-Servis Sipariş** — `Misafir masadaki QR'ı okutur, telefonundan sipariş verir
   — uygulama indirmeden. Siz onaylarsınız, sipariş anında mutfağa düşer, durumu masadan
   izlenir.` · tags: `App yok` `Anlık onay` `Canlı durum`
3. **Adisyon Esnekliği** — `Hesabı kişi kişi bölün, masaları birleştirin, siparişi başka
   masaya taşıyın. Herkes kendi payını kartla ya da nakit öder; karışıklık, "kim ne yedi"
   tartışması biter.` · tags: `Hesap böl` `Masa taşı` `Kişi bazlı ödeme`
4. **Mutfak Ekranı (KDS)** — `Siparişler mutfağa gerçek zamanlı düşer. Hazırlanıyor → hazır →
   servis akışı, geçen süre sayacıyla. Kaybolan fiş, unutulan sipariş, "benim siparişim nerede"
   yok.` · tags: `Gerçek zamanlı` `Süre takibi` `Dokunmatik`
5. **Oda Folio Entegrasyonu** — `Otel misafirinin restoran ya da bar hesabını tek tıkla
   odasına yazın. minirez/maxirez PMS ile entegre — resepsiyonla mutabakat derdi, kâğıt fiş
   trafiği biter.` · tags: `PMS entegre` `Tek tık` `Otel F&B`
6. **Akıllı Stok** — `Her satışta reçeteye göre stok otomatik (atomik) düşer. Kritik seviye
   uyarısı, tükenme tahmini, fire ve iade takibi — sayım gecesi sürpriz çıkmaz.` · tags:
   `Otomatik düşüm` `Kritik uyarı` `Fire/iade`
7. **Kasa & Vardiya** — `Vardiya açın, kapatın; Z-raporu tek tuş. Nakit-kart mutabakatı, kasa
   açılış/kapanış ve sapma uyarısı. "Kasa neden tutmuyor" sorusu tarihe karışır.` · tags:
   `Z-raporu` `Mutabakat` `Sapma uyarısı`
8. **Denetim İzi & Raporlar** — `Her iptal, her void, her indirim loglu. Garson performansı,
   ürün satış ve saatlik ciro raporları; Excel ve PDF olarak elinizin altında.` · tags:
   `Tam log` `Garson performansı` `İptal/void`

### Segment cards (Kimler için?)

- **Restoran & Adisyon** (wide) — `Masa planı, garson el terminali, hesap bölme ve hızlı
  ödeme. Yoğun serviste sipariş karışmaz, mutfak şaşmaz.` · `Masa planı` `Hesap böl`
- **Otel & Oda Servisi** (wide) — `Restoran, bar, minibar ve oda servisi tek sistemde; adisyon
  tek tıkla oda folyosuna. minirez/maxirez ile uçtan uca entegre.` · `Oda folio` `Çok-outlet`
- **Kafe & Bar** — `Hızlı adisyon, açık hesap, happy-hour fiyatları ve gün sonu Z-raporu.` ·
  `Açık hesap` `Z-raporu`
- **QR Self-Servis** — `Masadan QR ile sipariş, uygulamasız. Personel azken bile masa
  dönüş hızı artar.` · `QR menü` `Self-servis`
- **Hızlı Servis / Kasa** — `Dokunmatik kasa, hızlı ürün seçimi, paket/gel-al akışı ve anlık
  ciro.` · `Dokunmatik kasa` `Paket/gel-al`

### Stats (6)

`Günün cirosu — Nakit, kart, yemek kartı ve oda folio tek bakışta.` · `Açık masalar — Hangi
masa ne kadar süredir açık, anında görün.` · `Mutfak süresi — Ortalama hazırlık süresi
istasyon istasyon ölçülür.` · `QR sipariş oranı — Self-servisin servise kattığı hızı görün.` ·
`Vardiya & Z-raporu — Gün sonu kapanışı, mutabakat ve sapma tek ekranda.` · `AI günlük özet —
Paneli açmadan riski ve fırsatı kısa, net okuyun.`

### Vardiya / gün akışı timeline (re-skin of automation)

`Açılış — Vardiya açılır, kasa devri ve başlangıç sayımı kaydedilir.` · `Servis — QR ve garson
siparişleri tek akışta mutfağa düşer.` · `Yoğun saat — AI yoğunluğu tahmin eder, personel
önerisi verir.` · `Stok — Satışla stok düşer, kritik ürün uyarısı gelir.` · `Gün sonu —
Z-raporu, nakit-kart mutabakatı ve sapma kontrolü.` · `Özet — Günün cirosu ve performansı
telefonunuza özet geçilir.`

### FAQ (8 — feed FAQPage)

1. **Kurulum gerekiyor mu, hangi cihazlarda çalışır?** `Kurulum yok. mixipos tarayıcıdan
   çalışır; tablet, telefon, dokunmatik POS terminali ve bilgisayarda aynı hesapla açılır.`
2. **QR sipariş için misafir uygulama indirir mi?** `Hayır. Misafir masadaki QR'ı kamerasıyla
   okutur, menü tarayıcıda açılır ve sipariş verilir. İndirme, üyelik gerekmez.`
3. **İnternet kesilirse ne olur?** `Bağlantı koptuğunda açık adisyonlar cihazda tutulur,
   internet gelince otomatik eşitlenir.` *(coder: confirm offline behavior is real; else
   reword to "kısa kesintilerde sipariş alımı sürer")*
4. **Otel oda folyosuna nasıl bağlanır?** `minirez veya maxirez kullanıyorsanız mixipos PMS
   ile entegredir; F&B adisyonunu tek tıkla misafirin odasına yazarsınız.`
5. **Hesap bölme ve kişi bazlı ödeme var mı?** `Evet. Hesabı kişiye veya kaleme göre bölün,
   masaları birleştirin, her payı ayrı kartla veya nakitle tahsil edin.`
6. **Mutfak ekranı (KDS) ayrı bir cihaz mı?** `Hayır, herhangi bir tablet veya ekran KDS'e
   döner. Siparişler gerçek zamanlı düşer, hazırlanıyor → hazır akışıyla yönetilir.`
7. **Ödeme ve POS cihazı entegrasyonu var mı?** `iyzico ve PayTR ile online ödeme desteklenir;
   yerel banka POS cihazlarıyla uyumlu çalışır.` *(coder: confirm integrations before claiming;
   else mark "yakında")*
8. **minirez, maxirez ve mixifin ile ilişkisi nedir?** `Dördü de Adviceal ürünüdür ve aynı
   panel altyapısında çalışır. Oteli, acenteyi veya ön muhasebeyi zaten kullanıyorsanız
   mixipos'a aynı hesapla geçersiniz.`

### Demo CTA (`#demo`) + Finale

- **Demo H2:** `Restoranınıza özel<br/><span class="grad-text">canlı demo.</span>`
- **Demo sub:** `Menünüzü birlikte kuralım, ekibinize 15 dakikada gösterelim. Taahhüt yok,
  kredi kartı yok.`
- **How steps:** `1 · Demo planlayın` / `2 · Menünüzü kuralım` / `3 · Ekiple deneyin`
- **Demo actions:** `WhatsApp'tan yazın` (wa.me) · `Hemen arayın · 0242 606 19 91` (tel) ·
  `Demo talep edin` (mailto:info@mixipos.com — confirm address)
- **Finale H2:** `Eski POS'u kapatın.<br/><span class="grad-text">mixipos'u açın.</span>`
- **Finale sub:** `Restoran, kafe, bar veya otel — bugün ücretsiz demo planlayın.`

---

## 7. Build / deploy notes + open-decision recommendations

### Build / deploy (mirror mixifin)

- **Stack:** Astro `^6.4.6`, `output: 'static'`, **zero runtime deps**, Node `>=22.12.0`.
  Scripts `dev` / `build` / `preview`. Output `dist/` — a plain static folder; **no Node
  server** (the README should keep mixifin's "avoid the Hostinger 503" note: deploy as static,
  Framework preset **Astro**, build `npm run build`, output dir `dist`).
- **Fonts:** Sora + Inter via Google Fonts with preconnect (parity with mixifin). Optional
  later: self-host for perf — out of scope for v1.
- **Cache-bust** `?v=N` on css/js/logo; bump per deploy.
- **Targets:** styles.css ~2k lines, script.js ~700 lines — same calibre as the reference.
- **A11y/perf to preserve:** `prefers-reduced-motion` guards on *all* motion incl. the 5 new
  set-pieces; `loading="lazy"` on every photo + the `onerror` placeholder pattern mixifin uses;
  `aria-hidden` on decorative orbs/floats; tabular-nums on KPIs; `scroll-padding-top` for the
  fixed nav.
- **Pre-launch indexing:** if the site goes up before launch, consider `robots noindex` until
  ready (operator call) — flag, don't assume.

### Open-decision recommendations

1. **Pre-register / campaign form → recommend Option A (no form).** mixipos has no confirmed
   public endpoint, so **remove the fetch POST, the tier evaluation, and the credit-lock copy.**
   Replace the campaign section with a **demo/iletişim CTA** using `tel:` + `wa.me` + `mailto:`
   (zero backend, can't silently fail). **Do NOT** point at maxirez's mixifin endpoint or invent
   one. *If* the operator later confirms a real endpoint, a 3-field demo-request form can be
   added then (reuse mixifin's validated submit handler). *Optional now:* a **display-only
   launch countdown** to a fixed confirmed date (pure clock, no backend) — keeps that animation
   in the showcase. Drop it if there's no date.
2. **Orange hexes + warm base → locked in §2.** Recommendation: **warm the dark base** (yes) —
   `#160b05/#1f1008/#29160b`. Plus a dedicated `--accent-ink #c2410c` for small accent text on
   light (bright orange is illegible there — easy miss).
3. **Section order & featured segments → §1.** Five 2-col spotlights (AI / ciro+heatmap / QR /
   KDS / oda-folio); feature **otel** + **restoran** as the wide segment cards.
4. **GA4 id:** placeholder `G-XXXXXXXXXX`; **never** ship mixifin's `G-HG5997R7VH`.
5. **Domain:** `https://mixipos.com` everywhere (canonical/OG/sitemap/robots) — confirm.
6. **Contact details:** reuse Adviceal `+90 242 606 19 91` + Antalya addresses + socials
   (same company) — **confirm** they apply to mixipos; add a WhatsApp number; confirm a public
   email (the session's `integrations@adviceal.com` looks internal — prefer `info@mixipos.com`).
7. **`panel-screenshot.png` honesty:** mixifin's §"Gerçek ekran / Çalışan ürün" claims a *real*
   production screenshot. If mixipos has no live panel, **either** generate a clearly-labeled
   "**ürün önizlemesi**" mock **or** drop the §11 image section and let the HTML hero mock carry
   it. Don't claim "konsept değil, çalışan ürün" unless true.
8. **Testimonials honesty:** mixifin frames quotes as "önizleme kullananlar." For a pre-launch
   POS, use **real pilot quotes** or explicitly illustrative framing ("temsilîdir") — fabricated
   named/located customers are a trust + legal risk. Flag for operator sign-off.
9. **Feature-claim truthfulness:** gate `iyzico/PayTR`, `PMS oda folio`, and `offline sync` on
   actual availability; use mixifin's existing **"yakında"** badge pattern for anything not yet
   shipped, so marketing stays honest.

### My distinct contributions for the MERGE (vs a naive port)

- 5 **new POS-native vanilla set-pieces** (KDS kanban flow, QR phone flow, oda-folio transform,
  payment-mix donut with an oda-folio slice, peak-hour heatmap).
- The **`--accent-ink` legibility var** + the explicit hardcoded-color search/replace map
  (§2) — the part of an orange re-theme that silently breaks if missed.
- **Drop-the-backend** stance with a concrete zero-backend CTA, plus the optional
  display-only countdown to keep the animation showcase intact.
- **Honesty guardrails** (GA4 id, "gerçek ekran" claim, testimonials, "yakında" gating).
- Internally-consistent demo numbers (ciro/sipariş/ortalama adisyon reconcile; the donut
  teases the USP).
```
