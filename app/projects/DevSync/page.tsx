import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectFooter } from "@/components/project/ProjectFooter";
import { WalkthroughStep } from "@/components/project/WalkthroughStep";
import { SyncedVideos } from "@/components/project/SyncedVideos";
import { DemoVideo } from "@/components/project/DemoVideo";
import { FullBleed } from "@/components/project/FullBleed";

const p = config.projects.devsync;

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
        description={p.description ?? p.summary}
        tags={p.tags}
        githubRepo={p.githubRepo}
        liveUrl={p.liveUrl}
        year={p.year}
      />

      {/* Walkthrough intro */}
      <section className="pb-10">
        <h2 className="text-[24px] font-semibold tracking-tight text-fg">
          How DevSync works
        </h2>
        <p className="mt-2 text-[15.5px] text-fg-soft max-w-[65ch]">
          Seven parts of the app. The paired videos play in sync, so you see
          the same action from the host&apos;s screen and a peer&apos;s screen
          at the same moment. Hover a video to speed it up.
        </p>
      </section>

      {/* 01 — Real-Time Code Syncing */}
      <WalkthroughStep
        num="01"
        title="Real-time code syncing"
        blurb="Two users editing the same file. Keystrokes, cursors and selections travel over WebSockets as Yjs CRDT updates, so there are no locks and no merge conflicts."
      >
        <FullBleed max="1700px">
          <SyncedVideos
            srcA={`${V}/1sharing.mp4`}
            srcB={`${V}/1recieving.mp4`}
            labelA="host"
            labelB="peer"
          />
        </FullBleed>
        {detail(
          <>
            <p>
              Each file is a Yjs document. Every client applies the same
              updates and ends up with the same text, whatever order the
              updates arrive in. Cursor positions and selections sync
              alongside the content.
            </p>
          </>,
        )}
        {tech(["WebSocket", "Yjs", "CRDT"])}
      </WalkthroughStep>

      {/* 02 — Terminal */}
      <WalkthroughStep
        num="02"
        title="Integrated terminal execution"
        blurb="A real shell connected to the room's Docker container. Install dependencies, run a dev server or serve a static site, the same way you would locally."
      >
        <FullBleed max="1700px">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DemoVideo src={`${V}/TerminalBasic.mp4`} caption="basic shell" />
            <DemoVideo src={`${V}/TerminalStaticWebsite.mp4`} caption="serving a static site" />
          </div>
        </FullBleed>
        {detail(
          <p>
            The terminal is a pseudo-terminal attached to the room&apos;s
            container. Long-running processes such as dev servers and watchers
            keep running when users disconnect and reconnect.
          </p>,
        )}
        {tech(["Docker", "PTY", "WebSocket", "Express"])}
      </WalkthroughStep>

      {/* 03 — File System Sync */}
      <WalkthroughStep
        num="03"
        title="File system synchronization"
        blurb="Creating, renaming, moving or deleting a file on one screen shows up for every connected peer."
      >
        <FullBleed max="1700px">
          <SyncedVideos
            srcA={`${V}/2sharing.mp4`}
            srcB={`${V}/2recevieng.mp4`}
            labelA="host"
            labelB="peer"
          />
        </FullBleed>
        {detail(
          <p>
            File-tree changes are broadcast as events and every peer applies
            them in the same order, so the explorer stays the same for everyone
            even when several people move folders at once.
          </p>,
        )}
        {tech(["WebSocket", "Yjs"])}
      </WalkthroughStep>

      {/* 04 — GUI Execution */}
      <WalkthroughStep
        num="04"
        title="GUI execution"
        blurb="GUI programs such as Tkinter apps run inside the container on a virtual display, and their window is streamed back to the browser."
      >
        <DemoVideo src={`${V}/TerminalGui1.mp4`} caption="tkinter app inside the container" />
        {detail(
          <p>
            Xvfb provides a virtual X11 display inside the container, and its
            frames are relayed to a canvas in the browser, next to the
            terminal.
          </p>,
        )}
        {tech(["Xvfb", "X11", "Docker"])}
      </WalkthroughStep>

      {/* 05 — Live Preview */}
      <WalkthroughStep
        num="05"
        title="Live preview"
        blurb="Start a dev server in the terminal and a preview pane opens through a reverse proxy."
      >
        <DemoVideo src={`${V}/TerminalPreview1.mp4`} caption="dev server preview" />
        {detail(
          <p>
            The container&apos;s port is exposed through a reverse proxy and
            shown in a side pane, so everyone in the room sees the running
            app.
          </p>,
        )}
        {tech(["Reverse proxy", "Port forwarding"])}
      </WalkthroughStep>

      {/* 06 — Team Chat */}
      <WalkthroughStep
        num="06"
        title="Built-in team chat"
        blurb="A chat panel next to the editor, running on the same WebSocket connection."
      >
        <SyncedVideos
          srcA={`${V}/3Sharing.mp4`}
          srcB={`${V}/3recieving.mp4`}
          labelA="host"
          labelB="peer"
        />
        {detail(
          <p>
            Chat uses the same connection as the editor, so there is no second
            socket to manage. Presence (who is online, who is typing) comes
            from Yjs awareness.
          </p>,
        )}
        {tech(["WebSocket", "Yjs awareness"])}
      </WalkthroughStep>

      {/* 07 — Git Import */}
      <WalkthroughStep
        num="07"
        title="Git repository import"
        blurb="Paste a Git URL and the container clones the repository with its history and opens it in the editor."
      >
        <DemoVideo src={`${V}/gitClone.mp4`} caption="git clone inside the room" />
        {detail(
          <p>
            The clone runs inside the room&apos;s container. When it finishes,
            the file tree refreshes for everyone in the room.
          </p>,
        )}
        {tech(["Git", "Docker"])}
      </WalkthroughStep>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
