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

type Net =
  | { estado: "cargando" }
  | { estado: "error" }
  | { estado: "ok"; ip: string; ciudad: string; proveedor: string };

// Pantalla de REVELACION.
// - Los datos locales (navegador, idioma, pantalla, zona) se leen en el
//   dispositivo y no salen de el.
// - La IP se obtiene preguntandola a un servicio publico (ipwho.is): la IP
//   "sale" hacia ese tercero, igual que hacia cualquier web que visitas. Es
//   justo lo que se quiere demostrar. No se guarda nada en ninguna parte.
export default function RevealScreen({
  entered,
  onReset,
}: {
  entered: Entered;
  onReset: () => void;
}) {
  const [passive, setPassive] = useState<Passive | null>(null);
  const [net, setNet] = useState<Net>({ estado: "cargando" });

  useEffect(() => {
    // Datos que cualquier web ve sin que escribas nada. Solo para mostrar.
    setPassive({
      Navegador: navigator.userAgent,
      Idioma: navigator.language,
      Pantalla: `${window.screen.width} x ${window.screen.height}`,
      "Zona horaria": Intl.DateTimeFormat().resolvedOptions().timeZone,
      Referrer: document.referrer || "(ninguno)",
    });

    // IP publica + geolocalizacion aproximada, en vivo. Solo se muestra.
    const ctrl = new AbortController();
    fetch("https://ipwho.is/", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.success !== false && d.ip) {
          setNet({
            estado: "ok",
            ip: String(d.ip),
            ciudad: [d.city, d.country].filter(Boolean).join(", ") || "—",
            proveedor: d.connection?.isp || d.connection?.org || "—",
          });
        } else {
          setNet({ estado: "error" });
        }
      })
      .catch(() => setNet({ estado: "error" }));
    return () => ctrl.abort();
  }, []);

  const typed = [
    ["Nombre", entered.nombre],
    ["Direccion", entered.direccion],
    ["Correo", entered.email],
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
                src="/crop-direccion.jpg"
                alt="Campo que pide tu direccion de envio"
                className="w-full rounded-lg"
                width={420}
                height={66}
              />
              <figcaption className="mt-2 text-paper/60">
                Piden tu direccion: datos de mas para un sorteo.
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
            <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-bait-urgent">
              Con tu nombre, tu direccion y tu correo, un estafador ya sabe quien
              eres, donde vives y por donde contactarte. No hagas falta mas para
              suplantarte o enganarte mejor la proxima vez.
            </p>
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

            <h3 className="mt-10 text-lg font-semibold text-paper">
              Desde tu navegador
            </h3>
            <dl className="mt-4 flex flex-col gap-2">
              {Object.entries(passive).map(([k, v]) => (
                <div key={k} className={row}>
                  <dt className="w-40 shrink-0 text-paper/60">{k}</dt>
                  <dd className="min-w-0 flex-1 break-all text-paper">{v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 text-lg font-semibold text-paper">
              Lo que ve cualquier servidor con tu IP
            </h3>
            <dl className="mt-4 flex flex-col gap-2">
              <div className={row}>
                <dt className="w-40 shrink-0 text-paper/60">IP publica</dt>
                <dd className="min-w-0 flex-1 break-all text-paper">
                  {net.estado === "ok"
                    ? net.ip
                    : net.estado === "cargando"
                      ? "Consultando…"
                      : "No disponible (sin conexion)"}
                </dd>
              </div>
              <div className={row}>
                <dt className="w-40 shrink-0 text-paper/60">Ubicacion aprox.</dt>
                <dd className="min-w-0 flex-1 break-all text-paper">
                  {net.estado === "ok" ? net.ciudad : "—"}
                </dd>
              </div>
              <div className={row}>
                <dt className="w-40 shrink-0 text-paper/60">Proveedor</dt>
                <dd className="min-w-0 flex-1 break-all text-paper">
                  {net.estado === "ok" ? net.proveedor : "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-paper/60">
              Tu IP no la sabe la pagina por si sola: la ve el servidor al que te
              conectas. Aqui se la pedimos a un servicio publico solo para
              mostrartela. No se guarda en ningun sitio.
            </p>

            {/* La MAC: leccion honesta, no un dato inventado */}
            <div className="mt-8 rounded-2xl border border-chrome-light/30 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold text-chrome-light">
                ¿Y tu direccion MAC?
              </h3>
              <p className="mt-3 max-w-[55ch] leading-relaxed text-paper/80">
                No se puede leer desde una pagina web, y eso es bueno: el
                navegador lo impide para protegerte, y ningun servidor de
                internet ve la MAC de tu dispositivo (solo la de tu router).
                Tenlo claro: <strong className="text-paper">si una web dice
                conocer tu MAC, esta mintiendo</strong> para asustarte. Es, en si
                misma, otra senal de fraude.
              </p>
            </div>
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
