import Image from "next/image";
import { about } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";
import { Sparkle } from "@/components/ui/Ornaments";

// 02 — About. A personal letter with a pull quote and a tightly cropped portrait.
export function PersonalNote() {
  return (
    <section id="about" data-folio="about" aria-labelledby="about-title" className="relative py-section">
      <Container>
        <Chapter id="about" title="Hello," italic="I'm Barbie." />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
          {/* Portrait with tilted caption */}
          <figure className="relative md:col-span-4 md:col-start-1">
            <div className="arch relative aspect-[4/5] w-[78%] bg-baby md:w-full" data-reveal="arch">
              <div className="absolute inset-0" data-parallax-img>
                <Image
                  src="/images/barbie-closeup.jpg"
                  alt="Close-up of Barbie pulling a playful face at the camera"
                  fill
                  sizes="(min-width: 768px) 30vw, 78vw"
                  className="scale-110 object-cover object-[50%_35%]"
                />
              </div>
            </div>
            <figcaption className="absolute -bottom-5 right-0 rotate-[-4deg] rounded-pill bg-cream px-5 py-2 font-heading text-lg italic text-rose shadow-[0_0_0_1px_var(--color-line)] md:-right-8">
              Fig. 2 — the playful side
            </figcaption>
          </figure>

          <div className="md:col-span-7 md:col-start-6">
            <p className="relative mb-12 font-heading text-h2 leading-[1.05] text-ink" data-split>
              <Sparkle className="absolute -left-2 -top-8 h-6 w-6 text-blush md:-left-10 md:top-2" />
              {about.pullQuote}
            </p>
            <div className="max-w-[62ch] space-y-5 text-ink/85" data-stagger>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} data-reveal="up">
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-2 border-t border-line" data-stagger>
              {about.facts.map((f, i) => (
                <div
                  key={f.k}
                  className={`border-b border-line py-5 ${i % 2 === 0 ? "pr-4" : "border-l pl-4 md:pl-6"}`}
                  data-reveal="up"
                >
                  <dt className="label mb-2 text-muted">{f.k}</dt>
                  <dd className="font-heading text-xl md:text-2xl">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
