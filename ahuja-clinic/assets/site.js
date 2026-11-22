/* Dr. Ahuja Clinic preview: menu, reveals, enquiry form, map facade, week finder */
(function () {
  // Clinic phone / WhatsApp number: 10 digits, no +91 (e.g. '9876543210').
  // While empty, call/WhatsApp buttons show a [phone number] placeholder and the form uses email.
  var PHONE = '';
  var EMAIL = 'alokahujaruchirai@gmail.com';

  var d = document, h = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* phone wiring (only once a number is configured) */
  if (PHONE) {
    var tel = 'tel:+91' + PHONE, wa = 'https://wa.me/91' + PHONE;
    var pretty = '+91 ' + PHONE.replace(/(\d{5})(\d{5})/, '$1 $2');
    $$('[data-call]').forEach(function (a) { a.href = tel; });
    $$('[data-wa]').forEach(function (a) { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-phone]').forEach(function (s) { s.textContent = pretty; s.classList.remove('ph'); });
  }

  /* preview banner */
  var pvBtn = $('.pv button');
  if (pvBtn) pvBtn.addEventListener('click', function () {
    h.classList.add('pv-x');
    try { sessionStorage.setItem('pv-x', '1'); } catch (e) {}
    var b = $('.brand'); if (b) b.focus();
  });

  /* header state */
  var hdr = $('.hdr');
  var onScroll = function () { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 8); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile drawer (native dialog: focus trap + Esc) */
  var dr = $('#drawer'), mb = $('.menu-btn');
  if (dr && mb && dr.showModal) {
    mb.addEventListener('click', function () { dr.showModal(); mb.setAttribute('aria-expanded', 'true'); });
    dr.addEventListener('close', function () { mb.setAttribute('aria-expanded', 'false'); });
    dr.addEventListener('click', function (e) {
      if (e.target === dr || e.target.closest('[data-close]') || e.target.closest('a')) dr.close();
    });
  }

  /* scroll reveal */
  var rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce && !h.classList.contains('static')) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  /* map facade: no iframe until asked */
  $$('[data-map]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = d.createElement('iframe');
      f.src = b.getAttribute('data-map');
      f.title = 'Google Map: Dr. Ahuja Clinic, Sector 18-A, Chandigarh';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      b.replaceWith(f);
    });
  });

  /* enquiry form: builds a WhatsApp message, or an email while no phone is set */
  var form = $('#enquiry');
  if (form) {
    var status = $('#enq-status'), sub = $('[data-submit-label]', form), how = $('#enq-how');
    if (PHONE) {
      if (sub) sub.textContent = 'Send on WhatsApp';
      if (how) how.textContent = 'This opens WhatsApp with your details filled in. Nothing is stored on this website.';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (n) { var el = form.elements[n]; return el ? String(el.value).trim() : ''; };
      var day = v('day');
      if (day) {
        var dt = new Date(day + 'T00:00:00');
        if (!isNaN(dt)) day = dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      }
      var lines = ['Hello, I would like to book a visit at Dr. Ahuja Clinic.', '',
        'Name: ' + v('name'), 'Phone: ' + v('phone'), 'Doctor: ' + v('doctor')];
      if (day) lines.push('Preferred day: ' + day);
      if (v('time')) lines.push('Preferred time: ' + v('time'));
      if (v('msg')) lines.push('', v('msg'));
      var body = lines.join('\n');
      if (PHONE) {
        status.textContent = 'Opening WhatsApp…';
        window.open('https://wa.me/91' + PHONE + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
      } else {
        status.textContent = 'Opening your email app…';
        location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Appointment enquiry: ' + v('name')) + '&body=' + encodeURIComponent(body);
      }
    });
  }

  /* pregnancy week finder */
  var wk = $('#wk');
  if (wk) {
    var out = $('#wk-out'), ring = $('.ring'), num = $('#wk-num'), stages = $$('[data-stage]'), go = $('#wk-go');
    var names = ['', 'First trimester', 'Second trimester', 'Third trimester'];
    var upd = function () {
      var w = +wk.value, min = +wk.min, max = +wk.max;
      var s = w <= 13 ? 1 : w <= 27 ? 2 : 3;
      out.textContent = 'Week ' + w + ' · ' + names[s] + (w > 40 ? ' (past your due date)' : '');
      wk.style.setProperty('--p', ((w - min) / (max - min) * 100) + '%');
      if (ring) ring.style.setProperty('--a', Math.min(w, 40) / 40 * 360);
      if (num) num.textContent = w;
      stages.forEach(function (el) { el.classList.toggle('now', +el.getAttribute('data-stage') === s); });
      if (go) { go.href = '#stage-' + s; go.querySelector('span').textContent = 'Read about the ' + names[s].toLowerCase(); }
    };
    wk.addEventListener('input', upd);
    upd();
  }
})();
