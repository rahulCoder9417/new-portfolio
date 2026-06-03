import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { HighlightList } from "@/components/project/HighlightList";
import { ProjectFooter } from "@/components/project/ProjectFooter";

const p = config.ThirdProject;

export const metadata = {
  title: `${p.title} · ${config.name}`,
  description: p.category,
};

const phases = [
  {
    name: "Foundation",
    desc: "TCP server that speaks the RESP wire protocol , PING/PONG, ECHO, then SET/GET. Connection lifecycle and a per-connection request loop.",
  },
  {
    name: "Concurrency",
    desc: "Goroutine-per-connection model. Many clients in flight at once; shared in-memory store guarded by fine-grained locking.",
  },
  {
    name: "Data structures",
    desc: "Strings with TTL & lazy expiration, lists with blocking ops (BLPOP), sorted sets via skip-lists, streams with consumer groups, geospatial.",
  },
  {
    name: "Transactions",
    desc: "MULTI / EXEC queueing with WATCH-based optimistic concurrency , aborts on conflict instead of locking.",
  },
  {
    name: "Replication",
    desc: "Master to replica replication via command propagation, replication offsets, partial resync.",
  },
  {
    name: "Persistence",
    desc: "RDB binary snapshots for fast restart + AOF write-ahead log for durability. Tunable fsync policy.",
  },
  {
    name: "Pub/Sub & auth",
    desc: "SUBSCRIBE / PUBLISH fan-out, password-based auth, audit-friendly command logging.",
  },
];

const commandGroups = [
  { name: "Connection & server", cmds: ["PING", "ECHO", "INFO", "TYPE"] },
  { name: "Strings", cmds: ["SET", "GET", "INCR"] },
  {
    name: "Lists",
    cmds: ["RPUSH", "LPUSH", "LRANGE", "LLEN", "LINDEX", "LPOP", "RPOP", "BLPOP"],
  },
  { name: "Streams", cmds: ["XADD", "XRANGE", "XREAD"] },
  { name: "Transactions", cmds: ["MULTI", "EXEC", "DISCARD", "WATCH", "UNWATCH"] },
  {
    name: "Sorted sets",
    cmds: ["ZADD", "ZRANK", "ZCARD", "ZRANGE", "ZSCORE", "ZREM"],
  },
  { name: "Geospatial", cmds: ["GEOADD", "GEOPOS", "GEODIST", "GEORADIUS"] },
  { name: "Pub/Sub", cmds: ["SUBSCRIBE", "UNSUBSCRIBE", "PUBLISH"] },
  { name: "Replication", cmds: ["REPLCONF", "PSYNC", "WAIT"] },
  { name: "Auth", cmds: ["ACL"] },
];

export default function GoRedisPage() {
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

      <ProjectSection num="01" path="why" title="Why build Redis">
        <p>
          Redis is one of those tools you use every day without ever thinking
          about. Writing one from scratch in Go was a way to actually feel where
          the design choices come from , protocol parsing, expiration, blocking
          operations, replication, persistence , instead of just reading about
          them.
        </p>
        <p>
          The bar I set: implement enough of the protocol that the real{" "}
          <code className="font-mono text-sm">redis-cli</code> and existing
          client SDKs can connect and not notice they&apos;re talking to a
          different server.
        </p>
      </ProjectSection>

      <ProjectSection num="02" path="phases" title="Build phases">
        <ol className="space-y-4 counter-reset">
          {phases.map((phase, i) => (
            <li key={phase.name} className="flex gap-4">
              <span className="text-xs font-mono text-muted w-5 mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-medium text-fg">{phase.name}</p>
                <p className="text-sm text-fg/80 mt-0.5">{phase.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProjectSection>

      <ProjectSection num="03" path="architecture" title="Architecture">
        <p>
          Single-binary TCP server. One goroutine per client connection reads
          RESP frames into a command dispatcher; commands operate on an
          in-memory keyspace and append to an AOF buffer that&apos;s fsynced
          per the configured policy. A background expirer sweeps TTLs. A
          separate replication goroutine streams write commands to attached
          replicas via the same RESP-shaped protocol.
        </p>
      </ProjectSection>

      <ProjectSection num="04" path="highlights" title="Highlights">
        <HighlightList items={p.highlights} />
      </ProjectSection>

      <ProjectSection num="05" path="commands" title="Commands implemented">
        <p>
          A hand-written RESP parser backs the dispatcher, so every command
          below is wire-compatible with the official{" "}
          <code className="font-mono text-sm">redis-cli</code> and standard
          client SDKs , the same verbs, replies, and error shapes.
        </p>
        <div className="mt-7 space-y-5">
          {commandGroups.map((group) => (
            <div
              key={group.name}
              className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-5 gap-y-2"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted sm:pt-1">
                {group.name}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {group.cmds.map((cmd) => (
                  <li key={cmd} className="pill font-mono">
                    {cmd}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectFooter githubRepo={p.githubRepo} />
    </>
  );
}
