/* Hatchway Overseas preview — small, dependency-free */
(function () {
  var d = document, h = d.documentElement;
  var PHONE = '916239115622';
  var EMAIL = 'hatchwayoverseas@gmail.com';
  var still = h.classList.contains('static') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  // preview banner
  var pv = d.querySelector('.pv button');
  if (pv) pv.addEventListener('click', function () {
    h.classList.add('nb');
    try { sessionStorage.setItem('hw-nb', '1'); } catch (e) {}
  });

  // mobile drawer
  var btn = d.querySelector('.menu-btn'), dr = d.getElementById('drawer');
  if (btn && dr) {
    var panel = dr.querySelector('.drawer-panel'), timer;
    var focusables = function () { return panel.querySelectorAll('a,button'); };
    var open = function () {
      clearTimeout(timer);
      dr.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { dr.classList.add('open'); }); });
      btn.setAttribute('aria-expanded', 'true');
      d.body.style.overflow = 'hidden';
      setTimeout(function () { var f = focusables(); if (f[0]) f[0].focus(); }, 60);
    };
    var close = function (refocus) {
      dr.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      d.body.style.overflow = '';
      timer = setTimeout(function () { dr.hidden = true; }, still ? 0 : 380);
      if (refocus !== false) btn.focus();
    };
    btn.addEventListener('click', open);
    dr.addEventListener('click', function (e) {
      if (e.target.closest('.drawer-close') || e.target.classList.contains('drawer-bg')) close();
      else if (e.target.closest('a')) close(false);
    });
    d.addEventListener('keydown', function (e) {
      if (dr.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // scroll reveal
  var rv = d.querySelectorAll('.rv');
  if (still || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  }

  // hero SVG (SMIL) — freeze when motion is reduced
  d.querySelectorAll('svg.smil').forEach(function (s) {
    if (still && s.pauseAnimations) { s.pauseAnimations(); s.setCurrentTime(+s.dataset.t || 3); }
  });

  // split-flap course word on the boarding pass
  var flap = d.querySelector('[data-flap]');
  if (flap && !still) {
    var words = flap.getAttribute('data-flap').split('|'), i = 0;
    setInterval(function () {
      i = (i + 1) % words.length;
      flap.classList.remove('flip');
      void flap.offsetWidth;
      flap.textContent = words[i];
      flap.classList.add('flip');
    }, 2800);
  }

  // course pre-select from cards / links
  var course = d.getElementById('f-course');
  var pick = function (v) {
    if (!course || !v) return;
    for (var k = 0; k < course.options.length; k++) {
      if (course.options[k].value === v) { course.selectedIndex = k; break; }
    }
  };
  d.querySelectorAll('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { pick(a.getAttribute('data-pick')); });
  });
  var q = /[?&]course=([^&#]+)/.exec(location.search);
  if (q) pick(decodeURIComponent(q[1].replace(/\+/g, ' ')));

  // forms -> WhatsApp (with email fallback link)
  d.querySelectorAll('form[data-wa]').forEach(function (fm) {
    var mail = fm.querySelector('[data-mail]'), status = fm.querySelector('.status');
    var build = function () {
      var lines = [fm.getAttribute('data-wa')];
      fm.querySelectorAll('[data-k]').forEach(function (el) {
        var v = (el.value || '').trim();
        if (v) lines.push(el.getAttribute('data-k') + ': ' + v);
      });
      return lines.join('\n');
    };
    var sync = function () {
      if (mail) mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(fm.getAttribute('data-subj') || 'Enquiry') + '&body=' + encodeURIComponent(build());
    };
    fm.addEventListener('input', sync);
    fm.addEventListener('change', sync);
    sync();
    fm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!fm.reportValidity()) return;
      var a = d.createElement('a');
      a.href = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(build());
      a.target = '_blank';
      a.rel = 'noopener';
      d.body.appendChild(a); a.click(); a.remove();
      if (status) status.textContent = 'Opening WhatsApp with your message. Just press send.';
    });
  });

  // Google Map behind a click-to-load facade
  d.querySelectorAll('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = b.closest('.map'), f = d.createElement('iframe');
      f.src = box.getAttribute('data-src');
      f.title = 'Google Map showing Hatchway Overseas, Phase 6, Mohali';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      box.querySelector('.map-facade').replaceWith(f);
    });
  });
})();
