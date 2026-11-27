"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

// Every scroll and entrance animation on the page, driven by data attributes
// on server-rendered sections. Nothing here is required to read the content.
export function Choreography() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.remove("motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);
    root.classList.add("motion-ready");

    // Smooth scroll
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const splits: SplitText[] = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ——— Intro curtain + hero entrance ———
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      const curtain = document.querySelector(".intro-curtain");
      if (curtain) {
        intro
          .from(".intro-mark", { yPercent: 110, duration: 0.8 })
          .to(".intro-mark", { yPercent: -110, duration: 0.6, ease: "expo.in" }, "+=0.15")
          .to(curtain, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.1")
          .set(curtain, { display: "none" });
      }
      intro
        .from("[data-hero='name']", { yPercent: 110, duration: 1.3, stagger: 0.12 }, curtain ? "-=0.55" : 0)
        .from("[data-reflection]", { opacity: 0, duration: 1.4 }, "<0.4")
        .fromTo("[data-hero='arch']", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut" }, "<-0.3")
        .from("[data-hero='arch-ring']", { scale: 0.9, opacity: 0, duration: 1.2 }, "<0.5")
        .from("[data-hero='fade']", { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, "<0.1")
        .from(".site-nav", { y: -30, opacity: 0, duration: 1 }, "<");

      // Signature: the reflection fogs and drifts as you leave the hero
      gsap.to("[data-reflection]", {
        filter: "blur(14px)",
        opacity: 0,
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom 30%", scrub: true },
      });

      // ——— Split headings ———
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // ——— Generic reveals (staggered when grouped) ———
      ScrollTrigger.batch("[data-reveal='up']", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });
      ScrollTrigger.batch("[data-reveal='fade']", {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.08 }),
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal='arch']").forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      // ——— Journey thread draws as you scroll ———
      const line = document.querySelector("[data-journey-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-journey]", start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-journey-dot]").forEach((dot) => {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: { trigger: dot, start: "top 70%", once: true },
          });
        });
      }

      // ——— Desktop-only: parallax + pinned horizontal projects ———
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.1");
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        const track = document.querySelector<HTMLElement>("[data-projects-track]");
        const pin = document.querySelector<HTMLElement>("[data-projects-pin]");
        if (track && pin) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "center center",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // ——— Nav state + folio ———
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onToggle: (self) => root.classList.toggle("scrolled", self.isActive),
      });
    });

    // Recalculate once fonts and images settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      splits.forEach((s) => s.revert());
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
