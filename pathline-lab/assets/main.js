/* Pathline preview: shared behaviour */
(function () {
  var d = document, h = d.documentElement;
  var WA = '917009819966', EM = 'pathlineclinicallaboratory@gmail.com';
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

  // preview banner
  var pv = $('.pv');
  if (pv) $('button', pv).addEventListener('click', function () {
    pv.remove();
    try { sessionStorage.setItem('pv', '1'); } catch (e) {}
  });

  // header state
  var hd = $('.site-head');
  if (hd) {
    var onS = function () { hd.classList.toggle('scrolled', window.scrollY > 8); };
    onS(); addEventListener('scroll', onS, { passive: true });
  }

  // mobile drawer
  var dr = $('#drawer'), mb = $('.menu-btn');
  if (dr && mb && dr.showModal) {
    mb.addEventListener('click', function () { dr.showModal(); mb.setAttribute('aria-expanded', 'true'); });
    dr.addEventListener('close', function () { mb.setAttribute('aria-expanded', 'false'); });
    dr.addEventListener('click', function (e) { if (e.target === dr || e.target.closest('[data-close]')) dr.close(); });
    addEventListener('resize', function () { if (innerWidth > 900 && dr.open) dr.close(); });
  }

  // scroll reveal
  var rv = $$('.rv,.steps');
  if ('IntersectionObserver' in window && !h.classList.contains('static')) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  // map facade: load the iframe only on request
  $$('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = 'Google Map: Pathline Clinical Laboratory, Thakurdwara Road, Manimajra';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      var n = $('.map-note', b.parentNode); if (n) n.remove();
      b.parentNode.replaceChild(f, b);
    });
  });

  // send a message by WhatsApp (default) or email
  window.PL = {
    send: function (msg, via, subject) {
      var u = via === 'mail'
        ? 'mailto:' + EM + '?subject=' + encodeURIComponent(subject || 'Enquiry') + '&body=' + encodeURIComponent(msg)
        : 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
      if (via === 'mail') { location.href = u; return; }
      var a = d.createElement('a');
      a.href = u; a.target = '_blank'; a.rel = 'noopener';
      d.body.appendChild(a); a.click(); a.remove();
    }
  };

  // contact enquiry form
  var ef = $('#enquiry');
  if (ef) ef.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (ef.elements.namedItem(n).value || '').trim(); };
    var m = 'Hello Pathline Clinical Laboratory, I have a question about: ' + v('topic') + '.\n\n' + v('msg') +
      '\n\nName: ' + v('cname') + (v('cphone') ? '\nPhone: ' + v('cphone') : '');
    PL.send(m, e.submitter && e.submitter.value, 'Website enquiry: ' + v('topic'));
  });
})();
