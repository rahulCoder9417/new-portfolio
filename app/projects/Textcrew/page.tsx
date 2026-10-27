import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { ProjectFooter } from "@/components/project/ProjectFooter";
import { TextcrewDiagram } from "@/components/project/TextcrewDiagram";

const p = config.projects.textcrew;

export const metadata = {
  title: `${p.title} · ${config.name}`,
  description: p.summary,
};

const architecture = [
  {
    name: "Modular monolith",
    desc: "One TypeScript codebase run as two processes: an api (Hono: REST, SSE, webhooks and an MCP server) that only adds jobs, and a worker (BullMQ) that only runs them. Nine modules, each owning its own tables; other modules call its functions, never its tables.",
  },
  {
    name: "vm-manager",
    desc: "A separate Go service and the only thing with Docker access, which makes it a privilege boundary. It creates, wakes, stops and deletes each user's container. The backend talks to it over gRPC, with a server-streaming call for message delivery.",
  },
  {
    name: "Agent container",
    desc: "One per user, running under gVisor: the Hermes agent plus a Python Bridge adapter I wrote. Its only way out is a Squid egress proxy with a per-user allowlist.",
  },
  {
    name: "Platform MCP server",
    desc: "The agent's tools: send a message, run an app action, request approval, create an automation and so on. The user id always comes from the container's token, so an agent can never act as another user.",
  },
  {
    name: "Contract first",
    desc: "OpenAPI 3.1 drives routing, auth and request validation, and tests check every response against the spec. The gRPC proto is shared by both services.",
  },
];

const highlights = [
  {
    title: "Webhooks never do work",
    body: "Each webhook is verified, saved as a deduplicated event and turned into a job, then answered with 200. Four queues, retries with backoff, and a per-user Redis lock so one user's messages never run in parallel. Jobs are safe to re-run, and the system recovers if Redis is lost.",
  },
  {
    title: "Credits without a stored balance",
    body: "Credits are grants plus an append-only ledger; a database trigger rejects edits to ledger rows. The balance is always computed, never stored. Credits are spent in expiry order and every charge has an idempotency key. The AI budget is enforced live through LiteLLM virtual keys, and turns that fail because of the platform are refunded.",
  },
  {
    title: "Approvals tied to the exact action",
    body: "Risky actions (send, delete, pay) need a single-use approval bound to the exact action and arguments the user saw. Approvals never block the agent: it ends its turn, and the user's ✅ or ❌ arrives later as a new message that resumes the session.",
  },
  {
    title: "Container lifecycle",
    body: "Containers stop after 3 idle minutes but never mid-turn. An awake cap evicts the lowest-priority, longest-idle container first. Health checks restart broken containers, a reconciler fixes drift between Docker and the database, image rollouts keep the user's data, and stuck turns are force-stopped and refunded.",
  },
  {
    title: "Routing before waking",
    body: "A classifier (TypeSafe Jev) sorts each message as simple, a task, or spam. Simple messages get a cheap-model reply and no container wakes up. If the classifier is down or unsure, the message is treated as a task.",
  },
];

const alsoBuilt = [
  "Coupon codes stored only as hashes, with rate limits, one generic error for every failure, and an atomic redemption cap tested with 50 parallel redemptions on a real Postgres.",
  "Channel details: WhatsApp's 24-hour window and templates, Telegram inline buttons, iMessage yes/no replies, voice-to-text and media downloads.",
  "Dodo payments (subscriptions, top-ups, refunds, chargebacks) and plans.",
  "Automations on cron with timezones, app-event triggers, and auto-pause at zero credits.",
  "Bring-your-own AI key, a waitlist with abuse monitoring, backups, metrics and alerts.",
];

const numbers = [
  { value: "188", label: "backend tests on real Postgres and Redis, plus Go and Python suites" },
  { value: "51", label: "API endpoints, all covered by contract tests" },
  { value: "25", label: "database tables" },
  { value: "11", label: "gRPC calls" },
  { value: "9", label: "agent tools" },
  { value: "4", label: "job queues" },
  { value: "4", label: "chat channels" },
  { value: "25", label: "app integrations" },
];

const stack = [
  { label: "Backend", items: ["TypeScript (strict)", "Node 22", "Hono", "BullMQ", "Redis", "Postgres", "Drizzle", "Zod"] },
  { label: "Contracts", items: ["OpenAPI 3.1", "Ajv", "openapi-typescript", "Redocly", "gRPC", "Connect-ES", "grpc-go", "buf"] },
  { label: "Agent & AI", items: ["MCP TypeScript SDK", "Hermes Agent", "Python", "LiteLLM", "Composio"] },
  { label: "Sandbox & infra", items: ["Go", "Docker Engine SDK", "gVisor", "Squid", "Caddy", "GitHub Actions"] },
  { label: "Services", items: ["Clerk", "Dodo Payments"] },
  { label: "Tooling", items: ["Vitest", "pnpm"] },
];

export default function TextcrewPage() {
  return (
    <>
      <ProjectHero
        title={p.title}
        category={p.category}
        description={p.description ?? p.summary}
        tags={p.tags}
        liveUrl={p.liveUrl}
        liveLabel={p.liveLabel}
        year={p.year}
        status={p.status}
      />

      <div className="pb-12">
        <figure>
          <div className="rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft">
            <video
              src="/Textcrew/textcrew-demo.mp4"
              poster="/Textcrew-Main.jpg"
              controls
              playsInline
              preload="metadata"
              width={1280}
              height={720}
              aria-label="Textcrew demo video"
              className="w-full aspect-video"
            />
          </div>
          <figcaption className="mt-2 text-[13px] text-muted">
            Textcrew in 57 seconds: one text, the crew at work, your OK, and bringing your own AI.
          </figcaption>
        </figure>
      </div>

      <ProjectSection title="The problem">
        <p>
          The idea is to text an assistant the way you would text a person, and
          have it do real work in your accounts. Building the backend for that
          means solving several problems at once:
        </p>
        <ul className="space-y-2 list-disc pl-5 marker:text-[color:var(--line)]">
          <li className="pl-1">
            Running a separate agent for every user, with its own memory and
            files, without letting it reach anything it shouldn&apos;t.
          </li>
          <li className="pl-1">
            Taking messages from four channels with different rules, and never
            handling one user&apos;s messages out of order.
          </li>
          <li className="pl-1">
            Letting the agent act in Gmail or Slack without it sending or
            deleting anything the user didn&apos;t agree to.
          </li>
          <li className="pl-1">
            Charging for AI usage correctly, including refunds when the
            platform is at fault.
          </li>
          <li className="pl-1">
            Keeping costs down by waking containers only when there is work to
            do.
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="What I built">
        <p>
          System design and backend engineering: the architecture, the API
          contract, the backend (api and worker) and the Go container manager.
          The agent inside each container is Hermes Agent; I wrote the Python
          Bridge that runs it and connects it to the platform.
        </p>
        <p>
          I built it with Claude Code, splitting the design into build phases
          and running parallel agents on separate git branches.
        </p>
      </ProjectSection>

      <ProjectSection title="Architecture">
        <TextcrewDiagram />
        <dl className="mt-8 space-y-5">
          {architecture.map((a) => (
            <div key={a.name}>
              <dt className="text-[15px] font-medium text-fg">{a.name}</dt>
              <dd className="mt-1">{a.desc}</dd>
            </div>
          ))}
        </dl>
      </ProjectSection>

      <ProjectSection title="Engineering highlights">
        <div className="space-y-7">
          {highlights.map((h, i) => (
            <div key={h.title}>
              <h3 className="text-[16px] font-medium text-fg">
                <span className="text-muted font-normal tabular-nums mr-2">{i + 1}.</span>
                {h.title}
              </h3>
              <p className="mt-1.5">{h.body}</p>
            </div>
          ))}
        </div>
        <h3 className="pt-6 text-[15px] font-medium text-fg">Also built</h3>
        <ul className="space-y-2 list-disc pl-5 marker:text-[color:var(--line)]">
          {alsoBuilt.map((item) => (
            <li key={item} className="pl-1">{item}</li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection title="In numbers">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-md border border-[color:var(--border)] bg-[color:var(--border)]">
          {numbers.map((n) => (
            <div key={n.label} className="bg-bg p-4">
              <dt className="sr-only">{n.label}</dt>
              <dd>
                <span className="block text-[26px] font-semibold tracking-tight text-fg tabular-nums leading-none">
                  {n.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-muted">{n.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </ProjectSection>

      <ProjectSection title="Tech stack">
        <dl className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {stack.map((s) => (
            <div key={s.label} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-6 gap-y-1 py-3">
              <dt className="text-[14px] text-muted">{s.label}</dt>
              <dd className="text-[14.5px]">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </ProjectSection>

      <ProjectSection title="Status">
        <p>
          <span className="font-medium text-fg">Live.</span>{" "}
          Textcrew runs on the web app and Telegram, with a free plan and paid
          plans. WhatsApp and iMessage are not live yet. See it at{" "}
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            textcrew.in
          </a>
          .
        </p>
        <p className="text-[14px] text-muted">
          The repositories are private, so there is no source link.
        </p>
      </ProjectSection>

      <ProjectFooter />
    </>
  );
}
