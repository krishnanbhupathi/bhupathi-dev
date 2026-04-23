# Frontend Rules — Krishna Portfolio

These rules MUST be followed when writing or modifying any frontend code in this project.

## Tech Stack

- **Framework**: React 18+ with TypeScript (strict mode)
- **Build**: Vite 5+
- **Styling**: Tailwind CSS v3+ (utility-first, no component libraries)
- **Animations**: Framer Motion v11+
- **Icons**: Lucide React
- **Font**: Geist Sans (via `geist` npm package or self-hosted — **not** on Google Fonts) — weights 300, 400, 500, 600, 700
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── components/
│   ├── layout/          # Nav, Footer, Container, Section
│   ├── sections/        # Hero, Services, Projects, WhyMe, Contact
│   ├── cards/           # ExperienceCard, SkillsCard, ActivityCard, StatusBar
│   ├── ui/              # Button, Badge, Input, FormGroup
│   └── animations/      # MotionWrapper, ScrollReveal, TypewriterText
├── hooks/               # useScrollReveal, useTypewriter, useMediaQuery, useCountUp
├── utils/               # cn() classname merger, constants, helpers
├── types/               # Shared TypeScript interfaces
├── styles/              # Global CSS, Tailwind base/components/utilities layers
└── assets/              # Static SVGs, images
```

## Design System

### Colors (configure in `tailwind.config.ts`)

| Token        | Hex       | Usage                           |
|-------------|-----------|----------------------------------|
| `bg`         | `#F7E7CE` | Page background (warm wheat)    |
| `bg-plain`   | `#FFF8EE` | Card backgrounds                |
| `surface`    | `#FFF5E6` | Hover states, elevated surfaces |
| `surface-2`  | `#EDD9B7` | Tracks, muted backgrounds       |
| `line`       | `#DBC9A4` | Borders, dividers               |
| `line-strong`| `#C4AE87` | Stronger borders                |
| `text`       | `#102C26` | Primary text (deep forest green)|
| `text-dim`   | `#3A5449` | Secondary text                  |
| `text-mute`  | `#6B7F77` | Muted/tertiary text             |
| `accent`     | `#b2e659` | Accent color (lime)             |
| `accent-ink` | `#102C26` | Text on accent backgrounds      |
| `accent-soft`| `#e8f6d1` | Light accent backgrounds        |

### Typography

- Base: `font-family: 'Geist', system-ui, sans-serif`
- Letter-spacing: `-0.32px` globally (`tracking-tight` in Tailwind)
- Hero title: `clamp(36px, 4.4vw, 60px)`, weight 600, line-height 1.05
- Section title: `clamp(34px, 4.2vw, 48px)`, weight 600, line-height 1
- Body: 16px / 24px, weight 400
- Small/labels: 13px, weight 500, sometimes uppercase with `0.04em` letter-spacing

### Spacing

- Section padding: `88px 0` (desktop), `72px` (tablet), `56px` (mobile), `48px` (small phone)
- Section head margin-bottom: `48px` (desktop), `32px` (mobile)
- Card padding: `24px` (desktop), `20px` (tablet), `16px` (small phone)
- Container max-width: `1320px`, padding: `0 32px` (desktop), `0 20px` (mobile)

### Border Radius

- **Zero everywhere** — this is a deliberate design choice. No rounded corners on any element.
- Enforce this in `tailwind.config.ts` by overriding the default scale so every `rounded-*` utility resolves to `0`:

```ts
// tailwind.config.ts
theme: {
  extend: {
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '0',
    },
  },
},
```

## Component Rules

1. **Functional components only** — no class components
2. **TypeScript strict** — no `any`, all props typed with interfaces
3. **Named exports** — `export const Hero = () => {}`, not default exports (except pages if needed)
4. **One component per file** — unless it's a small, tightly coupled helper
5. **Props interface above component** — named `{ComponentName}Props`
6. **Destructure props** — `const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {}`

## Tailwind Rules

1. **Use design tokens** — never hardcode colors, use `bg-bg`, `text-text`, `border-line` etc.
2. **Responsive prefixes** — mobile-first: base styles, then `sm:`, `md:`, `lg:`, `xl:`
3. **No arbitrary values** — unless absolutely necessary. Extend the theme in `tailwind.config.ts` instead
4. **Class order** — layout → spacing → sizing → typography → visual → states → responsive
5. **Use `cn()` utility** — for conditional classes: `cn('base-class', condition && 'conditional-class')`
6. **No `@apply` in components** — use Tailwind utilities directly in JSX. `@apply` only in `globals.css` for base elements

## Animation Rules

1. **Framer Motion for React animations** — entrance, scroll-triggered, layout, hover/tap
2. **CSS for continuous animations** — blob orbit, marquee, pulse dot, status scan (things that run forever)
3. **GPU-friendly properties only** — animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
4. **Define variants outside components** — keep animation configs as constants, not inline objects
5. **Use `useInView` hook** — for scroll-triggered reveals, not manual IntersectionObserver
6. **Stagger children** — use `staggerChildren` in parent variants, not individual delays
7. **Respect reduced motion** — wrap animations in `useReducedMotion()` check

```typescript
// Good: variants outside component
const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Good: stagger pattern
const containerVariants = {
  visible: { transition: { staggerChildren: 0.15 } },
};
```

## Responsive Breakpoints

| Name    | Width    | Target          |
|---------|----------|-----------------|
| Default | < 640px  | Mobile phones   |
| `sm`    | ≥ 640px  | Large phones    |
| `md`    | ≥ 768px  | Tablets         |
| `lg`    | ≥ 1024px | Desktop         |
| `xl`    | ≥ 1280px | Large desktop   |

- Hero cards: 1 col (mobile) → 2 col (md) → 2 col grid (lg)
- Services: 1 col (mobile) → 2 col (md) → 4 col (lg)
- Projects: 1 col (mobile/tablet) → 2 col (lg)
- Why grid: 1 col (mobile/tablet) → 2 col (lg)
- Contact: 1 col (mobile/tablet) → 2 col (lg)

## Accessibility

1. **Semantic HTML** — `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>` — not generic `<div>` wrappers
2. **Heading hierarchy** — one `<h1>` per page, sequential `<h2>`, `<h3>`
3. **Alt text** — all images and icons have descriptive alt text or `aria-label`
4. **Focus visible** — custom focus ring using `focus-visible:ring-2 focus-visible:ring-accent`
5. **Keyboard navigation** — all interactive elements reachable via Tab, activatable via Enter/Space
6. **Color contrast** — text on bg meets WCAG AA (4.5:1 ratio minimum)
7. **Skip link** — add "Skip to content" link as first focusable element
8. **Form labels** — every input has a visible `<label>` with `htmlFor`

## Performance

1. **Lazy load below-fold sections** — use `React.lazy()` + `Suspense` for Services, Projects, WhyMe, Contact
2. **Optimize images** — use WebP format, include width/height to prevent CLS
3. **Font preload** — `<link rel="preconnect">` for Google Fonts
4. **Code splitting** — Vite handles this automatically, but keep dynamic imports for heavy components
5. **Memoize expensive computations** — `useMemo` for filtered/sorted data, `useCallback` for event handlers passed as props
6. **No layout thrashing** — read DOM measurements in `useLayoutEffect`, not `useEffect`

## File Naming

- Components: `PascalCase.tsx` (e.g., `Hero.tsx`, `ExperienceCard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useTypewriter.ts`, `useScrollReveal.ts`)
- Utils: `camelCase.ts` (e.g., `cn.ts`, `constants.ts`)
- Types: `camelCase.ts` (e.g., `project.ts`, `service.ts`)
- Tests: `ComponentName.test.tsx` or `hookName.test.ts`
- Styles: `kebab-case.css` (e.g., `globals.css`, `animations.css`)

## Git Conventions

- **Branch names**: `feature/hero-section`, `fix/animation-flicker`, `refactor/card-component`
- **Commit messages**: Imperative mood, concise: `Add hero typewriter animation`, `Fix card float direction`
- **No large commits**: One logical change per commit
- **No committed secrets**: `.env` files in `.gitignore`
