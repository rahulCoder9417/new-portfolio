import Link from "next/link";
import Image from "next/image";
import { githubUrl, type Project } from "@/utils/config";

/** Featured project row: text on the left, screenshot on the right. The whole row links to the detail page. */
export function ProjectCard({ project }: { project: Project }) {
  const href = project.slug ? `/projects/${project.slug}` : undefined;

  return (
    <article className="group relative grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-x-8 gap-y-4 py-8">
      <div className="min-w-0 order-last sm:order-first">
        <div className="flex items-baseline gap-3">
          <h3 className="text-[17px] font-medium text-fg">
            {href ? (
              <Link href={href} className="after:absolute after:inset-0 group-hover:underline underline-offset-4 decoration-[color:var(--line)]">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          {project.status && (
            <span className="text-[11.5px] text-muted border border-[color:var(--border)] rounded-full px-2 py-0.5">
              {project.status}
            </span>
          )}
          {project.year && (
            <span className="ml-auto text-[13px] text-muted tabular-nums">{project.year}</span>
          )}
        </div>
        <p className="mt-0.5 text-[13.5px] text-muted">{project.category}</p>

        <p className="mt-3 text-[14.5px] leading-relaxed text-fg-soft">{project.summary}</p>

        <p className="mt-3 text-[12.5px] font-mono text-muted">{project.tags.join(" · ")}</p>

        <div className="relative z-10 mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px]">
          {href && (
            <Link href={href} className="text-link">
              Read more
            </Link>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
              {project.liveLabel ?? "Live site"} ↗
            </a>
          )}
          {project.githubRepo && (
            <a href={githubUrl(project.githubRepo)} target="_blank" rel="noopener noreferrer" className="text-link">
              Source ↗
            </a>
          )}
        </div>
      </div>

      {project.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-md border border-[color:var(--border)] bg-bg-soft">
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 640px) 220px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}

/** Compact row for the "other projects" list. */
export function ProjectRow({ project }: { project: Project }) {
  const primaryHref = project.slug
    ? `/projects/${project.slug}`
    : project.githubRepo
      ? githubUrl(project.githubRepo)
      : project.liveUrl;
  const external = !project.slug;

  return (
    <li className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-6 gap-y-1 py-4">
      <div>
        {primaryHref &&
          (external ? (
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="text-[14.5px] font-medium text-link">
              {project.title}
            </a>
          ) : (
            <Link href={primaryHref} className="text-[14.5px] font-medium text-link">
              {project.title}
            </Link>
          ))}
      </div>
      <div>
        <p className="text-[14px] leading-relaxed text-fg-soft">{project.summary}</p>
        <p className="mt-1.5 text-[12.5px] font-mono text-muted">
          {project.tags.join(" · ")}
          {project.slug && project.githubRepo && (
            <>
              {" · "}
              <a href={githubUrl(project.githubRepo)} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                source ↗
              </a>
            </>
          )}
          {project.liveUrl && (
            <>
              {" · "}
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                live ↗
              </a>
            </>
          )}
        </p>
      </div>
    </li>
  );
}
