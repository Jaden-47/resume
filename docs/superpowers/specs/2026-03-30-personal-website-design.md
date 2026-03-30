# Personal Portfolio Website — Design Spec

**Author:** Liu Zhenyue
**Date:** 2026-03-30
**Deployment:** GitHub Pages via `Jaden-47.github.io` submodule
**Stack:** Pure HTML + CSS + JS (no framework, no build step)

---

## Overview

A premium personal portfolio website for Liu Zhenyue (柳振跃), Systems Architect. The site showcases work experience, featured projects, and contact information with an immersive Glass-First + Apple Typography aesthetic.

**Design direction:** Light glassmorphism with pastel gradient mesh background, frosted-glass containers, Apple SF Pro typography, full immersive animations (particles, parallax, mouse-follow).

**Language:** Chinese-first with an English toggle (persisted in localStorage).

---

## File Structure

```
Jaden-47.github.io/
├── index.html          # Single-page portfolio (all markup)
├── style.css           # All styles (variables, components, responsive)
├── main.js             # Animations, particles, i18n, interactions
├── i18n/
│   ├── zh.json         # Chinese translations
│   └── en.json         # English translations
├── favicon.svg         # Site favicon
└── resume.pdf          # Downloadable resume (optional)
```

---

## Sections

### Section 01 — Hero / 首页

**Layout:** Full viewport height. Centered content in a frosted-glass card.

**Elements:**
- Glass navigation bar (fixed top): site name "柳振跃" left, section links + 中/EN toggle right
- Section label: "系统架构师"
- Main headline: "柳振跃" (52px, -2.5px letter-spacing, #1d1d1f)
- Tagline: "构建驱动百万设备的基础架构。从微秒级通信中间件到 Agent 驱动的开发范式。"
- Two CTA buttons (pill shape): "查看项目" (dark filled), "下载简历" (glass outlined)
- Three stat cards in a row: "40%+ 内存优化", "~50μs 端到端延迟", "10x Agent 效率"
- Scroll indicator at bottom

**Background:**
- Gradient mesh: `linear-gradient(135deg, #eef0f8 0%, #f3eaf8 35%, #eaf3fa 65%, #f8f5ef 100%)`
- Three animated color orbs (CSS keyframe drift):
  - Violet: `rgba(147,130,220,0.18)`, top-right area
  - Coral: `rgba(255,154,139,0.14)`, bottom-left area
  - Sky: `rgba(100,180,255,0.10)`, center area
- Canvas particle field: soft floating dots matching palette colors

**Animations:**
- Particles: gentle drift with mouse-repel effect (canvas, requestAnimationFrame)
- Gradient orbs: slow continuous CSS keyframe movement (20-30s cycle)
- Hero text: staggered fade-up on page load (0.1s delay per element)
- Stat numbers: count-up animation triggered by Intersection Observer
- Hero glass card: subtle 3D tilt following mouse position (perspective + rotateX/Y)

### Section 02 — Experience / 工作经历

**Layout:** Vertical stack of glass cards, progressive opacity (newest = most opaque).

**Elements:**
- Section label: "02 — 工作经历"
- Four glass cards stacked vertically:

1. **小米科技** (active, highest glass opacity 0.5)
   - Green pulsing dot indicator (current role)
   - Title: 客户端基础架构工程师 · 南京
   - Dates: 2025.04 — 至今
   - Description: RustUI engine, Agent-driven migration
   - Tags: Rust, Flutter, C++, Agent

2. **阿里巴巴 · 斑马智行** (glass opacity 0.38)
   - Title: 中间件开发工程师 · 杭州
   - Dates: 2022.11 — 2025.01
   - Description: AliOS DDS, ~50μs latency, Zero-Copy + AF_XDP
   - Tags: Rust, C++, tokio, AF_XDP

3. **浙江大华技术** (compact, glass opacity 0.28)
   - Title: 桌面应用开发 · 实习
   - Date: 2021

4. **UC Santa Cruz** (compact, glass opacity 0.28)
   - Title: B.S. Computer Science · 3年修完4年课程
   - Dates: 2019 — 2022

**Animations:**
- Cards stagger-reveal on scroll: slide up + fade in (0.15s delay each)
- Green dot: CSS pulse animation (box-shadow glow)
- Hover: cards lift slightly with deepened shadow
- Background orbs: parallax shift with scroll position

### Section 03 — Projects / 精选项目

**Layout:** 2-column grid. Featured project spans full width.

**Elements:**
- Section label: "03 — 精选项目"
- Three project cards:

1. **RustUI 渲染引擎** (featured, full width, highest glass opacity)
   - Badge: "FEATURED" in violet accent
   - Company: XIAOMI · 2025
   - Description: Rust rewrite of Flutter rendering layer
   - Metric pills (nested glass): 40%+ 内存, 70%+ 首帧, ~30% CPU

2. **AliOS DDS 中间件** (half width)
   - Company: ALIBABA · 2022-2025
   - Description: High-performance communication middleware
   - Metric: ~50μs 延迟

3. **Agent 代码迁移** (half width)
   - Company: XIAOMI · 2025
   - Description: Agentic workflow for code migration
   - Metric: 10x 效率提升

**Animations:**
- Featured card: 3D tilt on mouse move (transform: perspective(1000px) rotateX/Y)
- All cards: scroll-triggered stagger reveal
- Metric numbers: count-up animation on viewport entry
- Hover: cards float up with enhanced glass shadow
- Metric pills: nested glass layers for extra depth

### Section 04 — Contact / 联系我

**Layout:** Centered glass card with headline and contact links.

**Elements:**
- Section label: "04 — 联系我"
- Headline: "Let's Build Together." with "Build" in animated gradient text
- Subtitle: "期待与你共同创造"
- Contact links (glass pills): Email, GitHub, 微信
- CTA button: "下载简历 PDF" (dark filled pill)
- Footer: "© 2025 Liu Zhenyue — Designed with intention" (year reflects career start, not current year)

**Animations:**
- Headline words: reveal one by one with spring easing
- "Build" text: animated gradient shift (background-position CSS keyframes)
- Contact pills: glass brightens + subtle lift on hover
- Central card: deepest blur for focal emphasis

---

## Global Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-gradient` | `linear-gradient(135deg, #eef0f8, #f3eaf8, #eaf3fa, #f8f5ef)` | Page background |
| `--text-primary` | `#1d1d1f` | Headlines, body text |
| `--text-secondary` | `#86868b` | Labels, meta text |
| `--text-tertiary` | `#555` | Descriptions |
| `--orb-violet` | `rgba(147,130,220,0.18)` | Background orb |
| `--orb-coral` | `rgba(255,154,139,0.14)` | Background orb |
| `--orb-sky` | `rgba(100,180,255,0.10)` | Background orb |
| `--glass-high` | `rgba(255,255,255,0.50)` | Primary glass cards |
| `--glass-mid` | `rgba(255,255,255,0.42)` | Secondary cards |
| `--glass-low` | `rgba(255,255,255,0.28)` | Tertiary/compact cards |
| `--glass-border` | `rgba(255,255,255,0.6)` | Glass card borders |
| `--glass-blur` | `blur(20px)` | Primary backdrop-filter |
| `--accent-gradient` | `linear-gradient(135deg, #9382dc, #64b4ff)` | Gradient text accent |
| `--green-active` | `#30d158` | Active role indicator |

### Typography

| Element | Font | Size | Weight | Tracking |
|---------|------|------|--------|----------|
| Nav brand | SF Pro Display | 14px | 600 | -0.3px |
| Section label | SF Pro Display | 11px | 400 | 3px |
| Hero name | SF Pro Display | 52px | 700 | -2.5px |
| Card title | SF Pro Display | 18-24px | 700 | -0.5 to -1px |
| Body text | SF Pro Display | 13-15px | 400 | 0 |
| Metric number | SF Pro Display | 22-28px | 700 | 0 |
| Metric label | SF Pro Display | 9px | 400 | 1.5px |
| Dates/mono | SF Mono / monospace | 11px | 400 | 0 |
| Tags | SF Pro Display | 10px | 400 | 0 |

Font stack: `-apple-system, 'SF Pro Display', 'Helvetica Neue', 'PingFang SC', sans-serif`

### Glass Card System

Three tiers of glass cards, all using `backdrop-filter: blur()`:

- **Primary** (hero, featured project, contact): `bg: 0.50 white, blur: 20px, border-radius: 24px, shadow: 0 8px 32px rgba(0,0,0,0.04)`
- **Secondary** (experience items, project cards): `bg: 0.42 white, blur: 16px, border-radius: 20px, shadow: 0 4px 20px rgba(0,0,0,0.04)`
- **Tertiary** (compact items, stat pills): `bg: 0.28 white, blur: 10px, border-radius: 16px`

All glass cards have `border: 1px solid rgba(255,255,255, 0.55-0.65)`.

### Button Styles

- **Primary (filled):** `bg: #1d1d1f, color: #fff, border-radius: 22px, padding: 9px 22px, font-size: 12px, font-weight: 500`
- **Secondary (glass):** `bg: rgba(255,255,255,0.65), border: 1px solid rgba(0,0,0,0.08), color: #1d1d1f, border-radius: 22px`
- **Tag pill:** `bg: rgba(0,0,0,0.04), border-radius: 8px, padding: 4px 10px, font-size: 10px`
- **Contact pill:** `bg: rgba(255,255,255,0.6), backdrop-filter: blur(10px), border-radius: 14px`

---

## Global Effects

### Particle System
- Lightweight canvas element spanning entire page
- 50-80 soft dots (2-4px radius) matching palette colors (violet, coral, sky at low opacity)
- Gentle random drift (0.1-0.3px per frame)
- Mouse proximity: gentle repel within 100px radius
- requestAnimationFrame loop at 60fps
- Reduce particle count on mobile (< 30)

### Parallax Layers
- 3 depth layers using CSS `transform: translate3d()` + scroll listener
- Background orbs: 0.3x scroll speed
- Glass cards: 0.7x scroll speed (subtle)
- Text content: 1x (foreground, no transform)

### Animated Gradient Mesh
- Three orbs with CSS `@keyframes` animation
- Each orb drifts in a different elliptical path (20-30s cycle)
- `filter: blur(30-40px)` for soft edges
- No JS needed — pure CSS animation

### Mouse-Follow 3D Tilt
- Applied to hero card and featured project card
- `transform: perspective(1000px) rotateX(Ydeg) rotateY(Xdeg)`
- Max rotation: 5 degrees
- Smooth transition with `transition: transform 0.1s ease-out`
- Disabled on mobile (no hover)

### Scroll Animations
- Intersection Observer API (threshold: 0.15)
- Default animation: fade in + translate Y 30px (0.6s ease-out)
- Stagger: 0.12s delay per child element
- Count-up for metric numbers: 1.5s duration, easeOutExpo

---

## Internationalization (i18n)

**Approach:** JSON-based translation files loaded on page init.

**Mechanism:**
- Elements use `data-i18n="key"` attribute for text content
- `i18n/zh.json` and `i18n/en.json` store all translatable strings
- Toggle button in nav: "中/EN" — click swaps active language
- `localStorage.setItem('lang', 'zh'|'en')` for persistence
- On load: check localStorage, default to 'zh'
- Swap function: iterate all `[data-i18n]` elements, set `textContent` from loaded JSON

**Translation keys structure:**
```
nav.name, nav.experience, nav.projects, nav.contact
hero.role, hero.name, hero.tagline, hero.cta1, hero.cta2
hero.stat1.value, hero.stat1.label, hero.stat2.value, ...
exp.label, exp.xiaomi.name, exp.xiaomi.role, exp.xiaomi.location, ...
proj.label, proj.rustui.title, proj.rustui.desc, ...
contact.label, contact.headline1-3, contact.subtitle, ...
footer.text
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Target |
|------------|--------|
| < 768px | Mobile phones |
| 768px — 1024px | Tablets |
| > 1024px | Desktop |

### Mobile Adaptations
- Nav: collapse links to hamburger menu (glass dropdown)
- Hero name: 36px (down from 52px)
- Stat cards: stack vertically (1 column)
- Project grid: single column (featured card no longer spans 2)
- Experience cards: full width, reduced padding
- Particles: reduce count to < 30, disable mouse-follow
- 3D tilt effects: disabled (no hover on touch)
- Glass blur: reduce to 12px for performance
- Contact pills: stack vertically

---

## Performance Considerations

- Single HTML file, one CSS file, one JS file — minimal HTTP requests
- Particle system uses canvas (GPU accelerated), capped at 80 particles
- CSS animations preferred over JS where possible (gradient orbs, pulse effects)
- Intersection Observer for lazy animation triggering (no wasted frames offscreen)
- `will-change: transform` on parallax elements for compositor optimization
- Responsive image loading: no images (pure CSS/SVG visuals)
- Target: < 100KB total page weight (excluding resume PDF)
