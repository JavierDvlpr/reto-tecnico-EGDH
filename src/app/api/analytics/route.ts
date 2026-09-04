import { NextResponse } from "next/server";
import { servicioCatalogo, servicioAnalitica } from "@/lib/contenedor";

export async function GET() {
  try {
    const productos = await servicioCatalogo.obtenerProductosProcesados();
    const resumen = servicioAnalitica.calcularResumenPorCategoria(productos);
    return NextResponse.json({ resumen });
  } catch {
    return NextResponse.json(
      { error: "no se pudo obtener la analitica en este momento" },
      { status: 503 }
    );
  }
}
