/* Dr. Shilva · Ashirwad Gynae Clinic · preview script */
(function () {
  var d = document, h = d.documentElement, WA = '919877181151';

  /* preview banner */
  var pv = d.querySelector('.pv button');
  if (pv) pv.addEventListener('click', function () {
    h.classList.add('pv-off');
    try { sessionStorage.setItem('pv-off', '1'); } catch (e) {}
  });

  /* header shadow */
  var hd = d.querySelector('.hd');
  function onScroll() { if (hd) hd.classList.toggle('sc', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* drawer */
  var btn = d.querySelector('.menu-btn'), dr = d.getElementById('drawer');
  function setDrawer(open) {
    if (!dr) return;
    dr.classList.toggle('open', open);
    dr.inert = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    h.classList.toggle('lock', open);
    if (open) dr.querySelector('.x').focus(); else btn.focus();
  }
  if (btn && dr) {
    btn.addEventListener('click', function () { setDrawer(true); });
    dr.addEventListener('click', function (e) {
      if (e.target.closest('.x') || e.target.closest('a') || e.target.classList.contains('scrim')) setDrawer(false);
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dr.classList.contains('open')) setDrawer(false);
    });
  }

  /* scroll reveal */
  var items = d.querySelectorAll('.rv');
  var still = h.classList.contains('static') || !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* map facades: the iframe loads only after a click */
  d.querySelectorAll('.map[data-q]').forEach(function (m) {
    m.addEventListener('click', function () {
      if (m.querySelector('iframe')) return;
      var f = d.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(m.dataset.q) + '&output=embed';
      f.title = m.dataset.title || 'Map';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      var b = m.querySelector('.cta');
      if (b) b.remove();
      m.appendChild(f);
      m.style.cursor = 'default';
      f.focus();
    });
  });

  /* enquiry form: builds a WhatsApp message, nothing is stored */
  var form = d.getElementById('enquiry');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, first = null;
    form.querySelectorAll('[required]').forEach(function (el) {
      var bad = !el.value.trim() || (el.type === 'tel' && el.value.replace(/\D/g, '').length < 10);
      el.closest('.field').classList.toggle('bad', bad);
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) { ok = false; first = first || el; }
    });
    if (!ok) { first.focus(); return; }
    var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
    var lines = [
      'Hello Dr. Shilva, I would like to book an appointment.',
      '',
      'Name: ' + v('name'),
      'Phone: ' + v('phone'),
      'Reason for visit: ' + v('reason'),
      'Preferred place: ' + v('place')
    ];
    if (v('day')) lines.push('Preferred day: ' + v('day'));
    if (v('msg')) lines.push('Note: ' + v('msg'));
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    var w = window.open(url, '_blank', 'noopener');
    if (!w) window.location.href = url;
  });
})();
