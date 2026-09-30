import { config } from "@/utils/config";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { HighlightList } from "@/components/project/HighlightList";
import { ProjectFooter } from "@/components/project/ProjectFooter";

const p = config.projects.goredis;

export const metadata = {
  title: `${p.title} · ${config.name}`,
  description: p.category,
};

const phases = [
  {
    name: "Foundation",
    desc: "TCP server that speaks the RESP wire protocol: PING/PONG, ECHO, then SET/GET. Connection lifecycle and a per-connection request loop.",
  },
  {
    name: "Concurrency",
    desc: "Goroutine-per-connection model. Many clients in flight at once; shared in-memory store guarded by fine-grained locking.",
  },
  {
    name: "Data structures",
    desc: "Strings with TTL and lazy expiration, lists with blocking ops (BLPOP), sorted sets via skip-lists, streams with consumer groups, geospatial.",
  },
  {
    name: "Transactions",
    desc: "MULTI / EXEC queueing with WATCH-based optimistic concurrency that aborts on conflict instead of locking.",
  },
  {
    name: "Replication",
    desc: "Master-to-replica replication through command propagation, replication offsets, partial resync.",
  },
  {
    name: "Persistence",
    desc: "RDB binary snapshots for fast restarts and an AOF write-ahead log for durability. Tunable fsync policy.",
  },
  {
    name: "Pub/Sub & auth",
    desc: "SUBSCRIBE / PUBLISH fan-out and password-based auth.",
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
        description={p.description ?? p.summary}
        tags={p.tags}
        githubRepo={p.githubRepo}
        year={p.year}
      />

      <ProjectSection title="Why build Redis">
        <p>
          I use Redis all the time without thinking about how it works.
          Writing one from scratch in Go was a way to see where its design
          choices come from (protocol parsing, expiration, blocking operations,
          replication, persistence) instead of only reading about them.
        </p>
        <p>
          The bar I set: implement enough of the protocol that the real{" "}
          <code className="font-mono text-sm">redis-cli</code> and existing
          client libraries can connect without noticing they&apos;re talking to
          a different server.
        </p>
      </ProjectSection>

      <ProjectSection title="Build phases">
        <ol className="space-y-4">
          {phases.map((phase, i) => (
            <li key={phase.name} className="flex gap-4">
              <span className="text-[14px] text-muted tabular-nums w-5 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[15px] font-medium text-fg">{phase.name}</p>
                <p className="mt-0.5">{phase.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProjectSection>

      <ProjectSection title="Architecture">
        <p>
          Single-binary TCP server. One goroutine per client connection reads
          RESP frames into a command dispatcher; commands operate on an
          in-memory keyspace and append to an AOF buffer that&apos;s fsynced
          per the configured policy. A background expirer sweeps TTLs. A
          separate replication goroutine streams write commands to attached
          replicas over the same RESP protocol.
        </p>
      </ProjectSection>

      <ProjectSection title="Highlights">
        <HighlightList items={p.highlights ?? []} />
      </ProjectSection>

      <ProjectSection title="Commands implemented">
        <p>
          A hand-written RESP parser backs the dispatcher, so every command
          below is wire-compatible with the official{" "}
          <code className="font-mono text-sm">redis-cli</code> and standard
          client libraries: the same commands, replies and error shapes.
        </p>
        <div className="mt-7 space-y-5">
          {commandGroups.map((group) => (
            <div
              key={group.name}
              className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-5 gap-y-2"
            >
              <p className="text-[14px] text-muted sm:pt-0.5">
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
