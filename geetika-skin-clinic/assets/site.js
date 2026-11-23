/* Dr. Geetika's Skin & Cosmetic Surgery Clinic: preview site script */
(function () {
  var d = document, h = d.documentElement;
  var WA = '919915167078'; // WhatsApp number used by the enquiry form (confirm with the clinic)

  // Preview banner: dismiss for this browser session
  var x = d.querySelector('[data-dismiss]');
  if (x) x.addEventListener('click', function () {
    h.classList.add('nb');
    try { sessionStorage.setItem('gsc-pv', 'hidden'); } catch (e) {}
  });

  // Header shadow once the page scrolls
  var hdr = d.querySelector('.hdr');
  var onScroll = function () { hdr.classList.toggle('sc', scrollY > 8); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Mobile drawer (native dialog: focus trap and Esc come for free)
  var dr = d.getElementById('drawer'), mb = d.querySelector('[data-menu]');
  if (dr && mb && dr.showModal) {
    mb.addEventListener('click', function () { dr.showModal(); mb.setAttribute('aria-expanded', 'true'); });
    dr.addEventListener('close', function () { mb.setAttribute('aria-expanded', 'false'); });
    dr.addEventListener('click', function (e) { if (e.target === dr || e.target.closest('[data-close]')) dr.close(); });
  }

  // Scroll reveal
  var rv = d.querySelectorAll('.rv');
  var still = h.classList.contains('static') || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) rv.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    rv.forEach(function (e) { io.observe(e); });
  }

  // Treatments page: highlight the section in view
  var toc = d.querySelectorAll('[data-toc] a');
  if (toc.length && 'IntersectionObserver' in window) {
    var mark = function (id) {
      toc.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        if (on && a.closest('.chips') && a.scrollIntoView) {
          var c = a.parentNode.parentNode; c.scrollTo({ left: a.parentNode.offsetLeft - 16, behavior: 'smooth' });
        }
      });
    };
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    d.querySelectorAll('.tx[id]').forEach(function (s) { so.observe(s); });
  }

  // Google Map behind a click-to-load facade
  d.querySelectorAll('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = 'Google Map: Phase 10, Mohali';
      f.setAttribute('allowfullscreen', '');
      f.referrerPolicy = 'no-referrer-when-downgrade';
      b.replaceWith(f);
    });
  });

  // Enquiry form: builds a pre-filled WhatsApp message
  var f = d.getElementById('enquiry');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.reportValidity()) return;
    var v = function (n) { return (f.elements[n].value || '').trim(); };
    var t = ["Hello, I would like to book a consultation at Dr. Geetika's Skin & Cosmetic Surgery Clinic.",
      'Name: ' + v('name'), 'Phone: ' + v('phone')];
    if (v('concern')) t.push('About: ' + v('concern'));
    if (v('when')) t.push('Preferred day/time: ' + v('when'));
    if (v('msg')) t.push('Message: ' + v('msg'));
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t.join('\n'));
    var w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
    var ok = d.getElementById('enquiry-ok');
    if (ok) ok.textContent = 'WhatsApp should now be open with your message. Press send to reach the clinic.';
  });
})();
