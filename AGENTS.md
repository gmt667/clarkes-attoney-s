# Clarkes Attorneys workspace

The active application is Vite, React, TypeScript and React Router under `src/`.
Read `README.md`, `docs/ARCHITECTURE.md` and the migration report before changes.
Preserve official content, branding and assets. Build with `npm run build`; only
the contents of `dist/` are deployed to cPanel. No server secrets belong in the
frontend or in `VITE_` environment variables.

The original Next.js application is preserved independently in `legacy/nextjs/`.
Its own `AGENTS.md` applies when working in that archive. Do not mix its server
dependencies or imports into the active frontend.

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` and
`npm run test:build` for substantive migration changes. DOM tests are not a
substitute for real-browser visual testing; report that distinction accurately.
