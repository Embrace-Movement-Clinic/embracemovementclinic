// The site's colours. Generated in OKLCH from the logo colours (18 Oct 2026), so every
// scale shares the logo's lightness steps. `sitePalette` is the combination the site uses;
// /palette previews the others. Every anchor × accent combination is AA-checked on /palette.
//
// Logo colours (sampled from assets/brand/logo-colour.png):
//   teal  #3AB593  oklch(0.697 0.119 171°)  — "embrace" and the brush circle
//   light #8BDBC5  oklch(0.834 0.085 175°)  — the lighter end of the brush stroke
//   grey  #737373  neutral                   — "MOVEMENT CLINIC"

export const logoColours = [
  { name: 'Logo teal', hex: '#3AB593', note: '“embrace” and the brush circle' },
  { name: 'Logo light teal', hex: '#8BDBC5', note: 'The light end of the brush stroke' },
  { name: 'Logo grey', hex: '#737373', note: '“MOVEMENT CLINIC”' },
];

type Scale = Record<string, string>;

export const scales: Record<string, { label: string; role: string; scale: Scale }> = {
  teal: {
    label: 'Teal (logo)',
    role: 'Brand. 500 is the logo teal (logo and highlights); 600 is used for icons. The darkest shades read as forest green, so they’re not used.',
    scale: { '50': '#EEFAF5', '100': '#DAF4EA', '200': '#BAE8D7', '300': '#90DBC1', '400': '#63C9A9', '500': '#3AB593', '600': '#179677', '700': '#04785E', '800': '#025B47', '900': '#034031', '950': '#02291E' },
  },
  coral: {
    label: 'Coral',
    role: 'Accent. Opposite the teal on the colour wheel: warm and friendly.',
    scale: { '50': '#FFF4F2', '100': '#FFE7E1', '200': '#FED0C7', '300': '#FEB3A4', '400': '#FC907B', '500': '#EB7660', '600': '#C75A47', '700': '#A24534', '800': '#7D3225', '900': '#5A2116', '950': '#3C120B' },
  },
  apricot: {
    label: 'Apricot',
    role: 'Accent. Warm, energetic and optimistic.',
    scale: { '50': '#FFF5ED', '100': '#FEE8D7', '200': '#FCD3B3', '300': '#F9BA87', '400': '#ED9E5A', '500': '#DC8635', '600': '#B86A17', '700': '#965202', '800': '#723E03', '900': '#512A00', '950': '#351A01' },
  },
  sun: {
    label: 'Sun',
    role: 'Accent. A soft golden yellow: sunny and positive.',
    scale: { '50': '#FCF6E9', '100': '#F7ECD1', '200': '#EFDBAA', '300': '#E5C576', '400': '#D6AD3C', '500': '#C29703', '600': '#9F7B01', '700': '#7F6202', '800': '#604A04', '900': '#443301', '950': '#2B2001' },
  },
  berry: {
    label: 'Berry',
    role: 'Accent. A warm pink: caring, suits pelvic and women’s health.',
    scale: { '50': '#FEF4F7', '100': '#FEE5EE', '200': '#FFCCDE', '300': '#FFADCC', '400': '#F58DB7', '500': '#E472A2', '600': '#BF5784', '700': '#9C426A', '800': '#783050', '900': '#561F38', '950': '#391123' },
  },
  lavender: {
    label: 'Lavender',
    role: 'Accent. Calm and gentle; pairs quietly with teal.',
    scale: { '50': '#F7F5FE', '100': '#EEEAFC', '200': '#DED7F8', '300': '#CCC1F2', '400': '#B6A8E6', '500': '#A291D5', '600': '#8474B3', '700': '#6A5C92', '800': '#504570', '900': '#382F50', '950': '#231D35' },
  },
  petrol: {
    label: 'Petrol',
    role: 'Dark option. The logo teal shifted towards blue, so it doesn’t read as forest green.',
    scale: { '50': '#EFF9FA', '100': '#DCF2F4', '200': '#BEE5E9', '300': '#98D5DC', '400': '#70C2CB', '500': '#4FAEB8', '600': '#338F98', '700': '#21737B', '800': '#13575E', '900': '#083D42', '950': '#02272B' },
  },
  ink: {
    label: 'Navy',
    role: 'Dark option. Sleek and clinical; makes the logo teal glow.',
    scale: { '50': '#F4F7FD', '100': '#E6EDF9', '200': '#D1DDF2', '300': '#B8CAEA', '400': '#9DB3DC', '500': '#869ECA', '600': '#6A81A9', '700': '#536689', '800': '#3E4D69', '900': '#2A354A', '950': '#192231' },
  },
  sand: {
    label: 'Sand',
    role: 'Warm neutral for backgrounds and borders.',
    scale: { '50': '#F8F6F4', '100': '#EFECE7', '200': '#E1DCD3', '300': '#D0C8BA', '400': '#BCB1A0', '500': '#A79C89', '600': '#897F6D', '700': '#6E6556', '800': '#534C40', '900': '#3A352B', '950': '#25211A' },
  },
  grey: {
    label: 'Grey (logo)',
    role: 'Neutral built from the logo grey, for text and the charcoal dark option.',
    scale: { '50': '#F6F7F7', '100': '#ECEDED', '200': '#DBDDDC', '300': '#C6CAC8', '400': '#AFB4B2', '500': '#9A9F9D', '600': '#7D8180', '700': '#636766', '800': '#4B4E4D', '900': '#343635', '950': '#202221' },
  },
};

// Shared tokens for every combination. To stay clearly apart from a local competitor's
// greens (sampled: #006838 buttons, #003721 footer, #FAF8F2 bone), teal is used for the
// logo, icons and highlights; buttons, links and dark sections use the anchor colour;
// backgrounds are a cool grey-teal rather than bone.
export const logoBase = {
  bg: '#FFFFFF',
  ink: '#161A18',
  muted: '#5C605E',
  bgAlt: '#F2F8F8',
  line: '#DCE3E3',
  icon: '#179677', // teal 600: icons and rules (3.7:1 on white; non-text needs 3:1)
  wordmarkTop: '#3AB593', // logo teal ("embrace")
  wordmarkBottom: '#737373', // logo grey ("MOVEMENT CLINIC")
};

// Anchor colours: buttons, links and eyebrows on light; footer, hero and booking bands.
// None of them is a green.
export const darks = {
  petrol: { label: 'Petrol', hex: '#083D42', deep: '#011A1D', note: 'Blue-teal, closest to the logo' },
  navy: { label: 'Navy', hex: '#192231', deep: '#080F1C', note: 'Sleek and clinical' },
  aubergine: { label: 'Aubergine', hex: '#2B2340', deep: '#130D21', note: 'Warm and distinctive' },
  charcoal: { label: 'Charcoal', hex: '#202221', deep: '#0C0E0D', note: 'Neutral, lets the teal lead' },
} as const;

// Accents: decorative colour (dots, quote marks), text and buttons on dark (300), soft tint (50).
export const accents = {
  teal: { label: 'Teal only', deco: '#3AB593', onDark: '#90DBC1', soft: '#EEFAF5' },
  coral: { label: 'Coral', deco: '#EB7660', onDark: '#FEB3A4', soft: '#FFF4F2' },
  apricot: { label: 'Apricot', deco: '#DC8635', onDark: '#F9BA87', soft: '#FFF5ED' },
  sun: { label: 'Sun', deco: '#D6AD3C', onDark: '#E5C576', soft: '#FCF6E9' },
  berry: { label: 'Berry', deco: '#E472A2', onDark: '#FFADCC', soft: '#FEF4F7' },
  lavender: { label: 'Lavender', deco: '#A291D5', onDark: '#CCC1F2', soft: '#F7F5FE' },
} as const;

export type DarkId = keyof typeof darks;
export type AccentId = keyof typeof accents;

// Suggested starting points.
export const suggestions: { name: string; dark: DarkId; accent: AccentId; why: string }[] = [
  { name: 'Lagoon', dark: 'petrol', accent: 'coral', why: 'Closest to the logo, with a warm coral to lift buttons and highlights.' },
  { name: 'Clinical calm', dark: 'navy', accent: 'teal', why: 'Navy and logo teal only. Sleek, trustworthy and very clean.' },
  { name: 'Sunrise', dark: 'charcoal', accent: 'sun', why: 'Neutral charcoal with golden highlights. Bright and energetic.' },
  { name: 'Embrace', dark: 'aubergine', accent: 'berry', why: 'Warm and caring; stands out from other local clinics.' },
];

// The palette the site uses: Petrol + Teal. The owner chose petrol on 19 Oct 2026 and changed
// the accent from coral to teal on 20 Oct 2026. To switch, change these two values (preview
// the options on /palette first).
export const sitePalette: { dark: DarkId; accent: AccentId } = { dark: 'petrol', accent: 'teal' };

// Semantic colour tokens (see src/styles/tokens.css for what each one is for).
const b = logoBase;
const baseTokens = {
  '--color-bg': b.bg,
  '--color-bg-alt': b.bgAlt,
  '--color-ink': b.ink,
  '--color-ink-muted': b.muted,
  '--color-line': b.line,
  '--color-icon': b.icon,
  '--color-on-brand': '#FFFFFF',
  '--color-on-brand-muted': 'rgb(255 255 255 / 0.8)',
  '--btn-ink': '#FFFFFF',
  '--header-bg': '#FFFFFF',
  '--header-ink': b.ink,
  '--header-line': b.line,
  '--header-hover': b.bgAlt,
  '--header-btn-ink': '#FFFFFF',
  '--header-wordmark-top': b.wordmarkTop,
  '--header-wordmark-bottom': b.wordmarkBottom,
};
const darkTokens = (d: (typeof darks)[DarkId]) => ({
  '--color-brand': d.hex,
  '--color-brand-deep': d.deep,
  '--color-link': d.hex,
  '--color-eyebrow': d.hex,
  '--color-focus': d.hex,
  '--btn-bg': d.hex,
  '--header-btn-bg': d.hex,
  '--header-focus': d.hex,
});
const accentTokens = (a: (typeof accents)[AccentId]) => ({
  '--color-accent': a.deco,
  '--color-accent-on-brand': a.onDark,
  '--color-accent-soft': a.soft,
  '--color-focus-on-brand': a.onDark,
  '--btn-dark-bg': a.onDark,
  '--btn-dark-ink': b.ink,
});
const rule = (selector: string, tokens: Record<string, string>) =>
  `${selector}{${Object.entries(tokens).map(([k, v]) => `${k}:${v}`).join(';')}}`;

/**
 * The palette as CSS, inlined in every page by BaseLayout: the site palette on :root. With
 * `previews` (design tools only), also the overrides for trying other combinations with
 * <html data-dark="…" data-accent="…">.
 */
export function themeCss(previews = false): string {
  let css = rule(':root', { ...baseTokens, ...darkTokens(darks[sitePalette.dark]), ...accentTokens(accents[sitePalette.accent]) });
  if (!previews) return css;
  for (const [id, d] of Object.entries(darks)) css += rule(`html[data-dark='${id}']`, darkTokens(d));
  for (const [id, a] of Object.entries(accents)) css += rule(`html[data-accent='${id}']`, accentTokens(a));
  return css;
}

/** Accent name for prose, e.g. "Teal" rather than the picker's "Teal only". */
export const accentName = (id: AccentId) => accents[id].label.replace(/ only$/, '');

/** Ids accepted by the preview script, e.g. "navy-teal". */
export const previewIds = Object.keys(darks).flatMap((d) => Object.keys(accents).map((a) => `${d}-${a}`));
