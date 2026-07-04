import { Insumo } from "@/data/mock";
import { currency } from "@/lib/apu";

type InsumosTableProps = {
  insumos: Insumo[];
};

const categoryTone: Record<Insumo["categoria"], string> = {
  Material: "bg-mint text-[#40533c]",
  "Mano de obra": "bg-[#eef2f6] text-steel",
  Equipo: "bg-[#f6ece6] text-clay",
};

export function InsumosTable({ insumos }: InsumosTableProps) {
  return (
    <section className="rounded-lg border border-line bg-white">
      <div className="flex flex-col gap-2 border-b border-line p-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold">Catalogo de insumos</p>
          <p className="mt-1 text-sm text-neutral-500">
            Base local editable para materiales, cuadrillas y equipo.
          </p>
        </div>
        <button className="h-9 rounded-md border border-line px-3 text-sm font-medium hover:bg-[#f7f7f4]">
          Agregar insumo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead className="bg-[#f7f7f4] text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">Insumo</th>
              <th className="px-5 py-3 font-medium">Categoria</th>
              <th className="px-5 py-3 font-medium">Unidad</th>
              <th className="px-5 py-3 text-right font-medium">Precio</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.id} className="border-t border-line">
                <td className="px-5 py-3 font-medium">{insumo.nombre}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${categoryTone[insumo.categoria]}`}>
                    {insumo.categoria}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-500">{insumo.unidad}</td>
                <td className="px-5 py-3 text-right font-semibold">
                  {currency(insumo.precio)}
                  <span className="font-normal text-neutral-500">/{insumo.unidad}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
