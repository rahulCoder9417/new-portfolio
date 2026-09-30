import Link from "next/link";
import { config } from "@/utils/config";

export function Hero() {
  const links = [
    { label: "Resume", href: config.resumePath },
    ...config.socials.map((s) => ({ label: s.label, href: s.href })),
  ];

  return (
    <section className="pt-20 pb-16">
      <h1 className="text-[30px] font-semibold tracking-tight text-fg leading-tight">
        {config.name}
      </h1>
      <p className="mt-1 text-[15px] text-muted">
        {config.title}, {config.location}
      </p>

      <div className="mt-8 space-y-4 text-[15.5px] leading-[1.7] text-fg-soft max-w-[62ch]">
        <p>{config.hero.intro}</p>
        <p>
          Right now I work on{" "}
          <a href="https://inboxkit.com" target="_blank" rel="noopener noreferrer" className="text-link">
            Enrich
          </a>{" "}
          at InboxKit, and I&apos;m building{" "}
          <Link href="/projects/Textcrew" className="text-link">
            Textcrew
          </Link>
          , a personal AI agent you talk to on WhatsApp, Telegram or iMessage.
        </p>
      </div>

      <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {config.about.open_to_work && (
        <p className="mt-8 inline-flex items-center gap-2 text-[13.5px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {config.freelanceTagline}
        </p>
      )}
    </section>
  );
}
