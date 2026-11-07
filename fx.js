/* ============================================================
   unplug. — intro + scroll effects
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Unplugging intro ---------- */
  function finishIntro() {
    var intro = document.getElementById("intro");
    if (intro) {
      intro.classList.add("is-done");
      setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
        document.body.style.overflow = "";
      }, 600);
    }
    document.body.classList.add("is-loaded");
  }

  function runIntro() {
    var intro = document.getElementById("intro");
    if (!intro) {
      document.body.classList.add("is-loaded");
      return;
    }
    document.body.style.overflow = "hidden";
    if (reduced) {
      finishIntro();
      return;
    }
    // Hold the animation, then lift the curtain.
    setTimeout(finishIntro, 2150);
  }

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scroll-progress-bar");
  function updateProgress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var d = el.getAttribute("data-delay");
          if (d) el.style.transitionDelay = d + "ms";
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function formatCount(value, decimals) {
    decimals = decimals == null ? 0 : decimals;
    try {
      return new Intl.NumberFormat("sv-SE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    } catch (e) {
      return String(value);
    }
  }

  function initCounters() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    if (!("IntersectionObserver" in window) || !els.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      if (isNaN(target)) return;

      function finish() { el.textContent = prefix + formatCount(target, decimals) + suffix; }
      if (reduced) { finish(); return; }

      var dur = 1300;
      var start = null;
      function step(ts) {
        if (start == null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + formatCount(target * eased, decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else finish();
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Scrollspy for the landing nav ---------- */
  function initScrollspy() {
    var ids = ["how", "pricing", "proof", "faq"];
    var links = {};
    ids.forEach(function (id) {
      var link = document.querySelector('.main-nav a[href="#' + id + '"]');
      if (link) links[id] = link;
    });
    if (!("IntersectionObserver" in window)) return;

    function setActive(id) {
      Object.keys(links).forEach(function (k) {
        links[k].classList.toggle("is-active", k === id);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Parallax + progress on scroll ---------- */
  function initParallax() {
    var glow = document.querySelector(".hero-glow");
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateProgress();
        if (!reduced && glow) {
          glow.style.transform = "translateY(" + (window.scrollY * 0.18) + "px)";
        }
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- Boot ---------- */
  function boot() {
    runIntro();
    initReveal();
    initCounters();
    initScrollspy();
    initParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
