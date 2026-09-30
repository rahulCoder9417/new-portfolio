import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard, ProjectRow } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-16 border-t border-[color:var(--border)] scroll-mt-14">
      <SectionHeader>Projects</SectionHeader>

      <div className="-mt-8 divide-y divide-[color:var(--border)]">
        {config.featuredProjects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      <h3 className="mt-10 text-[13px] font-medium text-muted">Other projects</h3>
      <ul className="mt-2 divide-y divide-[color:var(--border)]">
        {config.otherProjects.map((p) => (
          <ProjectRow key={p.title} project={p} />
        ))}
      </ul>
    </section>
  );
}
