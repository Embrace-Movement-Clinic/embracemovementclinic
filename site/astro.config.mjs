// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fonts are self-hosted from the @fontsource-variable packages (Latin subset only).
// Astro serves them from our own domain, preloads them and generates
// metric-matched fallbacks, so there is no Google Fonts call at runtime.
/** @param {string} pkg @param {string} file */
const fontFile = (pkg, file) => `@fontsource-variable/${pkg}/files/${file}`;

export default defineConfig({
  site: 'https://www.embracemovementclinic.com.au',
  // Old Squarespace URLs have no trailing slash (e.g. /physiotherapy), so pages
  // are built as /physiotherapy.html and served without a slash on Cloudflare Pages.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(styleguide|palette|404|news)/.test(page),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Red Hat Display',
      cssVariable: '--font-red-hat-display',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: [fontFile('red-hat-display', 'red-hat-display-latin-wght-normal.woff2')], weight: '300 900', style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Red Hat Text',
      cssVariable: '--font-red-hat-text',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: [fontFile('red-hat-text', 'red-hat-text-latin-wght-normal.woff2')], weight: '300 700', style: 'normal' },
        ],
      },
    },
  ],
});
