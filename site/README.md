# New site (Astro)

Static site for Embrace Movement Clinic. See `../CLAUDE.md` for the brief and `../docs/` for decisions.

## Run it

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm run preview    # serves dist/
```

Needs Node 22.12 or later.

## Where things live

| What | Where |
|---|---|
| Clinic details | `src/data/clinic.json` (phone, email, hours, notice banner, socials, ABN; editable on `/admin`) read by `src/data/site.ts` (name, address, booking link) |
| Website editor for staff | `/admin` (Sveltia CMS): `public/admin/config.yml`. Guide: `../docs/editing.md` |
| Home page text and photos | `src/content/home/home.md` (editable on `/admin`) |
| Team, Patient information, Contact and Services page text | `src/content/pages/*.md` (editable on `/admin`) |
| Services, practitioners and news (one Markdown file each) | `src/content/services/`, `src/content/team/`, `src/content/news/` (schema in `src/content.config.ts`) |
| "What can we help with?" groups | `src/data/needs.json` (editable on `/admin`) read by `src/data/needs.ts` |
| Cancellation policy, class facts, equipment, studio rules, timetable | `src/data/policies.json` (editable on `/admin`) read by `src/data/policies.ts` |
| Old URL redirects | `public/_redirects` |
| Menu and footer links | `src/data/navigation.ts` |
| Colours (Petrol + Teal) | `src/data/palette.ts`: change `sitePalette` to switch combination; preview the options on `/palette` (not indexed) |
| Type sizes, font weights, spacing, breakpoints, what each colour token is for | `src/styles/tokens.css` |
| Shared building blocks (icon badge, icon tile, icon list, panel, status pill, arrow link, hover effects) | `src/styles/components.css`, with `IconBadge`, `IconTile`, `SectionHead`, `PhotoCard`, `Note`, `OnPageNav`, `Link` and `EmailAddress` in `src/components/`. Use these rather than writing a new version in a page. |
| Home page map | `src/assets/maps/clinic-map.png`, made once by `scripts/make-location-map.mjs` from OpenStreetMap (rerun only if the address or look changes) |
| Online booking link | `booking.url` in `src/data/site.ts`, plus the `/book-now` line in `public/_redirects` (the link checker flags them if they differ) |
| Photos | `src/assets/photos/`. A service sets `image`, `imageAlt` and (optionally) `imagePosition` in its Markdown file; a practitioner sets `photo`; a news post lists `images`; home page photos are set in `src/content/home/home.md` (editable on /admin). `imagePosition` / `position` picks which part of the photo is kept when it's cropped, e.g. `'50% 30%'`. The build makes the AVIF/WebP sizes. Placements and alt text are logged in `docs/changes.md`. |
| Wordmark (SVG, takes the text colour) | `src/assets/brand/wordmark.svg` via `src/components/Wordmark.astro` (originals in `../assets/brand/`) |
| Fonts | `astro.config.mjs` (`fonts`), self-hosted from `@fontsource-variable/*` |
| Page shell (head, header, footer) | `src/layouts/BaseLayout.astro` |
| Style tile (palette, contrast checks, type, components) | `/styleguide` (not indexed) |

## Checks

```bash
npm run build && npm run preview
node scripts/a11y.mjs http://127.0.0.1:4321 /styleguide        # axe-core, WCAG 2.2 AA
node scripts/screenshot.mjs http://127.0.0.1:4321 <outDir> /    # desktop and mobile screenshots
node scripts/lighthouse.mjs http://127.0.0.1:4321 /             # Lighthouse mobile, target 95+
node scripts/check-links.mjs                                    # internal links, anchors and redirects
npx astro check                                                 # types
```

## Hosting (Cloudflare Pages)

Root directory `site`, build command `npm run build`, output directory `dist`. Pages are built as `/<page>.html` and served without a trailing slash, which matches the old Squarespace URLs. Don't deploy to production without explicit approval.
