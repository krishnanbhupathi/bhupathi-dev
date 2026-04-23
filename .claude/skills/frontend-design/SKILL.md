# Frontend Design Skill — Krishna Portfolio

This skill provides the complete design system, component architecture, and animation patterns for building Krishna's freelance portfolio in React + Vite + Tailwind + Framer Motion.

## Portfolio Structure

The site is a single-page application with smooth-scroll navigation between sections:

1. **Nav** — Fixed top bar with logo, section links, "Let's talk" CTA, hamburger on mobile
2. **Hero** — Full-height section with animated headline, typewriter effect, email capture form, status bar, and floating cards grid
3. **Social Proof Strip** — Logo marquee of past clients/technologies
4. **Services** — 4-column grid of service offerings with icons
5. **Projects** — 2-column grid of case study cards with architecture diagrams (SVG), role, description, stats, tech stack
6. **Why Me** — 2-column grid of differentiators with icons
7. **Tech Stack** — Horizontal auto-scrolling marquee of technology pills
8. **Contact** — 2-column: info + links on left, contact form on right
9. **Footer** — Copyright + social links

## Component Breakdown

### Layout Components
- `Nav` — Fixed navbar with scroll-triggered border, mobile hamburger menu
- `Container` — Max-width wrapper (`1320px`) with responsive padding
- `Section` — Wrapper with scroll-reveal animation and consistent padding
- `Footer` — Copyright + links row

### Hero Section Components
- `Hero` — Main hero wrapper with animated blobs background
- `HeroBadge` — "Available for new projects" badge with pulse dot
- `HeroTitle` — Animated headline with typewriter cycling text
- `TypewriterText` — Cycles through words: "scales.", "ships.", "lasts.", "makes money."
- `HeroCapture` — Email input + CTA button with shimmer border
- `HeroCardsGrid` — 2-column grid of animated floating cards
- `ExperienceCard` — SVG progress ring, "4 yrs" count-up metric, domain tags
- `SkillsCard` — 5 animated progress bars (Java, React, AWS, Python, System Design)
- `ActivityCard` — Spark bar chart with "LIVE" indicator and breathing animation
- `StatusBar` — "Available for Q2 2026" with continuous horizontal sway

### Section Components
- `SectionHead` — Eyebrow text + section title with `.hl` accent + description
- `ServiceCard` — Icon + title + description
- `ProjectCard` — SVG diagram visual + meta + description + stats + tech badges + CTA link
- `WhyItem` — Icon + title + description
- `TechMarquee` — Auto-scrolling tech pills with icons
- `ContactForm` — Name, email, message fields + submit button
- `ContactInfo` — Heading + description + contact links (email, LinkedIn, response time)

### UI Components
- `Button` — Primary (filled) and secondary (outline) variants
- `Badge` — Small label with optional pulse dot
- `Input` / `Textarea` — Form fields with focus states
- `ViewLink` — "Discuss this project →" inline link

### Animation Components
- `ScrollReveal` — Framer Motion wrapper for fade-up on scroll enter
- `MotionCard` — Card wrapper with `cardEnter` + continuous `unifiedFloat` animation
- `AnimatedBlob` — Radial gradient blob with orbit animation
- `CountUp` — Numeric counter animation (0 → 4 for years)
- `ProgressRing` — SVG circle with animated stroke-dashoffset

## Animation Specifications

### Card Enter (one-time, on page load)
```typescript
const cardEnter = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
// Stagger: 0.35s, 0.55s, 0.75s for each card
```

### Unified Float (continuous, all cards move same direction)
```css
@keyframes unifiedFloat {
  0%   { transform: translateY(0)     rotate(0deg); }
  25%  { transform: translateY(-30px) rotate(0.4deg); }
  50%  { transform: translateY(0)     rotate(0deg); }
  75%  { transform: translateY(20px)  rotate(-0.3deg); }
  100% { transform: translateY(0)     rotate(0deg); }
}
/* Duration: 7s, stagger delay: 0.3s between cards */
/* Mobile: reduce amplitude to -12px / 8px */
```

### Grid Drift (continuous, applied to cards container)
```css
@keyframes gridDrift {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  70% { transform: translateY(14px); }
}
/* Duration: 10s */
/* Mobile: reduce to -8px / 6px */
```

### Typewriter Effect
- Words cycle: ["scales.", "ships.", "lasts.", "makes money."]
- Typing speed: 100ms per character
- Pause at full word: 2000ms
- Deleting speed: 60ms per character
- Accent background: `bg-text text-accent`
- Clip-path reveal: `inset(0 100% 0 0)` → `inset(0 0% 0 0)`

### Scroll Reveal
```typescript
const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
// Trigger: 12% visibility, rootMargin: '0px 0px -60px 0px'
```

### Blob Orbit (continuous CSS)
```css
@keyframes blobOrbit {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-40px, 30px) scale(1.05); }
  50% { transform: translate(-20px, -20px) scale(0.95); }
  75% { transform: translate(30px, 10px) scale(1.02); }
}
/* Duration: 18s, easing: ease-in-out */
```

### Skill Bar Fill
- Animate width from `0%` to target on scroll-into-view
- Stagger: 0.05s per bar
- Duration: 1.2s
- Easing: `[0.22, 1, 0.36, 1]`

### Activity Spark Bars
- Bars grow from 0 to target height on enter
- Continuous breathing: bars subtly pulse height ±5%
- Last bar (accent/lime colored) is tallest

### Status Bar
- Fades in with translateY(22px) → translateY(0)
- Then continuous horizontal sway via `requestAnimationFrame` + `Math.sin`
- Amplitude: 30px desktop, 18px tablet, 12px phone
- Has scanning light pseudo-element (gradient sweep)

### Count-Up (Experience "4 yrs")
- Counts from 0 to 4 over 2 seconds
- Easing: deceleration curve
- Triggers on scroll-into-view

### Progress Ring (SVG circle)
- `stroke-dashoffset` animated from full circumference to 0
- Duration: 2s, triggered on scroll-into-view

## SVG Architecture Diagrams (Project Cards)

Each project card has an SVG architecture diagram in the visual area. These use a consistent node/edge system:

- `.diag-node` — white fill, text stroke, 1.2px stroke-width
- `.diag-node-accent` — lime fill, text stroke
- `.diag-node-dark` — text fill (dark), white text
- `.diag-edge` — solid connection lines
- `.diag-edge-dashed` — dashed connection lines
- `.diag-arrow` — arrowhead markers
- `.diag-label` — 10px Geist labels
- `.diag-caption` — 8.5px uppercase muted section headers

## Key Data (for content)

### Personal Info
- Name: Krishna
- Role: Software Engineer & Systems Architect
- Experience: 4 years
- Location: India (Remote)
- Email: krishnanbhupathi@gmail.com
- LinkedIn: /in/krishnanbhupathi
- Availability: Q2 2026
- Background: Ex-Amazon SDE Intern

### Skills (with proficiency %)
- Java / Spring Boot: 94%
- React / JavaScript: 88%
- AWS / DevOps: 85%
- Python / SQL: 82%
- System Design: 80%

### Domain Experience
- Fintech, SaaS, HealthTech, Ops

### Services
1. Backend Architecture — Java, Spring Boot, microservices, REST APIs
2. Frontend Engineering — React, Next.js, Tailwind, responsive design
3. Cloud & DevOps — AWS (ECS, Lambda, RDS, S3), CI/CD, Terraform
4. System Design — Distributed systems, event-driven architecture, scaling

## Tailwind Config Reference

```typescript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7E7CE',
        'bg-plain': '#FFF8EE',
        surface: '#FFF5E6',
        'surface-2': '#EDD9B7',
        line: '#DBC9A4',
        'line-strong': '#C4AE87',
        text: '#102C26',
        'text-dim': '#3A5449',
        'text-mute': '#6B7F77',
        accent: '#b2e659',
        'accent-ink': '#102C26',
        'accent-soft': '#e8f6d1',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1320px',
      },
      letterSpacing: {
        brand: '-0.32px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
```
