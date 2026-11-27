"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// A small rose dot that trails the pointer and opens into a labelled disc over
// anything marked data-cursor. Fine pointers only; off for reduced motion.
export function SoftCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dot.current;
    if (!fine || reduce || !el) return;
    el.classList.remove("hidden");
    el.classList.add("grid");
    document.documentElement.classList.add("has-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (t?.dataset.cursor) {
        setLabel(t.dataset.cursor);
        gsap.to(el, { scale: 1, duration: 0.4, ease: "expo.out" });
      } else if (t) {
        setLabel("");
        gsap.to(el, { scale: 0.45, duration: 0.4, ease: "expo.out" });
      } else {
        setLabel("");
        gsap.to(el, { scale: 0.18, duration: 0.4, ease: "expo.out" });
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.3 });

    gsap.set(el, { scale: 0.18, xPercent: -50, yPercent: -50 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={dot}
      data-soft-cursor
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-20 w-20 place-items-center rounded-full bg-rose text-cream mix-blend-normal"
    >
      <span className={`label text-[0.62rem] transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
    </div>
  );
}
