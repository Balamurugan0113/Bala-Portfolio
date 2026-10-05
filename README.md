# Bala Portfolio — AI & Data Science Engineer

Premium, cinematic 3D portfolio for **Balamurugan C** — AI & Data Science Engineer, Ethical
Hacker, and Full-Stack Architect.

**Live:** https://bala-portfolio-sigma.vercel.app/

---

## ✨ Highlights

- **Cinematic 3D hero** — a React Three Fiber "AI core" (distorted energy sphere, orbital rings,
  orbiting polyhedra, amber particle field) rendered behind the portrait with pointer parallax,
  HUD reticle, scanning beam, and floating technology chips.
- **Adaptive 3D budget** — device-tier detection (low / mid / high) drives particle count, DPR
  and antialiasing. Rendering pauses when the hero leaves the viewport, when the tab is hidden,
  or when `prefers-reduced-motion` is set. WebGL failures degrade gracefully (the hero never dies).
- **3D icon system** — `TechIcon` chips with brand-tinted glass materials, specular highlights,
  inner shadows and subtle hover tilt. 40+ hand-drawn / lucide glyphs with fuzzy skill matching.
- **Interactive skills showcase** — six 3D-tilt category cards, floating tech icon band, animated
  proficiency meters, and certification cards.
- **Project case-study interface** — auto-rotating deck with per-project SVG "product interface"
  artwork, animated border beams, and a 5-tab modal (Overview / Architecture / Security /
  Performance / Code) with an architecture flow diagram and a premium IDE-style
  **code inspector** (syntax highlighting, file tree, copy — zero highlighting dependencies).
- **Glowing experience timeline** — scroll-drawn spine, glowing nodes, 3D cards.
- **Animated stat counters**, glassmorphism throughout, layered atmospheric background,
  floating glass-pill navbar (BA monogram brand, spring-animated active pill that glides
  between links, scroll-aware opacity/blur — never hides), and a polished full-glass
  mobile menu with sequential item animation and scroll lock.
- **Logo-first boot screen** — a ~1.5 s cinematic loading sequence (BA mark, orbital
  progress ring, module readout) driven by real font readiness with no artificial delays,
  simple fade under reduced motion, gating the hero's entrance animations via BootContext.
- **Professional branding** — geometric amber "BA" monogram (SVG + 16/32/48/180/192/512
  PNGs) shared by the loading screen, navbar, favicon and social share image (1200×630),
  plus web manifest and dark `theme-color` for dark browser tabs.
- **Accessible** — semantic HTML, focus-visible states, focus-trapped modal with `Esc` support,
  keyboard-operable cards, aria labels, and full reduced-motion support (CSS + framer-motion
  `MotionConfig`).

## 🧱 Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion 12 · Three.js + React Three
Fiber + Drei · Lucide · wouter · Sonner · Express (contact API) · Nodemailer

## 📁 Structure

```
client/
  src/
    app/                  # App shell, global background FX, BootContext
    components/
      branding/           # BALogo (shared BA monogram)
      layout/             # Navbar, NavLink, MobileMenu, Footer, BackToTop
      three/              # HeroScene, AICore, ParticleField (R3F)
      ui/                 # TechIcon, Card3DTilt, SectionHeading, AnimatedCounter, Button
      LoadingScreen.tsx   # logo-first boot sequence
    features/
      hero/               # HeroSection (two-zone layout), HeroTypography, Typewriter
      about/  skills/     # Section components (lazy loaded)
      projects/           # ProjectsSection, ProjectModal, ProjectVisual,
                          # ArchitectureFlow, CodeInspector, highlight.ts
      experience/ contact/
  public/                 # favicon set, manifest, resume.pdf, og-image
scripts/
  generate-icons.py       # regenerates the favicon/OG PNG set (Pillow)
  render-test.mjs         # headless full-app render test (jsdom + vite)
  modal-test.mjs          # project modal interaction test
shared/
  const.ts                # all portfolio data (projects, skills, experience…)
  projectFiles.ts         # source files shown in the code inspector
api/contact.ts            # Vercel serverless contact endpoint
server/index.ts           # local Express dev server for /api/contact
```

## 🚀 Getting started

```bash
npm install
npm run dev          # vite (5173) + contact API (5000) with proxy
```

Environment (optional, for live contact emails) — see `.env.example`:

```
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
```

Without SMTP credentials, contact submissions are logged to the server console.

## ✅ Verification

```bash
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm test             # headless render + modal interaction tests (jsdom)
npm run icons        # regenerate favicon / OG images (requires Pillow)
```

The test suite boots the real app (via Vite's module runner) inside jsdom and asserts every
section, the modal lifecycle, tab switching, the code inspector, Esc/focus handling, and
mobile / reduced-motion modes.

## 📝 Notes

- Three.js is intentionally **not** in `manualChunks` — it stays inside the lazily-loaded hero
  chunk so first paint never fetches ~1 MB of WebGL code.
- `BlogSection.tsx` exists but is not currently routed.
