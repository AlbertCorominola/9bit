# Nuevos casos de éxito (Mas Terrats, Epicentre, Camping Les Medes) — Design

Fecha: 2026-09-18

## Contexto

La página de clientes (`app/[locale]/clients/ClientsContent.tsx`) muestra actualmente 5 casos de éxito web (Case_02 a Case_06) en un grid asimétrico, más 1 caso destacado (MultiEsports Ter). Todos son proyectos de desarrollo web.

9bit ha realizado también otros dos tipos de trabajo que aún no aparecen en la web:
1. Un **agente de IA** (recepcionista por email, "Rosa") para el cliente Mas Terrats (finca de bodas), construido en n8n. Gestiona consultas, disponibilidad, presupuestos y deriva casos complejos a la propietaria, integrado con un CRM propio (Dolomit).
2. **Instalaciones de paneles LED**, en colaboración con Megalux (instalador físico), en dos ubicaciones: Epicentre (Palamós) y Camping Les Medes.

Este spec cubre solo la incorporación de estos 3 nuevos casos a la página de clientes existente. La mejora general de UX/diseño/features de la web queda fuera de alcance y se abordará en un brainstorming separado.

## Objetivo

Ampliar el grid de casos de éxito de 5 a 8 tarjetas, añadiendo:
- **Case_07 — Mas Terrats** (tipo `ai-agent`)
- **Case_08 — Epicentre** (tipo `installation`)
- **Case_09 — Camping Les Medes** (tipo `installation`)

Diferenciando visualmente el tipo de proyecto (web / agente IA / instalación) y sin enlazar a "Ir al proyecto" en los 3 casos nuevos (ni Mas Terrats ni las instalaciones tienen una web propia que mostrar como resultado del trabajo).

## Restricciones acordadas con el cliente

- **Mas Terrats**: sin link a masterrats.com. Se destaca el agente de email (Rosa), no el agente de voz (Vapi) — aunque ambos existen, el caso de uso a mostrar es el de correo.
- **Epicentre y Camping Les Medes**: no se deben "publicitar" como casos completos con link — solo mencionar dónde se instalaron los paneles LED, en colaboración con Megalux. Sin botón "Ir al proyecto".

## Assets disponibles

Ya copiados a `public/clients/`:
- `pre-epicentre in.jpeg` — Epicentre, interior, ANTES de la instalación
- `epicentre-in.jpeg` — Epicentre, interior, DESPUÉS
- `epicentre-out.jpeg` — Epicentre, exterior, DESPUÉS (visualmente importante — muestra el impacto desde fuera)
- `camping_les_medes.jpeg` — foto fija de Camping Les Medes (no se usa en el diseño final, se prioriza el vídeo)
- `video_camping.mp4` — vídeo de la instalación en Camping Les Medes

## Diseño

### 1. Datos (`ClientsContent.tsx`)

Nuevas constantes/extensiones junto a las existentes (`CASE_COL_SPANS`, `CASE_URLS`):

```ts
const CASE_TYPES = ['web', 'web', 'web', 'web', 'web', 'ai-agent', 'installation', 'installation'] as const;

const CASE_COL_SPANS = [
  'md:col-span-6',  // Case_02
  'md:col-span-6',  // Case_03
  'md:col-span-5',  // Case_04
  'md:col-span-7',  // Case_05
  'md:col-span-12', // Case_06
  'md:col-span-4',  // Case_07 Mas Terrats
  'md:col-span-8',  // Case_08 Epicentre (galería de 3 fotos, necesita más ancho)
  'md:col-span-12', // Case_09 Camping Les Medes (vídeo a ancho completo)
];

const CASE_URLS = [
  'https://creuers2mes2.com/',
  'https://massoles.com/',
  'https://www.gestoriaguileraperez.com/',
  'https://www.ooadditives.com/',
  'https://restaurantarestestanyol.com/',
  '', // Mas Terrats — sin link
  '', // Epicentre — sin link
  '', // Camping Les Medes — sin link
];
```

El renderizado condicional del botón "Ir al proyecto" (`{c.url && <a>...}`) ya existe implícitamente en el patrón de `FEATURED_URL`; se replica para cada tarjeta del grid: el botón solo se pinta si `c.url` es truthy.

### 2. Diferenciación visual por tipo

Icono pequeño junto al badge (`lucide-react`, ya en el proyecto):
- `web` → `Globe`
- `ai-agent` → `Sparkles`
- `installation` → `Zap`

Se añade al `CASE_ICON_MAP` y se pinta junto al badge `Case_0X` en la cabecera de cada tarjeta (mismo patrón visual que el badge existente, tamaño 12px).

### 3. Contenido de las tarjetas nuevas

**Case_07 — Mas Terrats** (`ai-agent`, sin imagen, mantiene el degradado actual)
- Industria: "Eventos y bodas"
- Descripción: agente de IA recepcionista por email (Rosa) que gestiona consultas, disponibilidad, presupuestos y deriva casos complejos; integrado con CRM propio
- Métrica: `24/7` — label "atención automatizada"

**Case_08 — Epicentre** (`installation`, mini-galería de 3 fotos en vez de degradado)
- Industria: "Ocio nocturno"
- Descripción: instalación de paneles LED en colaboración con Megalux
- Galería: 3 fotos en fila dentro de la cabecera de la tarjeta (más alta que el resto, ~h-48 en vez de h-28, dado que `md:col-span-8`), cada una con etiqueta pequeña superpuesta: "Antes" (`pre-epicentre in.jpeg`), "Después — interior" (`epicentre-in.jpeg`), "Después — exterior" (`epicentre-out.jpeg`)
- Métrica: en vez de número, texto destacado **"Megalux"** + label "instalación en colaboración con"

**Case_09 — Camping Les Medes** (`installation`, ancho completo, vídeo en vez de degradado)
- Industria: "Turismo / Camping"
- Descripción: instalación de paneles LED en colaboración con Megalux
- Cabecera: `video_camping.mp4` en autoplay, muted, loop, playsInline, altura ~h-64 (más alta al ser ancho completo)
- Métrica: mismo patrón que Epicentre — **"Megalux"** + "instalación en colaboración con"

### 4. Sección de industrias

Se añaden 2 pills nuevas al array `INDUSTRIES` (actualmente 6): **"Eventos"** (icono `PartyPopper`) e **"Iluminación"** (icono `Lightbulb`).

### 5. Traducciones

Se añaden entradas en `messages/es.json`, `messages/ca.json`, `messages/en.json`, siguiendo la estructura existente:
- `clients_page.cases[5..7]` — badge, title, industry, desc, metric, metricLabel (para los 3 casos nuevos)
- `clients_page.industries[6..7]` — label (Eventos/Iluminación en cada idioma)

Los textos de "Antes" / "Después — interior" / "Después — exterior" de la galería de Epicentre también se traducen (nuevas claves, p.ej. `clients_page.cases.6.gallery_labels`).

## Fuera de alcance

- Mejora general de UX/diseño/features de la web (se aborda en un brainstorming separado)
- Foto `epicentre-out.jpeg` usada en cualquier otro lugar de la web (solo en la galería de esta tarjeta)
- Slider interactivo de comparación antes/después (se descartó a favor de 3 fotos fijas en fila, más simple y sin JS adicional)
- Optimización/compresión de `video_camping.mp4` (asumimos que el archivo ya está en un tamaño razonable para web; si no, se abordará al implementar)
