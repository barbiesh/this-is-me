import { projects, type Project } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";
import { ArrowRight, ArrowUpRight, Sparkle } from "@/components/ui/Ornaments";

// 05 — Projects. Each project gets a magazine "cover" with its own identity.
// Desktop: pinned horizontal scroll. Mobile / reduced motion: vertical stack.
export function ProjectCovers() {
  return (
    <section id="projects" data-folio="projects" aria-labelledby="projects-title" className="relative bg-ivory pt-section">
      <Container>
        <Chapter id="projects" title="Selected" italic="projects." intro="Three builds from my degree, each solving a different kind of problem." />
      </Container>

      <div className="mt-16 overflow-hidden pb-section md:mt-20" data-projects-pin>
        <div className="flex flex-col gap-10 px-5 md:w-max md:flex-row md:gap-10 md:px-12 md:pr-[20vw]" data-projects-track>
          {projects.map((p) => (
            <ProjectCover key={p.id} p={p} />
          ))}
          <div className="hidden w-[28vw] shrink-0 flex-col justify-end md:flex">
            <p className="font-heading text-h2 leading-tight">
              More on the way, <em className="text-rose">and happy to talk through these.</em>
            </p>
            <a href="#contact" className="pill-btn mt-8 self-start text-ink" data-cursor="Say hi">
              Ask me about them <ArrowRight className="arrow h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const themes = {
  pink: { bg: "bg-baby", text: "text-ink", sub: "text-ink/70", accent: "text-rose", border: "border-ink/15" },
  ink: { bg: "bg-ink", text: "text-cream", sub: "text-mist", accent: "text-blush", border: "border-cream/20" },
  cream: { bg: "bg-cream", text: "text-ink", sub: "text-muted", accent: "text-rose", border: "border-ink/15" },
} as const;

function ProjectCover({ p }: { p: Project }) {
  const t = themes[p.theme];
  return (
    <article
      className={`group relative flex min-h-[34rem] w-full shrink-0 flex-col overflow-hidden rounded-[2rem] border ${t.border} ${t.bg} ${t.text} p-7 md:h-[min(40rem,74vh)] md:w-[min(34rem,40vw)] md:p-10`}
      aria-labelledby={`${p.id}-title`}
      data-cursor="Project"
      data-reveal="up"
    >
      <header className="flex items-center justify-between">
        <span className={`label ${t.accent}`}>Project {p.no}</span>
        <span className={`label ${t.sub}`}>{p.kind}</span>
      </header>

      {/* Visual identity per project */}
      <div className="relative my-6 flex flex-1 items-center justify-center transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
        {p.id === "pumpkin-outfit" && <PumpkinTag />}
        {p.id === "complaint-classifier" && <ForestStat value={p.stat?.value} label={p.stat?.label} />}
        {p.id === "relational-database" && <SchemaSketch />}
      </div>

      <div>
        <h3 id={`${p.id}-title`} className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] leading-none">
          {p.title}
        </h3>
        <p className={`mt-4 max-w-sm ${t.sub}`}>{p.summary}</p>
        <div className={`mt-6 flex flex-wrap items-center gap-2 border-t pt-5 ${t.border}`}>
          {[...p.details, ...p.stack.filter((s) => !p.details.includes(s))].map((d) => (
            <span key={d} className={`rounded-pill border px-3 py-1 text-xs font-semibold ${t.border}`}>
              {d}
            </span>
          ))}
          {p.link ? (
            <a href={p.link} target="_blank" rel="noreferrer" className={`ml-auto inline-flex items-center gap-1 font-semibold ${t.accent} draw-link`}>
              View <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PumpkinTag() {
  return (
    <div className="relative">
      <div className="relative rotate-[-8deg] rounded-[1.5rem_1.5rem_1.5rem_1.5rem] border border-ink/20 bg-cream px-10 pb-10 pt-14 text-center transition-transform duration-700 ease-silk group-hover:rotate-[-3deg]">
        <span aria-hidden="true" className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full border border-ink/30 bg-baby" />
        <p className="label text-rose">Built in Laravel</p>
        <p className="mt-3 font-heading text-5xl italic leading-none">Pumpkin</p>
        <p className="font-heading text-3xl tracking-[0.3em]">OUTFIT</p>
        <div className="mt-6 flex justify-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest">
          <span className="rounded-pill bg-ink px-3 py-1 text-cream">Role-based</span>
          <span className="rounded-pill border border-ink/30 px-3 py-1">Access</span>
        </div>
      </div>
      <Sparkle className="absolute -right-6 -top-4 h-8 w-8 text-rose" />
    </div>
  );
}

function ForestStat({ value, label }: { value?: string; label?: string }) {
  // A tiny "forest": rows of decision trees drawn as thin strokes.
  const trees = Array.from({ length: 21 });
  return (
    <div className="relative w-full">
      <div aria-hidden="true" className="grid grid-cols-7 gap-3 opacity-40">
        {trees.map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="h-7 w-full text-blush" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3v18M12 8l-5 5M12 8l5 5M7 13l-2 4M7 13l2 4M17 13l-2 4M17 13l2 4" strokeLinecap="round" />
          </svg>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-heading text-[clamp(4rem,9vw,7rem)] leading-none text-cream">{value}</p>
        <p className="label mt-2 text-blush">{label} · Random Forest</p>
      </div>
    </div>
  );
}

function SchemaSketch() {
  return (
    <div aria-hidden="true" className="relative h-64 w-full max-w-sm">
      <svg viewBox="0 0 300 250" className="absolute inset-0 h-full w-full text-rose" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4">
        <path d="M110 55 C160 55 150 130 190 130" />
        <path d="M80 110 C80 170 120 190 150 200" />
      </svg>
      <SchemaTable name="table_a" rows={["id  PK", "name", "created_at"]} className="left-0 top-2 transition-transform duration-700 ease-silk group-hover:-translate-y-2" />
      <SchemaTable name="table_b" rows={["id  PK", "a_id  FK", "status"]} className="right-0 top-24 transition-transform duration-700 ease-silk group-hover:translate-x-2" />
      <SchemaTable name="table_c" rows={["id  PK", "b_id  FK"]} className="bottom-0 left-16 transition-transform duration-700 ease-silk group-hover:translate-y-2" />
    </div>
  );
}

function SchemaTable({ name, rows, className }: { name: string; rows: string[]; className: string }) {
  return (
    <div className={`absolute w-36 overflow-hidden rounded-xl border border-ink/20 bg-ivory text-xs ${className}`}>
      <p className="bg-blush px-3 py-1.5 font-semibold">{name}</p>
      {rows.map((r) => (
        <p key={r} className="border-t border-ink/10 px-3 py-1 font-mono text-[0.7rem] text-ink/70">
          {r}
        </p>
      ))}
    </div>
  );
}
