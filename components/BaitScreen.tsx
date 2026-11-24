"use client";

import { useState } from "react";
import Countdown from "./Countdown";

export type Entered = {
  nombre: string;
  direccion: string;
  email: string;
};

const EMPTY: Entered = { nombre: "", direccion: "", email: "" };

// Pantalla CEBO. Imita un sorteo falso. NO envia ni guarda nada:
// onSubmit hace preventDefault y pasa los datos al estado del padre.
export default function BaitScreen({
  onCaught,
}: {
  onCaught: (data: Entered) => void;
}) {
  const [data, setData] = useState<Entered>(EMPTY);

  // El boton solo se activa cuando los tres campos tienen contenido.
  const completo =
    data.nombre.trim() !== "" &&
    data.direccion.trim() !== "" &&
    data.email.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // nada sale del navegador
    if (!completo) return;
    onCaught(data);
  }

  const field =
    "w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-chrome-blue";

  return (
    <main className="min-h-screen bg-sunset font-body">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            {/* Senuelo nº 5: insignia falsa */}
            <span className="rounded-full bg-bait-ok/20 px-3 py-1 text-sm text-bait-ok">
              ✓ Sorteo verificado 4.9/5
            </span>
            <Countdown />
          </div>

          <h1 className="font-display text-5xl uppercase leading-none text-paper drop-shadow-lg sm:text-7xl">
            Gana una PS5 + GTA 6
          </h1>
          {/* Senuelo nº 4: premio irreal */}
          <p className="max-w-xl text-lg text-paper/90">
            Participa GRATIS. {/* Senuelo nº 7: falta ortografica intencionada */}
            Solo rellena tus datos y entras al sorteo del año. Aprovecha haora!
          </p>
          {/* Senuelo nº 3: escasez */}
          <p className="text-sm font-semibold text-bait-urgent">
            ⚠ Solo quedan 3 unidades disponibles
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="glow mx-auto w-full max-w-md rounded-3xl bg-ink/70 p-6 ring-1 ring-white/10 backdrop-blur"
        >
          <div className="flex flex-col gap-3">
            <input
              className={field}
              placeholder="Nombre completo"
              value={data.nombre}
              onChange={(e) => setData({ ...data, nombre: e.target.value })}
            />
            {/* Senuelo nº 6: pide datos personales de mas (direccion) */}
            <input
              className={field}
              placeholder="Direccion de envio del premio"
              value={data.direccion}
              onChange={(e) => setData({ ...data, direccion: e.target.value })}
            />
            <input
              className={field}
              type="email"
              placeholder="Correo electronico"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <p className="text-xs text-paper/50">
              Simulacro: usa datos inventados, no los tuyos reales.
            </p>

            <button
              type="submit"
              disabled={!completo}
              className="mt-2 rounded-xl bg-chrome-blue py-3 text-lg font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-paper/50 disabled:hover:brightness-100"
            >
              {completo ? "INSCRIBIRME" : "Rellena los 3 campos"}
            </button>
          </div>
        </form>

        {/* Senuelo nº 5: ganadores inventados */}
        <p className="text-center text-sm text-paper/70">
          🎉 Carlos M. acaba de ganar · Maria L. acaba de ganar · Jose R. acaba de ganar
        </p>

        {/* Senuelo nº 8: la letra pequena confiesa */}
        <footer className="mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-paper/40">
          Promocion NO oficial y sin relacion con Rockstar Games, Take-Two ni Sony.
          Marcas y productos solo con fines ilustrativos. Simulacro educativo.
        </footer>
      </div>
    </main>
  );
}
