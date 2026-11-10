// Single source of truth for clinic details used across the site.
// Facts come from reference/pages/*/content.md. Anything not yet supplied is
// `null` and renders as a visible TODO (see docs/to-supply.md).
// Phone, email, hours, socials, ABN and the notice banner live in clinic.json, which
// staff can edit on /admin ("Clinic details"). Name, address and booking link stay here.
import clinicJson from './clinic.json';

// The editor leaves out optional fields that are blank, so treat everything optional as possibly missing.
interface ClinicData {
  phone: string;
  email: string;
  hours?: { days: string; hours: string }[];
  notice: { enabled: boolean; message: string; linkLabel?: string; linkHref?: string; until?: string };
  instagram?: string;
  facebook?: string;
  abn?: string;
  parking?: string;
  access?: string;
}
const clinic = clinicJson as ClinicData;

/** Blank or missing values mean "not supplied yet". */
const orNull = (value?: string | null) => value?.trim() || null;

// The notice banner's end date. Brisbane has no daylight saving, so +10:00 is always correct.
const noticeUntil = orNull(clinic.notice.until);
const noticeExpired = noticeUntil ? new Date() > new Date(`${noticeUntil}T23:59:59+10:00`) : false;

/** "0434 686 261" → "tel:+61434686261" (Australian numbers). */
const telHref = (display: string) => {
  const digits = display.replace(/\D/g, '');
  return `tel:${digits.startsWith('0') ? `+61${digits.slice(1)}` : `+${digits}`}`;
};

export const site = {
  name: 'Embrace Movement Clinic',
  // Non-breaking spaces keep each full stop with its word when the line wraps.
  tagline: 'Accept\u00a0. Support\u00a0. Challenge\u00a0.',
  url: 'https://www.embracemovementclinic.com.au',

  phone: {
    // Non-breaking spaces keep the number on one line.
    display: clinic.phone.trim().replace(/\s+/g, '\u00a0'),
    href: telHref(clinic.phone),
  },

  email: {
    address: clinic.email,
    href: `mailto:${clinic.email}`,
  },

  address: {
    street: '33 Brynner Street',
    suburb: 'McDowall',
    state: 'QLD',
    postcode: '4053',
    country: 'AU',
    // The clinic's Google Maps listing (the old goo.gl short link resolved here; goo.gl is retired).
    mapUrl: 'https://maps.google.com/?cid=9375169901916606838',
    // The listing's pin, used in structured data.
    lat: -27.3852737,
    lon: 152.992564,
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=33+Brynner+Street%2C+McDowall+QLD+4053',
  },

  // Online booking (Nookal), supplied by the owner on 19 Oct 2026. Every "Book now" links
  // straight here. The old /book-now URL redirects here too: keep public/_redirects in step.
  booking: {
    url: 'https://book.nookal.com/bookings/book/EE4e4bFE-aEC6-E51D-2cda-aE95ddcBeb3E/location',
  },

  // TODO until supplied: profile URLs (docs/to-supply.md)
  socials: {
    instagram: orNull(clinic.instagram),
    facebook: orNull(clinic.facebook),
  },

  // TODO until supplied: opening hours, e.g. [{ days: 'Monday', hours: '6am – 3pm' }]
  hours: clinic.hours?.length ? clinic.hours : null,

  // TODO until supplied: ABN, parking and accessibility details
  abn: orNull(clinic.abn),
  parking: orNull(clinic.parking),
  access: orNull(clinic.access),

  // Site-wide notice banner (edited on /admin: Clinic details → Notice banner).
  // `until` (YYYY-MM-DD) hides the banner automatically after that date.
  // Everything that repeats the notice (banner, closure notes, the lines under Hours) checks
  // `active`, and carries data-hide-after={until} so it also goes on the day, before the next
  // rebuild (script in BaseLayout). That way no copy outlives the others.
  notice: {
    /** Switched on and not past its end date (as of this build). */
    active: clinic.notice.enabled && !noticeExpired,
    message: clinic.notice.message,
    link: clinic.notice.linkHref?.trim()
      ? { href: clinic.notice.linkHref.trim(), label: clinic.notice.linkLabel?.trim() || 'Read more' }
      : null,
    until: noticeUntil,
  },
};

/** Booking and patient-portal links (Nookal) open in a new tab, so the website stays open behind them. */
export const opensNewTab = (href: string) => /^https:\/\/[a-z0-9-]+\.nookal\.com\//i.test(href);
export const newTabAttrs = (href: string) => (opensNewTab(href) ? { target: '_blank', rel: 'noopener' } : {});

export const fullAddress = `${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}`;
