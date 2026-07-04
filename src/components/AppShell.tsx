"use client";

import {
  BarChart3,
  Blocks,
  Calculator,
  FolderKanban,
  Package,
  Search,
  Settings,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { InsumosTable } from "@/components/InsumosTable";
import { ConceptosView } from "@/components/ConceptosView";
import { PresupuestosView } from "@/components/PresupuestosView";
import { SettingsView } from "@/components/SettingsView";
import { conceptos, insumos, presupuestos } from "@/data/mock";

const modules = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "insumos", label: "Insumos", icon: Package },
  { id: "conceptos", label: "Conceptos APU", icon: Calculator },
  { id: "presupuestos", label: "Presupuestos", icon: FolderKanban },
  { id: "configuracion", label: "Configuracion", icon: Settings },
] as const;

type ModuleId = (typeof modules)[number]["id"];

export function AppShell() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");
  const activeLabel = modules.find((module) => module.id === activeModule)?.label;
  const pilotConcept = useMemo(
    () => conceptos.find((concepto) => concepto.id === "muro-block") ?? conceptos[0],
    [],
  );

  return (
    <main className="min-h-screen p-3 text-ink sm:p-4 lg:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1480px] overflow-hidden rounded-lg border border-line bg-white/76 shadow-soft backdrop-blur">
        <aside className="hidden w-72 shrink-0 border-r border-line bg-[#f5f5f1]/92 p-4 lg:flex lg:flex-col">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="grid size-10 place-items-center rounded-md bg-ink text-white">
              <Blocks size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold leading-5">APU Inteligente</p>
              <p className="text-xs text-neutral-500">Precios unitarios MX</p>
            </div>
          </div>

          <nav className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModule(module.id)}
                  className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm transition ${
                    isActive
                      ? "bg-ink text-white shadow-sm"
                      : "text-neutral-600 hover:bg-white hover:text-ink"
                  }`}
                >
                  <Icon size={17} />
                  {module.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-md border border-line bg-white p-3">
            <p className="text-xs font-medium text-neutral-500">Concepto piloto</p>
            <p className="mt-1 text-sm font-semibold">{pilotConcept.nombre}</p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Unidad m2, mortero cemento-arena, indirectos y utilidad al 15%.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-line bg-white/88 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  {activeLabel}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Control de APUs para obra
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden h-10 items-center gap-2 rounded-md border border-line bg-[#f7f7f4] px-3 text-sm text-neutral-500 sm:flex">
                  <Search size={16} />
                  Buscar insumo o concepto
                </div>
                <button className="h-10 rounded-md bg-ink px-4 text-sm font-medium text-white transition hover:bg-neutral-700">
                  Nuevo APU
                </button>
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModule(module.id)}
                    className={`flex h-9 shrink-0 items-center gap-2 rounded-md border px-3 text-sm ${
                      isActive
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white text-neutral-600"
                    }`}
                  >
                    <Icon size={15} />
                    {module.label}
                  </button>
                );
              })}
            </div>
          </header>

          <div className="p-4 sm:p-6">
            {activeModule === "dashboard" && (
              <Dashboard insumos={insumos} conceptos={conceptos} presupuestos={presupuestos} />
            )}
            {activeModule === "insumos" && <InsumosTable insumos={insumos} />}
            {activeModule === "conceptos" && (
              <ConceptosView conceptos={conceptos} insumos={insumos} />
            )}
            {activeModule === "presupuestos" && (
              <PresupuestosView
                presupuestos={presupuestos}
                conceptos={conceptos}
                insumos={insumos}
              />
            )}
            {activeModule === "configuracion" && <SettingsView />}
          </div>
        </section>
      </div>
    </main>
  );
}
