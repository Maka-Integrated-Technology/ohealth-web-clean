# ESLint, Prettier, Husky, and lint-staged — setup guide

This document describes a **practical, repeatable setup** for TypeScript/JavaScript projects: **ESLint 9 (flat config)**, **Prettier**, **eslint-config-prettier** (disable conflicting rules), **eslint-plugin-prettier** (run Prettier as an ESLint rule), **Husky 9** (Git hooks), and **lint-staged** (only check staged files on commit).

You can copy the sections that match your stack (**Next.js** vs **other**).

---

## What you get

| Tool                       | Role                                                                  |
| -------------------------- | --------------------------------------------------------------------- |
| **ESLint**                 | Code quality, import hygiene, React/Next rules, TypeScript-aware lint |
| **Prettier**               | Opinionated formatting (quotes, width, trailing commas, etc.)         |
| **eslint-config-prettier** | Turns off ESLint rules that fight with Prettier                       |
| **eslint-plugin-prettier** | Surfaces Prettier violations as ESLint errors (`prettier/prettier`)   |
| **lint-staged**            | On commit, run ESLint/Prettier only on **staged** files (fast)        |
| **Husky**                  | Installs Git hooks from `.husky/` when someone runs `npm install`     |

---

## 1. Install dev dependencies

From the project root (adjust versions to match your framework when needed):

### Next.js (App Router, ESLint 9)

```bash
npm install -D eslint eslint-config-next prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged
```

`eslint-config-next` should match your **Next.js** major version (for example Next 16 → `eslint-config-next@16`). It already pulls in TypeScript ESLint, React, hooks, import, and jsx-a11y integration it needs.

### Non-Next (e.g. Vite + React + TypeScript)

```bash
npm install -D eslint typescript typescript-eslint @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged
```

You will compose a flat config yourself (see **section 4b**). Add **React**/**a11y** plugins if you want parity with a richer Next-like setup.

---

## 2. Prettier — config files

### `.prettierrc` (JSON)

Tweak to taste; this matches a common strict-but-readable default:

```json
{
  "arrowParens": "avoid",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "printWidth": 90,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

**`printWidth`:** Prettier uses it as a **soft wrap target**, not a hard maximum on every line. Long **string literals** can still end up a few characters over when the only alternative is an ugly split. Shorten the copy or break the string manually if you need a strict cap.

### `.prettierignore`

Ignore build output, dependencies, and anything you never want rewritten:

```gitignore
node_modules
.next
out
build
coverage
.turbo
next-env.d.ts
package-lock.json
pnpm-lock.yaml
yarn.lock
public
```

Remove `public` from this list if you want Prettier to format files there.

### `package.json` scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write . --ignore-path .prettierignore",
    "format:check": "prettier --check . --ignore-path .prettierignore"
  }
}
```

- **`lint`** — full-project ESLint (CI and local).
- **`lint:fix`** — auto-fix what ESLint can fix (includes Prettier fixes when `eslint-plugin-prettier` is enabled).
- **`format`** — run Prettier on the whole tree (respects `.prettierignore`).
- **`format:check`** — CI-friendly; fails if anything is not Prettier-clean.

---

## 3. ESLint flat config filename

ESLint 9 defaults to **`eslint.config.js`** or **`eslint.config.mjs`**.

- Use **`.mjs`** if you prefer **native ESM** `import`/`export` without `"type": "module"` in `package.json`.
- Keep the file at the **repository root** next to `package.json`.

---

## 4a. ESLint + Prettier — **Next.js** (recommended pattern)

Create **`eslint.config.mjs`**:

```javascript
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
]);

export default eslintConfig;
```

Notes:

- **`defineConfig`** / **`globalIgnores`** come from **`eslint/config`** (ships with ESLint 9).
- Spread **`...nextVitals`** and **`...nextTs`** so you get Next + TypeScript rules together.
- Add **`prettierRecommended` last** (before or after `globalIgnores` is fine; order among ignores vs Prettier rarely matters). It enables **`prettier/prettier`** and merges **`eslint-config-prettier`** rule disables.
- **`prettier/prettier`** reads **`.prettierrc`** by default — do **not** duplicate all Prettier options inside ESLint unless you have a reason.

---

## 4b. ESLint + Prettier — **generic TypeScript + React** (minimal flat config)

If you are **not** on Next.js, compose **`typescript-eslint`**, **`@eslint/js`**, and plugins manually. Example skeleton (simplify or extend as needed):

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  prettierRecommended,
);
```

Align **`files`**, **`ignores`**, and **React** version with your app. For **Vite**, point ignores at **`dist`**.

---

## 5. Husky 9 — Git hooks

### `package.json`

Add a **`prepare`** script so hooks are installed after **`npm install`** (requires a **Git** repo):

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### Hook file

Create **`.husky/pre-commit`** (no extension) with:

```text
npx lint-staged
```

On first clone, run **`npm install`**; Husky sets **`core.hooksPath`** and wires hooks. If hooks never run, run **`npx husky`** once from the repo root.

To **skip** hooks temporarily (not for routine use):

```bash
HUSKY=0 git commit -m "message"
```

---

## 6. lint-staged — only staged files

Add a top-level **`lint-staged`** key in **`package.json`** (same level as **`scripts`**):

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,mjs,cjs}": ["eslint --fix --max-warnings 0"],
    "*.{json,css,md,yml,yaml}": ["prettier --write --ignore-unknown"]
  }
}
```

Why two groups?

- **TypeScript/JavaScript** — **`eslint --fix`** runs ESLint fixes; with **`eslint-plugin-prettier`**, that includes Prettier-backed fixes for those files.
- **JSON/CSS/Markdown/YAML** — often **not** all covered by your ESLint `files` glob; **Prettier** alone keeps them consistent.

Adjust globs if you use **`.vue`**, **`.svelte`**, etc.

---

## 7. Daily commands (cheat sheet)

| Goal                               | Command                                |
| ---------------------------------- | -------------------------------------- |
| Lint whole repo                    | `npm run lint`                         |
| Lint + auto-fix                    | `npm run lint:fix`                     |
| Format everything Prettier touches | `npm run format`                       |
| CI: ensure formatted               | `npm run format:check`                 |
| Typical CI gate                    | `npm run format:check && npm run lint` |

After editing a few files, **`npm run lint:fix`** is usually enough before a commit if **lint-staged** will run again on commit.

---

## 8. CI (GitHub Actions example)

```yaml
- run: npm ci
- run: npm run format:check
- run: npm run lint
- run: npm run build
```

Order **`format:check`** before **`lint`** so formatting failures fail fast.

---

## 9. Editor integration (optional)

In **VS Code / Cursor**, common choices:

- Install **ESLint** and **Prettier** extensions.
- Enable **format on save** with Prettier as default formatter **or** rely on ESLint’s “fix on save” if you only use ESLint for TS/TSX.

Keep **one** source of truth for formatting (here: **Prettier** + **`prettier/prettier`** via ESLint for TS/JS).

### `singleQuote` vs JSX (not a bug)

- **`"singleQuote": true`** affects **normal JS/TS strings** (including `import … from '…'`).
- **JSX attributes** use **`jsxSingleQuote`** (Prettier default **`false`**). So `className="bg-white"` can stay **double-quoted** even with `singleQuote: true`. Set **`"jsxSingleQuote": true`** only if you want **single** quotes in JSX too.

### “Replace single with double” on imports (usually the editor)

If **Problems** asks to change `'@/…'` to `"@/…"` but `.prettierrc` has **`singleQuote: true`**, run **`npm run lint`** and **`npx prettier --check`** from the repo root. When those pass, the file matches the project; the squiggle is often **Prettier in the editor using defaults** (double quotes) instead of **`.prettierrc`**.

Mitigations:

- Set **`"prettier.requireConfig": true`** so the Prettier extension does not format without your config.
- Open the workspace at the folder that **contains** `.prettierrc` (important in monorepos).
- Add **`"eslint.workingDirectories": [{ "mode": "auto" }]`** so ESLint resolves config from the right package root.
- Reload the editor window after changing settings.

---

## 10. Troubleshooting

| Symptom                             | What to check                                                                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Parsing error` / TS not understood | Ensure **`typescript-eslint`** (or **`eslint-config-next/typescript`**) is in the config and **`files`** includes **`*.ts`/`*.tsx`**.                       |
| ESLint and Prettier disagree        | Ensure **`eslint-plugin-prettier/recommended`** (or **`eslint-config-prettier`**) is applied **after** style-heavy ESLint presets.                          |
| Prettier not running on commit      | Confirm **`.husky/pre-commit`** exists and **`prepare`** ran (**`npm install`**). Run **`npx husky`**.                                                      |
| lint-staged too slow                | Narrow globs; avoid running **`eslint .`** in the hook (use **`eslint --fix`** only on staged paths — lint-staged passes a file list automatically).        |
| `eslint/config` not found           | You need **ESLint 9+**; upgrade ESLint.                                                                                                                     |
| Import strings: single vs double    | Confirm **`npm run lint`** / **`prettier --check`** pass; then align editor Prettier with **`.prettierrc`** (**`prettier.requireConfig`**, workspace root). |

---

## 11. Checklist for a **new** repo

1. [ ] Add **`.prettierrc`** and **`.prettierignore`**
2. [ ] Add **`eslint.config.mjs`** (Next **or** generic TS/React)
3. [ ] Install devDependencies (**section 1**)
4. [ ] Add **`scripts`**: `lint`, `lint:fix`, `format`, `format:check`
5. [ ] Add **`lint-staged`** in **`package.json`**
6. [ ] `npm install -D husky && npx husky init` **or** manually add **`.husky/pre-commit`** + **`"prepare": "husky"`**
7. [ ] Run **`npm run format`** once, then **`npm run lint`**
8. [ ] Commit **`eslint.config.mjs`**, **`.prettierrc`**, **`.prettierignore`**, **`.husky/pre-commit`**, and **`package.json`**

---

## Reference: this repo

The **OHealth+-web** project uses the **Next.js** variant: see root **`eslint.config.mjs`**, **`.prettierrc`**, **`.prettierignore`**, **`package.json`** (`scripts`, `lint-staged`, `prepare`), and **`.husky/pre-commit`**.
