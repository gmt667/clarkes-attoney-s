# Clarkes Attorneys: Next.js to Vite migration

Repository: https://github.com/gmt667/clarkes-attoney-s

Work is isolated on `migration/vite-react`. Existing uncommitted work was
preserved before conversion, including the recent UI and enquiry handling fixes.

## Before conversion

The App Router used `app/page.tsx` and eight public sections, with dynamic
`app/blog/[slug]/page.tsx`, an `/attorneys` redirect, `/api/contact`, and an
embedded `/studio/[[...index]]`. Shared components lived in `components/`;
`lib/site-content.ts` supplied the official bundled content, `lib/cms.ts` used
React server caching and optional Sanity fetching, and `lib/prisma.ts` initialized
PostgreSQL storage. `next.config.mjs` contained redirects, image allowlists and a
React compatibility alias. Styling lived in one global stylesheet.

Original runtime dependencies included Next, React, React DOM, Framer Motion,
Lucide, Sanity/Studio/Vision/image URL tooling, Prisma/PostgreSQL, Resend and Zod.
The original lint script (`next lint`) was not applicable to the installed Next
version. There were no frontend route or browser regression tests.

`nextjs-inventory.json` records the original Git commit, complete dependency
manifest and SHA-256 hashes of 86 source/configuration/asset files. The archive at
`legacy/nextjs/` contains those files byte for byte, including the old package
lock, backend route, database schema and Studio. It is outside the frontend build.
To run that version independently, change into that directory, run `npm ci`,
configure its server environment, and use its original commands. Never upload the
archive to `public_html`.

## Route conversion

| Public URL | New page module | Retained behavior |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | Firm introduction, practice highlights, contact actions |
| `/about` | `src/pages/About.tsx` | History, mission, vision, goal, values |
| `/practice-areas` | `src/pages/PracticeAreas.tsx` | All six original practice areas and services |
| `/our-team` | `src/pages/OurTeam.tsx` | Three attorneys/consultants, three support staff, profiles, email links |
| `/experience` | `src/pages/Experience.tsx` | Original client portfolio and sector highlights |
| `/gallery` | `src/pages/Gallery.tsx` | All 17 original images with labelled lightboxes |
| `/blog` | `src/pages/Blog.tsx` | Three existing article previews |
| `/blog/how-to-choose-the-right-legal-structure` | `src/pages/BlogPost.tsx` | Full original article |
| `/blog/why-documentation-wins-disputes` | `src/pages/BlogPost.tsx` | Full original article |
| `/blog/protecting-brand-identity` | `src/pages/BlogPost.tsx` | Full original article |
| `/contact` | `src/pages/Contact.tsx` | Firm details, social channels, enquiry form/fallback |

All 12 legacy redirect aliases are retained using React Router `Navigate`.
Unknown pages and article slugs show the existing branded not-found page.
`/studio` is deliberately outside the public application and shows not-found;
staff publishing belongs in a separately hosted Sanity Studio.

## Retained, replaced and removed

- Retained: official logos, original local asset bytes, all people, biographies,
  emails, telephone numbers, practice content, values, client descriptions,
  gallery records and blog text; light/dark themes, card layouts and responsive
  breakpoints; keyboard-operable profile and gallery dialogs.
- Image repair: both original CHRR and Supersink/Twitter logo URLs were checked
  and returned HTTP 404. Their existing named CHRR/SP badge fallbacks are used
  directly. HRDC uses its original local logo sheet; AKWA uses its original
  local logo asset. No remote image request or invented replacement logo is
  needed. All original client records and source URLs remain in the content data.
- Replaced: App Router with React Router; `next/link` with `Link`/`NavLink`;
  `next/image` with native `ResponsiveImage`; server metadata with React 19 head
  elements; page shells with one semantic shared layout; Node startup with static
  `dist` hosting; the in-app fetch implementation with a central contact service.
- Removed from the active frontend: Next APIs/imports, server components, React
  server `cache`, Prisma/PostgreSQL, Resend, Sanity Studio and read-token fetching,
  the React shim and Framer Motion. The visible content no longer depends on an
  intersection observer or animation state. Dependencies remain available only
  in the preserved Next.js archive for independent backend/Studio extraction.
- Environment: no `NEXT_PUBLIC_*` variables remain in the frontend. The browser
  accepts only `VITE_CONTACT_API_URL` and optional `VITE_SITE_URL`. The former
  server-backed Sanity integration is replaced with the preserved content
  snapshot; CMS publishing/export and secret tokens belong in a separate tool.
- CSS: the original cascade is split between shared site styles and homepage
  styles. Obsolete hero declarations were removed before adding the revised
  composition. Accessibility rules are separate; the stylesheet is not copied
  across pages. Existing inactive legacy selectors can be retired gradually
  without risking the preserved responsive styling.

## Hero comparison

| Aspect | Original working checkout | Migrated hero |
| --- | --- | --- |
| Heading | “Legal matters, handled with clarity.” in a narrow left column | Requested “SOLVING COMPLEX LEGAL CHALLENGES WITH CONFIDENCE” |
| Alignment | Left-aligned text beside the photograph | Centered copy across the hero's width, maximum 1080px panel and 960px heading |
| Line breaks | Compressed in the side column | Three phrase-based lines: “Solving complex” / “legal challenges” / “with confidence” |
| Type | Condensed/system sans heading | Editorial Iowan/Palatino/Georgia serif with Avenir/Segoe UI sans body and controls |
| Colour | Charcoal heading and grey continuation | Navy/high-contrast light primary text; one warm gold accent phrase |
| Photograph | Side-by-side portrait with floating establishment card | Same Lady Justice image in a dedicated full-width image region below copy |
| Interaction | Two actions and partner/email rail | Same actions and rail; centred controls, no text/image collision |

The heading never sits directly on the photograph, so no heavy overlay or text
shadow is required. Its responsive font size and phrase spans avoid a forced
single-word final line. System font stacks avoid external font requests and keep
deployment self-contained; the exact serif varies by operating system.

## Validation and remaining limits

See `VALIDATION.md` for executed commands, coverage and explicit limits.
The migration does not claim that an API acceptance response proves email inbox
delivery, or that DOM tests prove pixel layout. No production deployment or Git
push is implied by the local build.

Framework references used: [Vite static deployment](https://vite.dev/guide/static-deploy.html),
[React Router](https://reactrouter.com/start/declarative/installation),
[React 19 title management](https://react.dev/reference/react-dom/components/title).
