import { contact, person } from "@/content/site";
import { Container } from "@/components/ui/Chapter";
import { ArrowUpRight, Sparkle } from "@/components/ui/Ornaments";

// 08 — Contact. The one dark scene: a giant email link and one-tap contact.
export function SayHello() {
  const socials = [
    { label: "LinkedIn", href: person.linkedin, display: person.linkedinDisplay },
    person.github ? { label: "GitHub", href: person.github, display: person.github.replace(/^https?:\/\//, "") } : null,
    person.instagram ? { label: "Instagram", href: person.instagram, display: person.instagram.replace(/^https?:\/\//, "") } : null,
  ].filter(Boolean) as { label: string; href: string; display: string }[];

  return (
    <section id="contact" data-folio="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-ink pt-section text-cream">
      <div aria-hidden="true" className="absolute -right-[15vw] top-[10%] -z-10 h-[50vw] w-[50vw] rounded-full bg-rose/25 blur-3xl" data-parallax="-0.1" />
      <Container>
        <p className="label mb-8 flex items-center gap-4 text-blush" data-reveal="fade">
          <span>No. 08</span>
          <span className="h-px w-12 bg-blush/60" />
          <span>{contact.kicker}</span>
        </p>
        <h2 id="contact-title" className="text-display" data-split>
          {contact.title.split(" ")[0]} <em className="text-blush">{contact.title.split(" ").slice(1).join(" ")}.</em>
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <p className="max-w-md text-lede text-mist md:col-span-5" data-reveal="up">
            {contact.line}
          </p>
          <div className="md:col-span-7">
            <a
              href={`mailto:${person.email}`}
              className="group flex items-center justify-between gap-4 border-b border-cream/25 pb-6 font-heading text-[clamp(1.3rem,5.4vw,3.25rem)] leading-tight transition-colors duration-300 hover:text-blush"
              data-cursor="Write"
              data-reveal="up"
            >
              <span className="min-w-0 break-words">{person.email}</span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cream/30 transition-all duration-500 ease-silk group-hover:rotate-45 group-hover:border-blush group-hover:bg-blush group-hover:text-ink md:h-20 md:w-20">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </a>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2" data-stagger>
              <div data-reveal="up">
                <dt className="label mb-2 text-mist">Phone</dt>
                <dd>
                  <a href={person.phoneHref} className="draw-link text-xl">
                    {person.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div data-reveal="up">
                <dt className="label mb-2 text-mist">Based in</dt>
                <dd>
                  <a href={person.mapsUrl} target="_blank" rel="noreferrer" className="draw-link text-xl">
                    {person.address}
                  </a>
                </dd>
              </div>
              {socials.map((s) => (
                <div key={s.label} data-reveal="up">
                  <dt className="label mb-2 text-mist">{s.label}</dt>
                  <dd>
                    <a href={s.href} target="_blank" rel="noreferrer" className="draw-link text-xl">
                      {s.display}
                    </a>
                  </dd>
                </div>
              ))}
              {person.cvUrl ? (
                <div data-reveal="up">
                  <dt className="label mb-2 text-mist">CV</dt>
                  <dd>
                    <a href={person.cvUrl} download className="draw-link text-xl">
                      Download PDF
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </Container>

      {/* Footer + signature wordmark */}
      <footer className="mt-section border-t border-cream/15">
        <Container className="flex flex-col gap-4 py-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Barbie Shah · Pokhara, Nepal</p>
          <p className="flex items-center gap-2">
            <Sparkle className="h-3 w-3 text-blush" /> Designed with care, one pink detail at a time
          </p>
          <a href="#home" className="draw-link self-start md:self-auto" data-cursor="Up">
            Back to top ↑
          </a>
        </Container>
        <p aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap text-center font-heading text-[22vw] leading-[0.75] text-cream/[0.06]">
          Barbie <em>Shah</em>
        </p>
      </footer>
    </section>
  );
}
