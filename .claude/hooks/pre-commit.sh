#!/bin/bash

# Pre-commit hook for Krishna Portfolio
# Runs lint, type-check, and tests before allowing a commit
# Errors are handled explicitly so custom messages surface on failure.

echo "Running pre-commit checks..."

# 1. Check for console.log statements (excluding test files)
echo "Checking for console.log statements..."
CONSOLE_LOGS=$(grep -rn "console\.log" src/ --include="*.ts" --include="*.tsx" --exclude="*.test.*" --exclude="*.spec.*" || true)
if [ -n "$CONSOLE_LOGS" ]; then
  echo "WARNING: Found console.log statements:"
  echo "$CONSOLE_LOGS"
  echo "Consider removing them before committing."
fi

# 2. TypeScript type checking
echo "Running TypeScript check..."
if ! npx tsc --noEmit; then
  echo "TypeScript errors found. Please fix them before committing."
  exit 1
fi

# 3. ESLint
echo "Running ESLint..."
if ! npx eslint src/ --ext .ts,.tsx --max-warnings 0; then
  echo "Lint errors found. Please fix them before committing."
  exit 1
fi

# 4. Prettier format check
echo "Checking formatting..."
if ! npx prettier --check "src/**/*.{ts,tsx,css}"; then
  echo "Formatting issues found. Run 'npx prettier --write src/' to fix."
  exit 1
fi

# 5. Run tests (fast, no coverage)
echo "Running tests..."
if ! npx vitest run --reporter=dot; then
  echo "Tests failed. Please fix them before committing."
  exit 1
fi

echo "All pre-commit checks passed!"
