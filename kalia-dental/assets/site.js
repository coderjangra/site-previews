/* Kalia Dental preview: small progressive enhancements, no dependencies. */
(function () {
  var d = document, root = d.documentElement, WA = '918109937835', MAIL = 'kaliadental114@gmail.com';

  /* Preview banner: dismiss for this browser session */
  var bx = d.querySelector('[data-dismiss]');
  if (bx) bx.addEventListener('click', function () {
    root.classList.add('nb');
    try { sessionStorage.setItem('kd-preview-banner', 'hidden'); } catch (e) {}
  });

  /* Header shadow once the page scrolls */
  var hdr = d.querySelector('.hdr'), ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { hdr.classList.toggle('scrolled', window.scrollY > 8); ticking = false; });
  }
  if (hdr) { window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

  /* Mobile drawer */
  var btn = d.querySelector('[aria-controls="drawer"]'), dr = d.getElementById('drawer');
  if (btn && dr) {
    var panel = dr.querySelector('.panel');
    var setD = function (open) {
      dr.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      d.body.style.overflow = open ? 'hidden' : '';
      if (open) setTimeout(function () { var f = panel.querySelector('a,button'); if (f) f.focus(); }, 60);
      else btn.focus();
    };
    btn.addEventListener('click', function () { setD(true); });
    dr.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) setD(false); });
    d.addEventListener('keydown', function (e) {
      if (!dr.classList.contains('open')) return;
      if (e.key === 'Escape') { setD(false); return; }
      if (e.key === 'Tab') {
        var f = panel.querySelectorAll('a[href],button'), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* Scroll reveal */
  var els = d.querySelectorAll('.reveal');
  if (root.classList.contains('static') || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Treatments index: highlight the section in view */
  var toc = d.querySelectorAll('.toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {}, list = d.querySelector('.toc ol');
    toc.forEach(function (a) { map[a.hash.slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = map[en.target.id]; if (!a) return;
        toc.forEach(function (x) { x.removeAttribute('aria-current'); });
        a.setAttribute('aria-current', 'true');
        if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    d.querySelectorAll('.tx[id]').forEach(function (s) { so.observe(s); });
  }

  /* Map facade: load Google Maps only when asked */
  d.querySelectorAll('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = 'Google Map showing Kalia Dental, Oxford Street, Zirakpur';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      b.replaceWith(f);
    }, { once: true });
  });

  /* Enquiry form: builds a pre-filled WhatsApp message (or email) */
  var form = d.getElementById('enquiry');
  if (form) {
    var msg = function () {
      var fd = new FormData(form), lines = ['Hello Kalia Dental, I would like to book a visit.'];
      [['name', 'Name'], ['phone', 'Phone'], ['treatment', 'About'], ['date', 'Preferred date'], ['time', 'Preferred time'], ['message', 'Message']].forEach(function (p) {
        var v = String(fd.get(p[0]) || '').trim();
        if (v) lines.push(p[1] + ': ' + v);
      });
      return lines.join('\n');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg()), '_blank', 'noopener');
    });
    var em = form.querySelector('[data-email]');
    if (em) em.addEventListener('click', function () {
      if (!form.reportValidity()) return;
      location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Appointment enquiry') + '&body=' + encodeURIComponent(msg());
    });
  }
})();
