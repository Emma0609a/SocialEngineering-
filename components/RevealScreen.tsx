"use client";

import { useEffect, useState } from "react";
import type { Entered } from "./BaitScreen";
import { SIGNALS } from "@/lib/signals";

type Passive = {
  Navegador: string;
  Idioma: string;
  Pantalla: string;
  "Zona horaria": string;
  Referrer: string;
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
      Navegador: navigator.userAgent,
      Idioma: navigator.language,
      Pantalla: `${window.screen.width} x ${window.screen.height}`,
      "Zona horaria": Intl.DateTimeFormat().resolvedOptions().timeZone,
      Referrer: document.referrer || "(ninguno)",
    });
  }, []);

  const typed = [
    ["Nombre", entered.nombre],
    ["Correo", entered.email],
    ["Usuario", entered.usuario],
    ["Contrasena", entered.password ? "•".repeat(entered.password.length) : ""],
  ].filter(([, v]) => v);

  const row =
    "flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-white/[0.04] px-5 py-4";

  return (
    <main className="min-h-screen bg-ink font-body text-paper">
      <div className="mx-auto flex max-w-3xl flex-col gap-24 px-6 py-24">
        {/* Hero */}
        <header className="rise" style={{ animationDelay: "0ms" }}>
          <p className="font-display text-2xl uppercase text-bait-urgent">
            Era una trampa
          </p>
          <h1 className="mt-4 font-display text-[2rem] uppercase leading-[0.95] sm:text-7xl">
            Esto era un simulacro de phishing
          </h1>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-paper">
            No hay ningun sorteo. Si esta pagina fuera real, acabarias de
            entregar tus datos a un desconocido. Lo que escribiste no salio de tu
            navegador: solo se te muestra aqui, en tu propio dispositivo.
          </p>
        </header>

        {/* La carnada de cerca */}
        <section className="rise" style={{ animationDelay: "90ms" }}>
          <h2 className="font-display text-3xl uppercase">
            Mira la carnada de cerca
          </h2>
          <figure className="mt-8">
            <img
              src="/bait-captura.jpg"
              alt="Captura de la pagina cebo que simulaba un sorteo de PS5 y GTA 6"
              className="w-full rounded-2xl"
              width={1440}
              height={900}
            />
            <figcaption className="mt-3 text-paper/60">
              Esto es lo que acabas de ver. Parece un sorteo; es la carnada.
            </figcaption>
          </figure>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <figure>
              <img
                src="/crop-urgencia.jpg"
                alt="Insignia de verificacion falsa y cuenta atras"
                className="w-full rounded-lg"
                width={620}
                height={60}
              />
              <figcaption className="mt-2 text-paper/60">
                Insignia falsa y reloj: te meten prisa.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/crop-password.jpg"
                alt="Campo que pide la contrasena de tu cuenta"
                className="w-full rounded-lg"
                width={420}
                height={70}
              />
              <figcaption className="mt-2 text-paper/60">
                Te piden la contrasena. Nadie legitimo lo hace.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/crop-letrapequena.jpg"
                alt="Letra pequena que confiesa que no es oficial"
                className="w-full rounded-lg"
                width={820}
                height={60}
              />
              <figcaption className="mt-2 text-paper/60">
                La letra pequena confiesa que no es oficial.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Lo que entregaste */}
        {typed.length > 0 && (
          <section className="rise" style={{ animationDelay: "120ms" }}>
            <h2 className="font-display text-3xl uppercase">
              Lo que acababas de entregar
            </h2>
            <dl className="mt-8 flex flex-col gap-2">
              {typed.map(([k, v]) => (
                <div key={k} className={row}>
                  <dt className="w-32 shrink-0 text-paper/60">{k}</dt>
                  <dd className="min-w-0 flex-1 break-all text-lg text-paper">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            {entered.password && (
              <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-bait-urgent">
                Si escribiste una contrasena real, cambiala ahora mismo en el
                servicio donde la uses.
              </p>
            )}
          </section>
        )}

        {/* Lo que ya sabian */}
        {passive && (
          <section className="rise" style={{ animationDelay: "150ms" }}>
            <h2 className="font-display text-3xl uppercase">
              Lo que la web ya sabia de ti
            </h2>
            <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-paper">
              Sin que escribieras nada. Cualquier pagina ve todo esto en el
              instante en que la abres.
            </p>
            <dl className="mt-8 flex flex-col gap-2">
              {Object.entries(passive).map(([k, v]) => (
                <div key={k} className={row}>
                  <dt className="w-40 shrink-0 text-paper/60">{k}</dt>
                  <dd className="min-w-0 flex-1 break-all text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Las 8 senales */}
        <section>
          <h2 className="rise font-display text-3xl uppercase sm:text-4xl">
            Las ocho senales que lo delataban
          </h2>
          <ol className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {SIGNALS.map((s, i) => (
              <li
                key={s.id}
                className="rise flex gap-5"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <span className="font-display text-4xl leading-none text-chrome-light">
                  {s.id}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-paper">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 max-w-[42ch] leading-relaxed text-paper/80">
                    {s.explicacion}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Cierre */}
        <footer className="rise">
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            Ante la duda, no entregues nada
          </h2>
          <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-paper">
            Comprueba la direccion, desconfia de la urgencia y nunca escribas una
            contrasena fuera del sitio oficial. Ningun sorteo legitimo te la
            pide.
          </p>
          <button
            onClick={onReset}
            className="mt-10 rounded-xl bg-chrome-blue px-8 py-4 text-lg font-bold text-white transition hover:brightness-110 active:scale-[0.98]"
          >
            Volver al inicio
          </button>
        </footer>
      </div>
    </main>
  );
}
