/* Renders the page from data.js. No need to edit. */
(() => {
const D = window.PORTFOLIO; if (!D) return;
const d = document, R = d.documentElement, $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
const L = a => Array.isArray(a) ? a : [], J = (a, f) => L(a).map(f).join("");
const e = s => String(s ?? "").replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");
const ic = n => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const put = (id, h) => { const x = d.getElementById(id); if (x) x.innerHTML = h; };
const li = a => J(a, t => `<li>${e(t)}</li>`), tags = a => `<ul class="tags">${li(a)}</ul>`, sr = t => `<span class="sr">${t}</span>`;
const host = u => String(u).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const ext = (u, t, i) => `<a href="${e(u)}" data-h="${e(host(u))}" target="_blank" rel="noopener">${ic(i)}${t}</a>`;
const mm = q => matchMedia(q), calm = mm("(prefers-reduced-motion: reduce)").matches;
const store = (k, v) => { try { return v ? localStorage.setItem(k, v) : localStorage.getItem(k); } catch (_) {} };

/* Accent preset; text for every [data-k] element */
const T = (D.themes || {})[D.theme] || {};
["light", "dark"].forEach(m => L(T[m]).forEach((c, i) => R.style.setProperty(`--a${i ? 2 : ""}${m[0]}`, c)));
const W = String(D.name).trim().split(/\s+/), last = W.pop(), first = W[0] || last;
const K = { ...D, first: W.join(" "), last, ini: first[0] + (W.length ? last[0] : ""), v: first.toLowerCase().replace(/\W/g, "") || "me", year: new Date().getFullYear() };
$$("[data-k]").forEach(x => { const v = K[x.dataset.k]; x.textContent = Array.isArray(v) ? v.join('", "') : v ?? ""; });
d.title = `${D.name} · ${D.title}`;
$('meta[name="description"]').content = `${D.name}, ${D.role}. ${D.tagline}`;

const bn = $("#banner");
if (D.banner && !store("hideBanner")) {
  bn.querySelector("p").textContent = D.banner; bn.hidden = false;
  bn.querySelector("button").onclick = () => { bn.hidden = true; store("hideBanner", 1); };
}
$$("[data-cv]").forEach(a => D.resume ? a.href = D.resume : a.remove());

/* Hero stats, about, skills */
put("h-stats", J(D.stats, ([n, t]) => `<div><dt>${e(t)}</dt><dd>${e(n)}</dd></div>`));
put("about-text", J(D.about, p => `<p>${e(p)}</p>`));
put("about-facts", J(D.facts, ([k, x]) => `<div><dt>${e(k)}</dt><dd>${e(x)}</dd></div>`));
const card = (c, i, x) => `<li class="card ${c} rv" style="--d:${i % 3}">${x}</li>`;
put("skills-grid", J(D.skills, ([g, ...s], i) => card("sk", i, `<p class="no">0${i + 1}</p><h3>${e(g)}</h3>${tags(s)}`)) +
  (L(D.learning).length ? card("sk now", 2, `<p class="no">${ic("spark")}Now</p><h3>Currently learning</h3>${tags(D.learning)}`) : ""));

/* Projects: each card gets a cover drawn from its title */
let h;
const rnd = () => (h = h * 1664525 + 1013904223 >>> 0) / 4294967296, n = m => Math.round(rnd() * m);
const art = (t, k) => {
  h = [...t].reduce((a, c) => a * 33 + c.charCodeAt(0) >>> 0, 5381);
  const P = []; let s = "";
  for (let j = 0; j < 9; j++) {
    const y = 24 + j * 14, b = 20 + n(110), cy = 30 + n(100); P.push(40 + j * 40 + " " + cy);
    s += k == 0 ? `<path d="M0 ${y}C130 ${n(160)} 270 ${n(160)} 400 ${y}"/>`
      : k == 1 ? `<circle cx="${40 + j * 40}" cy="${cy}" r="${j % 3 ? 5 : 9}" class="f${j % 3 ? 2 : 1}"/>`
      : k == 2 ? `<rect x="${12 + j * 44}" y="${150 - b}" width="26" height="${b}" rx="5" class="f${j % 4 ? 2 : 1}"/>`
      : `<circle cx="${320 + n(30)}" cy="${60 + n(40)}" r="${18 + j * 24}"/>`;
  }
  return `<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice">${k == 1 ? `<path d="M${P.join("L")}"/>` : ""}${s}</svg>`;
};
put("proj-grid", J(D.projects, (p, i) => {
  const id = "pd" + i, t = e(p.title), more = L(p.details).length;
  return `<li class="card pj rv" style="--d:${i % 2}"><div class="cover" aria-hidden="true">${art(p.title, i % 4)}</div><div class="pj-b">` +
    `<p class="meta">${e([p.year, p.kind].filter(Boolean).join(" · "))}</p><h3>${t}</h3><p class="impact">${e(p.impact)}</p>${tags(p.stack)}` +
    (more ? `<div class="more" id="${id}"><div><ul class="dots">${li(p.details)}</ul></div></div>` : "") + `<div class="acts">` +
    (more ? `<button class="tg" type="button" aria-expanded="false" aria-controls="${id}">${ic("plus")}Details${sr(" about " + t)}</button>` : "") +
    (p.github ? ext(p.github, "Code" + sr(" for " + t), "github") : "") + (p.live ? ext(p.live, "Live" + sr(" demo of " + t), "arrow") : "") + `</div></div></li>`;
}));

/* Experience, education, achievements */
put("exp-list", J(D.experience, (x, i) => `<li class="rv" style="--d:${i}"><p class="when">${e(x.period)}<span>${e(x.place)}</span></p><div class="tl-b"><h3>${e(x.role)} <span>· ${e(x.org)}</span></h3><ul class="dots">${li(x.points)}</ul>${tags(x.tags)}</div></li>`));
put("edu-list", J(D.education, (x, i) => card("ed", i, `<span class="badge">${ic("cap")}</span><p class="meta">${e(x.period)}</p><h3>${e(x.degree)}</h3><p>${e(x.school)}</p>` +
  (x.score ? `<p class="score">${e(x.score)}</p>` : "") + (x.note ? `<p class="note">${e(x.note)}</p>` : ""))));
put("ach-list", J(D.achievements, (a, i) => card("ac", i, `<span class="badge">${ic(a.icon || "star")}</span><div><h3>${e(a.title)}</h3><p>${e(a.detail)}</p><p class="meta">${e(a.year)}</p></div>`)));

/* Contact */
const mail = $("#c-mail"); mail.href = "mailto:" + D.email;
put("c-links", J(D.socials, s => `<li>${ext(s.url, `<span>${e(s.label)}</span>${ic("arrow")}`, s.icon || s.label.toLowerCase())}</li>`));
const ph = String(D.phone || ""), tel = /^\+?[\d\s-]{8,}$/.test(ph) ? `<a href="tel:${ph.replace(/[^\d+]/g, "")}">${e(ph)}</a>` : e(ph);
put("c-meta", (ph && `<p>${ic("phone")}${tel}</p>`) + (D.location ? `<p>${ic("pin")}${e(D.location)}</p>` : ""));
$("#c-copy").onclick = async ev => {
  const b = ev.currentTarget, st = $("#c-status");
  try { await navigator.clipboard.writeText(D.email); } catch (_) { location.href = mail.href; return; }
  b.classList.add("ok"); st.textContent = "Email address copied";
  setTimeout(() => { b.classList.remove("ok"); st.textContent = ""; }, 2200);
};

/* Hide empty sections (and their nav link), number the rest */
["about", "skills", "projects", "experience", "education", "achievements"].forEach(id => {
  if (L(D[id]).length) return;
  $("#" + id).hidden = true; const k = $(`.nav-links a[href="#${id}"]`); if (k) k.parentNode.hidden = true;
});
$$("main section:not([hidden]) .idx").forEach((x, i) => x.textContent = String(i + 1).padStart(2, "0"));

/* Theme toggle: follows the system until the visitor picks one */
const dark = mm("(prefers-color-scheme: dark)"), tb = $("#theme");
const isDark = () => (R.dataset.theme || (dark.matches ? "dark" : "light")) == "dark", sync = () => tb.setAttribute("aria-pressed", isDark());
tb.onclick = () => {
  const go = () => { store("theme", R.dataset.theme = isDark() ? "light" : "dark"); sync(); }, r = tb.getBoundingClientRect();
  if (calm || !d.startViewTransition) return go();
  R.style.setProperty("--vx", r.left + r.width / 2 + "px"); R.style.setProperty("--vy", r.top + r.height / 2 + "px");
  d.startViewTransition(go);
};
dark.addEventListener("change", sync); sync();

/* Scroll reveal, project details */
const IO = (f, o) => new IntersectionObserver(es => es.forEach(f), o);
const io = IO(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }, { rootMargin: "0px 0px -6% 0px" });
$$(".rv").forEach(x => calm ? x.classList.add("in") : io.observe(x));
d.addEventListener("click", ev => {
  const b = ev.target.closest(".tg"); if (!b) return;
  const open = b.getAttribute("aria-expanded") != "true";
  b.setAttribute("aria-expanded", open); d.getElementById(b.getAttribute("aria-controls")).classList.toggle("open", open);
});
})();
