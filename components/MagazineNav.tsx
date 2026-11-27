"use client";

import { useEffect, useRef, useState } from "react";
import { folio, nav, person } from "@/content/site";
import { scrollToHash } from "@/lib/scroll";

// Fixed nav that tightens into a cream pill on scroll, with a sliding dot under the
// active section; a full-screen serif menu on mobile; and the running folio in the margin.
export function MagazineNav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [dot, setDot] = useState<{ x: number; w: number } | null>(null);

  // Track the section in view
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-folio]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.folio || "home");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Move the indicator dot
  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-target="${active}"]`);
    if (link && listRef.current) {
      const r = link.getBoundingClientRect();
      const p = listRef.current.getBoundingClientRect();
      setDot({ x: r.left - p.left + r.width / 2, w: r.width });
    } else setDot(null);
  }, [active]);

  // Lock scroll + Escape when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  const f = folio[active] ?? folio.home;

  return (
    <>
      <header className="site-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-site items-center justify-between rounded-pill px-4 py-2.5 transition-all duration-500 ease-silk [.scrolled_&]:bg-cream/85 [.scrolled_&]:shadow-[0_0_0_1px_var(--color-line)] [.scrolled_&]:backdrop-blur-md md:px-6"
        >
          <a href="#home" onClick={(e) => go(e, "#home")} className="group flex items-center gap-3" aria-label={`${person.firstName} ${person.lastName}, back to top`} data-cursor="Home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-heading text-sm italic text-cream transition-colors duration-300 group-hover:bg-rose">
              {person.monogram}
            </span>
            <span className="hidden font-heading text-lg sm:inline">
              {person.firstName} <em className="text-rose">{person.lastName}</em>
            </span>
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const id = n.href.slice(1);
              const isActive = active === id;
              return (
                <li key={n.href}>
                  <a
                    href={n.href}
                    data-target={id}
                    onClick={(e) => go(e, n.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-300 hover:text-rose ${
                      isActive ? "text-rose" : "text-ink/75"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              );
            })}
            {dot ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose transition-[left] duration-500 ease-silk"
                style={{ left: dot.x }}
              />
            ) : null}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="pill-btn hidden min-h-11 py-2 text-ink md:inline-flex lg:hidden xl:inline-flex" data-cursor="Hello">
              Let&apos;s talk
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-baby px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-silk lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="space-y-1">
          {nav.map((n, i) => (
            <li key={n.href} className="overflow-hidden">
              <a
                href={n.href}
                onClick={(e) => go(e, n.href)}
                className={`flex items-baseline gap-4 py-1 font-heading text-[clamp(2.5rem,11vw,4rem)] leading-tight transition-transform duration-700 ease-silk ${
                  open ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              >
                <span className="label text-rose">0{i + 2}</span>
                <span className={i % 2 ? "italic" : ""}>{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${person.email}`} className="draw-link self-start text-lg font-medium">
          {person.email}
        </a>
      </div>

      {/* Running folio — the magazine page number, doubles as progress */}
      <div aria-hidden="true" className="pointer-events-none fixed bottom-8 left-6 z-30 hidden origin-bottom-left -rotate-90 translate-x-4 xl:block">
        <p className="label flex items-center gap-3 whitespace-nowrap text-muted mix-blend-multiply">
          <span key={f.no} className="text-rose">
            No. {f.no}
          </span>
          <span className="h-px w-10 bg-muted/40" />
          <span>{f.name}</span>
          <span className="text-muted/60">/ 08</span>
        </p>
      </div>
    </>
  );
}
