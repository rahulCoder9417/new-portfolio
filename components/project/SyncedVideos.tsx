"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  srcA: string;
  srcB: string;
  labelA?: string;
  labelB?: string;
  className?: string;
  /** Hover ramps both videos through 1x → 2x → 3x. */
  hoverSpeedUp?: boolean;
};

const RAMP = [1, 2, 3] as const;
const STEP_MS = 350;

/**
 * Two horizontally-stacked videos that play in lockstep:
 * - Neither requests bytes until the wrapper is in the viewport.
 * - Once both have metadata, they start together on the same currentTime tick.
 * - Drift > 120ms snaps the lagging one back to the leader.
 * - Hovering ramps both playback rates through 1x → 2x → 3x.
 */
export function SyncedVideos({
  srcA,
  srcB,
  labelA,
  labelB,
  className,
  hoverSpeedUp = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const aRef = useRef<HTMLVideoElement | null>(null);
  const bRef = useRef<HTMLVideoElement | null>(null);
  const timers = useRef<number[]>([]);
  const [armed, setArmed] = useState(false);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || armed) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    let raf = 0;
    let ready = 0;

    const start = () => {
      a.currentTime = 0;
      b.currentTime = 0;
      a.play().catch(() => {});
      b.play().catch(() => {});
      tick();
    };

    const onReady = () => {
      ready += 1;
      if (ready >= 2) start();
    };

    const tick = () => {
      if (!a || !b) return;
      const drift = a.currentTime - b.currentTime;
      if (Math.abs(drift) > 0.12) {
        if (drift > 0) b.currentTime = a.currentTime;
        else a.currentTime = b.currentTime;
      }
      raf = requestAnimationFrame(tick);
    };

    if (a.readyState >= 2) ready += 1;
    else a.addEventListener("loadeddata", onReady, { once: true });
    if (b.readyState >= 2) ready += 1;
    else b.addEventListener("loadeddata", onReady, { once: true });
    if (ready >= 2) start();

    return () => {
      cancelAnimationFrame(raf);
      a.removeEventListener("loadeddata", onReady);
      b.removeEventListener("loadeddata", onReady);
    };
  }, [armed]);

  // Apply rate to both videos
  useEffect(() => {
    if (aRef.current) aRef.current.playbackRate = rate;
    if (bRef.current) bRef.current.playbackRate = rate;
  }, [rate, armed]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const handleEnter = () => {
    if (!hoverSpeedUp) return;
    clearTimers();
    setRate(RAMP[0]);
    RAMP.slice(1).forEach((r, i) => {
      timers.current.push(
        window.setTimeout(() => setRate(r), STEP_MS * (i + 1)),
      );
    });
  };
  const handleLeave = () => {
    if (!hoverSpeedUp) return;
    clearTimers();
    setRate(1);
  };

  useEffect(() => clearTimers, []);

  return (
    <div
      ref={wrapRef}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 ${
        hoverSpeedUp ? "cursor-pointer" : ""
      } ${className ?? ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {[
        { ref: aRef, src: srcA, label: labelA ?? "host" },
        { ref: bRef, src: srcB, label: labelB ?? "peer" },
      ].map((v) => (
        <div
          key={v.label}
          className="relative rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft"
        >
          <div className="absolute top-2.5 left-2.5 z-10 text-[10px] font-mono uppercase tracking-[0.18em] text-muted bg-bg/85 backdrop-blur px-2 py-1 rounded">
            <span className="text-accent">●</span> {v.label}
          </div>
          {armed ? (
            <video
              ref={v.ref}
              src={v.src}
              muted
              playsInline
              loop
              preload="auto"
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center text-[11px] font-mono text-muted">
              <span className="text-accent">$</span>&nbsp;waiting for viewport…
            </div>
          )}
        </div>
      ))}
      {hoverSpeedUp && (
        <div
          className={`pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-fg bg-bg/85 backdrop-blur border border-[color:var(--border)] px-2.5 py-1.5 rounded transition-all duration-200 ${
            rate > 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          <span className="text-accent">▶▶</span>
          <span className="flex items-center gap-1">
            {[1, 2, 3].map((r) => (
              <span
                key={r}
                className={`tabular-nums transition-colors ${
                  rate === r ? "text-accent" : "text-muted/40"
                }`}
              >
                {r}x
              </span>
            ))}
          </span>
          <span className="text-muted/60">· sync</span>
        </div>
      )}
    </div>
  );
}
