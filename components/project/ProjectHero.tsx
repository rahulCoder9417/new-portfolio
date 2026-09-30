import Link from "next/link";
import { githubUrl } from "@/utils/config";

type Props = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubRepo?: string;
  liveUrl?: string;
  liveLabel?: string;
  year?: string;
  status?: string;
};

export function ProjectHero({
  title,
  category,
  description,
  tags,
  githubRepo,
  liveUrl,
  liveLabel,
  year,
  status,
}: Props) {
  return (
    <section className="pt-12 pb-12">
      <Link href="/#projects" className="text-[13.5px] nav-link">
        ← All projects
      </Link>

      <div className="mt-10 flex items-baseline justify-between gap-4">
        <h1 className="text-[34px] font-semibold tracking-tight leading-tight text-fg">
          {title}
        </h1>
        {year && <span className="text-[13.5px] text-muted tabular-nums">{year}</span>}
      </div>
      <p className="mt-1 text-[15px] text-muted">
        {category}
        {status && (
          <>
            {" · "}
            <span className="text-fg-soft">{status}</span>
          </>
        )}
      </p>

      <p className="mt-8 text-[16px] leading-[1.75] text-fg-soft max-w-[65ch] whitespace-pre-line">
        {description}
      </p>

      <ul className="mt-7 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <li key={t} className="pill">{t}</li>
        ))}
      </ul>

      {(githubRepo || liveUrl) && (
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              {liveLabel ?? "Live site"} ↗
            </a>
          )}
          {githubRepo && (
            <a href={githubUrl(githubRepo)} target="_blank" rel="noopener noreferrer" className="text-link">
              Source code ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}
