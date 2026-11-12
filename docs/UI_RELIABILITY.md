# UI and enquiry reliability follow-up

The current Vite source was checked against the reported problems. The previous
migration already replaced reveal components with visible static wrappers,
introduced native gallery/profile dialogs and shortened attorney biographies,
removed the old Senior Counsel floating card, simplified the hero and reduced
footer navigation to four key links. Those changes are retained.

This follow-up removes remaining percentage-height dependencies from attorney
cards and uses a normal vertical flex layout for support cards, so card content
determines section height. It compacts the page-banner information cards,
provides more room for introductory copy, retains explicit readable text colours,
adds wrapping for long button/email labels and reinforces the scrolled navbar's
opaque surface and shadow. The homepage partner/email rail has larger labels and
a consistent minimum height.

The frontend's configured API remains independent of the React build. A new
optional PHP service under `server/php` provides `/api/contact` on cPanel without
a Node process. Private configuration is installed outside `public_html`.
Unconfigured or unsupported delivery returns HTTP 503 JSON, invalid enquiries
return 400, excessive enquiries return 429 and provider failure returns 502.
No failed response is treated as a successful enquiry. Tests use a fake sender
and check the real unconfigured PHP HTTP endpoint; they do not send email.

Run `npm run test:contact-backend` for 22 handler/rate-limit checks plus HTTP
checks. Frontend validation remains `npm run lint`, `npm run typecheck`,
`npm test`, `npm run build` and `npm run test:build`.

The published URL and production credentials have not been supplied. No changes
were deployed and actual inbox delivery is not established. Keep frontend
submissions disabled (blank `VITE_CONTACT_API_URL`) until the PHP service or an
alternative backend is configured and a real delivery test passes.

The Browser runtime still has no available browser. DOM tests do not prove visual
layout, contrast as rendered, scrolling behavior or native dialog interactions.
Review the updated site at 360, 768, 1024 and 1440px in a real browser before
release; compare the live assets against the newly built frontend package.
