import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectFooter } from "@/components/project/ProjectFooter";
import { WalkthroughStep } from "@/components/project/WalkthroughStep";
import { SyncedVideos } from "@/components/project/SyncedVideos";
import { DemoVideo } from "@/components/project/DemoVideo";

const p = config.FeaturedProject;

export const metadata = {
  title: `${p.title} · ${config.name}`,
  description: p.category,
};

const V = "https://rsdxl2za4pnky0yh.public.blob.vercel-storage.com";

const tech = (items: string[]) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((t) => (
      <li key={t} className="pill">
        {t}
      </li>
    ))}
  </ul>
);

const features = (items: { title: string; desc: string }[]) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {items.map((f) => (
      <li
        key={f.title}
        className="border border-[color:var(--border)] rounded-md p-4 bg-bg-soft hover:border-accent transition-colors"
      >
        <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-fg mb-1.5">
          <span className="text-accent">›</span> {f.title}
        </p>
        <p className="text-[13px] leading-relaxed text-fg-soft">{f.desc}</p>
      </li>
    ))}
  </ul>
);

const detail = (body: React.ReactNode) => (
  <div className="rounded-md border border-[color:var(--border)] bg-bg-soft/60 px-5 py-4 text-[14px] leading-[1.78] text-fg-soft">
    {body}
  </div>
);

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

      {/* Walkthrough intro */}
      <section className="pt-6 pb-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted mb-2">
          <span className="text-accent">$</span> ls ./walkthrough
        </p>
        <h2 className="font-serif-italic text-[34px] leading-tight text-fg">
          How DevSync works
        </h2>
        <p className="mt-3 text-[15px] text-fg-soft max-w-[58ch]">
          Seven slices of the collaborative core. Each pair of videos plays in
          lockstep so you can see the same action from the host and the peer at
          the same instant.
        </p>
      </section>

      {/* 01 — Real-Time Code Syncing */}
      <WalkthroughStep
        num="01"
        title="Real-time code syncing"
        blurb="Two users editing the same file. Keystrokes, cursors, and selections propagate over WebSockets backed by Yjs CRDTs — no refreshes, no locks, no merge prompts."
      >
        <SyncedVideos
          srcA={`${V}/1sharing.mp4`}
          srcB={`${V}/1recieving.mp4`}
          labelA="host"
          labelB="peer"
        />
        {detail(
          <>
            <p>
              The synchronization engine is the foundation of DevSync. Multiple
              users edit the same file in parallel with consistent, conflict-free
              document state. Cursor positions, selections, and scroll state are
              continuously synced alongside the content itself.
            </p>
          </>,
        )}
        {features([
          { title: "Code streaming", desc: "Modifications stream instantly to all connected clients as users type." },
          { title: "Context preservation", desc: "Cursors, selections, and scroll continuously synchronized across peers." },
          { title: "Parallel editing", desc: "Multiple users work the same buffer with automatic conflict resolution." },
          { title: "Zero latency", desc: "Propagation without manual refreshes or coordination overhead." },
        ])}
        {tech(["WebSocket", "Yjs", "CRDT", "Operational Transform"])}
      </WalkthroughStep>

      {/* 02 — Terminal */}
      <WalkthroughStep
        num="02"
        title="Integrated terminal execution"
        blurb="A real shell wired into a per-room Docker container. Install dependencies, run a dev server, ship a static site — same workflow as a local machine."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DemoVideo src={`${V}/TerminalBasic.mp4`} caption="basic shell" />
          <DemoVideo src={`${V}/TerminalStaticWebsite.mp4`} caption="serving a static site" />
        </div>
        {detail(
          <p>
            The terminal is a full pseudo-tty connected to the room&apos;s
            isolated container. Commands run with real exit codes; long-lived
            processes (dev servers, watchers, build pipelines) keep running as
            users disconnect and reconnect.
          </p>,
        )}
        {tech(["Docker", "PTY", "WebSocket", "Express"])}
      </WalkthroughStep>

      {/* 03 — File System Sync */}
      <WalkthroughStep
        num="03"
        title="File system synchronization"
        blurb="Create, rename, move, delete — file operations on either side propagate to every connected peer, with the tree state derived from a single authoritative event log."
      >
        <SyncedVideos
          srcA={`${V}/2sharing.mp4`}
          srcB={`${V}/2recevieng.mp4`}
          labelA="host"
          labelB="peer"
        />
        {detail(
          <p>
            File-tree mutations are broadcast as discrete events. Peers apply
            them deterministically, so the explorer view stays consistent even
            when several users restructure folders at the same time.
          </p>,
        )}
        {tech(["WebSocket", "Event log", "Yjs awareness"])}
      </WalkthroughStep>

      {/* 04 — GUI Execution */}
      <WalkthroughStep
        num="04"
        title="GUI execution"
        blurb="GUI applications (Tkinter, simple X11 apps) run inside the container on a virtual display and stream their framebuffer back into the browser."
      >
        <DemoVideo src={`${V}/TerminalGui1.mp4`} caption="tkinter app inside the container" />
        {detail(
          <p>
            A virtual framebuffer (Xvfb) provides the X11 display; a screen
            relay pipes frames into a canvas in the browser. The user-facing
            terminal stays focused on the shell while the GUI window renders
            alongside.
          </p>,
        )}
        {tech(["Xvfb", "X11", "VNC relay", "Docker"])}
      </WalkthroughStep>

      {/* 05 — Live Preview */}
      <WalkthroughStep
        num="05"
        title="Live preview"
        blurb="Boot a dev server in the terminal and a preview pane attaches automatically via a reverse-proxied port forward."
      >
        <DemoVideo src={`${V}/TerminalPreview1.mp4`} caption="dev server preview" />
        {detail(
          <p>
            DevSync watches the container&apos;s exposed ports. The first one to
            answer health checks gets wired to a side-pane iframe served through
            a per-room subdomain, so the preview survives reloads and is
            shareable.
          </p>,
        )}
        {tech(["Reverse proxy", "Port forwarding", "Health checks"])}
      </WalkthroughStep>

      {/* 06 — Team Chat */}
      <WalkthroughStep
        num="06"
        title="Built-in team chat"
        blurb="Lightweight chat panel that rides the same WebSocket the editor uses — messages, system events, and presence sit on one channel."
      >
        <SyncedVideos
          srcA={`${V}/3Sharing.mp4`}
          srcB={`${V}/3recieving.mp4`}
          labelA="host"
          labelB="peer"
        />
        {detail(
          <p>
            Chat lives on the same realtime transport as the editor, so there
            is no second connection to manage. Presence (who is online, who is
            typing) is part of the same Yjs awareness state.
          </p>,
        )}
        {tech(["WebSocket", "Yjs awareness"])}
      </WalkthroughStep>

      {/* 07 — Git Import */}
      <WalkthroughStep
        num="07"
        title="Git repository import"
        blurb="Paste a Git URL and the container clones the repo, restores history, and drops you into the editor with the working tree ready."
      >
        <DemoVideo src={`${V}/gitClone.mp4`} caption="git clone inside the room" />
        {detail(
          <p>
            Imports happen inside the room&apos;s container with full git
            history. Once the clone finishes the file tree refreshes and any
            connected peers see the new files appear in real time.
          </p>,
        )}
        {tech(["Git", "Docker", "Reverse proxy"])}
      </WalkthroughStep>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
