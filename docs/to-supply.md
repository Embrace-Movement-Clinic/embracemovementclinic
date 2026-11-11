# Items to supply

## Screenshots

The redesign doesn't copy the old layout, so only a few more are needed, mainly for content the export missed.

- [x] homepage (desktop)
- [x] team (desktop, top of page)
- [x] ~~Footer screenshot~~: not needed (site rebuilt; footer details supplied on /admin)
- [x] ~~Our Services screenshot~~: not needed
- [x] ~~Service page and Book Now screenshots~~: not needed
- [x] ~~Team page screenshot~~: not needed
- [x] ~~Squarespace Pages panel~~: not needed (old addresses redirect)

Save them in `reference/screenshots/` as `<page-folder>-desktop.png` (folder names are in `reference/INVENTORY.md`).

Tick items off as they arrive. Brand files go in `assets/brand/`; screenshots go in `reference/screenshots/`.

**Never put passwords or logins in this repo.** Keep them in a password manager.

## Brand assets

- [x] Logo: colour circle (500px transparent PNG) and black wordmark (1500px PNG), received 12 Oct 2026 and saved in `assets/brand/`. Favicons and a white footer wordmark were made from them.
- [x] Logo as SVG: traced from the black wordmark (`assets/brand/logo-wordmark.svg`). An original vector file from whoever designed it would still be ideal, if one exists.
- [x] **Colour palette:** Petrol + Teal (petrol chosen 19 Oct 2026; accent changed from coral to teal on 20 Oct). `/palette` stays for trying other combinations later.
- [x] Font choice: Red Hat Display + Red Hat Text (open licence, self-hosted)
- [x] Clinic, team and treatment photos: 16 received on 19 Oct 2026. 13 are on the site (`site/src/assets/photos/`): headshots, the team photo with Jeff, the home page and every service page. More can be added on /admin.
- [x] **Guardian consent for the two photos of children**: given (owner, 7 Nov 2026). The photos (`PXL_20220610_235914156`, `PXL_20220611_052505665`) can now be used
- [ ] **Photo of the front of the clinic** (or the driveway and parking). Optional now: Home and Contact show a street map, but a photo of the entrance would still help on Contact
- [x] ~~Two photos of baby Imogen~~: not needed, the July 2026 update was deleted (7 Nov 2026). (`DSC_6425.JPG` and `DSC_6872.JPG` on the old site), if you'd like them kept
- [x] Photo permissions confirmed for everyone pictured, including children (owner, 7 Nov 2026)
- [x] Check the alt text (the description read out by screen readers) for each photo (checked 7 Nov 2026). They're listed in `docs/changes.md` under "Photos".

## Content

Many of these can now be filled in directly on the website editor (`/admin`): opening hours, parking and accessibility (Clinic details), fees, what to bring, Medicare/DVA/NDIS/WorkCover (Pages → Patient information), the class timetable (Policies and timetable), and the Instagram, Facebook and ABN details. See `docs/editing.md`.

- [x] AHPRA registration numbers: not shown on the site for now (owner, 7 Nov 2026). Optional field on /admin if wanted later
- [x] Instagram: https://www.instagram.com/embrace_movement_clinic/ (7 Nov 2026)
- [x] Facebook: https://www.facebook.com/embracemovementclinic/ (7 Nov 2026)
- [x] New content: added through 7 Nov 2026; anything further can be added on /admin
- [x] Services, fees and funding: from Nookal, confirmed with Nicole (7 Nov 2026)
- [x] **Opening hours**: entered on /admin (Mon 6am – 1pm; Tue 7am – 11am, 1pm – 8pm; Wed 6am – 7.30am, 4.30pm – 8pm; Thu 8am – 4pm; Fri closed; Sat closed (occasional appointments on request); Sun closed)
- [x] **ABN**: 57 627 072 057, entered on /admin
- [x] **Parking**: entered on /admin (driveway, or free street parking on Brynner or Bassey Street)
- [x] **Reopening date**: Monday 4 January 2027 (Nicole, 7 Nov 2026). The banner and closure notes hide after 3 January. Previously: so the closure banner can hide itself automatically (on /admin: Clinic settings → Clinic details → Notice banner → Hide automatically after)
- [x] **Class timetable**: from Nookal's week of 4 January 2027 (Monday to Thursday, all with Nicole), added 7 Nov 2026. Keep it in step with Nookal on /admin: Clinic settings → Policies and timetable
- [x] **Which practitioner provides which service:** Nookal is right; Laura isn't seeing pelvic health clients for now (Nicole, 7 Nov 2026). Previously: Nookal (6 Nov 2026) matches the site except Pelvic Health: bookable online with Nicole only, while the site lists Nicole and Laura. Confirm which is right
- [x] **Privacy contact**: the clinic's email and phone (no named person), as approved 7 Nov 2026
- [x] Google Forms: no longer linked (the June 2025 update was deleted on 7 Nov 2026)
- [x] ~~Pages not linked from the menu~~: not needed (old addresses redirect)
- [x] Privacy policy (approved 7 Nov 2026) and cancellation policy (8 hours' notice or full price)
- [x] **Fees**: taken from the Nookal booking page on 6 Nov 2026 (15 prices, GST included where it applies). Keep the site and Nookal in step: on /admin, Pages → Patient information → Fees
- [x] **Class packages:** 10-class pack $380, 20-class pack $700, bought in the clinic (Nicole, 7 Nov 2026). On Patient information
- [x] **Funding:** Nookal's appointment descriptions say private health, Medicare, DVA, NDIS and WorkCover are welcome, and out-of-pocket costs vary by payer. Now on Patient information; Nicole to confirm the wording
- [x] **What to bring**: comfortable clothing; relevant health information such as referrals or scans; private health insurance and Medicare cards (owner, 7 Nov 2026)
- [x] **Accessibility**: not shown on the site (owner's call, 7 Nov 2026). The field stays on /admin if wanted later
- [x] **Class facts:** 4–5 people and 45 minutes (Nookal); cancellation is at least 8 hours' notice or the full cost is charged (Nicole, 7 Nov 2026). Confirm it covers one-on-one appointments too
- [x] **Grip socks:** available to buy in the clinic; no price on the site (Nicole, 7 Nov 2026)
- [x] A photo of Jeff, the clinic dog (the team photo with Laura and Nicole)
- [x] **Privacy policy**: reviewed and approved by Nicole (7 Nov 2026). AI note-taking line added; OAIC paragraph removed at her request. All information is stored within Australia (owner, 7 Nov 2026)
- [x] Wording changes approved by Nicole (7 Nov 2026)

- [ ] **Nookal: exercise therapy with Nicole.** The site now says exercise therapy (claimable as physiotherapy) is available with Nicole as well as Laura, but Nicole's online booking only lists exercise physiology sessions (checked 8 Nov 2026). Add 30- and 45-minute exercise therapy sessions to Nicole in Nookal (GST-free, like Laura's), or tell Claude if her prices differ from $95 and $125

## Access (confirm who has it; don't store it here)

- [ ] Before cancelling Squarespace: export a copy of the old site's content as a backup
- [x] Domain registrar / DNS: Crazy Domains (Web Address Registration), Premium DNS. Nicole's account; clean-up notes in `docs/domain-and-email-cleanup.md`
- [x] Google Workspace (the clinic's email) is billed directly by Google, not through Squarespace (checked 7 Nov 2026), so cancelling Squarespace doesn't affect email
- [ ] Free GitHub accounts for anyone who'll use the admin page (e.g. Nicole)
- [ ] For the admin demo: a GitHub fine-grained access token (Adrian makes it; never stored in the project). See `docs/editing.md`
- [ ] At launch: a GitHub OAuth app and the free Cloudflare login helper for "Sign in with GitHub" (Adrian, with Claude's help)
- [x] Nookal online booking URL (supplied 19 Oct 2026; test a booking from the preview site before launch)
- [ ] Google Business Profile (to update the website link and check the details match)
- [ ] Analytics / Search Console
- [x] Clinic-owned Cloudflare account created (8 Nov 2026). Pages project created on 11 Nov 2026, connected to the clinic's GitHub repository (production branch `main`, root directory `site`, build command `npm run build`, output directory `dist`). It must be a Pages project, not a Worker: the Worker set-up has no output directory setting. Builds of `main` fail until the site is merged into it; other branches build as previews. Still to do in the account: Web Analytics, Adrian as a member, and the login helper for /admin
- [x] Clinic-owned GitHub organisation `Embrace-Movement-Clinic`; repository transferred there (8 Nov 2026)
