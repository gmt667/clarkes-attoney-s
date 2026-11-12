# Source-based design restoration

## Baseline and preservation

Design files were recovered from `a488360` (Update Clarkes Attorneys website
design and content, 2026-10-28). The subsequent `2d03317` changes only ignore
configuration; its app/components/content/assets are identical. These are the
latest substantive pre-migration design files containing `hero-pinterest.tsx`,
the transparent-to-translucent header, cutout Lady Justice, social dock and scenic
footer described in the request. Later agent checkpoints contain the unrelated
editorial design and omit those components and assets. The original migration
archive was made from that later, already altered working tree, so it was not
an adequate reference for this restoration.

All current source, untracked enhancement styles, docs and the served build were
copied to `tmp/source-restoration-20261112-114404` before editing. The earlier
archive remains unchanged. No reset, commit, push, merge or deployment was made.
`design-baseline-assets.json` records SHA-256 hashes for all 42 recovered assets.

## Cause and focused corrections

- The original `tn-hero` markup was replaced by `home-editorial-hero`, and
  `tmp/styles.cjs` stripped original hero declarations. The migration added a
  stacked canvas, 104px top margin and different picture framing. The original
  `HeroPinterest`, homepage sections, cutout image and social dock are restored.
- Global Iowan/Palatino/Avenir overrides changed the entire typography system.
  Those overrides are removed from the active cascade. Original Cinzel,
  Playfair Display and Plus Jakarta Sans declarations and Google Fonts links
  are restored, with their original fallback fonts.
- Original theme/palette values and all site styles are recovered in `site.css`.
  Experimental `home.css` is no longer imported. Original `site-footer.tsx`,
  social icons/navigation URLs, missing local imagery and commemorations are
  restored. Original source content is recovered, including two gallery records
  omitted by the later archive. Existing newer assets were not deleted.
- The React header keeps its keyboard disclosure behavior but restores the
  original Consultation control; original header sizing and scroll backgrounds
  come from the recovered CSS. Light mode is again the default unless saved.
- Native images, React Router, SEO, profile/gallery dialogs, accessible labels,
  contact feedback and independent backend remain. Visible wrappers replace
  reveal opacity so content cannot disappear when an observer misses a section.
  Percentage-height dependencies on attorney cards remain removed. Reduced-motion
  and keyboard focus/touch-target rules remain in functional enhancement styles.

## Heading-only refinement

The recovered component reads “SOLVING LEGAL MATTERS WITH CONFIDENCE.” The exact
longer wording explicitly supplied in the user's request is used for the heading:
“SOLVING COMPLEX LEGAL CHALLENGES WITH CONFIDENCE”. No other hero wording changes.
The original font, stage, image placement, buttons and social dock remain.
Copy max-width increases from 530px to 570px; only the heading is centred and
uses balanced wrapping. “LEGAL CHALLENGES” uses the original gold-hover shade,
with the original dark-theme accent retained. No alternative font is introduced.
Exact live heading punctuation/wording cannot be independently established.

## Verification and limits

Run lint, strict typecheck, frontend tests, build and artifact checks. The artifact
check now verifies both the original migration archive and recovered design
assets. Production preview must be restarted after building; compare its HTML
and hashed asset references to the new `dist`.

Actual checks: lint and strict typecheck passed; all 41 frontend tests passed,
including navigation, all articles, team profiles, gallery dialogs, themes,
contact states and DOM interaction checks at 360/768/1024/1440. Production build
passed. Artifact checks passed for 14 direct URLs, 47 build files, the preserved
archive and all recovered design assets. Local HTTP checks confirm that all 11
public page/article URLs and current hashed CSS/JS are served from this project's
new `dist`. The preview was restarted on `http://localhost:4173/`.

The live URL could not be retrieved by the web tool, and browser access remains
unavailable. This is a restoration against recoverable source, not a claim of a
pixel-perfect or visually verified match to production. External Google font
delivery and native browser layout/overlap at 390/768/1440 remain unverified.
The contact fallback remains active until a real API is configured; no live
email delivery or production changes are implied.
