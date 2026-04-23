# /deploy

Build and prepare the portfolio for production deployment.

## Usage

```
/deploy [platform]
```

Platforms: `vercel` (default), `netlify`, `cloudflare-pages`, `github-pages`

## Pre-deployment Checklist

1. **Lint check**: `npm run lint` — zero errors
2. **Type check**: `npx tsc --noEmit` — zero TypeScript errors
3. **Test**: `npm run test` — all passing
4. **Build**: `npm run build` — successful production build
5. **Preview**: `npm run preview` — verify locally before deploying
6. **Bundle analysis**: Check `dist/` output size — target < 200KB gzipped for initial load

## Build Steps

```bash
# Clean previous build (cross-platform: works on macOS, Linux, and Windows)
npx rimraf dist

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Run tests
npm run test --run

# Production build
npm run build

# Preview locally
npm run preview
```

## Platform-Specific Notes

### Vercel (Recommended)
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No server-side functions needed (static site)

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Add `_redirects` file: `/* /index.html 200` (for SPA routing if needed)

### GitHub Pages
- Set `base` in `vite.config.ts` to repo name: `base: '/krishna-portfolio/'`
- Use `gh-pages` package or GitHub Actions

## Post-Deployment

- Verify all sections render correctly
- Test on mobile (Chrome DevTools device mode)
- Check Lighthouse score (target: 90+ on all categories)
- Verify meta tags and OG images for social sharing
- Test contact form submission
