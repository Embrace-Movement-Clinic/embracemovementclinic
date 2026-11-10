// Design tools only (not on the live site): try another colour combination from /palette with
// ?palette=navy-teal, or ?palette=off to stop. The allowed combinations are listed on this
// script's data-ids attribute.
(function () {
  var ids = (document.currentScript.dataset.ids || '').split(',');
  var d = document.documentElement;
  var q = new URLSearchParams(location.search).get('palette');
  var v = null;
  try {
    if (q === 'off') localStorage.removeItem('palette-preview');
    else if (q && ids.indexOf(q) > -1) localStorage.setItem('palette-preview', q);
    v = localStorage.getItem('palette-preview');
  } catch (e) {
    v = q;
  }
  if (v && ids.indexOf(v) > -1) {
    var p = v.split('-');
    d.dataset.dark = p[0];
    d.dataset.accent = p[1];
    d.dataset.preview = v;
  }
})();
