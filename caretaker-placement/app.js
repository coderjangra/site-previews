/* Care Taker Placement Services — preview interactions */
(() => {
  const d = document, h = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const WA = '919501132949';
  const MAIL = 'caretakerplacementservices@gmail.com';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preview banner
  $$('[data-pv-close]').forEach(b => b.addEventListener('click', () => {
    h.classList.add('pv-off');
    try { sessionStorage.setItem('ctps-pv', '0'); } catch (e) {}
  }));

  // Header state
  const hdr = $('.hdr');
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('is-stuck', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile drawer
  const dr = $('#drawer'), mb = $('[data-menu]');
  if (dr && mb) {
    const panel = $('.drawer-panel', dr);
    let last = null, t;
    const open = () => {
      clearTimeout(t);
      last = d.activeElement;
      dr.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('nav-open')));
      mb.setAttribute('aria-expanded', 'true');
      setTimeout(() => { const f = $('a,button', panel); f && f.focus(); }, 60);
    };
    const close = () => {
      h.classList.remove('nav-open');
      mb.setAttribute('aria-expanded', 'false');
      t = setTimeout(() => { dr.hidden = true; }, reduce ? 0 : 380);
      last && last.focus && last.focus();
    };
    mb.addEventListener('click', open);
    $$('[data-close]', dr).forEach(x => x.addEventListener('click', close));
    $$('nav a', dr).forEach(a => a.addEventListener('click', () => h.classList.remove('nav-open')));
    d.addEventListener('keydown', e => {
      if (!h.classList.contains('nav-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        const f = $$('a[href],button', panel), a = f[0], z = f[f.length - 1];
        if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', e => { if (e.matches && !dr.hidden) close(); });
  }

  // Scroll reveal
  const rv = $$('.rv');
  if (!h.classList.contains('static') && !reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(x => io.observe(x));
  } else rv.forEach(x => x.classList.add('in'));

  // Hero chip: cycle example requests
  const cy = $('[data-cycle]');
  if (cy && !reduce && !h.classList.contains('static')) {
    const items = cy.dataset.cycle.split('|');
    let i = 0;
    setInterval(() => {
      cy.classList.add('out');
      setTimeout(() => { i = (i + 1) % items.length; cy.textContent = items[i]; cy.classList.remove('out'); }, 350);
    }, 2800);
  }

  // Date inputs: no past dates
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const today = now.toISOString().slice(0, 10);
  $$('input[type=date]').forEach(i => { i.min = today; });

  // Prefill role from ?role=
  const role = new URLSearchParams(location.search).get('role');
  const rs = $('#f-role');
  if (role && rs && [...rs.options].some(o => o.value === role)) rs.value = role;

  // Forms that write a WhatsApp message
  const fmtDate = v => {
    if (!v) return '';
    const [y, m, dd] = v.split('-').map(Number);
    return new Date(y, m - 1, dd).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };
  const build = f => {
    const out = [f.dataset.intro || 'Hello Care Taker Placement Services,'];
    if (f.dataset.lead) out.push(f.dataset.lead);
    out.push('');
    $$('[data-l]', f).forEach(el => {
      let v;
      if (el.tagName === 'FIELDSET') { const c = $('input:checked', el); v = c && c.value; }
      else if (el.type === 'date') v = fmtDate(el.value);
      else v = el.value.trim();
      if (v) out.push(el.dataset.l + ': ' + v);
    });
    out.push('', 'Thank you.');
    return out.join('\n');
  };
  const go = url => {
    const a = d.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    d.body.appendChild(a); a.click(); a.remove();
  };
  $$('form[data-wa]').forEach(f => {
    const pv = $(f.dataset.preview || '[data-preview]');
    const upd = () => { if (pv) pv.textContent = build(f); };
    f.addEventListener('input', upd);
    f.addEventListener('change', upd);
    upd();
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      go('https://wa.me/' + WA + '?text=' + encodeURIComponent(build(f)));
    });
    const m = $('[data-mail]', f);
    m && m.addEventListener('click', () => {
      if (!f.reportValidity()) return;
      location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(f.dataset.subject || 'Enquiry') + '&body=' + encodeURIComponent(build(f));
    });
  });

  // Click-to-load map
  $$('[data-map]').forEach(m => {
    const b = $('button', m);
    b && b.addEventListener('click', () => {
      const f = d.createElement('iframe');
      f.src = m.dataset.map;
      f.title = 'Google Map: Sector 70, Mohali';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      m.appendChild(f);
      m.classList.add('is-live');
      f.setAttribute('tabindex', '0');
      f.focus();
    }, { once: true });
  });
})();
