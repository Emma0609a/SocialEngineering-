// Barra de URL FALSA (presentacional). Senuelo didactico nº 1 y nº 2:
// dominio sospechoso + candado abierto.

export default function FakeUrlBar() {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-paper/80 ring-1 ring-white/10">
      {/* Candado ABIERTO a proposito */}
      <span aria-hidden className="text-bait-urgent" title="Conexion no segura">
        🔓
      </span>
      <span className="font-mono text-paper/60">http://</span>
      <span className="font-mono text-paper">ps5-gta6-sorteoficial.tk</span>
      <span className="font-mono text-paper/40">/premio</span>
      <span className="ml-auto rounded bg-bait-urgent/20 px-2 py-0.5 text-xs text-bait-urgent">
        No seguro
      </span>
    </div>
  );
}
