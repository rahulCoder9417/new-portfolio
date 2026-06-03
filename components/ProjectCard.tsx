"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Globe } from "lucide-react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubRepo?: string;
  year?: string;
  liveUrl?: string;
  imageUrl?: string;
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const oneLine = project.description.split("\n")[0].split(". ")[0] + ".";
  const githubUrl = project.githubRepo
    ? `https://github.com/rahulCoder9417/${project.githubRepo}`
    : undefined;
  const slug = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative py-8 first:pt-2 last:pb-2">
      <Link
        href={`/projects/${project.title}`}
        aria-label={`Read more about ${project.title}`}
        className="absolute inset-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent z-0"
      />

      <div className="relative z-10 grid grid-cols-[auto_1fr_auto] sm:grid-cols-[40px_88px_1fr_auto] gap-x-5 gap-y-3 items-start pointer-events-none">
        {/* Index slug */}
        <span className="hidden sm:block text-[11px] font-mono text-muted pt-2">
          ({slug})
        </span>

        {/* Thumbnail */}
        <div className="relative shrink-0 w-12 h-12 sm:w-22 sm:h-22 sm:row-span-1 rounded overflow-hidden border border-[color:var(--border)] bg-bg-soft flex items-center justify-center transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_0_1px_var(--accent-soft)]">
          {project.imageUrl ? (
            <>
              <Image
                src={project.imageUrl}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="88px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-bg/30 mix-blend-multiply" />
            </>
          ) : (
            <span className="font-serif-italic text-3xl text-muted group-hover:text-accent transition-colors">
              {project.title.slice(0, 2)}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="col-start-2 sm:col-start-3 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="font-serif-italic text-[22px] text-fg leading-tight inline-flex items-center gap-1.5">
              {project.title}
              <ArrowUpRight
                size={15}
                className="text-muted transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </h3>
          </div>
          <p className="text-[11px] text-muted font-mono uppercase tracking-[0.14em] mt-1.5">
            {project.category}
          </p>
          <p className="mt-3.5 text-[14px] leading-relaxed text-fg-soft">{oneLine}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((t) => (
              <li key={t} className="pill">{t}</li>
            ))}
          </ul>

          {(githubUrl || project.liveUrl) && (
            <div className="mt-4 flex items-center gap-5 text-[11px] font-mono pointer-events-auto">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                >
                  <Github size={11} /> code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                >
                  <Globe size={11} /> live
                </a>
              )}
            </div>
          )}
        </div>

        {/* Year on the far right */}
        {project.year && (
          <span className="hidden sm:block text-[11px] font-mono text-muted pt-2 self-start col-start-4">
            {project.year}
          </span>
        )}
      </div>
    </article>
  );
}
