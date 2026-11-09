/*  hacker-extras.js
    Drop-in cyber effects for the portfolio. Add before </body>:
    <script src="hacker-extras.js" defer></script>
    Uses the page's own CSS variables, so dark and light mode both work. */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const make = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const NAME = 'Zulquar Nain Ansari';

  /* ---------- styles ---------- */
  const css = `
@property --ha{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes hxSpin{to{--ha:360deg}}
@keyframes hxGlitch{0%{transform:none;filter:none}20%{transform:translate(-3px,1px) skewX(-4deg);filter:drop-shadow(3px 0 #ff2a6d) drop-shadow(-3px 0 #05d9e8)}40%{transform:translate(3px,-1px);filter:drop-shadow(-3px 0 #ff2a6d) drop-shadow(3px 0 #05d9e8)}60%{transform:translate(-2px,0) skewX(3deg)}100%{transform:none;filter:none}}
@keyframes hxFlash{0%{opacity:0}8%{opacity:1}14%{opacity:.2}20%{opacity:1}85%{opacity:1}100%{opacity:0}}

.hx-progress{position:fixed;top:0;left:0;width:100%;height:3px;z-index:220;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--hacker-green),var(--cyan),var(--violet));box-shadow:0 0 14px var(--hacker-green-glow);pointer-events:none}

.hx-hud{position:fixed;left:14px;bottom:14px;z-index:150;display:flex;gap:16px;padding:9px 13px;font:600 11px/1 "Space Grotesk",monospace;letter-spacing:.5px;color:var(--muted);background:var(--nav-bg);border:1px solid var(--line);border-radius:10px;backdrop-filter:blur(10px);font-variant-numeric:tabular-nums;pointer-events:none}
.hx-hud b{color:var(--hacker-green);font-weight:700}
.links a.hx-active{color:var(--hacker-green);text-shadow:0 0 12px var(--hacker-green-glow)}

html.hx-cur *{cursor:none!important}
html.hx-cur .field,html.hx-cur .hx-term input{cursor:text!important}
.hx-dot,.hx-ring{position:fixed;left:0;top:0;pointer-events:none;z-index:10000;border-radius:50%;opacity:0}
.hx-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:var(--hacker-green);box-shadow:0 0 10px var(--hacker-green);transition:opacity .2s}
.hx-ring{width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid var(--hacker-green);transition:opacity .2s,width .25s,height .25s,margin .25s,background .25s}
.hx-ring.hot{width:56px;height:56px;margin:-28px 0 0 -28px;background:rgba(0,255,102,.1)}
.hx-dot.on,.hx-ring.on{opacity:1}
.hx-bit{position:fixed;z-index:10000;pointer-events:none;font:700 12px monospace;color:var(--hacker-green);text-shadow:0 0 8px var(--hacker-green)}

.service::after,.project::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;z-index:3;opacity:0;transition:opacity .3s;background:conic-gradient(from var(--ha),transparent 0 70%,var(--hacker-green),var(--cyan),transparent);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:hxSpin 3s linear infinite}
.service:hover::after,.project:hover::after{opacity:1}
.hx-glitch{animation:hxGlitch .4s steps(2,end)}

.hx-boot{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#02050a;color:#00ff66;font:500 13px/1.8 monospace;transition:opacity .5s,visibility .5s}
.hx-boot.out{opacity:0;visibility:hidden}
.hx-boot>div{width:min(560px,calc(100% - 40px))}
.hx-boot pre{margin:0;min-height:150px;white-space:pre-wrap;font:inherit}
.hx-bar{height:4px;margin-top:14px;background:rgba(0,255,102,.15);border-radius:4px;overflow:hidden}
.hx-bar i{display:block;height:100%;width:0;background:#00ff66;box-shadow:0 0 12px #00ff66;transition:width .25s}
.hx-skip{margin-top:12px;font-size:11px;opacity:.55}

.hx-rain{position:fixed;inset:0;width:100%;height:100%;z-index:9990;pointer-events:none;transition:opacity .6s}
.hx-banner{position:fixed;inset:0;z-index:9998;display:grid;place-items:center;pointer-events:none;font:700 clamp(32px,8vw,96px) "Space Grotesk",monospace;letter-spacing:-2px;color:#00ff66;text-shadow:0 0 30px #00ff66,3px 0 #ff2a6d,-3px 0 #05d9e8;animation:hxFlash 2.2s forwards}

.hx-tbtn{position:fixed;right:18px;bottom:18px;z-index:300;padding:10px 14px;font:700 13px "Space Grotesk",monospace;color:var(--hacker-green);background:var(--nav-bg);border:1px solid var(--hacker-green);border-radius:12px;cursor:pointer;backdrop-filter:blur(10px);box-shadow:0 0 18px var(--hacker-green-glow);transition:transform .25s,box-shadow .25s,background .25s}
.hx-tbtn:hover{transform:translateY(-3px);background:rgba(0,255,102,.14);box-shadow:0 0 28px var(--hacker-green-glow)}
.hx-tbtn:focus-visible,.hx-thead button:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
.hx-term{position:fixed;right:18px;bottom:72px;z-index:300;width:min(440px,calc(100vw - 36px));height:min(340px,60vh);display:flex;flex-direction:column;background:rgba(2,6,12,.96);color:#c9ffe0;border:1px solid var(--hacker-green);border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 30px var(--hacker-green-glow);font:500 12.5px/1.65 monospace;opacity:0;visibility:hidden;transform:translateY(14px) scale(.98);transition:opacity .25s,transform .25s,visibility .25s,border-color .25s}
.hx-term.open{opacity:1;visibility:visible;transform:none}
.hx-term:focus-within{border-color:var(--cyan)}
.hx-thead{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;border-bottom:1px solid var(--line);color:var(--hacker-green);font-size:11px;letter-spacing:1px}
.hx-thead button{background:none;border:0;color:inherit;font:inherit;cursor:pointer;padding:2px 6px}
.hx-out{flex:1;overflow-y:auto;padding:12px 14px;word-break:break-word}
.hx-out div{white-space:pre-wrap}
.hx-out .ok{color:var(--hacker-green)}
.hx-out .dim{color:#7f93a8}
.hx-out .err{color:#ff6565}
.hx-row{display:flex;gap:8px;padding:10px 14px;border-top:1px solid var(--line)}
.hx-row span{color:var(--hacker-green)}
.hx-row input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font:inherit;caret-color:var(--hacker-green)}

@media(max-width:620px){.hx-hud{display:none}.hx-tbtn{right:12px;bottom:12px}.hx-term{right:12px;bottom:64px}}
@media(prefers-reduced-motion:reduce){.service::after,.project::after{animation:none}.hx-banner{animation:none}}
`;
  document.head.append(Object.assign(document.createElement('style'), { textContent: css }));

  /* ---------- scroll progress + live HUD + active nav ---------- */
  const bar = make('div', 'hx-progress');
  bar.setAttribute('aria-hidden', 'true');
  const hud = make('div', 'hx-hud');
  hud.setAttribute('aria-hidden', 'true');
  hud.innerHTML = '<span>uptime <b>00:00</b></span><span>section <b>home</b></span><span>scroll <b>0%</b></span>';
  document.body.append(bar, hud);
  const [upEl, secEl, pctEl] = $$('b', hud);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      pctEl.textContent = Math.round(p * 100) + '%';
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const t0 = Date.now();
  setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    upEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }, 1000);

  const navLinks = $$('.links a');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      secEl.textContent = en.target.id;
      navLinks.forEach(a => a.classList.toggle('hx-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => secObs.observe(s));

  /* ---------- crosshair cursor + click burst ---------- */
  if (fine && !reduce) {
    document.documentElement.classList.add('hx-cur');
    const dot = make('div', 'hx-dot');
    const ring = make('div', 'hx-ring');
    document.body.append(dot, ring);
    let mx = 0, my = 0, rx = 0, ry = 0;
    addEventListener('pointermove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
      dot.classList.add('on');
      ring.classList.add('on');
      ring.classList.toggle('hot', !!e.target.closest('a,button,input,textarea,.tool-chip,.hacker-name'));
    });
    document.documentElement.addEventListener('mouseleave', () => {
      dot.classList.remove('on');
      ring.classList.remove('on');
    });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  if (!reduce) {
    addEventListener('pointerdown', e => {
      for (let i = 0; i < 7; i++) {
        const p = make('span', 'hx-bit', Math.random() > 0.5 ? '1' : '0');
        const a = Math.random() * 6.283;
        const d = 30 + Math.random() * 40;
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        document.body.append(p);
        p.animate(
          [{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`, opacity: 0 }],
          { duration: 650, easing: 'ease-out' }
        ).onfinish = () => p.remove();
      }
    });
  }

  /* ---------- 3D tilt on cards ---------- */
  if (fine && !reduce) {
    $$('.project,.service').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transition = 'transform .1s ease-out';
        c.style.transitionDelay = '0s';
        c.style.transform = `perspective(800px) rotateX(${-py * 7}deg) rotateY(${px * 7}deg) translateY(-8px) scale(1.02)`;
      });
      c.addEventListener('pointerleave', () => {
        c.style.transition = c.style.transitionDelay = c.style.transform = '';
      });
    });
  }

  /* ---------- random RGB glitch on the hero title ---------- */
  if (!reduce) {
    (function glitch() {
      setTimeout(() => {
        const t = $('.hero-title');
        if (t && scrollY < innerHeight) {
          t.classList.add('hx-glitch');
          setTimeout(() => t.classList.remove('hx-glitch'), 420);
        }
        glitch();
      }, 4000 + Math.random() * 4000);
    })();
  }

  /* ---------- digital rain overlay + ACCESS GRANTED ---------- */
  function rain(ms = 4500) {
    if (reduce) return false;
    const c = make('canvas', 'hx-rain');
    document.body.append(c);
    const x = c.getContext('2d');
    const size = 16;
    const w = (c.width = innerWidth);
    const h = (c.height = innerHeight);
    const drops = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * -40);
    const glyphs = 'アイウエオカキクケコ01{}<>/;=+*#';
    const color = getComputedStyle(document.body).getPropertyValue('--hacker-green').trim() || '#00ff66';
    const end = performance.now() + ms;
    let last = 0;
    (function tick(t) {
      if (t - last > 45) {
        last = t;
        x.globalCompositeOperation = 'destination-out';
        x.fillStyle = 'rgba(0,0,0,.12)';
        x.fillRect(0, 0, w, h);
        x.globalCompositeOperation = 'source-over';
        x.fillStyle = color;
        x.font = size + 'px monospace';
        drops.forEach((d, i) => {
          x.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, d * size);
          drops[i] = d * size > h && Math.random() > 0.96 ? 0 : d + 1;
        });
      }
      if (t < end) requestAnimationFrame(tick);
      else {
        c.style.opacity = 0;
        setTimeout(() => c.remove(), 700);
      }
    })(performance.now());
    return true;
  }

  function accessGranted() {
    rain(5000);
    const b = make('div', 'hx-banner', 'ACCESS GRANTED');
    b.setAttribute('role', 'status');
    document.body.append(b);
    setTimeout(() => b.remove(), 2300);
  }

  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  addEventListener('keydown', e => {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kpos = k === konami[kpos] ? kpos + 1 : k === konami[0] ? 1 : 0;
    if (kpos === konami.length) {
      kpos = 0;
      accessGranted();
    }
  });

  /* ---------- interactive terminal ---------- */
  const tbtn = make('button', 'hx-tbtn', '>_ terminal');
  tbtn.type = 'button';
  tbtn.setAttribute('aria-expanded', 'false');
  tbtn.setAttribute('aria-controls', 'hxTerm');
  const term = make('div', 'hx-term');
  term.id = 'hxTerm';
  term.setAttribute('role', 'dialog');
  term.setAttribute('aria-label', 'Interactive terminal');
  term.innerHTML =
    '<div class="hx-thead"><span>visitor@zulquar:~</span><button type="button" aria-label="Close terminal">esc ✕</button></div>' +
    '<div class="hx-out" aria-live="polite"></div>' +
    '<label class="hx-row"><span>$</span><input autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command"></label>';
  document.body.append(tbtn, term);

  const out = $('.hx-out', term);
  const input = $('input', term);
  const line = (txt, cls) => {
    out.append(make('div', cls, txt));
    out.scrollTop = out.scrollHeight;
  };
  const say = async (lines, cls, gap = 30) => {
    for (const l of [].concat(lines)) {
      line(l, cls);
      if (!reduce) await sleep(gap);
    }
  };
  const go = id => {
    const t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    return !!t;
  };

  const cmds = {
    help: () => [
      'available commands:',
      '  whoami          who is behind this site',
      '  services        what I build',
      '  skills          tools and languages',
      '  projects        solution areas',
      '  contact         how to reach me',
      '  goto <section>  home | about | services | work | process | contact',
      '  theme           switch dark / light',
      '  matrix          digital rain',
      '  hack            run a fake intrusion',
      '  sudo hire-me    jump to the enquiry form',
      '  clear           wipe the screen',
      'tip: Ctrl+` opens and closes this window'
    ],
    whoami: () => [NAME, 'IT solutions professional, full stack developer, logo & brand designer', 'Raniganj, West Bengal, India'],
    services: () => ['[01] website development', '[02] app development', '[03] logo design & branding', '[04] custom CRM development', '[05] AI agents & automation'],
    skills: () => [
      'frontend  HTML5, CSS3, JavaScript, React, Tailwind, Redux Toolkit, Vite',
      'backend   Node.js, Express, MongoDB, Firebase, Python, REST APIs',
      'other     Git & GitHub, AI agent integrations, vector branding'
    ],
    projects: () => ['PRJ_01  corporate website platform', 'PRJ_02  logo & brand identity', 'PRJ_03  custom business CRM', 'PRJ_04  AI business assistant'],
    contact: () => ['email   Zulquar150@gmail.com', 'github  github.com/Zulquar123', 'type "sudo hire-me" to open the enquiry form']
  };
  const names = [...Object.keys(cmds), 'clear', 'exit', 'goto', 'theme', 'matrix', 'hack', 'sudo hire-me'];

  const hist = [];
  let hi = 0;
  let greeted = false;

  async function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    line('$ ' + cmd, 'dim');
    hist.push(cmd);
    hi = hist.length;
    const low = cmd.toLowerCase();
    const [name, ...args] = low.split(/\s+/);
    if (name === 'clear') return void (out.textContent = '');
    if (name === 'exit') return toggle(false);
    if (name === 'goto') {
      const id = args[0] || '';
      return go(id) ? say('jumping to #' + id, 'ok') : say('unknown section: ' + (id || '(none)') + ' (try help)', 'err');
    }
    if (name === 'theme') {
      $('#themeToggle')?.click();
      return say('theme switched', 'ok');
    }
    if (name === 'matrix') return say(rain() ? 'wake up, visitor...' : 'animations are turned off in your system settings', 'ok');
    if (name === 'hack') {
      await say(['scanning ports ............ 22 80 443', 'bypassing firewall ........ done', 'injecting payload ......... done', 'decrypting hash ........... done'], 'dim', 380);
      return say('ACCESS GRANTED (demo only, nothing was touched)', 'ok');
    }
    if (low === 'sudo hire-me') {
      await say('permission granted. opening the enquiry form', 'ok');
      await sleep(500);
      toggle(false);
      go('contact');
      setTimeout(() => $('#name')?.focus({ preventScroll: true }), 700);
      return;
    }
    if (cmds[name]) return say(cmds[name]());
    say('command not found: ' + name + ' (try help)', 'err');
  }

  function toggle(on) {
    const open = on ?? !term.classList.contains('open');
    const wasOpen = term.classList.contains('open');
    term.classList.toggle('open', open);
    tbtn.setAttribute('aria-expanded', String(open));
    if (open) {
      if (!greeted) {
        greeted = true;
        say(['ZULQUAR-OS 1.0 :: secure session established', 'type help to list commands'], 'ok');
      }
      setTimeout(() => input.focus(), 60);
    } else if (wasOpen) tbtn.focus();
  }

  tbtn.addEventListener('click', () => toggle());
  $('.hx-thead button', term).addEventListener('click', () => toggle(false));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = input.value;
      input.value = '';
      run(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hi > 0) input.value = hist[--hi];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      input.value = hi < hist.length - 1 ? hist[++hi] : ((hi = hist.length), '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.toLowerCase();
      const m = names.filter(n => n.startsWith(v));
      if (v && m.length === 1) input.value = m[0];
    }
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && term.classList.contains('open')) toggle(false);
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      toggle();
    }
  });

  /* ---------- boot sequence (once per session) ---------- */
  function replayHero() {
    $$('.title-line').forEach(n => {
      n.style.animation = 'none';
      void n.offsetWidth;
      n.style.animation = '';
    });
    $('#userHackerName')?.dispatchEvent(new Event('mouseenter'));
  }

  (function boot() {
    let seen = false;
    try {
      seen = sessionStorage.getItem('hxBoot') === '1';
      sessionStorage.setItem('hxBoot', '1');
    } catch (e) {}
    if (seen || reduce) return;

    const wrap = make('div', 'hx-boot');
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-label', 'Loading portfolio');
    wrap.innerHTML = '<div><pre></pre><div class="hx-bar"><i></i></div><div class="hx-skip">press any key or click to skip</div></div>';
    document.body.append(wrap);
    document.documentElement.style.overflow = 'hidden';

    const pre = $('pre', wrap);
    const fill = $('i', wrap);
    const steps = [
      'ZULQUAR-OS BIOS v4.2 ............ OK',
      'mounting /dev/portfolio .......... OK',
      'loading modules: web app crm ai brand ... OK',
      'opening secure channel ........... OK',
      'ACCESS GRANTED :: welcome, visitor'
    ];
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      removeEventListener('keydown', finish);
      wrap.classList.add('out');
      document.documentElement.style.overflow = '';
      setTimeout(() => wrap.remove(), 600);
      replayHero();
    };
    wrap.addEventListener('click', finish);
    addEventListener('keydown', finish);
    (async () => {
      for (let i = 0; i < steps.length && !done; i++) {
        pre.textContent += steps[i] + '\n';
        fill.style.width = ((i + 1) / steps.length) * 100 + '%';
        await sleep(340);
      }
      await sleep(250);
      finish();
    })();
  })();
})();
