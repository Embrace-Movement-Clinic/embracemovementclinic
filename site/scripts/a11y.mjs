// Runs axe-core (WCAG 2.2 A/AA rules) against built pages at desktop and mobile widths.
// Usage: node scripts/a11y.mjs <baseUrl> /path [/path ...]
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const [baseUrl, ...paths] = process.argv.slice(2);
if (!baseUrl || paths.length === 0) {
  console.error('Usage: node scripts/a11y.mjs <baseUrl> /path [/path ...]');
  process.exit(1);
}

const browser = await chromium.launch();
let failures = 0;
for (const width of [1280, 390]) {
  // bypassCSP: the site's content security policy would otherwise stop the checker's own script.
  const context = await browser.newContext({ viewport: { width, height: 900 }, bypassCSP: true });
  const page = await context.newPage();
  for (const p of paths) {
    await page.goto(new URL(p, baseUrl).href, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const label = `${p} @${width}px`;
    if (results.violations.length === 0) {
      console.log(`✓ ${label}: no violations`);
      continue;
    }
    failures += results.violations.length;
    console.log(`✗ ${label}: ${results.violations.length} violation(s)`);
    for (const v of results.violations) {
      console.log(`  - [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes.slice(0, 5)) console.log(`      ${n.target.join(' ')}`);
    }
  }
  await context.close();
}
await browser.close();
process.exit(failures ? 1 : 0);
