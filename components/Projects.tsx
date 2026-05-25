import { config } from "@/utils/config";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const projects = [config.FeaturedProject, config.ThirdProject, config.SecondaryProject];
  return (
    <section id="projects" className="py-20 border-t border-[color:var(--border)]">
      <SectionHeader
        num="02"
        path="projects"
        right={<span>{projects.length} selected</span>}
      >
        Selected work
      </SectionHeader>
      <div className="divide-y divide-[color:var(--border)]">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
