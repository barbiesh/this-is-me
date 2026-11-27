import { folio } from "@/content/site";

// Section header in the magazine style: "No. 03 — Journey" + big serif title.
export function Chapter({
  id,
  title,
  italic,
  intro,
  tone = "light",
}: {
  id: string;
  title: string;
  italic?: string;
  intro?: string;
  tone?: "light" | "dark";
}) {
  const f = folio[id];
  return (
    <header className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className={`label mb-6 flex items-center gap-4 ${tone === "dark" ? "text-blush" : "text-rose"}`} data-reveal="fade">
          <span>No. {f.no}</span>
          <span className={`h-px w-12 ${tone === "dark" ? "bg-blush/60" : "bg-rose/50"}`} />
          <span>{f.name}</span>
        </p>
        <h2 id={`${id}-title`} className="text-h1" data-split>
          {title} {italic ? <em className="text-rose">{italic}</em> : null}
        </h2>
      </div>
      {intro ? (
        <p
          className={`max-w-sm text-lede md:col-span-4 md:justify-self-end ${tone === "dark" ? "text-mist" : "text-muted"}`}
          data-reveal="up"
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 md:px-12 ${className}`}>{children}</div>;
}
