(function () {
  "use strict";
  var C = window.BLE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Header + mobile menu ---------- */
  var header = $(".site-header");
  var mobileBar = $(".mobile-bar");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (mobileBar) mobileBar.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Config-driven contact details ---------- */
  var displayEmail = C.DISPLAY_EMAIL || C.FORM_EMAIL;
  $$("[data-cfg]").forEach(function (el) {
    var key = el.getAttribute("data-cfg");
    var wrap = el.closest("[data-cfg-wrap]");
    var val = "";
    if (key === "phone") { val = C.PHONE_DISPLAY; if (val) el.href = "tel:" + (C.PHONE_TEL || val.replace(/[^\d+]/g, "")); }
    if (key === "email") { val = displayEmail; if (val) el.href = "mailto:" + val; }
    if (key === "ig-events") { val = C.INSTAGRAM_EVENTS; if (val) el.href = val; }
    if (key === "ig-dj") { val = C.INSTAGRAM_DJ; if (val) el.href = val; }
    if (key === "soundcloud") { val = C.SOUNDCLOUD_DJ; if (val) el.href = val; }
    if (!val) { if (wrap) wrap.remove(); else el.remove(); return; }
    if (el.hasAttribute("data-cfg-text")) el.textContent = val;
  });

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Lightbox ---------- */
  var lb = $(".lightbox");
  if (lb) {
    var lbImg = $("img", lb);
    $$(".lb-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var img = $("img", item);
        lbImg.src = img.getAttribute("data-full") || img.src;
        lbImg.alt = img.alt;
        lb.classList.add("open");
        $("button", lb).focus();
      });
    });
    var close = function () { lb.classList.remove("open"); };
    $("button", lb).addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Video reels ---------- */
  $$(".reel").forEach(function (reel) {
    var v = $("video", reel), btn = $(".reel-play", reel);
    if (!v || !btn) return;
    btn.addEventListener("click", function () {
      $$(".reel video").forEach(function (o) { if (o !== v) { o.pause(); } });
      v.controls = true;
      v.muted = false;
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.muted = true; v.play(); });
    });
    v.addEventListener("play", function () { reel.classList.add("playing"); });
    v.addEventListener("pause", function () { if (v.currentTime === 0 || v.ended) reel.classList.remove("playing"); });
    v.addEventListener("ended", function () { reel.classList.remove("playing"); v.controls = false; v.currentTime = 0; });
  });

  /* ---------- Tabs ---------- */
  $$("[role=tablist]").forEach(function (list) {
    var tabs = $$("[role=tab]", list);
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); history.replaceState(null, "", "#" + t.dataset.hash); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
          n.focus(); select(n);
        }
      });
    });
    var h = location.hash.replace("#", "");
    var match = tabs.filter(function (t) { return t.dataset.hash === h; })[0];
    if (match) select(match);
  });

  /* ---------- Forms ---------- */
  var today = new Date();
  var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $$('input[type="date"]').forEach(function (d) { d.min = iso; });

  // Pre-select services from ?service= links
  var params = new URLSearchParams(location.search);
  var pre = params.get("service");
  if (pre) {
    $$('input[data-service="' + pre + '"]').forEach(function (cb) { cb.checked = true; });
  }

  function fmtDate(v) {
    if (!v) return "your event date";
    var p = v.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }

  function collect(form) {
    var data = {}, fd = new FormData(form);
    fd.forEach(function (val, key) {
      if (key === "_honey") return;
      if (data[key]) data[key] += ", " + val; else data[key] = val;
    });
    return data;
  }

  function validate(form) {
    var ok = true, first = null;
    $$(".field", form).forEach(function (f) {
      var input = $("input, select, textarea", f);
      if (!input) return;
      var bad = !input.checkValidity();
      f.classList.toggle("invalid", bad);
      if (bad) { ok = false; if (!first) first = input; }
    });
    var groupReq = $$("[data-require-one]", form);
    groupReq.forEach(function (g) {
      var any = $$("input:checked", g).length > 0;
      var err = $(".group-err", g.parentNode);
      if (err) err.style.display = any ? "none" : "block";
      if (!any) { ok = false; if (!first) first = $("input", g); }
    });
    if (first) { first.focus({ preventScroll: true }); first.scrollIntoView({ behavior: "smooth", block: "center" }); }
    return ok;
  }

  $$("form.lux-form").forEach(function (form) {
    $$("input, select, textarea", form).forEach(function (i) {
      i.addEventListener("input", function () { var f = i.closest(".field"); if (f && i.checkValidity()) f.classList.remove("invalid"); });
    });
    $$("[data-require-one] input", form).forEach(function (i) {
      i.addEventListener("change", function () { var g = i.closest("[data-require-one]"); var err = $(".group-err", g.parentNode); if (err && $$("input:checked", g).length) err.style.display = "none"; });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form._honey && form._honey.value) return;
      if (!validate(form)) return;

      var kind = form.getAttribute("data-kind") || "event";
      var data = collect(form);
      var name = (data["Full Name"] || "").split(" ")[0] || "there";
      var type = data["Event Profile"] || data["Event Type"] || "event";
      var date = fmtDate(data["Event Date"]);
      var subject = {
        event: "New Custom Event Proposal Request — " + (data["Full Name"] || ""),
        dj: "New DJ Booking Request — " + (data["Full Name"] || ""),
        contact: "New Website Message — " + (data["Full Name"] || "")
      }[kind];

      var auto = kind === "contact"
        ? "Hi " + name + ", thank you for reaching out to Biggest Little Events Co! A member of our team will reply personally within 24–48 hours. — Biggest Little Events Co, Reno NV"
        : kind === "dj"
        ? "Hi " + name + ", thank you for sharing your upcoming timeline! We have officially secured your DJ booking request for your " + type + " on " + date + ". Every proposal we curate is hand-crafted, and we will deliver your custom entertainment blueprint directly to your inbox within 24-48 hours. Want the complete experience? Ask us about pairing your DJ with our decor rentals, bartending staff, and exclusive VIP Black Table Service. — Biggest Little Events Co"
        : "Hi " + name + ", thank you for sharing your upcoming timeline! We have officially secured your custom inquiry form for your " + type + " on " + date + ". Every proposal we curate is hand-crafted, and we will deliver your itemized blueprint directly to your inbox within 24-48 hours. Want to elevate your head tables to absolute luxury? Ask us about our exclusive VIP Black Table Service with 1 to 2 elite cocktail servers assigned entirely to your VIP circle. — Biggest Little Events Co";

      var btn = $("button[type=submit]", form);
      var errBox = $(".form-error", form.parentNode);
      var success = $(".form-success", form.parentNode);
      if (errBox) errBox.classList.remove("show");

      function done() {
        var nameSlot = success && $("[data-name]", success);
        if (nameSlot) nameSlot.textContent = name;
        var dateSlot = success && $("[data-date]", success);
        if (dateSlot) dateSlot.textContent = data["Event Date"] ? date : "your date";
        form.style.display = "none";
        if (success) { success.classList.add("show"); success.scrollIntoView({ behavior: "smooth", block: "center" }); }
      }

      if (!C.FORM_EMAIL) {
        // Fallback: open the visitor's email app with everything pre-filled.
        var body = Object.keys(data).filter(function (k) { return k.charAt(0) !== "_"; })
          .map(function (k) { return k + ": " + data[k]; }).join("\n");
        location.href = "mailto:" + (displayEmail || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        done();
        return;
      }

      var payload = Object.assign({}, data, {
        _subject: subject,
        _template: "table",
        _captcha: "false"
      });
      if (C.SEND_AUTORESPONSE && data.email) payload._autoresponse = auto;

      btn.classList.add("loading");
      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(C.FORM_EMAIL), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          btn.classList.remove("loading");
          if (res.ok && String(res.j.success) !== "false") done();
          else throw new Error(res.j && res.j.message);
        })
        .catch(function () {
          btn.classList.remove("loading");
          if (errBox) errBox.classList.add("show");
        });
    });
  });
})();
