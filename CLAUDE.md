# Krishna Portfolio — Project Guide

## Overview

Single-page freelance portfolio for Krishna, a software engineer targeting foreign clients (US, UK, UAE). Built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack

- **React 18+** with TypeScript (strict mode)
- **Vite 5+** for build tooling and dev server
- **Tailwind CSS v3+** for utility-first styling
- **Framer Motion v11+** for React animations
- **Lucide React** for icons
- **Geist** font family (via `geist` npm package or self-hosted — not on Google Fonts)
- **Vitest** + React Testing Library for tests

## Quick Start

```bash
npm install
npm run dev        # Start dev server at localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # ESLint check
npm run test       # Run tests with Vitest
```

## Project Structure

```
krishna-portfolio/
├── CLAUDE.md                    # This file — project guide for Claude Code
├── .claude/                     # Claude Code configuration
│   ├── settings.json            # Project metadata
│   ├── agents/                  # Specialized AI agent prompts
│   │   ├── code-reviewer.md
│   │   ├── debugger.md
│   │   ├── test-writer.md
│   │   ├── refactorer.md
│   │   ├── doc-writer.md
│   │   └── security-auditor.md
│   ├── commands/                # Slash commands
│   │   ├── fix-issue.md
│   │   ├── deploy.md
│   │   └── pr-review.md
│   ├── hooks/                   # Git hooks
│   │   ├── pre-commit.sh
│   │   └── lint-on-save.sh
│   ├── rules/                   # Coding rules and conventions
│   │   └── frontend.md
│   └── skills/                  # Design system knowledge
│       └── frontend-design/
│           └── SKILL.md
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── layout/              # Nav, Footer, Container, Section
│   │   ├── sections/            # Hero, Services, Projects, WhyMe, Contact
│   │   ├── cards/               # ExperienceCard, SkillsCard, ActivityCard, StatusBar
│   │   ├── ui/                  # Button, Badge, Input, FormGroup
│   │   └── animations/          # MotionWrapper, ScrollReveal, TypewriterText
│   ├── hooks/                   # useScrollReveal, useTypewriter, useMediaQuery, useCountUp
│   ├── utils/                   # cn(), constants, helpers
│   ├── types/                   # Shared TypeScript interfaces
│   ├── styles/                  # globals.css, animations.css
│   ├── assets/                  # SVGs, images
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Design System

### Color Palette
- **Background**: `#F7E7CE` (warm wheat) — no pure whites
- **Text**: `#102C26` (deep forest green) — high contrast, warm feel
- **Accent**: `#b2e659` (lime) — CTAs, highlights, progress bars
- **Borders**: `#DBC9A4` — warm, subtle dividers
- See `.claude/rules/frontend.md` for the complete token table

### Key Design Decisions
- **Zero border-radius** — all corners are sharp, deliberately
- **Geist font** — clean, modern, tech-forward
- **Dotted background texture** — subtle radial-gradient dot grid overlay
- **Animated gradient blobs** — soft, blurred, orbiting behind hero
- **Architecture diagram SVGs** — custom node-edge diagrams in project cards

## Sections (in page order)

1. **Nav** — Fixed, transparent → solid on scroll, hamburger on mobile
2. **Hero** — Typewriter headline, email capture, 3 animated floating cards + status bar
3. **Services** — 4-column grid (1 col mobile)
4. **Projects** — 2 case study cards with SVG architecture diagrams
5. **Why Me** — 2x2 grid of differentiators
6. **Tech Stack** — Auto-scrolling marquee
7. **Contact** — Info + form side by side
8. **Footer** — Minimal copyright + links

## Animation Philosophy

- **Enter once, float forever**: Components fade in on first view, then continuously float/breathe
- **Same direction**: All hero cards always move in the same vertical direction (unified float)
- **GPU only**: Only animate `transform` and `opacity` — never layout properties
- **Reduced motion**: Respect `prefers-reduced-motion` with instant-show fallback
- See `.claude/skills/frontend-design/SKILL.md` for full animation specs

## Key References

- **Rules**: `.claude/rules/frontend.md` — all coding conventions, Tailwind patterns, a11y requirements
- **Design skill**: `.claude/skills/frontend-design/SKILL.md` — complete design system, component specs, animation details
- **Original HTML**: Reference the uploaded `krishna_portfolio.html` for exact styling, content, and animation behavior

## Important Notes

- This is a **frontend-only** project — no backend, no database
- Contact form can use a service like Formspree, EmailJS, or a simple mailto link
- Target **Lighthouse 90+** on all categories
- The portfolio HTML reference file contains all the exact content, colors, animations, and responsive breakpoints to replicate
