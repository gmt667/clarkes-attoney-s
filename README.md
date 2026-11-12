# Clarkes Attorneys

Frontend-only React, TypeScript and Vite website for Clarkes Attorneys, with
React Router and a static Apache/cPanel deployment. Repository:
https://github.com/gmt667/clarkes-attoney-s

## Local setup

Use Node.js 22.12 or newer and npm for development/building only.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). On Windows,
use `Copy-Item .env.example .env.local` and `npm.cmd` if PowerShell blocks `npm.ps1`.

## Build and checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:build
npm run preview
```

The build outputs `dist/`. Preview is a local validation tool, not a production
hosting requirement. `test:build` checks the artifact, preserved asset hashes,
direct URLs using an Apache-equivalent static fallback harness, and missing
asset/API behavior. Interaction tests use jsdom, not a real rendering browser.

## cPanel deployment

1. Build locally with `npm ci` and `npm run build`.
2. Back up the current `public_html` files through your normal deployment process.
3. Upload **the contents of `dist`**, including hidden `.htaccess`, to the domain's
   `public_html`. Enable “Show Hidden Files” in cPanel File Manager. Replace old
   entry HTML and hashed assets together so clients do not load mixed versions.
4. Confirm Apache `mod_rewrite` and `.htaccess` overrides are enabled. The supplied
   file disables MultiViews, serves actual assets as files and falls back to
   `index.html` for React Router's clean URLs. It leaves API and missing asset
   requests alone instead of returning application HTML for them.
5. Open `/about`, `/our-team`, `/contact` and an individual blog article directly,
   then refresh each page. Confirm all images, styles and scripts load.

No Passenger, PM2 or running Node.js process is required in production. Do not
upload `src`, `legacy`, `.env*`, `node_modules` or the repository root. The current
configuration targets the domain root; deployment into a subdirectory requires
coordinated Vite `base`, Router basename, public asset paths and RewriteBase changes.

If Apache reports a 500 error on the `Options -MultiViews` directive, ask the host
to permit that override or disable MultiViews in the hosting configuration before
removing that line. If direct URLs return 404, check that `.htaccess` was uploaded
and that rewrite overrides are enabled. Missing `.js`/image paths should return
404, never `index.html`.

## Configuration and contact enquiries

`.env.example` contains only public, safe configuration:

- `VITE_CONTACT_API_URL`: separate HTTPS contact endpoint; leave empty for the
  email/telephone fallback. No fake submission success is shown.
- `VITE_SITE_URL`: optional canonical site origin. Leave empty until the actual
  public domain is confirmed.

Vite substitutes these values at build time. Rebuild after changing them.
Everything named `VITE_*` is public. Never add Resend keys, database connection
strings or Sanity tokens. The independent backend and CORS contract are described
in [docs/BACKEND_SERVICES.md](docs/BACKEND_SERVICES.md).

An optional PHP enquiry backend for cPanel is supplied separately in
[server/php](server/php/README.md). It provides `/api/contact` once installed and
configured, with secrets outside `public_html`. Verify it with
`npm run test:contact-backend` (requires PHP 8.2+). Real inbox delivery still needs
to be tested on the configured host before enabling the form.

All original public routes, article text, team members, gallery and local images
are retained. Dark mode, native profile/gallery dialogs, a keyboard-accessible
menu and readable fallback contact options are included. The homepage uses the
restored Lady Justice composition and original font, with a modest heading-only
alignment and width refinement. See [restoration details](docs/DESIGN_RESTORATION.md).

## Structure and migration evidence

- [Architecture](docs/ARCHITECTURE.md)
- [Migration report and hero comparison](docs/MIGRATION_REPORT.md)
- [Validation results and limitations](docs/VALIDATION.md)
- [Original inventory and hashes](docs/nextjs-inventory.json)

The preserved Next.js application is in `legacy/nextjs`, including the original
package lock, server code, Studio and assets. Run it independently from that
directory if needed; it is not part of the Vite build or upload. Work is on the
`migration/vite-react` branch. Local completion does not imply a GitHub push or
production deployment.
