# /pr-review

Review a pull request for code quality, design consistency, and potential issues.

## Usage

```
/pr-review [branch-name or PR-number]
```

## Review Process

1. **Read the diff**: Examine all changed files
2. **Understand intent**: What feature or fix does this PR introduce?
3. **Check against rules**: Verify changes follow `rules/frontend.md` guidelines
4. **Test impact**: Identify what sections of the portfolio are affected
5. **Provide feedback**: Categorized as blocking, suggestion, or praise

## Review Categories

### Blocking (must fix before merge)
- TypeScript errors or `any` types
- Missing responsive styles for a new component
- Accessibility violations (missing alt text, broken keyboard nav)
- Broken animations or layout shifts
- Security issues (exposed keys, XSS vectors)

### Suggestions (should fix, not blocking)
- Performance improvements (memoization, lazy loading)
- Better Tailwind patterns (avoiding arbitrary values)
- Animation polish (easing, timing, sequencing)
- Code organization improvements

### Praise (good patterns to reinforce)
- Clean component composition
- Good TypeScript usage
- Accessible-first implementation
- Smooth animation patterns

## Output Format

```markdown
## PR Review: [title]

### Summary
One-paragraph overview of what changed and why.

### Blocking Issues
1. [file:line] Description — suggested fix

### Suggestions
1. [file:line] Description — why this would be better

### Good Patterns
1. [file:line] What was done well

### Testing Notes
- Steps to verify the changes work correctly
```
