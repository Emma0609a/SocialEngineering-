# Simulacro educativo anti-phishing

Landing de concienciacion sobre phishing para una masterclass escolar, dentro de
una actividad **autorizada por la direccion del centro** y en **entorno
controlado**. La pagina imita un "sorteo" (gancho PS5 + GTA 6) y, al interactuar,
se **revela como trampa** y ensena a reconocer el fraude.

## Principios (no negociables)

- **No se recogen, transmiten ni almacenan datos.** El formulario hace
  `preventDefault()`; lo tecleado vive solo en el estado del navegador y se borra
  al recargar o al pulsar "Volver". Nada va a un servidor ni a `localStorage`.
- **No se suplanta ninguna marca real** (sin logos ni tipografias de Rockstar /
  Take-Two / Sony). La condicion "no oficial" es una de las senales que se ensena.
- La contrasena del simulacro **siempre debe ser inventada**; la pagina lo avisa.
- Material para exposicion y entrega a la direccion, no una trampa encubierta.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (tokens de marca en `tailwind.config.ts`)

## Estructura

```
app/
  layout.tsx        # fuentes, metadatos (noindex)
  page.tsx          # entrada -> <Experience/>
  globals.css
components/
  Experience.tsx    # maquina de estados: cebo -> revelacion
  BaitScreen.tsx    # pantalla cebo (sorteo falso, 8 senuelos)
  RevealScreen.tsx  # revelacion: eco local + "lo que ya sabian" + 8 senales
  FakeUrlBar.tsx    # barra de URL falsa (.tk, candado abierto)
  Countdown.tsx     # cuenta atras (urgencia)
lib/
  signals.ts        # las 8 senales de phishing
branding/
  branding.md       # paleta, tipografias, tokens
```

## Desarrollo

```bash
npm install
npm run dev
```

## Formulario externo (opcional, lo gestiona el responsable)

El redirect a un Google/Microsoft Form **no viene cableado** a proposito. Si la
direccion lo aprueba, se anade por separado. Si se usara con alumnos reales, ese
formulario **no debe pedir datos personales verdaderos de menores**.
