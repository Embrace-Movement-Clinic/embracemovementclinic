import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A labelled point, e.g. a condition or a treatment, with an optional explanation.
const item = z.object({
  name: z.string(),
  detail: z.string().optional(),
});

// Each service is one Markdown file in src/content/services. The file name is the URL
// (physiotherapy.md is /physiotherapy). The Markdown body is an optional "About" section.
// Clinical wording changes must be logged in docs/changes.md.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shorter name for tight spaces (menus, chips). */
      shortTitle: z.string().optional(),
      order: z.number(),
      /** One-on-one appointments, or small-group classes. */
      kind: z.enum(['appointment', 'class']),
      /** One or two sentences for cards. */
      summary: z.string(),
      /** Very short description (15 words or fewer) for the home page cards. */
      blurb: z.string().optional(),
      /** Opening line under the page title. */
      lede: z.string(),
      forYou: z.object({
        heading: z.string(),
        intro: z.string().optional(),
        items: z.array(item),
      }),
      expect: z.object({
        /** Kept verbatim where it's consent or examination wording. */
        text: z.string().optional(),
        steps: z.array(item).optional(),
      })
      // The editor drops this section if both of its fields are blank.
      .default({}),
      treatments: z
        .object({
          heading: z.string().default('Treatment may include'),
          items: z.array(item),
        })
        .optional(),
      /** Notes under the treatments; `bookWith` adds a "Book with …" button for that practitioner. */
      goodToKnow: z.array(item.extend({ bookWith: reference('team').optional() })).default([]),
      practitioners: z.array(reference('team')),
      practitionersNote: z.string().optional(),
      /** Short availability note under the page title, e.g. while the practitioner is on leave. */
      notice: z.string().optional(),
      /** Hide the availability note automatically after this date (YYYY-MM-DD). */
      noticeUntil: z.string().optional(),
      related: z.array(reference('services')).default([]),
      /** Photo in src/assets/photos, used on the page, its card and when the page is shared. */
      image: image().optional(),
      /** Describes the photo for screen readers and when the page is shared. */
      imageAlt: z.string().optional(),
      /** Which part to keep when the photo is cropped (CSS object-position), e.g. "50% 30%". */
      imagePosition: z.string().optional(),
      /** Which photo is intended, until it's supplied (see reference/images.json). */
      imageNote: z.string().optional(),
      seoTitle: z.string(),
      seoDescription: z.string(),
      /** Old Squarespace URL if it changed (301 in public/_redirects). */
      oldUrl: z.string().optional(),
    }),
});

// Each practitioner is one Markdown file in src/content/team; the bio is the body.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      firstName: z.string(),
      order: z.number(),
      /** Must match the practitioner's AHPRA registration (see docs/to-supply.md). */
      titles: z.array(z.string()),
      education: z.array(z.string()).default([]),
      postgradTraining: z.array(z.string()).default([]),
      experience: z.array(z.string()).default([]),
      experienceHeading: z.string().default('Experience'),
      /** Short status shown on cards, e.g. leave dates. */
      status: z.string().optional(),
      /** Hide the status automatically after this date (YYYY-MM-DD), e.g. the day before they're back. */
      statusUntil: z.string().optional(),
      /** AHPRA registration number, as on the public register (e.g. PHY0001234567). */
      registration: z.string().optional(),
      /** Direct Nookal booking link for this practitioner. */
      bookingUrl: z.string().url().optional(),
      photo: image().optional(),
      /** Which part to keep when the photo is cropped (CSS object-position). Top by default, so headshots keep the whole head. */
      photoPosition: z.string().default('50% 0%'),
      photoNote: z.string().optional(),
      seoDescription: z.string(),
    }),
});

// Icons a news section can have beside its heading (the same list is offered on /admin).
const newsIcons = ['calendar', 'clock', 'users', 'user', 'heart', 'baby', 'info', 'check', 'message', 'card', 'shield', 'activity', 'dumbbell', 'sprout', 'map-pin', 'phone', 'mail'] as const;

// Clinic news. Dated posts; older ones carry an "archived" note.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shown as month and year only. */
      date: z.coerce.date(),
      summary: z.string(),
      archivedNote: z.string().optional(),
      /**
       * The post, one band per section in this order (alternating white and mist, like Patient
       * information). Each has its heading and icon, its text (basic formatting: src/data/markdown.ts)
       * and, beside it on wide screens, a side panel or photos. `highlight` puts the section in a
       * petrol card, for the main call to action. Buttons go under the text.
       */
      sections: z
        .array(
          z.object({
            heading: z.string(),
            icon: z.enum(newsIcons).optional(),
            text: z.string().optional(),
            aside: z.object({ heading: z.string().optional(), text: z.string() }).optional(),
            images: z.array(z.object({ src: image(), alt: z.string(), position: z.string().optional() })).default([]),
            buttons: z.array(z.object({ label: z.string(), link: z.string(), style: z.enum(['primary', 'secondary']).default('primary') })).default([]),
            highlight: z.boolean().default(false),
            /** Something from elsewhere on the site, shown under the text: the class timetable. */
            show: z.enum(['timetable']).optional(),
          }),
        )
        .default([]),
      /** Photos for a simple post written as one piece of text (the Markdown body), shown beside it. */
      images: z.array(z.object({ src: image(), alt: z.string(), position: z.string().optional() })).default([]),
      oldUrl: z.string().optional(),
    }),
});

// Home page text and photos (one file: src/content/home/home.md, edited on /admin).
const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/home' }),
  schema: ({ image }) =>
    z.object({
      heroTitle: z.string(),
      heroIntro: z.string(),
      heroImage: image(),
      heroImageAlt: z.string(),
      heroImagePosition: z.string().optional(),
      /** The short facts under the hero (icons: person, group, shield, pin, in that order). */
      facts: z.array(z.string()).max(4).default([]),
      /** "How it works", one line per step. */
      steps: z.array(z.string()).min(1),
      teamIntro: z.string(),
      /** "Our approach": the values line and two overlapping photos. */
      approach: z.object({
        text: z.string(),
        image: image(),
        imageAlt: z.string(),
        insetImage: image(),
        insetImageAlt: z.string(),
        insetImagePosition: z.string().optional(),
      }),
    }),
});

// Page text that isn't part of a service, practitioner or news post: one file per page in
// src/content/pages, edited on /admin ("Pages"). Each is a single-entry collection.
const page = <T extends z.ZodRawShape>(file: string, shape: (context: SchemaContext) => T) =>
  defineCollection({
    loader: glob({ pattern: `${file}.md`, base: './src/content/pages' }),
    schema: (context) => z.object(shape(context)),
  });

const teamPage = page('team', ({ image }) => ({
  intro: z.string(),
  jeff: z.object({
    heading: z.string(),
    text: z.string(),
    extra: z.string().optional(),
    photo: image(),
    photoAlt: z.string(),
    photoPosition: z.string().optional(),
  }),
}));

const patientInfo = page('patient-information', () => ({
  intro: z.string(),
  firstVisit: z.array(z.string()).default([]),
  /** Empty until supplied: the page shows a TODO. */
  whatToBring: z.array(z.string()).default([]),
  /** Prices as shown on the clinic's Nookal booking page (GST included). `group` = the service heading it sits under. */
  fees: z
    .array(z.object({ group: z.string().optional(), subgroup: z.string().optional(), item: z.string(), price: z.string(), note: z.string().optional() }))
    .default([]),
  feeNotes: z.array(z.string()).default([]),
  /** Medicare (GP chronic condition management plan), DVA, NDIS, WorkCover: empty until confirmed. */
  funding: z.array(z.string()).default([]),
  privacy: z.string(),
}));

const contactPage = page('contact', () => ({
  intro: z.string(),
  callNote: z.string(),
  emailNote: z.string(),
  bookNote: z.string(),
}));

const servicesPage = page('services', () => ({
  intro: z.string(),
  helpIntro: z.string(),
  servicesIntro: z.string(),
}));

export const collections = { services, team, news, home, teamPage, patientInfo, contactPage, servicesPage };
