# Optional cPanel enquiry backend

This is a separate PHP 8.2+ service. The React `dist` remains static and requires
no Node.js process. PHP must be enabled by the cPanel host, with cURL, JSON and
outbound HTTPS access to Resend. No Composer packages or database are required.

Deploy this layout in the cPanel account's home directory:

```text
/home/ACCOUNT/
  clarkes-private/
    contact-service.php
    contact-config.php
  public_html/
    ...contents of the frontend dist...
    api/
      .htaccess
      contact.php
```

1. Upload `clarkes-private/contact-service.php` outside `public_html`. Copy
   `contact-config.example.php` there as `contact-config.php` and set the real
   Resend key and verified sender. Do not put this configuration in React or in a
   `VITE_` variable. Keep the private directory restricted to the hosting account
   (typically directory mode 700 and configuration mode 600).
2. Upload the two files from `public_html/api/` into `public_html/api/`, including
   hidden `.htaccess`. The frontend's root `.htaccess` already excludes `/api`.
   Apache rewrites `/api/contact` to the PHP script. `/api/contact.php` can also
   be used if the host cannot enable the per-directory rewrite.
3. Make the private directory writable by the account's PHP process. The service
   creates `rate-limits.json` there, storing only hashed peer identifiers and
   counters. It limits each peer to five accepted attempts per 15 minutes with a
   file lock. Behind a proxy/CDN, configure trusted remote-IP restoration in the
   web server; the script deliberately ignores untrusted forwarding headers.
4. Open `/api/contact`. It must return JSON with HTTP 200 and `ok: true`; HTTP 503
   means configuration or PHP transport is unavailable. This checks readiness,
   not email inbox delivery. It should never show the React not-found page.
5. Set `VITE_CONTACT_API_URL=/api/contact` in the frontend `.env.local`, rebuild,
   and upload the new `dist` contents. Keep the value blank until the backend is
   ready; the frontend then offers direct email and phone options instead.
6. Submit one clearly labelled test enquiry and verify delivery at both
   `info@clarkesattorneys.mw` and `geoffrey@clarkesattorneys.mw`. Confirm Reply
   targets the client's email. Check Resend's delivery event as well as the form
   response. Never treat a successful API response alone as proof of receipt.

The service uses plain-text email, server-side validation, a honeypot, body/field
limits and rate limiting. Failures return JSON and never report false success.
It is intended for a same-origin frontend; it does not enable cross-origin CORS.
The optional Resend/PostgreSQL Next.js implementation is still preserved in
`legacy/nextjs`, but it is not part of this PHP service.

Local verification (no email is sent):

```sh
npm run test:contact-backend
```

Tests exercise the actual PHP handler with a fake delivery function and the
unconfigured HTTP endpoint. The real outbound cURL call requires configured
hosting and a live delivery test. Reference:
[Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).
