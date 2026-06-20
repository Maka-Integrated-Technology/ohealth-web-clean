<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# OHealth+ Web — agent conventions

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4
- Single server action: contact form → Resend (`src/app/contact/actions.ts`)
- Security headers/CSP: `src/proxy.ts` (not `middleware.ts`)
- Rate limiting: Upstash Redis in production; in-memory fallback in dev only

## Layout

- `SiteChrome` wraps pages with `Navbar`, `#main-content`, `Footer` (`#site-footer`)
- `AppSplash` shows once per session (`sessionStorage` key `ohealth-splash-seen`); ~1.6s hold, Skip + focus trap
- Mobile nav: `useMobileMenu` sets `aria-hidden` on `#main-content` and `#site-footer` when open

## Contact form

- Client: `ContactLeadForm` uses controlled inputs + `preventDefault` on submit (do not revert to uncontrolled Base UI `Input` + `action` alone — fields clear on validation failure)
- Validation: honeypot `_hp`, field limits in `contact-limits.ts`, email regex in `contact-message.ts`
- **Full name** accepts mononyms and multi-part names; each part must include a letter (`isValidContactFullName`)
- Mock send: `isContactSendMocked()` — only non-prod with `E2E=true` or `CONTACT_MOCK_SEND=true`

## Testing

- Unit: Vitest, `src/**/*.test.{ts,tsx}`, `environment: 'node'`
- E2E: Playwright in `e2e/`, dev server started with `E2E=true` (mocks Resend)
- `npm run check` = format + lint + unit + E2E + build
- Remote CI is maintained by DevOps; run `npm run check` locally before opening a PR

## Code style

- Minimize diff scope; match existing patterns in surrounding files
- Internal `Link`s: default prefetch (do not add `prefetch={false}` unless external/special case)
- Images: `src/lib/images.ts`, Cloudinary via `src/lib/cloudinary-loader.ts`
- SEO: `PUBLIC_ROUTES` in `src/lib/constants/seo.ts` — sitemap has no `lastModified` noise

## Env (see `.env.example` + README)

Prod requires `RESEND_*`, `UPSTASH_*`. Never set `E2E` or `CONTACT_MOCK_SEND` in production.
