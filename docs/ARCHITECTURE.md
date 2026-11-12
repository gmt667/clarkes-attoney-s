# Frontend architecture

`src/main.tsx` mounts React, the theme provider and BrowserRouter. `AppRoutes`
owns route definitions and legacy aliases. `SiteLayout` supplies one header,
one main landmark, footer, metadata, skip link and navigation focus/scroll logic.

| Directory | Responsibility |
| --- | --- |
| `src/pages` | Route-specific presentation |
| `src/layouts` | Shared semantic page structure |
| `src/routes` | React Router route table and aliases |
| `src/components` | Header, footer, home hero, page banner, button, cards, form, images, dialogs, social icons |
| `src/content` | Preserved, typed official content |
| `src/config` | Navigation, safe public environment parsing, page SEO descriptions |
| `src/services` | External contact API adapter; no server SDKs |
| `src/types` | Contact request/response contracts |
| `src/styles` | Site, homepage and accessibility styles |
| `src/test` | DOM, routing, form and interaction regression tests |
| `public` | Unchanged assets and Apache fallback, copied into `dist` |
| `scripts` | Production artifact and static fallback validation |
| `legacy/nextjs` | Independent preserved original, excluded from build and root TypeScript/lint |

Contact state stays in the form; transport and response handling stay in the
service. Blank/invalid API configuration produces direct email and phone options
without requests. An optional backend must implement the documented JSON
contract. Static content loads immediately without a CMS dependency.

Native dialogs provide modal semantics, Escape handling, focus containment and
restoration. Menu navigation is a nonmodal disclosure with `aria-expanded`,
Escape support and ordinary tab navigation. Active links have an indicator in
addition to colour. Essential content is always visible; CSS interaction effects
respect reduced-motion settings. Internal links use absolute paths so nested
route refreshes resolve assets correctly at the domain root.

SEO uses React 19 `<title>`, `<meta>` and optional canonical links. This is a
client-rendered SPA: bots that do not execute JavaScript see the entry HTML and
the no-script contact fallback, not pre-rendered page-specific content. Static
hosting also returns the SPA entry for unknown clean URLs; the client shows the
branded not-found screen and adds `noindex`. Server HTTP 404 semantics for unknown
pages or pre-rendered social previews would require a separate static publishing
step, not a continuously running Node server.
