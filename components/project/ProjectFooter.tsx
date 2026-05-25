import Link from "next/link";
import { Github } from "lucide-react";

export function ProjectFooter({ githubRepo }: { githubRepo?: string }) {
  return (
    <footer className="py-10 border-t border-[color:var(--border)] mt-10 flex items-center justify-between text-xs text-muted">
      <Link href="/" className="hover:text-fg transition-colors">
        ← back to home
      </Link>
      {githubRepo && (
        <a
          href={`https://github.com/rahulCoder9417/${githubRepo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
        >
          <Github size={12} /> {githubRepo}
        </a>
      )}
    </footer>
  );
}
