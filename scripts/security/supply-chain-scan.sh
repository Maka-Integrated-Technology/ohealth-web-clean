#!/usr/bin/env bash

set -euo pipefail

readonly REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
readonly MAX_EXECUTABLE_LINE_LENGTH=2000

cd "$REPO_ROOT"

fail() {
  printf '::error::%s\n' "$1" >&2
  exit 1
}

for command_name in git grep awk od tr jq; do
  command -v "$command_name" >/dev/null 2>&1 ||
    fail "Required scanner command is unavailable: $command_name"
done

git rev-parse --is-inside-work-tree >/dev/null 2>&1 ||
  fail 'Supply-chain scan must run inside a Git worktree.'

readonly -a CONFIG_FILES=(
  postcss.config.mjs
  eslint.config.mjs
  next.config.ts
  tailwind.config.js
  tailwind.config.ts
)

# Keep signatures split so the scanner does not detect its own source.
readonly -a KNOWN_CAMPAIGN_MARKERS=(
  'Tgw''(2509)'
  '_$_''1e42'
  'rmcej%''otb%'
  'temp_auto_''push.bat'
  'temp_interactive_''push.bat'
  'branch_''structure.json'
  '0xa322E5f3''D311D3080e6f0121063e9aDC2490Ef1a'
)

for marker in "${KNOWN_CAMPAIGN_MARKERS[@]}"; do
  if matches=$(git grep -FIl -- "$marker" -- .); then
    fail "Known malicious campaign marker detected in: ${matches//$'\n'/, }"
  fi
done

for config_file in "${CONFIG_FILES[@]}"; do
  [[ -f "$config_file" ]] || continue

  if grep -Eq '_0x[[:xdigit:]]{4,}|global\[[^]]+\][[:space:]]*=[[:space:]]*require|String\.fromCharCode\([^)]{100,}|node:child_process|\beval[[:space:]]*\(' "$config_file"; then
    fail "Obfuscated executable configuration detected in $config_file."
  fi
done

while IFS= read -r -d '' task_file; do
  if grep -Eqi '"runOn"[[:space:]]*:[[:space:]]*"folderOpen"|curl.+\|.+(ba)?sh|powershell' "$task_file"; then
    fail "Unsafe editor task detected in $task_file."
  fi
done < <(git ls-files -z '.vscode/tasks.json' '*/.vscode/tasks.json')

while IFS= read -r -d '' font_file; do
  magic=$(od -An -tx1 -N4 "$font_file" | tr -d ' \n')
  case "$magic" in
    774f4632 | 774f4646 | 4f54544f | 00010000) ;;
    *) fail "Invalid font signature in $font_file; possible disguised payload." ;;
  esac
done < <(git ls-files -z '*.woff' '*.woff2' '*.otf' '*.ttf')

[[ -f package.json ]] || fail 'package.json is missing.'
[[ -f package-lock.json ]] || fail 'package-lock.json is missing.'

jq empty package.json package-lock.json >/dev/null ||
  fail 'package.json or package-lock.json is not valid JSON.'

if jq -e '
  [.scripts.preinstall, .scripts.install, .scripts.postinstall] |
  any(. != null and . != "")
' package.json >/dev/null; then
  fail 'Unapproved install lifecycle script detected in package.json.'
fi

if jq -e '
  (.scripts.prepare // "") as $prepare |
  $prepare != "" and $prepare != "husky"
' package.json >/dev/null; then
  fail 'The prepare lifecycle script differs from the reviewed husky command.'
fi

if jq -e '
  .lockfileVersion != 3 or
  any(
    .packages | to_entries[];
    .key != "" and
    (.value.resolved // "") != "" and
    (
      (.value.resolved | startswith("https://registry.npmjs.org/") | not) or
      (.value.integrity // "") == ""
    )
  )
' package-lock.json >/dev/null; then
  fail 'Untrusted dependency source or missing integrity metadata in package-lock.json.'
fi

long_line_found=0
while IFS= read -r -d '' source_file; do
  if ! awk -v max="$MAX_EXECUTABLE_LINE_LENGTH" '
    length($0) > max {
      printf "%s:%d: executable line exceeds %d characters\n", FILENAME, FNR, max
      exit 1
    }
  ' "$source_file"; then
    long_line_found=1
  fi
done < <(git ls-files -z '*.js' '*.cjs' '*.mjs' '*.jsx' '*.ts' '*.tsx' '*.sh')

[[ "$long_line_found" -eq 0 ]] ||
  fail 'Abnormally long line found in tracked executable source.'

printf 'Supply-chain security scan passed.\n'
