# Enquiry form deployment

This app requires a Next.js Node runtime (or a host that supports Next.js route
handlers). Publishing only HTML, CSS, and JavaScript cannot run `POST /api/contact`.
Do not deploy a static export as the complete application.

1. Install dependencies with `npm ci` and generate Prisma with `npx prisma generate`.
2. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the hosting service's server
   environment. The sender must use a domain verified with Resend. Never expose
   the API key through a `NEXT_PUBLIC_` variable.
3. Run `npm run build`, then `npm start` (set `PORT` if required by the host).
   Route requests, including `/api/contact`, to that runtime. Deploy all Next.js
   build assets and `public`, not just pre-rendered HTML.
4. `GET /api/contact` must return JSON with HTTP 200 and `ok: true`. HTTP 503 means
   email is not configured. This is a configuration check, not proof of delivery.
5. Submit one clearly labelled test enquiry through the deployed form. Verify
   receipt at both `info@clarkesattorneys.mw` and `geoffrey@clarkesattorneys.mw`,
   and verify that Reply addresses the submitted email. Check the provider's
   delivery event; an accepted API response alone does not prove inbox delivery.
6. Confirm invalid submissions show field errors and failed delivery preserves
   the message and offers direct contact links. A missing or HTML-only endpoint
   must disable online submission and display the email/phone alternative.

`DATABASE_URL` is optional; database failure must not stop email delivery.
The in-memory rate limiter is per process. For multiple instances, configure a
shared rate limit at the hosting edge. Configure trusted proxy IP headers there.

Run `node --test tests/contact-route.test.cjs` for isolated handler checks. These
use a fake email provider and never deliver email. Build and local checks do not
replace the production delivery test above.
