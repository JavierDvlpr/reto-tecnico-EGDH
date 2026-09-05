"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import SelectorMargen from "@/components/SelectorMargen";
import TarjetaCategoria from "@/components/TarjetaCategoria";
import TarjetaOportunidad from "@/components/TarjetaOportunidad";

export default function DashboardPage() {
  const [markup, setMarkup] = useState(35);
  const { productos, oportunidades, resumen, cargando, error } = useDashboard(markup);

  const totalProductos = productos.length || 20;
  const totalCategorias = resumen.length || 4;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Barra superior de identificacion */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              GH
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                El Gigante del Hogar
              </p>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Simulador de Rentabilidad e-Commerce
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70 text-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>TRM fija: $4.000 COP</span>
            </div>
            <div className="hidden sm:flex items-center px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70 text-slate-600 font-medium">
              <span>Caché: 5 min TTL</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Panel de metricas ejecutivas */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Tasa representativa
            </p>
            <p className="text-lg font-bold text-slate-900 mt-1">$4.000 COP</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Tipo de cambio referencial</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Catálogo evaluado
            </p>
            <p className="text-lg font-bold text-slate-900 mt-1">{totalProductos} productos</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Origen fakestoreapi.com</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Líneas comerciales
            </p>
            <p className="text-lg font-bold text-slate-900 mt-1">{totalCategorias} categorías</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Agrupación de inventario</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Margen aplicado
            </p>
            <p className="text-lg font-bold text-slate-900 mt-1">+{markup}%</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Simulación activa</p>
          </div>
        </section>

        {/* Control interactivo de margen */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <SelectorMargen markup={markup} onChange={setMarkup} />
        </section>

        {/* Estado de carga */}
        {cargando && (
          <div className="py-16 text-center space-y-3">
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-600">
              Sincronizando precios y calculando rentabilidad...
            </p>
          </div>
        )}

        {/* Mensaje de contingencia si la API externa falla */}
        {error && !cargando && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            <p className="font-semibold">Modo contingencia activo</p>
            <p className="text-xs text-amber-800 mt-1">
              La API externa no respondió adecuadamente. El sistema mantiene los datos cacheados en memoria
              para garantizar la continuidad de la consulta financiera.
            </p>
          </div>
        )}

        {/* Contenido principal del dashboard */}
        {!cargando && (
          <div className="space-y-8">
            {/* Top 3 Oportunidades */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-slate-200/70 pb-3">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    Top 3 de oportunidad para importación
                  </h2>
                  <p className="text-xs text-slate-500">
                    Productos filtrados con calificación superior o igual a 4.0 estrellas y más de 100 reseñas.
                  </p>
                </div>
                <span className="text-xs text-amber-800 font-medium bg-amber-100/70 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Prioridad comercial
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {oportunidades.map((producto, index) => (
                  <TarjetaOportunidad
                    key={producto.id}
                    producto={producto}
                    posicion={index + 1}
                  />
                ))}
              </div>
            </section>

            {/* Resumen por Categoria */}
            <section className="space-y-4">
              <div className="border-b border-slate-200/70 pb-3">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Resumen financiero por categoría
                </h2>
                <p className="text-xs text-slate-500">
                  Costo promedio estimado en COP y cantidad de artículos disponibles por departamento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {resumen.map((cat) => (
                  <TarjetaCategoria key={cat.categoria} {...cat} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Pie de pagina informativo */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6 text-center text-xs text-slate-400">
        <p>El Gigante del Hogar — Simulador de Rentabilidad e-Commerce</p>
      </footer>
    </div>
  );
}
