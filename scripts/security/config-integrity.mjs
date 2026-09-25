#!/usr/bin/env node
/**
 * Config integrity guard.
 *
 * Why this exists: this repo was previously hit by a supply-chain campaign
 * (npm dependency executing during the build) that appends obfuscated
 * malware to the end of build-tool config files (postcss.config.mjs,
 * eslint.config.mjs, next.config.ts, tailwind.config.*) so it runs whenever
 * those files are loaded. Turbopack/webpack sometimes fail loudly on the
 * resulting dynamic `require(...)` calls, but there's no guarantee they
 * always will — so this script independently hashes the watched files
 * before and after `next build` and hard-fails with a clear message if
 * anything was appended or altered, instead of a build silently shipping.
 *
 * Deliberately dependency-free (only Node built-ins) so it keeps working
 * even if something in node_modules is compromised.
 *
 * Usage:
 *   node scripts/security/config-integrity.mjs verify   # check files match known-good hashes
 *   node scripts/security/config-integrity.mjs snapshot # regenerate known-good hashes (after an intentional edit)
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const manifestPath = path.join(__dirname, 'config-hashes.json');

const WATCHED_FILES = [
  'postcss.config.mjs',
  'eslint.config.mjs',
  'next.config.ts',
  'tailwind.config.js',
  'tailwind.config.ts',
];

// Signatures seen in real config-file injection campaigns (obfuscated
// string-array loaders, hex-encoded identifiers, dynamic network/process
// primitives bundled together). Any hit is treated as a hard failure
// regardless of whether the file happens to match a stored hash.
const SUSPICIOUS_PATTERNS = [
  /_0x[a-f0-9]{4,6}/i,
  /require\(_0x[a-f0-9]+\)/i,
  /\bglobal\['!'\]/,
  new RegExp('rmcej%' + 'otb%'),
  new RegExp('\\$_' + '1e42'),
  new RegExp('temp_auto_' + 'push\\.bat', 'i'),
];

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function loadManifest() {
  if (!existsSync(manifestPath)) return {};
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

function scanFile(relPath) {
  const absPath = path.join(repoRoot, relPath);
  if (!existsSync(absPath)) return null;
  const content = readFileSync(absPath, 'utf8');
  const hash = sha256(content);
  const suspicious = SUSPICIOUS_PATTERNS.filter(pattern => pattern.test(content));
  return { relPath, hash, suspicious, length: content.length };
}

function fail(message) {
  console.error('\n' + '='.repeat(72));
  console.error('SECURITY ALERT: config-integrity check failed');
  console.error('='.repeat(72));
  console.error(message);
  console.error(
    '\nDo NOT deploy this build. Treat the build environment as compromised:\n' +
      '  1. Stop/cancel this deployment.\n' +
      '  2. Rotate every secret exposed to this build (RESEND_API_KEY, any\n' +
      '     Cloudflare/GitHub/npm tokens set as build env vars).\n' +
      '  3. Diff the flagged file(s) against git and inspect the injected\n' +
      '     content before deleting it.\n' +
      '  4. Re-run `npm ls <suspect-package>` and audit recently updated\n' +
      '     dependencies (especially Tailwind/PostCSS/ESLint plugins).\n',
  );
  console.error('='.repeat(72) + '\n');
  process.exit(1);
}

function verify() {
  const manifest = loadManifest();
  const problems = [];

  for (const relPath of WATCHED_FILES) {
    const result = scanFile(relPath);
    if (!result) continue; // file not present in this project, skip

    if (result.suspicious.length > 0) {
      problems.push(
        `${relPath}: contains known malicious-injection signature(s): ` +
          result.suspicious.map(p => p.toString()).join(', ') +
          ` (${result.length} bytes)`,
      );
      continue;
    }

    const expected = manifest[relPath];
    if (!expected) {
      problems.push(
        `${relPath}: no known-good hash recorded. Run ` +
          `'npm run security:snapshot-configs' after reviewing this file by hand.`,
      );
      continue;
    }

    if (expected !== result.hash) {
      problems.push(
        `${relPath}: content hash changed (expected ${expected.slice(0, 12)}…, ` +
          `got ${result.hash.slice(0, 12)}…, length ${result.length} bytes). ` +
          `If this is an intentional edit, review it carefully, then run ` +
          `'npm run security:snapshot-configs'.`,
      );
    }
  }

  if (problems.length > 0) {
    fail(problems.map(p => `- ${p}`).join('\n'));
  }

  console.log(`config-integrity: OK (${WATCHED_FILES.length} watched paths checked)`);
}

function snapshot() {
  const manifest = {};
  for (const relPath of WATCHED_FILES) {
    const result = scanFile(relPath);
    if (!result) continue;
    if (result.suspicious.length > 0) {
      fail(
        `${relPath} matches known malicious-injection signatures. Refusing to ` +
          `snapshot a compromised file. Clean it first.`,
      );
    }
    manifest[relPath] = result.hash;
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(
    `config-integrity: snapshot written to ${path.relative(repoRoot, manifestPath)}`,
  );
}

const mode = process.argv[2];
if (mode === 'verify') verify();
else if (mode === 'snapshot') snapshot();
else {
  console.error('Usage: node scripts/security/config-integrity.mjs <verify|snapshot>');
  process.exit(1);
}
