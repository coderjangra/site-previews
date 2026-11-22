(() => {
  const d = document, h = d.documentElement;
  const WA = '917009156622', EM = 'captaindrycleanersmohali@gmail.com';
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];

  // preview banner
  $$('[data-dismiss]').forEach(b => b.addEventListener('click', () => b.closest('.pv')?.remove()));

  // header state
  const hd = d.querySelector('.hdr');
  const onScroll = () => hd && hd.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // drawer (native dialog)
  const dlg = d.getElementById('menu'), opener = d.querySelector('[data-menu-open]');
  if (dlg && opener && dlg.showModal) {
    opener.addEventListener('click', () => { dlg.showModal(); opener.setAttribute('aria-expanded', 'true'); });
    dlg.addEventListener('close', () => opener.setAttribute('aria-expanded', 'false'));
    dlg.addEventListener('click', e => {
      if (e.target === dlg || e.target.closest('[data-menu-close]')) dlg.close();
    });
    matchMedia('(min-width: 981px)').addEventListener('change', e => e.matches && dlg.open && dlg.close());
  }

  // scroll reveal
  const rv = $$('.rv');
  if (h.classList.contains('static') || !('IntersectionObserver' in window)) {
    rv.forEach(e => e.classList.add('in'));
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    rv.forEach(e => io.observe(e));
  }

  // click-to-load map
  $$('[data-map]').forEach(m => {
    const b = m.querySelector('button');
    b && b.addEventListener('click', () => {
      const f = d.createElement('iframe');
      f.src = m.dataset.map;
      f.title = 'Google Map: Captain Dry Cleaners, Sector 78, Mohali';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      m.replaceChildren(f);
    });
  });

  // date inputs: no past dates
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  $$('input[type=date]').forEach(i => { i.min = now.toISOString().slice(0, 10); });

  // prefill from ?s=
  const q = new URLSearchParams(location.search).get('s');
  if (q) $$('select[data-prefill]').forEach(s => {
    const o = [...s.options].find(o => o.value.toLowerCase() === q.toLowerCase());
    if (o) s.value = o.value;
  });

  // WhatsApp message builders
  const fmtDate = v => {
    const t = new Date(v + 'T00:00');
    return isNaN(t) ? v : t.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };
  const build = f => {
    const lines = [f.dataset.wa, ''], seen = new Set();
    $$('[data-k]', f).forEach(el => {
      const k = el.dataset.k;
      if (seen.has(k)) return;
      let v;
      if (el.type === 'checkbox' || el.type === 'radio') {
        seen.add(k);
        v = $$(`[data-k="${k}"]:checked`, f).map(x => x.value).join(', ');
      } else {
        v = el.value.trim();
        if (v && el.type === 'date') v = fmtDate(v);
      }
      if (v) lines.push(`${k}: ${v}`);
    });
    lines.push('', '(Sent from the website)');
    return lines.join('\n');
  };
  $$('form[data-wa]').forEach(f => {
    const pre = d.querySelector(`[data-preview="${f.id}"]`);
    const mail = d.querySelector(`[data-mail="${f.id}"]`);
    const sync = () => {
      const msg = build(f);
      if (pre) pre.textContent = msg;
      if (mail) mail.href = `mailto:${EM}?subject=${encodeURIComponent(f.dataset.subject || 'Enquiry')}&body=${encodeURIComponent(msg)}`;
    };
    f.addEventListener('input', sync);
    f.addEventListener('change', sync);
    sync();
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      const url = `https://wa.me/${WA}?text=${encodeURIComponent(build(f))}`;
      const w = window.open(url, '_blank');
      if (w) w.opener = null; else location.href = url;
    });
  });
})();
