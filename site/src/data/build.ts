// Facts about this build, decided in astro.config.mjs.

/**
 * Design tools: the /palette colour picker (with its site-wide preview) and the /styleguide page.
 * Included when working locally and on preview deployments; left out of the live site, so a
 * visitor can't be sent a link that shows the clinic's site in other colours.
 */
export const designTools: boolean = __DESIGN_TOOLS__;
