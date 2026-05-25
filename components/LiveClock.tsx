"use client";

import { useEffect, useState } from "react";

// Formats current time in IST (UTC+5:30) as HH:MM:SS, ticks every second.
// Renders nothing until mounted to avoid hydration mismatch.
export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums text-fg-soft">
      {time || "--:--:--"}
    </span>
  );
}
