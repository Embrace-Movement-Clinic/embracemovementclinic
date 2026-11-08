export interface NavLink {
  label: string;
  href: string;
}

// The services menu is built from src/content/services (see Header.astro).

export const primaryLinks: NavLink[] = [
  { label: 'Classes', href: '/pilates' },
  { label: 'Team', href: '/team' },
  { label: 'Patient info', href: '/patient-information' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'All services', href: '/services' },
  { label: 'Pilates & classes', href: '/pilates' },
  { label: 'Our team', href: '/team' },
  { label: 'Patient information', href: '/patient-information' },
  { label: 'Contact', href: '/contact' },
];
