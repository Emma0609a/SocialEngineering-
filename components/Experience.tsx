"use client";

import { useState } from "react";
import BaitScreen, { type Entered } from "./BaitScreen";
import RevealScreen from "./RevealScreen";

const EMPTY: Entered = { nombre: "", email: "", usuario: "", password: "" };

// Maquina de estados del simulacro: cebo -> revelacion.
// Todo vive en memoria del componente; al recargar, se pierde.
export default function Experience() {
  const [screen, setScreen] = useState<"bait" | "reveal">("bait");
  const [entered, setEntered] = useState<Entered>(EMPTY);

  if (screen === "reveal") {
    return (
      <RevealScreen
        entered={entered}
        onReset={() => {
          setEntered(EMPTY); // borra lo tecleado
          setScreen("bait");
        }}
      />
    );
  }

  return (
    <BaitScreen
      onCaught={(data) => {
        setEntered(data);
        setScreen("reveal");
      }}
    />
  );
}
