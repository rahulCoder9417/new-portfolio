"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  caption?: string;
  className?: string;
};

/**
 * Single demo video: lazy-loaded on viewport entry, muted autoplay loop.
 */
export function DemoVideo({ src, caption, className }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [armed, setArmed] = useState(false);

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
    const v = vidRef.current;
    if (!v) return;
    const onReady = () => v.play().catch(() => {});
    if (v.readyState >= 2) onReady();
    else v.addEventListener("loadeddata", onReady, { once: true });
    return () => v.removeEventListener("loadeddata", onReady);
  }, [armed]);

  return (
    <div ref={wrapRef} className={className}>
      <div className="rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft">
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
      </div>
      {caption && (
        <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
          {caption}
        </p>
      )}
    </div>
  );
}
