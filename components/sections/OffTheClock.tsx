import Image from "next/image";
import { beyond } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";
import { Pearl } from "@/components/ui/Ornaments";

// 07 — Beyond work. A mood board: detail crops from Barbie's photo + notes she fills in.
export function OffTheClock() {
  return (
    <section id="beyond-work" data-folio="beyond-work" aria-labelledby="beyond-work-title" className="relative overflow-hidden py-section">
      <Container>
        <Chapter id="beyond-work" title="Off" italic="the clock." intro={beyond.intro} />

        <div className="relative mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-8">
          {beyond.details.map((d, i) => (
            <figure
              key={d.caption}
              className={`relative ${i === 0 ? "md:col-span-4 md:mt-20" : "md:col-span-3 md:col-start-9 md:row-start-1"}`}
              data-parallax={i === 0 ? "0.08" : "-0.08"}
            >
              <div className={`relative overflow-hidden bg-blush ${i === 0 ? "arch aspect-[3/4]" : "aspect-square rounded-full"}`} data-reveal="arch">
                <Image
                  src="/images/barbie-mirror.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="scale-[2.4] object-cover transition-transform duration-700 ease-silk hover:scale-[2.6]"
                  style={{ objectPosition: d.focus, transformOrigin: d.focus }}
                />
              </div>
              <figcaption className="mt-3 font-heading text-lg italic text-muted">{d.caption}</figcaption>
            </figure>
          ))}

          <ul className="grid gap-5 md:col-span-4 md:col-start-5 md:row-start-1" data-stagger>
            {beyond.cards.map((c, i) => (
              <li
                key={c.title}
                className={`relative rounded-[1.75rem] border p-6 transition-transform duration-300 ease-silk hover:-translate-y-1 ${
                  c.placeholder ? "border-dashed border-rose/40 bg-cream/60" : "border-line bg-cream"
                } ${i === 1 ? "md:translate-x-8" : ""}`}
                data-reveal="up"
              >
                <Pearl className="absolute -top-3 right-6 h-6 w-6" />
                <h3 className="font-heading text-2xl">{c.title}</h3>
                <p className="mt-2 text-muted">{c.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
