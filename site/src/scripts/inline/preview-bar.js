// Design tools only: show the "Previewing palette" bar while a preview from /palette is active.
(function () {
  var v = document.documentElement.dataset.preview;
  var bar = document.querySelector('[data-preview-bar]');
  if (!v || !bar) return;
  var names = JSON.parse(bar.dataset.names);
  var p = v.split('-');
  bar.querySelector('[data-preview-name]').textContent = names[p[0]] + ' + ' + names[p[1]];
  bar.hidden = false;
})();
