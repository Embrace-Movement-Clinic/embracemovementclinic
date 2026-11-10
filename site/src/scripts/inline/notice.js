// Notice banner: stay hidden once dismissed (remembered on this device) or past its end date,
// before the page is drawn, so it never flashes up and away.
(function () {
  var n = document.getElementById('site-notice');
  if (!n) return;
  var storageKey = 'notice-dismissed:' + n.dataset.key;
  var until = n.dataset.until;
  try {
    if (localStorage.getItem(storageKey)) return n.remove();
  } catch (e) {}
  if (until && new Date() > new Date(until + 'T23:59:59+10:00')) return n.remove();
  var btn = n.querySelector('[data-dismiss]');
  btn.hidden = false;
  btn.addEventListener('click', function () {
    try {
      localStorage.setItem(storageKey, '1');
    } catch (e) {}
    n.remove();
    var logo = document.querySelector('.site-header__logo');
    if (logo) logo.focus();
  });
})();
