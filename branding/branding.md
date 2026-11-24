# Branding — Landing educativa anti-phishing ("sorteo" GTA 6 + PS5)

> **Inspirado, NO oficial.** No usa logos ni tipografías reales de Rockstar / Take-Two
> ni de Sony. La condición de "no oficial" es, a propósito, una de las señales de
> phishing que el ejercicio enseña.

## 1. Paleta

### Degradado principal (fondo "sunset")
De arriba a abajo:

| Parada | Hex       | Uso |
|--------|-----------|-----|
| Top    | `#7B6CA6` | Violeta polvoriento (cielo) |
| Mid    | `#D96BA0` | Magenta / rosa |
| Bottom | `#F6B07A` | Melocotón cálido (horizonte) |

`background: linear-gradient(180deg, #7B6CA6 0%, #D96BA0 48%, #F6B07A 100%);`

### Acentos "chrome" (del mando)
| Nombre        | Hex       | Uso |
|---------------|-----------|-----|
| Indigo        | `#2B3A8F` | Azul profundo |
| Electric blue | `#1E6FD9` | Botón / brillo |
| Chrome light  | `#8FB8E8` | Reflejo metálico |

### Neutros
| Nombre   | Hex       |
|----------|-----------|
| Off-white| `#F7F3EE` |
| Ink      | `#1A1526` |

### Acentos del "cebo" (para los señuelos del phishing)
| Nombre        | Hex       | Uso en la trampa |
|---------------|-----------|------------------|
| Fake verified | `#36C17A` | Falso "verificado ✓", "4.9/5" |
| Urgencia      | `#E3443B` | Cuenta atrás, "¡solo quedan 3!" |

## 2. Tipografía (genérica, de libre uso)

- **Display / titulares:** `Anton` o `Archivo Black` — condensada, pesada, en
  mayúsculas. Evoca el aire del cartel sin copiar el logotipo real.
- **Cuerpo / UI:** `Inter`.
- **Mono (para la pantalla de revelación / "lo que tecleaste"):** `JetBrains Mono`.

## 3. Tratamiento visual

- Fondo: degradado sunset + motivo tonal de palmeras / "VI" estilizado al ~12-18 %
  de opacidad (dibujo propio, no el emblema oficial).
- Silueta de mando genérica (no el DualSense oficial): blanco con transición a
  azul chrome en la parte baja.
- Glow suave rosa/azul detrás de los elementos destacados.
- Esquinas redondeadas 16-24px, sombras largas y difusas.

## 4. Tokens Tailwind (listos para `tailwind.config`)

```js
theme: {
  extend: {
    colors: {
      sunset: { top: '#7B6CA6', mid: '#D96BA0', bottom: '#F6B07A' },
      chrome: { indigo: '#2B3A8F', blue: '#1E6FD9', light: '#8FB8E8' },
      ink: '#1A1526',
      paper: '#F7F3EE',
      bait: { ok: '#36C17A', urgent: '#E3443B' },
    },
    fontFamily: {
      display: ['Anton', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
}
```
