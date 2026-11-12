# Changes from the current site

Anything not listed here stays as it is on the current site.

## URL clean-up (decided 12 Oct 2026: clean URLs with 301 redirects)

| Current URL | Content | Suggested new URL | Decision |
|---|---|---|---|
| /homepage | Home | / | **Change** (301) |
| /old-services | "Our Services" overview of all services | /services | **Change** (301) |
| /physiotherapy | Musculoskeletal Physiotherapy | keep | **Keep** |
| /exercise-physiology | Exercise Physiology | keep | **Keep** |
| /pilates | Pilates & Small Group Classes | keep | **Keep** |
| /womens-health-physio | Pelvic Floor Physiotherapy | /pelvic-health-physiotherapy | **Change** (301) |
| /pilates-1 | **Vestibular** Physiotherapy (the slug doesn't match the content) | /vestibular-physiotherapy | **Change** (301) |
| /team | Meet The Team | keep, plus /team/nicole-saxby and /team/laura-bradford | **Keep** |
| /contact-us-1 | Contact | /contact | **Change** (301) |
| /book-now | Nookal booking embed | Nookal booking page (new link supplied 19 Oct 2026) | **Change** (302 to Nookal; every "Book now" links there directly) |
| /group-exercise-timetable | Class timetable and cancellation policy | /pilates#timetable (merged with the Pilates page, 18 Oct 2026) | **Change** (301) |
| /clinic-updates | Clinic news | /news (post deleted 7 Nov 2026, owner's request) | **Change** (301) |
| /xmas-2024 | Christmas 2024 newsletter | /news (post deleted 7 Nov 2026, owner's request) | **Change** (301) |
| /baby-news | July 2026 update | /news/july-2026-update | **Change** (301) |
| /blog-posts/* | Linked from homepage and team images, but not in the export | /news | **Change** (301). The image links aren't carried over. |

New pages with no old URL: `/patient-information`, `/privacy`, `/news`, and `/team/nicole-saxby` and `/team/laura-bradford`. See `docs/site-strategy.md` for why.

## Structure changes (18 Oct 2026, first-principles redesign)

The owner asked for the site to be rethought rather than copied (see `docs/site-strategy.md`):
- **Problem-first navigation.** A "What can we help with?" finder groups the clinic's existing conditions into six needs (injuries and pain, pregnancy and postnatal, pelvic health, dizziness and balance, healthy ageing and chronic conditions, strength and performance), each linking to the right services. The grouping is new; every condition comes from the current pages. Data: `site/src/data/needs.ts`.
- **One classes page.** The Pilates and Group Exercise Timetable pages are merged at `/pilates`.
- **Patient information page.** Booking, cancellations, fees and rebates, class rules and the clinic dog move out of old newsletters into one evergreen page.
- **Standard service page structure:** hero → is this for you → what to expect → treatment → who you'll see → good to know → related → book.
- **Practitioner profiles** with qualifications, training and experience pulled out of the bios into lists.

## Home page tightened (3 Nov 2026, after a competitor review)

The owner felt the home page had too much text compared with three competitors (All Women's Health, Pear Exercise Physiology, The Healthy Peach Physio) and chose suggestions 1–7:
- **Hero:** shorter intro (the "journey of one's health" line now appears once, in the values band), no tagline eyebrow, and the second button is "Call 0434 686 261" on phones ("What can we help with?" on larger screens).
- **What can we help with?** The six needs are one-line tiles with icons, linking to the full lists on `/services`. Below them, one photo card per service (15 words or fewer each) replaces the old "Two ways to work with us" panels; class size, length and equipment stay on `/pilates`.
- **How it works** is a slim three-step strip.
- **Studio and values:** two overlapping photos beside "Accept . Support . Challenge ." and the journey line. The equipment list moved to `/pilates` only.
- **Find the clinic:** address, directions, hours and a static street map. Phone, email and parking stay on `/contact`.
- The result is about 350 words in 6 sections (was about 550 in 8): roughly 5,800 px tall on desktop (was 7,300) and 7,900 px on mobile (was 11,600).
- **Map:** a static image made once from OpenStreetMap (`site/scripts/make-location-map.mjs`), credited "© OpenStreetMap contributors" under the map. It's a local image, so no map script or third-party request loads on the page.

**Carried to the inner pages (3 Nov 2026):**
- **Services** uses the same photo cards as Home (`ServiceGrid`) in place of the separate Appointments grid and Pilates panel. The class facts it showed are on `/pilates`.
- **Contact** shows the street map where the front-of-clinic photo placeholder was.
- **Call button on phones** in the Services and Pilates headers (it replaces the second button on small screens). Service and profile pages already had one.
- **Service cards (6 Nov 2026):** one "One-on-one appointments" heading above the four one-on-one cards, instead of a "One-on-one" label on each card. The classes card has no label, since its title says what it is.
- **Pilates:** "How to start classes" is the same slim strip as Home's "How it works" (`StepStrip`), one line per step: "Book a once-off pre-class assessment", "Choose your class times online, selecting the relevant practitioner", "Class full? Get in touch to join the waitlist". The full waitlist explanation stays in the Timetable section.

## Content changes

- **Time-sensitive content:** Team page says "Currently on maternity leave until Jan 2027". This now shows as a status on the team cards (set in each practitioner's file), plus a site-wide notice banner. Someone needs to turn both off when the clinic reopens (on /admin: Clinic settings → Clinic details → Notice banner, and each practitioner's Status).
- **Temporary closure (new):** a site-wide notice says the clinic is temporarily closed and plans to reopen in January 2027 (source: the July 2026 update).

## Wording change log (clinical copy, for owner approval before launch)

Each change to what a service involves, conditions treated, or examination or consent wording is listed here as it's made.

| Page | Original | New | Why | Approved |
|---|---|---|---|---|
| Home (intro) | "We embrace everyone in their health journey, with **specialist** services in musculoskeletal physiotherapy, exercise physiology/exercise prescription and clinical pilates including group classes." | "We embrace everyone in their health journey, with services in musculoskeletal physiotherapy, exercise physiology/exercise prescription and clinical pilates including group classes." | "Specialist" is a protected title. Physiotherapists here aren't registered specialists, so it could mislead (National Law s133 and s118). | TBC |
| Home and menu (service card summary): Musculoskeletal Physiotherapy | Conditions list on /physiotherapy | "Assessment and treatment for sporting injuries, back and neck pain, joint pain, chronic pain, pregnancy and postnatal aches and pains, and post-surgical care." | New short summary for cards, condensed from the conditions list | TBC |
| Home (card summary): Exercise Physiology | Conditions list on /exercise-physiology | "Tailored exercise for injury rehabilitation and prevention, chronic pain and disease management, osteoporosis and healthy ageing, and athletic performance." | New short summary for cards | TBC |
| Home (card summary): Pilates & Small Group Classes | Equipment and "We see all clients of all ages and exercise ability" on /pilates | "Clinical pilates and small group classes on the Reformer, Wunda Chair, Trapeze Table and CoreAlign, for all ages and exercise abilities." | New short summary for cards | TBC |
| Home service cards (3 Nov 2026): Musculoskeletal Physiotherapy | Card summary above | "Assessment, hands-on treatment and exercise for injuries, pain and recovery after surgery." | Shorter home page (15 words or fewer); condensed from the page's opening line. The full conditions list stays on the service page | TBC |
| Home service cards: Exercise Physiology | Card summary above | "Exercise programs built around your medical history, fitness and goals." | As above | TBC |
| Home service cards: Pelvic Floor Physiotherapy | Card summary | "Assessment and treatment for pelvic health concerns, including pregnancy, postnatal and menopause care." | As above | TBC |
| Home service cards: Vestibular Physiotherapy | Card summary | "Assessment and treatment for vertigo, dizziness and balance problems." | As above | TBC |
| Home service cards: Pilates & Small Group Classes | Card summary above | "Clinical pilates and small group classes for all ages and abilities." | As above; the equipment is listed on /pilates | TBC |
| Home "How it works" (3 Nov 2026) | "New clients begin with an initial consultation and assessment. For classes, that's a once-off pre-class assessment." / "We take the time to understand your history, needs and goals, and tailor treatment and exercise to suit you." / "Continue with one-on-one appointments, a home or gym program, or small group classes in the studio." | "Start with an initial assessment" / "Get a plan tailored to your needs and goals" / "Keep moving with appointments, a home or gym program, or classes" | One line per step. The pre-class assessment is still in the booking band below and on Patient information | TBC |
| Home (card summary): Pelvic Floor Physiotherapy | Conditions list on /womens-health-physio | "Assessment and treatment for incontinence, prolapse, pelvic pain, diastasis recti, pre- and postnatal care, sexual dysfunction and menopause care." | New short summary for cards | TBC |
| Home (card summary): Vestibular Physiotherapy | Intro on /pilates-1 | "Assessment and treatment for vertigo, dizziness and decreased balance, including Benign Paroxysmal Positional Vertigo (BPPV)." | New short summary for cards | TBC |
| Home (classes) | "A once off pre-class assessment is required prior to commencing classes." / "Healthy Aging" | "A once-off pre-class assessment is required before commencing classes." / "Healthy ageing" | Australian spelling and punctuation only | TBC |
| Physiotherapy (Joint pain) | "Whether arthritis, auto-immue, or another issue, we help restore mobility and reduce inflammation." | "Including arthritis, autoimmune conditions and other causes of joint pain." | Removes an outcome claim; fixes a typo | TBC |
| Physiotherapy (Chronic pain) | "Our holistic approach manages pain and empowers you to take control of your life." | "A holistic approach to managing pain, with tools to help you take control day to day." | Softens an implied outcome | TBC |
| Physiotherapy (Comprehensive assessments) | "…to craft the perfect treatment plan." | "We take the time to understand your unique needs and goals, so we can develop your treatment plan." | "Perfect" is a superlative claim | TBC |
| Physiotherapy (Manual therapy) | "…to address muscle tension and improve joint range of motion." | "…to address muscle tension and joint range of motion." | Removes an outcome claim | TBC |
| Physiotherapy (Dry needling) | "Precisely target trigger points for pain relief and muscle activation." | "Targeting trigger points to help relieve pain and activate muscles." | Softens an outcome claim | TBC |
| Physiotherapy (Taping) | "Support your body and enhance athletic performance or move with less discomfort" | "To support your body during sport and everyday movement." | Removes performance and comfort claims | TBC |
| Physiotherapy (Personalised exercise programs) | "Strengthen, stabilize, and improve flexibility with tailored exercises." | "Tailored exercises to build strength, stability and flexibility." | Tightened; Australian spelling | TBC |
| Physiotherapy (Education) | "Empower yourself to maintain optimal health and prevent future issues." | "To help you look after your health and reduce the risk of future issues." | "Prevent" overstates the benefit | TBC |
| Physiotherapy (what to expect) | (none on page) | Three steps from the "Services we offer" list: comprehensive assessment, treatment tailored to you, tools to self-manage | Restructured into a "what to expect" sequence | TBC |
| Exercise Physiology (What to expect) | "This thorough approach ensures that we develop a safe and effective exercise plan just for you." | "This thorough approach means we can develop a safe exercise plan suited to you." | "Ensures… effective" is a guarantee | TBC |
| Exercise Physiology (Injury rehabilitation) | "…to aid recovery and prevent future injuries." | "…to aid recovery and reduce the risk of future injuries." | "Prevent" overstates the benefit | TBC |
| Exercise Physiology (Osteoporosis) | "Exercises to strengthen bones, improve balance, and promote healthy ageing." | "Exercises for bone strength, balance and healthy ageing." | Removes outcome wording | TBC |
| Exercise Physiology (Coaching) | "…to help you achieve your fitness and health goals." | "…to help you work towards your fitness and health goals." | Softens an implied outcome | TBC |
| Exercise Physiology (treatments) | Two lists (EP page and Our Services) | Merged into one list, keeping "Exercise guidelines" and "Injury prevention" from Our Services | Removes duplication, keeps every item | TBC |
| Pelvic Floor Physiotherapy (What to expect) | Consent and examination wording | **Unchanged, verbatim** | Consent wording must not change | n/a |
| Pelvic Floor Physiotherapy (conditions) | "Pelvic pain (such as endometriosis, vaginismus etc )" | "Pelvic pain: such as endometriosis, vulvodynia and vaginismus." | Adds "vulvodynia" from the Our Services list (existing fact) | TBC |
| Pelvic Floor Physiotherapy (treatments) | "Education about pelvic floor anatomy and function", etc. | Same items, split into a name and a detail (e.g. "Biofeedback: to improve muscle awareness") | Formatting only | TBC |
| Pelvic Floor Physiotherapy (who you'll see) | (none) | "Both of our physiotherapists have completed Women’s Pelvic Health Physiotherapy training with the APA." | New sentence from the team page facts | TBC |
| Vestibular Physiotherapy (evidence) | "…evidence-based and has been shown to be effective in managing and improving symptoms…, helping patients regain functional independence and confidence in their daily lives." | "Vestibular physiotherapy is an evidence-based approach to managing the symptoms of vestibular disorders." | Removes outcome and effectiveness claims that need substantiation | TBC |
| Vestibular Physiotherapy (treatments) | Four descriptions without names | Same descriptions with names added: "Repositioning movements", "Gaze stabilisation", "Habituation exercises", "Education" | Easier to scan; names describe the existing techniques | TBC |
| Pilates (What to expect) | "…we will make sure you are comfortable yet challenged to improve." | "…we aim to keep you comfortable yet challenged to improve." | "Make sure" is a guarantee | TBC |
| Pilates and Patient information (private health) | "All exercise sessions are claimable with private health." / "Claimable with private health." | "Exercise sessions may be claimable with private health, depending on your level of cover." | A blanket claim could mislead people whose cover doesn't include it | TBC |
| Nicole's bio | "Nicole’s patients love her vibrant and enthusiastic approach…" | "Nicole brings a vibrant and enthusiastic approach…" | Implied patient testimonial (s133) | TBC |
| Nicole's bio | "…she has the confidence to tailor and adapt any treatment plan to meet the needs of each and every person regardless of…" | "She tailors and adapts each treatment plan to the needs of the person in front of her, whatever their…" | Could create unreasonable expectations | TBC |
| Laura's bio | "…alongside a team of esteemed Physiotherapists" / "Laura's expertise in exercise prescription enriches her approach…" / "equips her with invaluable insight" | "…alongside a team of physiotherapists" / "Laura’s background in exercise prescription shapes her approach…" / "gives her valuable insight" | Tightened; avoids superlatives | TBC |
| Home (how it works) | (new) | Three steps: start with an assessment, a plan tailored to you, keep moving | New copy built from existing facts (initial consultation, pre-class assessment, tailored programs, classes) | TBC |
| Home and Services ("What can we help with?") | Conditions spread across five pages | Grouped into six everyday needs (`site/src/data/needs.ts`) | New grouping; conditions unchanged | TBC |
| Christmas 2024 (archived) | "These classes are designed to enhance your recovery and promote overall strength…" | "…designed to support your recovery and overall strength…" | Softens an outcome claim | TBC |
| Exercise Physiology (treatments, 6 Nov 2026) | "Treatment may include" listed 11 items, 6 of which repeated the conditions list (injury rehabilitation, injury prevention, chronic pain and disease management, osteoporosis and healthy ageing, musculoskeletal and neurological rehabilitation, strength and conditioning and athletic performance) | Treatments now list the 5 ways of working (functional and resistance training, pilates, coaching, home and gym programs, exercise guidelines). The examples "arthritis, diabetes and cardiovascular disease" were first moved under "Chronic pain and disease management", then removed at the owner's request (7 Nov 2026) | The same items appeared twice on one page | TBC |
| Vestibular ("Good to know", 6 Nov 2026) | Heading "An evidence-based approach" above "Vestibular physiotherapy is an evidence-based approach…" | Heading "Our approach"; sentence unchanged | The heading repeated the sentence | TBC |
| Pilates (opening line, 6 Nov 2026) | "…for all ages and abilities, from people who have never stepped foot in a gym to high-level athletes." | "…on the Reformer, Wunda Chair, Trapeze Table and CoreAlign, for all ages and abilities." | The gym-to-athletes line was repeated word for word further down the page, where it stays | TBC |
| Exercise Therapy (Google description only, 10 Nov 2026) | "…for injury rehabilitation, chronic pain and disease management, osteoporosis, healthy ageing and athletic performance." | "…for injury rehabilitation, chronic pain and disease management, osteoporosis and healthy ageing." | 171 characters; Google cuts descriptions at about 160. "Athletic performance" still appears on the page itself | TBC |
| Pelvic Health Physiotherapy (Google description only, 10 Nov 2026) | "…pre- and postnatal care, sexual dysfunction and menopause care." | "…pre- and postnatal care, sexual dysfunction and menopause." | 161 characters; trimmed the last word to fit | TBC |

Mechanical edits across all pages (one entry): Australian spelling (customised, stabilise, mobilisation, specialised, personalised, ageing), "Dumbells" → "dumbbells", `tel:` link fixed to `+61`, malformed `mailto:` links fixed. Added 6 Nov 2026: "Peri-natal" → "Perinatal" (Laura's experience), "Neuro-muscular Dry-Needling" → "Neuromuscular Dry Needling" (Nicole's training: check the course's own spelling), news dates in Australian style ("Sunday 21 June 2026", not "Sunday, June 21st, 2026"), and the June 2025 post's "here" link now reads "SMS notification list".

### Conflicting facts: most recent page used, please confirm

| Fact | Older version | Used on the new site (newest source) |
|---|---|---|
| Class size | "maximum of 4 people" (Our Services, Jun 2024) | "a maximum of 4–5 people" (Pilates, Mar 2025, and Timetable, Aug 2025) |
| Class length | "40mins" (Pilates, Mar 2025) | "45 minutes" (Timetable, Aug 2025, and Our Services) |
| Cancellation notice | "24 hours notice" (Christmas 2024) | "within 8 hours… charged at 50%" (Timetable, Aug 2025) |
| Equipment | Different lists on three pages | One combined list (`site/src/data/policies.json`, editable on /admin) |

## Nicole's decisions (weekend run-through, actioned 7 Nov 2026)

| # | Decision | What changed on the site |
|---|---|---|
| 1 | Titles as recommended | Nicole: "Physiotherapist · Exercise Physiologist · Clinical Pilates Instructor" ("(pelvic health)" removed at her request, 7 Nov 2026). Laura: "Physiotherapist · Clinical Pilates Instructor" (she isn't seeing pelvic health clients for now; her pelvic health training stays under qualifications). "Accredited Exercise Physiologist" only once ESSA accreditation is confirmed |
| 2 | "Pelvic Health" everywhere | Service renamed "Pelvic Health Physiotherapy" (menu, cards, page title, Google title and description, Patient information link). Clinical terms such as "pelvic floor exercises" and course names are unchanged |
| 3 | Keep "Book now" | No change: Nookal only shows slots from January |
| 4 | Laura back in March 2027 (moved from April, 7 Nov 2026); vestibular unavailable until then | Laura's status "On maternity leave until March 2027"; availability note under the Vestibular page title |
| 5 | Nookal is right: Laura isn't seeing pelvic health clients for now | Laura removed from Pelvic Health "Who you'll see"; note now "Book pelvic health appointments with Nicole…" |
| 7 | Keep the photos with the old logo for now | No change |
| 8 | Internal exam only ever optional and with consent | Pelvic "What to expect": "…then complete a comprehensive assessment to work out the best course of treatment. An internal (vaginal) examination is only ever optional, and only goes ahead with your consent." Replaces "(potentially a vaginal examination if deemed necessary)". Nicole to approve the exact words |
| 9 | Cancellation: at least 8 hours' notice or the full cost is charged | "Please give at least 8 hours' notice if you need to cancel. Bookings cancelled with less than 8 hours' notice are charged the full price." (was 50%). Applied to appointments and classes: confirm appointments are included |
| 10 | Grip socks: no price, available to buy in clinic | "They're available to buy in the clinic…" |
| 11 | Remove Jeff from the home page | Removed; Jeff stays on the Team page. Home shows the two practitioners side by side |
| 12 | Switch on analytics | Privacy policy now says the site uses Cloudflare Web Analytics (no cookies, no cross-site tracking, not for advertising). Adrian switches it on in Cloudflare |
| 13 | Add third related services | Exercise Physiology → Pelvic Health added; Vestibular → Pilates added |
| 14 | Reopens Monday 4 January 2027 | Banner: "The clinic is temporarily closed and reopens on Monday 4 January 2027." It and the closure notes hide themselves after 3 January |

## Exercise Physiology becomes Exercise Therapy (7 Nov 2026, owner's request)

- The service is now **Exercise Therapy**, a broader name, so both Nicole and Laura can provide it. Address `/exercise-therapy`; `/exercise-physiology` redirects there (301). Content otherwise unchanged.
- "Who you'll see" lists Nicole and Laura, with the note "Nicole and Laura both provide exercise therapy. Nicole is also an Accredited Exercise Physiologist (AEP)."
- Nicole's title is now "Accredited Exercise Physiologist" (her AEP accreditation confirmed by the owner).
- Fees: an "Exercise therapy" group with an initial consultation (45 minutes, $145) and reviews (30 minutes, $95; 45 minutes, $125), each with Nicole or Laura. Exercise physiology is no longer listed separately, and the separate "1 on 1 Exercise Therapy Session" ($125) is covered by the 45-minute review. The clinic will update Nookal to match.
- Still "Exercise Physiology" by the owner's choice of words: the home page headline and facts (editable on /admin), and the privacy policy's description of the clinic's services.

## Privacy policy approved (7 Nov 2026)

Nicole reviewed and approved /privacy. Changes at the same time: the DRAFT note removed; an AI tool line added ("We may use an AI tool to help with note-taking and administration. It can summarise your appointment and help draft notes and letters. Your practitioner always reviews what it produces. Please let us know if you would prefer us not to use AI tools."); the paragraph about contacting the OAIC if not satisfied removed at the owner's request; no named privacy contact (the clinic's email and phone); retention stated as "as long as the law requires"; "Last updated 7 November 2026". Overseas: "All of your information is stored within Australia." (owner, 7 Nov 2026).

## Later changes (7 Nov 2026)

- The July 2026 update was deleted (owner's request; a new update is coming). `/baby-news` and `/news/july-2026-update` redirect to /news. The notice banner no longer has a "Read the latest update" link. While there are no posts, /news shows a short note and News is left out of the menu and footer.
- Laura's return moved to March 2027 (status and the Vestibular availability note).
- New post (7 Nov 2026): "We’re reopening on Monday 4 January 2027" (`/news/reopening-january-2027`): Laura’s baby Charlotte Anne (born Tuesday 15 September 2026, 3.7kg; big brother Teddy), Laura back part-time by March 2027, opening hours, the new class timetable, booking, and a patient portal teaser. Two photos supplied by the owner (converted from HEIC, location and camera data removed). The notice banner links to it.
- AHPRA registration numbers won't be shown for now: the profile TODO is gone; the optional field stays on /admin.
- Consent confirmed for everyone pictured, including the two children. Their photos are now in `site/src/assets/photos/` (`pxl-20220610-235914156.webp`, `pxl-20220611-052505665.webp`), ready to choose on /admin, but not placed on a page yet.

## Exercise physiology and exercise therapy (7 Nov 2026, matches Nookal)

Nicole keeps exercise physiology (billing and rebates need an Accredited Exercise Physiologist; GST applies: $145 initial, $95 and $125 reviews, GST included). Laura offers exercise therapy as a physiotherapy service, GST-free: 30 minutes $95 and 45 minutes $125, as follow-ups after an initial physiotherapy consultation, from March 2027. Fees list both groups; the Exercise Therapy page and fees add: "Exercise therapy with Laura is claimable as physiotherapy. If your referral or rebate is specifically for exercise physiology (for example a GP care plan referral to an exercise physiologist), please book with Nicole, our Accredited Exercise Physiologist."

## Fees and funding (6 Nov 2026, from the Nookal booking page)

Prices and funding wording on Patient information come from the clinic's own Nookal booking page (https://book.nookal.com/bookings/book/EE4e4bFE-aEC6-E51D-2cda-aE95ddcBeb3E/location), read on 6 Nov 2026. Names are shortened from Nookal's (e.g. "Physiotherapy Extended Review - 45mins" → "Extended review (45 minutes)", under a "Physiotherapy" heading). Exercise physiology prices are shown as Nookal shows them to clients, GST included ($145, $95, $125). Funding: "Private health, Medicare, DVA, NDIS and WorkCover are all welcome", plus the out-of-pocket note, both condensed from Nookal's appointment descriptions. Class packages aren't on Nookal, so the existing package note needs confirming. Approved: TBC.

## Design changes

**Full redesign** to modernise the site, with a modern, sleek feel. Brand identity:
- **Logo:** the plain "embrace / MOVEMENT CLINIC" wordmark only. The teal brush-stroke circle is dropped (owner decision, 12 Oct 2026).
- **Palette:** Petrol + Teal, a logo-based palette (Petrol + Coral chosen on 19 Oct 2026; the owner changed the accent to teal on 20 Oct 2026). Forest was chosen on 12 Oct 2026, then dropped on 18 Oct 2026 because it's too close to a local competitor. `/palette` stays for previewing other combinations.
- **Wordmark colours:** the header wordmark uses the logo's own colours (teal “embrace”, grey “MOVEMENT CLINIC”). The brush circle stays dropped. Favicons and the default share image are white on petrol.
- **Tagline:** "Accept . Support . Challenge ." is kept.
- **Brand detail (3 Nov 2026):** every page header ends in a gentle curve (`.curve-bottom`, depth `--curve`), on the last header band before the page content (on Pilates, the class facts strip).
- **Fewer elements per section (3 Nov 2026):** one card style everywhere (white, thin border, rounded, lifts on hover); practitioner titles, "perfect for" and equipment lists shown as plain lists instead of pills; condition lists, "Good to know", studio tips and profile details without boxes; callouts as a soft tint with no outline; small labels above headings removed where they repeated the heading; descriptions at 16 px or more (small text only for labels and captions).
- **Type:** Red Hat Display + Red Hat Text.
- **Review fixes (6 Nov 2026):** the closure message now shows on Contact, Patient information and the Pilates timetable only (plus the banner and the leave status on practitioner cards), not three or four times per page. The home "Who you'll see" row adds a card for Jeff, the clinic dog, using the Team page's existing text and photo. Grids size to their number of cards, so rows don't end in an empty column. Share images for practitioner and service pages are made at 1200×630 without cutting off heads (`site/scripts/make-share-images.mjs`).
- **Code review fixes, batch 1 (10 Nov 2026):** the header is now one bar at every screen size. The slim "Patient portal" row under it on phones and tablets is gone: it made the header taller than the page expected, which hid the "On this page" bar on service pages and pushed the bottom of the phone menu off the screen. Patient portal is now a header button from tablet width up, and stays in the menu and the home page hero on phones. While the phone menu is open, the page behind it no longer scrolls or takes keyboard focus. The closure sentence under "Hours" on Home and Contact now disappears on the same date as the banner (it used to stay until someone switched the notice off). On small laptops the menu no longer wraps onto two lines, and on very narrow phones (under about 350px) the icon tiles stack in one column so long labels fit.
- **Code review fixes, batch 2 (10 Nov 2026): tidy-up behind the scenes.** No wording changes. Repeated pieces (section headings with an icon, icon tiles, photo cards, notes, the "On this page" bar, fee panels) are now single shared components, so a design change is made once. Visible side effects are small: status pills ("On maternity leave until…") are one size everywhere; notes and tips share one pale teal style (the booking code tip on the Pilates page was grey); icons in circles are one size; the footer says "© Embrace Movement Clinic" without a year, so it never goes out of date. Practitioner pages now give the bio before the qualifications on phones and to screen readers (it already looked that way on wide screens). Layouts now change at five screen widths instead of thirteen (listed in `site/src/styles/tokens.css`): on tablets the class timetable shows as rows of times until the screen is wide enough for a column per day, fees are one panel per row, and the Patient information jump tiles stay two across until they fit four ("Cancellations" used to spill out of its tile between about 640 and 730px).
- **Code review fixes, batch 3 (10 Nov 2026): search, sharing and safety.** (1) Google now gets the clinic's opening hours, a photo of the studio, each service and each practitioner as linked structured data, all built from the same details the pages show (so the phone number or hours can't differ). Closed days are left out; any hours row the site can't read with certainty is left out rather than guessed. (2) Browser tab and Google titles for four pages now name the suburb: "Services in McDowall", "Our physiotherapists in McDowall", "Contact us in McDowall", "Patient information | Embrace Movement Clinic, McDowall" (the headings on the pages are unchanged). (3) Two Google descriptions were shortened to fit (see the wording log: Exercise Therapy and Pelvic Health). (4) Service photos on phones download as small thumbnails (about 10 kB each instead of up to 70 kB). (5) The colour picker (`/palette`), its `?palette=` preview and `/styleguide` are no longer part of the live site, only the preview site, so nobody can be sent a link showing the clinic's site in other colours. (6) A build of the live site stops if the website editor still saves to the preview branch. (7) A content security policy: browsers only run the site's own scripts and Cloudflare's analytics script. (8) The class timetable falls back to rows of times in older browsers; without JavaScript the header no longer stays stuck over the page on phones.
- **Code review fixes, batch 4 (10 Nov 2026): clearer pages.** No wording changes. (1) Service pages: the conditions no longer each carry an identical tick in a circle; on phones they are one pale panel with the conditions listed inside it, instead of a tall stack of separate tiles (the Physiotherapy page is about a fifth shorter on a phone). "Good to know" (fees, cancellations, getting here) is a plain row of links rather than three more boxes. (2) Contact: "Book online" now comes first and is the one filled petrol card, as on Patient information; Call, Text and Email follow. (3) "Find the clinic": parking and hours are no longer in boxes, and split shifts show one per line ("7am – 11am" / "1pm – 8pm"), as in the footer. Both now come from one shared list. (4) The "On this page" bar highlights the section being read and keeps it in view on phones. Cards and tiles give a small press when tapped. The arrow beside "Services" in the menu is easier to hit. (5) Footer: the hours column is wider, and the closure sentence isn't repeated there on pages that already show it just above (Home and Contact). (6) Home on phones: the photo comes sooner. The "Call" button (already in the header) and the "What can we help with?" jump link are left out of the top section on phones; both remain on wider screens.
- **Light theme only (12 Nov 2026, owner's request).** On Android phones with dark mode on, Chrome was darkening the site by itself, and its guess left some buttons barely readable (pale text on the pale teal "Services that can help" buttons). The site now tells browsers it has one, light, theme, so it shows in the clinic's own colours whatever the phone's setting. A proper dark theme in the clinic's palette would be a separate piece of design work.

Don't copy the Squarespace layout. Use the screenshots only for content, menu items and brand cues. See "Design direction" in CLAUDE.md.

## Photos (added 19 Oct 2026)

The owner supplied 16 photos. 14 are in `site/src/assets/photos/` (file names lower-cased). The site serves them as AVIF with a WebP fallback, sized for each screen. Please check each description (alt text), which screen readers read out and which is used when a page is shared. Photos marked "decorative" sit beside a heading that already says what they show, so they have no description.

| Photo | Where | Alt text |
|---|---|---|
| `pxl-20220610-230251564-hires` (higher-resolution version supplied 20 Oct 2026, resized to 3000 px wide) | Home hero | A practitioner with Jeff, the clinic dog, at the Trapeze Table in the studio |
| `3-sam-1300` | Home "Appointments" card (decorative); Musculoskeletal Physiotherapy page and card | A physiotherapist treating a patient’s neck as they lie on the treatment table |
| `pxl-20220610-231040021` | Home "Pilates & classes" card | Decorative |
| `pxl-20220610-231913214` | Home studio gallery | A client holding a plank with their feet in the Trapeze Table straps |
| `pxl-20220611-041127782` | Home studio gallery | A physiotherapist treating a patient lying on the treatment table |
| `pxl-20220611-044952545` | Home studio gallery | A pregnant client kneeling beside an exercise ball |
| `pxl-20220611-043748537` | Exercise Physiology page and card | A practitioner guiding a client through a side-lying exercise on the reformer |
| `pxl-20220611-045341759-2` | Pelvic Floor Physiotherapy page and card | A physiotherapist guiding a pregnant client through a lunge |
| `pxl-20220611-040951368` | Vestibular Physiotherapy page and card | A physiotherapist supporting a patient’s head as they lie on the treatment table |
| `pxl-20220610-233959936` | Pilates & classes page; Services page; home studio gallery | A client exercising on the reformer while a practitioner watches |
| `16-sam-1372` | Nicole’s card and profile | Nicole Saxby |
| `26-sam-1423` | Laura’s card and profile | Laura Bradford |
| `41-sam-1487` | Team page (Jeff section); archived June 2025 update | Laura and Nicole with Jeff, the clinic dog |

**Differences from the old site:**
- Musculoskeletal Physiotherapy uses `3-SAM_1300` rather than `6-SAM_1312`. The page photo is landscape, and `6-SAM_1312` is a tall portrait that would have cropped out either the practitioner's face or the patient. It isn't used for now: no square or landscape crop keeps both the practitioner's whole head and the treatment in frame (it would suit a tall, portrait-shaped slot).
- Crops are set so practitioners' whole heads stay in frame (owner request, 20 Oct 2026). Headshots are anchored to the top of the photo.
- Exercise Physiology uses `PXL_20220611_043748537`. The old page used `PXL_20220611_043828572`, which wasn't supplied; it was taken a minute later in the same session.
- Vestibular Physiotherapy had no photo before.

**Held back (not on the site):**
- `PXL_20220610_235914156` (a child using a wheelchair beside the reformer) and `PXL_20220611_052505665` (a child on the treatment table). Photos of children need a parent's or guardian's consent for website use. Confirm consent and they can go in (for example in the studio gallery, or on the Exercise Physiology page).

## Compliance flags

**Removed from the archived news posts (not republished):**
- Christmas 2024: the "Refer a friend in January… you'll receive a free group class" offer. It's an offer with no clear terms (s133).
- Christmas 2024: "10 x small group exercise classes = $350" and "save money". The price is out of date and unconfirmed.
- Christmas 2024: "Please remember to give us 24 hours notice for any cancellations". This contradicts the current 8-hour policy, so the archived post now links to the current policy instead.


From a first pass of the exported text. Re-check after the build.

- No patient testimonials or outcome guarantees found in the exported page text. The Instagram feed and any images with text overlays weren't checked.
- **"Specialist services" (home page).** "Specialist" implies specialist registration, which physiotherapy doesn't have. The new home page says "services" instead (see the wording log).
- **No privacy policy page found.** One is needed.
- Clinic Updates mentions using AI tools to reduce admin, reviewed by the practitioner. Make sure the privacy policy (and patient consent processes) cover this.
- The pelvic health page describes possible internal examinations. Keep the consent wording as is, and have a clinician approve any edits.

**GST not shown on the fees list (owner, 7 Nov 2026).** The "Includes GST" notes on the exercise physiology fees and the "Prices include GST where it applies" line are removed: prices are shown as the patient pays them (the same as Nookal), and GST is for the clinic's own records.

**Exercise physiology and exercise therapy wording (owner, 8 Nov 2026).** The referral and rebate note now leads with exercise physiology: "If your referral or rebate is specifically for exercise physiology (for example a GP care plan referral to an exercise physiologist), please book with Nicole, our Accredited Exercise Physiologist. Exercise therapy is also available with both Nicole and Laura, and is claimable as physiotherapy." Same order in Who you'll see on Exercise Therapy and in the fee notes on Patient information. Exercise therapy fees now read "With Nicole, or with Laura from March 2027, after an initial physiotherapy consultation." (Nicole holds both provider numbers, so she can provide either.)

**Clinic news is link-only (owner, 8 Nov 2026).** News isn't in the menu, footer or sitemap, and news pages are hidden from search engines (noindex). Posts are shared by direct link; the notice banner's "Read the latest update" link stays. Posts no longer link back to the news list, and the old Squarespace update addresses (/clinic-updates, /xmas-2024, /baby-news, /blog-posts/…) now redirect to the home page instead of /news.

