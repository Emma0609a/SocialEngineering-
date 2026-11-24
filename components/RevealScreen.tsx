"use client";

import { useEffect, useState } from "react";
import type { Entered } from "./BaitScreen";
import { SIGNALS } from "@/lib/signals";

type Passive = {
  navegador: string;
  idioma: string;
  pantalla: string;
  zona: string;
  referrer: string;
};

// Pantalla de REVELACION. Solo lee del estado local y del navegador del
// usuario. No guarda ni envia nada.
export default function RevealScreen({
  entered,
  onReset,
}: {
  entered: Entered;
  onReset: () => void;
}) {
  const [passive, setPassive] = useState<Passive | null>(null);

  useEffect(() => {
    // Datos que cualquier web ve sin que escribas nada. Solo para mostrar.
    setPassive({
      navegador: navigator.userAgent,
      idioma: navigator.language,
      pantalla: `${window.screen.width} x ${window.screen.height}`,
      zona: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "(ninguno)",
    });
  }, []);

  const typed = [
    ["Nombre", entered.nombre],
    ["Correo", entered.email],
    ["Usuario", entered.usuario],
    ["Contrasena", entered.password ? "•".repeat(entered.password.length) : ""],
  ].filter(([, v]) => v);

  return (
    <main className="min-h-screen bg-ink font-body text-paper">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <header className="text-center">
          <p className="text-sm uppercase tracking-widest text-bait-urgent">
            Era una trampa
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase sm:text-5xl">
            Esto era un simulacro de phishing
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-paper/70">
            No hay sorteo. Si esto fuera real, acabarias de entregar tus datos a
            un desconocido. Lo que escribiste no salio de tu navegador: solo se
            te muestra aqui.
          </p>
        </header>

        {typed.length > 0 && (
          <section className="rounded-2xl border border-bait-urgent/40 bg-bait-urgent/10 p-5">
            <h2 className="font-display text-xl uppercase">
              Lo que acababas de entregar
            </h2>
            <dl className="mt-3 grid gap-2 font-mono text-sm">
              {typed.map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-28 shrink-0 text-paper/50">{k}:</dt>
                  <dd className="break-all text-paper">{v}</dd>
                </div>
              ))}
            </dl>
            {entered.password && (
              <p className="mt-3 text-sm text-bait-urgent">
                Si escribiste una contrasena real, cambiala ahora en el servicio
                correspondiente.
              </p>
            )}
          </section>
        )}

        {passive && (
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-display text-xl uppercase">
              Lo que la web ya sabia de ti
            </h2>
            <p className="mt-1 text-sm text-paper/60">
              Sin que escribieras nada. Cualquier pagina ve esto al visitarla.
            </p>
            <dl className="mt-3 grid gap-2 font-mono text-xs">
              {Object.entries(passive).map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-paper/50">{k}:</dt>
                  <dd className="break-all text-paper/90">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section>
          <h2 className="font-display text-2xl uppercase">
            Las 8 senales que lo delataban
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {SIGNALS.map((s) => (
              <li
                key={s.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="font-semibold text-chrome-light">
                  {s.id}. {s.titulo}
                </h3>
                <p className="mt-1 text-sm text-paper/70">{s.explicacion}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onReset}
            className="rounded-xl bg-chrome-blue px-6 py-3 font-bold text-white transition hover:brightness-110"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
}
