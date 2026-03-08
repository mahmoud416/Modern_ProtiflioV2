/* ============================================================
   MAHMOUD SAMI — TERMINAL PORTFOLIO v2 — script.js
   ============================================================ */

/* ─── MATRIX RAIN ────────────────────────────────────────────── */
function initMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨ0123456789ABCDEF><|/\\";
  const charArr = chars.split("");
  let cols, drops;
  const fontSize = 13;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px 'Share Tech Mono', monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = charArr[Math.floor(Math.random() * charArr.length)];
      ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#00ff41";
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 45);
}

/* ─── BOOT SEQUENCE ──────────────────────────────────────────── */
function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const bootLog    = document.getElementById("boot-log");
  const bootBar    = document.getElementById("boot-bar");
  const bootHint   = document.getElementById("boot-hint");
  if (!bootScreen) return;

  const lines = [
    { text: '[  <span class="ok">OK</span>  ] Starting kernel logger...', delay: 0 },
    { text: '[  <span class="ok">OK</span>  ] Loading developer modules...', delay: 200 },
    { text: '[  <span class="ok">OK</span>  ] Initializing API layer...', delay: 400 },
    { text: '[  <span class="ok">OK</span>  ] Connecting to GitHub...', delay: 600 },
    { text: '[  <span class="ok">OK</span>  ] Mounting project filesystem...', delay: 800 },
    { text: '[  <span class="ok">OK</span>  ] Loading portfolio assets...', delay: 1000 },
    { text: '[  <span class="ok">OK</span>  ] Setting up CI/CD environment...', delay: 1150 },
    { text: '[  <span class="ok">OK</span>  ] Deploying to production...', delay: 1300 },
    { text: '[ <span class="info">BOOT</span> ] Welcome to mahmoud@portfolio — v2.0.0', delay: 1500 },
  ];

  lines.forEach(({ text, delay }, i) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.innerHTML = text;
      p.style.opacity = "0";
      p.style.transition = "opacity 0.25s";
      bootLog.appendChild(p);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { p.style.opacity = "1"; });
      });
      bootBar.style.width = ((i + 1) / lines.length * 100) + "%";
    }, delay);
  });

  setTimeout(() => {
    if (bootHint) {
      bootHint.innerHTML = 'Press any key or wait... <span>[ INITIALIZING ]</span>';
    }
  }, 1600);

  const dismiss = () => {
    bootScreen.classList.add("hidden");
    document.removeEventListener("keydown", dismiss);
    document.removeEventListener("click", dismiss);
  };

  setTimeout(dismiss, 2600);
  document.addEventListener("keydown", dismiss);
  document.addEventListener("click", dismiss);
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
function initCursor() {
  const cursor      = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursor-trail");
  if (!cursor || !cursorTrail) return;

  let mx = -100, my = -100;
  let tx = -100, ty = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top  = my + "px";
  });

  function animateTrail() {
    tx += (mx - tx) * 0.2;
    ty += (my - ty) * 0.2;
    cursorTrail.style.left = tx + "px";
    cursorTrail.style.top  = ty + "px";
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.addEventListener("mousedown", () => cursor.style.transform = "translate(-50%,-50%) scale(0.7)");
  document.addEventListener("mouseup",   () => cursor.style.transform = "translate(-50%,-50%) scale(1)");
}

/* ─── SCROLL PROGRESS ────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const max  = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = (window.scrollY / max) * 100;
    bar.style.width = pct + "%";
  });
}

/* ─── NAV: ACTIVE + SCROLLED ─────────────────────────────────── */
function initNav() {
  const navbar   = document.getElementById("navbar");
  const sections = document.querySelectorAll("main section[id]");
  const links    = document.querySelectorAll(".nav a[href^='#']");
  const ham      = document.getElementById("hamburger");
  const navList  = document.getElementById("nav-list");

  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);

    const pos = window.scrollY + 150;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const id  = sec.getAttribute("id");
      if (pos >= top && pos < top + sec.offsetHeight) {
        links.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(`.nav a[href='#${id}']`);
        if (active) active.classList.add("active");
      }
    });
  });

  if (ham && navList) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      navList.classList.toggle("open");
    });
    navList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        ham.classList.remove("open");
        navList.classList.remove("open");
      });
    });
  }
}

/* ─── REVEAL ON SCROLL ───────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("active");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 0.04, 0.3) + "s";
    obs.observe(el);
  });
}

/* ─── STAT COUNTERS ──────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-count]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = parseInt(e.target.getAttribute("data-count"), 10);
        let current  = 0;
        const step   = Math.max(1, Math.floor(target / 40));
        const timer  = setInterval(() => {
          current = Math.min(current + step, target);
          e.target.textContent = current;
          if (current >= target) {
            clearInterval(timer);
            if (target === 100) e.target.textContent = "100";
          }
        }, 30);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => obs.observe(c));
}

/* ─── METER BARS ─────────────────────────────────────────────── */
function initMeters() {
  const meters = document.querySelectorAll(".meter");
  const pctEls = document.querySelectorAll(".meter-pct[data-level]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const level = e.target.getAttribute("data-level") || "0";
        const bar   = e.target.querySelector("span");
        if (bar) bar.style.width = level + "%";
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.4 }
  );
  meters.forEach((m) => obs.observe(m));

  const pctObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = parseInt(e.target.getAttribute("data-level"), 10);
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + 2, target);
          e.target.textContent = cur + "%";
          if (cur >= target) clearInterval(timer);
        }, 25);
        pctObs.unobserve(e.target);
      });
    },
    { threshold: 0.4 }
  );
  pctEls.forEach((p) => pctObs.observe(p));
}

/* ─── TYPING EFFECT ──────────────────────────────────────────── */
function typeText(el, text, speed = 22) {
  return new Promise((resolve) => {
    el.textContent = "";
    el.classList.add("typing");
    let i = 0;
    const t = setInterval(() => {
      el.textContent += text[i] || "";
      i++;
      if (i >= text.length) {
        clearInterval(t);
        el.classList.remove("typing");
        resolve();
      }
    }, speed);
  });
}

async function runTerminalTyping() {
  await new Promise((r) => setTimeout(r, 2800)); // wait for boot
  const lines = document.querySelectorAll(".type-line[data-type]");
  for (const line of lines) {
    const text = line.getAttribute("data-type") || "";
    await typeText(line, text, 18);
    await new Promise((r) => setTimeout(r, 160));
  }
}

/* ─── LIVE COMMAND TICKER ────────────────────────────────────── */
function startLiveTicker() {
  const el = document.getElementById("live-command");
  if (!el) return;
  const cmds = [
    "⚙️  Building CI/CD pipeline... done",
    "🐧  Linux services health: stable",
    "🐳  Dockerized API deployment: success",
    "📦  API tests: 12/12 passed",
    "🔐  Auth middleware: active",
    "📊  Monitoring: all green",
  ];
  let idx = 0;
  el.textContent = cmds[idx];
  setInterval(() => {
    idx = (idx + 1) % cmds.length;
    el.classList.remove("flash");
    void el.offsetWidth;
    el.textContent = cmds[idx];
    el.classList.add("flash");
  }, 2500);
}

/* ─── INTERACTIVE TERMINAL ───────────────────────────────────── */
function initInteractiveTerminal() {
  const input  = document.getElementById("terminal-input");
  const output = document.getElementById("interactive-output");
  const shell  = document.getElementById("terminal-shell");
  if (!input || !output) return;

  let history = [];
  let histIdx = -1;

  const commands = {
    help: () => [
      '<span style="color:var(--primary)">Available commands:</span>',
      '  whoami       — show identity',
      '  skills       — list skills',
      '  projects     — list projects',
      '  contact      — contact info',
      '  status       — current status',
      '  ping         — ping test',
      '  date         — current date',
      '  ls           — list sections',
      '  clear        — clear output',
      '  sudo hire-me — [RESTRICTED]',
    ],
    whoami: () => [
      'Mahmoud Mohamed Sami',
      'DevOps Engineer & Backend Developer',
      'City of Science and Culture — CS, 2022-2026',
    ],
    skills: () => [
      '<span style="color:var(--secondary)">Core Skills:</span>',
      '  ▸ Linux (Ubuntu, Red Hat)',
      '  ▸ Docker, CI/CD Pipelines',
      '  ▸ ASP.NET Core, C#, EF Core',
      '  ▸ Node.js, Express, REST APIs',
      '  ▸ Git, Bash Scripting, SQL Server',
    ],
    projects: () => [
      '<span style="color:var(--secondary)">Projects:</span>',
      '  [1] StepsLearning Backend .NET',
      '  [2] NTI MEAN Stack Auth BookStore',
      '  [3] E-commerce Frontend (Netlify)',
      '  [4] 25 GitHub Repos Challenge',
      '',
      '  → run: git clone https://github.com/mahmoud416',
    ],
    contact: () => [
      '<span style="color:var(--secondary)">Contact:</span>',
      '  📧 mahmoud35868220@gmail.com',
      '  🔗 linkedin.com/in/mahmoud-mohamed',
      '  ⬡  github.com/mahmoud416',
      '  📞 01154614917',
    ],
    status: () => [
      '<span style="color:var(--primary)">[ ONLINE ]</span> Open to Work',
      '  → Internships',
      '  → Freelance projects',
      '  → Junior Backend / DevOps roles',
    ],
    ping: () => [
      'PING github.com (140.82.114.4)',
      '64 bytes from 140.82.114.4: icmp_seq=1 ttl=115 time=24.3 ms',
      '64 bytes from 140.82.114.4: icmp_seq=2 ttl=115 time=22.8 ms',
      '<span style="color:var(--primary)">--- 2 packets transmitted, 2 received, 0% packet loss ---</span>',
    ],
    date: () => [new Date().toString()],
    ls: () => [
      'total 7 sections',
      'drwxr-xr-x  about/',
      'drwxr-xr-x  education/',
      'drwxr-xr-x  skills/',
      'drwxr-xr-x  analysis/',
      'drwxr-xr-x  services/',
      'drwxr-xr-x  projects/',
      'drwxr-xr-x  contact/',
    ],
    clear: () => null,
  };

  const easterEgg = [
    '⚠️  SUDO ACCESS REQUESTED',
    '',
    '╔═══════════════════════════════════════╗',
    '║  YOU JUST HIRED MAHMOUD SAMI!         ║',
    '║                                       ║',
    '║  ✔ Backend skills: LOADED             ║',
    '║  ✔ DevOps experience: LOADED          ║',
    '║  ✔ Problem-solving mode: ON           ║',
    '║  ✔ Coffee dependency: INJECTED        ║',
    '╚═══════════════════════════════════════╝',
    '',
    '→ Contact: mahmoud35868220@gmail.com',
  ];

  function appendOutput(cmd, lines, type = 'i-out') {
    const cmdDiv = document.createElement("div");
    cmdDiv.className = "i-line i-cmd";
    cmdDiv.innerHTML = `<span class="prompt-sym">$</span> ${cmd}`;
    output.appendChild(cmdDiv);

    if (lines === null) return; // clear handled separately

    lines.forEach((text) => {
      const div = document.createElement("div");
      div.className = `i-line ${type}`;
      div.innerHTML = text;
      output.appendChild(div);
    });

    const spacer = document.createElement("div");
    spacer.style.marginBottom = "0.3rem";
    output.appendChild(spacer);

    if (shell) shell.scrollTop = shell.scrollHeight;
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;

      history.unshift(cmd);
      histIdx = -1;
      input.value = "";

      if (cmd === "clear") {
        output.innerHTML = "";
        return;
      }

      if (cmd === "sudo hire-me" || cmd === "sudo hire me") {
        appendOutput(cmd, easterEgg, "i-easter");
        return;
      }

      if (commands[cmd]) {
        const result = commands[cmd]();
        if (result === null) {
          output.innerHTML = "";
        } else {
          appendOutput(cmd, result);
        }
      } else {
        appendOutput(cmd, [
          `bash: <span style="color:var(--danger)">${cmd}</span>: command not found`,
          'Type <span style="color:var(--primary)">help</span> to see available commands.',
        ], 'i-err');
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        input.value = history[histIdx] || "";
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        input.value = history[histIdx] || "";
      } else {
        histIdx = -1;
        input.value = "";
      }
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.value.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((k) => k.startsWith(partial));
      if (match) input.value = match;
    }
  });

  // Focus terminal on click anywhere in terminal window
  const tw = document.getElementById("hero-terminal");
  if (tw) {
    tw.addEventListener("click", () => input.focus());
  }
}

/* ─── 3D CARD TILT ───────────────────────────────────────────── */
function initCardTilt() {
  document.querySelectorAll(".terminal-card, .terminal-window").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -6;
      const rotY  = ((x - cx) / cx) *  6;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      card.style.transition = "transform 0.08s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.5s ease, border-color 0.3s, box-shadow 0.3s";
    });
  });
}

/* ─── FOOTER YEAR ────────────────────────────────────────────── */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── THEME TOGGLE ───────────────────────────────────────────── */
function initThemeToggle() {
  const btn  = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "dark";
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (icon) icon.textContent = "🌙";
  }

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next    = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    if (icon) {
      icon.style.transform = "rotate(360deg)";
      icon.textContent = next === "light" ? "🌙" : "☀";
      setTimeout(() => { icon.style.transform = ""; }, 500);
    }
  });
}

/* ─── PIXEL RUNNER TURBO ─────────────────────────────────────── */
function initPixelRunner() {
  const runner = document.getElementById("pixel-runner");
  if (!runner) return;

  let turbo = false;
  runner.addEventListener("click", () => {
    turbo = !turbo;
    runner.classList.toggle("turbo", turbo);
    const label = runner.querySelector(".px-label");
    if (label) label.textContent = turbo ? "⚡ TURBO MODE" : "mahmoud@run";
  });
}

/* ─── INIT ALL ───────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initMatrixRain();
  runBootSequence();
  initCursor();
  initScrollProgress();
  initNav();
  initReveal();
  initCounters();
  initMeters();
  runTerminalTyping();
  startLiveTicker();
  initInteractiveTerminal();
  initCardTilt();
  initThemeToggle();
  initPixelRunner();
  setYear();
});
