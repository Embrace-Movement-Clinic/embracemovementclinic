// Structured data (schema.org JSON-LD) built from the same clinic details the pages show, so
// search engines never see a phone number, address or opening hour the site doesn't.
// One clinic entity (`clinicId`) is described in full on Home and Contact; practitioner, service
// and news pages point to it. Facts only: nothing here that isn't on the page (AHPRA rules apply
// to structured data too).
import { site } from './site';

export const clinicId = `${site.url}/#clinic`;

/** A short pointer to the clinic, for `provider`, `worksFor` and `publisher`. */
export const clinicRef = {
  '@type': 'MedicalBusiness',
  '@id': clinicId,
  name: site.name,
  url: site.url,
};

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dash = /\s*(?:–|—|-|\bto\b)\s*/i;

/** "6am", "7.30am", "4:30pm", "12pm" → "06:00", "07:30", "16:30", "12:00". Anything else → null. */
const toTime = (text: string) => {
  const m = text.trim().toLowerCase().match(/^(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)$/);
  if (!m) return null;
  const hour = (Number(m[1]) % 12) + (m[3] === 'pm' ? 12 : 0);
  const minute = Number(m[2] ?? 0);
  if (Number(m[1]) < 1 || Number(m[1]) > 12 || minute > 59) return null;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

/** "Monday", "Mon", "Monday – Friday", "Mon, Wed" → day names. Anything unrecognised → []. */
const toDays = (text: string) => {
  const dayOf = (t: string) => weekdays.findIndex((d) => d.toLowerCase().startsWith(t.trim().toLowerCase().slice(0, 3)) && t.trim().length >= 3);
  const out: string[] = [];
  for (const part of text.split(/,|&|\band\b/i)) {
    const ends = part.split(dash).map(dayOf);
    if (ends.some((i) => i < 0) || ends.length > 2) return [];
    const [from, to = from] = ends;
    if (to < from) return [];
    out.push(...weekdays.slice(from, to + 1));
  }
  return out;
};

/**
 * Opening hours as typed on /admin ("7am – 11am, 1pm – 8pm") → OpeningHoursSpecification.
 * Closed days are left out, and so is any row that can't be read with certainty: better to say
 * nothing than to publish a wrong hour.
 */
export function openingHoursSpecification(hours: { days: string; hours: string }[] | null) {
  const specs: { '@type': 'OpeningHoursSpecification'; dayOfWeek: string[]; opens: string; closes: string }[] = [];
  for (const row of hours ?? []) {
    const text = row.hours.split('(')[0].trim();
    if (/closed/i.test(text)) continue;
    const days = toDays(row.days);
    const ranges = text.split(',').map((range) => range.split(dash).map(toTime));
    if (days.length === 0 || ranges.some((r) => r.length !== 2 || r[0] === null || r[1] === null || r[0] >= r[1])) continue;
    for (const [opens, closes] of ranges) {
      specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: opens!, closes: closes! });
    }
  }
  return specs;
}

/** The clinic in full. `image`: an absolute URL of a photo of the clinic. */
export function clinicNode(image?: string) {
  const socialLinks = [site.socials.instagram, site.socials.facebook].filter(Boolean);
  const hours = openingHoursSpecification(site.hours);
  return {
    '@type': ['MedicalBusiness', 'Physiotherapy'],
    '@id': clinicId,
    name: site.name,
    url: site.url,
    ...(image && { image }),
    telephone: site.phone.international,
    email: site.email.address,
    slogan: 'Accept . Support . Challenge .',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lon },
    hasMap: site.address.mapUrl,
    ...(hours.length > 0 && { openingHoursSpecification: hours }),
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
  };
}

/** A service page: what it is and who provides it. */
export function serviceNode(service: { name: string; description: string; path: string; image?: string }) {
  const url = new URL(service.path, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url,
    ...(service.image && { image: service.image }),
    provider: clinicRef,
  };
}
