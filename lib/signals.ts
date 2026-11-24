// Las 8 senales de phishing que el ejercicio ensena.
// Fuente: documento de contexto del simulacro educativo.

export type Signal = {
  id: number;
  titulo: string;
  explicacion: string;
};

export const SIGNALS: Signal[] = [
  {
    id: 1,
    titulo: "Mira la URL real",
    explicacion:
      "Esta pagina vive en un dominio generico (por ejemplo *.vercel.app). Un sorteo oficial de Sony o Rockstar jamas estaria ahi: siempre en su propio dominio.",
  },
  {
    id: 2,
    titulo: "Candado y HTTPS",
    explicacion:
      "Comprueba el candado del navegador. Que una pagina tenga HTTPS no la hace legitima, pero su ausencia si es una alarma clara.",
  },
  {
    id: 3,
    titulo: "Urgencia artificial",
    explicacion:
      "Cuenta atras y 'solo quedan 3 unidades' para que actues sin pensar.",
  },
  {
    id: 4,
    titulo: "Premio irreal",
    explicacion:
      "Demasiado bueno para ser verdad. Nadie regala consolas y juegos a cambio de rellenar un formulario.",
  },
  {
    id: 5,
    titulo: "Insignias y resenas falsas",
    explicacion:
      "'Verificado', '4.9/5' y ganadores inventados que no se pueden comprobar.",
  },
  {
    id: 6,
    titulo: "Pide tu contrasena",
    explicacion:
      "Te piden la contrasena de una cuenta para 'verificarte'. Ningun servicio legitimo hace eso.",
  },
  {
    id: 7,
    titulo: "Faltas de ortografia",
    explicacion:
      "Errores y frases raras: senal de una pagina montada con prisa o traducida automaticamente.",
  },
  {
    id: 8,
    titulo: "La letra pequena confiesa",
    explicacion:
      "Al fondo, en gris, admite que no es oficial ni esta afiliado. Casi nadie lo lee.",
  },
];
