# Static deployment

The active website is Vite/React. Build with `npm ci` and `npm run build`, then
upload the contents of `dist/`, including `.htaccess`, into cPanel `public_html`.
No Node.js process is required by the deployed frontend.

See [README.md](README.md) for setup and Apache troubleshooting,
[docs/BACKEND_SERVICES.md](docs/BACKEND_SERVICES.md) for the independent enquiry
service and secret handling, and [docs/VALIDATION.md](docs/VALIDATION.md) for
executed checks and remaining release verification.

The original Next.js deployment instructions remain preserved with that
application under `legacy/nextjs/DEPLOYMENT.md`.
