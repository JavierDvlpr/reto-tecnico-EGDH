import { useEffect, useState } from "react";
import { PricedProduct, ResumenCategoria } from "@/lib/types";

// gestiona la sincronizacion con la api y captura estados de error si el origen externo falla
export function useDashboard(markup: number) {
  const [productos, setProductos] = useState<PricedProduct[]>([]);
  const [oportunidades, setOportunidades] = useState<PricedProduct[]>([]);
  const [resumen, setResumen] = useState<ResumenCategoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;

    async function cargarDatos() {
      setCargando(true);
      setError(null);

      try {
        const [respuestaProductos, respuestaResumen] = await Promise.all([
          fetch(`/api/products/opportunities?markup=${markup}`),
          fetch("/api/analytics"),
        ]);

        if (!respuestaProductos.ok || !respuestaResumen.ok) {
          throw new Error("servicio temporalmente no disponible");
        }

        const datosProductos = await respuestaProductos.json();
        const datosResumen = await respuestaResumen.json();

        if (!vigente) return;
        setProductos(datosProductos.productos ?? []);
        setOportunidades(datosProductos.oportunidades ?? []);
        setResumen(datosResumen.resumen ?? []);
      } catch (err) {
        if (!vigente) return;
        const mensaje = err instanceof Error ? err.message : "error al procesar datos";
        setError(mensaje);
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

  return { productos, oportunidades, resumen, cargando, error };
}
