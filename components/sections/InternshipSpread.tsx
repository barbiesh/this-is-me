import { experience } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";
import { Sparkle } from "@/components/ui/Ornaments";

// 06 — Experience. A two-page magazine spread for the internship, with certificates as seals.
export function InternshipSpread() {
  return (
    <section id="experience" data-folio="experience" aria-labelledby="experience-title" className="relative bg-baby/45 py-section">
      <Container>
        <Chapter id="experience" title="Work" italic="experience." />

        <article className="mt-16 grid border-t border-ink/15 md:mt-24 md:grid-cols-12" aria-label={`${experience.role} at ${experience.company}`}>
          <div className="border-ink/15 py-10 md:col-span-6 md:border-r md:py-14 md:pr-12">
            <p className="label text-rose">{experience.dates}</p>
            <h3 className="mt-6 font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.9]" data-split>
              Himalaya <em className="text-rose">Expeditions</em>
            </h3>
            <p className="mt-8 inline-flex items-center gap-3 rounded-pill border border-ink/20 bg-cream px-5 py-2 font-semibold">
              <Sparkle className="h-3 w-3 text-rose" /> {experience.role}
            </p>
          </div>

          <div className="py-10 md:col-span-6 md:py-14 md:pl-12">
            <p className="font-heading text-h3 italic text-ink" data-reveal="up">
              {experience.lede}
            </p>
            <ol className="mt-10 space-y-8" data-stagger>
              {experience.points.map((pt, i) => (
                <li key={pt} className="grid grid-cols-[3.5rem_1fr] items-baseline border-t border-ink/10 pt-6" data-reveal="up">
                  <span className="font-heading text-4xl italic leading-none text-rose">{i + 1}</span>
                  <p className="text-ink/85">{pt}</p>
                </li>
              ))}
            </ol>
          </div>
        </article>

        <div className="mt-16 md:mt-24">
          <p className="label mb-8 text-muted">Certifications</p>
          <ul className="grid gap-6 md:grid-cols-2" data-stagger>
            {experience.certifications.map((c) => (
              <li key={c.title} className="group flex items-center gap-6 rounded-[2rem] border border-ink/15 bg-cream p-6 md:p-8" data-reveal="up">
                <Seal date={c.date} />
                <div>
                  <h3 className="font-heading text-2xl leading-tight">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Seal({ date }: { date: string }) {
  const id = `seal-${date.replace(/\s/g, "")}`;
  return (
    <div className="relative h-24 w-24 shrink-0 text-rose" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full group-hover:[animation-duration:6s]">
        <defs>
          <path id={id} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current text-[10.5px] font-semibold uppercase tracking-[0.2em]">
          <textPath href={`#${id}`}>Certified · Project Management ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-sm italic text-ink">{date}</span>
    </div>
  );
}
