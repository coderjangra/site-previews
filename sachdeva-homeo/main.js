(function () {
  "use strict";
  /* Clinic phone: country code + number, digits only (e.g. "91" + 10 digits).
     Leave empty until confirmed. When set, the Call / WhatsApp buttons and the
     enquiry form switch to it automatically; otherwise the form opens an email. */
  var PHONE = "";
  var EMAIL = "dravtarsachdeva@gmail.com";

  var d = document, root = d.documentElement;
  function all(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* preview banner */
  all("[data-pvb-close]").forEach(function (b) {
    b.addEventListener("click", function () {
      root.classList.add("pvb-off");
      try { sessionStorage.setItem("pvb", "1"); } catch (e) {}
    });
  });

  /* header shadow on scroll */
  var ticking = false;
  function onScroll() { root.classList.toggle("scrolled", window.scrollY > 8); ticking = false; }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* mobile drawer */
  var burger = d.querySelector(".burger"), nav = d.getElementById("nav"), scrim = d.querySelector(".scrim");
  function setNav(open) {
    root.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      var first = nav.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 60);
    }
  }
  if (burger && nav) {
    burger.addEventListener("click", function () { setNav(!root.classList.contains("nav-open")); });
    if (scrim) scrim.addEventListener("click", function () { setNav(false); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) { setNav(false); burger.focus(); }
    });
    all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    var mq = window.matchMedia("(min-width:1024px)");
    var onMq = function (m) { if (m.matches) setNav(false); };
    if (mq.addEventListener) mq.addEventListener("change", onMq);
  }

  /* scroll reveal */
  var rv = all(".rv");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (root.classList.contains("static") || reduce || !("IntersectionObserver" in window)) {
    rv.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* phone wiring (only when a number is configured) */
  function fmt(p) { var n = p.replace(/^91/, ""); return "+91 " + n.slice(0, 5) + " " + n.slice(5); }
  if (PHONE) {
    all("[data-call]").forEach(function (a) { a.href = "tel:+" + PHONE; });
    all("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + PHONE; a.target = "_blank"; a.rel = "noopener"; });
    all("[data-phone-label]").forEach(function (s) { s.textContent = fmt(PHONE); s.classList.remove("ph"); });
  }

  /* enquiry form -> pre-filled email (or WhatsApp when PHONE is set) */
  var form = d.getElementById("enquiry-form");
  if (form) {
    var label = form.querySelector("[data-submit-label]");
    if (PHONE && label) label.textContent = "Continue on WhatsApp";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ""; };
      var lines = ["Hello Dr. Sachdeva's clinic,", "", "I would like to enquire about: " + v("reason") + ".", "", "Name: " + v("name")];
      if (v("phone")) lines.push("Phone: " + v("phone"));
      if (v("when")) lines.push("Preferred day / time: " + v("when"));
      if (v("message")) lines.push("", v("message"));
      lines.push("", "Thank you.");
      var text = lines.join("\n");
      var status = d.getElementById("form-status");
      if (PHONE) {
        if (status) status.textContent = "Opening WhatsApp with your message ready to send.";
        window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      } else {
        if (status) status.textContent = "Opening your email app with the message ready. Nothing is sent until you press send.";
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Enquiry: " + v("reason") + " (" + v("name") + ")") + "&body=" + encodeURIComponent(text);
      }
    });
  }

  /* click-to-load map */
  all("[data-map]").forEach(function (box) {
    var btn = box.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var q = box.getAttribute("data-map");
      var f = d.createElement("iframe");
      f.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
      f.title = "Google Map: " + q;
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      box.appendChild(f);
      box.classList.add("is-live");
    }, { once: true });
  });

  /* what-to-bring checklist (remembered on this device only) */
  var boxes = all("[data-ck]"), count = d.querySelector("[data-ck-count]");
  function tally() { if (count) count.textContent = boxes.filter(function (b) { return b.checked; }).length + " of " + boxes.length + " ready"; }
  boxes.forEach(function (cb) {
    var k = "sh-ck-" + cb.getAttribute("data-ck");
    if (get(k) === "1") cb.checked = true;
    cb.addEventListener("change", function () { put(k, cb.checked ? "1" : "0"); tally(); });
  });
  var reset = d.querySelector("[data-ck-reset]");
  if (reset) reset.addEventListener("click", function () {
    boxes.forEach(function (cb) { cb.checked = false; put("sh-ck-" + cb.getAttribute("data-ck"), "0"); });
    tally();
  });
  tally();
})();
