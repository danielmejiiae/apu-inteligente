# APU Inteligente

## Vision del producto

APU Inteligente es una app web para constructores en Mexico que permite crear, revisar y calcular analisis de precios unitarios de obra de forma clara, rapida y confiable.

La vision es convertir el trabajo tecnico de presupuestacion en una experiencia ordenada: catalogos vivos de insumos, conceptos reutilizables, calculos transparentes y presupuestos faciles de explicar al cliente o al equipo de obra.

## Filosofia visual

La interfaz debe sentirse moderna, sobria y profesional, inspirada en herramientas como Notion y Linear:

- Minimalismo funcional, sin decoracion innecesaria.
- Sidebar persistente para navegar entre modulos.
- Tablas claras, densas pero legibles.
- Tarjetas sobrias para resumenes y estados.
- Bordes suaves, radios pequenos y sombras ligeras.
- Tipografia limpia, jerarquia evidente y mucho aire visual.
- Colores neutros con acentos discretos para categorias y estados.

## Modulos actuales

- Dashboard: vista general del sistema, metricas y concepto piloto.
- Insumos: catalogo mockeado de materiales, mano de obra y equipo.
- Conceptos APU: conceptos iniciales con desglose de insumos y precio unitario.
- Presupuestos: presupuestos basicos por proyecto usando conceptos APU.
- Configuracion: porcentajes base de indirectos y utilidad.

## Modulos futuros

- Proyectos y obras.
- Clientes.
- Cuadrillas y rendimientos.
- Tarjetas de maquinaria y herramienta menor.
- Explosiones de insumos.
- Importacion y exportacion a Excel/PDF.
- Versionado de precios.
- Integracion con Supabase.
- Usuarios, roles y permisos.
- Asistente IA para revision tecnica y recomendaciones.

## Roadmap

### v0.1

- Estructura inicial con Next.js, React, TypeScript y Tailwind CSS.
- Datos mockeados locales.
- Dashboard, insumos, conceptos, presupuestos y configuracion.
- Calculo funcional del concepto piloto.

### v0.2

- Reorganizacion profesional de estructura.
- Documentacion base de producto y arquitectura.
- Separacion clara entre `app/`, `src/components`, `src/data` y `src/lib`.
- Preparacion para crecimiento sin cambiar la funcionalidad principal.

### v0.3

- Edicion local de insumos y conceptos.
- Formularios para crear y modificar APUs.
- Validaciones de captura.
- Mejoras en busqueda y filtros.

### v0.4

- Presupuestos editables por proyecto.
- Partidas agrupadas por capitulo.
- Totales, subtotales y exportacion inicial.

### v0.5

- Persistencia local mejorada.
- Preparacion de esquema de base de datos.
- Migracion gradual hacia Supabase.

### v1.0

- App lista para uso operativo con autenticacion, base de datos, proyectos reales, exportaciones y asistente IA integrado.

## Reglas de diseno

- No ocultar calculos importantes: el usuario debe entender de donde sale cada precio.
- Mantener acciones principales visibles y consistentes.
- Evitar pantallas tipo landing page dentro de la herramienta.
- Priorizar flujos de trabajo sobre elementos decorativos.
- Usar tablas para datos comparables y tarjetas para resumenes.
- Mantener nombres de modulos y conceptos con lenguaje de obra en Mexico.
- Evitar cambios visuales que resten claridad al calculo del APU.

## Reglas de negocio del APU

- Costo directo = materiales + mano de obra + equipo/herramienta.
- Precio unitario = costo directo + indirectos + utilidad.
- Indirectos default: 15%.
- Utilidad default: 15%.
- Los insumos tienen categoria, unidad y precio.
- Los conceptos APU se forman por insumos y cantidades.
- Los presupuestos multiplican cantidad de concepto por precio unitario.
- El calculo debe permanecer trazable y auditable.

## Vision de IA: Ingeniero IA

La IA debe evolucionar como un "Ingeniero IA" que acompana al constructor, no como un reemplazo del criterio tecnico.

Sus funciones futuras pueden incluir:

- Revisar si un concepto APU parece incompleto.
- Sugerir insumos faltantes segun el tipo de partida.
- Detectar rendimientos atipicos.
- Explicar variaciones de precio.
- Proponer conceptos base a partir de una descripcion de obra.
- Ayudar a preparar presupuestos preliminares.
- Mantener una conversacion tecnica clara, con supuestos visibles y recomendaciones justificadas.
