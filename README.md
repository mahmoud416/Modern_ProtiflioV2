# 💻 Mahmoud Sami — Terminal Portfolio v2

> A fully interactive, terminal-themed developer portfolio with matrix rain, pixel art animations, and light/dark mode switching.

---

## 🖥️ Live Preview

The portfolio is built as a single-page static site. Open `index.html` in any modern browser.

---

## ✨ Features

### Visual Effects
| Feature | Description |
|---|---|
| **Matrix Rain** | Canvas-based falling katakana/hex characters in the background |
| **Glitch Effect** | RGB split glitch animation on all section titles |
| **Neon Glow** | Green neon glow on cards, borders, and buttons |
| **CRT Scanlines** | Subtle scanline overlay for that retro terminal feel |
| **3D Card Tilt** | Cards tilt in 3D perspective on mouse hover |
| **Profile Scan** | Animated scan line over the profile photo |

### Interactivity
| Feature | Description |
|---|---|
| **Boot Screen** | Full terminal boot sequence on page load (dismissable) |
| **Interactive Terminal** | Type real commands in the hero terminal (`help` to start) |
| **Light / Dark Mode** | Toggle with the ☀ button — preference saved to localStorage |
| **Pixel Art Runner** | 8-bit character that walks across the bottom of the screen |
| **Turbo Mode** | Click the pixel runner to activate ⚡ TURBO MODE |
| **Custom Cursor** | Glowing ring cursor with trail effect |
| **Scroll Progress** | Neon progress bar at the top of the page |
| **Animated Counters** | Stats count up when scrolled into view |
| **Command History** | Use ↑ / ↓ arrows in the terminal for history |
| **Tab Autocomplete** | Press Tab to autocomplete terminal commands |

### Terminal Commands
```
help        — list all available commands
whoami      — show identity
skills      — list skills
projects    — list projects
contact     — show contact info
status      — availability status
ping        — run a fake ping test
date        — show current date/time
ls          — list site sections
clear       — clear terminal output
sudo hire-me — 👀
```

---

## 🛠️ Tech Stack

```
HTML5 / CSS3 / Vanilla JavaScript
Fira Code + Share Tech Mono (Google Fonts)
Canvas API (Matrix Rain)
Web Animations API
Intersection Observer API
localStorage (theme persistence)
```

No frameworks. No build tools. No dependencies.

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML — structure & content
├── styles.css       # All styles — theme vars, animations, responsive
├── script.js        # All logic — matrix, boot, terminal, tilt, theme
├── assets/
│   └── profile.jpg  # Profile photo
└── README.md
```

---

## 🎨 Theme System

The portfolio supports two themes, toggled via the ☀ / 🌙 button:

| Variable | Dark Mode | Light Mode |
|---|---|---|
| Background | `#000000` | `#eef4ee` |
| Primary | `#00ff41` (neon green) | `#006824` (forest green) |
| Text | `#c8f0c8` | `#162916` |
| Cards | `rgba(0,12,2,0.92)` | `rgba(255,255,255,0.97)` |

All elements transition smoothly using CSS `transition` properties.

---

## 📱 Responsive Design

| Breakpoint | Behavior |
|---|---|
| `< 980px` | Single-column layout, hamburger menu, compact profile panel |
| `< 640px` | Full-width single column, pixel runner hidden, smaller typography |

---

## 🚀 Sections

1. **Hero** — Interactive terminal + profile panel
2. **About** — Bio + animated stats (repos, projects, years)
3. **Education** — Timeline card with GPA badge
4. **Skills** — Four skill cards (DevOps, .NET, Node.js, Tooling)
5. **Analysis** — Animated proficiency meter bars
6. **Services** — Three service offerings
7. **Projects** — 3 major + 3 small project cards
8. **Contact** — Contact methods + ASCII art banner

---

## 👤 About

**Mahmoud Mohamed Sami**
DevOps Engineer & Backend Developer
City of Science and Culture — CS 2022–2026

- 📧 mahmoud35868220@gmail.com
- 🔗 [linkedin.com/in/mahmoud-mohamed-691999258](https://www.linkedin.com/in/mahmoud-mohamed-691999258)
- ⬡ [github.com/mahmoud416](https://github.com/mahmoud416)
- 📞 01154614917

---

*Built with passion, Fira Code, and too much green.*
