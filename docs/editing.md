# Editing the website

The website has an editing screen at **`/admin`** (Sveltia CMS: free and open source). Staff sign in, change text or photos in simple forms, and press **Save**. Each save is stored in the project on GitHub, and Cloudflare republishes the site a minute or two later. There's no server or database to look after.

## What you can edit

| Section in the editor | What's in it |
|---|---|
| **Services** | Each service page: photo and its description, an availability note under the title (e.g. while a practitioner is on leave), home page card text, opening line, conditions treated, what to expect, treatments, "good to know" notes, who you'll see, related services, Google title and description |
| **Team** | Each practitioner: direct booking link (for "Book with …" buttons), headshot, status (e.g. "On maternity leave until January 2027"), titles, qualifications, training, experience, bio |
| **News** | Add, edit or delete posts, with photos |
| **Home page** | Headline, intro, main photo, the facts under the headline, "How it works" steps, team intro, the "Our approach" line and its two photos |
| **Pages → Team page** | Team page intro, and the Jeff section: heading, text, photo (also used on Patient information) |
| **Pages → Patient information** | Intro, your first visit, what to bring, fees, rebates and packages, Medicare/DVA/NDIS/WorkCover, privacy summary |
| **Pages → Contact page** | Intro and the note under each way to get in touch |
| **Pages → Services page** | Intro and section intros |
| **Clinic settings → Clinic details** | Phone, email, opening hours, the notice banner (on/off, message, link, an end date), Instagram and Facebook links, ABN, parking, accessibility |
| **Clinic settings → Policies and timetable** | The patient portal link (used by the "Patient portal" buttons), how to start classes, class timetable (one entry per day; each class has a time and who runs it, which sets its colour), cancellation policy, class facts, studio equipment, "before you come to class" tips, booking notes |
| **Clinic settings → What can we help with?** | The groups on the home page and Services page: titles, icons, conditions and which services help |

**Stays with Claude Code:** layout and design, new types of section, colours, the clinic name and address, the booking link (it's tied to a redirect), old-address redirects, the menu and footer links, headings that are part of the layout, the privacy policy (a legal document: owner approves changes), and anything technical.

Empty fields like fees, what to bring or parking show a "TODO" note on the site until they're filled in.

## Rules for every change

- **This is regulated health advertising (AHPRA).** No testimonials or reviews about treatment, no promises of results, no "specialist" or "expert" wording, and no offers without their terms next to them. Titles must match each practitioner's AHPRA registration.
- **Clinical wording** (conditions treated, what a service involves, examination or consent wording) goes past Adrian before it's published.
- **Photos of people** need their consent, and a parent's or guardian's for children. Never upload anything that identifies a patient without it.
- **Fill in the photo description** for every photo. It's read out to people using screen readers.
- **Photo focus:** under each photo, click (or drag) on the part of the photo to keep in view, such as faces. The small previews underneath show exactly how it will be cropped on the site: page header, card, phone. Use the quick picks (Top, Middle, Bottom) or **Reset** to go back to the default. For headshots, the default keeps the top of the photo, so the whole head shows.
- Photos can come straight off a phone. The editor converts them to WebP and scales them down before saving, and the site makes the smaller sizes itself.
- **Text boxes are text only.** Photos go in the photo fields (each service, practitioner and news post has its own), not inside the text.
- **Google titles** are short (about 35 characters, e.g. "Physiotherapy in McDowall"): " | Embrace Movement Clinic" is added after them.
- **Deleting a news post:** if the notice banner links to it, change or remove the banner link first. While there are no posts, News drops out of the menu and footer.
- **If a change doesn't appear** after five minutes, the site check probably stopped it (for example a link to a page that no longer exists). The live site stays as it was. Ask Claude to look at the latest Cloudflare deployment.
- Mistakes are fine: every save is kept in the project history, so anything can be put back. Ask Claude to "restore the version from before my last change".

## Signing in

Open the site's address followed by `/admin/` (with the slash at the end) and click **Sign in with GitHub**. The first time, GitHub asks you to authorise "Embrace Movement Clinic CMS": click **Authorize**. Anyone with write access to the repository can sign in; nobody else can. A sign-in lasts 8 hours and renews by itself; after about 6 months without using the editor, just sign in again.

Until launch, the editor is connected to the **preview** branch (`claude/inspiring-curie-ccksq0`, since 13 Nov 2026), so changes only affect the preview site, not the live Squarespace site. The preview's address is listed in Cloudflare under the Pages project's deployments. Each save is a real change on the preview branch: ask Claude to undo test edits if you don't want to keep them.

## How sign-in is set up (done 13 Nov 2026)

No passwords or secrets are in the project. The pieces, all owned by the clinic:

| Piece | Where | What it does |
|---|---|---|
| GitHub App "Embrace Movement Clinic CMS" | GitHub → `Embrace-Movement-Clinic` organisation → Settings → Developer settings → GitHub Apps | Lets the editor act for the person signed in. Installed on the `embracemovementclinic` repository only. Permissions: Contents and Pull requests read and write |
| Login helper `sveltia-cms-auth` | Cloudflare → Workers & Pages → `sveltia-cms-auth`, at `https://sveltia-cms-auth.twilight-haze-b8a5.workers.dev` | Does the GitHub sign-in for `/admin`. Its settings: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (stored as a Cloudflare secret) and `ALLOWED_DOMAINS` (the sites allowed to use it: `www.embracemovementclinic.com.au`, `embracemovementclinic-7at.pages.dev`, `*.embracemovementclinic-7at.pages.dev`) |
| `base_url` | `site/public/admin/config.yml` | Points the editor at the login helper |

- **New editor:** a free GitHub account, added to the repository with write access. Nothing else to set up.
- **Someone leaves:** remove their access to the repository. To sign everyone out at once: the GitHub App's General page → **Revoke all user tokens**.
- **Client secret lost or leaked:** in the GitHub App, Credentials → make a new client secret, put it in the login helper's `GITHUB_CLIENT_SECRET` in Cloudflare, then delete the old one in GitHub.
- **Site address changes** (a new domain or Pages project): add it to `ALLOWED_DOMAINS` in the login helper's settings, or sign-in from there is refused.

## Launch steps for the editor (one-off)

1. **Point the editor at the live site:** change `branch` in `config.yml` from the preview branch to `main`. The build checks this (`site/scripts/check-cms-branch.mjs`): a build of the live site stops with a clear message if the editor still saves to another branch, so this step can't be missed.
2. Delete the old demo access token on GitHub, if one was made (*Settings → Developer settings → Personal access tokens → Fine-grained tokens*). Done (13 Nov 2026).

**No approval step (owner, 13 Nov 2026):** staff edits go live straight away. Nicole is the only staff editor. If more editors join, consider `publish_mode: editorial_workflow` in `config.yml`, so each change waits as a draft until approved.

## Technical notes (for Claude Code)

- Editor config: `site/public/admin/config.yml`. Validate it against `site/node_modules/@sveltia/cms/schema/sveltia-cms.json` after changes.
- The editor is pinned in `site/package.json` (`@sveltia/cms`), and `scripts/copy-cms.mjs` copies it into `public/admin` before each build. That copy is ignored by Git.
- `site/public/admin/focus-picker.js` is our own add-on: a custom `focus` field type (click-to-focus with crop previews) registered through `CMS.registerFieldType`. It uses the editor's built-in React. Its options in `config.yml` are `image_field` (the photo's key path, e.g. `approach.insetImage`), `shapes` (`{ label, ratio }` crops to preview) and `default_focus` (what the site uses when blank). It saves `x% y%`, which the site uses as `object-position`. If you change a page's crop shape, update that field's `shapes` too. To update, pick a release at least two weeks old, rebuild, and test `/admin`.
- **Keep the editor and the site in step:** when a field changes in `site/src/content.config.ts`, `site/src/data/clinic.json`, `site/src/data/policies.json` or `site/src/content/home/home.md`, update `config.yml` too. The editor leaves out blank optional fields (`omit_empty_optional_fields`), so site code must treat optional values as possibly missing.
- Editable files: `site/src/content/services/*.md`, `site/src/content/team/*.md`, `site/src/content/news/*.md`, `site/src/content/home/home.md`, `site/src/content/pages/*.md` (Team, Patient information, Contact, Services page text), `site/src/data/clinic.json`, `site/src/data/policies.json`, `site/src/data/needs.json`, and photos in `site/src/assets/photos/`.
- Moving the editor between files by typing an address (`#/collections/settings/entries/…` straight to another file in the same section) can show a blank form. Going through the list or the back arrow works.
- **Build checks:** `prebuild` copies the editor and makes share images (`scripts/make-share-images.mjs` → `public/og/`, not in Git); `postbuild` runs `scripts/check-links.mjs`, so a broken internal link, anchor or redirect fails the Cloudflare deploy and the previous version stays live.
- Markdown body fields have `editor_components: []` (no image button): Astro leaves `/src/...` image paths inside Markdown text unresolved, so a body image would 404. Photo fields are fine with either path style.
- A new "What can we help with?" group may have a blank `id`; `src/data/needs.ts` makes one from the title.
- The editor runs only on `/admin` (not indexed; disallowed in `robots.txt`, and `X-Robots-Tag: noindex` in `public/_headers`). It talks to GitHub, and also loads resources and status checks from `unpkg.com`, `cdn.jsdelivr.net` and `githubstatus.com`. Public pages load no third-party scripts.
