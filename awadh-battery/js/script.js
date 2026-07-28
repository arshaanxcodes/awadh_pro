(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.getElementById("siteHeader");
  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  document.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* Scroll cue button */
  var scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    scrollCue.addEventListener("click", function () {
      var target = document.getElementById("about");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* Battery charge scroll meter (signature element) */
  var chargeFill = document.getElementById("chargeFill");
  function updateChargeMeter() {
    if (!chargeFill) return;
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = (doc.scrollHeight - doc.clientHeight) || 1;
    var pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    chargeFill.style.width = pct + "%";
  }
  document.addEventListener("scroll", updateChargeMeter, { passive: true });
  window.addEventListener("resize", updateChargeMeter);
  updateChargeMeter();

  /* Count-up stats */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var numEl = el.querySelector(".stat__num");
    if (!numEl) return;

    if (reduceMotion) {
      numEl.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    var start = null;
    var duration = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      numEl.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* GSAP setup */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    if (!reduceMotion) {
      /* Hero entrance timeline */
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(".hero [data-reveal]", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12
        }, 0.1);

      /* Animated voltage line drawing across hero */
      var voltLine = document.getElementById("voltLine");
      if (voltLine && voltLine.getTotalLength) {
        var len = voltLine.getTotalLength();
        voltLine.style.strokeDasharray = len;
        voltLine.style.strokeDashoffset = len;
        gsap.to(voltLine, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", delay: 0.3 });
      }

      /* Generic scroll reveals for everything else */
      var revealEls = document.querySelectorAll(".hero ~ * [data-reveal], section:not(.hero) [data-reveal]");
      revealEls.forEach(function (el) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          }
        });
      });

      /* Stagger product & why-us cards */
      ["#products .product-card", "#why-us .why-card"].forEach(function (sel) {
        var cards = document.querySelectorAll(sel);
        if (!cards.length) return;
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          scale: 0.96,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cards[0].closest("section"),
            start: "top 75%",
            once: true
          }
        });
      });
    } else {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
    }

    /* Count-up trigger */
    document.querySelectorAll(".stat[data-count]").forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: function () { animateCount(el); }
      });
    });
  } else {
    /* Fallback: no GSAP, just reveal everything */
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    document.querySelectorAll(".stat[data-count]").forEach(animateCount);
  }
})();
