(function () {
  var d = document, h = d.documentElement;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preview banner: dismiss for this browsing session
  var pv = $('.pv');
  if (pv) $('button', pv).addEventListener('click', function () {
    pv.remove();
    try { sessionStorage.setItem('pvh', '1'); } catch (e) {}
  });

  // Header state on scroll
  var hdr = $('.hdr'), ticking = false;
  function onScroll() { ticking = false; hdr.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // Mobile drawer (native <dialog> gives focus trap + Esc)
  var dlg = $('#drawer'), btn = $('.menu-btn');
  if (dlg && btn && dlg.showModal) {
    btn.addEventListener('click', function () { dlg.showModal(); btn.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', function () { btn.setAttribute('aria-expanded', 'false'); });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
  }

  // Scroll reveal
  var els = $$('.reveal');
  if (reduce || h.classList.contains('static') || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Forms -> pre-filled WhatsApp message
  $$('form[data-wa]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [f.getAttribute('data-intro')];
      $$('[data-l]', f).forEach(function (x) {
        if ((x.type === 'radio' || x.type === 'checkbox') && !x.checked) return;
        var v = (x.value || '').trim();
        if (v) lines.push(x.getAttribute('data-l') + ': ' + v);
      });
      var url = 'https://wa.me/' + f.getAttribute('data-wa') + '?text=' + encodeURIComponent(lines.join('\n'));
      var a = d.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      d.body.appendChild(a); a.click(); a.remove();
      var note = $('.form-status', f);
      if (note) note.textContent = 'Opening WhatsApp with your message. If nothing happens, please call instead.';
    });
  });

  // Click-to-load map
  $$('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.closest('.map'), f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = 'Google Map of ' + b.getAttribute('data-place');
      f.setAttribute('loading', 'lazy');
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      f.setAttribute('allowfullscreen', '');
      m.appendChild(f);
      var c = $('.map-cta', m); if (c) c.remove();
      f.focus();
    });
  });
})();
