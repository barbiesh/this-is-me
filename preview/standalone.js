/* Standalone preview runtime: the same choreography as the Next.js app
   (components/motion/Choreography.tsx, MagazineNav.tsx, SoftCursor.tsx),
   in plain JS so the page can run as one self-contained file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lenis = null;

  // ——— Nav ———
  var folio = __FOLIO__;
  var list = document.querySelector(".site-nav ul");
  var dot = document.createElement("span");
  dot.setAttribute("aria-hidden", "true");
  dot.className = "absolute -bottom-0.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose transition-[left] duration-500 ease-silk";
  dot.hidden = true;
  if (list) list.appendChild(dot);
  var folioEl = document.querySelector(".fixed.bottom-8.left-6 p");

  function setActive(id) {
    if (!list) return;
    var target = null;
    list.querySelectorAll("a[data-target]").forEach(function (a) {
      var on = a.dataset.target === id;
      a.classList.toggle("text-rose", on);
      a.classList.toggle("text-ink/75", !on);
      if (on) { a.setAttribute("aria-current", "true"); target = a; } else a.removeAttribute("aria-current");
    });
    if (target) {
      var r = target.getBoundingClientRect(), p = list.getBoundingClientRect();
      dot.style.left = r.left - p.left + r.width / 2 + "px";
      dot.hidden = false;
    } else dot.hidden = true;
    var f = folio[id] || folio.home;
    if (folioEl) {
      var spans = folioEl.querySelectorAll("span");
      spans[0].textContent = "No. " + f.no;
      spans[2].textContent = f.name;
    }
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.dataset.folio || "home"); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("[data-folio]").forEach(function (s) { io.observe(s); });

  // Mobile menu
  var menu = document.getElementById("mobile-menu");
  var btn = document.querySelector('button[aria-controls="mobile-menu"]');
  function setMenu(open) {
    if (!menu || !btn) return;
    menu.classList.toggle("[clip-path:inset(0_0_0_0)]", open);
    menu.classList.toggle("[clip-path:inset(0_0_100%_0)]", !open);
    menu.classList.toggle("pointer-events-none", !open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var bars = btn.querySelectorAll("span span");
    bars[0].classList.toggle("translate-y-1.5", open); bars[0].classList.toggle("rotate-45", open);
    bars[1].classList.toggle("-translate-y-1.5", open); bars[1].classList.toggle("-rotate-45", open);
    menu.querySelectorAll("li > a").forEach(function (a, i) {
      a.classList.toggle("translate-y-0", open);
      a.classList.toggle("translate-y-full", !open);
      a.style.transitionDelay = open ? 120 + i * 50 + "ms" : "0ms";
    });
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  }
  if (btn) btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  window.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // In-page links
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute("href");
    var el = hash.length > 1 && document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    setMenu(false);
    if (lenis) lenis.scrollTo(el, { offset: hash === "#home" ? 0 : -16, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    var h = el.querySelector("h1, h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  });

  if (reduce || !window.gsap) { root.classList.remove("motion"); return; }

  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  root.classList.add("motion-ready");

  // ——— Smooth scroll ———
  if (window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ——— Intro curtain + hero ———
  var intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  var curtain = document.querySelector(".intro-curtain");
  if (curtain) {
    intro.from(".intro-mark", { yPercent: 110, duration: 0.8 })
      .to(".intro-mark", { yPercent: -110, duration: 0.6, ease: "expo.in" }, "+=0.15")
      .to(curtain, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.1")
      .set(curtain, { display: "none" });
  }
  intro.from("[data-hero='name']", { yPercent: 110, duration: 1.3, stagger: 0.12 }, curtain ? "-=0.55" : 0)
    .from("[data-reflection]", { opacity: 0, duration: 1.4 }, "<0.4")
    .fromTo("[data-hero='arch']", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut" }, "<-0.3")
    .from("[data-hero='arch-ring']", { scale: 0.9, opacity: 0, duration: 1.2 }, "<0.5")
    .from("[data-hero='fade']", { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, "<0.1")
    .from(".site-nav", { y: -30, opacity: 0, duration: 1 }, "<");

  gsap.to("[data-reflection]", {
    filter: "blur(14px)", opacity: 0, yPercent: 30, ease: "none",
    scrollTrigger: { trigger: "#home", start: "top top", end: "bottom 30%", scrub: true },
  });

  function setupSplits() {
    gsap.utils.toArray("[data-split]").forEach(function (el) {
      var split = SplitText.create(el, { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setupSplits); else setupSplits();

  ScrollTrigger.batch("[data-reveal='up']", {
    start: "top 88%", once: true,
    onEnter: function (els) { gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true }); },
  });
  ScrollTrigger.batch("[data-reveal='fade']", {
    start: "top 90%", once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.08 }); },
  });
  gsap.utils.toArray("[data-reveal='arch']").forEach(function (el) {
    gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
  });

  var line = document.querySelector("[data-journey-line]");
  if (line) {
    gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-journey]", start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
    gsap.utils.toArray("[data-journey-dot]").forEach(function (d) {
      gsap.from(d, { scale: 0, duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: d, start: "top 70%", once: true } });
    });
  }

  gsap.matchMedia().add("(min-width: 768px)", function () {
    gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax || "0.1");
      gsap.to(el, { yPercent: speed * 100, ease: "none", scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.utils.toArray("[data-parallax-img]").forEach(function (el) {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    var track = document.querySelector("[data-projects-track]");
    var pin = document.querySelector("[data-projects-pin]");
    if (track && pin) {
      var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
      gsap.to(track, {
        x: function () { return -distance(); }, ease: "none",
        scrollTrigger: { trigger: pin, start: "center center", end: function () { return "+=" + distance(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
    }
  });

  ScrollTrigger.create({ start: 80, end: "max", onToggle: function (self) { root.classList.toggle("scrolled", self.isActive); } });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });

  // ——— Soft cursor ———
  var cur = document.querySelector("[data-soft-cursor]");
  if (cur && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cur.classList.remove("hidden"); cur.classList.add("grid");
    root.classList.add("has-cursor");
    var label = cur.querySelector("span");
    var xTo = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3" });
    var yTo = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3" });
    gsap.set(cur, { scale: 0.18, xPercent: -50, yPercent: -50 });
    window.addEventListener("pointermove", function (e) {
      xTo(e.clientX); yTo(e.clientY);
      var t = e.target.closest && e.target.closest("[data-cursor], a, button");
      var text = t && t.dataset.cursor ? t.dataset.cursor : "";
      label.textContent = text;
      label.classList.toggle("opacity-100", !!text); label.classList.toggle("opacity-0", !text);
      gsap.to(cur, { scale: text ? 1 : t ? 0.45 : 0.18, duration: 0.4, ease: "expo.out" });
    });
    document.addEventListener("pointerleave", function () { gsap.to(cur, { opacity: 0, duration: 0.3 }); });
    document.addEventListener("pointerenter", function () { gsap.to(cur, { opacity: 1, duration: 0.3 }); });
  }
})();
