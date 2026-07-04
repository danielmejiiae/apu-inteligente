export type Unit = "kg" | "m3" | "m2" | "pza" | "dia" | "m" | "global";
export type InputCategory = "Material" | "Mano de obra" | "Equipo";

export type Insumo = {
  id: string;
  nombre: string;
  categoria: InputCategory;
  unidad: Unit;
  precio: number;
};

export type ApuItem = {
  insumoId: string;
  cantidad: number;
  nota?: string;
};

export type ConceptoApu = {
  id: string;
  nombre: string;
  unidad: Unit;
  estado: "Calculado" | "Plantilla";
  descripcion: string;
  items: ApuItem[];
};

export type Presupuesto = {
  id: string;
  proyecto: string;
  cliente: string;
  estado: "Borrador" | "Revisar" | "Aprobado";
  partidas: Array<{
    conceptoId: string;
    cantidad: number;
  }>;
};

export const defaults = {
  indirectos: 0.15,
  utilidad: 0.15,
};

export const insumos: Insumo[] = [
  { id: "cemento", nombre: "Cemento", categoria: "Material", unidad: "kg", precio: 6 },
  { id: "mortero", nombre: "Mortero", categoria: "Material", unidad: "kg", precio: 5.5 },
  { id: "yeso", nombre: "Yeso", categoria: "Material", unidad: "kg", precio: 2.75 },
  { id: "arena", nombre: "Arena", categoria: "Material", unidad: "m3", precio: 545.45 },
  { id: "grava", nombre: "Grava", categoria: "Material", unidad: "m3", precio: 727.27 },
  { id: "piedra-caliza", nombre: "Piedra caliza", categoria: "Material", unidad: "m3", precio: 1000 },
  { id: "varilla", nombre: "Varilla corrugada", categoria: "Material", unidad: "kg", precio: 22 },
  { id: "alambron", nombre: "Alambron", categoria: "Material", unidad: "kg", precio: 30 },
  { id: "alambre", nombre: "Alambre recocido", categoria: "Material", unidad: "kg", precio: 32 },
  { id: "concreto-200", nombre: "Concreto premezclado fc=200", categoria: "Material", unidad: "m3", precio: 3800 },
  { id: "malla-10", nombre: "Malla 6x6-10/10", categoria: "Material", unidad: "m2", precio: 20 },
  { id: "malla-8", nombre: "Malla 6x6-8/8", categoria: "Material", unidad: "m2", precio: 32 },
  { id: "block", nombre: "Block 12x18x40", categoria: "Material", unidad: "pza", precio: 13.5 },
  { id: "estuco", nombre: "Estuco blanco", categoria: "Material", unidad: "kg", precio: 8.8 },
  { id: "tezontle", nombre: "Tezontle", categoria: "Material", unidad: "m3", precio: 533.33 },
  { id: "polietileno", nombre: "Polietileno 600 micras", categoria: "Material", unidad: "m2", precio: 20 },
  { id: "peon", nombre: "Peon", categoria: "Mano de obra", unidad: "dia", precio: 500 },
  { id: "oficial", nombre: "Oficial", categoria: "Mano de obra", unidad: "dia", precio: 750 },
  { id: "bailarina", nombre: "Bailarina", categoria: "Equipo", unidad: "dia", precio: 900 },
  { id: "retro", nombre: "Retroexcavadora", categoria: "Equipo", unidad: "dia", precio: 7500 },
];

export const conceptos: ConceptoApu[] = [
  {
    id: "muro-block",
    nombre: "Muro de block 12x18x40 cm",
    unidad: "m2",
    estado: "Calculado",
    descripcion: "Asentado con mortero cemento-arena. Concepto piloto del MVP.",
    items: [
      { insumoId: "block", cantidad: 13, nota: "Piezas por m2 con juntas" },
      { insumoId: "cemento", cantidad: 4.8, nota: "Mortero cemento-arena" },
      { insumoId: "arena", cantidad: 0.035, nota: "Arena para mezcla" },
      { insumoId: "peon", cantidad: 0.12, nota: "Cuadrilla por m2" },
      { insumoId: "oficial", cantidad: 0.12, nota: "Cuadrilla por m2" },
    ],
  },
  {
    id: "firme-10",
    nombre: "Firme 10 cm fc=150 con malla 6x6-10/10",
    unidad: "m2",
    estado: "Plantilla",
    descripcion: "Base para firme con concreto y malla electrosoldada.",
    items: [
      { insumoId: "concreto-200", cantidad: 0.1 },
      { insumoId: "malla-10", cantidad: 1.05 },
      { insumoId: "peon", cantidad: 0.08 },
      { insumoId: "oficial", cantidad: 0.04 },
    ],
  },
  {
    id: "plantilla-5",
    nombre: "Plantilla 5 cm fc=100",
    unidad: "m2",
    estado: "Plantilla",
    descripcion: "Plantilla de concreto pobre para desplante.",
    items: [
      { insumoId: "concreto-200", cantidad: 0.05 },
      { insumoId: "peon", cantidad: 0.04 },
    ],
  },
  {
    id: "castillo",
    nombre: "Castillo 12x12 cm",
    unidad: "m",
    estado: "Plantilla",
    descripcion: "Castillo armado y colado en sitio.",
    items: [
      { insumoId: "varilla", cantidad: 3.6 },
      { insumoId: "alambre", cantidad: 0.08 },
      { insumoId: "concreto-200", cantidad: 0.018 },
      { insumoId: "oficial", cantidad: 0.07 },
      { insumoId: "peon", cantidad: 0.07 },
    ],
  },
  {
    id: "dala",
    nombre: "Dala 20x30 cm",
    unidad: "m",
    estado: "Plantilla",
    descripcion: "Dala de concreto armado.",
    items: [
      { insumoId: "varilla", cantidad: 5.2 },
      { insumoId: "alambre", cantidad: 0.1 },
      { insumoId: "concreto-200", cantidad: 0.06 },
      { insumoId: "oficial", cantidad: 0.1 },
      { insumoId: "peon", cantidad: 0.1 },
    ],
  },
  {
    id: "aplanado-yeso",
    nombre: "Aplanado de yeso",
    unidad: "m2",
    estado: "Plantilla",
    descripcion: "Aplanado fino en muro interior.",
    items: [
      { insumoId: "yeso", cantidad: 7.5 },
      { insumoId: "oficial", cantidad: 0.08 },
      { insumoId: "peon", cantidad: 0.04 },
    ],
  },
  {
    id: "aplanado-mortero",
    nombre: "Aplanado mortero + estuco",
    unidad: "m2",
    estado: "Plantilla",
    descripcion: "Aplanado base mortero con acabado estuco.",
    items: [
      { insumoId: "mortero", cantidad: 12 },
      { insumoId: "estuco", cantidad: 2.2 },
      { insumoId: "oficial", cantidad: 0.09 },
      { insumoId: "peon", cantidad: 0.05 },
    ],
  },
  {
    id: "zapata",
    nombre: "Zapata aislada",
    unidad: "m3",
    estado: "Plantilla",
    descripcion: "Zapata de concreto armado.",
    items: [
      { insumoId: "concreto-200", cantidad: 1 },
      { insumoId: "varilla", cantidad: 85 },
      { insumoId: "alambre", cantidad: 1.2 },
      { insumoId: "oficial", cantidad: 0.65 },
      { insumoId: "peon", cantidad: 0.85 },
    ],
  },
  {
    id: "losa",
    nombre: "Losa vigueta y bovedilla",
    unidad: "m2",
    estado: "Plantilla",
    descripcion: "Losa aligerada con capa de compresion.",
    items: [
      { insumoId: "concreto-200", cantidad: 0.07 },
      { insumoId: "malla-8", cantidad: 1.05 },
      { insumoId: "oficial", cantidad: 0.16 },
      { insumoId: "peon", cantidad: 0.16 },
    ],
  },
  {
    id: "muro-contencion",
    nombre: "Muro de contencion",
    unidad: "m3",
    estado: "Plantilla",
    descripcion: "Muro armado de contencion, base editable para siguientes versiones.",
    items: [
      { insumoId: "concreto-200", cantidad: 1 },
      { insumoId: "varilla", cantidad: 95 },
      { insumoId: "alambre", cantidad: 1.5 },
      { insumoId: "retro", cantidad: 0.08 },
      { insumoId: "oficial", cantidad: 0.9 },
      { insumoId: "peon", cantidad: 1.1 },
    ],
  },
];

export const presupuestos: Presupuesto[] = [
  {
    id: "casa-valle",
    proyecto: "Casa Valle",
    cliente: "Cliente particular",
    estado: "Borrador",
    partidas: [
      { conceptoId: "muro-block", cantidad: 86 },
      { conceptoId: "firme-10", cantidad: 72 },
      { conceptoId: "castillo", cantidad: 48 },
    ],
  },
  {
    id: "local-centro",
    proyecto: "Local Centro",
    cliente: "Inmobiliaria Norte",
    estado: "Revisar",
    partidas: [
      { conceptoId: "plantilla-5", cantidad: 120 },
      { conceptoId: "zapata", cantidad: 9.5 },
      { conceptoId: "muro-contencion", cantidad: 14 },
    ],
  },
];
