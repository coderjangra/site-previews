/* Associated Biotech preview: shared behaviour */
(function () {
  var d = document, h = d.documentElement, EM = 'biotechassociated@gmail.com';
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

  // preview banner
  var pv = $('.pv');
  if (pv) $('button', pv).addEventListener('click', function () {
    pv.remove();
    try { sessionStorage.setItem('pv', '1'); } catch (e) {}
  });

  // header shadow on scroll
  var hd = $('.hd');
  if (hd) {
    var onS = function () { hd.classList.toggle('sc', window.scrollY > 8); };
    onS(); addEventListener('scroll', onS, { passive: true });
  }

  // mobile drawer
  var dr = $('#drawer'), mb = $('.mb');
  if (dr && mb && dr.showModal) {
    mb.addEventListener('click', function () { dr.showModal(); mb.setAttribute('aria-expanded', 'true'); });
    dr.addEventListener('close', function () { mb.setAttribute('aria-expanded', 'false'); });
    dr.addEventListener('click', function (e) { if (e.target === dr || e.target.closest('[data-close]')) dr.close(); });
    addEventListener('resize', function () { if (innerWidth > 1079 && dr.open) dr.close(); });
  }

  // scroll reveal
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !h.classList.contains('static')) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  // click-to-load map
  $$('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = b.getAttribute('data-title') || 'Map';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });
  });

  // enquiry forms -> pre-filled email (no phone number is known yet)
  $$('form[data-mail]').forEach(function (f) {
    var flds = $$('[data-l]', f), slip = d.getElementById(f.getAttribute('data-slip') || ''), st = $('.fst', f);
    function vals() {
      return flds.map(function (el) {
        var v = el.value.trim();
        if (el.tagName === 'SELECT' && !el.value) v = '';
        return [el.getAttribute('data-l'), v, el.name];
      });
    }
    function upd() {
      if (!slip) return;
      vals().forEach(function (r) {
        var dd = $('[data-k="' + r[2] + '"]', slip);
        if (!dd) return;
        dd.textContent = r[1] || '—';
        dd.classList.toggle('e', !r[1]);
      });
    }
    f.addEventListener('input', upd);
    f.addEventListener('change', upd);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var v = vals(), co = f.elements.company ? f.elements.company.value.trim() : '';
      var lines = v.filter(function (r) { return r[1]; }).map(function (r) { return r[0] + ': ' + r[1]; });
      var subj = f.getAttribute('data-mail') + (co ? ' - ' + co : '');
      var body = 'Hello Associated Biotech team,\n\n' + lines.join('\n') + '\n\nPlease reply with the next steps.\n\nThank you.';
      location.href = 'mailto:' + EM + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
      if (st) st.textContent = 'Your email app should now open with this enquiry filled in. If it does not, write to ' + EM + '.';
    });
    upd();
  });
})();
