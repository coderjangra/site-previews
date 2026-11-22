/* Shiv Home Relocation India: preview site script (vanilla, no dependencies) */
(() => {
  'use strict';
  // Business contact. Put the WhatsApp number here (country code + number, digits only,
  // e.g. '91XXXXXXXXXX') to switch every Call / WhatsApp button and the quote form to it.
  const PHONE = '';
  const EMAIL = 'shivhomepackers@gmail.com';
  const NAME = 'Shiv Home Relocation India';

  const d = document, root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { /* storage blocked */ } }
  };

  /* preview banner */
  const pvx = $('.pv-x');
  if (pvx) pvx.addEventListener('click', () => { root.classList.add('pv-off'); store.set('shr-pv', '1', 1); });

  /* phone wiring (only when a number is configured) */
  const pretty = p => '+' + p.slice(0, 2) + ' ' + p.slice(2, 7) + ' ' + p.slice(7);
  if (PHONE) {
    root.classList.add('has-phone');
    $$('[data-call]').forEach(a => { a.href = 'tel:+' + PHONE; const t = $('.ph', a); if (t) t.textContent = 'Call ' + pretty(PHONE); });
    $$('[data-wa]').forEach(a => { a.href = 'https://wa.me/' + PHONE; a.target = '_blank'; a.rel = 'noopener'; const t = $('.ph', a); if (t) t.textContent = 'WhatsApp'; });
    $$('[data-phone-text]').forEach(el => { el.textContent = pretty(PHONE); });
  }
  const sendUrl = (lines, subject) => {
    const body = lines.join('\n');
    return PHONE ? 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(body)
      : 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  };
  const go = url => { if (PHONE) window.open(url, '_blank', 'noopener'); else location.href = url; };
  $$('[data-send-label]').forEach(el => { el.textContent = PHONE ? 'Send on WhatsApp' : 'Send by email'; });

  /* header shadow */
  const hdr = $('.hdr');
  if (hdr) {
    const onS = () => hdr.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onS, { passive: true }); onS();
  }

  /* mobile drawer */
  const btn = $('.menu-btn'), drawer = $('#drawer');
  if (btn && drawer) {
    const panel = $('.drawer-panel', drawer);
    drawer.inert = true;
    const set = open => {
      btn.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('open', open);
      root.classList.toggle('lock', open);
      drawer.inert = !open;
      if (open) setTimeout(() => $('nav a', drawer).focus(), 60);
      else if (drawer.contains(d.activeElement)) btn.focus();
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    drawer.addEventListener('click', e => { if (e.target === drawer || e.target.closest('a,[data-close]')) set(false); });
    d.addEventListener('keydown', e => {
      if (!drawer.classList.contains('open')) return;
      if (e.key === 'Escape') set(false);
      if (e.key === 'Tab') {
        const f = $$('a,button', panel), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    matchMedia('(min-width: 1000px)').addEventListener('change', e => { if (e.matches) set(false); });
  }

  /* scroll reveal */
  const rv = $$('.rv');
  const done = el => el.addEventListener('transitionend', () => el.classList.remove('rv', 'in'), { once: true });
  if (root.classList.contains('static') || reduce || !('IntersectionObserver' in window)) rv.forEach(el => el.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); done(e.target); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    rv.forEach(el => io.observe(el));
  }

  /* click-to-load map */
  $$('[data-map]').forEach(m => {
    const b = $('button', m);
    if (!b) return;
    b.addEventListener('click', () => {
      const f = d.createElement('iframe');
      f.src = m.dataset.map;
      f.title = 'Google map: ' + NAME + ' head office, Sector 26, Chandigarh';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      m.appendChild(f); m.classList.add('live'); f.focus();
    });
  });

  /* multi-step quote */
  const qf = $('#quote');
  if (qf) {
    const steps = $$('.step', qf), prog = $('.qprog'), live = $('#q-live'), out = $('#q-summary');
    const sendA = $('#q-send'), copyB = $('#q-copy'), el = qf.elements;
    let cur = 0, msg = '';
    const val = n => (el[n] && el[n].value || '').trim();
    const p = new URLSearchParams(location.search);
    ['from', 'to'].forEach(k => { const v = p.get(k); if (v) el[k].value = v.slice(0, 80); });
    const t = new Date();
    el.date.min = new Date(t - t.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    const vt = $('#q-vtype');
    qf.addEventListener('change', e => {
      if (e.target.name === 'vehicle') vt.hidden = e.target.value !== 'Yes';
      if (e.target.name === 'flex') el.date.required = !e.target.checked;
    });
    const build = () => {
      const dv = val('date');
      const fd = dv ? new Date(dv + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
      const flex = el.flex.checked;
      const veh = val('vehicle') === 'Yes' ? 'Yes' + (val('vtype') ? ', ' + val('vtype') : '') : val('vehicle');
      const rows = [['From', val('from')], ['To', val('to')], ['Home size', val('size')],
        ['Move date', fd ? fd + (flex ? ' (flexible)' : '') : 'Flexible, not fixed yet'], ['Vehicle shifting', veh],
        ['Name', val('name')], ['Phone', val('phone')], ['Notes', val('notes')]].filter(r => r[1]);
      out.textContent = '';
      rows.forEach(([k, v]) => { const a = d.createElement('dt'), b = d.createElement('dd'); a.textContent = k; b.textContent = v; out.append(a, b); });
      const lines = ['Hello ' + NAME + ', I would like a moving quote.', ''].concat(rows.map(([k, v]) => '- ' + k + ': ' + v), ['', '(Sent from the website quote form)']);
      msg = lines.join('\n');
      sendA.href = sendUrl(lines, 'Moving quote: ' + val('size') + ', ' + val('from') + ' to ' + val('to'));
      if (PHONE) { sendA.target = '_blank'; sendA.rel = 'noopener'; }
    };
    const show = (n, focus) => {
      cur = n;
      steps.forEach((s, k) => { s.hidden = k !== n; s.classList.toggle('is-active', k === n); });
      prog.style.setProperty('--p', n / (steps.length - 1));
      $$('li', prog).forEach((li, k) => {
        li.classList.toggle('done', k < n); li.classList.toggle('cur', k === n);
        if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      live.textContent = 'Step ' + (n + 1) + ' of ' + steps.length + ': ' + steps[n].dataset.title;
      if (n === steps.length - 1) build();
      if (focus) {
        const h = $('h2', steps[n]);
        h.focus({ preventScroll: true });
        const top = qf.getBoundingClientRect().top;
        if (top < 70) scrollTo({ top: scrollY + top - 100, behavior: reduce ? 'auto' : 'smooth' });
      }
    };
    const valid = s => {
      for (const f of $$('input,select,textarea', s)) {
        if (f.closest('[hidden]')) continue;
        if (!f.checkValidity()) { f.reportValidity(); return false; }
      }
      return true;
    };
    qf.addEventListener('click', e => {
      const b = e.target.closest('[data-next],[data-back]');
      if (!b) return;
      if (b.hasAttribute('data-back')) show(Math.max(0, cur - 1), true);
      else if (valid(steps[cur])) show(Math.min(steps.length - 1, cur + 1), true);
    });
    qf.addEventListener('submit', e => {
      e.preventDefault();
      if (cur < steps.length - 1) { if (valid(steps[cur])) show(cur + 1, true); }
      else if (valid(steps[cur])) { build(); go(sendA.href); }
    });
    qf.addEventListener('input', () => { if (cur === steps.length - 1) build(); });
    sendA.addEventListener('click', e => { if (!valid(steps[cur])) e.preventDefault(); else build(); });
    copyB.addEventListener('click', () => {
      build();
      const ok = () => { copyB.lastChild.textContent = 'Copied'; setTimeout(() => { copyB.lastChild.textContent = 'Copy message'; }, 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(msg).then(ok, () => {});
    });
    show(0, false);
  }

  /* contact enquiry */
  const cf = $('#enquiry');
  if (cf) cf.addEventListener('submit', e => {
    e.preventDefault();
    if (!cf.reportValidity()) return;
    const g = n => cf.elements[n].value.trim();
    const lines = ['Hello ' + NAME + ',', '', g('message'), '', 'Name: ' + g('name')];
    if (g('phone')) lines.push('Phone: ' + g('phone'));
    lines.push('Topic: ' + g('topic'), '', '(Sent from the website contact form)');
    go(sendUrl(lines, 'Enquiry: ' + g('topic')));
  });

  /* moving checklist */
  const ck = $('#checklist');
  if (ck) {
    const boxes = $$('input[type=checkbox]', ck), cnt = $('#ck-count'), bar = $('#ck-bar');
    let saved = [];
    try { saved = JSON.parse(store.get('shr-check') || '[]'); } catch (e) { saved = []; }
    boxes.forEach(b => { b.checked = saved.indexOf(b.value) > -1; });
    const upd = save => {
      const on = boxes.filter(b => b.checked);
      cnt.textContent = on.length + ' of ' + boxes.length + ' done';
      bar.style.setProperty('--v', on.length / boxes.length);
      if (save) store.set('shr-check', JSON.stringify(on.map(b => b.value)));
    };
    ck.addEventListener('change', () => upd(true)); upd(false);
    $('#ck-print').addEventListener('click', () => print());
    $('#ck-reset').addEventListener('click', () => { boxes.forEach(b => { b.checked = false; }); upd(true); });
  }
})();
