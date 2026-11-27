import { MagazineNav } from "@/components/MagazineNav";
import { Choreography } from "@/components/motion/Choreography";
import { SoftCursor } from "@/components/motion/SoftCursor";
import { MirrorHero } from "@/components/sections/MirrorHero";
import { PersonalNote } from "@/components/sections/PersonalNote";
import { JourneyThread } from "@/components/sections/JourneyThread";
import { Toolkit } from "@/components/sections/Toolkit";
import { ProjectCovers } from "@/components/sections/ProjectCovers";
import { InternshipSpread } from "@/components/sections/InternshipSpread";
import { OffTheClock } from "@/components/sections/OffTheClock";
import { SayHello } from "@/components/sections/SayHello";
import { person } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${person.firstName} ${person.lastName}`,
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Pokhara", addressCountry: "NP" },
  alumniOf: "Informatics College Pokhara",
  sameAs: [person.linkedin],
};

export default function Home() {
  return (
    <>
      {/* Intro curtain — only shown when motion is on (see globals.css) */}
      <div aria-hidden="true" className="intro-curtain fixed inset-0 z-[80] hidden items-center justify-center bg-baby">
        <span className="overflow-hidden">
          <span className="intro-mark block font-heading text-6xl italic text-rose md:text-8xl">{person.monogram}</span>
        </span>
      </div>

      <MagazineNav />
      <main id="main">
        <MirrorHero />
        <PersonalNote />
        <JourneyThread />
        <Toolkit />
        <ProjectCovers />
        <InternshipSpread />
        <OffTheClock />
        <SayHello />
      </main>

      <Choreography />
      <SoftCursor />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
