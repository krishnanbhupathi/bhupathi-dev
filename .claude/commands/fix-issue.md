# /fix-issue

Fix a reported bug or issue in the portfolio application.

## Usage

```
/fix-issue <description of the issue>
```

## Workflow

1. **Understand the issue**: Parse the description and identify which component/section is affected
2. **Locate the code**: Find the relevant files in `src/components/`, `src/hooks/`, or `src/styles/`
3. **Reproduce mentally**: Trace the code path that leads to the bug
4. **Identify root cause**: Determine why the issue occurs (CSS specificity, animation conflict, state bug, etc.)
5. **Apply fix**: Make the minimal change needed to resolve the issue
6. **Verify**: Run `npm run dev` and check the fix doesn't break other sections
7. **Test**: Run `npm run test` to ensure no test regressions
8. **Lint**: Run `npm run lint` to ensure code quality

## Common Issue Categories

- **Visual/Layout**: Tailwind classes, responsive breakpoints, z-index stacking
- **Animation**: Framer Motion timing, sequencing, scroll-triggered animations
- **Performance**: Large re-renders, missing memoization, heavy animations
- **Build**: Vite config, dependency resolution, TypeScript errors
- **Accessibility**: Missing ARIA, keyboard navigation, focus trapping

## Output

After fixing, provide:
- Root cause explanation
- Files changed
- How to verify the fix
