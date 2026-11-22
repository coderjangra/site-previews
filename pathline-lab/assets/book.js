/* Pathline preview: Book a Test page */
(function () {
  var d = document, list = d.getElementById('tests'), f = d.getElementById('bform');
  if (!list || !f) return;
  var items = Array.prototype.slice.call(list.children);
  var q = d.getElementById('q'), chips = Array.prototype.slice.call(d.querySelectorAll('.fchip'));
  var cnt = d.getElementById('count'), empty = d.getElementById('empty');
  var picked = d.getElementById('picked'), pv = d.getElementById('preview'), err = d.getElementById('berr');
  var go = d.getElementById('gobook'), gon = d.getElementById('gon'), addrf = d.getElementById('addrf');
  var el = f.elements, cat = 'all', sel = [];
  function val(n) { return (el.namedItem(n).value || '').trim(); }
  function name(li) { return li.querySelector('h3').textContent; }

  function filter() {
    var terms = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean), n = 0;
    items.forEach(function (li) {
      var hay = (name(li) + ' ' + li.dataset.k).toLowerCase();
      var ok = (cat === 'all' || (' ' + li.dataset.cat + ' ').indexOf(' ' + cat + ' ') > -1) &&
        terms.every(function (t) { return hay.indexOf(t) > -1; });
      li.hidden = !ok; if (ok) n++;
    });
    cnt.textContent = n + (n === 1 ? ' test' : ' tests') + ' shown';
    empty.hidden = n > 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      cat = c.dataset.f;
      chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      filter();
    });
  });
  q.addEventListener('input', filter);

  function fmtDate(v) {
    if (!v) return '';
    var p = v.split('-'), dt = new Date(+p[0], p[1] - 1, +p[2]);
    return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  function msg() {
    var home = el.namedItem('collect').value === 'home', L = [];
    L.push('Hello Pathline Clinical Laboratory, I would like to book a test.', '');
    L.push('Tests: ' + (sel.length ? sel.map(name).join(', ') : '(none selected)'));
    if (val('other')) L.push('Other / notes: ' + val('other'));
    L.push('Preferred date: ' + (fmtDate(val('date')) || '-'));
    L.push('Preferred time: ' + val('time'));
    L.push('Home collection: ' + (home ? 'Yes, please' : "No, I'll visit the lab"));
    if (home && val('addr')) L.push('Address: ' + val('addr'));
    L.push('Name: ' + (val('bname') || '-'));
    L.push('Phone: ' + (val('bphone') || '-'));
    var m = L.join('\n'); pv.textContent = m; return m;
  }
  function render() {
    picked.textContent = '';
    if (!sel.length) {
      var e0 = d.createElement('li'); e0.className = 'none';
      e0.textContent = 'No tests added yet. Tap “Add” on any test.'; picked.appendChild(e0);
    } else sel.forEach(function (li) {
      var x = d.createElement('li'), b = d.createElement('button');
      x.textContent = name(li);
      b.type = 'button'; b.setAttribute('aria-label', 'Remove ' + name(li));
      b.innerHTML = '<svg class="i" aria-hidden="true"><use href="assets/icons.svg#x"/></svg>';
      b.addEventListener('click', function () { toggle(li, false); });
      x.appendChild(b); picked.appendChild(x);
    });
    gon.textContent = sel.length; go.classList.toggle('on', sel.length > 0);
    if (sel.length) err.hidden = true;
    msg();
  }
  function toggle(li, on) {
    var i = sel.indexOf(li);
    if (on === undefined) on = i < 0;
    if (on && i < 0) sel.push(li);
    if (!on && i > -1) sel.splice(i, 1);
    var b = li.querySelector('.add');
    b.setAttribute('aria-pressed', String(on));
    b.querySelector('use').setAttribute('href', 'assets/icons.svg#' + (on ? 'check' : 'plus'));
    b.querySelector('.al').textContent = on ? 'Added' : 'Add';
    li.classList.toggle('sel', on);
    render();
  }
  items.forEach(function (li) { li.querySelector('.add').addEventListener('click', function () { toggle(li); }); });

  f.addEventListener('input', msg);
  f.addEventListener('change', function () {
    var home = el.namedItem('collect').value === 'home';
    addrf.hidden = !home; el.namedItem('addr').required = home; msg();
  });
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!sel.length && !val('other')) { err.hidden = false; picked.scrollIntoView({ block: 'center' }); return; }
    PL.send(msg(), e.submitter && e.submitter.value, 'Test booking request');
  });

  var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  el.namedItem('date').min = t.toISOString().slice(0, 10);

  var p = new URLSearchParams(location.search), a = p.get('add'), c = p.get('type');
  if (a) items.forEach(function (li) { if (li.dataset.id === a) toggle(li, true); });
  if (c) chips.forEach(function (x) { if (x.dataset.f === c) x.click(); });
  render(); filter();
})();
