import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";

type Props = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubRepo?: string;
  liveUrl?: string;
  year?: string;
};

export function ProjectHero({
  title,
  category,
  description,
  tags,
  githubRepo,
  liveUrl,
  year,
}: Props) {
  return (
    <section className="pt-20 pb-14">
      <Link
        href="/#projects"
        className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
      >
        ← back to selected
      </Link>

      <div className="mt-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono text-muted uppercase tracking-[0.16em] mb-3">
            <span className="text-accent">$</span> cat ./{title.toLowerCase()}.md
          </p>
          <h1 className="font-serif-italic text-[clamp(2.4rem,7vw,3.6rem)] leading-[1.02] text-fg">
            {title}.
          </h1>
          <p className="mt-3 text-[12px] font-mono text-muted uppercase tracking-[0.14em]">
            {category}
          </p>
        </div>
        {year && (
          <span className="text-[11px] font-mono text-muted whitespace-nowrap pt-2">
            {year}
          </span>
        )}
      </div>

      <p className="mt-9 text-[15.5px] leading-[1.78] text-fg-soft max-w-[60ch] whitespace-pre-line">
        {description}
      </p>

      <ul className="mt-7 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <li key={t} className="pill">{t}</li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-5 text-[12px] font-mono">
        {githubRepo && (
          <a
            href={`https://github.com/rahulCoder9417/${githubRepo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 prose-link text-fg-soft"
          >
            <Github size={12} /> code
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 prose-link text-fg-soft"
          >
            <Globe size={12} /> live demo
            <ArrowUpRight size={11} />
          </a>
        )}
      </div>
    </section>
  );
}
