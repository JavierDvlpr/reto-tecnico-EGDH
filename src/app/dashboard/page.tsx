"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import SelectorMargen from "@/components/SelectorMargen";
import TarjetaCategoria from "@/components/TarjetaCategoria";
import TarjetaOportunidad from "@/components/TarjetaOportunidad";

export default function DashboardPage() {
  const [markup, setMarkup] = useState(35);
  const { oportunidades, resumen, cargando, error } = useDashboard(markup);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
        <header className="space-y-2 border-b pb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            El Gigante del Hogar
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Simulador de Rentabilidad e-Commerce
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Herramienta gerencial para estimar el costo de importacion en pesos colombianos (TRM $4.000 COP),
            evaluar margenes comerciales variables e identificar articulos prioritarios.
          </p>
        </header>

        <section className="bg-card p-6 rounded-xl border shadow-sm">
          <SelectorMargen markup={markup} onChange={setMarkup} />
        </section>

        {cargando && (
          <div className="py-12 flex items-center justify-center text-muted-foreground text-sm">
            <span className="animate-pulse">Actualizando proyecciones y costos...</span>
          </div>
        )}

        {error && !cargando && (
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm">
            <p className="font-medium">Aviso de contingencia</p>
            <p className="text-xs mt-1">
              La fuente externa de catalogo presento intermitencia. Si se disponia de una sesion previa,
              se mantendran los valores calculados en memoria.
            </p>
          </div>
        )}

        {!cargando && !error && (
          <div className="space-y-10">
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Resumen por categoria</h2>
                <p className="text-xs text-muted-foreground">
                  Costo promedio de importacion en COP y cantidad de articulos por departamento.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {resumen.map((cat) => (
                  <TarjetaCategoria key={cat.categoria} {...cat} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Top 3 de oportunidad</h2>
                <p className="text-xs text-muted-foreground">
                  Productos filtrados con calificacion mayor o igual a 4.0 y mas de 100 reseñas de usuarios.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {oportunidades.map((producto) => (
                  <TarjetaOportunidad key={producto.id} {...producto} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
