import { ArrowUpRight, Calculator, ClipboardList, Package, WalletCards } from "lucide-react";
import { ConceptoApu, Insumo, Presupuesto } from "@/data/mock";
import { calculateApu, calculateBudgetTotal, currency } from "@/lib/apu";

type DashboardProps = {
  insumos: Insumo[];
  conceptos: ConceptoApu[];
  presupuestos: Presupuesto[];
};

export function Dashboard({ insumos, conceptos, presupuestos }: DashboardProps) {
  const pilot = conceptos.find((concepto) => concepto.id === "muro-block") ?? conceptos[0];
  const pilotApu = calculateApu(pilot, insumos);
  const budgetTotal = presupuestos.reduce(
    (total, presupuesto) => total + calculateBudgetTotal(presupuesto, conceptos, insumos),
    0,
  );

  const metrics = [
    { label: "Insumos", value: insumos.length, helper: "Materiales, mano de obra y equipo", icon: Package },
    { label: "Conceptos APU", value: conceptos.length, helper: "Plantillas iniciales", icon: Calculator },
    { label: "Presupuestos", value: presupuestos.length, helper: "Proyectos mockeados", icon: ClipboardList },
    { label: "Monto estimado", value: currency(budgetTotal), helper: "Suma de presupuestos", icon: WalletCards },
  ];

  return (
    <div className="space-y-5">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article key={metric.label} className="rounded-lg border border-line bg-white p-4">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid size-9 place-items-center rounded-md bg-[#f7f7f4] text-neutral-600">
                  <Icon size={18} />
                </div>
                <ArrowUpRight size={16} className="text-neutral-400" />
              </div>
              <p className="text-sm text-neutral-500">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{metric.value}</p>
              <p className="mt-2 text-xs text-neutral-500">{metric.helper}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-line bg-white">
          <div className="border-b border-line p-5">
            <p className="text-sm font-semibold">Concepto piloto calculado</p>
            <p className="mt-1 text-sm text-neutral-500">{pilot.nombre}</p>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-4">
            <div>
              <p className="text-xs text-neutral-500">Materiales</p>
              <p className="mt-1 text-lg font-semibold">{currency(pilotApu.materiales)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Mano de obra</p>
              <p className="mt-1 text-lg font-semibold">{currency(pilotApu.manoObra)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Costo directo</p>
              <p className="mt-1 text-lg font-semibold">{currency(pilotApu.costoDirecto)}</p>
            </div>
            <div className="rounded-md bg-mint p-3">
              <p className="text-xs text-neutral-600">Precio unitario</p>
              <p className="mt-1 text-xl font-semibold">{currency(pilotApu.precioUnitario)}</p>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-5">
          <p className="text-sm font-semibold">Flujo del MVP</p>
          <div className="mt-4 space-y-3">
            {["Captura insumos", "Arma conceptos APU", "Calcula precio unitario", "Integra presupuestos"].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-[#f7f7f4] text-xs font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-neutral-700">{step}</span>
                </div>
              ),
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
