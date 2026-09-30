type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  strong?: boolean;
};

function Box({ x, y, w, h, title, lines = [], strong }: BoxProps) {
  const cx = x + w / 2;
  const top = y + h / 2 - (lines.length * 17) / 2 + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="var(--bg)"
        stroke={strong ? "var(--accent)" : "var(--line)"}
        strokeWidth={strong ? 1.5 : 1}
      />
      <text x={cx} y={top} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--fg)">
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={cx} y={top + 19 + i * 17} textAnchor="middle" fontSize={12} fill="var(--muted)">
          {l}
        </text>
      ))}
    </g>
  );
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={11.5} fill="var(--muted)">
      {children}
    </text>
  );
}

function Zone({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--bg-soft)" stroke="var(--border)" strokeDasharray="5 4" />
      <text x={x + 14} y={y + 24} fontSize={12} fontWeight={500} fill="var(--muted)">
        {label}
      </text>
    </g>
  );
}

/**
 * Textcrew system diagram. The accent-colored path is the route one chat message takes:
 * channel → api → worker → vm-manager → the user's container.
 */
export function TextcrewDiagram() {
  return (
    <figure>
      <div className="overflow-x-auto -mx-6 px-6">
        <svg
          viewBox="0 0 960 560"
          role="img"
          aria-labelledby="tc-diagram-title"
          className="w-full min-w-[720px] h-auto font-sans"
        >
          <title id="tc-diagram-title">
            Textcrew architecture: chat channels send webhooks to the api, which queues jobs for the worker.
            The worker asks the Go vm-manager over gRPC to wake the user&apos;s gVisor container and deliver the
            message. The container can only reach the outside through a Squid egress proxy, which allows LiteLLM
            and the platform MCP server.
          </title>
          <defs>
            <marker id="tc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--line)" />
            </marker>
            <marker id="tc-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
            </marker>
          </defs>

          <Zone x={215} y={20} w={440} h={520} label="Platform network" />
          <Zone x={690} y={20} w={250} h={520} label="Sandbox network (no internet)" />

          {/* Left column: outside the platform */}
          <Box x={8} y={62} w={158} h={96} title="Chat channels" lines={["WhatsApp · Telegram", "iMessage · Web app"]} strong />
          <Box x={8} y={372} w={158} h={112} title="Outside services" lines={["Composio (25 apps)", "Clerk · Dodo", "Meta · Telegram APIs"]} />

          {/* Platform */}
          <Box x={240} y={62} w={185} h={96} title="api" lines={["Hono: REST, SSE", "webhooks, MCP server"]} strong />
          <Box x={240} y={232} w={185} h={96} title="worker" lines={["BullMQ, 4 queues", "per-user Redis lock"]} strong />
          <Box x={240} y={420} w={87} h={60} title="Postgres" />
          <Box x={338} y={420} w={87} h={60} title="Redis" />
          <Box x={470} y={232} w={165} h={96} title="vm-manager" lines={["Go, gRPC server", "only Docker access"]} strong />
          <Box x={470} y={416} w={165} h={68} title="LiteLLM" lines={["per-user budget keys"]} />

          {/* Sandbox */}
          <rect x={724} y={222} width={196} height={96} rx={6} fill="var(--bg)" stroke="var(--line)" />
          <Box x={712} y={232} w={196} h={96} title="User container" lines={["gVisor · one per user", "Hermes agent + Bridge"]} strong />
          <Box x={712} y={416} w={208} h={68} title="Squid egress proxy" lines={["per-user allowlist"]} />

          {/* Message path (accent) */}
          <line x1={166} y1={110} x2={238} y2={110} stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#tc-arrow-accent)" />
          <Label x={201} y={100}>webhooks</Label>

          <line x1={332} y1={158} x2={332} y2={230} stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#tc-arrow-accent)" />
          <Label x={340} y={198} anchor="start">jobs</Label>

          <line x1={425} y1={280} x2={468} y2={280} stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#tc-arrow-accent)" />
          <Label x={447} y={270}>gRPC</Label>

          <line x1={635} y1={280} x2={710} y2={280} stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#tc-arrow-accent)" />
          <Label x={672} y={270}>Docker API</Label>
          <Label x={672} y={298}>deliver</Label>

          {/* Supporting paths */}
          <line x1={283} y1={328} x2={283} y2={418} stroke="var(--line)" markerEnd="url(#tc-arrow)" />
          <line x1={381} y1={328} x2={381} y2={418} stroke="var(--line)" markerEnd="url(#tc-arrow)" />

          <path d="M240,300 H200 V428 H168" fill="none" stroke="var(--line)" markerEnd="url(#tc-arrow)" />
          <Label x={194} y={352} anchor="end">sends</Label>

          <line x1={810} y1={328} x2={810} y2={414} stroke="var(--line)" markerEnd="url(#tc-arrow)" />
          <Label x={818} y={376} anchor="start">only way out</Label>

          <line x1={712} y1={450} x2={637} y2={450} stroke="var(--line)" markerEnd="url(#tc-arrow)" />
          <Label x={674} y={440}>AI calls</Label>

          <path d="M920,440 H930 V110 H427" fill="none" stroke="var(--line)" markerEnd="url(#tc-arrow)" />
          <Label x={560} y={100}>agent tools (MCP, /mcp only)</Label>
        </svg>
      </div>
      <figcaption className="mt-3 text-[13px] text-muted">
        Blue shows the path of one incoming message. The container never talks to the internet directly.
      </figcaption>
    </figure>
  );
}
