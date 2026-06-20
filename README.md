# OHealth+ Web

Marketing and informational website for **OHealth+**, built with:

- `next@16` (App Router)
- `react@19`
- `typescript`
- `tailwindcss@4`

The codebase is organized around reusable section components so Home and For Professionals can share layout logic while keeping different copy/content.

## Prerequisites

- Node.js 22.12+ (see `.nvmrc`)
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` - start development server (Turbopack)
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
- `npm run lint:fix` - run ESLint with auto-fix
- `npm run format` - run Prettier write
- `npm run format:check` - check formatting
- `npm run test` - run unit tests (Vitest)
- `npm run test:e2e` - run Playwright E2E tests
- `npm run test:e2e:ui` - Playwright interactive UI
- `npm run check` - format + lint + unit tests + E2E + production build
- `npm run doctor` - React Doctor audit

## Project structure

- `src/app/` - Next.js routes and layouts
- `src/components/ui/` - low-level UI primitives
- `src/components/layout/` - shared page chrome (`Navbar`, `Footer`, `SiteChrome`)
- `src/components/sections/` - reusable section blocks used across routes
- `src/components/home/` - Home page composition and page-specific wrappers
- `src/components/for-professionals/` - For Professionals page composition
- `src/content/` - structured content (FAQ, legal, etc.)
- `src/lib/` - shared utilities/config (`images`, loaders, nav, contact, security)
- `public/` - static assets
- `e2e/` - Playwright end-to-end tests

## Routes

Main routes include:

- `/`
- `/for-professionals`
- `/faq`
- `/contact`
- `/privacy`
- `/terms`
- `/blog` (placeholder, `noindex`, excluded from sitemap)
- `/careers` (placeholder, `noindex`, excluded from sitemap)

## Styling and design system

- Tailwind v4 utilities + design tokens in `src/app/globals.css`
- Shared button variants in `src/components/ui/button.tsx`
- Favor reusable section components over duplicating section markup between pages

## Images

- Product/marketing image IDs are centralized in `src/lib/images.ts`
- Static icon/image assets live in `public/icons` and `public/images`
- `next/image` is used throughout with local assets and configured loader support
- Cloudinary cloud name: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional)

## Quality gates

- Pre-commit (Husky): `npm test` + lint-staged (ESLint on TS/JS, Prettier on JSON/CSS/MD)
- `npm run check` runs format, lint, Vitest, Playwright, and production build
- **CI:** there is no checked-in GitHub Actions workflow in this repo — pipeline ownership lives with DevOps. Before opening a PR, run `npm run check` locally (requires `npx playwright install` once for E2E)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for development workflow, coding conventions, and PR checklist.

## Contact form

Submissions from `/contact` use a React 19 server action (`useActionState` + `useFormStatus`) and are sent via [Resend](https://resend.com). Rate limiting uses [Upstash Redis](https://upstash.com).

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable                            | Required (prod) | Purpose                                                |
| ----------------------------------- | --------------- | ------------------------------------------------------ |
| `RESEND_API_KEY`                    | Yes             | Resend API key for outbound email                      |
| `CONTACT_FROM_EMAIL`                | Yes             | Verified sender address in Resend                      |
| `CONTACT_TO_EMAIL`                  | No              | Inbox override (default: `support@ohealthltd.com`)     |
| `UPSTASH_REDIS_REST_URL`            | Yes             | Distributed contact-form rate limiting                 |
| `UPSTASH_REDIS_REST_TOKEN`          | Yes             | Upstash REST token                                     |
| `NEXT_PUBLIC_SITE_URL`              | Recommended     | Canonical URLs, Open Graph, sitemap                    |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | No              | Cloudinary tenant override                             |
| `E2E`                               | Never in prod   | Set by Playwright only; mocks Resend in non-production |

Production builds on Vercel/CI fail fast if Resend, Upstash, or mock/E2E flags are misconfigured.

**Full name rule:** accepts mononyms and multi-part names (any script). Each whitespace-separated part must contain at least one letter; values that are too short or digits/symbols only are rejected. See `isValidContactFullName` in `src/lib/contact/contact-message.ts`.

## Security

- Security headers and CSP are applied in `src/proxy.ts` (enforced in production, report-only in development).
- Do not set `E2E=true` or `CONTACT_MOCK_SEND=true` in production.

## Notes

This repo targets **Next.js 16**. Prefer local versioned docs in `node_modules/next/dist/docs` when behavior differs from older examples. Request handling uses `src/proxy.ts` (replaces deprecated `middleware.ts`).
