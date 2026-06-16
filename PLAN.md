# mixipos-lander — AUTHORITATIVE PLAN (KARDIS merge of Opus-max + GPT-xhigh planners)

> This is the **single source of truth** for the build. It merges `PLAN_CLAUDE.md` (Opus 4.8,
> max effort) and `PLAN_GPT.md` (GPT-5.5, xhigh) — both now under `docs/`. Where they agreed,
> that's locked. Where they diverged, KARDIS chose; the choice + reason is inline.
> **Canonical Turkish copy lives in `docs/PLAN_CLAUDE.md` §6** — use it verbatim except for the
> overrides called out in §F below. Read this whole file before writing any code.

## EXECUTOR DIRECTIVES (read first)
- You are the **Opus 4.8 (max effort)** frontend coder. Build the FULL lander, then **commit and
  push to `main` yourself** (the repo's GitHub remote is empty — your first push creates `main`).
  Push to main IS the deploy.
- **Mirror mixifin-lander's architecture verbatim**: Astro `^6.4.6`, `output:'static'`, **ZERO
  runtime deps**, Node `>=22.12.0`. One `src/pages/index.astro` + `public/styles.css` (~2k lines)
  + `public/script.js` (~700 lines) + favicon/robots/sitemap/assets. No framework, no Tailwind,
  no chart/animation library. Read the reference files in `/home/deck/projects/mixifin-lander`
  as you go — match its calibre of polish.
- **Quality bar = Claude-Fable.** Every section ships its motion; every animation is
  IntersectionObserver-gated and has a **`prefers-reduced-motion` → final static state** fallback.
  Mobile is real work (dense-but-clean hero, no horizontal scroll, short TR labels, tabular-nums).
- **De-slop:** no dead code, no two ways to do one thing, no `catch {}` (surface errors). The
  `docs/` planning files are provenance only — do not ship or reference them at runtime.
- **5 stock photos + OG image are generated in parallel by a codex agent** into
  `public/assets/photos/` and `public/assets/`. Reference them by the EXACT filenames in §D.
  Keep mixifin's `onerror` → gradient-placeholder pattern so a missing image never breaks the
  page. Before your final commit, include whatever assets exist; if some lag, ship anyway (they
  drop in on a later bump).

---

## §A. Canonical section order (20)
Backgrounds alternate light / warm-tint / dark-anchor; spotlights alternate normal / flipped —
exactly like mixifin, so the page breathes. ASCII section ids.

1. **Nav** (`transparent→frosted`) — links: Özellikler · QR Sipariş · Mutfak · Oda Folio · AI · SSS.
   CTAs: "Giriş Yap" (ghost, only if a real app URL is confirmed — else drop) + **"Ücretsiz Demo"**
   (primary, shine). Phone pill `0242 606 19 91`. Frosted-on-scroll, burger sheet (warm paper on
   mobile, NOT dark), top scroll-progress bar.
2. **Hero** (`#hero`, light) — H1 + sub + 4 trust chips + 2 CTAs, product **in motion**: the
   animated **POS dashboard mock** (HTML/CSS, 3D tilt on `pointer:fine`). KPI count-ups, "Saatlik
   ciro & sipariş" SVG chart (toggle Bugün/Hafta), kategori mini-bars, **ödeme-dağılımı donut**
   (teases oda-folio slice), 3 floating cards. Aurora heat-orbs + warm grid + horizon glow.
3. **Marquee** (dark hairline band) — POS vocabulary belt (see copy source).
4. **Statement / Adviceal ailesi** (`#aile`, dark anchor) — family DNA, `mixipos` chip `is-hot`.
5. **AI Akıllı Dashboard spotlight** (`#ai-dashboard`, tint) — chat typing demo + insight-card
   cascade after each answer + "canlı veri" pulse dot.
6. **Features grid** (`#ozellikler`, light) — the **8** core features, reveal stagger, hover lift
   + orange top-rule.
7. **QR self-servis spotlight** (`#qr-siparis`, light, flipped) — phone-mock 3-step order flow →
   POS approval queue (Onay bekliyor → Mutfağa gönderildi → Hazırlanıyor → Servise hazır).
8. **KDS / Mutfak spotlight** (`#mutfak`, tint) — dark KDS board, kanban lanes Yeni/Hazırlanıyor/
   Hazır/Servis, tickets advance with elapsed `mm:ss` timers, "Hazır" status flash.
9. **Oda folio spotlight** (`#oda-folio`, light, flipped) ⭐**USP, placed before segments** —
   one-click "Odaya yaz" transfer animation: adisyon chip flies to "Oda 214 · Deniz Yılmaz",
   toast "PMS foliosuna işlendi", count-up "Bugün odaya yazılan ₺18.740". Pairs with `otel.jpg`.
10. **Ciro & yoğunluk spotlight** (`#ciro`, tint) — big "Ciro & sipariş yoğunluğu" chart (larger
    `renderFlow` instance) **+ peak-hour heatmap** (gün×saat grid, opacity∝intensity, staggered).
11. **Kimler için? / Segments** (`#kimler`, light) — **5 photo cards** (2 wide + 3 narrow), hover
    zoom. Wide = **Restoran & Adisyon** + **Otel & Oda Servisi**; narrow = Kafe & Bar, QR
    Self-Servis, Hızlı Servis / Kasa.
12. **Stok & Kasa / gün sonu spotlight** (`#kasa`, tint) — vardiya kapanışı panel (nakit/kart/
    yemek kartı totals, Z-raporu, "Sapma ₺420" warning pulse) + stock-level bars + checklist ticks.
13. **Stats band** (`#hiz`, light) — compact 6-up "tek bakışta" value props (optional if pacing
    needs it; keep if the page feels long between 12 and 14).
14. **Vardiya / gün akışı timeline** (`#gun`, tint) — açılış → servis → yoğun saat → stok → gün
    sonu → özet (re-skin of mixifin automation timeline).
15. **Entegrasyonlar & canlı mimari** (`#entegrasyon`, light) — **integration constellation**:
    central `mixipos` node + text nodes (minirez/maxirez · PMS oda folio · iyzico · PayTR · QR
    Menü · Mutfak Ekranı · Raporlar), thin orange **pulse traveling the links**. Text nodes only,
    NO external logos.
16. **Seçim kriterleri** (`#kriterler`, tint) — SEO category-criteria block ("adisyon POS
    seçerken"), 3–6 compare cards, no competitor names. Credibility, not spectacle.
17. **Saha senaryoları** (`#senaryolar`, light) — **3 scenario cards** (Akşam yoğunluğu / Otel oda
    servisi / Kapanış ve kasa), NOT fabricated testimonials. (Swap to real named quotes only if
    the operator supplies them.)
18. **Demo CTA** (`#demo`, dark anchor) — replaces mixifin's campaign. 3 how-steps + **tel /
    WhatsApp / mailto** buttons. NO form, NO fake countdown.
19. **SSS** (`#sss`, light) — 8 POS FAQs (feed FAQPage), `<details>` accordion, +→× marker.
20. **Finale** (dark anchor) + **Footer** (near-black, 4-col: Ürün · Adviceal ailesi · İletişim +
    socials + legal).

**Dropped from the source plans:** the standalone "Gerçek ekran / panel-screenshot" section
(honesty — we have no live product screen). The hero HTML mock carries the in-page visual; the
generated dashboard image is used ONLY as the OG/social card (§D), never captioned "gerçek ekran".

---

## §B. LOCKED palette (drop-in replacement for mixifin's `:root`)
Warm the dark base (mandatory — cold navy under orange looks muddy). Orange is an **accent/signal/
motion** system; **body text is never bright orange** (use `--ink` on dark, `--ink-dark` on paper).

```css
:root{
  /* warm near-black base (orange glows on it) */
  --bg0:#160b05; --bg1:#1f1008; --bg2:#29160b;
  --ink:#fdf1e7; --muted:#c3a896; --line:rgba(255,178,120,.14);
  /* ORANGE ramp — whole site inherits --grad */
  --brand1:#ffb02e;  /* marigold amber — gradient light end / glow / chart dots */
  --brand2:#ff7a00;  /* signal orange — core brand / primary CTA */
  --brand3:#f24a0a;  /* ember deep-orange — gradient anchor (depth, not red) */
  --grad:linear-gradient(100deg,var(--brand1),var(--brand2) 52%,var(--brand3));
  --gold:#ffc24d; --ok:#34d399; --warn:#fb7185;     /* keep green/rose readable */
  /* warm light surfaces */
  --paper:#fff8f1; --paper-tint:#fdeee1; --ink-dark:#2a1a10; --muted-dark:#7c6354;
  --line-dark:rgba(42,26,16,.10);
  /* legibility tokens (CRITICAL — bright orange is illegible as small text/strokes on paper) */
  --accent-ink:#c2410c;   /* burnt orange for fcard icon strokes, tag text, inbox arrows on light */
  --on-grad:#2a1304;      /* near-black-brown text ON gradient buttons/pills */
  --font-display:'Sora','Segoe UI',system-ui,sans-serif;
  --font-text:'Inter','Segoe UI',system-ui,sans-serif;
  --radius:18px; --radius-sm:12px; --shadow:0 24px 70px -28px rgba(20,8,2,.7); --maxw:1180px;
}
```
**Hardcoded-color replace map** (mixifin hardcodes these OUTSIDE vars — you MUST swap them, see
`docs/PLAN_CLAUDE.md` §2 for the full list): teal/cyan/blue rgba `45,212,191`→`255,176,46`,
`34,211,238`→`255,122,0`, `59,130,246`→`242,74,10`; cold hairline `148,178,215`→`255,178,120`
(dark)/`42,26,16` (light); SVG chart gradient ids (`#lineGrad`,`#areaFill`,`#bigFill`,etc.) +
donut/dot fills (`#22d3ee`,`#2dd4bf`,`#3b82f6`) → orange ramp (keep `#fb7185` for warn/outflow);
`#04141a`→`var(--on-grad)`; icon strokes `#0d9488` & tag text `#0d7c70/#0d9488`→`var(--accent-ink)`;
`theme-color`→`#160b05`; `::selection`→`rgba(255,122,0,.30)`; favicon + footer `brand__mark`
gradient → orange. **`grad-text` only on large bold display headings, never body/small text.**

---

## §C. Animation / interaction (all vanilla, IO-gated, reduced-motion → final state)
**Direct ports (re-skinned):** scroll-progress bar · frosted nav `is-scrolled` · burger sheet ·
smooth hash scroll + on-load settle · `.reveal` IO fade-up + nth-child stagger · count-up
(ease-out cubic, `Intl.NumberFormat('tr-TR')`) for Günün cirosu/Sipariş/Ortalama adisyon/Açık masa ·
aurora `drift` (amber orbs) · hero grid + horizon glow · 3D tilt hero mock · floating cards
`floaty` (OFFSET delays/positions so they don't bob in sync) · primary-btn `shine` · `pulse`
dots · marquee belt · **`renderFlow`** chart (Catmull-Rom `smoothPath` + `stroke-dashoffset` draw
+ area fade + staggered `scaleY` bars + grid + dots) for hero "saatlik ciro & sipariş" (toggle
Bugün/Hafta) and the big §10 instance · `barup` mini-bars for kategori satışları · **donut**
(`stroke-dasharray`, staggered delay) for ödeme dağılımı · **chat typing demo** (`typeText`,
typing dots, token-cancel loop, clickable chips) for AI Q&A · FAQ `<details>` · global
`prefers-reduced-motion` guard.

**NEW POS-native vanilla set-pieces (build in mixifin's idioms; reduced-motion → static populated):**
1. **KDS ticket-flow** (`#mutfak`) — 4 kanban lanes; `setInterval` advances a ticket + ticks its
   `mm:ss` timer; slide/scale on move (reuse a `msgin`-style keyframe).
2. **QR order-flow** (`#qr-siparis`) — phone frame cycling 3 steps with a stepper; ticket slides
   from phone → KDS queue. Mini `chatLoop` pattern.
3. **Oda-folio transfer** (`#oda-folio`) — reveal "Masa 4 · Bar · ₺840" → press "Odaya yaz" →
   chip flies to "Oda 214" → toast "✓ PMS foliosuna işlendi" + count-up. Inbox-demo pattern.
4. **Peak-hour heatmap** (`#ciro`) — gün×saat grid, cells fade/scale, opacity∝intensity, staggered
   `transition-delay`, IO-triggered.
5. **Integration-constellation pulse** (`#entegrasyon`) — thin orange dash travels the connector
   lines between the central node and each text node.

**Demo numbers (internally consistent — use these):** Günün cirosu **₺128.480** · Sipariş **842** ·
Ortalama adisyon **₺152** (128480/842≈152 ✓) · Açık masa **14**. Donut ödeme dağılımı: **Kart 56 ·
Nakit 22 · Yemek kartı 12 · Oda folio 10** (=100, teases USP).

---

## §D. File / asset manifest
```
mixipos-lander/
├─ package.json            # name "mixipos-lander", astro ^6.4.6, node >=22.12.0, type module, private
├─ package-lock.json       # from npm install (do not hand-author)
├─ astro.config.mjs        # defineConfig({ output:'static' })
├─ .gitignore              # node_modules, dist, .astro, .env
├─ .env.example            # documents optional GA4 id (no secrets)
├─ README.md               # run/build/deploy (adapt mixifin's; remove the form section)
├─ src/pages/index.astro   # head/SEO/JSON-LD + all 20 sections inlined
└─ public/
   ├─ styles.css           # all CSS (~2k lines)         → linked as /styles.css?v=1
   ├─ script.js            # all JS (~700 lines)          → linked as /script.js?v=1
   ├─ favicon.svg          # orange mark
   ├─ robots.txt · sitemap.xml
   └─ assets/
      ├─ mixipos-logo.svg          # PRIMARY wordmark (vector, crisp) — orange --grad fill
      ├─ panel-screenshot.png      # OG/social card ONLY (generated; never captioned "gerçek ekran")
      └─ photos/ restoran.jpg · kafebar.jpg · otel.jpg · qrsiparis.jpg · magaza.jpg
```
ASCII filenames only (`magaza.jpg`, NOT `mağaza.jpg`). Cache-bust `?v=N`, bump per deploy.
**Logo:** prefer an inline/vector `mixipos-logo.svg` wordmark you author (geometric sans, `--grad`
fill) — don't block on a generated PNG. The codex agent provides the photos + OG image.

### The 5 photos (codex agent generates — locked filenames/alt/prompt)
Style contract (ALL): photorealistic candid editorial, real Turkish small-business scenes, warm
amber lighting suiting the orange brand, **1672×941 (16:9)**, JPEG ~150–350 KB, shallow DoF, NO
readable on-screen UI text, NO brand logos, NO watermarks, natural skin tones, subject in
upper-third (cards crop `object-position:center 32%`).
1. `restoran.jpg` — alt `Restoran masasında elindeki dokunmatik POS terminalinden adisyon alan garson` —
   "warm modern Turkish restaurant at golden hour, friendly waiter in clean apron tableside holding a
   handheld POS terminal taking an order, bokeh dining room, editorial, 16:9, no readable screen text, no logos."
2. `kafebar.jpg` — alt `Bar tezgâhının arkasında dokunmatik POS terminalinde ödeme alan barista` —
   "barista/bartender behind a wooden café-bar counter operating a countertop POS touchscreen, warm
   pendant light/orange glow, espresso machine & bottles soft-focus, 16:9, no readable screen text, no logos."
3. `otel.jpg` — alt `Otel restoranında oda servisi hazırlayan, adisyonu odaya yazan üniformalı görevli` —
   "upscale hotel restaurant / room-service; uniformed F&B staff at a station with a POS terminal,
   Mediterranean resort sunset tones through big windows, premium hospitality, 16:9, no readable text, no logos."
4. `qrsiparis.jpg` — alt `Restoran masasındaki QR kodu telefonuyla okutarak sipariş veren genç misafir` —
   "young guest at a restaurant table scanning a small QR stand with a smartphone (screen glow, no readable
   UI), friends/food blurred behind, warm inviting light, warm orange tones, 16:9, no logos."
5. `magaza.jpg` — alt `Hızlı servis tezgâhında dokunmatik POS ekranından satış yapan güleryüzlü kasiyer` —
   "quick-service/takeaway counter, cashier using a touchscreen POS handing a paper bag to a customer,
   bright-but-warm light, modern fast-casual Turkish eatery, menu boards blurred, 16:9, no readable text, no logos."
**OG image** `panel-screenshot.png` (1200×630, warm orange POS-dashboard-style mock — abstract,
no readable text/logos; this is a social card, not a claimed real screenshot).

---

## §E. SEO / meta / JSON-LD (locked)
- **Domain:** `https://mixipos.com/` (KARDIS default — matches mixifin.com family pattern; flagged
  to operator). Canonical + `hreflang` tr-TR + x-default. `theme-color #160b05`.
- **GA4:** placeholder `G-XXXXXXXXXX` — **OMIT the live gtag snippet** (or leave it commented).
  **NEVER ship mixifin's `G-HG5997R7VH`.**
- **Title:** `Restoran, Kafe ve Otel için POS & Adisyon Programı | mixipos`
- **Description:** `Restoran, kafe, bar ve otel F&B için yapay zekâ destekli POS ve adisyon
  programı: QR ile self-servis sipariş, mutfak ekranı (KDS), oda folio entegrasyonu, akıllı stok
  ve canlı ciro takibi. Kurulum yok, tarayıcıdan çalışır.`
- **Keywords:** merge of both lists — restoran pos programı, adisyon programı, qr sipariş, qr menü,
  kafe pos, bar pos, otel pos programı, mutfak ekranı, kds, oda folyo entegrasyonu, restoran
  adisyon programı, garson el terminali, hesap bölme, z raporu, restoran stok takibi, dokunmatik
  pos, çok şubeli pos, yapay zeka pos.
- **Full head** mirrors mixifin (charset/viewport/robots+googlebot/author Adviceal/application-name
  mixipos/content-language tr-TR/color-scheme/canonical/hreflang/OG[website,url,site_name mixipos,
  locale tr_TR, image=panel-screenshot.png +secure_url+type+w/h+alt]/Twitter summary_large_image/
  favicon/Sora+Inter preconnect/styles.css?v=1).
- **JSON-LD `@graph` (6):** Organization (reuse real Adviceal entity from mixifin: legal name
  *AdviceAl … Ltd. Şti.*, url adviceal.com, tel +90 242 606 19 91, Antalya address, brand→mixipos,
  sameAs socials) · WebSite · WebPage · **SoftwareApplication** (name mixipos, applicationCategory
  BusinessApplication, applicationSubCategory "Point of Sale / Restaurant POS", operatingSystem Web,
  inLanguage tr-TR, audience restoran/kafe/bar/otel F&B/hızlı servis, **featureList** = the 8 below;
  **offers** = `{Offer, price "0", priceCurrency "TRY", description "Ücretsiz canlı demo ve kurulum
  danışmanlığı"}` — demo, not a credit campaign) · FAQPage (the 8 FAQs) · BreadcrumbList.
  featureList: AI akıllı dashboard (canlı ciro, anomali, ciro tahmini) · QR ile self-servis sipariş
  · Adisyon böl/birleştir/masa taşı/kişi bazlı ödeme · Mutfak ekranı (KDS) · Otel oda folio
  entegrasyonu (PMS) · Akıllı stok (otomatik düşüm, kritik uyarı, fire/iade) · Kasa & vardiya,
  Z-raporu, mutabakat · Denetim izi & raporlar (garson performansı, ürün satış, iptal/void).
- One H1 only; every photo gets width/height + `loading="lazy"` + onerror placeholder.

---

## §F. Copy source + overrides
**Use `docs/PLAN_CLAUDE.md` §6 as the canonical Turkish copy** — hero H1/sub/chips, hero-mock
numbers, marquee belt, statement, AI chat 4-pair QA + ticklist, the **8 feature cards (titles +
blurbs + tags)**, segment cards, stats, timeline, the **8 FAQs**, demo CTA + finale. It is the
stronger, internally-consistent draft. Apply these OVERRIDES:
- **Hero H1 (primary):** `Siparişten ödemeye,<br/>restoranınızın <span class="grad-text">akıllı
  POS'u.</span>` Sub = Claude's §6 sub.
- **§17 is "Saha senaryoları", NOT testimonials.** 3 scenario cards (no fake names):
  - **Akşam yoğunluğu** — `20.00–22.00 doluyken QR siparişler mutfağa kendiliğinden düşer, garson
    masada kalır; adisyon karışmaz.`
  - **Otel oda servisi** — `Bar ve oda servisi adisyonu tek tıkla misafirin odasına yazılır;
    resepsiyonla mutabakat derdi biter.`
  - **Kapanış ve kasa** — `Servis biter, vardiya kapanır: Z-raporu, nakit-kart mutabakatı ve sapma
    kontrolü beş dakikada.`
  Frame as "Tipik bir mixipos gününden kesitler." Swap to real quotes only if operator supplies.
- **§15 integration constellation nodes:** central `mixipos` → `minirez / maxirez` · `PMS oda
  folio` · `iyzico` · `PayTR` · `QR Menü` · `Mutfak Ekranı` · `Raporlar` (text nodes, orange pulse).
- **Section ids = ascii** per §A.
- **Nav "Giriş Yap"/"Panel girişi":** include ONLY if a real mixipos app URL is confirmed; else omit.

---

## §G. Truthfulness rulings (from KARDIS's mininext POS analysis — honor these)
- **REAL — claim freely:** AI dashboard (canlı KPI/anomali/tahmin/ısı haritası) · QR self-servis
  sipariş + onay akışı · adisyon böl/birleştir/masa taşı/kişi bazlı ödeme · KDS gerçek-zamanlı +
  süre takibi · **oda folio / PMS room-charge** · akıllı stok (atomik düşüm/kritik/fire-iade) ·
  kasa & vardiya / Z-raporu / mutabakat · denetim izi & raporlar · QR menü **TR/EN çift dil** ·
  Socket.io **canlı senkron** · **iyzico & PayTR** ödeme (mininext has these — recent credential
  fixes). çok-outlet/çok-şube, rol-bazlı yetki, anket/memnuniyet.
- **NOT shipped — do NOT hard-claim:** **offline mode** (architecture is "future ready", not live).
  Reword Claude §6 FAQ #3 to "kısa bağlantı kesintilerinde açık adisyon ekranda kalır, bağlantı
  gelince eşitlenir" WITHOUT promising full offline ordering. Anything else you're unsure about →
  use mixifin's **"yakında"** badge pattern rather than overclaim.

## §H. Defaulted open items (flagged to operator; proceed with these)
- Domain `https://mixipos.com` · phone `0242 606 19 91` (Adviceal, same company) · WhatsApp =
  `https://wa.me/902426061991` · email `mailto:info@mixipos.com` (placeholder) · GA4 omitted.
  Socials = Adviceal handles (same company). These are reasonable defaults; operator confirms later.

## §I. Execution & sequencing (KARDIS runs this)
1. **codex image agent** (parallel) → generates the 5 photos + `panel-screenshot.png` OG card into
   `public/assets/...`. No git.
2. **Opus 4.8 max executor** (this plan) → builds all code, includes assets present at commit time,
   `git add -A && commit && push origin main`. Uses onerror fallback so lagging images don't break.
3. KARDIS verifies the push + (if box-deployable) the live page, then reports to operator.
