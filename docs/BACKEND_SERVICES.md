# Services outside the React application

The uploaded `dist` is frontend-only. It does not connect to PostgreSQL, initialize
Prisma, send email directly or run a CMS. No server credentials belong in Vite
environment variables, source code, public assets or uploaded files.

## Contact endpoint

Set `VITE_CONTACT_API_URL` at build time to an HTTPS endpoint owned by the firm,
for example `https://api.example.com/contact`, or to an independently implemented
same-origin path such as `/api/contact.php`. These are configuration examples,
not automatically deployed endpoints. An empty value is the safe default.
Rebuild after changing it. Local development can use an HTTP localhost endpoint.

A separate cPanel-compatible PHP implementation is now supplied under
`server/php/`. Follow its [deployment instructions](../server/php/README.md) to
enable `/api/contact` without Node.js. Its private configuration and delivery code
must remain outside `public_html`; it is not copied into `dist`.

The frontend sends `POST` JSON with `name`, `email`, `phone`, `subject`,
`legalService`, `message`, `company` (empty honeypot), `startedAt` (milliseconds)
and `source`. No cookies or credentials are sent. The backend should return a
JSON content type and:

```json
{ "ok": true, "message": "Your enquiry has been accepted for delivery." }
```

Use non-2xx HTTP statuses and `ok: false` for failures. Validation responses can
include `details`, mapping input names to arrays of messages. Do not return API
keys, tokens or database errors to users. The frontend does not require a GET
health route, so POST-only services are supported. It handles HTML 404 pages,
invalid JSON, transport timeouts and provider failures as failures, retains the
draft and keeps direct contact links visible.

An external origin must answer the browser's JSON POST `OPTIONS` preflight and
allow the deployed site origin, POST, and the `Content-Type` and `Accept` headers.
Use an explicit allowed origin. Validation, anti-spam, rate limits, proxy trust,
email escaping and mail delivery run on that backend. The archived Next route is
a reference for existing validation, recipient and message behavior; it cannot
be uploaded as a working PHP endpoint or copied into the React bundle.

## Resend

Run the Resend SDK only in the independent API/function. Configure server-only
`RESEND_API_KEY` and `RESEND_FROM_EMAIL` using a verified domain. Preserve the
existing recipient list (`info@clarkesattorneys.mw` and
`geoffrey@clarkesattorneys.mw`) and reply-to behavior there. Validate one labelled
test enquiry after deployment and verify receipt at both inboxes. API acceptance
is not proof of delivery. Do not prefix these secrets with `VITE_`.

## PostgreSQL and Prisma

Keep `DATABASE_URL`, `@prisma/client`, adapters and migrations in the separate
backend. The original `ContactSubmission` schema and client initializer are in
`legacy/nextjs/prisma` and `legacy/nextjs/lib/prisma.ts`. Provision and migrate the
database there, with least-privilege service access. Database failure should not
prevent mail delivery if storage is optional. Never connect a browser directly
to PostgreSQL or include the connection string in a static build.

## Sanity

This migration preserves the existing published content in
`src/content/site-content.ts`. It makes no live CMS request and embeds no token.
Host Sanity Studio independently for staff; preserve the schema under
`legacy/nextjs/sanity` when extracting it. The public `/studio` application is
removed from the frontend route table.

For future CMS publishing, use a separate CI/export job or a read-only API to
validate published records and export the complete typed content snapshot, then
rebuild the static site. Use `SANITY_PROJECT_ID`, `SANITY_DATASET` and a server-only
read token in that export job if a private dataset requires one. Sanity write
tokens must never be sent to browsers. Public project/dataset identifiers are
not secrets, but they do not authorize writes and are unnecessary in this
frontend's environment. The old `NEXT_PUBLIC_*` Studio settings are not copied
into Vite; configure the separately hosted Studio under its own documented
environment conventions.
