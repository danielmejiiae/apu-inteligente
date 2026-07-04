import { CheckCircle2, CircleDashed } from "lucide-react";
import { ConceptoApu, Insumo } from "@/data/mock";
import { calculateApu, currency } from "@/lib/apu";

type ConceptosViewProps = {
  conceptos: ConceptoApu[];
  insumos: Insumo[];
};

export function ConceptosView({ conceptos, insumos }: ConceptosViewProps) {
  const pilot = conceptos.find((concepto) => concepto.id === "muro-block") ?? conceptos[0];
  const apu = calculateApu(pilot, insumos);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
      <section className="rounded-lg border border-line bg-white">
        <div className="border-b border-line p-5">
          <p className="text-sm font-semibold">Conceptos iniciales</p>
          <p className="mt-1 text-sm text-neutral-500">10 conceptos listos para evolucionar.</p>
        </div>
        <div className="divide-y divide-line">
          {conceptos.map((concepto) => {
            const result = calculateApu(concepto, insumos);
            const Icon = concepto.estado === "Calculado" ? CheckCircle2 : CircleDashed;

            return (
              <article key={concepto.id} className="p-4 transition hover:bg-[#f7f7f4]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={concepto.estado === "Calculado" ? "text-sage" : "text-neutral-400"} />
                      <p className="text-sm font-semibold">{concepto.nombre}</p>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">{concepto.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{currency(result.precioUnitario)}</p>
                    <p className="text-xs text-neutral-500">/{concepto.unidad}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white">
        <div className="border-b border-line p-5">
          <p className="text-sm font-semibold">{pilot.nombre}</p>
          <p className="mt-1 text-sm text-neutral-500">{pilot.descripcion}</p>
        </div>
        <div className="grid gap-3 border-b border-line p-5 sm:grid-cols-3">
          <div className="rounded-md bg-[#f7f7f4] p-3">
            <p className="text-xs text-neutral-500">Costo directo</p>
            <p className="mt-1 text-xl font-semibold">{currency(apu.costoDirecto)}</p>
          </div>
          <div className="rounded-md bg-[#f7f7f4] p-3">
            <p className="text-xs text-neutral-500">Indirectos 15%</p>
            <p className="mt-1 text-xl font-semibold">{currency(apu.indirectos)}</p>
          </div>
          <div className="rounded-md bg-mint p-3">
            <p className="text-xs text-neutral-600">Precio unitario</p>
            <p className="mt-1 text-xl font-semibold">{currency(apu.precioUnitario)}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="bg-[#f7f7f4] text-left text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-5 py-3 font-medium">Insumo</th>
                <th className="px-5 py-3 font-medium">Cantidad</th>
                <th className="px-5 py-3 font-medium">Precio</th>
                <th className="px-5 py-3 text-right font-medium">Importe</th>
              </tr>
            </thead>
            <tbody>
              {apu.lines.map((line) => (
                <tr key={line.insumo.id} className="border-t border-line">
                  <td className="px-5 py-3">
                    <p className="font-medium">{line.insumo.nombre}</p>
                    <p className="text-xs text-neutral-500">{line.nota}</p>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">
                    {line.cantidad} {line.insumo.unidad}
                  </td>
                  <td className="px-5 py-3 text-neutral-600">
                    {currency(line.insumo.precio)}/{line.insumo.unidad}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">{currency(line.importe)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
