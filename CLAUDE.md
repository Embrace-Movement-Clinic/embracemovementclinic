# Embrace Movement Clinic — website rebuild

Brief for Claude Code. Read this file in full before doing any work in this repo.

## Goal

Rebuild https://www.embracemovementclinic.com.au/ as a new site that:

- keeps all current content, services and contact details (unless `docs/changes.md` says otherwise)
- keeps existing page URLs, or adds 301 redirects for any that change
- is fast, mobile-first and accessible (WCAG 2.2 AA)
- needs minimal ongoing maintenance

## Repo layout

| Folder | What's in it |
|---|---|
| `reference/` | Snapshot of the current site. **Source of truth for existing content.** Start with `reference/INVENTORY.md`. Each page has `pages/<slug>/` containing `content.md` (text in page order, with section markers), `meta.json` (structure, images, links, embeds) and `export.html` (raw Squarespace markup). Screenshots go in `reference/screenshots/` as `<slug>-desktop.png` and are the **source of truth for look and layout**. `images.json` lists all images with full-resolution URLs. If the live-site capture script has been run, pages also have `desktop.png`, `mobile.png` and `page.html`, and there's a site-wide `styles.json`. |
| `source/` | Original Squarespace XML export (12 Oct 2026) |
| `assets/brand/` | Original brand files supplied by the owner (logo, photos, fonts). Prefer these over images in `reference/images/`. |
| `docs/` | `decisions.md` (stack, hosting, editing), `functionality.md` (what must work), `changes.md` (what to change vs keep), `to-supply.md` (outstanding items) |
| `capture/` | `convert_squarespace_export.py` (export → `reference/`) and `capture.mjs` (live-site capture, needs a non-locked-down PC). Don't edit unless asked. |
| `site/` | The new website. All build work happens here. |

## Known gaps in `reference/`

The Squarespace export doesn't include:
- header, navigation or footer
- button labels and links
- code blocks
- map settings
- fonts and colours

Use the screenshots for these. Where a screenshot is missing, leave a `TODO:` rather than guessing.

## Design direction (full redesign)

**Feel**
- Modern, warm, calm and confident: a premium boutique clinic, not a template.
- Photography-led, with generous white space.

**Brand to keep**
- Logo: the plain "embrace / MOVEMENT CLINIC" wordmark (`assets/brand/logo-wordmark.svg`). The owner dropped the teal brush-stroke circle on 12 Oct 2026, so don't reintroduce it.
- Tagline: "Accept . Support . Challenge ."
- Recurring brand detail: page headers end in a gentle curve (`.curve-bottom` in `site/src/styles/global.css`). Keep sections uncluttered: one card style, plain lists rather than pill tags, no boxes around simple lists, and no label above a heading that repeats it.

**Palette**
- **Petrol + Teal.** The owner chose petrol on 19 Oct 2026 and changed the accent from coral to teal on 20 Oct 2026. A logo-based palette: logo teal `#3AB593` on the logo and as the decorative accent, with teal 600 `#179677` for icons and highlights; petrol `#083D42` on buttons, links and dark sections; light teal `#90DBC1` for text and buttons on petrol; pale teal `#EEFAF5` for the notice banner and chips; a cool mist `#F2F8F8` for alternate backgrounds. Teal is only ever paired with petrol, never with a dark green.
- Forest (`#1E3A2F`, sage, bone) was dropped on 18 Oct 2026 as too close to a local competitor (dark green `#003721`, `#006838` buttons, bone `#FAF8F2`, lime/pear greens). Don't use dark greens, sage or bone.
- Palette values live in `site/src/data/palette.ts` (`sitePalette` picks the combination); `site/src/styles/tokens.css` documents the semantic tokens and holds the non-colour tokens. Components use the semantic `--color-*` tokens only. `/styleguide` shows the palette and its contrast checks.
- Keep `/palette` (the picker): the owner may want to try other combinations later. It's not indexed or in the sitemap. Since 10 Nov 2026 the design tools (`/palette` with its site-wide `?palette=` preview, and `/styleguide`) live in `site/src/design/` and are built locally and on preview deployments only, not into the live site, so a visitor can't be sent a link that shows the clinic's site in other colours. Set `DESIGN_TOOLS=1` on the production build to publish them there too (`site/astro.config.mjs`).
- Check all text and button colour combinations for AA contrast.

**Type**
- Red Hat Display (headings) + Red Hat Text (body), self-hosted, with no Google Fonts call at runtime. Chosen by the owner on 12 Oct 2026.

**Must-haves**
- A persistent "Book now" call to action (Nookal) in the header and on every service page. It links straight to the Nookal booking page (`booking.url` in `site/src/data/site.ts`); `/book-now` redirects there.
- Click-to-call on mobile.
- Service pages with a consistent structure: who it's for, conditions treated, what to expect, book.
- Team cards with a modal or detail page for each practitioner.
- A clear location and parking section.
- A footer with hours, address, phone, email, socials and the privacy policy link.

**Information architecture**
- Redesigned from first principles on 18 Oct 2026. Read `docs/site-strategy.md` before changing structure.
- Menu: Services (dropdown, grouped into one-on-one and classes) · Classes · Team · Patient info · Contact · Book now.

**Performance target**
- Lighthouse 95+ on mobile for Performance, Accessibility, Best Practices and SEO.

## How to work

1. Read `docs/decisions.md`. If the stack is still marked "recommended — confirm", confirm it with the owner in plan mode before building.
2. Use plan mode first. Propose the page list, the components and the content model, then wait for approval.
3. Build one page at a time. After each page, compare it with its screenshot in `reference/screenshots/` and list the differences.
4. Keep every fact from `content.md`. You may tighten wording, add headings or restructure copy to suit the new design. Log each wording change to clinical copy (what a service involves, conditions treated, the examination or consent wording) in `docs/changes.md` for owner approval before launch.
5. Never invent facts: practitioners, qualifications, services, prices, fees, rebates, opening hours, addresses or phone numbers. If something is missing, leave a visible `TODO:` and add it to `docs/to-supply.md`.
6. Write in Australian English.
7. Staff edit content on `/admin` (Sveltia CMS; see `docs/editing.md`). Page text staff might change belongs in an editable file, not in page code: `site/src/content/**` (including `home/home.md` and `pages/*.md`) or `site/src/data/{clinic,policies,needs}.json`. When you add or change one of these fields, update `site/public/admin/config.yml` to match and validate it. The editor leaves out blank optional fields, so treat optional values as possibly missing.

## Health advertising and privacy rules (non-negotiable)

This is a registered health practice, so the site is regulated health advertising.

- **AHPRA / National Law s133.** No testimonials or reviews about clinical aspects of care. No misleading claims, guarantees of outcomes, or wording that creates unreasonable expectations of benefit. No offers or gifts without clear terms. Practitioner titles and qualifications must match their AHPRA registration.
- If any current content looks non-compliant (for example patient testimonials about treatment results), **flag it in `docs/changes.md` rather than copying it**.
- **Privacy Act 1988 (Australian Privacy Principles).** Health service providers are covered regardless of turnover. The site needs a privacy policy and a privacy collection notice on any form. Forms must not ask for clinical details unless there's a clear need; booking happens in the practice management system.
- The cookie and analytics setup must match what the privacy policy says.

## Technical defaults (unless decisions.md overrides)

- Static output, no server to maintain
- Semantic HTML, a single shared layout, responsive images (`srcset`, WebP/AVIF), lazy loading below the fold
- Unique `<title>` and meta description per page (start from `meta.json`), plus Open Graph tags, `sitemap.xml`, `robots.txt` and LocalBusiness / MedicalBusiness structured data
- A redirect map (`site/redirects` or the host's equivalent) for every old URL in `reference/inventory.json` that changes
- No new third-party scripts without approval

## Never

- Change anything about the domain's DNS or email (MX) records
- Commit passwords, API keys or account logins
- Deploy to production without explicit approval
