// Launch guard for the website editor (/admin). The editor saves staff edits to one Git branch,
// named in public/admin/config.yml. Before launch that's the preview branch; on the live site it
// must be the branch the live site is built from, or edits would never appear.
// Runs before every build. On a production build (Cloudflare Pages building the production
// branch) a mismatch stops the build; anywhere else it's only a reminder.
// Usage: node scripts/check-cms-branch.mjs
import { readFile } from 'node:fs/promises';

const productionBranch = process.env.PRODUCTION_BRANCH || 'main';
const building = process.env.CF_PAGES_BRANCH;
const config = await readFile('public/admin/config.yml', 'utf8');
const editorBranch = config.match(/^\s*branch:\s*(\S+)/m)?.[1];

if (!editorBranch) {
  console.error('✗ public/admin/config.yml has no "branch:" line under "backend:".');
  process.exit(1);
}
if (editorBranch === productionBranch) {
  console.log(`✓ Website editor saves to "${editorBranch}"`);
} else if (building === productionBranch) {
  console.error(
    `✗ This is a build of the live site ("${productionBranch}"), but the website editor saves to "${editorBranch}".\n` +
      `  Staff edits on /admin would not reach the live site. Change "branch:" in public/admin/config.yml to "${productionBranch}" (docs/editing.md, "Launch steps for the editor").`,
  );
  process.exit(1);
} else {
  console.log(`• Website editor saves to "${editorBranch}" (preview). Switch it to "${productionBranch}" at launch (docs/editing.md, "Launch steps for the editor").`);
}
