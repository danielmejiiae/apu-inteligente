import { ConceptoApu, defaults, Insumo, Presupuesto } from "@/data/mock";

export type ApuLine = {
  insumo: Insumo;
  cantidad: number;
  importe: number;
  nota?: string;
};

export type ApuResult = {
  lines: ApuLine[];
  materiales: number;
  manoObra: number;
  equipo: number;
  costoDirecto: number;
  indirectos: number;
  utilidad: number;
  precioUnitario: number;
};

const roundMoney = (value: number) => Math.round(value * 100) / 100;

export function currency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculateApu(concepto: ConceptoApu, insumos: Insumo[]): ApuResult {
  const lines: ApuLine[] = concepto.items
    .map((item) => {
      const insumo = insumos.find((candidate) => candidate.id === item.insumoId);

      if (!insumo) {
        return null;
      }

      const line: ApuLine = {
        insumo,
        cantidad: item.cantidad,
        importe: roundMoney(item.cantidad * insumo.precio),
      };

      if (item.nota) {
        line.nota = item.nota;
      }

      return line;
    })
    .filter((line): line is ApuLine => Boolean(line));

  const sumByCategory = (category: Insumo["categoria"]) =>
    roundMoney(
      lines
        .filter((line) => line.insumo.categoria === category)
        .reduce((total, line) => total + line.importe, 0),
    );

  const materiales = sumByCategory("Material");
  const manoObra = sumByCategory("Mano de obra");
  const equipo = sumByCategory("Equipo");
  const costoDirecto = roundMoney(materiales + manoObra + equipo);
  const indirectos = roundMoney(costoDirecto * defaults.indirectos);
  const utilidad = roundMoney(costoDirecto * defaults.utilidad);

  return {
    lines,
    materiales,
    manoObra,
    equipo,
    costoDirecto,
    indirectos,
    utilidad,
    precioUnitario: roundMoney(costoDirecto + indirectos + utilidad),
  };
}

export function calculateBudgetTotal(
  presupuesto: Presupuesto,
  conceptos: ConceptoApu[],
  insumos: Insumo[],
) {
  return roundMoney(
    presupuesto.partidas.reduce((total, partida) => {
      const concepto = conceptos.find((candidate) => candidate.id === partida.conceptoId);

      if (!concepto) {
        return total;
      }

      return total + calculateApu(concepto, insumos).precioUnitario * partida.cantidad;
    }, 0),
  );
}
