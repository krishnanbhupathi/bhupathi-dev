#!/bin/bash

# Lint-on-save hook for Krishna Portfolio
# Automatically formats and lints files when saved
# Designed to be called by editor integrations or file watchers
# Errors are handled explicitly so tool output stays visible to the user.

# Get the saved file path as argument
FILE="$1"

if [ -z "$FILE" ]; then
  echo "Usage: lint-on-save.sh <file-path>"
  exit 1
fi

# Only process TypeScript/React/CSS files
case "$FILE" in
  *.ts|*.tsx|*.css)
    ;;
  *)
    exit 0
    ;;
esac

echo "Linting: $FILE"

# 1. Format with Prettier
if npx prettier --write "$FILE"; then
  echo "Formatted: $FILE"
else
  echo "Prettier failed on $FILE — check the output above."
fi

# 2. Lint with ESLint (auto-fix what's possible)
if [[ "$FILE" == *.ts || "$FILE" == *.tsx ]]; then
  if npx eslint "$FILE" --fix --max-warnings 0; then
    echo "Lint passed: $FILE"
  else
    echo "Lint issues remain in $FILE — check the output above."
  fi
fi

# 3. Quick TypeScript check on the file's project
if [[ "$FILE" == *.ts || "$FILE" == *.tsx ]]; then
  if ! npx tsc --noEmit --pretty; then
    echo "TypeScript errors detected — check the output above."
  fi
fi

echo "Done: $FILE"
