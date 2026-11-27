import { journey } from "@/content/site";
import { Chapter, Container } from "@/components/ui/Chapter";

// 03 — Journey. A rose thread draws down the page; each stop alternates sides on desktop.
export function JourneyThread() {
  return (
    <section
      id="journey"
      data-folio="journey"
      aria-labelledby="journey-title"
      className="relative bg-cream py-section"
    >
      <Container>
        <Chapter id="journey" title="The" italic="journey so far." intro="From the first line of code to the next role, in order." />

        <ol className="relative mt-20 md:mt-28" data-journey>
          {/* The thread */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2" />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-rose md:left-1/2"
            data-journey-line
          />

          {journey.map((stop, i) => {
            const right = i % 2 === 1;
            const future = stop.kind === "Up next";
            return (
              <li key={stop.title} className="relative grid pb-16 pl-10 last:pb-0 md:grid-cols-2 md:pb-24 md:pl-0" data-journey-stop>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-rose md:left-1/2 md:-translate-x-1/2 ${
                    future ? "bg-ivory" : "bg-baby"
                  }`}
                  data-journey-dot
                />
                <div className={`${right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}`} data-reveal="up">
                  <p className="label mb-3 text-rose">
                    {stop.kind} · {stop.when}
                  </p>
                  <h3 className={`text-h3 ${future ? "italic text-muted" : ""}`}>{stop.title}</h3>
                  <p className="mt-1 font-semibold text-ink/80">{stop.place}</p>
                  <p className={`mt-3 max-w-md text-muted ${right ? "" : "md:ml-auto"}`}>{stop.note}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
