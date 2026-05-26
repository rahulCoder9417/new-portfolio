"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string; caption?: string };

type Props = {
  slides: Slide[];
  ariaLabel?: string;
};

export function ImageSlider({ slides, ariaLabel }: Props) {
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);

  const count = slides.length;
  const next = useCallback(() => setIdx((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + count) % count), [count]);

  // Keyboard nav while the slider is focused or hovered
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":hover") && document.activeElement !== el) return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const current = slides[idx];

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      aria-label={ariaLabel ?? "Image gallery"}
      aria-roledescription="carousel"
      className="outline-none group"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative rounded-md overflow-hidden border border-[color:var(--border)] bg-bg-soft">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {slides.map((s, i) => {
            const eager = Math.abs(i - idx) <= 1;
            return (
              <div key={s.src} className="w-full shrink-0" aria-hidden={i !== idx}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 720px, 100vw"
                  loading={eager ? "eager" : "lazy"}
                  className="w-full h-auto object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Counter chip */}
        <div className="absolute top-3 left-3 z-10 text-[10px] font-mono uppercase tracking-[0.18em] text-muted bg-bg/85 backdrop-blur px-2 py-1 rounded">
          <span className="text-fg tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
          <span className="text-muted/60"> / </span>
          <span className="tabular-nums">{String(count).padStart(2, "0")}</span>
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-bg/85 backdrop-blur border border-[color:var(--border)] text-fg-soft hover:text-accent hover:border-accent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-bg/85 backdrop-blur border border-[color:var(--border)] text-fg-soft hover:text-accent hover:border-accent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Bottom rail: caption + dots */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted min-h-[1em]">
          {current.caption ?? ""}
        </p>
        {count > 1 && (
          <div className="flex items-center gap-1.5" role="tablist">
            {slides.map((s, i) => (
              <button
                key={s.src}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-[color:var(--border)] hover:bg-fg-soft"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
