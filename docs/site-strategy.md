# Site strategy: designing from first principles

Written 18 Oct 2026, when the owner asked for the site to be rethought rather than rebuilt page for page. This is the reasoning behind the new structure. Facts still come only from `reference/` (see `CLAUDE.md`).

## 1. Who visits, and what they're trying to do

| Visitor | What they want to know, roughly in order | What they want to do |
|---|---|---|
| **New patient with a problem** ("my back", "leaking since my baby", "the room spins") | Can this clinic help with *my* problem? Who would I see? What happens at the first visit? Is it claimable? Where is it, and can I park? | Book, or call to ask |
| **Pregnant or postnatal woman** (both practitioners have pelvic health training) | Who helps with pelvic floor, pregnancy pain and returning to exercise? Is it private and comfortable? | Book with the right practitioner |
| **Prospective class member** | What are the classes like? Who are they for? How do I start? When are they on? How big are they? | Book a pre-class assessment, then classes |
| **Existing client** | Is the clinic open? Class availability, cancellation rules, what to bring | Rebook, cancel, join a waitlist |
| **GP or referrer** | Services, practitioners and qualifications, contact details | Phone or email |

## 2. What the current site gets wrong

1. **It's organised by discipline, not by problem.** People search for "vertigo" or "pelvic floor after baby", not "vestibular physiotherapy". Nothing on the current site maps problems to services.
2. **The same information is duplicated, and the copies disagree.** "Our Services" repeats every service page. The copies differ on class size (4 vs 4–5), class length (40 vs 45 minutes) and the cancellation notice (8 hours vs 24 hours).
3. **Practical information is buried in old newsletters.** Booking codes, grip socks, the cancellation policy, the clinic dog, the AI admin tools and the temporary closure all live in dated news posts.
4. **Classes are split across two pages** (Pilates and Group Exercise Timetable), and the timetable is an image of the July 2025 timetable. It's out of date and inaccessible.
5. **There's no clear "start here" path.** The site never explains that new patients begin with an assessment, or that classes need a pre-class assessment first.
6. **The basics are missing:** hours, parking, fees and rebates, first-visit information, and a privacy policy.
7. **The URLs mislead.** `/pilates-1` is the Vestibular page, and `/womens-health-physio` is titled "Pelvic Floor Physiotherapy".
8. **Bios are walls of text.** The qualifications, experience and personal background are hard to scan.

## 3. Principles for the new site

1. **Lead with problems, then services.** A "What can we help with?" finder groups every condition the clinic already lists into six everyday needs, each linking to the right service.
2. **Two ways to work with us.** One-on-one appointments (physiotherapy, pelvic floor, vestibular, exercise physiology) and small-group classes (pilates). This is the clinic's real model, and it makes the path to classes obvious.
3. **One home for each fact.** Clinic details live in `clinic.json` (editable on /admin), services in their own files and policies on the Patient information page. Everything else links to them, so the copies can't disagree again.
4. **Every service page answers the same questions in the same order:** what it is → is it for me → what happens → treatment options → who I'll see → book.
5. **Evergreen first, news second.** Practical facts move from newsletters into Patient information. Time-sensitive news (the closure) goes in the notice banner and a dated post.
6. **Booking is never more than one tap away:** a sticky header with "Book now" and click-to-call, plus a booking band at the end of every page.
7. **Compliant by design.** No outcome promises, no testimonials, and consent wording kept verbatim. Every clinical wording change is logged in `changes.md`.

## 4. Information architecture

```
Home
├── Services (hub: problem finder, two ways to work with us, all services)
│   ├── Musculoskeletal Physiotherapy        /physiotherapy
│   ├── Pelvic Floor Physiotherapy           /pelvic-health-physiotherapy
│   ├── Vestibular Physiotherapy             /vestibular-physiotherapy
│   └── Exercise Physiology                  /exercise-physiology
├── Pilates & Classes                        /pilates   (classes, timetable, how to start, studio rules)
├── Team                                     /team
│   ├── Nicole Saxby                         /team/nicole-saxby
│   └── Laura Bradford                       /team/laura-bradford
├── Patient information                      /patient-information  (booking, cancellations, fees and rebates, what to wear, clinic dog)
├── Contact & visit                          /contact   (location, parking, hours, phone, text, email)
├── Book now                                 Nookal booking page (/book-now redirects there)
├── News                                     /news      (link-only: not in menus, footer or search)
└── Privacy policy                           /privacy   (footer only)
```

**Main menu:** Services ▾ · Classes · Team · Patient info · Contact · [phone] · **Book now**

**Change from the approved URL plan:** classes and the timetable now share one page at `/pilates`, a URL that already ranks. `/group-exercise-timetable` redirects there (`/pilates#timetable`) instead of to a separate `/classes` page.

## 5. Page templates

- **Home:** a clear promise (what, where, who for) → what can we help with (need tiles, one photo card per service, a slim how-it-works strip) → the team → studio and values → visit us (address, directions, hours, map) → book. Tightened on 3 Nov 2026 to about 350 words and 6 sections; see `docs/changes.md`.
- **Service page:** hero (summary, Book, Call, who you'll see) → "Is this for you?" (conditions) → what to expect (steps) → treatment may include → practitioners → good to know → related services → book.
- **Classes page:** what the classes are → who they suit → how to start (assessment → book → waitlist) → class details → timetable → equipment → studio rules → cancellation policy → book.
- **Practitioner page:** photo and roles → current status → experience → qualifications and training → bio → book with them.
- **Patient information:** short sections with jump links (Booking, Cancellations, Fees and rebates, Classes, At the clinic, Your privacy).

## 6. What still needs the owner

Photos, opening hours, parking, fees and rebates, a confirmed class length and size, a confirmed cancellation policy, Instagram and Facebook links, the ABN, AHPRA names as registered, and which practitioner provides which service. All of these are tracked in `to-supply.md`, and every gap shows on the site as a visible `TODO:`.
