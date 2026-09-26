#!/usr/bin/env bash

set -euo pipefail

readonly REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
readonly SCANNER="$REPO_ROOT/scripts/security/supply-chain-scan.sh"
readonly FIXTURE_ROOT="$(mktemp -d)"
readonly -a C2_TEST_MARKERS=(
  'eth_getBlock''ByNumber'
  'publicnode.''com'
  'drpc.''org'
  'blastapi.''io'
  '1rpc.''io'
  'block''scout'
  'webhook.''site'
  'shai-''hulud'
)

trap 'rm -rf "$FIXTURE_ROOT"' EXIT

fail() {
  printf 'Scanner test failed: %s\n' "$1" >&2
  exit 1
}

create_fixture() {
  local fixture="$FIXTURE_ROOT/$1"

  mkdir -p "$fixture/scripts/security"
  cp "$SCANNER" "$fixture/scripts/security/supply-chain-scan.sh"

  cat >"$fixture/package.json" <<'JSON'
{
  "name": "scanner-fixture",
  "version": "1.0.0",
  "scripts": {
    "prepare": "husky"
  }
}
JSON

  cat >"$fixture/package-lock.json" <<'JSON'
{
  "name": "scanner-fixture",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "packages": {
    "": {
      "name": "scanner-fixture",
      "version": "1.0.0"
    },
    "node_modules/example": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/example/-/example-1.0.0.tgz",
      "integrity": "sha512-reviewed"
    }
  }
}
JSON

  git -C "$fixture" init --quiet
  git -C "$fixture" add package.json package-lock.json scripts/security/supply-chain-scan.sh
  printf '%s\n' "$fixture"
}

update_json() {
  local file="$1"
  local filter="$2"
  local replacement="$file.next"

  jq "$filter" "$file" >"$replacement"
  mv "$replacement" "$file"
}

expect_pass() {
  local fixture="$1"
  local label="$2"

  if ! (cd "$fixture" && bash scripts/security/supply-chain-scan.sh) >/dev/null 2>&1; then
    fail "$label should pass"
  fi
}

expect_fail() {
  local fixture="$1"
  local label="$2"

  if (cd "$fixture" && bash scripts/security/supply-chain-scan.sh) >/dev/null 2>&1; then
    fail "$label should fail closed"
  fi
}

clean_fixture=$(create_fixture clean)
expect_pass "$clean_fixture" 'reviewed package metadata'

hidden_whitespace_fixture=$(create_fixture hidden-whitespace)
printf 'const visible = true;%40sconst hidden = true;\n' '' \
  >"$hidden_whitespace_fixture/hidden.ts"
git -C "$hidden_whitespace_fixture" add hidden.ts
expect_fail "$hidden_whitespace_fixture" 'hidden whitespace payload'

for index in "${!C2_TEST_MARKERS[@]}"; do
  c2_fixture=$(create_fixture "c2-$index")
  printf 'export const endpoint = "%s";\n' "${C2_TEST_MARKERS[$index]}" \
    >"$c2_fixture/indicator.ts"
  git -C "$c2_fixture" add indicator.ts
  expect_fail "$c2_fixture" "campaign marker ${C2_TEST_MARKERS[$index]}"
done

oversized_config_fixture=$(create_fixture oversized-config)
for index in {1..300}; do
  printf 'export const value_%03d = "%040d";\n' "$index" "$index"
done >"$oversized_config_fixture/oversized.config.mjs"
git -C "$oversized_config_fixture" add oversized.config.mjs
expect_fail "$oversized_config_fixture" 'oversized configuration file'

create_require_fixture=$(create_fixture create-require)
printf 'const loader = createRequire(import.meta.url);\n' \
  >"$create_require_fixture/loader.config.mjs"
git -C "$create_require_fixture" add loader.config.mjs
expect_fail "$create_require_fixture" 'dynamic createRequire configuration'

spawn_fixture=$(create_fixture spawn)
printf 'spawn("node", ["-e", payload]);\n' >"$spawn_fixture/spawn.config.mjs"
git -C "$spawn_fixture" add spawn.config.mjs
expect_fail "$spawn_fixture" 'dynamic spawn configuration'

for hook in preinstall install postinstall prepublish preprepare postprepare dependencies; do
  hook_fixture=$(create_fixture "hook-$hook")
  update_json "$hook_fixture/package.json" ".scripts.${hook} = \"malicious-command\""
  expect_fail "$hook_fixture" "unapproved $hook lifecycle hook"
done

unreviewed_prepare_fixture=$(create_fixture unreviewed-prepare)
update_json \
  "$unreviewed_prepare_fixture/package.json" \
  '.scripts.prepare = "husky && malicious-command"'
expect_fail "$unreviewed_prepare_fixture" 'unreviewed prepare lifecycle command'

missing_resolved_fixture=$(create_fixture missing-resolved)
update_json \
  "$missing_resolved_fixture/package-lock.json" \
  'del(.packages["node_modules/example"].resolved)'
expect_fail "$missing_resolved_fixture" 'missing resolved metadata'

missing_integrity_fixture=$(create_fixture missing-integrity)
update_json \
  "$missing_integrity_fixture/package-lock.json" \
  'del(.packages["node_modules/example"].integrity)'
expect_fail "$missing_integrity_fixture" 'missing integrity metadata'

untrusted_source_fixture=$(create_fixture untrusted-source)
update_json \
  "$untrusted_source_fixture/package-lock.json" \
  '.packages["node_modules/example"].resolved = "https://example.invalid/package.tgz"'
expect_fail "$untrusted_source_fixture" 'untrusted dependency source'

missing_packages_fixture=$(create_fixture missing-packages)
update_json "$missing_packages_fixture/package-lock.json" 'del(.packages)'
expect_fail "$missing_packages_fixture" 'missing packages object'

malformed_entry_fixture=$(create_fixture malformed-entry)
update_json \
  "$malformed_entry_fixture/package-lock.json" \
  '.packages["node_modules/example"] = "invalid"'
expect_fail "$malformed_entry_fixture" 'malformed package entry'

malformed_scripts_fixture=$(create_fixture malformed-scripts)
update_json "$malformed_scripts_fixture/package.json" '.scripts = "invalid"'
expect_fail "$malformed_scripts_fixture" 'malformed scripts object'

printf 'Supply-chain scanner adversarial tests passed.\n'
