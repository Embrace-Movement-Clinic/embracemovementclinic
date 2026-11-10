# Inline scripts

Small scripts that must run straight away, before the page is drawn, so they are written into the
page itself rather than loaded as a file. Each one is plain JavaScript in its own file here.

The site's content security policy only lets a script run if its exact text is on an approved
list. `astro.config.mjs` builds that list from every `.js` file in this folder, so a script added
or edited here is approved automatically. An inline script written anywhere else will be blocked
by the browser: put it here and include it with `<script is:inline set:html={code} />`, or use an
ordinary `<script>` in a component (Astro approves those itself).
