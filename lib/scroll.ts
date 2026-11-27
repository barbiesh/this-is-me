import type Lenis from "lenis";

// Shared handle to the smooth-scroll instance so the nav can use it.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: hash === "#home" ? 0 : -16, duration: 1.4 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", hash);
  // Move focus for keyboard and screen-reader users.
  const heading = el.querySelector<HTMLElement>("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
