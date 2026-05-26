"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  caption?: string;
  className?: string;
  /** Hover ramps playback through 1x → 2x → 3x. */
  hoverSpeedUp?: boolean;
};

const RAMP = [1, 2, 3] as const;
const STEP_MS = 350;

/** Single demo video: lazy-loaded, autoplay loop, hover-to-ramp speed. */
export function DemoVideo({
  src,
  caption,
  className,
  hoverSpeedUp = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const timers = useRef<number[]>([]);
  const [armed, setArmed] = useState(false);
  const [rate, setRate] = useState<number>(1);

  // Lazy mount on viewport entry
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

  // Autoplay once loaded
  useEffect(() => {
    if (!armed) return;
    const v = vidRef.current;
    if (!v) return;
    const onReady = () => v.play().catch(() => {});
    if (v.readyState >= 2) onReady();
    else v.addEventListener("loadeddata", onReady, { once: true });
    return () => v.removeEventListener("loadeddata", onReady);
  }, [armed]);

  // Apply rate to the video element whenever it changes
  useEffect(() => {
    const v = vidRef.current;
    if (v) v.playbackRate = rate;
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
    <div ref={wrapRef} className={className}>
      <div
        className={`group relative rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft ${
          hoverSpeedUp ? "cursor-pointer" : ""
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {armed ? (
          <video
            ref={vidRef}
            src={src}
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
        {hoverSpeedUp && (
          <SpeedChip rate={rate} visible={rate > 1} />
        )}
      </div>
      {caption && (
        <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}

function SpeedChip({ rate, visible }: { rate: number; visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-fg bg-bg/85 backdrop-blur border border-[color:var(--border)] px-2.5 py-1.5 rounded transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
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
    </div>
  );
}
