# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium Glass-First personal portfolio website for Liu Zhenyue, deployed to GitHub Pages via the Jaden-47.github.io submodule.

**Architecture:** Single-page website with 4 sections (Hero, Experience, Projects, Contact). Pure HTML/CSS/JS with no build step. Glass card design system with animated gradient mesh background, canvas particle system, parallax layers, and mouse-follow 3D tilt. Chinese-first with English toggle via JSON i18n.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, keyframes), Vanilla JavaScript (Canvas API, Intersection Observer, requestAnimationFrame)

**Spec:** `docs/superpowers/specs/2026-03-30-personal-website-design.md`

**Working directory:** `Jaden-47.github.io/` (submodule inside the resume repo)

---

## File Structure

```
Jaden-47.github.io/
├── index.html          # All markup (4 sections + nav + footer)
├── style.css           # CSS variables, glass system, components, responsive
├── main.js             # Particles, scroll anims, i18n, tilt, parallax
├── i18n/
│   ├── zh.json         # Chinese translations (default)
│   └── en.json         # English translations
└── favicon.svg         # Site favicon (keep existing)
```

---

### Task 1: Project Setup — Clean Submodule & Create Base Files

**Files:**
- Remove: `Jaden-47.github.io/_astro/`, `Jaden-47.github.io/index.html`, `Jaden-47.github.io/favicon.ico`
- Create: `Jaden-47.github.io/index.html`
- Create: `Jaden-47.github.io/style.css`
- Create: `Jaden-47.github.io/main.js`
- Create: `Jaden-47.github.io/i18n/zh.json`
- Create: `Jaden-47.github.io/i18n/en.json`
- Keep: `Jaden-47.github.io/favicon.svg`

- [ ] **Step 1: Clean old build artifacts from submodule**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
rm -rf _astro/ index.html favicon.ico
```

- [ ] **Step 2: Create base index.html with HTML boilerplate**

Write `Jaden-47.github.io/index.html`:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>柳振跃 — Systems Architect</title>
  <meta name="description" content="柳振跃 — 系统架构师。RustUI, AliOS DDS, Agent 驱动开发。">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Particle canvas (behind everything) -->
  <canvas id="particles"></canvas>

  <!-- Gradient orbs (CSS animated) -->
  <div class="orb orb-violet"></div>
  <div class="orb orb-coral"></div>
  <div class="orb orb-sky"></div>

  <!-- Navigation -->
  <nav class="nav-glass" id="nav">
    <div class="nav-brand" data-i18n="nav.name">柳振跃</div>
    <div class="nav-links">
      <a href="#experience" data-i18n="nav.experience">经历</a>
      <a href="#projects" data-i18n="nav.projects">项目</a>
      <a href="#contact" data-i18n="nav.contact">联系</a>
      <button class="lang-toggle" id="langToggle" aria-label="Switch language">
        <span class="lang-zh active">中</span>
        <span class="lang-sep">/</span>
        <span class="lang-en">EN</span>
      </button>
    </div>
    <!-- Mobile hamburger -->
    <button class="nav-hamburger" id="navHamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- Mobile menu overlay -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="#experience" data-i18n="nav.experience">经历</a>
    <a href="#projects" data-i18n="nav.projects">项目</a>
    <a href="#contact" data-i18n="nav.contact">联系</a>
  </div>

  <main>
    <!-- Section 01: Hero -->
    <section id="hero" class="section hero">
      <div class="hero-card glass-primary" data-tilt>
        <div class="hero-role" data-i18n="hero.role">系统架构师</div>
        <h1 class="hero-name" data-i18n="hero.name">柳振跃</h1>
        <p class="hero-tagline" data-i18n="hero.tagline">构建驱动百万设备的基础架构。从微秒级通信中间件到 Agent 驱动的开发范式。</p>
        <div class="hero-ctas">
          <a href="#projects" class="btn btn-primary" data-i18n="hero.cta1">查看项目</a>
          <a href="resume.pdf" class="btn btn-glass" data-i18n="hero.cta2">下载简历</a>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-card glass-tertiary">
          <div class="stat-number" data-count="40">0</div>
          <div class="stat-suffix">%+</div>
          <div class="stat-label" data-i18n="hero.stat1.label">内存优化</div>
        </div>
        <div class="stat-card glass-tertiary">
          <div class="stat-prefix">~</div>
          <div class="stat-number" data-count="50">0</div>
          <div class="stat-suffix">μs</div>
          <div class="stat-label" data-i18n="hero.stat2.label">端到端延迟</div>
        </div>
        <div class="stat-card glass-tertiary">
          <div class="stat-number" data-count="10">0</div>
          <div class="stat-suffix">x</div>
          <div class="stat-label" data-i18n="hero.stat3.label">Agent 效率</div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-dot"></div>
      </div>
    </section>

    <!-- Section 02: Experience -->
    <section id="experience" class="section">
      <div class="section-label" data-i18n="exp.label">02 — 工作经历</div>
      <div class="exp-stack">
        <!-- Xiaomi -->
        <div class="exp-card glass-primary animate-in">
          <div class="exp-active-dot"></div>
          <div class="exp-header">
            <div class="exp-info">
              <div class="exp-company" data-i18n="exp.xiaomi.name">小米科技</div>
              <div class="exp-role" data-i18n="exp.xiaomi.role">客户端基础架构工程师 · 南京</div>
            </div>
            <div class="exp-dates mono" data-i18n="exp.xiaomi.dates">2025.04 — 至今</div>
          </div>
          <p class="exp-desc" data-i18n="exp.xiaomi.desc">主导 RustUI 渲染引擎开发，替换 Flutter UI 层。内存降低 40%+，冷启动提升 ~20%，首帧提升 70%+。推动 Agent 驱动的代码迁移工作流，2天完成10人月工作量，在百人团队中推广落地。</p>
          <div class="exp-tags">
            <span class="tag">Rust</span>
            <span class="tag">Flutter</span>
            <span class="tag">C++</span>
            <span class="tag">Agent</span>
          </div>
        </div>

        <!-- Alibaba -->
        <div class="exp-card glass-secondary animate-in">
          <div class="exp-header">
            <div class="exp-info">
              <div class="exp-company" data-i18n="exp.alibaba.name">阿里巴巴 · 斑马智行</div>
              <div class="exp-role" data-i18n="exp.alibaba.role">中间件开发工程师 · 杭州</div>
            </div>
            <div class="exp-dates mono" data-i18n="exp.alibaba.dates">2022.11 — 2025.01</div>
          </div>
          <p class="exp-desc" data-i18n="exp.alibaba.desc">负责 AliOS DDS 通信中间件核心开发。实现 ~50μs 端到端延迟，运用 Zero-Copy、共享内存与 AF_XDP 用户态网络栈。主导 Discovery 模块优化，大规模场景从 3-5s 降至 300ms。修复 300+ issues。</p>
          <div class="exp-tags">
            <span class="tag">Rust</span>
            <span class="tag">C++</span>
            <span class="tag">tokio</span>
            <span class="tag">AF_XDP</span>
          </div>
        </div>

        <!-- Dahua (compact) -->
        <div class="exp-card glass-tertiary exp-compact animate-in">
          <div class="exp-header">
            <div class="exp-info">
              <span class="exp-company" data-i18n="exp.dahua.name">浙江大华技术</span>
              <span class="exp-role-inline" data-i18n="exp.dahua.role">桌面应用开发 · 实习</span>
            </div>
            <div class="exp-dates mono">2021</div>
          </div>
        </div>

        <!-- UCSC (compact) -->
        <div class="exp-card glass-tertiary exp-compact animate-in">
          <div class="exp-header">
            <div class="exp-info">
              <span class="exp-company" data-i18n="exp.ucsc.name">UC Santa Cruz</span>
              <span class="exp-role-inline" data-i18n="exp.ucsc.role">B.S. Computer Science · 3年修完4年课程</span>
            </div>
            <div class="exp-dates mono">2019 — 2022</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: Projects -->
    <section id="projects" class="section">
      <div class="section-label" data-i18n="proj.label">03 — 精选项目</div>
      <div class="proj-grid">
        <!-- RustUI (featured, full width) -->
        <div class="proj-card glass-primary proj-featured animate-in" data-tilt>
          <div class="proj-header">
            <div>
              <div class="proj-meta mono" data-i18n="proj.rustui.meta">XIAOMI · 2025</div>
              <h3 class="proj-title" data-i18n="proj.rustui.title">RustUI 渲染引擎</h3>
            </div>
            <span class="proj-badge">FEATURED</span>
          </div>
          <p class="proj-desc" data-i18n="proj.rustui.desc">用 Rust 重写 Flutter 渲染层，通过 mmap 共享内存实现零拷贝渲染管线。内存降低 40%+，冷启动提升 ~20%，首帧提升 70%+，每帧 CPU 渲染开销降低 ~30%。</p>
          <div class="proj-metrics">
            <div class="metric-pill glass-tertiary">
              <span class="metric-value" data-count="40">0</span><span class="metric-unit">%+</span>
              <span class="metric-label" data-i18n="proj.rustui.m1">内存</span>
            </div>
            <div class="metric-pill glass-tertiary">
              <span class="metric-value" data-count="70">0</span><span class="metric-unit">%+</span>
              <span class="metric-label" data-i18n="proj.rustui.m2">首帧</span>
            </div>
            <div class="metric-pill glass-tertiary">
              <span class="metric-value-prefix">~</span><span class="metric-value" data-count="30">0</span><span class="metric-unit">%</span>
              <span class="metric-label" data-i18n="proj.rustui.m3">CPU</span>
            </div>
          </div>
        </div>

        <!-- DDS -->
        <div class="proj-card glass-secondary animate-in">
          <div class="proj-meta mono" data-i18n="proj.dds.meta">ALIBABA · 2022-2025</div>
          <h3 class="proj-title" data-i18n="proj.dds.title">AliOS DDS 中间件</h3>
          <p class="proj-desc" data-i18n="proj.dds.desc">高性能车载通信中间件，运用 Zero-Copy、共享内存与 AF_XDP 用户态网络栈，实现 ~50μs 端到端延迟。</p>
          <div class="proj-highlight">
            <span class="metric-value-prefix">~</span><span class="metric-value" data-count="50">0</span><span class="metric-unit">μs</span>
            <span class="metric-label" data-i18n="proj.dds.m1">延迟</span>
          </div>
        </div>

        <!-- Agent -->
        <div class="proj-card glass-secondary animate-in">
          <div class="proj-meta mono" data-i18n="proj.agent.meta">XIAOMI · 2025</div>
          <h3 class="proj-title" data-i18n="proj.agent.title">Agent 代码迁移</h3>
          <p class="proj-desc" data-i18n="proj.agent.desc">搭建 agentic coding workflow，沉淀可复用的人机协同开发范式，2天完成10人月迁移工作量，在百人团队中推广落地。</p>
          <div class="proj-highlight">
            <span class="metric-value" data-count="10">0</span><span class="metric-unit">x</span>
            <span class="metric-label" data-i18n="proj.agent.m1">效率提升</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 04: Contact -->
    <section id="contact" class="section">
      <div class="section-label" data-i18n="contact.label">04 — 联系我</div>
      <div class="contact-card glass-primary animate-in">
        <h2 class="contact-headline">
          <span class="contact-word animate-in" data-i18n="contact.h1">Let's</span>
          <span class="contact-word contact-gradient animate-in" data-i18n="contact.h2">Build</span>
          <span class="contact-word animate-in" data-i18n="contact.h3">Together.</span>
        </h2>
        <p class="contact-sub" data-i18n="contact.subtitle">期待与你共同创造</p>
        <div class="contact-links">
          <a href="mailto:jarvisliu1014@gmail.com" class="contact-pill glass-tertiary">
            <span class="contact-icon">✉</span>
            <span>jarvisliu1014@gmail.com</span>
          </a>
          <a href="https://github.com/Jaden-47" target="_blank" rel="noopener" class="contact-pill glass-tertiary">
            <span class="contact-icon">⌘</span>
            <span>GitHub</span>
          </a>
          <a class="contact-pill glass-tertiary">
            <span class="contact-icon">☎</span>
            <span data-i18n="contact.wechat">微信: 193-3400-8868</span>
          </a>
        </div>
        <a href="resume.pdf" class="btn btn-primary contact-resume" data-i18n="contact.resume">下载简历 PDF</a>
      </div>
    </section>
  </main>

  <footer class="footer" data-i18n="footer.text">© 2025 Liu Zhenyue — Designed with intention</footer>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create style.css with CSS variables and glass system**

Write `Jaden-47.github.io/style.css`:

```css
/* ===== CSS Variables ===== */
:root {
  --bg-gradient: linear-gradient(135deg, #eef0f8 0%, #f3eaf8 35%, #eaf3fa 65%, #f8f5ef 100%);
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
  --text-tertiary: #555;
  --orb-violet: rgba(147, 130, 220, 0.18);
  --orb-coral: rgba(255, 154, 139, 0.14);
  --orb-sky: rgba(100, 180, 255, 0.10);
  --glass-high: rgba(255, 255, 255, 0.50);
  --glass-mid: rgba(255, 255, 255, 0.42);
  --glass-low: rgba(255, 255, 255, 0.28);
  --glass-border: rgba(255, 255, 255, 0.6);
  --glass-blur: 20px;
  --accent-gradient: linear-gradient(135deg, #9382dc, #64b4ff);
  --green-active: #30d158;
  --font-main: -apple-system, 'SF Pro Display', 'Helvetica Neue', 'Noto Sans SC', 'PingFang SC', sans-serif;
  --font-mono: 'SF Mono', 'Menlo', 'Consolas', monospace;
  --radius-lg: 24px;
  --radius-md: 20px;
  --radius-sm: 16px;
  --radius-pill: 22px;
  --shadow-high: 0 8px 32px rgba(0, 0, 0, 0.04);
  --shadow-mid: 0 4px 20px rgba(0, 0, 0, 0.04);
}

/* ===== Reset & Base ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-main);
  color: var(--text-primary);
  background: var(--bg-gradient);
  background-attachment: fixed;
  overflow-x: hidden;
  min-height: 100vh;
}

a { color: inherit; text-decoration: none; }

.mono { font-family: var(--font-mono); }

/* ===== Particle Canvas ===== */
#particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ===== Gradient Orbs ===== */
.orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.orb-violet {
  width: 500px; height: 500px;
  background: radial-gradient(circle, var(--orb-violet) 0%, transparent 70%);
  top: -100px; right: -50px;
  filter: blur(40px);
  animation: orbDrift1 25s ease-in-out infinite;
}
.orb-coral {
  width: 450px; height: 450px;
  background: radial-gradient(circle, var(--orb-coral) 0%, transparent 70%);
  bottom: -120px; left: -30px;
  filter: blur(40px);
  animation: orbDrift2 30s ease-in-out infinite;
}
.orb-sky {
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--orb-sky) 0%, transparent 70%);
  top: 40%; left: 30%;
  filter: blur(35px);
  animation: orbDrift3 22s ease-in-out infinite;
}

@keyframes orbDrift1 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-40px, 60px); }
  50% { transform: translate(30px, -40px); }
  75% { transform: translate(-20px, -30px); }
}
@keyframes orbDrift2 {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, -30px); }
  50% { transform: translate(-30px, 50px); }
  75% { transform: translate(40px, 20px); }
}
@keyframes orbDrift3 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(60px, 40px); }
  66% { transform: translate(-40px, -60px); }
}

/* ===== Glass System ===== */
.glass-primary {
  background: var(--glass-high);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-high);
}
.glass-secondary {
  background: var(--glass-mid);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: var(--shadow-mid);
}
.glass-tertiary {
  background: var(--glass-low);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.45);
}

/* ===== Navigation ===== */
.nav-glass {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  z-index: 1000;
  transition: box-shadow 0.3s;
}
.nav-brand {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.3px;
}
.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 12px;
  color: var(--text-tertiary);
}
.nav-links a {
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--text-primary);
}
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 10px;
  font-size: 10px;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: var(--font-main);
  transition: background 0.2s;
}
.lang-toggle:hover { background: rgba(0, 0, 0, 0.1); }
.lang-toggle .active { color: var(--text-primary); font-weight: 600; }
.lang-sep { opacity: 0.3; }

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: transform 0.3s, opacity 0.3s;
}
.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

.mobile-menu {
  display: none;
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 900px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.7);
  z-index: 999;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  color: var(--text-tertiary);
}
.mobile-menu.open { display: flex; }
.mobile-menu a:hover { color: var(--text-primary); }

/* ===== Buttons ===== */
.btn {
  display: inline-block;
  padding: 9px 22px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-main);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
}
.btn:hover { transform: translateY(-1px); }

.btn-primary {
  background: var(--text-primary);
  color: #fff;
}
.btn-primary:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); }

.btn-glass {
  background: rgba(255, 255, 255, 0.65);
  color: var(--text-primary);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.btn-glass:hover { background: rgba(255, 255, 255, 0.8); }

/* ===== Sections ===== */
.section {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-label {
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 3px;
  margin-bottom: 24px;
  text-transform: uppercase;
}

/* ===== Hero ===== */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 40px;
}

.hero-card {
  padding: 40px;
  text-align: center;
  width: 100%;
  max-width: 680px;
  transition: transform 0.1s ease-out;
}
.hero-role {
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.hero-name {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -2.5px;
  line-height: 1;
  color: var(--text-primary);
}
.hero-tagline {
  font-size: 15px;
  color: var(--text-secondary);
  margin-top: 14px;
  line-height: 1.7;
}
.hero-ctas {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
}

.hero-stats {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  width: 100%;
  max-width: 680px;
}
.stat-card {
  flex: 1;
  padding: 18px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 0;
}
.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}
.stat-prefix, .stat-suffix {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}
.stat-label {
  width: 100%;
  font-size: 9px;
  color: var(--text-secondary);
  letter-spacing: 1.5px;
  margin-top: 4px;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.scroll-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(8px); }
}

/* ===== Experience ===== */
#experience {
  padding-top: 80px;
  padding-bottom: 40px;
}
.exp-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.exp-card {
  padding: 24px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}
.exp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
.exp-compact { padding: 20px 24px; }

.exp-active-dot {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 8px;
  height: 8px;
  background: var(--green-active);
  border-radius: 50%;
  animation: activePulse 2s ease-in-out infinite;
}
@keyframes activePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(48, 209, 88, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(48, 209, 88, 0); }
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.exp-company {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.exp-role {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}
.exp-role-inline {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 8px;
}
.exp-dates {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
}
.exp-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin-top: 12px;
}
.exp-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.tag {
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  font-size: 10px;
  color: var(--text-tertiary);
}

/* ===== Projects ===== */
#projects {
  padding-top: 80px;
  padding-bottom: 40px;
}
.proj-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.proj-featured {
  grid-column: 1 / 3;
  transition: transform 0.1s ease-out;
}
.proj-card {
  padding: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.proj-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
.proj-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.proj-meta {
  font-size: 10px;
  color: var(--text-secondary);
  letter-spacing: 2px;
  margin-bottom: 6px;
}
.proj-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.proj-featured .proj-title { font-size: 24px; letter-spacing: -1px; }
.proj-badge {
  padding: 4px 12px;
  background: rgba(147, 130, 220, 0.1);
  border-radius: 10px;
  font-size: 10px;
  color: rgba(147, 130, 220, 0.9);
  letter-spacing: 1px;
  font-weight: 500;
}
.proj-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.7;
  margin-top: 10px;
}
.proj-metrics {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.metric-pill {
  padding: 8px 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px;
}
.metric-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}
.metric-value-prefix {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}
.metric-unit {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}
.metric-label {
  font-size: 9px;
  color: var(--text-secondary);
  margin-left: 4px;
}
.proj-highlight {
  margin-top: 14px;
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.proj-highlight .metric-value {
  font-size: 22px;
}

/* ===== Contact ===== */
#contact {
  padding-top: 80px;
  padding-bottom: 40px;
}
.contact-card {
  padding: 48px 40px;
  text-align: center;
}
.contact-headline {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -1.5px;
  line-height: 1.2;
}
.contact-word { display: inline-block; }
.contact-gradient {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 4s ease-in-out infinite;
}
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.contact-sub {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 12px;
}
.contact-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}
.contact-pill {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-primary);
  transition: background 0.2s, transform 0.2s;
}
.contact-pill:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}
.contact-icon { font-size: 14px; }
.contact-resume {
  display: inline-block;
  margin-top: 24px;
  font-size: 13px;
}

/* ===== Footer ===== */
.footer {
  text-align: center;
  padding: 24px;
  font-size: 11px;
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
}

/* ===== Scroll Animations ===== */
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }

  .hero-name { font-size: 36px; letter-spacing: -1.5px; }
  .hero-card { padding: 28px 20px; }
  .hero-tagline { font-size: 14px; }
  .hero-stats { flex-direction: column; gap: 8px; }
  .stat-card { padding: 14px; }
  .stat-number { font-size: 22px; }

  .section { padding-left: 16px; padding-right: 16px; }

  .exp-header { flex-direction: column; gap: 4px; }
  .exp-card { padding: 20px; }

  .proj-grid { grid-template-columns: 1fr; }
  .proj-featured { grid-column: 1; }
  .proj-metrics { flex-wrap: wrap; }

  .contact-card { padding: 32px 20px; }
  .contact-headline { font-size: 28px; }
  .contact-links { flex-direction: column; align-items: center; }

  .orb-violet { width: 300px; height: 300px; }
  .orb-coral { width: 280px; height: 280px; }
  .orb-sky { width: 250px; height: 250px; }
}

@media (max-width: 480px) {
  .hero-name { font-size: 30px; }
  .hero-ctas { flex-direction: column; align-items: center; }
}
```

- [ ] **Step 4: Create empty main.js placeholder**

Write `Jaden-47.github.io/main.js`:

```javascript
// main.js — Portfolio interactions
// Modules: Particles, Scroll Animations, i18n, Tilt, Parallax
(function() {
  'use strict';
  console.log('Portfolio loaded');
})();
```

- [ ] **Step 5: Create i18n JSON files**

Write `Jaden-47.github.io/i18n/zh.json`:

```json
{
  "nav.name": "柳振跃",
  "nav.experience": "经历",
  "nav.projects": "项目",
  "nav.contact": "联系",
  "hero.role": "系统架构师",
  "hero.name": "柳振跃",
  "hero.tagline": "构建驱动百万设备的基础架构。从微秒级通信中间件到 Agent 驱动的开发范式。",
  "hero.cta1": "查看项目",
  "hero.cta2": "下载简历",
  "hero.stat1.label": "内存优化",
  "hero.stat2.label": "端到端延迟",
  "hero.stat3.label": "Agent 效率",
  "exp.label": "02 — 工作经历",
  "exp.xiaomi.name": "小米科技",
  "exp.xiaomi.role": "客户端基础架构工程师 · 南京",
  "exp.xiaomi.dates": "2025.04 — 至今",
  "exp.xiaomi.desc": "主导 RustUI 渲染引擎开发，替换 Flutter UI 层。内存降低 40%+，冷启动提升 ~20%，首帧提升 70%+。推动 Agent 驱动的代码迁移工作流，2天完成10人月工作量，在百人团队中推广落地。",
  "exp.alibaba.name": "阿里巴巴 · 斑马智行",
  "exp.alibaba.role": "中间件开发工程师 · 杭州",
  "exp.alibaba.dates": "2022.11 — 2025.01",
  "exp.alibaba.desc": "负责 AliOS DDS 通信中间件核心开发。实现 ~50μs 端到端延迟，运用 Zero-Copy、共享内存与 AF_XDP 用户态网络栈。主导 Discovery 模块优化，大规模场景从 3-5s 降至 300ms。修复 300+ issues。",
  "exp.dahua.name": "浙江大华技术",
  "exp.dahua.role": "桌面应用开发 · 实习",
  "exp.ucsc.name": "UC Santa Cruz",
  "exp.ucsc.role": "B.S. Computer Science · 3年修完4年课程",
  "proj.label": "03 — 精选项目",
  "proj.rustui.meta": "XIAOMI · 2025",
  "proj.rustui.title": "RustUI 渲染引擎",
  "proj.rustui.desc": "用 Rust 重写 Flutter 渲染层，通过 mmap 共享内存实现零拷贝渲染管线。内存降低 40%+，冷启动提升 ~20%，首帧提升 70%+，每帧 CPU 渲染开销降低 ~30%。",
  "proj.rustui.m1": "内存",
  "proj.rustui.m2": "首帧",
  "proj.rustui.m3": "CPU",
  "proj.dds.meta": "ALIBABA · 2022-2025",
  "proj.dds.title": "AliOS DDS 中间件",
  "proj.dds.desc": "高性能车载通信中间件，运用 Zero-Copy、共享内存与 AF_XDP 用户态网络栈，实现 ~50μs 端到端延迟。",
  "proj.dds.m1": "延迟",
  "proj.agent.meta": "XIAOMI · 2025",
  "proj.agent.title": "Agent 代码迁移",
  "proj.agent.desc": "搭建 agentic coding workflow，沉淀可复用的人机协同开发范式，2天完成10人月迁移工作量，在百人团队中推广落地。",
  "proj.agent.m1": "效率提升",
  "contact.label": "04 — 联系我",
  "contact.h1": "Let's",
  "contact.h2": "Build",
  "contact.h3": "Together.",
  "contact.subtitle": "期待与你共同创造",
  "contact.wechat": "微信: 193-3400-8868",
  "contact.resume": "下载简历 PDF",
  "footer.text": "© 2025 Liu Zhenyue — Designed with intention"
}
```

Write `Jaden-47.github.io/i18n/en.json`:

```json
{
  "nav.name": "Zhenyue Liu",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.contact": "Contact",
  "hero.role": "SYSTEMS ARCHITECT",
  "hero.name": "Zhenyue Liu",
  "hero.tagline": "Building infrastructure that powers millions of devices. From microsecond middleware to Agent-driven development.",
  "hero.cta1": "View Projects",
  "hero.cta2": "Download Resume",
  "hero.stat1.label": "MEMORY OPT",
  "hero.stat2.label": "E2E LATENCY",
  "hero.stat3.label": "AGENT SPEED",
  "exp.label": "02 — EXPERIENCE",
  "exp.xiaomi.name": "Xiaomi Technology",
  "exp.xiaomi.role": "Client Infrastructure Engineer · Nanjing",
  "exp.xiaomi.dates": "Apr 2025 — Present",
  "exp.xiaomi.desc": "Led RustUI rendering engine development, replacing Flutter UI layer. 40%+ memory reduction, ~20% cold-start improvement, 70%+ first-frame speedup. Pioneered Agent-driven code migration workflow — 10 person-months in 2 days, rolled out across a 100-person team.",
  "exp.alibaba.name": "Alibaba · Banma Zhixing",
  "exp.alibaba.role": "Middleware Engineer · Hangzhou",
  "exp.alibaba.dates": "Nov 2022 — Jan 2025",
  "exp.alibaba.desc": "Core developer of AliOS DDS communication middleware. Achieved ~50μs end-to-end latency using Zero-Copy, shared memory, and AF_XDP user-space networking. Led Discovery module optimization: large-scale from 3-5s to 300ms. Fixed 300+ issues.",
  "exp.dahua.name": "Dahua Technology",
  "exp.dahua.role": "Desktop App Developer · Intern",
  "exp.ucsc.name": "UC Santa Cruz",
  "exp.ucsc.role": "B.S. Computer Science · 4-year curriculum in 3 years",
  "proj.label": "03 — PROJECTS",
  "proj.rustui.meta": "XIAOMI · 2025",
  "proj.rustui.title": "RustUI Rendering Engine",
  "proj.rustui.desc": "Rewrote Flutter's rendering layer in Rust with zero-copy pipeline via mmap shared memory. 40%+ memory reduction, ~20% cold-start improvement, 70%+ first-frame speedup, ~30% per-frame CPU savings.",
  "proj.rustui.m1": "Memory",
  "proj.rustui.m2": "First Frame",
  "proj.rustui.m3": "CPU",
  "proj.dds.meta": "ALIBABA · 2022-2025",
  "proj.dds.title": "AliOS DDS Middleware",
  "proj.dds.desc": "High-performance automotive communication middleware using Zero-Copy, shared memory, and AF_XDP user-space networking stack. ~50μs end-to-end latency.",
  "proj.dds.m1": "Latency",
  "proj.agent.meta": "XIAOMI · 2025",
  "proj.agent.title": "Agent Code Migration",
  "proj.agent.desc": "Built agentic coding workflow for human-AI collaboration. Completed 10 person-months of migration in 2 days. Rolled out across a 100-person engineering team.",
  "proj.agent.m1": "Speed Boost",
  "contact.label": "04 — CONTACT",
  "contact.h1": "Let's",
  "contact.h2": "Build",
  "contact.h3": "Together.",
  "contact.subtitle": "Let's create something amazing together",
  "contact.wechat": "WeChat: 193-3400-8868",
  "contact.resume": "Download Resume PDF",
  "footer.text": "© 2025 Liu Zhenyue — Designed with intention"
}
```

- [ ] **Step 6: Verify base renders correctly**

Open `Jaden-47.github.io/index.html` in a browser and verify:
- Gradient background visible
- Glass nav bar at top with frosted blur
- All 4 sections visible with glass cards
- Text content readable in Chinese
- Orbs animating slowly in background

- [ ] **Step 7: Commit base structure**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add -A
git commit -m "feat: scaffold portfolio with glass design system and HTML structure"
```

---

### Task 2: Particle System

**Files:**
- Modify: `Jaden-47.github.io/main.js`

- [ ] **Step 1: Implement canvas particle system**

Replace the content of `Jaden-47.github.io/main.js` with:

```javascript
(function() {
  'use strict';

  // ===== Particle System =====
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 25 : 60;
  const COLORS = [
    'rgba(147, 130, 220, 0.3)',
    'rgba(255, 154, 139, 0.25)',
    'rgba(100, 180, 255, 0.25)',
  ];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      // Mouse repel
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && !isMobile) {
        const force = (100 - dist) / 100 * 0.8;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      p.x += p.dx;
      p.y += p.dy;

      // Wrap around edges
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resizeCanvas();
  initParticles();
  animateParticles();

})();
```

- [ ] **Step 2: Verify particles render**

Open in browser. Expect:
- Soft colored dots drifting slowly across the page
- Dots repel from mouse cursor (desktop only)
- Dots wrap around screen edges

- [ ] **Step 3: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add main.js
git commit -m "feat: add canvas particle system with mouse repel"
```

---

### Task 3: Scroll Animations & Count-Up

**Files:**
- Modify: `Jaden-47.github.io/main.js` (append after particle system)

- [ ] **Step 1: Add scroll animation and count-up logic**

Append to `main.js`, inside the IIFE (before the closing `})();`):

```javascript
  // ===== Scroll Animations =====
  const animateEls = document.querySelectorAll('.animate-in');
  const sectionLabels = document.querySelectorAll('.section-label');

  // Add animate-in to section labels
  sectionLabels.forEach(el => el.classList.add('animate-in'));

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('.animate-in')) : [];
        const index = siblings.indexOf(entry.target);
        const delay = Math.max(0, index) * 0.12;

        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate-in').forEach(el => {
    scrollObserver.observe(el);
  });

  // ===== Count-Up Animation =====
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutExpo(progress) * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-count]').forEach(el => {
    countObserver.observe(el);
  });
```

- [ ] **Step 2: Verify scroll animations**

Scroll through the page. Expect:
- Cards fade in and slide up as they enter viewport
- Staggered timing between sibling cards
- Stat numbers animate from 0 to their target value

- [ ] **Step 3: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add main.js
git commit -m "feat: add scroll reveal animations and count-up numbers"
```

---

### Task 4: Mouse-Follow 3D Tilt & Parallax

**Files:**
- Modify: `Jaden-47.github.io/main.js` (append)

- [ ] **Step 1: Add 3D tilt effect for [data-tilt] elements**

Append to `main.js`, inside the IIFE:

```javascript
  // ===== 3D Tilt Effect =====
  if (!isMobile) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  // ===== Parallax =====
  const orbs = document.querySelectorAll('.orb');
  const glassCards = document.querySelectorAll('.glass-primary, .glass-secondary');
  if (!isMobile) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Background orbs: 0.3x speed
      orbs.forEach((orb, i) => {
        const speed = 0.3 + i * 0.05;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
      // Glass cards: subtle 0.03x parallax for depth
      glassCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.03;
        card.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }
```

- [ ] **Step 2: Verify tilt and parallax**

Hover over the hero card and featured project card. Expect:
- Card tilts subtly following mouse position (max 5 degrees)
- Card returns to flat on mouse leave
- Background orbs shift at different rates when scrolling

- [ ] **Step 3: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add main.js
git commit -m "feat: add 3D tilt on glass cards and parallax orbs"
```

---

### Task 5: i18n Language Toggle

**Files:**
- Modify: `Jaden-47.github.io/main.js` (append)

- [ ] **Step 1: Add i18n loading and toggle logic**

Append to `main.js`, inside the IIFE:

```javascript
  // ===== i18n =====
  const translations = {};
  let currentLang = localStorage.getItem('lang') || 'zh';

  async function loadLang(lang) {
    if (translations[lang]) return translations[lang];
    try {
      const res = await fetch(`i18n/${lang}.json`);
      translations[lang] = await res.json();
      return translations[lang];
    } catch (e) {
      console.warn(`Failed to load ${lang} translations`, e);
      return {};
    }
  }

  function applyLang(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    // Update html lang
    document.documentElement.lang = currentLang === 'zh' ? 'zh' : 'en';
  }

  function updateToggleUI() {
    const zhSpan = document.querySelector('.lang-zh');
    const enSpan = document.querySelector('.lang-en');
    if (zhSpan && enSpan) {
      zhSpan.classList.toggle('active', currentLang === 'zh');
      enSpan.classList.toggle('active', currentLang === 'en');
    }
  }

  // Init language
  loadLang(currentLang).then(dict => {
    applyLang(dict);
    updateToggleUI();
  });

  // Toggle handler
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', async () => {
      currentLang = currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', currentLang);
      const dict = await loadLang(currentLang);
      applyLang(dict);
      updateToggleUI();
    });
  }
```

- [ ] **Step 2: Verify language toggle**

Click the "中/EN" button in nav. Expect:
- All text switches instantly to English
- Toggle button highlights "EN"
- Clicking again switches back to Chinese
- Refresh page — language persists from localStorage

- [ ] **Step 3: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add main.js
git commit -m "feat: add i18n system with zh/en toggle and localStorage persistence"
```

---

### Task 6: Mobile Menu & Nav Scroll Behavior

**Files:**
- Modify: `Jaden-47.github.io/main.js` (append)

- [ ] **Step 1: Add mobile hamburger menu and smooth scroll**

Append to `main.js`, inside the IIFE:

```javascript
  // ===== Mobile Menu =====
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ===== Nav scroll shadow =====
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
    } else {
      nav.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.03)';
    }
  }, { passive: true });

  // ===== Smooth scroll for nav links =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
```

- [ ] **Step 2: Verify mobile menu**

Resize browser to < 768px. Expect:
- Nav links replaced by hamburger icon
- Clicking hamburger shows glass dropdown with links
- Clicking a link closes menu and smooth-scrolls to section
- Nav shadow deepens on scroll

- [ ] **Step 3: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add main.js
git commit -m "feat: add mobile hamburger menu and nav scroll behavior"
```

---

### Task 7: Hero Load Animation

**Files:**
- Modify: `Jaden-47.github.io/style.css` (append)
- Modify: `Jaden-47.github.io/main.js` (append)

- [ ] **Step 1: Add hero staggered entrance CSS**

Append to `style.css`:

```css
/* ===== Hero Load Animation ===== */
.hero-card .hero-role,
.hero-card .hero-name,
.hero-card .hero-tagline,
.hero-card .hero-ctas,
.hero-stats .stat-card {
  opacity: 0;
  transform: translateY(20px);
}

.hero-loaded .hero-role,
.hero-loaded .hero-name,
.hero-loaded .hero-tagline,
.hero-loaded .hero-ctas,
.hero-loaded .hero-stats .stat-card {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.hero-loaded .hero-role   { transition-delay: 0.1s; }
.hero-loaded .hero-name   { transition-delay: 0.2s; }
.hero-loaded .hero-tagline { transition-delay: 0.35s; }
.hero-loaded .hero-ctas   { transition-delay: 0.5s; }
.hero-loaded .hero-stats .stat-card:nth-child(1) { transition-delay: 0.6s; }
.hero-loaded .hero-stats .stat-card:nth-child(2) { transition-delay: 0.7s; }
.hero-loaded .hero-stats .stat-card:nth-child(3) { transition-delay: 0.8s; }

/* Also animate nav */
.nav-glass {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.3s;
}
.nav-loaded {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 2: Trigger hero animation on DOM ready**

Append to `main.js`, inside the IIFE:

```javascript
  // ===== Hero Load Animation =====
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.getElementById('nav').classList.add('nav-loaded');
      document.querySelector('.hero').classList.add('hero-loaded');
    });
  });
```

- [ ] **Step 3: Verify load animation**

Refresh the page. Expect:
- Nav slides down from top
- Hero role, name, tagline, CTAs, and stat cards fade in one by one with stagger
- Total animation sequence takes ~1 second

- [ ] **Step 4: Commit**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add style.css main.js
git commit -m "feat: add staggered hero entrance animation on page load"
```

---

### Task 8: Final Polish & Deploy

**Files:**
- Modify: `Jaden-47.github.io/main.js` (wrap IIFE properly)

- [ ] **Step 1: Verify complete main.js structure**

Ensure the final `main.js` has this structure (all modules inside a single IIFE):

```javascript
(function() {
  'use strict';

  const isMobile = window.innerWidth < 768;

  // ===== Particle System =====
  // ... (from Task 2)

  // ===== Scroll Animations =====
  // ... (from Task 3)

  // ===== Count-Up Animation =====
  // ... (from Task 3)

  // ===== 3D Tilt Effect =====
  // ... (from Task 4)

  // ===== Parallax =====
  // ... (from Task 4)

  // ===== i18n =====
  // ... (from Task 5)

  // ===== Mobile Menu =====
  // ... (from Task 6)

  // ===== Nav scroll shadow =====
  // ... (from Task 6)

  // ===== Smooth scroll =====
  // ... (from Task 6)

  // ===== Hero Load Animation =====
  // ... (from Task 7)

})();
```

Move the `const isMobile = window.innerWidth < 768;` to the top of the IIFE so it's shared across all modules.

- [ ] **Step 2: Full browser test checklist**

Open `index.html` in browser and verify all of the following:

1. Page loads with gradient background and animated orbs
2. Particles drift softly, repel from mouse
3. Nav bar is frosted glass, fixed at top
4. Hero text staggers in on load
5. Stat numbers count up from 0
6. Hero card tilts on mouse hover
7. Scrolling reveals experience/project/contact cards with stagger
8. Project featured card has 3D tilt
9. "Build" text has animated gradient
10. Language toggle switches all text zh ↔ en
11. Language persists on refresh
12. Mobile (< 768px): hamburger menu works, cards stack, particles reduced
13. All links scroll smoothly to sections

- [ ] **Step 3: Commit final version in submodule**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git add -A
git commit -m "feat: complete portfolio v2 — glass-first design with full animations"
```

- [ ] **Step 4: Update submodule reference in parent repo**

```bash
cd /home/liuzhenyue/workspace/resume
git add Jaden-47.github.io
git commit -m "chore: update Jaden-47.github.io submodule to v2 portfolio"
```

- [ ] **Step 5: Push submodule to deploy to GitHub Pages**

```bash
cd /home/liuzhenyue/workspace/resume/Jaden-47.github.io
git push origin main
```

Verify at `https://jaden-47.github.io/` that the site is live.
