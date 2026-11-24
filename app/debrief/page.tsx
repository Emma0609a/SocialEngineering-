"use client";

import { useRouter } from "next/navigation";
import RevealScreen from "@/components/RevealScreen";

// Ruta independiente para proyectar la explicacion en clase (el debrief),
// sin pasar por el cebo. No muestra "lo que entregaste" porque no hay datos.
export default function DebriefPage() {
  const router = useRouter();
  return (
    <RevealScreen
      entered={{
        nombre: "Ana Perez (ejemplo)",
        direccion: "Calle Falsa 123, San Jose",
        email: "ana.ejemplo@correo.com",
      }}
      onReset={() => router.push("/")}
    />
  );
}
