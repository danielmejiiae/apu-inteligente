import { ConceptoApu, Insumo, Presupuesto } from "@/data/mock";
import { calculateApu, calculateBudgetTotal, currency } from "@/lib/apu";

type PresupuestosViewProps = {
  presupuestos: Presupuesto[];
  conceptos: ConceptoApu[];
  insumos: Insumo[];
};

export function PresupuestosView({ presupuestos, conceptos, insumos }: PresupuestosViewProps) {
  return (
    <div className="space-y-5">
      {presupuestos.map((presupuesto) => (
        <section key={presupuesto.id} className="rounded-lg border border-line bg-white">
          <div className="flex flex-col gap-3 border-b border-line p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{presupuesto.proyecto}</p>
                <span className="rounded-full bg-[#f7f7f4] px-2 py-1 text-xs text-neutral-500">
                  {presupuesto.estado}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">{presupuesto.cliente}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-neutral-500">Total estimado</p>
              <p className="text-2xl font-semibold tracking-tight">
                {currency(calculateBudgetTotal(presupuesto, conceptos, insumos))}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead className="bg-[#f7f7f4] text-left text-xs uppercase text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Concepto</th>
                  <th className="px-5 py-3 font-medium">Cantidad</th>
                  <th className="px-5 py-3 font-medium">PU</th>
                  <th className="px-5 py-3 text-right font-medium">Importe</th>
                </tr>
              </thead>
              <tbody>
                {presupuesto.partidas.map((partida) => {
                  const concepto = conceptos.find((candidate) => candidate.id === partida.conceptoId);

                  if (!concepto) {
                    return null;
                  }

                  const apu = calculateApu(concepto, insumos);

                  return (
                    <tr key={partida.conceptoId} className="border-t border-line">
                      <td className="px-5 py-3 font-medium">{concepto.nombre}</td>
                      <td className="px-5 py-3 text-neutral-600">
                        {partida.cantidad} {concepto.unidad}
                      </td>
                      <td className="px-5 py-3 text-neutral-600">{currency(apu.precioUnitario)}</td>
                      <td className="px-5 py-3 text-right font-semibold">
                        {currency(apu.precioUnitario * partida.cantidad)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
