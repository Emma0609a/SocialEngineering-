"use client";

import { useEffect, useState } from "react";

// Senuelo nº 3: urgencia artificial. Cuenta atras ficticia de 15 min.
export default function Countdown() {
  const [secs, setSecs] = useState(15 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSecs((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm uppercase tracking-widest text-paper/80">
        La oferta termina en
      </span>
      <span className="rounded-lg bg-bait-urgent px-3 py-1 font-mono text-lg font-bold text-white tabular-nums">
        {mm}:{ss}
      </span>
    </div>
  );
}
