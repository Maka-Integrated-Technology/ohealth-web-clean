# Contributing to OHealth+ Web

Thanks for contributing.

## Development setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development:
   ```bash
   npm run dev
   ```

## Branching and commits

- Create a focused branch per task (feature/fix/refactor/docs).
- Keep commits small and scoped.
- Use clear commit messages (imperative, concise), for example:
  - `feat: add who-can section card images`
  - `fix: correct home section spacing on mobile`
  - `refactor: reuse shared how-it-works component`

## Coding guidelines

### 1) Prefer composition over duplication

When Home and For Professionals share layout structure, use shared components in:

- `src/components/sections/`

Keep route-specific copy/data in page composers (`home/`, `for-professionals/`) and pass as props.

### 2) Keep shared components configurable

If a section differs by text, card content, grid columns, or spacing:

- add typed props instead of cloning files
- use optional props for route-specific variants

### 3) Styling rules

- Use Tailwind utilities consistent with existing patterns.
- Keep design token usage aligned with `src/app/globals.css`.
- For class overrides in reusable components, prefer `cn(...)` (`src/lib/utils`) to avoid class conflicts.

### 4) TypeScript

- Add explicit types for component props and content arrays.
- Avoid `any`.
- Keep types near usage unless shared across multiple files.

## Validation before opening PR

Run:

```bash
npm run format:check
npm run lint
npm run build
```

Or use:

```bash
npm run check
```

## Pull request checklist

- [ ] Changes are scoped and focused
- [ ] No duplicate components were introduced unnecessarily
- [ ] Shared sections are reused where appropriate
- [ ] Home and For Professionals still render correctly
- [ ] `npm run check` passes
- [ ] README/CONTRIBUTING updated if workflow/structure changed

## Where to put new files

- New reusable section: `src/components/sections/`
- Home-only composition logic: `src/components/home/`
- For professionals-only composition logic: `src/components/for-professionals/`
- Generic controls/primitives: `src/components/ui/`
- Shared layout shell/nav/footer: `src/components/layout/`

## Questions

If unsure whether something should be shared or route-specific, prefer:

1. shared section component with props
2. thin route wrapper only if it adds meaningful route-specific behavior
