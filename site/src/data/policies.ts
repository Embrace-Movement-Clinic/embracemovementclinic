// Practical facts used on several pages (classes, patient information, booking).
// Keep each fact here only, so pages can't disagree. The values live in policies.json,
// which staff can edit on /admin ("Policies and timetable"). Sources and conflicts between
// old pages are noted in docs/changes.md (cancellation and class facts: Group Exercise
// Timetable, Aug 2025; equipment: Pilates and Timetable pages and the June 2025 update;
// studio etiquette: June 2025 update and Christmas 2024 newsletter).
import policiesJson from './policies.json';

/** One class: its time, who runs it (a team file name, e.g. "nicole-saxby") and, if it isn't
 *  a small group exercise class, what it is. */
export interface TimetableClass {
  time: string;
  with?: string;
  class?: string;
}

/** One entry per day, with that day's classes in order. */
export interface TimetableDay {
  day: string;
  classes: TimetableClass[];
}

// The editor leaves out optional fields that are blank, so lists may be missing.
interface PoliciesData {
  /** howTo: how to cancel, shown after the policy (basic formatting, so it can link the patient portal and a text-message link). */
  cancellation: { paragraphs: string[]; howTo?: string };
  classFacts: { label: string; value: string }[];
  equipment: string[];
  studioEtiquette: { name: string; detail: string }[];
  booking: {
    classes: string;
    bookingCode: string;
    /** Before the clinic's number on Patient information's Call tile. */
    callText: string;
    portalUrl?: string;
    /** Under each Book now + Patient portal pair: who the portal is for (basic formatting). */
    portalNote?: string;
    /** The short version, shown when the header's Patient portal button is hovered or focused, and in the phone menu. */
    portalHint?: string;
  };
  timetable?: TimetableDay[];
  /** The first day the timetable applies (YYYY-MM-DD), shown above it. */
  timetableFrom?: string;
  classSteps: string[];
}
const data = policiesJson as PoliciesData;

export const cancellationPolicy = data.cancellation;
export const classFacts = data.classFacts;
export const equipment = data.equipment;
export const studioEtiquette = data.studioEtiquette;
export const booking = data.booking;
/** The booking code tip, split so the words "patient portal" can link to the Nookal patient portal. */
export const bookingTip = (() => {
  const phrase = 'patient portal';
  const text = data.booking.bookingCode;
  const at = text.indexOf(phrase);
  if (at < 0 || !data.booking.portalUrl) return { before: text, link: null, after: '' };
  return { before: text.slice(0, at), link: { text: phrase, href: data.booking.portalUrl }, after: text.slice(at + phrase.length) };
})();
/** "How to start classes" on the Pilates page, one line per step. */
export const classSteps = data.classSteps;

/** Minutes after midnight for a class time such as "6.00am", "4.45pm" or "6am"; null if unreadable. */
export const classMinutes = (time: string) => {
  const m = time.trim().toLowerCase().match(/^(1[0-2]|0?[1-9])(?:[.:]([0-5]\d))?\s*(am|pm)$/);
  return m ? ((Number(m[1]) % 12) + (m[3] === 'pm' ? 12 : 0)) * 60 + Number(m[2] ?? 0) : null;
};

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * The class timetable as text, tidied so a slip on /admin can't mislead anyone: days in week order
 * (a day entered twice is merged), each day's classes earliest first, and a class entered twice
 * shown once. Times that can't be read (the editor asks for e.g. "6.00am") stay, at the end of
 * their day. Anything tidied or unreadable is reported in the build log. Empty until supplied,
 * which shows a TODO (docs/to-supply.md).
 */
export const timetable: TimetableDay[] | null = (() => {
  const warn = (message: string) => console.warn(`⚠ Class timetable (/admin: Policies and timetable): ${message}`);
  const byDay = new Map<string, TimetableClass[]>();
  for (const d of data.timetable ?? []) {
    if (!d.classes?.length) continue;
    if (byDay.has(d.day)) warn(`${d.day} is entered twice; its classes are shown together.`);
    const seen = byDay.get(d.day) ?? [];
    for (const c of d.classes) {
      if (!c.time?.trim()) continue;
      if (classMinutes(c.time) === null) warn(`${d.day} ${c.time}: not a time like "6.00am" or "4.45pm".`);
      const same = (o: TimetableClass) =>
        classMinutes(o.time) === classMinutes(c.time) && (classMinutes(c.time) !== null || o.time.trim() === c.time.trim()) && o.with === c.with && (o.class?.trim() || '') === (c.class?.trim() || '');
      if (seen.some(same)) warn(`${d.day} ${c.time} is entered twice; shown once.`);
      else seen.push(c);
    }
    byDay.set(d.day, seen);
  }
  const days = [...byDay]
    .sort(([a], [b]) => weekdays.indexOf(a) - weekdays.indexOf(b))
    .map(([day, classes]) => ({ day, classes: [...classes].sort((a, b) => (classMinutes(a.time) ?? 24 * 60) - (classMinutes(b.time) ?? 24 * 60)) }));
  return days.length ? days : null;
})();

/** "Monday 4 January 2027": the first day the timetable applies, or null if not set. */
export const timetableFrom = (() => {
  const from = data.timetableFrom?.trim();
  if (!from || !/^\d{4}-\d{2}-\d{2}$/.test(from)) return null;
  return new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${from}T00:00:00Z`))
    .replace(',', '');
})();
