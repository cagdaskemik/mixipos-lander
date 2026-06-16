/* ============================================================
   mixipos lander — interactions
   progress bar, frosted nav, reveals, count-ups, the saatlik
   ciro/sipariş flow charts, kategori bars, ödeme donut, AI chat
   typing demo, plus five POS-native set-pieces: KDS ticket-flow,
   QR order-flow, oda-folio transfer, peak-hour heatmap and the
   integration-constellation pulse. All vanilla, IntersectionObserver
   -gated, and reduced-motion → final static state.
   ============================================================ */
;(() => {
  'use strict'

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const SVGNS = 'http://www.w3.org/2000/svg'
  const fmt = new Intl.NumberFormat('tr-TR')
  const sleep = ms => new Promise(res => setTimeout(res, ms))

  function el(name, attrs) {
    const node = document.createElementNS(SVGNS, name)
    for (const k in attrs) node.setAttribute(k, attrs[k])
    return node
  }

  // Catmull-Rom → cubic bezier for a smooth line through all points.
  function smoothPath(pts) {
    if (pts.length < 2) return ''
    let d = `M ${pts[0][0]},${pts[0][1]}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(i + 2, pts.length - 1)]
      const c1x = p1[0] + (p2[0] - p0[0]) / 6
      const c1y = p1[1] + (p2[1] - p0[1]) / 6
      const c2x = p2[0] - (p3[0] - p1[0]) / 6
      const c2y = p2[1] - (p3[1] - p1[1]) / 6
      d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`
    }
    return d
  }

  /* ---------------- scroll progress ---------------- */
  const progress = document.getElementById('progress')
  const onProgress = () => {
    const doc = document.documentElement
    const max = doc.scrollHeight - innerHeight
    progress.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`
  }
  addEventListener('scroll', onProgress, { passive: true })
  onProgress()

  /* ---------------- nav ---------------- */
  const nav = document.getElementById('nav')
  const burger = document.getElementById('burger')

  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 16)
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open')
    burger.setAttribute('aria-expanded', String(open))
  })
  document.querySelectorAll('.nav__sheet a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open')
      burger.setAttribute('aria-expanded', 'false')
    })
  )

  function findHashTarget(hash) {
    if (!hash || hash === '#') return null
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)))
    } catch {
      return null
    }
  }

  function scrollToHash(hash, behavior = 'smooth') {
    const target = findHashTarget(hash)
    if (!target) return false
    const offset = (nav ? nav.offsetHeight : 0) + 12
    const top = Math.max(0, target.getBoundingClientRect().top + scrollY - offset)
    scrollTo({ top, behavior })
    return true
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = findHashTarget(a.hash)
      if (!target) return
      e.preventDefault()
      history.pushState(null, '', a.hash)
      scrollToHash(a.hash)
    })
  })

  if (location.hash) {
    const settleHash = () => scrollToHash(location.hash, 'auto')
    requestAnimationFrame(() => {
      setTimeout(settleHash, 80)
    })
    addEventListener('load', () => setTimeout(settleHash, 0), { once: true })
  }

  /* ---------------- reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px' }
    )
    revealEls.forEach(el => io.observe(el))
  } else {
    revealEls.forEach(el => el.classList.add('in'))
  }

  /* ---------------- count-up numbers ---------------- */
  function countUp(node) {
    const target = parseInt(node.dataset.count, 10)
    if (reduceMotion) {
      node.textContent = fmt.format(target)
      return
    }
    const dur = 1400
    const t0 = performance.now()
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      node.textContent = fmt.format(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  const counters = document.querySelectorAll('.count')
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            countUp(e.target)
            cio.unobserve(e.target)
          }
        })
      },
      { threshold: 0.6 }
    )
    counters.forEach(node => cio.observe(node))
  } else {
    counters.forEach(countUp)
  }

  /* ---------------- flow chart (ciro line + kart/nakit bars) ----------------
     Balance line = cumulative ciro; twin bars = kart (gold) and nakit (green)
     per slot. The same renderer drives the hero card and the big §ciro chart. */
  const KART = 'rgba(255,194,77,.62)'
  const NAKIT = 'rgba(52,211,153,.5)'

  function renderFlow(cfg) {
    const { svg, ids, balance, kart, nakit, w, h } = cfg
    const padX = 10
    const padTop = 14
    const padBot = 6
    const innerW = w - padX * 2
    const n = balance.length

    const min = Math.min(...balance)
    const max = Math.max(...balance)
    const span = max - min || 1
    const lineBot = h - padBot - h * 0.3
    const pts = balance.map((v, i) => [
      padX + (innerW * i) / (n - 1),
      padTop + (lineBot - padTop) * (1 - (v - min) / span)
    ])

    // grid
    const grid = svg.querySelector(`#${ids.grid}`)
    grid.innerHTML = ''
    for (let i = 1; i <= 3; i++) {
      grid.appendChild(
        el('line', {
          x1: 4, x2: w - 4, y1: (h / 4) * i, y2: (h / 4) * i,
          stroke: 'rgba(255,178,120,.1)', 'stroke-dasharray': '3 6'
        })
      )
    }

    // kart/nakit bars from the bottom edge
    const barsG = svg.querySelector(`#${ids.bars}`)
    barsG.innerHTML = ''
    const barMax = Math.max(...kart, ...nakit) || 1
    const barBand = h * 0.34
    const bw = (innerW / n) * 0.24
    for (let i = 0; i < n; i++) {
      const x = padX + (innerW * i) / (n - 1)
      if (kart[i]) {
        const bh = (kart[i] / barMax) * barBand
        barsG.appendChild(
          el('rect', {
            x: x - bw - 1, y: h - bh, width: bw, height: bh,
            rx: 2, fill: KART, class: 'cbar', style: `transition-delay:${i * 45}ms`
          })
        )
      }
      if (nakit[i]) {
        const bh = (nakit[i] / barMax) * barBand
        barsG.appendChild(
          el('rect', {
            x: x + 1, y: h - bh, width: bw, height: bh,
            rx: 2, fill: NAKIT, class: 'cbar', style: `transition-delay:${i * 45 + 25}ms`
          })
        )
      }
    }

    // line + area
    const line = svg.querySelector(`#${ids.line}`)
    const area = svg.querySelector(`#${ids.area}`)
    const d = smoothPath(pts)
    line.setAttribute('d', d)
    area.setAttribute('d', `${d} L ${pts[n - 1][0]},${h - 2} L ${pts[0][0]},${h - 2} Z`)

    // dots
    if (ids.dots) {
      const dots = svg.querySelector(`#${ids.dots}`)
      dots.innerHTML = ''
      pts.forEach(([x, y], i) => {
        if (i % 2 !== 0 && i !== n - 1) return
        dots.appendChild(
          el('circle', {
            cx: x, cy: y,
            r: i === n - 1 ? 4 : 2.6,
            fill: i === n - 1 ? '#ff7a00' : '#ffb02e'
          })
        )
      })
    }

    // animate
    if (!reduceMotion) {
      const len = line.getTotalLength()
      line.style.strokeDasharray = len
      line.style.strokeDashoffset = len
      line.style.transition = 'none'
      area.style.opacity = '0'
      area.style.transition = 'none'
      void line.getBoundingClientRect()
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.3,.7,.3,1)'
        area.style.transition = 'opacity .9s .7s ease'
        line.style.strokeDashoffset = '0'
        area.style.opacity = '1'
        barsG.querySelectorAll('.cbar').forEach(b => b.classList.add('in'))
      })
    } else {
      barsG.querySelectorAll('.cbar').forEach(b => b.classList.add('in'))
    }
  }

  /* ---------------- hero flow chart (Bugün / Hafta) ---------------- */
  const DAY = {
    balance: [8, 18, 31, 42, 50, 63, 79, 92, 104, 116, 124, 128],
    kart: [5, 7, 9, 8, 6, 9, 11, 10, 9, 8, 6, 4],
    nakit: [3, 3, 4, 3, 2, 4, 5, 3, 3, 4, 2, 2],
    labels: ['12:00', '15:00', '18:00', '21:00', '23:00']
  }
  const WEEK = {
    balance: [98, 112, 105, 121, 158, 182, 140],
    kart: [62, 70, 66, 76, 99, 116, 88],
    nakit: [22, 26, 24, 28, 38, 44, 32],
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
  }
  const flowSvg = document.getElementById('flowChart')
  const xLabels = document.getElementById('xLabels')
  const tglToday = document.getElementById('tglToday')
  const tglWeek = document.getElementById('tglWeek')
  const FLOW_IDS = { grid: 'flowGrid', bars: 'flowBars', area: 'flowArea', line: 'flowLine', dots: 'flowDots' }

  if (flowSvg && xLabels && tglToday && tglWeek) {
    const drawFlow = mode => {
      const data = mode === 'week' ? WEEK : DAY
      renderFlow({ svg: flowSvg, ids: FLOW_IDS, balance: data.balance, kart: data.kart, nakit: data.nakit, w: 560, h: 190 })
      xLabels.innerHTML = data.labels.map(l => `<span>${l}</span>`).join('')
      tglToday.classList.toggle('is-on', mode !== 'week')
      tglWeek.classList.toggle('is-on', mode === 'week')
    }
    tglToday.addEventListener('click', () => drawFlow('today'))
    tglWeek.addEventListener('click', () => drawFlow('week'))
    drawFlow('today')
  }

  /* ---------------- big §ciro chart ---------------- */
  const bigSvg = document.getElementById('bigChart')
  if (bigSvg) {
    const BIG = {
      balance: [9, 16, 28, 39, 47, 60, 75, 88, 101, 113, 121, 128],
      kart: [5, 6, 9, 7, 6, 9, 10, 11, 9, 8, 6, 4],
      nakit: [3, 3, 4, 3, 3, 4, 5, 4, 3, 4, 2, 2]
    }
    const drawBig = () =>
      renderFlow({
        svg: bigSvg,
        ids: { grid: 'bigGrid', bars: 'bigBars', area: 'bigArea', line: 'bigLine', dots: 'bigDots' },
        balance: BIG.balance, kart: BIG.kart, nakit: BIG.nakit, w: 640, h: 250
      })
    if ('IntersectionObserver' in window) {
      const bio = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              drawBig()
              bio.unobserve(e.target)
            }
          })
        },
        { threshold: 0.4 }
      )
      bio.observe(bigSvg)
    } else {
      drawBig()
    }
  }

  /* ---------------- kategori mini-bars ---------------- */
  const catBars = document.getElementById('catBars')
  if (catBars) {
    const CATS = [
      { name: 'Yemek', v: 0.96, c: '#ff7a00' },
      { name: 'İçecek', v: 0.66, c: '#ffc24d' },
      { name: 'Tatlı', v: 0.5, c: '#ffb02e' },
      { name: 'Bar', v: 0.78, c: '#f24a0a' }
    ]
    CATS.forEach((cat, idx) => {
      const col = document.createElement('div')
      col.className = 'cat'
      const bar = document.createElement('i')
      bar.style.height = `${Math.round(cat.v * 56)}px`
      bar.style.background = cat.c
      bar.style.animationDelay = `${idx * 90}ms`
      const lab = document.createElement('span')
      lab.textContent = cat.name
      col.append(bar, lab)
      catBars.appendChild(col)
    })
  }

  /* ---------------- ödeme dağılımı donut ---------------- */
  const donutSegs = document.getElementById('donutSegs')
  if (donutSegs) {
    const DONUT = [
      { v: 56, c: '#ff7a00' },
      { v: 22, c: '#34d399' },
      { v: 12, c: '#ffc24d' },
      { v: 10, c: '#f24a0a' }
    ]
    const R = 54
    const CIRC = 2 * Math.PI * R
    let acc = 0
    const segEls = DONUT.map((s, i) => {
      const segLen = (s.v / 100) * CIRC
      const c = el('circle', {
        cx: 70, cy: 70, r: R, stroke: s.c,
        'stroke-dasharray': `0 ${CIRC}`,
        'stroke-dashoffset': -acc
      })
      c.dataset.target = `${segLen} ${CIRC - segLen}`
      c.style.transition = `stroke-dasharray 1s cubic-bezier(.3,.7,.3,1) ${i * 0.14}s`
      acc += segLen
      donutSegs.appendChild(c)
      return c
    })
    const animateDonut = () => segEls.forEach(c => c.setAttribute('stroke-dasharray', c.dataset.target))
    if ('IntersectionObserver' in window && !reduceMotion) {
      const dio = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              animateDonut()
              dio.unobserve(e.target)
            }
          })
        },
        { threshold: 0.5 }
      )
      dio.observe(document.getElementById('donut'))
    } else {
      animateDonut()
    }
  }

  /* ---------------- mockup 3D tilt ---------------- */
  const mockWrap = document.getElementById('mock')
  const mockCard = document.getElementById('mockCard')
  if (mockWrap && mockCard && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    mockWrap.addEventListener('mousemove', e => {
      const r = mockWrap.getBoundingClientRect()
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -4
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 5
      mockCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    })
    mockWrap.addEventListener('mouseleave', () => {
      mockCard.style.transform = ''
    })
  }

  /* ---------------- AI chat typing demo ---------------- */
  const chatBody = document.getElementById('chatBody')
  const chatChips = document.getElementById('chatChips')
  if (chatBody && chatChips) {
    const QA = [
      {
        q: 'Bugün en çok ne sattım?',
        a: 'En çok satan: <b>Adana porsiyon (128)</b>, ardından <b>köfte (96)</b> ve <b>lahmacun (84)</b>. Tatlıda künefe lider. Ürün satış raporunu açtım.'
      },
      {
        q: 'Şu an en kârlı ürün hangisi?',
        a: 'Birim kârda <b>ev yapımı limonata</b> ve <b>çorbalar</b> öne çıkıyor; ciroda ise <b>Adana</b>. İçecek menüsünü kasada biraz öne çıkarmanı öneririm.'
      },
      {
        q: 'Akşam yoğunluğu nasıl gidiyor?',
        a: '20:00–22:00 arası dünden <b>%18 yoğun</b>. Bu hızla geceyi <b>~₺142.000 ciro</b> ile kapatırsın. Mutfağa 1 kişi daha almanı öneririm.'
      },
      {
        q: 'Stoğu biten ürün var mı?',
        a: '<b>Kıyma</b> kritik seviyede, tahmini <b>1.5 saat</b> sonra tükenir. Tedarikçiye hatırlatma taslağı hazırladım, <b>onayına sunuyorum →</b>'
      }
    ]

    let chatTimer = null
    let chatToken = 0
    const chatWait = ms => new Promise(res => { chatTimer = setTimeout(res, ms) })

    function addMsg(cls, html) {
      const div = document.createElement('div')
      div.className = `msg ${cls}`
      div.innerHTML = html
      chatBody.appendChild(div)
      while (chatBody.children.length > 4) chatBody.removeChild(chatBody.firstChild)
      return div
    }

    async function typeText(node, text, speed) {
      for (let i = 1; i <= text.length; i++) {
        node.textContent = text.slice(0, i)
        await chatWait(speed)
      }
    }

    async function playPair(pair, token) {
      const u = addMsg('msg--user', '')
      await typeText(u, pair.q, 26)
      if (token !== chatToken) return
      await chatWait(420)
      const t = addMsg('msg--ai msg--typing', '<i></i><i></i><i></i>')
      await chatWait(850)
      if (token !== chatToken) return
      t.classList.remove('msg--typing')
      t.innerHTML = pair.a
      await chatWait(2600)
    }

    async function chatLoop() {
      const token = ++chatToken
      let i = 0
      for (;;) {
        if (token !== chatToken) return
        await playPair(QA[i % QA.length], token)
        i++
        if (i % QA.length === 0) {
          await chatWait(1200)
          if (token !== chatToken) return
          chatBody.innerHTML = ''
        }
      }
    }

    if (reduceMotion) {
      addMsg('msg--user', QA[0].q)
      addMsg('msg--ai', QA[0].a)
    } else if ('IntersectionObserver' in window) {
      const chio = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              chatLoop()
              chio.unobserve(e.target)
            }
          })
        },
        { threshold: 0.35 }
      )
      chio.observe(document.getElementById('chat'))
    } else {
      chatLoop()
    }

    chatChips.addEventListener('click', e => {
      const btn = e.target.closest('button[data-q]')
      if (!btn || reduceMotion) return
      clearTimeout(chatTimer)
      const token = ++chatToken
      chatBody.innerHTML = ''
      playPair(QA[parseInt(btn.dataset.q, 10)], token).then(() => {
        if (token === chatToken) chatLoop()
      })
    })
  }

  /* ============================================================
     SET-PIECE 1 — KDS ticket-flow
     Four kanban lanes; tickets advance on an interval while their
     mm:ss timers tick. Reduced-motion → static populated board.
     ============================================================ */
  const kdsRoot = document.getElementById('kds')
  if (kdsRoot) {
    const lanes = [...kdsRoot.querySelectorAll('.kds__lane')].map(l => ({
      cards: l.querySelector('.kds__cards'),
      count: l.querySelector('.kds__count')
    }))
    const MENU = [
      ['Masa 5', ['2× Adana', '1× Ayran']],
      ['Masa 2', ['1× Mercimek', '2× Köfte']],
      ['Masa 8', ['3× Lahmacun', '1× Şalgam']],
      ['Masa 11', ['1× Karışık ızgara', '2× Cacık']],
      ['Masa 4', ['2× Künefe', '2× Çay']],
      ['Masa 7', ['1× Pide', '1× Ayran']],
      ['Masa 1', ['2× Çorba', '1× Pilav']],
      ['Masa 9', ['1× Tavuk şiş', '1× Kola']]
    ]
    const tickets = []
    let seq = 0

    const fmtTimer = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

    function makeTicket(table, items, lane, elapsed) {
      const node = document.createElement('div')
      node.className = 'kds__ticket'
      const head = document.createElement('div')
      head.className = 'kds__tickethead'
      const strong = document.createElement('strong')
      strong.textContent = table
      const timer = document.createElement('span')
      timer.className = 'kds__timer'
      timer.textContent = fmtTimer(elapsed)
      head.append(strong, timer)
      const ul = document.createElement('ul')
      items.forEach(it => {
        const li = document.createElement('li')
        li.textContent = it
        ul.appendChild(li)
      })
      node.append(head, ul)
      if (lane === 2) node.classList.add('is-ready')
      lanes[lane].cards.appendChild(node)
      const t = { table, items, lane, elapsed, node, timer }
      tickets.push(t)
      return t
    }

    const renderCounts = () =>
      lanes.forEach((l, i) => { l.count.textContent = tickets.filter(t => t.lane === i).length })

    // seed the board
    ;[[0, 35], [0, 12], [1, 140], [1, 70], [2, 215], [3, 290]].forEach(([lane, elapsed]) => {
      const m = MENU[seq++ % MENU.length]
      makeTicket(m[0], m[1], lane, elapsed)
    })
    renderCounts()

    if (!reduceMotion) {
      setInterval(() => {
        tickets.forEach(t => { t.elapsed++; t.timer.textContent = fmtTimer(t.elapsed) })
      }, 1000)

      setInterval(() => {
        // advance the most-elapsed ticket that is not yet in Servis
        const movable = tickets.filter(t => t.lane < 3).sort((a, b) => b.elapsed - a.elapsed)
        if (movable.length) {
          const t = movable[0]
          t.lane++
          t.node.style.animation = 'none'
          void t.node.offsetWidth
          t.node.style.animation = ''
          lanes[t.lane].cards.appendChild(t.node)
          t.node.classList.toggle('is-ready', t.lane === 2)
        }
        // retire a served ticket once Servis has more than one
        const served = tickets.filter(t => t.lane === 3)
        if (served.length > 1) {
          const oldest = served.sort((a, b) => b.elapsed - a.elapsed)[0]
          tickets.splice(tickets.indexOf(oldest), 1)
          oldest.node.remove()
        }
        // keep the board fed
        if (tickets.length < 6) {
          const m = MENU[seq++ % MENU.length]
          makeTicket(m[0], m[1], 0, 0)
        }
        renderCounts()
      }, 2600)
    }
  }

  /* ============================================================
     SET-PIECE 2 — QR order-flow
     Phone cycles three steps; on "Mutfağa iletildi" a ticket lands
     in the POS approval queue and advances through its statuses.
     ============================================================ */
  const qrdemo = document.getElementById('qrdemo')
  const qrScreen = document.getElementById('qrScreen')
  const qrDots = document.getElementById('qrDots')
  const qrTicket = document.getElementById('qrTicket')
  const qrBadge = document.getElementById('qrBadge')
  if (qrdemo && qrScreen && qrDots && qrTicket && qrBadge) {
    const STEPS = [
      `<div class="phone__head">🍽 mixipos · <span>Masa 7</span></div>
       <div class="phone__list">
         <div class="phone__item is-pick"><span>Lahmacun</span><b>₺90</b></div>
         <div class="phone__item"><span>Ayran</span><b>₺40</b></div>
         <div class="phone__item"><span>Künefe</span><b>₺160</b></div>
         <div class="phone__item"><span>Çay</span><b>₺25</b></div>
       </div>
       <div class="phone__cta">QR ile menü açıldı</div>`,
      `<div class="phone__head">🛒 Sepetiniz · <span>Masa 7</span></div>
       <div class="phone__list">
         <div class="phone__item"><span>2× Lahmacun</span><b>₺180</b></div>
         <div class="phone__item"><span>1× Ayran</span><b>₺40</b></div>
         <div class="phone__item"><span>1× Künefe</span><b>₺160</b></div>
       </div>
       <div class="phone__total"><span>Toplam</span><b>₺380</b></div>
       <div class="phone__cta">Siparişi gönder →</div>`,
      `<div class="phone__done">
         <div class="phone__check">✓</div>
         <strong>Mutfağa iletildi</strong>
         <span>Tahmini hazır · ~12 dk</span>
       </div>`
    ]
    const BADGES = [
      ['Onay bekliyor', 'qrbadge qrbadge--wait'],
      ['Mutfağa gönderildi', 'qrbadge qrbadge--sent'],
      ['Hazırlanıyor', 'qrbadge qrbadge--prep'],
      ['Servise hazır', 'qrbadge qrbadge--done']
    ]
    const setDots = i => [...qrDots.children].forEach((d, k) => d.classList.toggle('is-on', k === i))
    const showStep = i => { qrScreen.innerHTML = STEPS[i]; setDots(i) }
    const setBadge = i => { qrBadge.textContent = BADGES[i][0]; qrBadge.className = BADGES[i][1] }

    let qrToken = 0
    async function qrLoop() {
      const token = ++qrToken
      for (;;) {
        if (token !== qrToken) return
        qrTicket.hidden = true
        showStep(0); await sleep(1700); if (token !== qrToken) return
        showStep(1); await sleep(1900); if (token !== qrToken) return
        showStep(2); qrTicket.hidden = false; setBadge(0); await sleep(1100); if (token !== qrToken) return
        setBadge(1); await sleep(1100); if (token !== qrToken) return
        setBadge(2); await sleep(1200); if (token !== qrToken) return
        setBadge(3); await sleep(2000); if (token !== qrToken) return
        await sleep(700)
      }
    }

    if (reduceMotion) {
      showStep(2)
      qrTicket.hidden = false
      setBadge(1)
    } else if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              qrLoop()
              o.unobserve(e.target)
            }
          })
        },
        { threshold: 0.3 }
      )
      o.observe(qrdemo)
    } else {
      qrLoop()
    }
  }

  /* ============================================================
     SET-PIECE 3 — oda-folio transfer
     "Masa 4 · Bar · ₺840" → press → chip flies to "Oda 214" →
     folio line + toast appear, count-up runs once.
     ============================================================ */
  const folio = document.getElementById('folio')
  if (folio) {
    const chip = document.getElementById('folioChip')
    const newLine = document.getElementById('folioNew')
    const toast = document.getElementById('folioToast')
    const countEl = document.getElementById('folioCount')
    const btn = document.getElementById('folioBtn')
    const TARGET = 18740
    let folioToken = 0
    let counted = false

    const setCount = v => { countEl.textContent = fmt.format(v) }

    function countUpTo(target) {
      if (reduceMotion) { setCount(target); return }
      const dur = 1300
      const t0 = performance.now()
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(target * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    function reset() {
      chip.classList.remove('is-flying')
      chip.style.removeProperty('--dx')
      chip.style.removeProperty('--dy')
      newLine.classList.remove('is-shown')
      toast.classList.remove('is-shown')
    }

    async function play(token) {
      reset()
      await sleep(600); if (token !== folioToken) return
      const a = chip.getBoundingClientRect()
      const b = newLine.getBoundingClientRect()
      chip.style.setProperty('--dx', `${Math.round(b.left - a.left)}px`)
      chip.style.setProperty('--dy', `${Math.round(b.top - a.top)}px`)
      chip.classList.add('is-flying')
      await sleep(820); if (token !== folioToken) return
      newLine.classList.add('is-shown')
      toast.classList.add('is-shown')
      if (!counted) { counted = true; countUpTo(TARGET) }
      await sleep(2600); if (token !== folioToken) return
    }

    async function loop() {
      const token = ++folioToken
      for (;;) {
        if (token !== folioToken) return
        await play(token)
        await sleep(1200)
      }
    }

    if (reduceMotion) {
      newLine.classList.add('is-shown')
      toast.classList.add('is-shown')
      setCount(TARGET)
    } else if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              loop()
              o.unobserve(e.target)
            }
          })
        },
        { threshold: 0.35 }
      )
      o.observe(folio)
    } else {
      newLine.classList.add('is-shown')
      toast.classList.add('is-shown')
      setCount(TARGET)
    }

    if (btn) {
      btn.addEventListener('click', () => {
        if (reduceMotion) return
        const token = ++folioToken
        play(token)
      })
    }
  }

  /* ============================================================
     SET-PIECE 4 — peak-hour heatmap
     gün × saat grid; cell colour ∝ intensity, staggered reveal.
     ============================================================ */
  const heat = document.getElementById('heat')
  const heatGrid = document.getElementById('heatGrid')
  if (heat && heatGrid) {
    const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
    const HOURS = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const hourCurve = [0.25, 0.52, 0.78, 0.55, 0.34, 0.4, 0.6, 0.8, 0.96, 0.9, 0.62, 0.34]
    const dayWeight = [0.62, 0.66, 0.7, 0.74, 0.9, 1, 0.85]
    const intensity = (di, hi) => Math.min(1, hourCurve[hi] * dayWeight[di] * 1.05)

    const corner = document.createElement('div')
    heatGrid.appendChild(corner)
    HOURS.forEach((h, i) => {
      const c = document.createElement('div')
      c.className = i % 2 ? 'heat__hlabel is-odd' : 'heat__hlabel'
      c.textContent = h
      heatGrid.appendChild(c)
    })
    DAYS.forEach((d, di) => {
      const dl = document.createElement('div')
      dl.className = 'heat__dlabel'
      dl.textContent = d
      heatGrid.appendChild(dl)
      HOURS.forEach((h, hi) => {
        const cell = document.createElement('div')
        cell.className = 'heat__cell'
        cell.style.background = `rgba(255,122,0,${(0.08 + intensity(di, hi) * 0.85).toFixed(3)})`
        cell.style.transitionDelay = `${(di * 12 + hi) * 12}ms`
        heatGrid.appendChild(cell)
      })
    })

    if (reduceMotion) {
      heat.classList.add('in')
    } else if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              heat.classList.add('in')
              o.unobserve(e.target)
            }
          })
        },
        { threshold: 0.2 }
      )
      o.observe(heat)
    } else {
      heat.classList.add('in')
    }
  }

  /* ============================================================
     SET-PIECE 5 — integration-constellation pulse
     A thin orange pulse travels each connector from the central
     mixipos node to every text node.
     ============================================================ */
  const constel = document.getElementById('constel')
  const constelLines = document.getElementById('constelLines')
  if (constel && constelLines) {
    const C = [500, 300]
    const NODES = [[220, 96], [780, 96], [90, 300], [910, 300], [200, 504], [800, 504], [500, 552]]
    NODES.forEach(n => constelLines.appendChild(el('line', { x1: C[0], y1: C[1], x2: n[0], y2: n[1], class: 'base' })))
    const pulses = NODES.map((n, i) => {
      const c = el('circle', { r: 4.5, fill: '#ff7a00', class: 'constel__pulse' })
      constelLines.appendChild(c)
      return { c, n, phase: i / NODES.length }
    })

    let started = false
    function frame(t) {
      pulses.forEach(p => {
        const k = ((t / 2400) + p.phase) % 1
        p.c.setAttribute('cx', (C[0] + (p.n[0] - C[0]) * k).toFixed(1))
        p.c.setAttribute('cy', (C[1] + (p.n[1] - C[1]) * k).toFixed(1))
        p.c.setAttribute('opacity', (Math.sin(k * Math.PI) * 0.9).toFixed(2))
      })
      requestAnimationFrame(frame)
    }
    function start() {
      if (started) return
      started = true
      constel.classList.add('in')
      if (!reduceMotion) requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      constel.classList.add('in')
    } else if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              start()
              o.unobserve(e.target)
            }
          })
        },
        { threshold: 0.25 }
      )
      o.observe(constel)
    } else {
      start()
    }
  }
})()
