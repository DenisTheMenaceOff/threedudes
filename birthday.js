/*!
 * birthday.js  -  Bunty's birthday banner for "Three Dudes. Three Bikes."
 *
 * What it does
 *   On 19 October 2026 (the visitor's own calendar day) everyone who opens the site first sees a big
 *   full-screen greeting:  "Bunty, Happy Birthday! 44"  with a warm message from his friends and confetti
 *   in the site colours. A button (or the X, or the Esc key) closes it and the normal site follows.
 *   A slim gold ribbon under the menu lets anyone open the greeting again.
 *   On every other day this file does NOTHING: the page is not touched at all.
 *
 * How to try it today
 *   Open  https://threedudes.travel/?birthday=1   (forces it on, every time)   or   ?birthday=0   (off).
 *
 * How it is wired
 *   index.html and indonesia_roadtrip.html each contain one line:  <script src="birthday.js" defer></script>
 *   Upload this file together with them (same folder). To remove birthday mode later, delete that line.
 */
(function () {
  'use strict';

  /* ==========================================================================================
   * EDIT HERE  -  the words, the age and the date (plain text between the quote marks)
   * ==========================================================================================
   * If a text contains an apostrophe (Bunty's) keep the whole text inside double quotes.
   */
  var DATE = { year: 2026, month: 10, day: 19 };           // month is 1-12: 10 = October
  var AGE = '44';

  var KICKER = 'A birthday on the road';                     // small line at the top of the banner
  var NAME_LINE = 'Bunty,';
  var WISH_LINE = 'Happy Birthday!';
  var GREETING = [                                           // each line is shown on its own row
    'Wishing you open roads, warm sunrises and a tailwind all year long.',
    'May every turn bring a view worth stopping for, and every stop a good meal and good company.',
    'Thank you for being the friend we would ride across two countries with.'
  ];
  var SIGNATURE = 'Your friends, Denis & Adam';
  var CONTINUE_LABEL = 'Continue to the site';

  var RIBBON_TEXT = "Happy birthday, Bunty - 44 today!";     // the slim gold ribbon under the menu
  var EYEBROW_TEXT = "19 October · Bunty's birthday";        // replaces the small line above the main headline
  var PAGE_TITLE_PREFIX = 'Happy birthday, Bunty! 🎂 — ';     // added in front of the browser-tab title

  /* ==========================================================================================
   * CODE  -  leave alone unless you know JavaScript
   * ========================================================================================== */

  var CLOSED_KEY = 'threedudes-bday-' + DATE.year + '-closed';
  // mustard, red, green (two tones, so it shows on the dark banner), peach
  var COLORS = ['#EEB359', '#F7C873', '#CA3C36', '#E0645E', '#50784B', '#8FB38A', '#FAE4C1', '#F2C9A0'];

  function isBirthday(now) {
    return now.getFullYear() === DATE.year && now.getMonth() === DATE.month - 1 && now.getDate() === DATE.day;
  }

  // search = the "?birthday=1" part of the address. Returns {on, preview}.
  function decide(now, search) {
    var m = /[?&]birthday=([A-Za-z0-9]+)/.exec(search || '');
    if (m) {
      var v = m[1].toLowerCase();
      if (v === '1' || v === 'on' || v === 'true') { return { on: true, preview: true }; }
      if (v === '0' || v === 'off' || v === 'false') { return { on: false, preview: false }; }
    }
    return { on: isBirthday(now), preview: false };
  }

  window.BirthdayMode = { isBirthday: isBirthday, decide: decide };

  var verdict = decide(new Date(), window.location.search);
  if (!verdict.on) { return; }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function injectCss() {
    var css =
      /* slim ribbon */
      '.bday-ribbon{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;' +
        'padding:8px 14px;background:#EEB359;color:#241E1A;font:600 12px/1.4 Inter,system-ui,sans-serif;' +
        'letter-spacing:.14em;text-transform:uppercase;text-align:center;position:relative;z-index:5}' +
      '.bday-ribbon>*{margin:0 8px}' +
      '.bday-ribbon .bday-ribbon-text{padding:4px 0}' +
      '.bday-ribbon button{font:inherit;letter-spacing:inherit;text-transform:inherit;color:#241E1A;background:none;' +
        'border:0;border-bottom:1px solid #241E1A;border-radius:0;padding:6px 2px;margin:0;min-height:32px;cursor:pointer}' +
      '.bday-ribbon button:hover{color:#395636;border-bottom-color:#395636}' +
      '.bday-ribbon button:focus-visible,.bday-banner button:focus-visible{outline:2px solid #EEB359;outline-offset:3px}' +
      /* full-screen banner */
      '.bday-banner{position:fixed;top:0;right:0;bottom:0;left:0;z-index:3000;overflow-y:auto;-webkit-overflow-scrolling:touch;' +
        'background:radial-gradient(ellipse at 50% 28%,#4a6b46 0%,#395636 52%,#2b4228 100%);color:#FAE4C1;' +
        'animation:bdayfade .5s ease-out}' +
      '@keyframes bdayfade{from{opacity:0}to{opacity:1}}' +
      '@keyframes bdayrise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}' +
      '.bday-inner{box-sizing:border-box;min-height:100%;display:flex;flex-direction:column;align-items:center;' +
        'justify-content:center;text-align:center;padding:48px 22px 36px;padding:max(48px,env(safe-area-inset-top)) 22px ' +
        'max(36px,env(safe-area-inset-bottom));max-width:760px;margin:0 auto}' +
      '.bday-kicker{font:600 11px/1.4 Inter,system-ui,sans-serif;letter-spacing:.28em;text-transform:uppercase;' +
        'color:#DFD0AE;display:flex;align-items:center;margin-bottom:clamp(14px,3vh,26px);animation:bdayrise .7s .1s both}' +
      '.bday-kicker::before,.bday-kicker::after{content:"";width:28px;height:1px;background:#EEB359}' +
      '.bday-kicker::before{margin-right:14px}.bday-kicker::after{margin-left:14px}' +
      '.bday-name{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:500;' +
        'font-size:clamp(44px,12vw,84px);line-height:1;margin:0;color:#FAE4C1;animation:bdayrise .7s .2s both}' +
      '.bday-wish{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;' +
        'font-size:clamp(46px,13.5vw,100px);line-height:1.02;margin:2px 0 0;color:#EEB359;animation:bdayrise .7s .3s both}' +
      '.bday-age{flex:none;margin:clamp(8px,2vh,18px) 0 clamp(20px,3.6vh,32px);text-align:center;animation:bdayrise .7s .4s both}' +
      '.bday-age span{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-style:normal;font-weight:600;' +
        'font-size:170px;font-size:clamp(136px,min(39vw,23vh),240px);line-height:.86;letter-spacing:0;color:#FAE4C1;font-variant-numeric:lining-nums;' +
        'font-feature-settings:"lnum" 1;text-shadow:0 6px 26px rgba(0,0,0,.28)}' +
      '.bday-inner{position:relative;z-index:1}' +
      '.bday-text{max-width:560px;animation:bdayrise .7s .5s both}' +
      '.bday-text p{margin:0 0 10px;font:400 clamp(16px,4.3vw,19px)/1.6 Inter,system-ui,sans-serif;color:#EFE2C6}' +
      '.bday-sign{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;' +
        'font-size:clamp(22px,6vw,28px);color:#EEB359;margin:12px 0 clamp(20px,4vh,32px);animation:bdayrise .7s .6s both}' +
      '.bday-actions{display:flex;flex-wrap:wrap;justify-content:center;margin:-6px;animation:bdayrise .7s .7s both}' +
      '.bday-actions>button{margin:6px}' +
      '.bday-btn{font:600 12px/1 Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;' +
        'padding:16px 26px;min-height:48px;border-radius:999px;border:1px solid #EEB359;background:#EEB359;color:#241E1A;' +
        'transition:background .2s,color .2s}' +
      '.bday-btn:hover{background:#FAE4C1;border-color:#FAE4C1}' +
      '.bday-btn.ghost{background:transparent;color:#EEB359}' +
      '.bday-btn.ghost:hover{background:#EEB359;color:#241E1A}' +
      '.bday-x{position:absolute;top:max(10px,env(safe-area-inset-top));right:12px;width:48px;height:48px;border:0;' +
        'border-radius:50%;background:transparent;color:#FAE4C1;font-size:32px;line-height:1;cursor:pointer;z-index:3}' +
      '.bday-x:hover{background:rgba(250,228,193,.14)}' +
      '.bday-confetti{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;pointer-events:none;z-index:3100}' +
      '#trip-clock::after{content:"🎂";margin-left:.55em;font-size:18px;line-height:1;align-self:center}' +
      'html.bday-lock{overflow:hidden}' +
      '@media (max-height:760px){.bday-inner{padding-top:max(44px,env(safe-area-inset-top));padding-bottom:max(18px,env(safe-area-inset-bottom))}' +
        '.bday-kicker{margin-bottom:8px}.bday-age{margin:2px 0 12px}.bday-age span{font-size:clamp(100px,29vw,140px)}' +
        '.bday-text p{font-size:14.5px;line-height:1.5;margin-bottom:7px}.bday-sign{font-size:21px;margin:6px 0 14px}' +
        '.bday-btn{padding:13px 22px;min-height:44px}.bday-name{font-size:clamp(40px,11vw,60px)}.bday-wish{font-size:clamp(42px,12.5vw,70px)}}' +
      '@media (max-height:600px){.bday-age span{font-size:84px}.bday-text p{font-size:13.5px;line-height:1.45}}';
    var style = document.createElement('style');
    style.id = 'bday-css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  /* ---------------------------------- confetti ---------------------------------- */
  var confettiRunning = false;
  function confetti() {
    if (reducedMotion() || confettiRunning) { return; }
    confettiRunning = true;
    var canvas = el('canvas', 'bday-confetti');
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    var count = W < 600 ? 110 : 190;
    var parts = [];
    for (var i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * W, y: -20 - Math.random() * H * 0.7,
        vx: -1 + Math.random() * 2, vy: 2.2 + Math.random() * 3.4,
        s: 7 + Math.random() * 7, r: Math.random() * Math.PI * 2, vr: -0.2 + Math.random() * 0.4,
        c: COLORS[i % COLORS.length], round: Math.random() < 0.3, sw: Math.random() * 6.28, sv: 0.03 + Math.random() * 0.05
      });
    }
    var start = null, DURATION = 7000;
    function frame(ts) {
      if (start === null) { start = ts; }
      var t = ts - start;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = t > DURATION - 1200 ? Math.max(0, (DURATION - t) / 1200) : 1;
      for (var k = 0; k < parts.length; k++) {
        var p = parts[k];
        p.sw += p.sv; p.x += p.vx + Math.sin(p.sw) * 0.8; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 6.2832); ctx.fill(); }
        else { ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); }
        ctx.restore();
      }
      if (t < DURATION) { window.requestAnimationFrame(frame); }
      else { window.removeEventListener('resize', size); if (canvas.parentNode) { canvas.parentNode.removeChild(canvas); } confettiRunning = false; }
    }
    window.addEventListener('resize', size);
    window.requestAnimationFrame(frame);
  }

  /* ---------------------------------- the banner ---------------------------------- */
  var banner = null, lastFocus = null;

  function closeBanner() {
    if (!banner) { return; }
    document.removeEventListener('keydown', onKey, true);
    if (banner.parentNode) { banner.parentNode.removeChild(banner); }
    banner = null;
    document.documentElement.classList.remove('bday-lock');
    try { window.sessionStorage.setItem(CLOSED_KEY, '1'); } catch (e) { /* private mode: it may show again - fine */ }
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e2) { /* ignore */ } }
  }

  function onKey(e) {
    if (!banner) { return; }
    if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); closeBanner(); return; }
    if (e.key !== 'Tab') { return; }
    var f = banner.querySelectorAll('button');
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openBanner() {
    if (banner) { return; }
    lastFocus = document.activeElement;
    banner = el('div', 'bday-banner');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'bday-title');

    var x = el('button', 'bday-x', '×');
    x.type = 'button'; x.setAttribute('aria-label', 'Close the birthday greeting');
    x.addEventListener('click', closeBanner);

    var inner = el('div', 'bday-inner');
    inner.appendChild(el('div', 'bday-kicker', KICKER));

    var title = el('div');
    title.id = 'bday-title';
    title.appendChild(el('p', 'bday-name', NAME_LINE));
    title.appendChild(el('p', 'bday-wish', WISH_LINE));
    inner.appendChild(title);

    var age = el('div', 'bday-age'); age.appendChild(el('span', null, AGE));
    age.setAttribute('aria-label', AGE);
    inner.appendChild(age);

    var text = el('div', 'bday-text');
    for (var i = 0; i < GREETING.length; i++) { text.appendChild(el('p', null, GREETING[i])); }
    inner.appendChild(text);
    inner.appendChild(el('div', 'bday-sign', SIGNATURE));

    var actions = el('div', 'bday-actions');
    var go = el('button', 'bday-btn', CONTINUE_LABEL + ' →'); go.type = 'button'; go.addEventListener('click', closeBanner);
    var more = el('button', 'bday-btn ghost', '🎉 Confetti'); more.type = 'button'; more.addEventListener('click', confetti);
    actions.appendChild(go); actions.appendChild(more);
    inner.appendChild(actions);

    banner.appendChild(x); banner.appendChild(inner);
    document.body.appendChild(banner);
    document.documentElement.classList.add('bday-lock');
    document.addEventListener('keydown', onKey, true);
    try { go.focus({ preventScroll: true }); } catch (e3) { /* ignore */ }
    window.setTimeout(confetti, 350);
  }

  /* ---------------------------------- the ribbon ---------------------------------- */
  function buildRibbon() {
    var r = el('div', 'bday-ribbon');
    r.setAttribute('role', 'region');
    r.setAttribute('aria-label', 'Birthday greeting');
    r.appendChild(el('span', 'bday-ribbon-text', '🎂 ' + RIBBON_TEXT + (verdict.preview ? ' (preview)' : '')));
    var b1 = el('button', null, 'Open the greeting'); b1.type = 'button'; b1.addEventListener('click', openBanner);
    var b2 = el('button', null, '🎉 Confetti'); b2.type = 'button'; b2.addEventListener('click', confetti);
    r.appendChild(b1); r.appendChild(b2);
    return r;
  }

  function start() {
    injectCss();
    var bar = document.getElementById('bar');            // home page: header with the clock
    var ribbon = buildRibbon();
    if (bar && bar.parentNode) { bar.parentNode.insertBefore(ribbon, bar.nextSibling); }
    else { document.body.insertBefore(ribbon, document.body.firstChild); }

    document.title = PAGE_TITLE_PREFIX + document.title;
    var eyebrow = document.querySelector('.hero .eyebrow');
    if (eyebrow) { eyebrow.textContent = EYEBROW_TEXT; }

    // Everyone sees the big banner first. After it was closed it stays closed for this visit (this tab);
    // in ?birthday=1 preview it shows every time.
    var closedBefore = false;
    try { closedBefore = window.sessionStorage.getItem(CLOSED_KEY) === '1'; } catch (e) { closedBefore = false; }
    if (verdict.preview || !closedBefore) { openBanner(); }
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); }
  else { start(); }
})();
