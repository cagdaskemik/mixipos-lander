# mixipos-lander implementation plan (GPT)

## 1. Section-by-section page outline (copy angle + key visual/animation per section).

Recommended page order: keep the mixifin rhythm, but make the story more operational and POS-native. The page should feel like a live restaurant/hotel F&B command center, not a generic SaaS splash page.

1. Nav
   - Copy angle: simple product navigation for a buyer already comparing POS/adisyon tools.
   - Links: "AI Dashboard", "QR Sipariş", "Mutfak", "Otel Folio", "Özellikler", "SSS".
   - CTAs: primary "Demo isteyin", secondary phone "0242 606 19 91"; optional "Panel girişi" only if a real mixipos app URL is confirmed.
   - Key visual/animation: mixifin frosted nav on scroll, top progress bar, mobile burger sheet. On light hero, nav text should be dark until scrolled; mobile sheet should be warm paper, not dark.

2. Hero: "restaurant floor + hotel F&B command center"
   - Copy angle: "Restoran, kafe ve otel F&B için AI destekli POS; adisyon, QR sipariş, KDS ve oda folio tek akışta."
   - Primary visual: hand-built animated POS dashboard mock, not a static screenshot. Chrome URL should read `app.mixipos.com` if confirmed, otherwise `mixipos panel`.
   - Dashboard modules: KPI row with "Günün cirosu", "Açık masa", "Ortalama adisyon", "Odaya yazılan"; main SVG chart "Saatlik sipariş ve ciro"; right/bottom mini widgets "KDS bekleme", "Ödeme dağılımı", "Kritik stok".
   - Floating cards: "Masa 12 QR siparişi geldi", "Oda 214'e eklendi", "Mutfak: 3 ürün hazır".
   - Key visual/animation: warm aurora heat-glow fields, dashboard 3D tilt on pointer:fine, KPI count-ups, chart stroke draw, staggered bars, donut payment mix, float cards, primary CTA shine.

3. Feature marquee
   - Copy angle: immediate scan of POS depth.
   - Marquee terms: "AI Dashboard", "QR Sipariş", "Adisyon Böl", "Masa Taşı", "KDS", "Oda Folio", "Z Raporu", "Vardiya", "Akıllı Stok", "Garson Performansı", "Çok Outlet", "Canlı Güncelleme".
   - Key visual/animation: exact mixifin infinite marquee belt, recolored to orange with restrained separators.

4. Adviceal family statement
   - Copy angle: mixipos is the F&B/POS member of the minirez, maxirez, mixifin family. Emphasize continuity: reservation, agency, finance, POS.
   - Suggested copy direction: "Rezervasyonu minirez yönetir, acenteyi maxirez büyütür, finansı mixifin toparlar. Masadaki adisyonu, mutfağı ve otel F&B akışını mixipos hızlandırır."
   - Key visual/animation: family pills with `mixipos` highlighted as hot/orange. Keep the mixifin quote area but rewrite around operations, not accounting.

5. AI dashboard spotlight
   - Copy angle: AI is not a chatbot decoration; it answers operational questions from live POS data.
   - Questions in chat chips: "Bugün en çok ne sattım?", "Saat 20.00 için kaç garson gerekir?", "Hangi ürün stokta riskli?", "İptal/void artışı var mı?"
   - Visual: assistant chat next to insight cards: "Yoğun saat: 20.00-22.00", "Tahmini gün sonu: 86.400 TL", "Anomali: Masa 7'de yüksek iptal".
   - Key visual/animation: mixifin simulated typing loop + clickable chips; add small pulsing "canlı veri" dot and a short insight-card cascade after each answer.

6. Features grid: the 8 core capabilities
   - Copy angle: everything a venue needs, grouped as operational outcomes instead of module names.
   - Cards: AI Akıllı Dashboard; QR ile self-servis sipariş; Adisyon esnekliği; Mutfak Ekranı (KDS); Oda folio entegrasyonu; Akıllı stok; Kasa & vardiya; Tam denetim izi & raporlar.
   - Key visual/animation: mixifin 3-column feature grid, reveal stagger, icon hover rotate/scale, orange top rule on hover. Use compact tags on each card.

7. QR self-servis spotlight
   - Copy angle: guests order from their own phone without app install; staff keeps control with approval/status flow.
   - Visual: two-column section with phone mock, table QR placard, and a POS order queue. The phone side shows category chips and cart; the POS side shows "Onay bekliyor -> Mutfağa gönderildi -> Hazırlanıyor -> Servise hazır".
   - Key visual/animation: stepper states advance with a slow CSS/JS loop; QR card has subtle pulse; order ticket slides from phone to KDS queue. Reduced motion shows final state.

8. KDS / mutfak spotlight
   - Copy angle: kitchen sees a live queue, not paper tickets or verbal chaos.
   - Visual: dark KDS board with lanes "Yeni", "Hazırlanıyor", "Hazır", "Servis"; tickets include elapsed times and item modifiers.
   - Key visual/animation: ticket cards gently move between columns; elapsed timer count-up; "Hazır" lane gets an orange/green status flash. Keep it deterministic and lightweight.

9. Oda folio / hotel F&B spotlight
   - Copy angle: this is the strongest USP. Put it before segment cards so hotel buyers see it before general use cases.
   - Visual: split mini-flow: POS adisyon on left, hotel room folio on right. Action button "Odaya yaz" sends a glowing line/receipt chip to "214 - Deniz Yılmaz"; status toast "PMS foliosuna işlendi".
   - Key visual/animation: one-click transfer animation, folio line item fade-in, count-up "Bugün odaya yazılan: 18.740 TL". Use PMS/minirez/maxirez integration language without overclaiming exact connector behavior unless confirmed.

10. "Kimler için?" photo segment cards
   - Copy angle: realistic Turkish venues and hotel F&B, not abstract industries.
   - Cards: Restoran, Kafe & Bar, Otel F&B, QR/self-servis mekanlar, Hızlı servis & mağaza.
   - Key visual/animation: mixifin 5-card layout, 16:9 generated photos, photo zoom on hover, reveal stagger. First row should feature Restoran and Otel F&B as the wider cards.

11. Stok & kasa / gün sonu spotlight
   - Copy angle: after service ends, the back-office pain starts; mixipos closes that gap.
   - Visual: "Vardiya kapanışı" panel with nakit/kart/yemek kartı totals, Z-raporu, sapma warning; next to it an ingredient stock list with automatic decrement and critical-stock forecast.
   - Key visual/animation: mini bars for payment mix, warning pill pulse for "Sapma: 420 TL", stock level bars filling/depleting, checklist ticks for "Kasa sayıldı", "Z raporu alındı", "Rapor gönderildi".

12. Live architecture / integrations
   - Copy angle: live updates, hotel PMS flow, payment providers, multi-outlet controls, and Adviceal ecosystem.
   - Visual: integration map with central `mixipos` node and connected nodes: "minirez / maxirez", "PMS oda folio", "iyzico", "PayTR", "QR Menü", "Mutfak Ekranı", "Raporlar".
   - Key visual/animation: thin orange pulse moving across connection lines. No external logos unless brand-use is approved; text nodes are safer.

13. Buyer criteria / SEO comparison section
   - Copy angle: help search visitors evaluate "restoran POS programı" without naming competitors.
   - Cards: "Adisyon hızı", "Otel folio desteği", "Canlı mutfak akışı", "QR sipariş kontrolü", "Kasa-vardiya denetimi", "AI raporlama".
   - Key visual/animation: simple cards; this is for SEO and credibility, not spectacle.

14. Testimonials / proof
   - Copy angle: only use real quotes if the operator can approve them. Otherwise make this "Saha senaryoları" rather than fabricated testimonials.
   - Recommended default: three scenario cards: "Akşam yoğunluğu", "Otel oda servisi", "Kapanış ve kasa". If real users exist, swap into quote cards with names/roles.
   - Key visual/animation: mixifin quote card layout, reveal stagger, warm avatar initials.

15. FAQ
   - Copy angle: answer buying objections: QR flow, internet/device needs, hotel folio, payments, stock, multi-outlet, setup/migration, pricing/demo.
   - Key visual/animation: native `<details>` accordion like mixifin, orange plus/rotate, first item open.

16. Final CTA
   - Copy angle: "Masadaki siparişi, mutfaktaki akışı ve otel foliosunu aynı yerden yönetin."
   - Visual: dark warm closing band with soft horizon glow.
   - CTAs: "Demo isteyin" and "Bizi arayın - 0242 606 19 91".
   - Key visual/animation: primary shine, no fake countdown unless a real campaign is confirmed.

17. Footer
   - Copy angle: Adviceal product family and company trust.
   - Content: short product sentence, Adviceal family links, social links from mixifin, legal address/phone, copyright.
   - Key visual/animation: simple hover states only.

## 2. The exact CSS-variable palette you recommend (final orange hexes).

Use orange as an accent system, not body text. Body copy stays dark ink on light paper or warm white on dark sections.

Recommended final `:root` values:

```css
--bg0: #140804;
--bg1: #1b0f08;
--bg2: #251407;
--ink: #fff7ed;
--muted: #c9ad98;
--line: rgba(255, 180, 84, 0.16);

--brand1: #ffb238;
--brand2: #ff7a1a;
--brand3: #f05200;
--grad: linear-gradient(100deg, var(--brand1), var(--brand2) 55%, var(--brand3));

--gold: #ffbd5a;
--ok: #34d399;
--warn: #fb7185;

--paper: #fff8f0;
--paper-tint: #fff0df;
--ink-dark: #241209;
--muted-dark: #70584a;
--line-dark: rgba(96, 45, 16, 0.12);

--font-display: 'Sora', 'Segoe UI', system-ui, sans-serif;
--font-text: 'Inter', 'Segoe UI', system-ui, sans-serif;
--radius: 18px;
--radius-sm: 12px;
--shadow: 0 24px 70px -28px rgba(45, 19, 4, 0.62);
--maxw: 1180px;
```

Supporting color notes:
- `--brand1` is the readable amber highlight for chips, pulses, and chart dots.
- `--brand2` is the main CTA orange.
- `--brand3` gives depth without becoming red.
- Warm dark base is mandatory for orange glows; cold navy would make the page look like a recolored finance product.
- Light paper should be warm but not beige-heavy. Keep large white surfaces close to `#fff8f0`; use orange mainly as rules, pills, icons, gradients, and chart strokes.

## 3. Full animation/interaction port list (mixifin technique -> mixipos re-skin).

1. Scroll progress bar -> orange gradient progress bar across the top.
   - Keep exact transform `scaleX` technique. Use `--grad`.

2. Frosted nav on scroll -> warm translucent paper/dark nav depending section.
   - Same `is-scrolled` class. On hero, nav is light/paper; over dark CTA/finale it can retain dark glass if implementation adds section-aware styling, otherwise keep light for simplicity.

3. Mobile burger sheet -> POS section links.
   - Same `aria-expanded` handling and close-on-link-click behavior.

4. Smooth hash scrolling with fixed-nav offset -> all anchor links.
   - Preserve mixifin's hash target decoding and hash settling on page load.

5. IntersectionObserver `.reveal` fade-up -> every section, card group, spotlight visual.
   - Same threshold/rootMargin. Preserve instant reveal under `prefers-reduced-motion`.

6. Warm aurora drift -> restaurant heat/light glow.
   - Re-skin the blur fields to amber/orange and place them as broad atmospheric glows, not visible decorative dots. Use the same `drift` keyframe.

7. Hero grid/horizon -> subtle service-floor command center background.
   - Keep the grid but warm the lines; horizon becomes a low orange glow under the dashboard.

8. Floating hero cards / `floaty` -> live POS events.
   - Cards: QR order, room folio posted, KDS ready. Same `floaty` keyframe, staggered delays.

9. Hero dashboard 3D tilt -> POS mock tilt on pointer:fine only.
   - Same pointer guard and reduced-motion guard. Keep tilt smaller than mixifin if the POS mock gets visually dense.

10. KPI count-up numbers -> daily POS metrics.
    - Use `Intl.NumberFormat('tr-TR')`; values: ciro, sipariş, ortalama adisyon, odaya yazılan. Currency can be rendered as fixed prefix `₺` with number span.

11. SVG smooth chart helper -> "Saatlik sipariş ve ciro" chart.
    - Reuse Catmull-Rom path helper, grid, area fade, stroke-dashoffset draw, and staggered bars.
    - Data modes: "Bugün" and "Hafta"; labels like `10:00`, `14:00`, `18:00`, `22:00` or weekdays.

12. Hero chart toggle -> today/week or ciro/sipariş.
    - Same button `is-on` pattern. Use real POS labels, not finance labels.

13. Mini bar chart -> payment and order-channel mix.
    - Re-skin income/expense bars to "Masa", "QR", "Oda", "Paket" or "Nakit", "Kart", "Oda", "Online".

14. Donut stroke-dasharray -> payment distribution or adisyon status.
    - Suggested donut: `Kart 52%`, `Nakit 18%`, `Oda 21%`, `QR/Online 9%`. Use orange, amber, green, warning colors.

15. Big spotlight chart -> AI dashboard or daypart heat map.
    - Instead of mixifin cashflow, use "Günün yoğunluğu ve tahmini ciro". Keep chart draw on intersection.

16. Simulated assistant chat typing -> AI POS dashboard.
    - Rewrite QA. Preserve token cancellation, clickable chips, typing indicator, reduced-motion static first answer.

17. Live campaign countdown -> only for a confirmed real campaign.
    - Do not ship fake scarcity. If operator confirms dates, port countdown cells/tier painter exactly. If not confirmed, omit visible countdown and use final CTA/demo section instead.

18. Primary-button shine sweep -> "Demo isteyin" buttons.
    - Same pseudo-element shine. Ensure contrast text is dark ink on orange gradient.

19. Marquee belt -> POS capability belt.
    - Same infinite track duplication. Pause is not necessary, but reduced motion should stop animation.

20. Card hover polish -> feature, segment, integration, quote cards.
    - Same lift/shadow/top-gradient idea; orange border on hover. Photo cards zoom gently.

21. Screenshot pins -> real product screenshot or hero dashboard snapshot.
    - If a real mixipos screenshot exists, use pins: "Canlı KDS", "Oda folio", "AI özet". If not, do not call it "gerçek ekran"; call it "ürün akışı mockup".

22. FAQ details interaction -> native accessible accordion.
    - Same plus rotation and open-state border.

23. Form validation/fetch from mixifin -> do not port until endpoint exists.
    - If endpoint is confirmed later, reuse mixifin's `preventDefault`, required-field validation, inline error, disabled submit, success panel. Until then, no fake POST URL.

24. `prefers-reduced-motion` support -> fully preserved.
    - Disable drift, marquee, shine, float, chart transitions, typing loops, ticket movement; render final static states.

Extra polish to add without dependencies:
- Add a "busy service" rhythm: hero floating cards should not all move vertically in sync; offset delays and positions.
- Keep dashboard labels short so Turkish text does not overflow on mobile.
- On mobile, hide dense secondary widgets like mixifin does; keep KPI cards + one chart visible.
- Use tabular numerals for all monetary/order counters.

## 4. File/asset manifest (every file to create; the 5 photo specs w/ filenames + alt + prompt).

Project files to create:

1. `package.json`
   - Astro `^6.4.6`, `output: static`, scripts `dev`, `build`, `preview`.
   - Enforce/declare Node `>=22.12.0`.

2. `package-lock.json`
   - Generated by npm install. Do not hand-author.

3. `astro.config.mjs`
   - Static output. No integrations unless Astro requires local defaults.

4. `src/pages/index.astro`
   - All sections inlined, full head/meta/JSON-LD, section data arrays, FAQ array, schema graph.
   - Link `/styles.css?v=1` and `/script.js?v=1`.

5. `public/styles.css`
   - Full design system, orange variables, layout, responsive behavior, reduced-motion rules.
   - Mirror mixifin structure: base, buttons/chips, nav, hero/mock, marquee, statement, sections, features, spotlights, photos, FAQ, CTA, footer, reveal overrides.

6. `public/script.js`
   - All vanilla interactions: progress, nav, smooth anchors, reveals, counters, SVG charts, donut, tilt, AI chat, QR/KDS demo loops, optional countdown only if confirmed, optional form only if endpoint confirmed.

7. `public/favicon.svg`
   - Orange mixipos mark. Use a rounded square and a simple POS/adisyon line motif; no detailed receipt text.

8. `public/robots.txt`
   - Allow all, sitemap at `https://mixipos.com/sitemap.xml` once domain confirmed.

9. `public/sitemap.xml`
   - Single root URL, `lastmod` set to build date, canonical `https://mixipos.com/` once confirmed.

10. `public/assets/mixipos-logo.png`
    - Transparent wordmark for header, orange gradient, around 512x132 source so it renders crisp at ~128x33/40.

11. `public/assets/mixipos-logo.svg`
    - Optional vector source for footer/fallback if the builder wants SVG instead of PNG. Keep same visual as PNG.

12. `public/assets/panel-screenshot.png`
    - Product screenshot/mock for OG and "ekran" section. If no real app screenshot exists, generate from the implemented dashboard mock and label it as a mockup, not a real screen.
    - Target OG crop: 1920x929 or 1200x630 derivative; keep orange dashboard visible.

13. `public/assets/og-mixipos.png`
    - Optional social-card derivative if `panel-screenshot.png` is too UI-dense. If created, use it for OG/Twitter; otherwise use `panel-screenshot.png`.

14. `public/assets/photos/restoran.jpg`
    - Alt: "Restoranda garsonun masada tablet POS ile adisyon aldığı sıcak ışıklı servis sahnesi"
    - Prompt: "Realistic documentary photo of a modern Turkish restaurant during dinner service, waiter standing beside a table using a handheld tablet POS terminal, guests visible but not looking at camera, warm amber restaurant lighting, subtle orange highlights, professional hospitality atmosphere, no brand logos, no readable text, natural composition, 16:9, high resolution, JPEG."

15. `public/assets/photos/kafebar.jpg`
    - Alt: "Kafe bar tezgahında baristanın dokunmatik POS terminalinden sipariş girdiği sahne"
    - Prompt: "Realistic Turkish cafe and bar counter scene, barista or bartender using a touchscreen POS terminal near espresso machine and glassware, warm practical lights, orange-friendly color grade, small business atmosphere, shallow depth of field but POS action clear, no brand logos, no readable text, 16:9, high resolution, JPEG."

16. `public/assets/photos/otel.jpg`
    - Alt: "Otel restoranında oda servisi ve F&B adisyonunun odaya yazıldığı operasyon sahnesi"
    - Prompt: "Realistic hotel food and beverage scene in Turkey, elegant hotel restaurant or room service area, staff member with tablet POS preparing to post a restaurant charge to a guest room, room service trolley or hotel dining context visible, warm premium lighting, subtle orange accents, no brand logos, no readable text, 16:9, high resolution, JPEG."

17. `public/assets/photos/qrsiparis.jpg`
    - Alt: "Misafirin restoranda masadaki QR menüyü telefonuyla okutup sipariş verdiği sahne"
    - Prompt: "Realistic close lifestyle photo in a Turkish restaurant, guest scanning a small QR menu placard on the table with a smartphone and placing an order, food/drinks softly visible, warm orange evening lighting, phone UI not readable, QR code abstract and non-functional, no brand logos, 16:9, high resolution, JPEG."

18. `public/assets/photos/magaza.jpg`
    - Alt: "Hızlı servis noktasında kasiyerin dokunmatik POS ekranıyla satış yaptığı sahne"
    - Prompt: "Realistic quick service retail or bakery counter in Turkey, cashier using a modern touchscreen POS while customer waits, takeaway packages and small shop shelves visible, warm amber lighting, clean operational feel, no brand logos, no readable text, 16:9, high resolution, JPEG."

Filename recommendation: use `magaza.jpg` instead of `mağaza.jpg` for ASCII-safe URLs and deployment portability.

## 5. SEO/JSON-LD plan (titles, keywords, schema).

Canonical/domain:
- Use `siteUrl = 'https://mixipos.com/'` as placeholder, but confirm before launch.
- `hreflang`: `tr-TR` and `x-default`.
- `theme-color`: `#140804` for browser UI; CTA/brand color remains `#ff7a1a`.

Recommended title:
- `Restoran POS ve Adisyon Programı | mixipos`

Recommended meta description:
- `Restoran, kafe, bar ve otel F&B için AI destekli POS: adisyon, QR sipariş, mutfak ekranı, stok, kasa-vardiya ve oda folio entegrasyonu.`

Recommended OG/Twitter:
- OG title: `mixipos | Restoran, kafe ve otel F&B için akıllı POS`
- OG description: same as meta description or a slightly shorter version.
- OG image: `/assets/panel-screenshot.png` or `/assets/og-mixipos.png`.
- OG image alt: `mixipos AI destekli restoran POS, QR sipariş, KDS ve oda folio paneli`.

Keywords:
- restoran POS programı
- adisyon programı
- restoran adisyon sistemi
- kafe POS programı
- bar POS sistemi
- otel POS programı
- otel F&B POS
- oda folio POS entegrasyonu
- QR sipariş sistemi
- QR menü sipariş
- mutfak ekranı KDS
- restoran stok takibi
- kasa vardiya yönetimi
- Z raporu POS
- garson performans raporu
- AI destekli POS
- çok şubeli restoran POS
- çok outlet otel POS
- restoran ödeme entegrasyonu

JSON-LD graph:

1. `Organization`
   - Same Adviceal legal/company data as mixifin unless operator updates it.
   - Brand nested as `mixipos`.
   - Social `sameAs` same as Adviceal.

2. `WebSite`
   - Name `mixipos`, URL, `inLanguage: tr-TR`, publisher Organization.

3. `WebPage`
   - Name/title/description/canonical, primary image, about SoftwareApplication.

4. `SoftwareApplication`
   - Name `mixipos`.
   - `applicationCategory: BusinessApplication`.
   - Add `applicationSubCategory: Point of Sale Software`.
   - `operatingSystem: Web`.
   - `inLanguage: tr-TR`.
   - `audience`: restaurants, cafes, bars, hotel F&B outlets, room service, quick-service venues.
   - Do not declare a fake free price. If pricing is unknown, omit `offers` or use an `Offer` with `priceSpecification` only after operator confirms.
   - `featureList`:
     - AI akıllı dashboard ve canlı POS KPI'ları
     - QR ile self-servis sipariş
     - Adisyon bölme, birleştirme, masa taşıma ve kişi bazlı ödeme
     - Mutfak ekranı (KDS) ve canlı sipariş durumları
     - Otel oda folio entegrasyonu
     - Akıllı stok, kritik stok ve tükenme tahmini
     - Kasa, vardiya, Z-raporu ve mutabakat
     - Denetim izi, garson performansı ve satış raporları

5. `FAQPage`
   - Generate from the FAQ array used in the section. Suggested FAQ topics:
     - mixipos hangi işletmeler için?
     - QR sipariş için uygulama gerekir mi?
     - Oda folio entegrasyonu nasıl çalışır?
     - Mutfak ekranı gerçek zamanlı mı?
     - Hesap bölme ve masa taşıma var mı?
     - Stok otomatik düşer mi?
     - Kasa kapanışı ve Z-raporu desteklenir mi?
     - Ödeme entegrasyonları hangileri?
     - minirez/maxirez ile ilişkisi nedir?
     - Kurulum ve demo süreci nasıl ilerler?

6. `BreadcrumbList`
   - Single item: mixipos root.

Technical SEO:
- Use one H1 only.
- Every generated photo gets explicit width/height and lazy loading.
- Keep section IDs Turkish-ascii and stable: `ai-dashboard`, `qr-siparis`, `mutfak`, `otel-folio`, `ozellikler`, `kimler`, `entegrasyon`, `sss`.
- `robots.txt` and `sitemap.xml` must match the confirmed domain before deploy.
- GA4 placeholder: leave `G-XXXXXXXXXX` or omit the GA script until KARDIS/operator confirms the actual ID. Do not copy mixifin's live GA ID.

## 6. Copywriting: draft the hero H1/sub + at least the 8 feature card titles+blurbs, in Turkish.

Hero H1:

`Restoran, kafe ve otel F&B için akıllı POS.`

Hero sub:

`Adisyonu açın, QR siparişi alın, mutfağa düşürün, ödemeyi bölün veya otel odasına yazın. mixipos; canlı ciro, masa, stok, kasa ve servis akışını AI destekli tek panelde toplar.`

Hero trust bullets:
- `QR sipariş için uygulama gerekmez`
- `Mutfak ekranı ve canlı durum takibi`
- `Oda folio entegrasyonu`
- `Kasa, vardiya ve denetim izi`

Feature card 1:
- Title: `AI Akıllı Dashboard`
- Blurb: `Günün cirosunu, sipariş sayısını, ortalama adisyonu ve yoğun saatleri canlı izleyin. mixipos anomalileri, ciro tahminini ve satış önerilerini servis başlamadan önünüze getirir.`
- Tags: `Canlı KPI`, `Ciro tahmini`, `Yoğun saat`

Feature card 2:
- Title: `QR ile Self-servis Sipariş`
- Blurb: `Misafir masadaki QR'ı okutur, uygulama indirmeden sipariş verir. Ekip onaylar, durum canlı güncellenir, mutfak neyin ne zaman hazır olacağını anında görür.`
- Tags: `Uygulamasız`, `Onay akışı`, `Canlı durum`

Feature card 3:
- Title: `Esnek Adisyon Yönetimi`
- Blurb: `Hesabı bölün, adisyonları birleştirin, masayı taşıyın veya kişi bazlı ödeme alın. Yoğun serviste kasa ve garson ekibi aynı gerçek zamanlı adisyona bakar.`
- Tags: `Hesap böl`, `Masa taşı`, `Split ödeme`

Feature card 4:
- Title: `Mutfak Ekranı (KDS)`
- Blurb: `Siparişler mutfağa canlı düşer; hazırlanıyor, hazır ve servis durumları tek ekrandan ilerler. Geciken ürünleri ve yoğun istasyonları süreleriyle yakalayın.`
- Tags: `Gerçek zamanlı`, `Hazır bildirimi`, `Süre takibi`

Feature card 5:
- Title: `Oda Folio Entegrasyonu`
- Blurb: `Otel restoranı, barı veya oda servisi adisyonunu tek tıkla misafirin oda foliosuna yazın. F&B geliri ve konaklama hesabı aynı akışta kapanır.`
- Tags: `Otele özel`, `Tek tık`, `F&B folio`

Feature card 6:
- Title: `Akıllı Stok`
- Blurb: `Satılan ürünler stoktan otomatik düşer; kritik seviye, tükenme tahmini, fire, iade ve sayım farkları ekip daha sorun yaşamadan görünür olur.`
- Tags: `Otomatik düşüm`, `Kritik stok`, `Fire/iade`

Feature card 7:
- Title: `Kasa & Vardiya`
- Blurb: `Açılış, kapanış, Z-raporu, nakit-kart-yemek kartı mutabakatı ve vardiya devri aynı ekranda. Sapma varsa gün bitmeden uyarı düşer.`
- Tags: `Z-raporu`, `Mutabakat`, `Sapma uyarısı`

Feature card 8:
- Title: `Denetim İzi & Raporlar`
- Blurb: `İptal, void, indirim, ödeme, masa taşıma ve kullanıcı işlemleri loglanır. Garson performansı, ürün satışı ve outlet raporları yönetime hazır gelir.`
- Tags: `İşlem logu`, `Garson raporu`, `Ürün analizi`

Additional section copy drafts:
- QR spotlight headline: `Misafir sipariş verir, ekip kontrolü kaybetmez.`
- QR spotlight sub: `QR sipariş self-servis hızını getirir; onay, mutfak ve ödeme akışı yine işletmenin kontrolünde kalır.`
- KDS headline: `Mutfak sırayı değil, önceliği görsün.`
- Folio headline: `Otel F&B adisyonu tek tıkla oda hesabında.`
- Stok/kasa headline: `Servis biter, gün sonu beş dakikada kapanır.`
- Final CTA headline: `Masadaki siparişi, mutfaktaki akışı ve otel foliosunu aynı yerden yönetin.`

## 7. Build/deploy notes + open-decision recommendations.

Build/deploy:
- Mirror mixifin exactly: Astro `^6.4.6`, static output, zero runtime frameworks, zero animation libraries.
- Node must be `>=22.12.0`.
- Use hand-authored CSS and vanilla JS only.
- Cache-bust CSS/JS manually with query params: start `/styles.css?v=1`, `/script.js?v=1`; increment after meaningful changes.
- Use the same Google font pairing as mixifin (`Sora` + `Inter`) unless Adviceal has a newer brand font decision.
- Run `npm run build` before handoff. During implementation, also run preview and inspect desktop/mobile screenshots for overflow, dense Turkish labels, and mock dashboard cropping.
- Performance targets: lazy-load all photos, set image dimensions, keep no heavy libraries, avoid video, keep generated JPEGs compressed.
- Accessibility targets: one H1, visible focus states, nav aria labels, burger `aria-expanded`, reduced motion, native details FAQ, high contrast on orange buttons.

Open-decision recommendations:

1. Pre-register/campaign form
   - Recommendation: do not wire a fake endpoint.
   - Default live CTA should be direct demo/contact: `tel:+902426061991` plus a mail/contact link once the operator confirms the right email or CRM URL.
   - Only add a preregister form if a real public endpoint exists. If confirmed, port mixifin's validation/success/error pattern and use source `mixipos-landing`.
   - Only show a countdown if there is a real campaign with real dates. Otherwise omit countdown entirely; fake urgency will weaken trust for hotel/restaurant buyers.

2. Final orange hexes + warm dark base
   - Recommendation: lock the palette in section 2.
   - Yes, the dark base should go warm. The page should feel like amber service lighting and kitchen heat, not a teal product with orange buttons.
   - Keep light sections warm paper, but avoid a beige-heavy look by using white cards and dark ink.

3. Exact section order & spotlight choices
   - Recommendation: spotlight AI, QR, KDS, hotel folio, and stock/kasa. Keep the 8 capabilities in one grid.
   - Move the hotel folio spotlight before "Kimler için?" because it is the clearest differentiator for hotel F&B and ties mixipos back to minirez/maxirez.
   - Put QR and KDS before folio because they prove day-to-day POS credibility first; then folio lands as the hotel-specific advantage.

4. Real screenshot vs mockup
   - Recommendation: if no real mixipos screenshot is available, do not claim "Gerçek ekran". Use "Ürün akışı mockup" or omit the screenshot section and let the hero dashboard carry the visual.
   - If a working product screen exists, add a real screenshot section after features or after KDS, with pins like mixifin.

5. Testimonials
   - Recommendation: do not invent named customer quotes. Use "Saha senaryoları" cards by default. Replace with real testimonials only after operator approval.

6. Domain and analytics
   - Confirm `https://mixipos.com/` before final sitemap/canonical.
   - Do not reuse mixifin GA4 ID. Leave placeholder or omit until confirmed.

7. Asset generation
   - Codex photo agent should generate the five JPEGs at roughly 1672x941, warm/orange-friendly, no brand logos, no readable UI text.
   - Use ASCII filenames; specifically `magaza.jpg`, not `mağaza.jpg`.

8. Implementation guardrails for the frontend agent
   - Keep first viewport dense and useful: no marketing-only hero, no empty decorative cards.
   - Mobile hero should show the H1, CTAs, trust bullets, and a simplified dashboard mock without horizontal scrolling.
   - Do not let orange dominate body backgrounds. Orange should act as warmth, signal, and motion, not a flat one-color theme.
   - Every animation should have a static final state under reduced motion.
