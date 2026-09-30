import Link from "next/link";
import { githubUrl } from "@/utils/config";

export function ProjectFooter({ githubRepo }: { githubRepo?: string }) {
  return (
    <footer className="py-10 border-t border-[color:var(--border)] mt-10 flex items-center justify-between text-[13.5px]">
      <Link href="/#projects" className="nav-link">
        ← All projects
      </Link>
      {githubRepo && (
        <a href={githubUrl(githubRepo)} target="_blank" rel="noopener noreferrer" className="nav-link">
          Source on GitHub ↗
        </a>
      )}
    </footer>
  );
}
