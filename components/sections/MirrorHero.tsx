import Image from "next/image";
import { hero, person } from "@/content/site";
import { Pearl, Sparkle } from "@/components/ui/Ornaments";

// 01 — Home. The name and its reflection, the portrait in an arched mirror.
export function MirrorHero() {
  return (
    <section
      id="home"
      data-folio="home"
      aria-labelledby="home-title"
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 md:pt-32"
    >
      {/* Soft pink wash */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -right-[20vw] -top-[25vw] h-[70vw] w-[70vw] rounded-full bg-baby/80 blur-3xl" data-parallax="-0.15" />
        <div className="absolute -bottom-[20vw] -left-[15vw] h-[45vw] w-[45vw] rounded-full bg-blush/40 blur-3xl" data-parallax="0.1" />
      </div>

      <div className="mx-auto grid w-full max-w-site grid-cols-12 gap-x-4 px-5 md:px-12">
        <p className="label col-[1/-1] row-start-1 mb-8 flex items-center gap-3 text-rose md:col-[1/7]" data-hero="fade">
          <Sparkle className="h-3 w-3" />
          {hero.kicker}
        </p>

        {/* Portrait — arched mirror */}
        <div className="relative col-[3/11] row-start-3 mt-10 sm:col-[4/10] md:col-[8/12] md:row-[1/4] md:mt-0 md:self-start">
          <div className="arch absolute -inset-3 -z-10 border border-rose/40 md:-inset-4" aria-hidden="true" data-hero="arch-ring" />
          <div className="arch relative aspect-[4/5.4] bg-blush" data-hero="arch">
            <div className="absolute inset-0" data-parallax-img>
              <Image
                src="/images/barbie-mirror.jpg"
                alt="Barbie Shah taking a mirror selfie in a pink and lilac room, wearing a red top and pearl bracelet"
                fill
                priority
                sizes="(min-width: 768px) 32vw, 66vw"
                className="scale-110 object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <Pearl className="float-y absolute -left-6 top-[18%] h-10 w-10 md:-left-10 md:h-14 md:w-14" />
          <Pearl className="float-y absolute -right-3 bottom-[22%] h-6 w-6 [animation-delay:-2s]" />
          <Sparkle className="spin-slow absolute -right-6 -top-6 h-10 w-10 text-rose md:-right-10 md:h-14 md:w-14" />
        </div>

        {/* Name + reflection */}
        <div className="pointer-events-none relative z-10 col-[1/-1] row-start-2 md:row-start-2 md:mt-[2vw]">
          <h1 id="home-title" className="text-display text-ink">
            <span className="sr-only">
              {person.firstName} {person.lastName}
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span className="block" data-hero="name">
                {person.firstName}
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] pl-[12vw] md:pl-[9vw]">
              <em className="block text-rose" data-hero="name">
                {person.lastName}.
              </em>
            </span>
          </h1>
          {/* The reflection — fogs over as you scroll */}
          <div aria-hidden="true" className="reflection pointer-events-none -mt-[0.2em] select-none text-display text-ink/90" data-reflection>
            <span className="block pl-[12vw] md:pl-[9vw]">
              <em className="text-rose">{person.lastName}.</em>
            </span>
          </div>
        </div>

        <div className="relative z-10 col-[1/-1] row-start-4 mt-12 grid gap-6 pb-16 md:col-[1/8] lg:col-[1/7] md:row-start-3 md:-mt-[2vw] md:gap-8 md:pb-0">
          <p className="max-w-md text-lede text-ink" data-hero="fade">
            {hero.intro}
          </p>
          <p className="font-heading text-h3 italic text-rose" data-hero="fade">
            “{hero.tagline}”
          </p>
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted lg:flex"
        data-hero="fade"
        data-cursor="Scroll"
      >
        <span className="label">{hero.scroll}</span>
        <span className="relative h-14 w-px overflow-hidden bg-line">
          <span className="scroll-cue-line absolute inset-0 bg-rose" />
        </span>
      </a>
    </section>
  );
}
