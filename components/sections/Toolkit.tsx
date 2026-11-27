import { skills } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";
import { Sparkle } from "@/components/ui/Ornaments";

// 04 — Skills. Soft skills as a running serif ribbon; technical skills as an editorial index.
export function Toolkit() {
  const ribbon = [...skills.soft, ...skills.soft];
  return (
    <section id="skills" data-folio="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-section">
      <Container>
        <Chapter id="skills" title="The" italic="toolkit." intro={skills.intro} />
      </Container>

      {/* Soft-skill ribbon */}
      <div className="marquee relative my-16 -rotate-2 border-y border-rose/30 bg-baby py-5 md:my-24 md:py-7" aria-label="Soft skills">
        <ul className="sr-only">
          {skills.soft.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="marquee-track flex w-max items-center gap-8 whitespace-nowrap md:gap-12">
          {ribbon.map((s, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              <span className={`font-heading text-[clamp(2rem,5vw,4rem)] leading-none ${i % 2 ? "italic text-rose" : "text-ink"}`}>{s}</span>
              <Sparkle className="h-5 w-5 text-rose/60" />
            </span>
          ))}
        </div>
      </div>

      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-muted md:col-span-3">Technical index</p>
          <ul className="md:col-span-9" data-stagger>
            {skills.technical.map((g, i) => (
              <li
                key={g.group}
                className="group relative isolate grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-3 border-t border-line py-6 last:border-b md:grid-cols-[4rem_16rem_1fr] md:py-8"
                data-reveal="up"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-baby/60 transition-transform duration-500 ease-silk group-hover:scale-x-100" />
                <span className="font-heading text-lg italic text-rose">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl md:text-3xl">{g.group}</h3>
                <ul className="col-start-2 flex flex-wrap gap-2 md:col-start-3" aria-label={`${g.group} skills`}>
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-pill border border-ink/15 bg-cream/70 px-4 py-1.5 text-sm font-medium transition-colors duration-300 hover:border-rose hover:text-rose"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
