import Link from "next/link";

type Props = {
  variant?: "surface" | "cobalt";
  kicker?: string;
  title: string;
  body?: string;
  primary: { href: string; label: string; external?: boolean };
  secondary?: { href: string; label: string; external?: boolean };
};

/** Flat CTA band — ice surface or solid cobalt, never a gradient. */
export function CtaBand({ variant = "surface", kicker, title, body, primary, secondary }: Props) {
  const cobalt = variant === "cobalt";
  return (
    <section className={cobalt ? "bg-cobalt text-white" : "border-y border-hairline bg-surface"}>
      <div className="container-page max-w-3xl py-14 text-center sm:py-16">
        {kicker ? <p className={`kicker ${cobalt ? "text-white/70" : "text-cobalt"}`}>{kicker}</p> : null}
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {body ? (
          <p className={`mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${cobalt ? "text-white/80" : "text-ink-muted"}`}>
            {body}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <CallButton {...primary} cobalt={cobalt} />
          {secondary ? <CallButton {...secondary} cobalt={cobalt} ghost /> : null}
        </div>
      </div>
    </section>
  );
}

function CallButton({
  href,
  label,
  external,
  cobalt,
  ghost,
}: {
  href: string;
  label: string;
  external?: boolean;
  cobalt: boolean;
  ghost?: boolean;
}) {
  const cls = ghost
    ? cobalt
      ? "border border-white/50 text-white hover:bg-white hover:text-cobalt"
      : "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white"
    : cobalt
      ? "bg-white text-cobalt hover:bg-white/90"
      : "bg-cobalt text-white hover:bg-cobalt-dark";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 text-sm font-medium transition-colors ${cls}`}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={`px-6 py-3 text-sm font-medium transition-colors ${cls}`}>
      {label}
    </Link>
  );
}
