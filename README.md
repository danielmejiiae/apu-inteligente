# APU Inteligente

APU Inteligente es una app web para calcular analisis de precios unitarios de obra en Mexico.

La version actual permite consultar un dashboard, administrar datos mockeados de insumos, revisar conceptos APU iniciales, calcular precios unitarios y armar presupuestos basicos por proyecto.

## Estado actual

Version: v0.2

Esta version profesionaliza la estructura del proyecto y agrega documentacion base sin cambiar la funcionalidad principal.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- pnpm
- Datos mockeados en TypeScript

## Como correr localmente

Instala dependencias:

```bash
pnpm install
```

Corre el servidor de desarrollo:

```bash
pnpm dev
```

Abre:

```txt
http://127.0.0.1:3000
```

Genera build de produccion:

```bash
pnpm run build
```

Sirve la version compilada:

```bash
pnpm start
```

## Estructura principal

```txt
app/
  layout.tsx
  page.tsx
  globals.css

src/
  components/
  data/
  lib/
```

## Documentacion

- `PRODUCT.md`: vision del producto, roadmap, reglas de diseno y reglas de negocio.
- `ARCHITECTURE_REVIEW.md`: revision tecnica, riesgos y propuesta de estructura futura.
