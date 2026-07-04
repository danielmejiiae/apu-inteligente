import { defaults } from "@/data/mock";

export function SettingsView() {
  return (
    <section className="max-w-3xl rounded-lg border border-line bg-white">
      <div className="border-b border-line p-5">
        <p className="text-sm font-semibold">Configuracion base</p>
        <p className="mt-1 text-sm text-neutral-500">
          Valores iniciales del MVP. En una siguiente version se podran editar y guardar.
        </p>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <label className="block rounded-md border border-line bg-[#f7f7f4] p-4">
          <span className="text-xs font-medium uppercase text-neutral-500">Indirectos</span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-semibold">{defaults.indirectos * 100}%</span>
            <input
              readOnly
              value={defaults.indirectos * 100}
              className="h-10 w-24 rounded-md border border-line bg-white px-3 text-right text-sm"
            />
          </div>
        </label>
        <label className="block rounded-md border border-line bg-[#f7f7f4] p-4">
          <span className="text-xs font-medium uppercase text-neutral-500">Utilidad</span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-semibold">{defaults.utilidad * 100}%</span>
            <input
              readOnly
              value={defaults.utilidad * 100}
              className="h-10 w-24 rounded-md border border-line bg-white px-3 text-right text-sm"
            />
          </div>
        </label>
      </div>
      <div className="border-t border-line p-5">
        <p className="text-sm font-medium">Formula activa</p>
        <p className="mt-2 rounded-md bg-mint p-3 text-sm text-neutral-700">
          Precio unitario = costo directo + indirectos + utilidad
        </p>
      </div>
    </section>
  );
}
