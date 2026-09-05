import { useEffect, useState } from "react";
import { PricedProduct, ResumenCategoria } from "@/lib/types";

// hook personalizado para desacoplar la obtencion y sincronizacion de datos de la interfaz visual
export function useDashboard(markup: number) {
  const [productos, setProductos] = useState<PricedProduct[]>([]);
  const [oportunidades, setOportunidades] = useState<PricedProduct[]>([]);
  const [resumen, setResumen] = useState<ResumenCategoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vigente = true;

    async function cargarDatos() {
      setCargando(true);

      try {
        const [respuestaProductos, respuestaResumen] = await Promise.all([
          fetch(`/api/products/opportunities?markup=${markup}`),
          fetch("/api/analytics"),
        ]);

        const datosProductos = await respuestaProductos.json();
        const datosResumen = await respuestaResumen.json();

        if (!vigente) return;
        setProductos(datosProductos.productos ?? []);
        setOportunidades(datosProductos.oportunidades ?? []);
        setResumen(datosResumen.resumen ?? []);
      } catch (error) {
        if (!vigente) return;
        console.error("error cargando datos del dashboard", error);
      } finally {
        if (vigente) {
          setCargando(false);
        }
      }
    }

    cargarDatos();
    return () => {
      vigente = false;
    };
  }, [markup]);

  return { productos, oportunidades, resumen, cargando };
}
