# Architecture Review

## Estructura actual

La version v0.2 queda organizada asi:

```txt
app/
  layout.tsx
  page.tsx
  globals.css

src/
  components/
    AppShell.tsx
    Dashboard.tsx
    InsumosTable.tsx
    ConceptosView.tsx
    PresupuestosView.tsx
    SettingsView.tsx

  data/
    mock.ts

  lib/
    apu.ts
```

Ademas, la raiz conserva la configuracion de Next.js, TypeScript, Tailwind, ESLint y pnpm.

## Problemas actuales

- Los datos mockeados viven en un solo archivo grande.
- No existe todavia una capa de servicios para leer o guardar datos.
- Los componentes son funcionales, pero mezclan vista y algunas decisiones de presentacion.
- La navegacion entre modulos vive en estado local dentro de `AppShell`.
- Los botones de crear o editar son visuales, pero aun no ejecutan acciones reales.
- No hay pruebas automatizadas para proteger el calculo APU.
- No hay persistencia local ni base de datos.
- La configuracion de indirectos y utilidad todavia es estatica.

## Propuesta de estructura futura

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  insumos/
  conceptos/
  presupuestos/
  configuracion/

src/
  components/
    layout/
    ui/
    dashboard/
    insumos/
    conceptos/
    presupuestos/

  data/
    mock/

  domain/
    apu/
      calculations.ts
      types.ts
      validation.ts

  lib/
    format.ts
    constants.ts

  services/
    insumos-service.ts
    conceptos-service.ts
    presupuestos-service.ts

  storage/
    local/
    supabase/
```

Esta estructura separaria dominio, presentacion, servicios y persistencia. Tambien facilitaria migrar de mock data a Supabase sin reescribir la interfaz completa.

## Riesgos tecnicos

- Cambiar la formula APU sin pruebas podria alterar presupuestos de forma silenciosa.
- Crecer el archivo de mock data puede volver dificil revisar cambios.
- Agregar Supabase sin una capa de servicios podria acoplar toda la app a una base especifica.
- Mezclar reglas de negocio dentro de componentes dificultaria probar calculos.
- Los porcentajes globales deben versionarse o guardarse por presupuesto para evitar cambios historicos inesperados.
- El sistema debe distinguir entre precio vigente, precio usado en un presupuesto y precio historico.

## Proximos pasos recomendados

- Crear tipos de dominio separados para insumos, conceptos y presupuestos.
- Agregar pruebas unitarias para `calculateApu` y `calculateBudgetTotal`.
- Convertir modulos principales en rutas reales de Next.js.
- Crear formularios controlados para editar insumos y conceptos.
- Separar componentes de tabla, badge, card y metricas en `src/components/ui`.
- Definir un esquema de datos compatible con Supabase.
- Preparar exportacion a PDF/Excel para presupuestos.
- Disenar la primera interaccion del Ingeniero IA como revisor de conceptos APU.
