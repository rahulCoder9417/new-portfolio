import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { HighlightList } from "@/components/project/HighlightList";
import { ProjectFooter } from "@/components/project/ProjectFooter";

const p = config.SecondaryProject;

export const metadata = {
  title: `${p.title} — ${config.name}`,
  description: p.category,
};

const accessControl = [
  {
    role: "Guest",
    desc: "Can browse the catalog and request an account. No access to borrow or admin routes.",
  },
  {
    role: "Member",
    desc: "Approved users — discover, borrow, return, and track their own activity. Rate-limited.",
  },
  {
    role: "Admin",
    desc: "Approve member requests, manage inventory, monitor borrow flows. Lives behind protected routes.",
  },
];

const automation = [
  "Overdue-book reminders sent via QStash + Nodemailer.",
  "Borrow-request status emails fire as state changes.",
  "Redis-backed rate limiting throttles abusive requests at the edge.",
];

export default function BookwisePage() {
  return (
    <>
      <ProjectHero
        title={p.title}
        category={p.category}
        description={p.description}
        tags={p.tags}
        githubRepo={p.githubRepo}
        year={p.year}
      />

      <ProjectSection num="01" path="problem" title="The problem">
        <p>
          Most library-management projects are CRUD demos — a form, a list, no
          real notion of who is allowed to do what. BookWise is an attempt to
          build the same thing the way it would actually ship: approval-based
          onboarding, role-based access, and reliable background workflows.
        </p>
      </ProjectSection>

      <ProjectSection num="02" path="access-control" title="Access control">
        <ol className="space-y-4">
          {accessControl.map((r) => (
            <li key={r.role}>
              <p className="text-sm font-medium text-fg">{r.role}</p>
              <p className="text-sm text-fg/80 mt-0.5">{r.desc}</p>
            </li>
          ))}
        </ol>
      </ProjectSection>

      <ProjectSection num="03" path="workflows" title="Background workflows">
        <HighlightList items={automation} />
      </ProjectSection>

      <ProjectSection num="04" path="highlights" title="Highlights">
        <HighlightList items={p.highlights} />
      </ProjectSection>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
