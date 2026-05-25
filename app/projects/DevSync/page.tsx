import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { HighlightList } from "@/components/project/HighlightList";
import { ProjectFooter } from "@/components/project/ProjectFooter";

const p = config.FeaturedProject;

export const metadata = {
  title: `${p.title} — ${config.name}`,
  description: p.category,
};

const architecture = [
  {
    layer: "Client",
    name: "Browser IDE",
    desc: "Unified interface containing editor, terminal, preview, and chat — all synchronized across users.",
    parts: ["Code editor", "Terminal", "Chat", "Live preview"],
  },
  {
    layer: "Real-time core",
    name: "Collaboration engine",
    desc: "Handles code sync, cursor presence, file state, and multi-user awareness over persistent WebSocket connections.",
    parts: ["WebSockets", "Yjs CRDT", "Presence", "Conflict-free sync"],
  },
  {
    layer: "Execution",
    name: "Isolated containers",
    desc: "Runs real projects in Docker with full access to npm, CLI tools, backend servers, and build systems.",
    parts: ["Docker", "npm", "Vite", "Backend servers"],
  },
  {
    layer: "Visualization",
    name: "GUI virtualization",
    desc: "Runs GUI apps headlessly on the server and streams their display into the browser.",
    parts: ["Xvfb", "X11", "noVNC", "Browser rendering"],
  },
];

export default function DevSyncPage() {
  return (
    <>
      <ProjectHero
        title={p.title}
        category={p.category}
        description={p.description}
        tags={p.tags}
        githubRepo={p.githubRepo}
        liveUrl="https://dev-sync-blush.vercel.app/"
        year={p.year}
      />

      <ProjectSection num="01" path="problem" title="The problem">
        <p>
          Pair programming tools mostly fall in two buckets: tab-share extensions
          that are great for reading code but useless when you need to actually
          run something together, or fully hosted IDEs that lock you into their
          environment.
        </p>
        <p>
          DevSync sits in between. It gives a team a shared Next.js editor with
          live cursors, plus a real Linux container behind it where the code
          actually runs — frontends, backends, even GUI apps streamed back to
          the browser.
        </p>
      </ProjectSection>

      <ProjectSection num="02" path="architecture" title="Architecture">
        <p>
          DevSync is structured as four loosely-coupled layers. Keeping
          collaboration, execution, and visualization independent means each can
          scale on its own and stay simple inside.
        </p>
        <ol className="mt-4 space-y-5">
          {architecture.map((row) => (
            <li key={row.layer}>
              <p className="text-xs uppercase tracking-wider text-muted font-mono">
                {row.layer}
              </p>
              <p className="text-sm text-fg font-medium mt-0.5">{row.name}</p>
              <p className="text-sm text-fg/80 mt-1">{row.desc}</p>
              <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted font-mono">
                {row.parts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ProjectSection>

      <ProjectSection num="03" path="highlights" title="Highlights">
        <HighlightList items={p.highlights} />
      </ProjectSection>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
