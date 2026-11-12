# Migration validation

Executed locally on the `migration/vite-react` branch.

| Check | Result and scope |
| --- | --- |
| Dependency installation | Completed; active package uses React, React DOM, React Router and Lucide. Server/Studio/animation dependencies are outside the frontend. |
| `npm run lint` | Passed with no errors or warnings. |
| `npm run typecheck` | Passed with strict TypeScript settings. |
| `npm test` | 41 passing tests: required page/article routes, all 12 aliases, unknown routes, navigation, team profiles, all gallery lightboxes, theme/menu keyboard behavior, and contact states. |
| `npm run build` | Passed; Vite emits a static `dist` containing HTML, CSS, JavaScript, assets and hidden `.htaccess`. No CSS syntax warnings remain. |
| `npm run test:build` | Passed: 14 direct URL requests, all 41 build files, archive/asset hashes, CSS asset paths, no server configuration names in bundles, missing assets/API remain 404. |
| Local images and links | Every rendered image has descriptive alt text and an existing local public asset. Internal links resolve to known routes/aliases. Original local assets match their pre-migration hashes. |
| External logo check | CHRR and Supersink/Twitter URLs returned HTTP 404; existing named badges replace broken requests. HRDC and AKWA use original local artwork. |
| DOM console | Required page rendering tests assert no React console errors. This does not prove the absence of browser-only errors. |
| Width settings | Menu, route, theme and keyboard interactions pass with `window.innerWidth` set to 360, 768, 1024 and 1440. These are DOM tests, not rendered-layout measurements. |
| Source preservation | SHA-256 checks pass for all 86 original files in `legacy/nextjs`. |
| Optional PHP backend | 22 synthetic handler/rate-limit checks and local HTTP checks pass; unconfigured `/api/contact` returns JSON 503, invalid JSON fields return 400, unsupported methods return 405 and non-JSON POST returns 415. No email was sent. |

## Checks that could not be executed here

The connected Browser runtime reports no available browser. Consequently,
real-browser screenshots, visual inspection, bounding-box overlap/overflow
measurements, browser network/console monitoring and native dialog behavior at
360/768/1024/1440 could not be verified. jsdom does not implement a layout engine;
dialog methods are simulated in interaction tests. The hero comparison is written
in `MIGRATION_REPORT.md` instead of presenting unverified screenshots.

The supplied Apache rules are checked in the artifact and exercised with a local
equivalent fallback server. A real Apache/cPanel server is not available locally;
confirm `mod_rewrite`, allowed overrides, hidden-file upload and direct page
refreshes on the actual host. The production site has not been deployed.

No contact backend URL or email credentials were supplied. Fallback behavior and
API failure/success contracts are tested with simulated responses; no email was
sent and production inbox delivery is not verified. Follow the independent
service instructions before enabling submissions.

Before release, use a real browser at the four requested widths to inspect hero
line breaks and image crop, navbar readability, horizontal overflow, footer,
gallery enlargement, profile focus/Escape behavior and the contact workflow.
