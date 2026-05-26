"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  srcA: string;
  srcB: string;
  labelA?: string;
  labelB?: string;
  className?: string;
};

/**
 * Two videos rendered side-by-side that stay in lockstep:
 * - Neither requests bytes until the wrapper is in the viewport.
 * - Once both have metadata, they start together on the same currentTime tick.
 * - Drift > 120ms snaps the lagging one back to the leader.
 */
export function SyncedVideos({ srcA, srcB, labelA, labelB, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const aRef = useRef<HTMLVideoElement | null>(null);
  const bRef = useRef<HTMLVideoElement | null>(null);
  const [armed, setArmed] = useState(false);

  // Reveal once it enters the viewport
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

  // Once both are armed and ready, drive them in sync
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

  return (
    <div ref={wrapRef} className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${className ?? ""}`}>
      {[
        { ref: aRef, src: srcA, label: labelA ?? "host" },
        { ref: bRef, src: srcB, label: labelB ?? "peer" },
      ].map((v) => (
        <div
          key={v.label}
          className="group relative rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft"
        >
          <div className="absolute top-2 left-2 z-10 text-[10px] font-mono uppercase tracking-[0.18em] text-muted bg-bg/80 backdrop-blur px-2 py-1 rounded">
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
    </div>
  );
}
