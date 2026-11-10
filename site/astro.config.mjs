// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

// Design tools: the /palette colour picker (with its site-wide preview) and /styleguide.
// Included when working locally and on preview deployments; left out of the live site, which is
// the build Cloudflare Pages makes from the production branch. DESIGN_TOOLS=1 or 0 forces it.
const productionBranch = process.env.PRODUCTION_BRANCH || 'main';
const isProductionBuild = process.env.CF_PAGES_BRANCH === productionBranch;
const designTools = process.env.DESIGN_TOOLS === '1' || (process.env.DESIGN_TOOLS !== '0' && !isProductionBuild);

/** @type {import('astro').AstroIntegration} */
const designToolPages = {
  name: 'design-tool-pages',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      if (!designTools) return;
      injectRoute({ pattern: '/palette', entrypoint: './src/design/palette.astro' });
      injectRoute({ pattern: '/styleguide', entrypoint: './src/design/styleguide.astro' });
    },
  },
};

// Content security policy: browsers only run scripts that are on this list. Astro adds its own
// bundled scripts; the few inline ones live in src/scripts/inline and are approved here by their
// exact text, so editing one updates its approval automatically.
const inlineScripts = new URL('./src/scripts/inline/', import.meta.url);
const inlineScriptHashes = readdirSync(inlineScripts)
  .filter((file) => file.endsWith('.js'))
  .map((file) => /** @type {const} */ (`sha256-${createHash('sha256').update(readFileSync(new URL(file, inlineScripts))).digest('base64')}`));

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
    designToolPages,
    sitemap({
      filter: (page) => !/\/(styleguide|palette|404|news)/.test(page),
    }),
  ],
  vite: {
    define: { __DESIGN_TOOLS__: JSON.stringify(designTools) },
  },
  security: {
    csp: {
      directives: ["object-src 'none'", "base-uri 'self'"],
      scriptDirective: {
        // Cloudflare Web Analytics (the only third-party script; see the privacy policy).
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
        hashes: inlineScriptHashes,
      },
      styleDirective: {
        // Style sheets are approved by Astro; style attributes carry per-element values such as a
        // photo's shape and crop.
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
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
